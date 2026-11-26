# Task 012 — Accessibility 網站無障礙改善

## 1. Task Overview

以 **WCAG 2.2 AA** 為目標，對所有實際已實作頁面及互動元件進行自動與人工檢查、修正及重新驗收，讓語意、閱讀順序、鍵盤、焦點、輔助科技、視覺及不同輸入方式維持可用。

既有 Task 001–005 的 axe WCAG 2／2.1 A／AA 成果是歷史回歸基礎，不代表已符合 2.2，也不是完整認證。本 Task 獨立於 SEO、Performance、Contact／Privacy 開發與部署；不為測試創造假表單、假登入或未完成產品。此輪只撰寫未來規格，不修改 UI、不執行網站測試，所有待驗收結果為 PENDING。

## 2. Repository & Prerequisites

| 項目 | 要求 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一可修改；文件 Repository 僅讀 |
| 本次原碼盤點基準 | `e2a8f5a33f24d1ea65a3afc3780014a33c204528`，不是 Task 012 已執行或已通過之證據 |
| 執行 Base／Feature Branch | 開始時核對最新已合併 `main`／`feature/website-accessibility`，保留使用者未提交修改 |
| 功能依賴 | 沿用 Task 001–005 架構／Design System；依執行當時實際 inventory 納入後續頁面，不要求尚未實作的 Task 006–011 全部先完成 |
| 協作依賴 | Task 008 真實表單／第三方工具、Task 009 隱私與 Task 011 效能修改若已存在須納入；並行工作以最終受測版本重驗 |
| 建置模式 | 一般 Next.js production 與現有 GitHub Pages 靜態輸出，保留 noindex 與 Base Path |
| 未來獨立報告 | `docs/reports/task012-implementation.md`，本輪不建立假報告 |

目前盤點可見首頁、About、Services、共用 Header／Footer、Skip Link、disclosure 型 MobileNavigation，以及不公開匯出的開發 Design System Showcase。選單已有 Button、aria-expanded／controls、Escape 與焦點回復，Button 有原生 disabled 與 asChild 型別界線；這些原碼並不取代實際 rendered UI 與 AT 操作驗證。

## 3. Reference Documents

- [AGENTS.md](../../AGENTS.md)、[README.md](../../README.md)、[Task 清單](README.md)。
- [Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)。
- [歷史 implementation notes](../98_decisions/implementation-notes.md)、[品牌設計系統](../reports/brand-design-system.md)、[首頁實作紀錄](../reports/homepage-implementation.md)、[About 實作紀錄](../reports/about-implementation.md)、[Services 實作紀錄](../reports/services-implementation.md)。
- [GitHub Pages 部署指南](../reports/github-pages-deployment.md)、實際 `src/app/`、`src/components/`、`src/config/`、`public/`、`scripts/build-github-pages.mjs`、`.github/workflows/ci.yml`、`package.json`、lockfile 及 `next.config.ts`。

規格優先順序為當次使用者明確指示、已合併且確認的網站架構／Design System、當次任務要求、已確認品牌決策，再參照舊規劃。歷史測試只證明當時版本與範圍，不作為本 Task 新結果。

下列文件來源均為 `xk2022/xplore-kaleidoscope`、`main` 的固定 Commit `95ef1275a46ace76e11f668178ca881087483398`；檔案與 Blob 已依唯讀快照核對。文件狀態及採用範圍不能由檔名「正式」或範例程式碼推定為已核准／已實作。

| 來源路徑 | Git Blob SHA | 狀態與採用範圍 |
| --- | --- | --- |
| `doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` | `59f6c1151015bdec746229e78596e2311cdc2f6f` | 開頭 ASK 提供技術決策；採 Next.js／Tailwind／shadcn 及官網可獨立顯示。後續 ANS 的 monorepo、Backend、next-intl、產品原型不視為本網站已核准實作。 |
| `doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 初版規劃；採專業、可讀、Responsive、必要才使用 Client Components 的原則，不採舊色票或未完成產品宣稱。 |
| `doc/01_business-plan/week-02/03_color-palette_品牌色彩系統規範.md` | `98baa236493f25351c6b991cb9dd1cecf672dc39` | 初版規劃；採實際對比與非純色彩傳達的要求；舊色值不能覆蓋已合併的八個 UI Tokens。 |
| `doc/01_business-plan/week-02/04_typography_品牌字體與排版規範.md` | `596ce5b3d09642c33289abb672199e0998bcf08e` | 初版規劃；採 Inter／Noto Sans TC、可讀階層、Next Font 自託管與 fallback；合法本機字體只是備選，不擅換字體。 |
| `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃；§13.5 是 CWV 建議目標，§15 指向 WCAG 2.2 AA，§16 提及 Lighthouse／axe。採適用的工程原則，不當成既有量測、完整認證或部署證據。 |
| `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃；採 Responsive、Accessibility、Lighthouse 與實際驗收方向；表單、API、Analytics、Vercel／正式域名均須另依現況及授權。 |

固定版本可由 [文件 Repository 快照](https://github.com/xk2022/xplore-kaleidoscope/tree/95ef1275a46ace76e11f668178ca881087483398) 查閱。此 Repository 僅供讀取，不能建立 Branch、Commit、Push 或修改遠端內容。

當次標準依 [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 與適用 Understanding 文件判定。現有文件色彩規範以 2.1 AA 為基本目標，而最新任務明確要求 2.2 AA；本 Task 擴充 2.2 適用準則，仍保留 2／2.1 回歸。保留品牌與元件 API，不把私有規劃的舊色票、monorepo、未建立表單／產品當作既有功能。

## 4. Scope & Requirements

### 執行範圍

- 盤點當下所有公開路由、內容模式及互動狀態，至少涵蓋首頁、About、Services、Header／Footer、手機導覽開／關、跨頁與頁內 CTA。
- 以實際 rendered DOM／Accessibility Tree、鍵盤、指標、縮放、對比、Reduced Motion、螢幕閱讀器與 axe 檢查；不能只以 source 的 aria 或 class 推定通過。
- 修正已確認問題，保持原設計系統、內容事實與功能；共享元件修改須回歸所有引用頁面。
- 建立 WCAG 2.2 A／AA 適用性矩陣，追蹤每個 issue 的嚴重度、對應準則、影響頁面、修正與重驗；不能只交出「零 axe violations」。

### Pending Confirmation

| 決策／環境 | 誰與時點 | 未確認時 fallback |
| --- | --- | --- |
| 實際頁面與功能清單、Task 008 是否已提供真實表單或第三方元件 | 工程師與網站負責人在 audit 前確認 | 依已實作 inventory 驗收；不存在的功能記有理由的適用性，不建立假功能 |
| 至少一組桌面 Screen Reader／Browser／OS 可用環境 | 工程師在驗收前安排，必要時由網站負責人提供可用測試裝置 | 無可用 AT 時必要人工項目記 BLOCKED 並列解除條件；Accessibility Tree 可補充，不能代替真實 AT 或宣稱完整通過 |
| 行動輔助科技、更多平台與使用者測試 | 網站負責人依受眾及可用資源於 audit 計畫確認 | 可選案例保持 PENDING 並說明未覆蓋範圍，不冒稱已測真機 |
| 品牌配色／互動行為若無法以現有 Token／API 修正 | 工程師先提出具體 rendered 反例，品牌／功能負責人在變更前確認 | 優先使用已有合格配色與語意修正；未核准不改八色／Logo／品牌字體，阻礙交付的問題不得隱藏 |
| 第三方表單／驗證服務或認證功能的控制權 | 相應服務管理者在修改外部設定前確認 | 可修正站內整合；不能控制的問題照實記錄 FAIL／BLOCKED、受影響流程及下一步，不把第三方排除即當完整認證 |

## 5. Information Architecture & UX

保留原有路由及內容架構。本 Task 改善使用者完成同一任務的方式，不另造頁面或改寫已確認商業內容。

人工主要旅程：進入頁面 → 使用 Skip Link 到主要內容 → 依 landmarks／headings 理解頁面 → 操作桌面／手機導覽 → 展開／關閉選單與 Escape → 跨頁及 CTA／錨點定位 → 閱讀內容／服務清單 → 返回或繼續導覽。每次導航後焦點與可見位置應合理，不能卡住、跳到隱藏內容或被浮層完全遮住。

MobileNavigation 為 disclosure，不假定它是 modal；維持正確展開語意與正常頁面操作，不為它任意加入 focus trap／role=menu 或隱藏其餘網站。未來真正 modal 如有新增，才依 modal 模式驗收。正常瀏覽、200% 放大、320 CSS px reflow、文字間距覆寫及 Reduced Motion 下都需完成主要旅程。

## 6. Content & Data Specification

### Audit inventory 與 issue contract

未來報告至少紀錄：`route`、`component`、`state`、`codeVersion`、`buildMode`、`viewport`、`zoom`、`inputMethod`、`atBrowserOs`、`criterion`、`applicability`、`expected`、`actual`、`severity`、`status`、`evidence`、`fix`、`retestId`。狀態依第 11 節五值；沒有資料用 null／原因而非虛構結果。

每項實際問題以穩定 `A11Y-*` ID 追蹤，包含影響使用者、可重現步驟、截圖／AX tree／操作紀錄、修正及最終重驗。自動工具的 incomplete／needs-review 需人工判定；不能當作通過或不適用。

### 內容／語意規格

- 每頁單一明確 H1、合理 H2／H3 與閱讀順序；Header／Navigation／Main／Footer landmarks 及多個 nav 名稱可辨。使用真實 `<button>`／Link，不以可點 div 取代原生互動。
- HTML 主語言保留 `zh-TW`，英文品牌／標語及必要內容適當標示；Accessible Name 包含可見標籤，icon-only 控制有辨識名稱，不靠位置或顏色作唯一提示。
- Logo 沿用原始 SVG 與 Provisional 狀態。已有可見品牌文字的裝飾 Logo 避免重複朗讀；有意義圖像有適當替代文字，裝飾圖樣 `aria-hidden` 且不進 tab 順序。不能以 logo 例外免除其連結的名稱／焦點要求。
- 正常文字對比至少 4.5:1，大型文字至少 3:1（依 WCAG 字級／字重定義），必要 UI 邊界／圖形及相關焦點狀態依適用 1.4.11 至少 3:1。Inactive UI、Logo 等例外須逐項說明，不能擴用到一般內容；既有 Small Button 至少 44px 的設計不得降至最低 24px。
- 表單若真實存在，提供可程式關聯 label、instructions、required／autocomplete、清楚錯誤訊息與修正方式、焦點／狀態通知；對實際無資料提交風險的內容不虛構 error 或 success。

### WCAG 2.2 新增 A／AA 重點

| Success Criterion | Level | 人工驗證及適用性 |
| --- | --- | --- |
| 2.4.11 Focus Not Obscured (Minimum) | AA | 鍵盤焦點元件不能完全被作者內容遮住；實測 Header、浮層、手機選單、錨點與縮放。這是 AA minimum，不冒充 AAA 的 Focus Not Obscured Enhanced 或 Focus Appearance 要求。 |
| 2.5.7 Dragging Movements | AA | 若存在 drag 操作，提供不需拖曳的 single-pointer 替代，依 essential／user-agent 例外記錄。盤點時沒有 drag 功能可有依據記 N/A，不為測試新增拖曳。 |
| 2.5.8 Target Size (Minimum) | AA | 檢查 24×24 CSS px 或足夠間距，以及 inline／equivalent／essential／user-agent 等適用例外；保留既有 44px touch targets，不以例外規避手機選單／CTA。 |
| 3.2.6 Consistent Help | A | 若提供幫助機制，檢查在一組頁面中的相對位置一致；依實際功能、使用者變更及標準例外判定適用性。 |
| 3.3.7 Redundant Entry | A | 若同一流程要求重複資料，應自動填入或可選擇既有資料，安全／必要／過期例外須說明。無對應流程時依實際 inventory 判 N/A。 |
| 3.3.8 Accessible Authentication (Minimum) | AA | 若有認證，不以記憶／抄寫／解謎等認知測試作唯一方式；核對標準允許的替代／協助／例外、password manager 與 paste。不存在 auth 時不新增假登入，依據記 N/A。 |

以上涵蓋 WCAG 2.2 新增的兩項 A 與四項 AA，仍應盤點其餘全部適用 A／AA；不能只測新增重點就宣稱完整合規。舊 2.1 的 Parsing 4.1.1 在 2.2 移除，保留工具相容性／有效語意檢查但不錯列成 2.2 新增準則。引用 criteria 時核對標準版本與層級。

## 7. Design System & Technical Constraints

重用現有 Section、Container、Button、Card、XkLogo、BrandPattern 及九種 type utilities；保留 Inter／Noto Sans TC 與既有 fallback／swap、八個 UI Tokens 及 Muted 文字／Surface 背景分層，不另造主題。對比不足時先檢查實際配色／Opacity／focus，可選已有合格配對；確有品牌決策影響才走確認程序，不默改 Logo 或品牌 HEX。

維持 Next.js App Router、React、Strict TypeScript、Tailwind CSS 4、shadcn/ui、Lucide、Node 24 及相依版本。靜態內容仍為 Server Components；互動修正只限必要 Client 邊界，不能將整個 Layout 變 client。不新增 Runtime 套件、追蹤、Backend、CAPTCHA、登入或重造表單。

人工檢查至少一組可用桌面 Screen Reader／Browser：例如 NVDA＋Firefox（Windows）或 VoiceOver＋Safari（macOS），記錄真實版本與操作。其他可用組合須說明支援與限制；可補充 Orca／行動 VoiceOver／TalkBack。沒有實際使用的工具不得填 Pass，自動 AX tree 不能冒充真人 AT 閱讀結果。

## 8. Navigation, SEO & Deployment

不改路由／Canonical／OG／索引政策；保留 `noindex, nofollow` 及 `zh-TW`。可修正真正的連結語意、名稱、焦點與跳轉，但目的地必須存在，並沿用 Next.js Link／Base Path，不能為無障礙新增失效頁或虛構聯絡方式。

一般 Build 與 Pages export 都需驗收，Pages 的預設 `/xk-website`、trailingSlash、`.nojekyll`、404、所有資源與開發路由保護保持正常。Accessibility 修正不授權更動 Workflow 部署條件、Vercel／DNS／Secrets 或正式發布。第三方元件的可及性按真實載入狀態驗證，不用關掉實際功能或外部依賴隱藏問題。

## 9. File Structure & Change Scope

| 位置 | 未來可能的必要修改 |
| --- | --- |
| `src/components/layout/` | 手機選單、Header／Footer、Skip Link 對應與焦點流程；保持共用 API |
| `src/components/ui/button.tsx`、`card.tsx` | 原生語意、names、disabled／連結界線與 focus；共享修改回歸所有引用 |
| `src/components/sections/`、`src/app/` | 標題／landmarks／alt／順序／路由焦點及實際新增表單的適用錯誤處理 |
| `src/app/globals.css` | 最小的 Focus、reflow、contrast 配對、reduced-motion 修正；不平行建立 tokens |
| `src/config/` | 有證據的 accessiblelabel 或真實內容修正，商業／聯絡事實仍需確認 |
| `docs/reports/task012-implementation.md` | 未來獨立 audit／issue matrix／修正及實際驗收報告 |
| `docs/reports/task012-artifacts/` | 未來 axe JSON、criteria 適用性表、AT／鍵盤操作紀錄；不建立假 log |
| `docs/screenshots/task012-*.png` | 未來實測 focus／zoom／reflow／responsive 證據 |

實際 Diff 依問題決定，不預設所有檔必須修改。保留 Dependencies／lockfile／原始 SVG／字體／既有 Workflow；不提交 `.next/`、`out/`、`node_modules/` 或個資。文件 Repository 只讀，本輪只撰寫本規格，不改上述程式檔或建立報告。

## 10. Implementation Procedure

1. 確認最新 main／分支／使用者修改與前置功能，建立 `feature/website-accessibility`；讀來源及所有實作報告，不把歷史 axe 成功當新結果。
2. 依當時實際 route、共享元件與狀態建立 inventory；確認 AT／Browser／工具、criteria 版本、forms／drag／auth 適用性與測試 profile。
3. 以 `npm ci`、一般 Build 及 Pages Build 建立受測 production 版本；不要只測開發 HMR 或原始碼。
4. 修改前先執行 axe 2／2.1 A／AA 回歸、2.2 工具支援檢查與人工 audit，記錄每個 A11Y issue 及嚴重度。
5. 以原生語意、現有元件及最小樣式修正；對共享元件先確認所有使用頁面。不要透過刪除內容、停用規則或隱藏互動規避問題。
6. 執行鍵盤／AT 主要旅程、200% zoom、320 CSS px reflow、文字間距覆寫、五種指定寬度、Reduced Motion、觸控與實際表單分支。
7. 以最終程式碼重跑全部受影響與必要回歸，確認兩模式 HTTP、Metadata、noindex、Base Path 與資源，保留原始 fail 及修復紀錄。
8. PR 前完成獨立報告、issue／criterion 矩陣、axe raw JSON、人工 AT 步驟、截圖與限制，對應實際受測 tree／diff。
9. 檢查完整 Diff、Conventional Commit、Push Feature Branch、建立 PR 並確認實際 CI；後續審查／合併／main CI／部署與公開驗證分開處理，不自行發布。

## 11. Testing & Acceptance Criteria

### Test Status Definitions

適用性與執行狀態分開記錄：`Required`、`Optional`、`Not Applicable` 表示測試是否適用；以下五個值才是執行狀態。所有待執行項目的初始狀態為 `PENDING`。

| 狀態 | 意義與記錄規則 |
| --- | --- |
| PENDING | 尚未執行；記錄待辦事項。Optional 選擇不執行時，保留此狀態並說明原因，不因此改為 N/A。 |
| PASS | 已實際執行且符合預期，附上可追溯證據。 |
| FAIL | 已實際執行但未符合預期，記錄原因、影響、修正與重驗結果。 |
| BLOCKED | 因外部服務、權限、素材或環境條件，無法開始或完成驗收；記錄實際阻礙及解除條件，不冒作 N/A。 |
| N/A | 經本次適用性判定確認不適用，記錄理由與判定依據；不能用來掩蓋未執行、失敗或外部阻礙。 |

歷史報告中的 `NOT RUN` 僅保留原始寫法；本次正式執行統一使用 `PENDING`。若測試已產生不符合預期的結果，保留 `FAIL` 與外部原因，不因外部原因改寫成 PASS。

### 品質、功能及標準適用性

所有項目初始為 PENDING，使用唯一 `A11Y-*` ID；Required／Optional／Not Applicable 與執行狀態分欄。

| 項目／指令 | 適用性 | 驗收要求／理由 | 狀態 |
| --- | --- | --- | --- |
| `npm ci` | Required | 使用既有 lockfile／Node 24 安裝，記錄真實 ExitCode，無意外依賴變更 | PENDING |
| `npx tsc --noEmit` | Required | Strict TS 與元件 API 保持相容 | PENDING |
| `npm run lint` | Required | 沿用既有規則、零錯誤警告，不以 disable 掩蓋問題 | PENDING |
| `npm run build` | Required | 一般 Next.js production 功能與路由完整 | PENDING |
| `npm run build:pages` | Required | 保持靜態輸出與已實作頁面，不依賴新增 server runtime | PENDING |
| 全公開頁／共享互動 inventory | Required | 至少首頁、About、Services；當時新頁面一併掃描，選單開關及真實主要旅程都測 | PENDING |
| Semantic／Heading／Landmarks／Language | Required | 實際 DOM 與 AX Tree 有單一 H1、適當層級／names／閱讀順序，zh-TW 及英文標註合理 | PENDING |
| axe WCAG 2／2.1 A／AA | Required | 執行舊標準回歸並保存 raw violations／incomplete／passes 及版本；不能只看 source | PENDING |
| axe WCAG 2.2 AA 支援 | Required | 查工具 rule tags（如 `wcag22aa`），有支援則一併執行；未支援的準則人工覆蓋，不能把工具未檢出當整體 PASS | PENDING |
| 2.2 完整適用性矩陣 | Required | 按實際功能對全部適用 A／AA 逐項判定，保留判定依據，不只列新增重點就宣稱全面合規 | PENDING |
| Keyboard／Focus | Required | Tab／Shift+Tab／Enter／Space／Escape、Skip Link、選單可完成主要旅程，無 trap，關閉後焦點合理，無隱藏 tabstop | PENDING |
| 2.4.11 焦點不被完全遮蔽 | Required | 在選單／浮層／錨點／縮放實際狀態操作，至少滿足 AA minimum，保持可見 Focus | PENDING |
| 2.5.8 Target Size | Required | 實測 24×24 CSS px 或標準允許 spacing／例外，理由逐項記錄；維持既有 44px 控制項設計 | PENDING |
| Color Contrast／非純顏色 | Required | 4.5:1 一般字／3:1 大字與適用 UI 圖形，實測所有背景／必要狀態；例外不可泛用 | PENDING |
| Screen Reader 人工驗證 | Required | 至少一組真實桌面 AT＋Browser＋OS 操作 headings／landmarks／names／menu／CTA，保存操作觀察；缺環境為 BLOCKED 而非 N/A | PENDING |
| 行動 AT／其他平台 | Optional | 資源允許補測 VoiceOver／TalkBack 等真機環境，不冒稱未執行組合已 PASS | PENDING |
| Alt／Logo／Decorative | Required | 實際有意義圖片替代文字正確；裝飾 SVG／圖示不重複朗讀或進 tab，原稿比例與暫定狀態未變 | PENDING |
| 真實 Forms labels／errors | Not Applicable | 本次盤點沒有公開真實表單；若執行時 Task 008 或其他頁面已有表單則改 Required，測 label、required、instructions、error association、通知與恢復 | PENDING |
| 3.3.7 Redundant Entry | Not Applicable | 盤點無對應流程，每次執行重新確認；若新增真實多步資料輸入就改 Required，測重複資料與例外，不能因缺環境略過 | PENDING |
| 3.3.8 Accessible Authentication | Not Applicable | 盤點無 auth；有認證時改 Required 並測認知測試替代／password manager／paste／錯誤，本 Task 不新增假登入 | PENDING |
| 2.5.7 Dragging | Not Applicable | 盤點無 drag；實際出現 drag 時改 Required，測 single-pointer 替代及標準例外，不把未測當 N/A | PENDING |
| Disabled 原生控制 | Not Applicable | 盤點公開 UI 無需停用的控制項；當時存在真實 disabled 元件則改 Required 驗證不可啟動、名稱與視覺，不為測試新增假功能 | PENDING |
| Dev Showcase 停用範例 | Optional | 可在明確開啟的受保護驗收頁補做既有 ButtonDemo 回歸，不能將 dev 測試替代公開流程或打開正式入口 | PENDING |

axe 執行工具以可取得的版本為準；例如先由 `axe.getRules()`／工具文件確認 tag 支援，再對實際頁面執行 `wcag2a`、`wcag2aa`、`wcag21a`、`wcag21aa` 及可用 `wcag22aa`。工具缺漏以人工 criterion 測試補足；工具／瀏覽器環境無法執行而必要驗收未完成時如實 BLOCKED，不以空白結果當零違規。

### Zoom、Responsive 與 Runtime

| 項目 | 適用性 | 驗收要求／理由 | 狀態 |
| --- | --- | --- | --- |
| 200% Browser Zoom | Required | 所有內容、控制與閱讀流程不丟失／重疊，使用真實瀏覽器 zoom 並記 CSS viewport | PENDING |
| Reflow 320 CSS px | Required | 在 320 CSS px 寬或對應 1280px／400% zoom 實測無非必要二維捲動；真正二維內容的標準例外逐項說明 | PENDING |
| 文字間距覆寫 | Required | 依 1.4.12 覆寫行高為字級的 1.5 倍、段落間距 2 倍、字距 0.12 倍、詞距 0.16 倍，確認內容／功能不丟失；測試覆寫不永久改中文設計字距 | PENDING |
| 320／375／768／1440／1920px | Required | 五種指定寬度的全部公開頁、Header／Footer／menu、CTA 及技術標籤無溢出／遮蔽，觸控不依賴 hover | PENDING |
| Reduced Motion | Required | OS／browser 偏好 reduce 下實際過渡／動畫／捲動符合設計，保留核心內容與操作 | PENDING |
| HTTP／Links／Pages | Required | 所有真實路由 HTTP 200、有效錨點及 Base Path、資源正確；未知路由／404、.nojekyll 維持正常 | PENDING |
| 開發驗收路由保護 | Required | 一般 production 預設 dev 頁 404、Pages 產物排除 dev route，不為測試打開公開入口 | PENDING |
| Console／Runtime／Network | Required | 無未處理錯誤、hydration 問題或 CSS／JS／fonts／Logo 資源失敗；外部失敗照實記錄 | PENDING |
| Metadata／noindex 回歸 | Required | Title／Description／Canonical／OG／語言與 noindex／nofollow 保護保持，不變 SEO 政策 | PENDING |
| 自動認證／保證聲明 | Not Applicable | 工具掃描不是完整認證，本 Task 不得建立虛構認證、標章或全裝置保證 | PENDING |

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

獨立報告使用 `docs/reports/task012-implementation.md`；未來與實作 PR 一起交付，本輪不建立假結果或假連結。報告包含當次 route／state inventory、完整 2.2 適用性矩陣、所有 A11Y issues 及 severity、已修正與剩餘阻礙，不能只列工具成功訊息。

保存實際 axe JSON／tags／版本、AT＋Browser＋OS 的逐步操作與實際朗讀／焦點觀察、200% zoom／320 CSS px reflow、對比數值及例外、Reduced Motion、五種指定寬度與公開／dev 狀態。不存在的 forms／drag／auth 給出基於 inventory 的 N/A 依據；工具或權限不足保留 BLOCKED，未選的 Optional 保留 PENDING 並說明。

未來證據檔名如下，只有真實產生後才加入連結：

| 內容 | 未來位置 | 初始狀態 |
| --- | --- | --- |
| axe 原始 JSON、criteria 與 AT 操作紀錄 | `docs/reports/task012-artifacts/` 或真實 CI artifact | PENDING |
| 桌面鍵盤 Focus | `docs/screenshots/task012-keyboard-focus-desktop.png` | PENDING |
| 手機導覽展開／Focus | `docs/screenshots/task012-mobile-navigation.png` | PENDING |
| 真實 200% zoom | `docs/screenshots/task012-zoom-200.png` | PENDING |
| 320 CSS px 重排 | `docs/screenshots/task012-reflow-320.png` | PENDING |
| 對比／狀態樣本 | `docs/screenshots/task012-contrast-states.png` 加實際數值紀錄 | PENDING |

Screenshot 可輔助證明視覺與 Focus，不能證明 AT 朗讀正確；需相應操作紀錄。若使用錄音／影片，先去除個資與憑證且保留來源、測試條件與授權，不擅錄真實使用者。

### Evidence Requirements

每項測試使用唯一 Test ID，盡可能完整提供下列欄位；無法取得的證據須在 Notes 說明實際原因。預期結果與實際結果分欄記錄，不得只寫「測試通過」而沒有可追溯的驗收依據。

| 欄位 | 說明 |
| --- | --- |
| Test ID | 本次報告內唯一且穩定的測試識別碼，可供問題、截圖與重驗紀錄引用。 |
| Test Item | 測試項目、對應第 11 節要求、適用性及範圍。 |
| Command / Procedure | 實際執行的完整指令、參數或人工操作步驟。 |
| Environment | OS、Node.js、npm、Browser 與工具版本；附執行時間、URL、建置模式、Base Path、Viewport 及受測程式碼版本。 |
| Expected Result | 執行前依規格確認的預期結果，不因失敗而降低標準。 |
| Actual Result | 本次實際觀察到的結果、錯誤、數值及測試範圍。 |
| Exit Code | 真實退出代碼；人工操作或未啟動的命令填「不適用」並附原因，不捏造 0，且不因此把整項 Status 改為 N/A。 |
| Status | 僅使用 PENDING / PASS / FAIL / BLOCKED / N/A，依第 11 節定義判定。 |
| Evidence | 對應的 Log、Screenshot、HTTP Response、Actions run／job 或其他可追溯證據位置；無實際檔案不建立假連結。 |
| Notes | 問題、限制、適用性理由、Known Issues、修正及重驗 Test ID／證據。 |

### Report Completion Gate

- 獨立實作／測試報告的本機驗收內容必須在建立 PR 前完成，並與功能程式碼一併納入該 PR；不得在缺少本機報告時宣稱可完整交付。
- 報告須記錄受測程式碼的 Commit 或 tree／diff、測試時間及範圍，並在 PR 對照實際提交版本。最後一次本機測試必須對應實際提交的程式碼；不能引用舊版本結果冒充現版驗收。
- 後續修改程式碼時，必須重跑受影響測試與必要回歸，同步更新報告、截圖及證據，再確認最終程式碼版本一致。僅新增報告或遠端結果時，也須確認受測程式碼未改變並檢查文件連結。
- PR CI、PR Review、合併後 main CI、部署與公開網址驗證尚未發生時，如實保留 `PENDING` 並說明階段；實際發生後補上真實證據，不為了 PR 前完成報告而預填成功。

## 13. Git & Pull Request

未來 Feature Branch 為 `feature/website-accessibility`，Base 為確認過的最新 main；建議 Commit `fix(a11y): improve audited accessibility issues`。PR 包含實際 issue／criterion 矩陣、共享元件影響、修正前後證據、AT／axe／鍵盤／zoom 等實測、Known Issues 及限制。

本機獨立報告須在 PR 前完成並隨程式碼交付，對照最終受測 tree／diff；不預填 SHA、PR 號或 CI Run。不直接 Push main，不自行合併、發布或更改部署條件。此次規格撰寫只在 `docs/task-specifications-006-014` 交付文件，不表示 Task 012 已完成。

### Review, Merge & Deployment Boundaries

下列階段各自記錄狀態與證據，不能互相替代；本機／PR 交付不要求執行尚未授權的合併或發布。

| 階段 | 必須確認的依據與界線 |
| --- | --- |
| 本機開發與驗收 | 第 11–12 節適用檢查、受測程式碼版本、實際結果與獨立報告。 |
| Feature Branch Commit | 已提交並推送的實際 SHA 與完整 Diff，對照報告中的受測程式碼；Commit 本身不代表 PR CI 通過。 |
| PR CI 驗收 | 本次 PR head 的實際 run／job、建置與 artifact；Deploy SKIPPED 不代表正式部署成功。 |
| PR Review | 記錄實際審查狀態、意見及處理結果；CI 成功不等於審查通過。 |
| 使用者授權合併 | 取得明確授權後才可合併，並記錄真實 PR／Merge SHA／時間；未授權時保持待審，不自行合併。 |
| 合併後 main CI | 若已獲授權合併，核對 Merge SHA 對應的 main run／jobs，不沿用 PR CI 結果。 |
| 正式部署與公開網址驗證 | 分別確認部署工作成功，以及實際公開 URL 的 HTTP、頁面內容、靜態資源、Base Path 與必要 Smoke；僅部署成功而未檢查公開 URL 時，公開驗證仍為 PENDING。 |

不能把 PR CI 通過、artifact 產生或 PR 合併直接視為正式網站部署成功。未獲合併／發布授權，或未取得部署及公開 URL 證據時，最終報告須分別說明實際狀態，不更改既有部署條件來取得成功結果。

## 14. Deliverables

- 當下所有已實作路由／互動的 audit inventory、WCAG 2.2 A／AA 適用性與已確認的 AT 測試環境。
- 最小且可維護的語意／鍵盤／focus／contrast／reflow 等修正，共享元件與所有引用頁面回歸。
- `docs/reports/task012-implementation.md`、真實 axe artifacts、issue／修復／重驗矩陣、人工 AT 操作與限制、指定真實截圖。
- 所有品質／Build／Pages／Browser／Responsive／無障礙的實際結果、Exit Code、Known Issues、Feature Commit／PR／CI 與各交付階段證據。
- 繁體中文最終報告；只描述已測頁面、狀態、裝置及工具範圍，不聲稱完整無障礙認證。

## 15. Out of Scope & Future Work

不重新設計品牌、不加 Dark Mode、Backend、表單服務、CAPTCHA、登入、Analytics 或未實作的功能；不得補造創辦人／聯絡資訊或使用假頁面作驗收。

Task 008 真實表單、未來第三方服務、尚未實作頁面、更多 AT／行動裝置及實際使用者測試在取得條件後補測。網站每次新增或改變互動、內容／焦點／字體／主機，都應重驗受影響範圍；本次 audit 不保證未來所有版本或所有輔助科技。

SEO 索引、Vercel／Domain 及正式發布保留各自 Task 及授權邊界，不把無障礙通過等同正式上線資格或法律認證。

## 16. Final Delivery Checklist

以下是未來 Task 012 初始清單，本輪不代填網站功能與測試結果。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — 已確認最新程式碼、所有公開路由／共享互動、實際 forms／drag／auth 適用性。
- [ ] PENDING — 已建立完整 WCAG 2.2 A／AA 矩陣，保留既有 2／2.1 回歸，未混淆 AA 與 AAA。
- [ ] PENDING — Semantic、Headings、Landmarks、Language、Names、Alt 與裝飾用途完成實際 UI 驗證。
- [ ] PENDING — Keyboard、Focus、Skip Link、MobileNavigation、2.4.11 與 2.5.8 完成實測；適用 2.5.7／3.3.7／3.3.8 分支已驗證或有理由 N/A。
- [ ] PENDING — 至少一組真實 Screen Reader／Browser／OS 完成主要旅程；缺環境未冒稱通過。
- [ ] PENDING — axe 版本／tags／原始結果、人工 incomplete 判定、對比與適用狀態都已記錄。
- [ ] PENDING — 200% zoom、320 CSS px reflow、文字間距、五種指定寬度與 Reduced Motion 實測完成。
- [ ] PENDING — npm ci、Strict TS、Lint、一般／Pages Build、HTTP／links／資源／Console／Runtime 回歸完成。
- [ ] PENDING — noindex／Metadata／Base Path／404／.nojekyll／開發路由保護、原 Logo 與字體保持完整。
- [ ] PENDING — 獨立報告、指定截圖與 artifact 可追溯，問題嚴重度／修復／重驗／限制完整，未稱完整認證。
- [ ] PENDING — Diff、Feature Commit、PR、實際 CI 與繁體中文交付報告完成，未自行合併／發布。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
