# Local Noto Sans TC assets

The R01 core covers the reviewed current public content, not all CJK or arbitrary future copy. It contains 882 ordinary Unicode points (774 CJK) and preserves 12 required UVS mappings in cmap14. FE00/FE01 are variation selectors, not additional ordinary CSS-range points.

- `fonts/noto-sans-tc-core.woff2`: 281,768 bytes; SHA256 `8c1e22167a472d67e2e51c5c811b3b2c2815742d054a0994e7f49ef071b99018`.
- `core-font.ts`: the sole preloaded CJK asset, declared with `next/font/local`, normal variable weight 100–900, `swap`, a literal core Unicode range and the retained family/fallback chain.
- `noto-sans-tc.css`: only the 108 original legacy faces and original Arial metrics fallback. Each legacy range is its original range minus the core, in original rule order. All original WOFF2 filenames and bytes remain unchanged. Core and legacy are disjoint and together cover the original 16,661 ordinary points.
- `font-assets.json`: compact source, license, asset identities and relative evidence pointers; `codepoints.json`: only the reviewed core and two UVS selectors. Neither is client data. Full generated manifests, original CSS, corpus inputs, glyph/layout/UVS proof and failed attempts stay in the immutable R01 evidence archive, resolved through its manifest.

The pinned Google Fonts master is commit `b950a7257470b900078f2bf3223823a8602de7e1`, `ofl/notosanstc/NotoSansTC[wght].ttf`, SHA256 `864727d210d54f2537bbe23b3a839436c3992af72de9322af5270897246bd44f`, version `2.004-H2`. Current Gstatic downloads are not represented as the exact origin URLs of the retained old build binaries. Keep the complete `OFL.txt` and original copyright. Its Reserved Font Name is **Source**; the retained Noto identity does not use that name.

## Contract tests

Run `npm run test:fonts`; it is also part of `npm test`. The independent fixture in `scripts/fixtures/font-contract.json` was extracted from immutable original DC007 CSS `ce25680942558ee80c80ecb657ce6bff3934b922f36c52941b7a0598334f3b30` and its actual original files, not derived from the candidate stylesheet.

The tests check exact asset bytes, WOFF2 variable axis/cmap/UVS, literal preload/range declarations, original per-shard partition and order, same-origin relative URLs, fallback metrics and full OFL text. They do not prove browser shaping across formerly separate shards, all layouts/anchors/focus, print/PDF or measured performance. Those require the separate R01 acceptance evidence; a syntax check is not a unit-test PASS.

## Reproducing the reviewed core

Use external tooling without changing app dependencies:

```sh
python3 -m pip install --target /tmp/xk-font-tools FontTools==4.61.1 Brotli==1.1.0
```

Download the pinned master above to `/tmp/noto-sans-tc-master.ttf`, then run:

```sh
PYTHONPATH=/tmp/xk-font-tools python3 scripts/regenerate-font-core.py \
  --master /tmp/noto-sans-tc-master.ttf \
  --master-sha256 864727d210d54f2537bbe23b3a839436c3992af72de9322af5270897246bd44f \
  --codepoints src/app/fonts/codepoints.json \
  --modified 3878588441 \
  --expected-sha256 8c1e22167a472d67e2e51c5c811b3b2c2815742d054a0994e7f49ef071b99018 \
  --output /tmp/noto-core-reproduced.woff2
```

The tool refuses to overwrite an existing output, verifies the master SHA, retains layout/UVS closure and requires the exact reviewed output SHA. A mismatch leaves the temporary output for diagnosis; it does not replace an app asset. Keep the fixed `head.modified` value for byte reproduction. Do not run generation during exclusive performance sampling.

New public or dynamic text needs a fresh corpus/coverage/UVS audit before changing the core. Do not append codepoints by guesswork or preload all legacy shards. Unseen characters within the original coverage can use retained legacy shards; characters outside it depend on the existing system fallback. A new reviewed core needs new identities/fixture review and browser shaping/fallback/print plus comparable performance evidence. The present core does not establish automatic optimization for future CJK content.
