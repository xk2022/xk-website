#!/usr/bin/env python3
"""Run a POSIX command and persist its real process outcome and combined log.

Use -- before the command. Arguments and output are retained verbatim: never
put secrets in either. No environment variables are collected in the receipt.
"""

import argparse
import datetime
import hashlib
import json
import math
import os
from pathlib import Path
import signal
import subprocess
import sys
import tempfile
import time


def timestamp():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def save_receipt(path, record, initial=False):
    descriptor, temporary = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
            json.dump(record, stream, ensure_ascii=False, indent=2)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        if initial:
            os.link(temporary, path)  # Atomic creation without replacing evidence.
        else:
            os.replace(temporary, path)
    finally:
        Path(temporary).unlink(missing_ok=True)


def stop_group(child):
    for signum in (signal.SIGTERM, signal.SIGKILL):
        try:
            os.killpg(child.pid, signum)
        except ProcessLookupError:
            pass
        if signum == signal.SIGTERM:
            time.sleep(0.5)  # Also allow descendants time to finish after TERM.
    return child.wait(timeout=5)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--receipt", required=True, type=Path)
    parser.add_argument("--log", required=True, type=Path)
    parser.add_argument("--timeout", type=float)
    parser.add_argument("command", nargs=argparse.REMAINDER)
    args = parser.parse_args()
    command = args.command[1:] if args.command[:1] == ["--"] else args.command
    if os.name != "posix" or not command:
        parser.error("A POSIX system and a concrete command are required")
    if args.timeout is not None and (not math.isfinite(args.timeout) or args.timeout <= 0):
        parser.error("--timeout must be a finite positive number of seconds")
    receipt, log = args.receipt.absolute(), args.log.absolute()
    if receipt.resolve() == log.resolve() or any(os.path.lexists(p) for p in (receipt, log)):
        parser.error("Receipt and log must be distinct, unused paths; evidence is never overwritten")
    receipt.parent.mkdir(parents=True, exist_ok=True)
    log.parent.mkdir(parents=True, exist_ok=True)
    record = {"status": "PENDING", "command": command, "cwd": os.getcwd(),
              "startedAt": timestamp(), "finishedAt": None, "processId": None,
              "returnCode": None, "exitCode": None, "timeoutSeconds": args.timeout,
              "logFile": str(log), "logSha256": None,
              "observationMethod": "subprocess.Popen.wait(): observed OS process return code"}
    child, interrupted = None, None

    def on_signal(signum, _frame):
        nonlocal interrupted
        interrupted = interrupted or signum

    previous = {s: signal.signal(s, on_signal) for s in (signal.SIGINT, signal.SIGTERM)}
    try:
        with log.open("xb") as output:
            try:
                save_receipt(receipt, record, initial=True)
            except FileExistsError:
                log.unlink()
                parser.error("Receipt already exists; refusing to overwrite evidence")
            reason, exit_code, stopped = "completed", 1, False
            try:
                if interrupted:
                    raise InterruptedError("Interrupted before process launch")
                child = subprocess.Popen(command, stdout=output, stderr=subprocess.STDOUT,
                                         start_new_session=True)
                record["processId"] = child.pid
                save_receipt(receipt, record)
                deadline = time.monotonic() + args.timeout if args.timeout is not None else None
                while True:
                    if interrupted or (deadline is not None and time.monotonic() >= deadline):
                        reason = "signal" if interrupted else "timeout"
                        record["returnCode"] = stop_group(child)
                        stopped = True
                        exit_code = 128 + interrupted if interrupted else 124
                        break
                    try:
                        record["returnCode"] = child.wait(timeout=0.1)
                        exit_code = record["returnCode"]
                        if exit_code < 0:
                            exit_code = 128 - exit_code
                        break
                    except subprocess.TimeoutExpired:
                        pass
            except OSError as error:
                exit_code = 127 if child is None else 1
                reason = "launch-error" if child is None else "wrapper-error"
                record["error"] = error.strerror or type(error).__name__
            except Exception as error:
                reason = "wrapper-error"
                record["error"] = type(error).__name__
            finally:
                if child is not None and not stopped and (child.poll() is None or interrupted):
                    record["returnCode"] = stop_group(child)
                if interrupted:
                    reason, exit_code = "signal", 128 + interrupted
                output.flush()
                os.fsync(output.fileno())
        with log.open("rb") as stream:
            log_hash = hashlib.sha256()
            for block in iter(lambda: stream.read(1024 * 1024), b""):
                log_hash.update(block)
        record.update(status="PASS" if exit_code == 0 else "FAIL", exitCode=exit_code,
                      terminationReason=reason, signal=interrupted, finishedAt=timestamp(),
                      logSha256=log_hash.hexdigest())
        save_receipt(receipt, record)
        print(json.dumps({"receipt": str(receipt), "status": record["status"],
                          "returnCode": record["returnCode"], "exitCode": exit_code}), flush=True)
        return exit_code
    finally:
        for signum, handler in previous.items():
            signal.signal(signum, handler)


if __name__ == "__main__":
    sys.exit(main())
