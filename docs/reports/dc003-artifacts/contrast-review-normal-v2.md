# DC003 scoped axe incomplete adjudication — normal-v2

- Input: `/tmp/xk-dc003/normal-v2/result.json`, SHA256 `ff1a1dfce632926abb76171c21edd1dc072038cf3827d786ff1a4264d0373025`; original suite status `MANUAL_PENDING` is preserved.
- Fresh menu evidence: `/tmp/xk-dc003/normal-v2/menu-overlap/result.json`, 7 routes, 32 targets, 7 raw 375×1000 PNGs. Root ran the browser collector with its evidence runner and reported real Exit 0. This review does not claim an additional browser run by the reviewer.
- Independent offline execution: `python3 /tmp/xk-dc003/adjudicate-axe-with-menu.py --input /tmp/xk-dc003/normal-v2/result.json --menu-evidence /tmp/xk-dc003/normal-v2/menu-overlap/result.json --output /tmp/xk-dc003/normal-v2/axe-adjudication-with-menu-v2.json`, actual Exit 0.
- Result: all 191 incomplete nodes accounted for exactly; **165 PASS and 26 N/A**, no remaining NEED_MANUAL or FAIL. This is scoped adjudication, not overall WCAG/assistive-technology certification.
- 159 gradient nodes: conservative RGB/luminance bounds include the actual radial/conic color/alpha stops; Home's dark figure includes both perpendicular 9% blue grid layers plus 12% cyan radial. The lowest bound is 5.1333069505:1, above the corresponding requirement. All 17 relevant source hashes match the source-pinned input and current source.
- 26 N/A nodes: every recorded non-whitespace glyph range rectangle lies fully inside the actual solid white menu panel (x0, y80, width375, height345), with nine interior hit-test top elements inside that panel. Computed opacity1, rectangular background fill, ancestor paint/effects and source stacking were checked. Neither offscreen nor partial coverage alone qualified for N/A.
- 6 PASS overlap nodes have visible/partially covered text: Home, Services, Portfolio and Contact descriptions each bound 11.7452798749:1; Quotation disclaimer 8.8171807417:1; Gallery availability 12.9362219361:1. Each requires4.5:1. The bound explicitly includes menu shadow navy at alpha0..0.08 over both foreground and background.
- Raw source/style evidence remains untouched. The compact summary preserves glyph geometry/top-hit flags, common panel paint, calculation references and original file/PNG/data hashes, without repeated full CSS hit stacks.

## Artifacts

- Detailed adjudication: `/tmp/xk-dc003/normal-v2/axe-adjudication-with-menu-v2.json` SHA256 `7a0d18b89a6a6f27f7052b93d333c2ff9809a3f9af5a618cda44041b25235b77`.
- Compact evidence summary: `/tmp/xk-dc003/normal-v2/axe-adjudication-summary-v1.json` SHA256 `9f6cef9939e2274bbfd4caa51a8288098ba373b5e95ef19faae4d11b74b2b73e`.
- Adjudicator: `/tmp/xk-dc003/adjudicate-axe-with-menu.py` SHA256 `fa38257ad419ec5c8e7a69205c6c7613a9707a214fbfdbf7a213c847fbf70560`.
- Menu paint model: `/tmp/xk-dc003/menu-paint-model.json` SHA256 `e3f91cb24c2dc5e8daf217f068d8949c270bb358575bc9e8731739cfc5865025`.
- Gradient model: `/tmp/xk-dc003/axe-paint-model.json` SHA256 `dc41c3b0275e91d2e51235e1d91464607a31b64d55ef618db9ba2501f30042ac`.

## Pages follow-up

Fresh Pages menu evidence is pending. The gzip collector has the identical observation logic and raw PNGs; only JSON storage differs. It avoids treating normal evidence as a second Pages browser run.

```sh
node /tmp/xk-dc003/collect-menu-overlap-gzip.cjs --input /tmp/xk-dc003/pages-final/result.json --base-url http://127.0.0.1:3231/ --mode pages --output-dir /tmp/xk-dc003/pages-final/menu-overlap
python3 /tmp/xk-dc003/adjudicate-axe-with-menu.py --input /tmp/xk-dc003/pages-final/result.json --menu-evidence /tmp/xk-dc003/pages-final/menu-overlap/result.json --output /tmp/xk-dc003/pages-final/axe-adjudication-with-menu-v1.json
```

Expected collector contract: 7 records, 32 overlap targets and 7 raw viewport PNGs. Any source, viewport, count, selector or unmodeled paint mismatch fails collection or remains NEED_MANUAL; expected scope is not lowered. No old Task012 result is used as current evidence.
