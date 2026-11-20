# Task 013 — Vercel 部署準備與驗證紀錄

本報告是 2026-11-20 的準備階段交付，依 [Task 013](../task/task013.md)、[AGENTS](../../AGENTS.md) 與 [協作流程](../subagent-workflow.md) 執行。**尚無指定 Vercel Team／Account／Project，未建立或連結外部 Project，未產生 Vercel Preview／Production；不宣稱 Task 013 全部完成。** 本機結果、GitHub PR／main CI、Pages 與 Vercel 分別記錄，遠端後續證據更新同一 PR 說明，不循環提交自身 SHA。

## 1. 版本、範圍與授權

| 項目 | 本次實際狀態 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，獨立根目錄 `.` |
| 已合併 Base | `97886abba03d358fef7853eb85360f4a84c5d751`，Task 012／PR #17 已合併；fresh fetch 後工作樹乾淨 |
| Feature Branch | `feature/website-vercel-deployment` |
| 受測程式碼 | 110 個 runtime／public／configuration／build 檔；SHA-256 `645f3c9bba97c1011cc35a773f6ffffaa1e1edac31768b1c43204ed8cb00f4b4`，逐檔 map 隨證據保存 |
| 未整合工作 | [文案 PR #18](https://github.com/xk2022/xk-website/pull/18) 仍待使用者決定，沒有整合未合併程式碼或擅自變更內容 |
| 當次授權 | 使用者明確要求執行 Task 013、開發／驗證／Push／PR、CI 通過後合併 main 及確認部署。沿用當次授權，不要求重複核准 Git 操作；未指定 Vercel 對象，不猜測 Team 或讀取未知管理員 session |
| 外部待確認 | 已詢問 Vercel Team／Account、既有 Project URL 或建立位置；尚未取得答案。依規格第 2、6 節，繼續本機與設定提案，外部保持 PENDING，未把尚未執行稱為權限拒絕 |

此次只有操作與驗證文件，沒有修改網站功能、元件、導覽、依賴、lockfile、Next 設定、Pages workflow、DNS、正式網域或文件 Repository。九個真實公開頁：`/`、`/about`、`/services`、`/solutions`、`/portfolio`、`/portfolio/corporate-website`、`/portfolio/enterprise-management`、`/portfolio/integration-hub`、`/contact`。`/privacy` 仍為受保護草案，三個 Portfolio 項目仍為 Planned，Contact 仍未提供已核實收件管道；不等於完整商業 MVP 已發布。

## 2. 來源與採用決策

Website 讀取 AGENTS、README、任務索引、Task 001–006、implementation-notes、已搬移至 reports 的 Design System／Homepage／About／Services／Pages 指南，以及目前 Next／CI／SEO／Privacy 實作。歷史結果僅用來理解架構，本次測試不沿用舊 PASS。來源 audit 保留實際檔案 SHA、Git Blob 及閱讀範圍。

文件 Repository 僅唯讀，最新 `main@9d0ed1282a6cf07bbaccdbf47f0220c37038080e`。Task 013 指定的五份來源及新增 Week 03 相關決策／部署文件已按該版本核對；來源清單及 Blob 見證據摘要。採用 Next.js、Git integration、Preview／Production、Secrets 與回復原則，不採舊 monorepo、Backend／API Env、建議 Project 名稱或未核准商業成果。新 Week 03 文件區分公司官網既有 Pages 與 AI 產品前端 Vercel 候選；本次官網 Task 013 指示不撤銷 Pages。新品牌／Logo 決議及未合併文案另行處理，不藉部署任務替換既有設計。

2026-11-20 重新查閱官方 Next.js、Git、Env、Node runtime、Deployment Protection、Instant Rollback 文件。安裝版本 `node_modules/next/dist/docs/` 的 Deploying、basePath、Environment Variables 亦已閱讀；basePath 在建置時決定，不能將 Pages artifact 原樣用於 Vercel 根路徑。官方文件支援 Next preset 與 Node 24，不代表特定 Project 已建立或平台建置已成功。

| 文件（固定文件 main 版本） | Git Blob |
| --- | --- |
| [05_Xplore Kaleidoscope 正式建置技術決策如下.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/00_initGPT/05_Xplore%20Kaleidoscope%20%E6%AD%A3%E5%BC%8F%E5%BB%BA%E7%BD%AE%E6%8A%80%E8%A1%93%E6%B1%BA%E7%AD%96%E5%A6%82%E4%B8%8B.md) | `3c96534c5835c1d07db97957f3e134df9fd62ee5` |
| [07_domain-hosting_網域、DNS、主機與部署架構規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-02/07_domain-hosting_%E7%B6%B2%E5%9F%9F%E3%80%81DNS%E3%80%81%E4%B8%BB%E6%A9%9F%E8%88%87%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83.md) | `3e7e7e9ba89939f75b1806241126daf6aed59df6` |
| [08_website-architecture_官方網站 Next.js 技術架構設計.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-02/08_website-architecture_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20Next.js%20%E6%8A%80%E8%A1%93%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88.md) | `d8b924328aa1e38736db1470dc2299d1b98fb735` |
| [09_website-mvp_官方網站 MVP 開發規格.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-02/09_website-mvp_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%20MVP%20%E9%96%8B%E7%99%BC%E8%A6%8F%E6%A0%BC.md) | `00da0b89ac65d25f0bb341c28f10c708e227055d` |
| [01_brand-identity_品牌視覺識別規範.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-02/01_brand-identity_%E5%93%81%E7%89%8C%E8%A6%96%E8%A6%BA%E8%AD%98%E5%88%A5%E8%A6%8F%E7%AF%84.md) | `07a151a2843577d95a075cbc1c61c36ecb470ff7` |
| [04_deployment-architecture_部署架構規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-03/04_deployment-architecture_%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83.md) | `eee9b7e77e3547ed4077b0c2094c7cecb3e0a583` |
| [07_technical-decisions_技術決策紀錄.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/01_business-plan/week-03/07_technical-decisions_%E6%8A%80%E8%A1%93%E6%B1%BA%E7%AD%96%E7%B4%80%E9%8C%84.md) | `3ed31e63709a6cd238c8c4977a8cee42f4222571` |
| [2026-11-19.md](https://github.com/xk2022/xplore-kaleidoscope/blob/9d0ed1282a6cf07bbaccdbf47f0220c37038080e/doc/decisions/2026-11-19.md) | `477014e4fc413a2c13a9e1ff4fd7428016ddb51c` |

Week 03 technical-decisions 僅針對部署／授權相關章節摘讀，其他指定五份、Week 03 deployment 與 dated decisions 完整閱讀或用明列的相同 bytes 全文 bridge 核對。官方來源：[Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs)、[Git](https://vercel.com/docs/git)、[Env](https://vercel.com/docs/environment-variables)、[Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)、[Protection](https://vercel.com/docs/deployment-protection)、[Instant Rollback](https://vercel.com/docs/instant-rollback)、[Hobby](https://vercel.com/docs/plans/hobby)、[Build](https://vercel.com/docs/builds/configure-a-build)、[prebuilt](https://vercel.com/docs/cli/deploy)。HTTP 200、查閱日期及各頁實際閱讀範圍見來源 audit，不代表私人平台設定驗收。

## 3. 可直接執行的設定契約

以下是**待指定 Project 後的提案**，不是已套用的平台現值。設定前先唯讀核對 Team、Project、方案／費用、操作者角色、GitHub App 授權、現有 Env 名稱及 scope、既有 Ready deployments，記錄必要非機密識別碼。若已有正確 Project，沿用它，不建立平行同名專案。

| 欄位 | 設定提案 | 平台現值 |
| --- | --- | --- |
| Owner／Team／Project／Plan／Role | 使用者指定並核對實際權限與費用；不猜測名稱／ID | PENDING |
| Git integration | 只連結 `xk2022/xk-website`；只給必要 repo 權限，不連文件 repo | PENDING |
| Framework | Next.js preset | PENDING |
| Root Directory | `.` | PENDING |
| Production Branch | `main` | PENDING |
| Install Command | `npm ci` | PENDING |
| Build Command | `npm run build` | PENDING |
| Output Directory | 保留 Next.js preset 預設，不設靜態 out／.next override | PENDING |
| Node.js | `24.x`，與 engines／.nvmrc 一致；以實際 build log 再核對 | PENDING |
| Preview／Production URL | 僅採用平台真實 deployment URL，不猜測 vercel.app 名稱 | PENDING |
| Deployment Protection | 唯讀核對方案、scope、公開存取要求；不為測試關閉保護或洩露 bypass token | PENDING |

現有 `next.config.ts` 僅在 Pages flag 啟用時 export／Base Path，普通模式符合上述契約。沒有當下相容性缺陷證據，不新增 vercel.json、Vercel CLI、npm dependency、Actions 部署管線、Token 或 prebuilt 流程。既有 `.next/` CI artifact 是診斷資料，`out/` 是 Pages artifact，均非 Vercel prebuilt。

### Env 審核

預期不需自訂 Vercel Env；以下是兩個 scope 都必須核對的名稱及用途，不含真實帳戶的變數值。未盤點前不能稱已確認 Project Env。

| 名稱 | Preview／Production 要求 |
| --- | --- |
| `XK_PAGES_EXPORT` | 不啟用 Pages export |
| `XK_PAGES_BASE_PATH` | 不從 Pages workflow 複製；普通模式根路徑無 `/xk-website` |
| `XK_DESIGN_SYSTEM_PREVIEW` | 不開啟公開開發驗收頁 |
| `XK_PRIVACY_PREVIEW` | 不開啟法律草案；此旗標僅限隔離 loopback 審閱，不是認證 |
| `NODE_ENV` | 平台管理，不自行覆寫 |
| `NEXT_PUBLIC_SITE_URL`／`NEXT_PUBLIC_API_BASE_URL` | 現有程式不需要，不新增虛構 Env／Backend |
| Token／API Key／私鑰 | Git integration 不需要把 Token 放進 repo；不讀認證檔或輸出值 |

### 首次 import、發布與 protection

先核對本次 Owner／Team／Project、同版本內容、Env、受審 Git SHA、既有部署與發布操作者。新 Git Project 預設優先選 main；首次 import 按 Deploy 可能直接建立既有 main 的 Production，不必等下一次 push／merge。main 連結後的 push／merge 亦可觸發 Production，feature 分支為 Preview；Git integration 不保證等待現有 Actions，不能在執行後才補發布門檻。當次使用者授權涵蓋本任務 PR／合併與部署；缺少的是實際對象與平台條件，沒有另行推定其他帳戶、付費升級、DNS 或 rollback 演練授權。

在正確 Project 取得 feature SHA 的實際 Preview ID／URL／log，完成遠端 HTTP、九頁、資源、noindex、導覽與桌機／手機截圖，再核對 Production gate。Protection 保留；用已授權的檢視程序，401／403 與內容驗收分開。官方方案支援及費用以當次 Dashboard 為準：不可把公開文件支持 protection 當成此 Project 已設定，亦不為驗收購買 addon。

## 4. 驗收環境與證據規則

Linux x86_64、Node.js v24.22.1、npm 11.9.0、Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。Chromium 156.0.8078.79／Playwright Core 與 axe 使用外部暫存測試工具，不增網站 dependencies。測試前未發現四個自訂預覽／Pages 旗標或本機 env 檔；僅記名稱存在性，未讀帳戶憑證。

所有長指令由 `scripts/run-with-evidence.py` 保存實際 command、cwd、UTC 起訖、exit、log SHA；工具零值／非零值／timeout 契約的預期為 0／7／124，保留其原始回執，非零自測不代表網站 FAIL。原始證據保留失敗及重驗，不覆寫。

本機普通 server 為 `http://127.0.0.1:3030/`；先停止它，才建置 Pages 並於 `http://127.0.0.1:3031/xk-website/` 驗證。這些是本機 URL，不是 Vercel。可及性採本次基本回歸，不重宣稱 Task 012 的完整 55 準則／真實 AT／原生縮放稽核，也不虛構實體手機或 field CWV。完整結果、每項命令、預期／實際、exit、環境與 raw paths 見證據摘要。

## 5. 測試矩陣

Required／Optional／Not Applicable 為適用性；PENDING／PASS／FAIL／BLOCKED／N/A 為執行狀態。未執行的外部測試 exit 不適用，不能填 0。下表為本機實際結果；PR／main／平台後續實際紀錄更新同一 PR。

| Test ID | 適用性／預期 | 本次實際結果 | Exit | Status |
| --- | --- | --- | --- | --- |
| V13-L01 | Required：npm ci；locked install，無 lockfile 變更 | 實際安裝 616 packages，package／lockfile 未變 | 0 | PASS |
| V13-L02 | Required：tsc 與 lint 各自成功 | npx tsc --noEmit、npm run lint 完成；lint 零警告門檻保留 | 0／0 | PASS |
| V13-L03 | Required：無 Pages flag 的一般 build／3030 server | 普通 build 完成，3030 Ready，受測後主動停止才建置 Pages；初次 EPERM 保留並重試 | build 0；停止 TERM 143 非網站失敗 | PASS |
| V13-L04 | Required：九頁 HTTP 200、404／dev／privacy 保護、Metadata／根路徑 assets | 普通模式九頁 HTTP／精確 Metadata／JSON-LD 通過，五個預期 404／robots 與根路徑資源通過 | 最終 browser 0 | PASS |
| V13-L05 | Required：停止普通 server 後 Pages build／Base Path／路由／404／.nojekyll／dev 排除 | Pages build 204 檔，九頁／18 組版面、.nojekyll／404／Base Path／草案及 dev payload 排除通過 | build 0；browser 0 | PASS |
| V13-L06 | Required：九頁五寬、links／anchors、menu／Escape／Focus／skip、reduced motion、Console／Runtime／Network／assets | 普通 45 組、Pages 18 組；各 170 links／89 anchors、18 keyboard／9 mobile／9 reduced-motion journeys。無溢出／裁切候選或非預期 network／console／runtime 錯誤 | 0／0；coverage 116／62 完整 | PASS |
| V13-L07 | Required：九頁及展開選單 axe 2／2.1 A／AA、人工名稱／Heading／對比／鍵盤 | 本次 27 次 axe 零 violations；336 incomplete 另有實際 computed style／遮擋及保守對比判斷。九頁 headings／名稱、焦點與真實截圖已檢視，非完整認證 | axe suite 0；人工資料／判定 helper 0／0 | PASS |
| V13-A01 | Required：指定資源、平台現值、角色／方案 | 未指定 Team／Account／Project，未探測未知 session | 未啟動 | PENDING |
| V13-A02 | Required：當次授權／首次 import 副作用／權限盤點 | 設定與自動發布效果已提案，實際 integration 尚待指定 Project | 未啟動 | PENDING |
| V13-A03 | Required：兩 scope Env 與 Secret 安全 | 名稱／用途契約已列，平台現值未盤點 | 未啟動 | PENDING |
| V13-P01 | Required：真正 Preview ID／URL／SHA／logs | 尚無真實 Vercel Deployment | 未啟動 | PENDING |
| V13-P02 | Required：真正 Preview HTTP／Browser／資源 | 尚無真實 Preview URL；本機證據不替代 | 未啟動 | PENDING |
| V13-P03 | Required：真正 Preview Metadata／noindex／內容 | 尚無真實 Preview response | 未啟動 | PENDING |
| V13-C01 | Required：exact-head PR CI／Pages Deploy SKIPPED／Review | PR 尚未建立；後續更新同一 PR | 未啟動 | PENDING |
| V13-R01 | Required：Production gate／main SHA／角色／前版 | 當次有部署授權，平台對象／角色／前版待確認 | 未啟動 | PENDING |
| V13-R02 | Required：真正 Vercel Production；Pages main 分開記錄 | 尚無 Vercel Deployment，不借用 Pages 成功 | 未啟動 | PENDING |
| V13-R03 | Required：真正 Production 公開 URL／Browser | 未取得平台實際 URL，不猜測網址 | 未啟動 | PENDING |
| V13-R04 | Required：實際前版／方案／操作者與回復程序 | 程序已提案，未能核對實際 Project／前版／權限 | 未啟動 | PENDING |
| V13-O01 | Optional：必要且另授權才實際生產回復 | 未演練；不切換正式服務來取得測試 PASS | 未啟動 | PENDING |
| V13-O02 | Optional：額外效能／實體裝置診斷 | 未執行；本次無可重現瓶頸，不代替 Task 011 | 未啟動 | PENDING |
| V13-N01 | Not Applicable：DNS／Domain／SSL／Backend | Task 014 或不在範圍，不修改或新增服務 | 不適用 | N/A |

### 命令與證據對照

[證據說明](task013-artifacts/README.md) 與原始封存保存各 command／procedure、Expected／Actual、環境、退出碼、來源 SHA 與限制。V13-L01 對應 checks/npm-ci，L02 對應 checks/tsc 與 checks/lint，L03 對應 checks/build 與普通 server receipts；L04／L06／L07 對應 normal/retest，L05／L06 對應 checks/build-pages 與 pages/initial。每個正式 browser run 另保存每個子 Test ID 的程序、實際資料、完整性與來源 before／after。

兩個模式各有九頁 Metadata／Canonical／Open Graph／Twitter／JSON-LD／noindex 檢查，以及 Cookie／Storage／IndexedDB 的真實 before／after（普通 45、Pages 18 contexts）與無寫入觀察。普通 28、Pages 205 個實際觀察資源皆另以完整 GET 驗證。Pages 原始記錄有 180 次 Next.js prefetch HEAD cancellation，逐筆符合 CDP loader、實際 fulfilled HEAD 200、同文件 tree GET 200、Next callsite 與獨立 GET／HEAD 200 的既有嚴格分類，非預期錯誤為 0；沒有忽略 GET、資源、Console 或 Runtime 錯誤。

報告產生後的普通與 Pages 三份 CSS 已逐 byte hash 相符，亦與已合併 Task 012 artifact 的同名 CSS 相同；這只證明 CSS 未膨脹，不沿用歷史網站驗收。最終 PR artifact 仍需另核對實際 CI 版本。

### 人工判斷與實際本機截圖

本次 27 份 axe 的 336 個 color-contrast incomplete 分為 290 個 gradient 與 46 個 expanded-menu overlap。已在相同受測來源、三份 CSS byte-identical 的 Pages DOM 逐項對應實際 selector（27 cases／336 selectors 均唯一），取得 foreground／alpha／不透明背景／gradient／ancestor／panel geometry／九點遮擋資料。axe 原始 HTML 有 12 個 class 截短，以實際 opening attributes 與明確 class-prefix 核對，不將截短誤作網站差異。

按目前實際圖層最大 alpha 重新計算保守界限：淺色 surface／白底的 secondary 最差 5.1333:1；其他實際深色前景更高。深色 Home 卡片依所有圖層順序的逐 channel 最亮上界與實際白字 alpha 評估，亦高於 4.5:1。未用 muted 的不足界限四捨五入；本次 incomplete 實際前景沒有該情形。41 個文字節點整個被不透明手機面板覆蓋，僅該遮住狀態不適用文字對比，未將整個測試 N/A；5 個部分覆蓋的可見文字及 290 個 gradient 項目皆用實際前景與保守背景判定。具體值、逐項決定與限制見 manual-adjudication.json；不是把 axe incomplete 全自動 PASS 或用九個取樣點證明每一個 glyph。

Root 檢視本次九頁的 headings／導航名稱及真實 keyboard 資料，另實際查看 skip link、main CTA、展開 menu 的三張 focus 截圖：輪廓可見，Tab／Shift+Tab、Escape 與離開 wrapper 的焦點行為保留。全部 63 組版面沒有溢出／裁切候選；Home／About 桌機及手機完整頁已視覺檢視。手機 initial／retest PNG bytes 相同，以 SHA bridge 保存一次原檢視，不把它重稱第二次查看。

以下四張均為 **LOCAL 普通 production**，不是 Vercel Preview；URL／指紋／UTC／PNG SHA 及尺寸保存在結果與 manifest：

| 實際圖檔 | Viewport／PNG 尺寸 | 人工檢視 |
| --- | --- | --- |
| [Home 手機](../screenshots/task013-local/LOCAL-normal-home-375.png) | 375 × 1000／375 × 10596 | PASS；內容順序及 Footer 正常 |
| [Home 桌機](../screenshots/task013-local/LOCAL-normal-home-1440.png) | 1440 × 1000／1440 × 6316 | PASS；雙欄 Hero、卡片與導航正常 |
| [About 手機](../screenshots/task013-local/LOCAL-normal-about-375.png) | 375 × 1000／375 × 10252 | PASS；卡片自然高度、內容未裁切 |
| [About 桌機](../screenshots/task013-local/LOCAL-normal-about-1440.png) | 1440 × 1000／1440 × 6367 | PASS；版面正常，未合併 PR #18 的舊文案另列待辦 |

真正 Vercel Preview Desktop／Mobile、設定與成功 log 截圖仍為 PENDING。沒有帳戶或 deployment URL，不用本機圖冒充。兩個 browser collector 的 overall/manual 原始狀態保持 PENDING，最終人工裁定獨立保存，不回寫原始觀察。

## 6. 回復計畫與 Production gate

1. 指定 Project 後，先保存目前 Production 與前一個可回復 Ready Deployment 的 ID、SHA、真實 URL、時間、內容範圍；查實際 plan／role 與 rollback 功能。不讀或封存 secrets。
2. 若首次部署沒有前版，明列「沒有可回復 Vercel 前版」限制；保留既有 Pages，停下失敗發布、修復受審版本再建置，不假造 prior ID，也不未經授權重指流量。
3. 本次僅準備文件的 PR，可於本機驗收、exact-head quality／pages-build 成功後依當次授權合併，Vercel 仍為 PENDING。後續真正 Vercel 發布須另完成指定 Project 的 Preview 必要驗收、內容／Env／權限 gate 及受審 main SHA 對照，再觸發對應 Production；不要把準備 PR 合併當成平台發布 gate 已完成。Pages main run 與 Vercel 分開核對，Vercel Ready 後另做九頁 HTTP、資源、保護與導覽驗收。
4. 啟動回復條件為新部署有影響公開存取、資源／互動、草案外洩或 noindex 退步等已證實問題。由已確認有權限的發布操作者，依當次核准的回復範圍，在正確 Project 的 deployment 選擇已核對 eligible 前版／Instant Rollback；未另授權不做演練。
5. 官方目前 Hobby 限緊接前版，Pro／Enterprise 可選 eligible、曾綁 Production domain 的版本；未曾 Production 的 Preview 不是可假定的 Instant Rollback 前版。操作後 production domains 的自動指派可能停止，須依當次官方程序核對 promote／恢復行為，不能只看舊 Ready。
6. 回復後重新核對實際 environment、deployment ID、SHA、公開 URL／HTTP／assets／noindex／草案保護與 Pages；記錄原因、影響、操作者、時間、結果及恢復自動發布狀態。Task 014 才處理正式網域，不在本次改 DNS／www／SSL。

### 已保留的環境失敗與重試

第一次啟動普通 server 未取得網路 sandbox 權限，`listen 127.0.0.1:3030` 回 EPERM、Exit 1。保留 normal-server 的原始 log／receipt；以相同程式及相同 port、明確 network permission 重啟後實際 Ready，HTTP GET 已收到 response。這是環境啟動失敗，沒有改網站或用其他 port 迴避驗收；後續正式瀏覽器驗收仍須另完成，原失敗不改寫。

初次普通瀏覽器矩陣的工具預期將首頁 Canonical／OG root 尾斜線設為 `/`，Next.js 普通模式實際輸出品牌 origin（無尾斜線）。已用獨立 HTTP HTML parser 確認 Canonical 與 OG 均指向相同品牌 root，並核對其餘頁面；這是工具對序列化的預期錯誤。原 normal/initial 保留 FAIL（Homepage 1440 項目及連帶 coverage 不完整），不修改網站 Metadata；修正測試工具後另以 normal/retest 執行普通模式矩陣，與原 run 分別保留。

人工判定工具曾有 Python 語法錯誤及兩次對 axe 截短 HTML 的過嚴比對，原 helper 版本、真實 Exit 1／log 保留；先核對所有實際 opening attributes（差異僅 href 與 12 個 axe class 截短）再修工具，最終同一批 336 節點完整判定 Exit 0，未改網站或降低對比門檻。

Markdown 初次檢查發現報告一處連續空行（MD012），已刪除多餘空行；原失敗 JSON 保留，完成內容後再驗最終格式。npm ci 的 ESLint 上游 deprecated 提示保留於 log，實際 install／lint 不忽略錯誤，也不在本次升降級既有套件。

## 7. Known Issues 與尚待確認

| 項目 | 狀態／影響 | 解除方式 |
| --- | --- | --- |
| Vercel 目標未知 | PENDING；必要平台 inventory／Preview／Production／rollback 無法執行，Task 013 未完整完成 | 使用者提供 Team／Account 及既有 Project URL，或確認新 Project 所屬 Team；再唯讀核對 access／plan／integration |
| 平台權限與 protection | PENDING；尚未實際遭拒，不冒作 BLOCKED 或 N/A | 正確 Project 內核對操作者與 scope；有實際拒絕才記錯誤及解除條件 |
| 真正 Vercel 截圖 | PENDING；沒有 Preview URL，不能拿本機圖標為 Vercel 圖 | 實際 Preview Desktop／Mobile 及設定／成功 log；Production 另附真實證據 |
| 文案 PR #18／品牌來源差異 | 未合併工作保持獨立；本任務不擅自整合或替換 Logo／品牌 | 使用者決定 PR #18；品牌更新另依核准範圍處理 |
| Privacy／Contact／Portfolio | 草案保護、收件未開放、Planned 展示保留 | 各自同版本核准／真正管道與完成證據，不以 CI 或部署授權代替 |

FAIL 不改稱 PASS。可修正問題先修復再重驗，保留原始失敗；外部拒絕記錄真正原因及影響。必要 PENDING／FAIL／BLOCKED 存在時，不宣稱整個任務完成，不降低標準或跳過測試取得 PASS。

## 8. 檔案、Git 與交付界線

修改 README、implementation-notes；新增本報告與必要的非機密驗收證據／本機截圖。沒有網站程式或平台設定差異。完整 diff、Markdown／路徑與機密／產物檢查後，依本次授權 commit／push feature、建立 main PR、確認 exact-head CI，再合併並獨立核對 main Pages 部署及公開 URL。Vercel 階段維持真實 PENDING，這是準備階段合併，不是 Vercel 上線宣告。

受測 runtime 指紋不因報告／遠端識別碼變動而重跑無關 suite；新文件需檢查 Markdown、路徑及 Tailwind CSS 是否增加 utilities。後續任何程式／設定修正都依實際影響補驗，並同步來源 map。PR CI、Review、merge、main CI、Pages 部署與公開驗證以及 Vercel Preview／Production 均分開記錄，未發生不預填。
