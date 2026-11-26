# DC003 contrast incomplete closure

Both fresh inputs are covered exactly: **191 nodes per mode,165 PASS and26 N/A**, with no remaining NEED_MANUAL/FAIL in this scoped adjudication. The 26 N/A nodes have all glyph range boxes fully behind the actual opaque expanded menu, verified with rectangular panel paint/ancestor opacity and9 interior top-hit samples per glyph. Partial coverage/offscreen geometry alone never qualifies as N/A.

The159 gradient nodes include both9% grid layers in the Home dark figure. The33 expanded-menu gradient nodes additionally include the actual8% navy panel-shadow source bound over foreground and background, using32 covering shared-alpha intervals. The6 overlap nodes with visible text also include that shadow. The minimum final conservative contrast bound is **4.7803501296:1**, above its4.5:1 requirement. All17 relevant source hashes match each fresh source manifest and current source.

| Mode | Fresh input SHA256 | Selected adjudication | SHA256 |
|---|---|---|---|
| normal | ff1a1dfce632926abb76171c21edd1dc072038cf3827d786ff1a4264d0373025 | normal-v2/axe-adjudication-with-menu-v3.json | 4fb4956a526bbbee27c4daa2fccce791c3a7695cd55ab25caa92a14dacf50626 |
| Pages | f2c10304e9b43f9587d551c8f096ae815689278db6f0f666adefb182af53f7c1 | pages-final/axe-adjudication-with-menu-v2.json | 2d22628105778d8461595ba0eddf312292366340d102217abc2e2c753b4900f6 |

Paths are relative to `/tmp/xk-dc003`. Both offline adjudication commands actually exited0. Root owns the fresh browser runner receipts; this reviewer did not launch a browser. Each mode has its own7 fresh panel records/32 overlap targets/7 raw375×1000 PNGs; no normal-to-Pages evidence substitution was made. Original browser suite status `MANUAL_PENDING` remains unchanged; this separate report closes the recorded incomplete scope only.

The first Pages collector remains **FAIL** because its GET-only assertion rejected41 same-origin HEAD/fetch requests. Its original request summaries did not record bodies/headers, so it was not retroactively changed to COLLECTED. Root reran a separately versioned collector into `pages-final/menu-overlap-v2`. The fresh run records310 GET and41 HEAD. Every HEAD is a published-route same-origin fetch with null body/0bytes,no query/hash,no credentials,no PII-canary flags,no transfer encoding,and empty/zero content length. POST and other methods remain disallowed. The explicit offline network review is `pages-final/menu-overlap-v2/network-review.json`, SHA256 `1c5699e3e11e7282705522be9bf79c7a30aee741b3b3ab37611c092fe9ef5261`.

Compact summaries preserve source/raw-file/data/PNG hashes, common panel paint, glyph geometry,9-point top-hit flags and calculation references without repeated full CSS stacks:

- `normal-v2/axe-adjudication-summary-v2.json`, SHA256 `658af0ffbb5f100d842e4efe3ce8ea255076e29fe580acc647d4805fe901cc84`.
- `pages-final/axe-adjudication-summary-v2.json`, SHA256 `5ab72ac45712a82fa0f5909b16d34d037e05c44991e3f83aa3a03b8c6936fd95`.
- Pages fresh gzip raw records total3503871bytes; raw PNGs remain separate and unmodified. Normal raw files and all historical FAIL/v1/v2 artifacts remain untouched.

This is scoped fresh-input contrast adjudication, not full WCAG/assistive-technology certification. Old Task012 is not used as current acceptance evidence. No app/repository edits,Git,build,server or browser execution were performed by this reviewer.
