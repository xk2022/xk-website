# Task 012 — Accessibility 實作與驗證報告

報告時點：2026-11-19T10:49:19.535003+00:00。本機 Required 驗收完成；結果限於本報告的頁面、狀態及工具，不是完整無障礙認證。PR／合併／部署尚未發生的階段保留 PENDING，後續實際證據更新於同一 PR。

## 成果與版本

- Base：`8e42c647646d20873789c54367132901746a58bf`；分支：`feature/website-accessibility`。Task 011 已合併，初始工作目錄乾淨。使用者明確授權本次 Push／PR、CI 通過後合併及確認部署。
- 最終 107 檔 runtime map：`76d5651f5ae79d435d22791393b0802b70ce5cc468a0d1ae799f1bea2761afeb`；[逐項驗證](task012-artifacts/verification.json) 保存每檔 SHA、指令、環境、預期／實際、Exit Code、狀態與證據。
- 四類最小修正：disclosure 在焦點離開時關閉；Footer 完整九頁網站目錄；十二個 Hero／CTA 的漸層小字改用既有 foreground；About 卡片移除比例高度限制，內容自然撐高。
- 保留既有八個 Tokens、原 Logo／字體、Next.js 16.4.6／React 19.3.1／strict TypeScript 5.9.3／Tailwind 4.3.3／shadcn／Lucide。package、lockfile、Next/TS 設定、workflow 及所有 src/config、public 素材均未改。
- 公開九頁：Home、About、Services、Solutions、Portfolio 與三個 registry 詳頁、Contact。Contact 無正式管道／表單，Portfolio 三案仍 PLANNED，Privacy 草案／dev／Sitemap 不公開，noindex/nofollow 政策不變。

## 來源及規格

已讀當次規格、AGENTS／協作流程與既有實作報告。五份搬移的品牌／首頁／About／Services／Pages 指南與先前全文閱讀同 Blob；新報告／追加部分另記閱讀範圍。沒有沿用歷史 axe 或網站測試作本次結果。完整 coverage 與 raw source identity 在 `source-audit.json`。

文件 Repository fresh API 時點 `2026-11-19T09:40:20.914Z`：`main@9c735000cdcb979f4e63825e37162374475e5902`，Tree `88356ad3f0ad5c38eda90a5c7088140b4470638e`，58 個 Blob。六個指定來源現在均有更新，canonical Task 012 的 `95ef1275…` 是原規格研究版本，保留其歷史身分。

| 來源 | 原研究 Blob | 最新 Blob／實際採用 |
| --- | --- | --- |
| `doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` | `59f6c1151015bdec746229e78596e2311cdc2f6f` | `3c96534c5835c1d07db97957f3e134df9fd62ee5`；歷史對話新增決議日期指引；ANS 範本仍屬歷史建議。 |
| `doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | `07a151a2843577d95a075cbc1c61c36ecb470ff7`；文件已確認中文品牌「探索萬象科技」及 Logo 03 核准；與原 Task 012 保留暫定標示有差異，本次保留既有內容並列後續同步。 |
| `doc/01_business-plan/week-02/03_color-palette_品牌色彩系統規範.md` | `98baa236493f25351c6b991cb9dd1cecf672dc39` | `9b8019d32e588ab2ecb26a179e366032a253d9c2`；更正 Website 根目錄／Pages 的現行地位；舊色票不覆蓋已合併八色 Tokens。 |
| `doc/01_business-plan/week-02/04_typography_品牌字體與排版規範.md` | `596ce5b3d09642c33289abb672199e0998bcf08e` | `c826fcd2c62dadec7566c5428da2e8ef0f4db41b`；更正 Website 根目錄路徑；保留 Inter／Noto、swap／fallback 與已驗證的 variable-font 改善。 |
| `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | `d8b924328aa1e38736db1470dc2299d1b98fb735`；確認獨立 Website 根目錄 `.`／Pages 實況優先；Accessibility／CWV 章節未變，未授權新增 Backend。 |
| `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | `00da0b89ac65d25f0bb341c28f10c708e227055d`；更新 Pages／Website 部署與正職並行經營說明；Forms／Analytics 仍為規劃，不代表現有收件能力或法律核准。 |

本次唯讀核對六個指定檔與決議／新前端規劃共八個下載內容，8/8 Git Blob 相符；14 個 Logo 素材 Blob 與舊版相同。沒有聲稱全部 58 個內容都重新下載或全文閱讀，也未修改文件 Repository。

- `doc/decisions/2026-11-19.md`，Blob `477014e4fc413a2c13a9e1ff4fd7428016ddb51c`：中文品牌定名「探索萬象科技」、Logo 03 正式核准、創辦人與正職並行；這不證明法定主體、Privacy 核准或正式權利聯絡方式。
- 初始網站 About 的「一人全職經營」及暫定 Logo 標示與新決議有衝突。本次依 Task 012 保留現行文案及 accessible label，將品牌／經營模式同步列為 Owner 後續工作；原始 Logo 路徑／比例／顏色與歷史報告不重寫。
- 新 AI 首次試用及 Rotaract 決議是後續業務／產品內容依據，不在本次升級既有 Portfolio 三案 PLANNED、公開產品可用性或開發 Backend。舊 Week 03 展示文件移 Week 04，Blob 不變；固定歷史版本 URL 仍有效。
- 新 Week 03 Frontend 文件為 Initial Architecture Specification；90+ 為努力目標，不能取代 WCAG 2.2／真實 AT，也不新增分數 Gate。

W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 於 `2026-11-19T09:41:42.101340+00:00` 實際 HTTP 200；當前 dated Recommendation 為 [2024-12-12](https://www.w3.org/TR/2024/REC-WCAG22-20241212/)。原 HTML 512457 bytes，SHA-256 `6e3c5fe397257cae509a2fb4752b73062cf8cbeb92c2cec618989b17e4cf7057`。

從標準原文抽出全部 55 項 A／AA＝31 A＋24 AA；新增 A 為 3.2.6／3.3.7，新增 AA 為 2.4.11／2.5.7／2.5.8／3.3.8。4.1.1 Parsing 已 obsolete／removed，不列入 55 項；仍保留一般語意／ID／舊工具相容檢查。Understanding 連結來自 W3C 原文，不冒稱 55 篇 Understanding 都另行下載。

## 問題、修正與失敗政策

| Issue／準則 | 原問題及嚴重度（人工分類） | 修正／實際結果 |
| --- | --- | --- |
| A11Y-FOCUS-OBSCURED-DISCLOSURE／2.4.11 | High；About、Services、Contact 的 Tab 離開仍被白 panel 全遮，原三 FAIL 保留 | wrapper focus-leave 關閉且不劫持新焦點；九頁鍵盤／真 200%／AT 重驗通過 |
| A11Y-NAV-245-01／2.4.5 | Moderate；三作品詳頁只有 Portfolio 分類 card 一個入口 | Footer 完整網站目錄＋分類 overview；九頁 9URL、三詳頁鍵盤及真 AT 開 Corporate 成功 |
| A11Y-CONTRAST-GRADIENT／1.4.3 | Serious；17px/400 小字 foreground(102,112,133)對實際背景(225,241,247)為 4.29409<4.5 | 既有 foreground(23,32,51)對同樣本 14.04257；保守全 stop 下界 13.73833，Tokens 不改 |
| A11Y-SPACING-ABOUT-CLIP／1.4.12 | Serious；320 文字覆寫時 figure 底 1068、link 底 1091.5，裁切 23.5px，四字 glyph 超界 | 第一版 min-h-max 仍 FAIL；最後移除 aspect-square，以內容決定高度，五寬／spacing／glyph/hit／鍵盤錨點新驗通過 |

Baseline collector30 項／Exit0，網站為 8PASS＋3FAIL＋19PENDING；19 次 axe 零 violations 但 237incomplete。這不是整站 PASS。隔離 git archive 原 base 的 Pages build 真 Exit0，失敗 symlink fallback 原 Exit1 另存；未修改目前 repo 產物來偽裝 baseline。

後續 979a 完整普通 21PASS，Pages41 項＝40PASS＋1Disabled N/A，45 響應式／57axe 零 violations，但 Root 沒有把 About 候選的 collector PASS 當最終驗收。Root 實看裁切後建立 FAIL；5d242 修正的 Pages12 項 10PASS＋2FAIL／真 Exit1，僅實跑 4axe，未補造為 6 次。最終 76d565 普通 6PASS、Pages12PASS／真 Exit0，包含 5 寬、6 次新 axe、320 文字間距與實際 glyph/target/clip/anchor。

最後一次修改只影響 AboutHero。353 項離線 bridge 確認 204 檔清冊、115fonts／13JS／3CSS 逐 byte 同，其他 8 頁 48 份 HTML／payload 僅 BuildID 不同；About 四份 Flight/HTML 真變動獨立保存，僅 rendered-content view 證實 class 移除、其他語意／文案／JSONLD 不變。這是明確影響範圍與全新 About 補驗，沒有把舊 57axe 改稱新版本量測。

## 實際品質、Browser 與人工驗收

| 命令 | 最終實際 Exit Code | 回執（封存相對路徑） |
| --- | --- | --- |
| `npm ci` | 0 | `checks/npm-ci-natural-height.json` |
| `npx tsc --noEmit` | 0 | `checks/tsc-natural-height.json` |
| `npm run lint` | 0 | `checks/lint-natural-height.json` |
| `npm run build` | 0 | `checks/build-natural-height.json` |
| `npm run build:pages` | 0 | `checks/build-pages-natural-height.json` |

普通先建置／3090 驗收，再建 Pages／3091 靜態預覽，避免混用.next。Node 24.22.1、npm11.9.0、Playwright 1.65.1、Chromium 156.0.8078.79、axe 4.14.1；受測 URLs 為 loopback，BasePath 為/xk-website。每個 run 保存開始／結束、真程序回執、count 及 completionToken。

57 次原 axe 的 708incomplete：694gradient＋2 部分可見 Contact 文字 PASS、12 僅被 opaque panel 完全遮蓋且非 focused 之狀態 N/A；不是整頁 N/A。最終 About 六次 axe 另有當下 computed styles 逐項判讀，見 contrast-about-natural-resolution.json。全 gradient 最低下界 5.13331；雙 9%grid 白 80%文字保守下界 7.89493。七類 UI 的 normal／hover／focus 共 21 狀態，最低文字／子元素 4.97475、focus 輪廓下界 5.13331。沒有停用規則、隱藏錯誤或改寫原 incomplete。

真實 AT 為 Debian13/X11＋Orca 48.1＋AT-SPI2 2.56.2＋Chromium 156＋SpeechDispatcher0.12/espeak-ng1.52。實際操作 Home/Services headings、main／named landmarks、CTA 跨頁、200% disclosure collapsed/expanded 與焦點離開／Escape；Pages 目錄與 Orca 32 連結清單能讀三詳頁名稱／URL，鍵盤 Activate 後讀到 Corporate heading1。保留 225 行當次 SPEECH OUTPUT 及逐步操作，不用 AX Tree 冒充 AT。

原生 Chrome200% UI 已實看，實際 CSSviewport590×378、DPR2、CSS zoom=1；九頁全文與最終 HTML 比對、無水平溢出／clipped leaf。最終 About 另讀實際 aspectRatio auto、44px 連結完整與全文。320CSSpx 是獨立 reflow／spacing 測試；沒有以 DPR 或 CSS zoom 假充瀏覽器縮放。指標 down 後移出再 up 不意外啟動；Contact375×812／812×375／回 portrait 真 viewport 驗收通過。

完整九頁 context40/40 真 after、123 份 document-before；216 資源成功、606 原始 HEAD cancel 經嚴格 document/loader 機制分類，unexpected0。最終 About 補驗另有 fresh context/network 記錄，沒有因標記為 HEAD 就忽略任意錯誤。所有請求同源 GET/HEAD，沒有新增收件、Cookie/Storage 寫入、外部媒體、Analytics 或 API。

## 33 項規格驗收

| Test ID | 項目 | 適用性 | 狀態 |
| --- | --- | --- | --- |
| A11Y-C01 | `npm ci` | Required | PASS |
| A11Y-C02 | `npx tsc --noEmit` | Required | PASS |
| A11Y-C03 | `npm run lint` | Required | PASS |
| A11Y-C04 | `npm run build` | Required | PASS |
| A11Y-C05 | `npm run build:pages` | Required | PASS |
| A11Y-F01 | 全公開頁／共享互動 inventory | Required | PASS |
| A11Y-S01 | Semantic／Heading／Landmarks／Language | Required | PASS |
| A11Y-T01 | axe WCAG 2／2.1 A／AA | Required | PASS |
| A11Y-T02 | axe WCAG 2.2 AA 支援 | Required | PASS |
| A11Y-T03 | 2.2 完整適用性矩陣 | Required | PASS |
| A11Y-K01 | Keyboard／Focus | Required | PASS |
| A11Y-K02 | 2.4.11 焦點不被完全遮蔽 | Required | PASS |
| A11Y-K03 | 2.5.8 Target Size | Required | PASS |
| A11Y-V01 | Color Contrast／非純顏色 | Required | PASS |
| A11Y-AT01 | Screen Reader 人工驗證 | Required | PASS |
| A11Y-O01 | 行動 AT／其他平台 | Optional | PENDING |
| A11Y-S02 | Alt／Logo／Decorative | Required | PASS |
| A11Y-X01 | 真實 Forms labels／errors | Not Applicable | N/A |
| A11Y-X02 | 3.3.7 Redundant Entry | Not Applicable | N/A |
| A11Y-X03 | 3.3.8 Accessible Authentication | Not Applicable | N/A |
| A11Y-X04 | 2.5.7 Dragging | Not Applicable | N/A |
| A11Y-X05 | Disabled 原生控制 | Not Applicable | N/A |
| A11Y-O02 | Dev Showcase 停用範例 | Optional | PENDING |
| A11Y-R01 | 200% Browser Zoom | Required | PASS |
| A11Y-R02 | Reflow 320 CSS px | Required | PASS |
| A11Y-R03 | 文字間距覆寫 | Required | PASS |
| A11Y-R04 | 320／375／768／1440／1920px | Required | PASS |
| A11Y-R05 | Reduced Motion | Required | PASS |
| A11Y-F02 | HTTP／Links／Pages | Required | PASS |
| A11Y-G01 | 開發驗收路由保護 | Required | PASS |
| A11Y-F03 | Console／Runtime／Network | Required | PASS |
| A11Y-G02 | Metadata／noindex 回歸 | Required | PASS |
| A11Y-X06 | 自動認證／保證聲明 | Not Applicable | N/A |

25 Required PASS、6 有據 N/A、2 Optional PENDING。每列的程序／環境／預期／實際／真 Exit 或手動不適用原因／證據／限制見 verification.json，沒有只用「測試通過」代替依據。

## WCAG 2.2 A／AA 完整矩陣

| 準則／等級 | 結果 | 本輪判定依據 |
| --- | --- | --- |
| 1.1.1 Non-text Content／A | PASS | Logo 等價名稱與裝飾 aria-hidden 經 DOM/AX 及真 AT 檢查，介面 icons 無雜訊。 |
| 1.2.1 Audio-only and Video-only (Prerecorded)／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.2.2 Captions (Prerecorded)／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.2.3 Audio Description or Media Alternative (Prerecorded)／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.2.4 Captions (Live)／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.2.5 Audio Description (Prerecorded)／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.3.1 Info and Relationships／A | PASS | 九頁 heading/list/nav/section 標記與 AX 具名稱，真 AT 能按 heading／landmark 定位。 |
| 1.3.2 Meaningful Sequence／A | PASS | DOM/AX 順序及真 AT 代表旅程一致；布局換欄不改內容閱讀順序。 |
| 1.3.3 Sensory Characteristics／A | PASS | CTA／導覽有文字名稱，操作不僅以形狀、位置或方向指示。 |
| 1.3.4 Orientation／AA | PASS | portrait/landscape 布局可讀；Contact375×812／812×375 真 viewport 轉換無鎖定／水平溢出。 |
| 1.3.5 Identify Input Purpose／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.4.1 Use of Color／A | PASS | Planned／未確認狀態皆有實際文字；連結、按鈕、focus 並非只靠顏色傳訊。 |
| 1.4.2 Audio Control／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 1.4.3 Contrast (Minimum)／AA | PASS | 原 4.2941FAIL 已修；最終 gradient 保守下界≥5.1333，UI 文字≥4.9748，全部 incomplete 逐項。 |
| 1.4.4 Resize Text／AA | PASS | 真 Chrome200%與 CSSviewport590×378，九頁 main 全文比對；新 About 高度／功能完整。 |
| 1.4.5 Images of Text／AA | PASS | 正文為 HTML 文字；Logo 屬品牌圖樣例外，無正文圖片文字或虛構作品圖。 |
| 1.4.10 Reflow／AA | PASS | 九頁 320CSSpx 無水平溢出；最終 Aboutcard／文字／錨點可完整操作。 |
| 1.4.11 Non-text Contrast／AA | PASS | Menu/X icons 與適用 focus 輪廓具足對比；21 狀態實測，裝飾淡邊線非必要識別資訊。 |
| 1.4.12 Text Spacing／AA | PASS | 實際覆寫四項間距；About 保留初 FAIL 及 min-h-maxFAIL，naturalheight 最終 glyph／clip／hit 斷言通過。 |
| 1.4.13 Content on Hover or Focus／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.1.1 Keyboard／A | PASS | 實際 Tab/ShiftTab/Enter/Space/Escape、skip、anchors 及目錄／CTA 旅程可用。 |
| 2.1.2 No Keyboard Trap／A | PASS | disclosure 無 trap，內部 Tab 保留展開，Tab 離開保留原生新焦點、Escape 回 trigger。 |
| 2.1.4 Character Key Shortcuts／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.2.1 Timing Adjustable／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.2.2 Pause, Stop, Hide／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.3.1 Three Flashes or Below Threshold／A | PASS | 實際靜態內容無閃爍／頻閃；ReducedMotion 與動畫清冊確認。 |
| 2.4.1 Bypass Blocks／A | PASS | 首個可操作 skiplink 具可見 focus、Enter 至 main，真 AT 亦能定位 main。 |
| 2.4.2 Page Titled／A | PASS | 九頁 Title 各自精確唯一且描述目的，實際 HTTP/DOM 與真 AT 跨頁 title 確認。 |
| 2.4.3 Focus Order／A | PASS | 九頁焦點順序及 About320 新錨點實測，未改原生順序或造成隱藏 tabstop。 |
| 2.4.4 Link Purpose (In Context)／A | PASS | 實際 linknames 結合 section／article 語境可理解，真 AT 選單及三作品連結名稱／URL 確認。 |
| 2.4.5 Multiple Ways／AA | PASS | Footer 完整網站目錄＋Portfolio 分類 overview；九頁實際完整 9URL、兩種定位與鍵盤／AT 真旅程。 |
| 2.4.6 Headings and Labels／AA | PASS | heading/label 內容與實際 purpose 一致；九頁 DOM/AX／真 AT 代表 heading 已讀。 |
| 2.4.7 Focus Visible／AA | PASS | 實測 focus-visible／outline 與鍵盤，五張真圖及 native200% focus 可見。 |
| 2.4.11 Focus Not Obscured (Minimum)／AA | PASS | 原焦點全遮蔽 FAIL 已修，九頁 Tab 離開選單閉合，真 200%／AT 時主焦點可見。 |
| 2.5.1 Pointer Gestures／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.5.2 Pointer Cancellation／A | PASS | 可信 pointerdown 後移出再 pointerup 沒有意外開啟或導航；正常 click/tap 仍可用。 |
| 2.5.3 Label in Name／A | PASS | 可見 link 文字及 menu button 名稱一致；icons decorative，不以 aria-label 覆蓋真文字。 |
| 2.5.4 Motion Actuation／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.5.7 Dragging Movements／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 2.5.8 Target Size (Minimum)／AA | PASS | 實際 geometry 及 axe target-size 覆蓋，維持 44px 控制項，沒有小於 24px 候選。 |
| 3.1.1 Language of Page／A | PASS | 最終九頁 html lang=zh-TW，HTTP／DOM／AX 確認。 |
| 3.1.2 Language of Parts／AA | PASS | 明確英文 brand／headings 有 lang 標示，技術詞依語境；source 及 DOM／真 AT 代表英文 heading 確認。 |
| 3.2.1 On Focus／A | PASS | Tab／focus 只改 focus 視覺，不自動跨頁；真正 Enter/Space 或點擊才啟動操作。 |
| 3.2.2 On Input／A | PASS | disclosure 展開不意外改上下文；無表單輸入／自動提交流程。 |
| 3.2.3 Consistent Navigation／AA | PASS | 九頁共用 header／footer／mobile 順序一致，完整 directory 固定位置。 |
| 3.2.4 Consistent Identification／AA | PASS | 共用相同 labels 與控制項名稱，menu 開啟／關閉狀態語意可理解。 |
| 3.2.6 Consistent Help／A | PASS | 所有頁面 Contact 入口位置／名稱一致，未確認管道不偽裝可收件；無漂移 help 機制。 |
| 3.3.1 Error Identification／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 3.3.2 Labels or Instructions／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 3.3.3 Error Suggestion／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 3.3.4 Error Prevention (Legal, Financial, Data)／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 3.3.7 Redundant Entry／A | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 3.3.8 Accessible Authentication (Minimum)／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |
| 4.1.2 Name, Role, Value／A | PASS | 原生 link/button 與 aria-expanded/controls/names，DOM/AX 及真 Orca collapsed/expanded 朗讀實測。 |
| 4.1.3 Status Messages／AA | N/A | 最終九頁 HTML／實際 DOM／Network 確認無此對應功能；依保留的適用性理由，本輪無媒體、表單／個資輸入、auth、drag、多手勢／motion、單字鍵捷徑、內容計時／自動更新、hover 新增內容或 status message。 |

34 項 Required PASS、21 項 N/A。N/A 基於實際無媒體／表單／auth／多步輸入／drag／motion／單字鍵捷徑／內容時間限制／hover 新增內容／status message 等清冊，不代表沒環境或沒測。標準全文段落、唯一 Test ID、原判定理由與證據映射存 verification.json。

## 截圖與人工視覺檢查

Root 實看指定五張與 About 修正前後：焦點可辨、320 換行完整、展開 menu 可操作、漸層文字可讀、Logo 比例及 Footer 目錄未失真。Screenshot 輔助視覺，不替代 AT／數值證據。

- [桌面 keyboard focus](../screenshots/task012-keyboard-focus-desktop.png)
- [手機 disclosure](../screenshots/task012-mobile-navigation.png)
- [原生 Chrome200% UI](../screenshots/task012-zoom-200.png)
- [320 CSS px](../screenshots/task012-reflow-320.png)
- [對比與 Footer focus](../screenshots/task012-contrast-states.png)

原生截圖原始 JPEG 封存；指定 PNG 為相同解碼像素的無損格式轉存，未裁切、縮放或修圖。四張其他 PNG 來自實際 Pages 狀態。它們的 Home／Contact／Footer 在最終 bridge 保持相同 runtime／CSS，沒有把不同頁舊圖冒充新 About；About 另有本輪真實前後診斷 PNG。

## 檔案、文件與完整性

- `AGENTS.md`
- `README.md`
- `docs/implementation-notes.md`
- `docs/reports/about-implementation.md`
- `docs/reports/brand-design-system.md`
- `docs/reports/github-pages-deployment.md`
- `docs/reports/homepage-implementation.md`
- `docs/reports/implementation-notes.md`
- `docs/reports/services-implementation.md`
- `docs/task/README.md`
- `docs/task/task002.md`
- `docs/task/task003.md`
- `docs/task/task004.md`
- `docs/task/task005.md`
- `docs/task/task006.md`
- `docs/task/task007.md`
- `docs/task/task008.md`
- `docs/task/task009.md`
- `docs/task/task010.md`
- `docs/task/task011.md`
- `docs/task/task012.md`
- `docs/task/task013.md`
- `docs/task/task014.md`
- `src/app/globals.css`
- `src/components/layout/mobile-navigation.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/sections/about/about-cta.tsx`
- `src/components/sections/about/about-hero.tsx`
- `src/components/sections/contact/contact-cta.tsx`
- `src/components/sections/contact/contact-hero.tsx`
- `src/components/sections/home-contact-cta.tsx`
- `src/components/sections/home-hero.tsx`
- `src/components/sections/portfolio/portfolio-cta.tsx`
- `src/components/sections/portfolio/portfolio-hero.tsx`
- `src/components/sections/portfolio/project-detail.tsx`
- `src/components/sections/services/services-hero.tsx`
- `src/components/sections/solutions/solutions-cta.tsx`
- `src/components/sections/solutions/solutions-hero.tsx`
- `docs/reports/task012-implementation.md`
- `docs/reports/task012-artifacts/{README.md,verification.json,manifest.json,evidence.tar.xz}`
- `docs/screenshots/task012-{keyboard-focus-desktop,mobile-navigation,zoom-200,reflow-320,contrast-states}.png`

22 份 Markdown／118 個 href 機械 rebasing 因應 main 文件搬移；原正文／標題／歷史數據保持，有剝除 href 後全文比對證據。保留根目錄完整 implementation history 與 reports 內舊前綴快照。AGENTS 更新 Task012 規則、README／task 索引／根 notes 追加本次入口。未重初始化或修改文件 Repository。

## Known Issues 及後續責任

- 沒有未解決的本次 Required 驗收 FAIL／BLOCKED。保留所有原始網站 FAIL、工具 FAIL 與修正重驗，不改寫或刪除。
- 行動 VoiceOver/TalkBack、NVDA/Firefox／其他平台、受控 Dev disabled 範例與真實使用者研究未執行，兩個 Optional 項目保持 PENDING；這個範圍不是全面認證或全裝置保證。
- Owner 需另行處理最新品牌中文名、Logo03 核准／Provisional 與經營模式文案差異；本次只讀並記錄，不改品牌決策。法律/controller/effectiveDate/rightsContact 仍無核准，不開放 Privacy 或 Contact 收件。
- main 已刪除 alternate originals 造成 14 個歷史 relative link 缺口；固定版本參考保留，本次不復原使用者移除的檔案。其餘本輪新增連結須實際存在。
- DevTools UI 受組織政策阻擋，沒有繞過；以原生 UI 真 zoom＋支援的 Browser 只讀 DOM 取得 viewport。初次 bs4 工具缺失改標準庫；SVG title 僅 accessible name 非 painted text，全文比較修正精確排除此類標記後重驗，未排除真正文。
- 對比定位工具兩次 FAIL、隔離 Turbopack symlink 失敗、舊 About 診斷未分類 HEAD 原 Exit1 等原始限制皆保留。QA network classifier 未放寬。
- 原生專屬 browser 清理實際 return0；Orca/SD child0，但 AT launcher 因外部停止核心程序真 exit1。這是工具生命週期結果，不冒作網站失敗或憑空改成 0；伺服器由 owned group 停止的 143 亦另列。

## PR、合併及部署界線

本報告與本機證據先於 PR 完成。完整 Diff、格式／路徑／連結／機密與產物檢查後，Commit／Push feature，建立 main 為 base 的 PR。當時 PR CI、Review、merge、main CI、部署、公開 Smoke 仍為 PENDING；使用者本輪合併授權已明確，不再要求相同確認。

依同一 PR 後續實際紀錄核對最終 head、jobs、下載 artifact 與本機受測 CSS／font／頁面；CI 成功不等於人工 Review 批准。獲授權合併後，另外確認 mergeSHA 對應 main CI／github-pages 部署及公開九頁／資源／BasePath／metadata／noindex／保護。沒有改 workflow、DNS、Secrets 或發布未審 feature preview；不把本報告完成或 PR artifact 當正式部署成功。

[原始證據操作說明](task012-artifacts/README.md)提供真實 logs、JSON 與工具快照；後續遠端識別碼更新同 PR，不為記錄自身 SHA 再提交循環文件。

## 交付前文件檢查

已實際檢查完整 tracked／untracked 清單與 Diff，107 個 runtime 檔 SHA 對應最後受測版本；git diff --check 為 Exit 0。Markdown API 實際驗證四份完整新文件及兩份新段落，共六個輸入、零錯誤；初次段落缺虛擬 H1 的工具 FAIL 保留，補正測試文件框架後重驗，未停用規則。共檢查 363 個本機 Markdown 路徑，僅保留上述 14 個已存在的歷史缺口，無新增壞連結。未提交建置目錄、依賴或機密；原始封存的檔案 SHA／大小與來源另以 manifest 核對。
