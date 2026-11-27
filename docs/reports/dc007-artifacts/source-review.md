> 此為來源核對當時快照；下方Required PENDING不是最終結果。最新結果見[本輪報告](../dc007-implementation.md)，原始bytes見[source-review.original.md.gz](source-review.original.md.gz)。

# DC-007來源與Required驗收風險

公司最新main已更新為 `f1be01c0c5d8bc5b1238f250838e336bef47b149`，tree `84f9388877b9f73dc81276200d0164625d228c90`；相對9213a3多3commits，正式完成LogoV2母稿及品牌文件更新。根AGENTS與工程／測試／發布06_engineering正文Blob未變，沿用同版審閱。

| 本輪全文重讀來源 | Blob |
| --- | --- |
| 05_brand/README.md | `db03866e2d1b61b1bfdee5eae5ed11ff3fdb39c8` |
| 05_brand/overview.md | `404d9e97d4ff40602a8628d72349b28c96db84fa` |
| 05_brand/brand-identity.md | `6db546fa2cc94a7e1a58b7988eaf86f9a99bfc48` |
| 05_brand/color-palette.md | `42fa98d525b91f04e76f1f7cc3fb2efe65f477c6` |
| 05_brand/logo-guidelines.md | `ff44b6107b388202f06bda344c5be68002bbc225` |
| 05_brand/typography.md | `7ade30e8703d18a79953804a6bbf3908e25f78f7` |
| 10_decisions/2026-11-26.md | `92d68e05c95825c1900d2387d4e27257dbeb7fd8` |
| assets/brand/logo/source/original-design-files/xk-logo-premium-horizontal-master-v2.svg | `47ee4f275431cf48660fd46d4d5b8b7090dfc83f` |

**新決議是confirmed，不再是未核准Logo提案；但網站有明確過渡條款。** logo-guidelines L31–33明定既有網站／產品暫用原部署資產，待V2相對應衍生素材交付後安排更新。color-palette L22保留既有網站／產品介面色票；typography L14將Manrope600限於已轉path的Logo字標，一般UI仍Inter／Noto Sans TC。因此DC007可以保留目前Logo03與三套已核准UI，記錄transition，無須擴成換Logo／新字體載入／全站改色。新母稿黑#0C1017、金#C5A46D、藍#3977A8及公司文件中的數位驗證，不當成本輪網站對比或實體印刷PASS。

已獨立核對[PR44](https://github.com/xk2022/xk-website/pull/44) merged=true，merge/main同為 `ee4b4709a9f8daa755e2595a46c158b3c92d8229`，mergedAt 2026-11-26T12:31:13Z。該main的獨立fixture明列Modern16＋Heritage16＋Luxury16＋Gallery1＝49個唯一公開路徑，DC007前置已成立；此處未重新跑49頁公開HTTP。

優先安排以下Required風險，這份來源核對未執行它們，狀態均PENDING：

1. 真人讀屏：三系列首頁→服務→作品→聯絡／試算旅程，需要真AT及可觀察朗讀／互動證據；AX tree不替代。必需環境確實缺少才記BLOCKED，不能猜PASS或降成N/A。
2. 真browser200% zoom：使用實際瀏覽器縮放狀態並記錄，CSS zoom、DPR或改viewport不替代；另測320reflow、文字間距、Reduced Motion及focus遮蔽。
3. 47張網站實圖：15首頁＋24主頁＋2Gallery＋6代表詳頁；不含PDF render／修復圖，全部真捕捉及人工檢視。舊圖／舊檢視只可明確列為歷史或有SHA bridge的來源。
4. 至少6份真PDF：三系列×兩模式，既定17加購／40–60字／面議／起價／年度情境；每份1A4、文字圖元界內、Logo／兩QR真可見並解碼。DC006 print-media不等於本輪六份新PDF。
5. 至少18 cold samples／固定條件集：三系列×Home與最大風險頁×各3次，另有warm互動；固定工具／viewport／CPU／network／cache、記median/range。LCP2.5s／TBT200ms／CLS0.1門檻未達如實FAIL並處理；lab不代表field INP/CWV p75或真機。量測時避免axe／回歸負載干擾。
6. 普通／Pages分開各245layouts，共490；六品質指令、49頁進入／reload／anchors／本機資源及真實展開menu/disclosure。incomplete須新證據判讀，不能直接沿用舊裁決。先固定tools/fixtures/文件掃描排除，避免後補報告膨脹Tailwind輸出。

DC007完整Required與固定來源見[source-review.json](source-review.json.gz)。PR44的merge／CI／部署是前置已完成事件，不是DC007的新CI或merge/deploy授權。本來源工作未修改Repo、Git或跑build／browser，僅寫指定/tmp。
