#!/usr/bin/env python3
"""Verify explicit repo-reference manifest records without rewriting evidence.

Historical source snapshots are not assertions about today's application bytes.
Only records explicitly labelled repo-reference are checked. Existing repository
paths win; the versioned path map is used once, only when the old path is absent.
"""

import argparse
from collections import Counter
from datetime import datetime, timezone
import gzip
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import sys
import zlib


ROOT = Path(__file__).resolve().parent.parent
SHA256 = re.compile(r"[0-9a-f]{64}\Z")


def relative_path(value, directory=False):
    if not isinstance(value, str) or not value or "\\" in value or any(ord(char) < 32 for char in value):
        raise ValueError("Expected a nonempty repository-relative POSIX path")
    candidate = value[:-1] if directory and value.endswith("/") else value
    path = PurePosixPath(candidate)
    if path.is_absolute() or any(part in {"", ".", ".."} for part in candidate.split("/")) or path.as_posix() != candidate:
        raise ValueError("Unsafe or noncanonical repository-relative path")
    if directory and not value.endswith("/"):
        raise ValueError("Prefix moves must end with /")
    return value


def load_path_map(path):
    raw = path.read_bytes()
    data = json.loads(raw)
    if not isinstance(data, dict) or data.get("version") != 1 or not isinstance(data.get("sourceCommit"), str) or not re.fullmatch(r"[0-9a-f]{40}", data["sourceCommit"]):
        raise ValueError("Path map requires version 1 and a full sourceCommit SHA")
    prefixes, files = data.get("prefixMoves"), data.get("fileMoves")
    if not isinstance(prefixes, list) or not isinstance(files, dict):
        raise ValueError("Path map requires prefixMoves and fileMoves")
    seen = set()
    for move in prefixes:
        if not isinstance(move, dict) or set(move) != {"from", "to"}:
            raise ValueError("Each prefix move must contain only from/to")
        for value in move.values():
            relative_path(value, directory=True)
        if move["from"] in seen or move["from"] == move["to"]:
            raise ValueError("Duplicate or unchanged prefix move")
        seen.add(move["from"])
    for original, destination in files.items():
        relative_path(original)
        relative_path(destination)
        if original == destination:
            raise ValueError("Unchanged file move")
    return data, hashlib.sha256(raw).hexdigest()


def resolve_reference(repo, original, path_map):
    relative_path(original)

    def checked_path(name):
        path = repo / name
        if not path.resolve().is_relative_to(repo):
            raise ValueError("Reference escapes the repository")
        return path

    existing = checked_path(original)
    if existing.exists() or existing.is_symlink():
        return existing, original, False
    destination = path_map["fileMoves"].get(original)
    if destination is None:
        for move in sorted(path_map["prefixMoves"], key=lambda value: len(value["from"]), reverse=True):
            if original.startswith(move["from"]):
                destination = move["to"] + original[len(move["from"]):]
                break
    if destination is None:
        return existing, original, False
    relative_path(destination)
    return checked_path(destination), destination, True


def manifest_records(value, location="$"):
    if isinstance(value, dict):
        if any(item == "repo-reference" for item in value.values() if isinstance(item, str)):
            yield location, value
        for key, item in value.items():
            escaped = str(key).replace("~", "~0").replace("/", "~1")
            yield from manifest_records(item, location + "/" + escaped)
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from manifest_records(item, location + "/" + str(index))


def expected_field(record, names, digest=False):
    values = [record[name] for name in names if name in record]
    if not values:
        raise ValueError("Missing " + "/".join(names))
    for value in values:
        valid = isinstance(value, str) and bool(SHA256.fullmatch(value)) if digest else type(value) is int and value >= 0
        if not valid:
            raise ValueError("Invalid " + "/".join(names))
    if any(value != values[0] for value in values[1:]):
        raise ValueError("Conflicting " + "/".join(names))
    return values[0]


def digest_stream(stream):
    digest, size = hashlib.sha256(), 0
    while chunk := stream.read(1024 * 1024):
        digest.update(chunk)
        size += len(chunk)
    return {"bytes": size, "sha256": digest.hexdigest()}


def validate(repo, path_map_path):
    started = datetime.now(timezone.utc).isoformat()
    report = {"status": "FAIL", "startedAt": started, "repo": str(repo),
              "scope": "Explicit repo-reference records in *manifest*.json(.gz) under docs/reports and docs/screenshots; historical snapshots and ordinary archive payloads are not current-source assertions.",
              "pathMap": str(path_map_path), "manifests": [], "references": [], "errors": []}
    cache, bytes_read = {}, Counter()
    try:
        path_map, map_sha = load_path_map(path_map_path)
        report.update(pathMapSha256=map_sha, sourceCommit=path_map["sourceCommit"])
    except (OSError, ValueError, TypeError) as error:
        report["errors"].append({"kind": "path-map", "message": str(error)})
        return finish(report, cache, bytes_read)
    manifests = sorted({path for directory in (repo / "docs/reports", repo / "docs/screenshots")
                        for pattern in ("*manifest*.json", "*manifest*.json.gz") for path in directory.rglob(pattern) if path.is_file()})
    for manifest in manifests:
        name = manifest.relative_to(repo).as_posix()
        try:
            raw = manifest.read_bytes()
            decoded = gzip.decompress(raw) if manifest.name.endswith(".gz") else raw
            data = json.loads(decoded)
            rows = list(manifest_records(data))
            report["manifests"].append({"path": name, "sha256": hashlib.sha256(raw).hexdigest(), "repoReferences": len(rows)})
        except (OSError, ValueError, EOFError, zlib.error) as error:
            report["errors"].append({"kind": "manifest", "path": name, "message": str(error)})
            continue
        for location, record in rows:
            result = {"manifest": name, "record": location, "originalPath": record.get("path"),
                      "resolvedPath": None, "mapped": False, "status": "FAIL", "errors": []}
            report["references"].append(result)
            try:
                encoding = record.get("encoding", record.get("compression", "identity"))
                encoding = "identity" if encoding == "none" else encoding
                if encoding not in {"identity", "gzip"}:
                    raise ValueError("Unsupported reference encoding")
                expected = {
                    "encodedBytes": expected_field(record, ("encodedBytes", "archiveBytes", "archiveSizeBytes", "bytes")),
                    "encodedSha256": expected_field(record, ("encodedSha256", "archiveSha256", "sha256"), digest=True),
                    "rawBytes": expected_field(record, ("rawBytes", "originalBytes", "originalSizeBytes")),
                    "rawSha256": expected_field(record, ("rawSha256", "decodedSha256", "originalSha256"), digest=True),
                }
                path, resolved, mapped = resolve_reference(repo, record.get("path"), path_map)
                result.update(resolvedPath=resolved, mapped=mapped, encoding=encoding, expected=expected)
            except (ValueError, TypeError) as error:
                result["errors"].append({"kind": "invalid-record", "message": str(error)})
                continue
            if not path.is_file() or path.is_symlink():
                result["errors"].append({"kind": "missing", "message": "Resolved reference must be a regular file"})
                continue
            key = (resolved, encoding)
            if key not in cache:
                try:
                    with path.open("rb") as stream:
                        encoded = digest_stream(stream)
                    bytes_read["encoded"] += encoded["bytes"]
                    if encoding == "gzip":
                        with gzip.open(path, "rb") as stream:
                            payload = digest_stream(stream)
                        bytes_read["gzipDecoded"] += payload["bytes"]
                    else:
                        payload = encoded
                    cache[key] = {"encodedBytes": encoded["bytes"], "encodedSha256": encoded["sha256"],
                                  "rawBytes": payload["bytes"], "rawSha256": payload["sha256"]}
                except (OSError, EOFError, zlib.error) as error:
                    cache[key] = {"error": str(error)}
            actual = cache[key]
            result["actual"] = actual
            if "error" in actual:
                result["errors"].append({"kind": "read-or-gzip", "message": actual["error"]})
            else:
                for field, value in expected.items():
                    if actual[field] != value:
                        result["errors"].append({"kind": "sha-mismatch" if field.endswith("Sha256") else "byte-mismatch", "field": field})
            result["status"] = "FAIL" if result["errors"] else "PASS"
    if not report["references"]:
        report["errors"].append({"kind": "no-references", "message": "No explicit repo-reference records found"})
    return finish(report, cache, bytes_read)


def finish(report, cache, bytes_read):
    references = report["references"]
    errors = Counter(error["kind"] for row in references for error in row["errors"])
    report["counts"] = {"manifestsScanned": len(report["manifests"]), "repoReferences": len(references),
                        "passed": sum(row["status"] == "PASS" for row in references),
                        "uniqueOriginalPaths": len({row["originalPath"] for row in references if isinstance(row["originalPath"], str)}),
                        "directReferences": sum(bool(row["resolvedPath"]) and not row["mapped"] for row in references),
                        "mappedReferences": sum(row["mapped"] for row in references),
                        "mappedOriginalPaths": len({row["originalPath"] for row in references if row["mapped"]}),
                        "uniqueResolvedFiles": len({row["resolvedPath"] for row in references if row["resolvedPath"]}),
                        "cachedFileEncodings": len(cache), "encodedBytesRead": bytes_read["encoded"],
                        "gzipDecodedBytesRead": bytes_read["gzipDecoded"], "missing": errors["missing"],
                        "shaMismatch": errors["sha-mismatch"], "byteMismatch": errors["byte-mismatch"],
                        "invalidRecords": errors["invalid-record"], "readErrors": errors["read-or-gzip"],
                        "manifestOrMapErrors": len(report["errors"])}
    report["status"] = "PASS" if not report["errors"] and all(row["status"] == "PASS" for row in references) else "FAIL"
    report["finishedAt"] = datetime.now(timezone.utc).isoformat()
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=ROOT)
    parser.add_argument("--path-map", type=Path, help="Defaults to REPO/docs/98_decisions/repository-path-map.json")
    parser.add_argument("--output", required=True, type=Path, help="Fresh JSON report outside the repository, for example /tmp/evidence-references.json")
    args = parser.parse_args()
    repo, output = args.repo.resolve(), args.output.resolve()
    if not repo.is_dir() or output.is_relative_to(repo) or output.exists():
        parser.error("Use an existing repository and a fresh output path outside it")
    path_map = args.path_map.resolve() if args.path_map else repo / "docs/98_decisions/repository-path-map.json"
    report = validate(repo, path_map)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("x", encoding="utf-8") as stream:
        json.dump(report, stream, ensure_ascii=False, indent=2)
        stream.write("\n")
    print(json.dumps({"status": report["status"], "output": str(output), **report["counts"]}))
    return 0 if report["status"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
