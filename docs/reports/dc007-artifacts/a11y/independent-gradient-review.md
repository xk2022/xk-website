# DC-007 independent gradient math review

Status: conditional math review, not per-target acceptance. Current raw result has 354 gradient nodes in eight color/surface groups; 30 overlap nodes are excluded here.

| Stratum | Conservative lower contrast | Required fresh proof |
| --- | --- | --- |
| A-light-section-radial | secondary: 5.133307:1, primary: 14.564792:1, foreground: 13.738334:1 | Actual section opaque surface, no additional group opacity/filter/pseudo or grid over these glyphs; relative content painted after absolute decorative span. |
| B-white-figure-conic | secondary: 5.494208:1, primary: 15.588782:1, foreground: 14.704220:1 | Opaque white figure painted above outer section radial decoration; inner conic precedes relative text content. Do not stack outer radial below an opaque figure as if it remained visible. |
| C-dark-home-figure-grid-and-radial | opaqueWhite: 12.127289:1, actualOklabWhite80IndependentInterval: 7.952336:1 | Collect both grid linear backgrounds even when axe only mentions radial. Mask reduces grid alpha. Verify same ancestor group opacity1 and later relative glyph paint; compare conservative independent foreground/background intervals. |
| D-extra-conservative-light-two-pattern-bound | secondary: 4.668779:1 | This optional bound safely covers radial+conic in arbitrary order, but does not cover extra grid/shapes/filter/opacity. Use real strata rather than applying every pattern to all pages. |

HomeHero has two 9% grid backgrounds as well as 12% radial, even though axe names only radial. The dark figure’s 80% white Oklab text must be converted/clipped and composited; its conservative arbitrary-order interval lower bound is 7.952336:1. A mask only reduces layer opacity; it does not paint black.

No actual defect is proven by this offline calculation. Final PASS requires current target-specific full paint evidence, including effects, sibling layers and ordering. Opaque later figure/control surfaces occlude outer gradients. Unknown effects remain pending, and old task acceptance is not reused.

Sources and exact hashes, all eight raw group examples and arithmetic assumptions are in the JSON. No browser, tests, server, Git or repository mutation was performed.
