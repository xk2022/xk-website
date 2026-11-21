# Bugfix 001–008 — 首頁與方案內容優化驗證

本次依使用者指定的八份改善文件、[AGENTS](../../AGENTS.md) 及 [協作流程](../subagent-workflow.md) 正式實作；使用者明確授權 Push／PR、CI 通過後合併與確認部署。八份原始文件保留，不把重複建議變成八套功能或重做原有里程碑。

## 1. 版本、來源與範圍

Website Base 為 fresh main `e0ab48c50273b2dbcf8454ae97d7c2f468da8689`，初始乾淨，分支 `feature/bugfix001-008`。指定合併式 URL 沒有單一檔案；最新 main 實際新增 [bugfix001](../task/bugfix001.md) 至 [bugfix008](../task/bugfix008.md)。Root 已全文閱讀並核對實作，不改原始輸入或其他 Repository。

文件 Repository 最新 main `dca3329c556bdd88113181384543b5923e25618b`，較前輪 `9d0ed128…` 前進一個 commit；只全文讀取本次六份必要來源並驗 Git Blob，不擴讀無關計畫。來源 audit 保存 path／commit／blob／SHA／閱讀範圍及差異。

| 來源 | 本次採用及界線 |
| --- | --- |
| week-01/02_service-catalog.md | 網站、Java、API 整合、AI 及維護能力；交付方向依需求與合約範圍確認，不承諾固定功能或成果 |
| week-02/01_brand-identity、02_logo-guidelines | 原圖比例／色彩／同源使用；新文件正式 Logo03／中文名與 bugfix008 暫定要求有差異，採當次輸入保留 provisional |
| week-02/06_homepage-copywriting | Hero、服務、技術分類、品牌整合價值與方案方向 |
| week-04/01_portfolio-strategy | 展示計畫、開發中與完成狀態須依證據；維持三案 PLANNED，不虛構畫面或案例 |
| doc/decisions/2026-11-20.md | 六類商業範圍已確認；其與現有 Services 五類的對應及獨立方案／AI 頁仍待辦，不擅改現有五項首頁服務或開新路由 |

來源完整路徑及 Blob 以實際 audit 為準；既有 Task 001–013 報告為歷史快照，不沿用其 QA PASS。已閱讀安裝 Next.js 版本的 CSS、Link、basePath／build 文件，保留現有 Turbopack/Tailwind integration，不套用文件中的重新安裝示例。

| 完整來源（固定 main 版本） | Git Blob |
| --- | --- |
| [doc/01_business-plan/week-01/02_service-catalog.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/01_business-plan/week-01/02_service-catalog.md) | `99babf871dda0cf5537fecb00a20f9638f3f6f60` |
| [doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/01_business-plan/week-02/01_brand-identity_%E5%93%81%E7%89%8C%E8%A6%96%E8%A6%BA%E8%AD%98%E5%88%A5%E8%A6%8F%E7%AF%84.md) | `24576e8628cbd5bdc11ff5d67be8ba6dc1b3ea09` |
| [doc/01_business-plan/week-02/02_logo-guidelines_XK Logo 設計與使用規範.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/01_business-plan/week-02/02_logo-guidelines_XK%20Logo%20%E8%A8%AD%E8%A8%88%E8%88%87%E4%BD%BF%E7%94%A8%E8%A6%8F%E7%AF%84.md) | `f631d43bad92932f0ade2e8c660ce2a0c11ad619` |
| [doc/01_business-plan/week-02/06_homepage-copywriting_官方網站首頁文案規劃.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/01_business-plan/week-02/06_homepage-copywriting_%E5%AE%98%E6%96%B9%E7%B6%B2%E7%AB%99%E9%A6%96%E9%A0%81%E6%96%87%E6%A1%88%E8%A6%8F%E5%8A%83.md) | `e99f87b3225d9cc04a9bb40ffffc2a33489b593e` |
| [doc/01_business-plan/week-04/01_portfolio-strategy_XK 技術作品展示策略.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/01_business-plan/week-04/01_portfolio-strategy_XK%20%E6%8A%80%E8%A1%93%E4%BD%9C%E5%93%81%E5%B1%95%E7%A4%BA%E7%AD%96%E7%95%A5.md) | `98e69f79e65f3a599e32859cd574b437f6b86193` |
| [doc/decisions/2026-11-20.md](https://github.com/xk2022/xplore-kaleidoscope/blob/dca3329c556bdd88113181384543b5923e25618b/doc/decisions/2026-11-20.md) | `f021c6269a7925d77c42d42d7025e571991ba80f` |

## 2. 八份建議的採用矩陣

| 原始文件 | 內容與本次處理 |
| --- | --- |
| bugfix001 | Hero 增企業價值文案、品牌 eyebrow、三個服務標籤與真實作品入口；Services／Technology／Why／Solutions 建議合併到下列實作 |
| bugfix002 | 與 001 的服務／技術／Why／Solutions 重複；五服務卡加常見需求、XK 方案、可規劃交付及實際連結 |
| bugfix003 | 技術能力改五個語意分類卡片，保留現有技術項目，改用對外說明；Why／Solutions 重複整併 |
| bugfix004 | 強化 Why 的跨網站、Java 與 AI 整合價值，保留四個價值重點，不承諾成本降低或保證成效 |
| bugfix005 | Solutions 的情境／問題／方案／技術由現有四篇 article 提供；補條件式交付與相關規劃作品，首頁改連詳解 |
| bugfix006 | 與 005 相同 bytes；同一套實作及驗收，不重複建立頁面 |
| bugfix007 | 與 005 相同 bytes；獨立方案路由與正式收錄仍為後續，保留 noindex／nofollow |
| bugfix008 | 已確認 Header／Footer 同一 XkLogo 路徑源，primary／white variants 保持比例；favicon 與原 Symbol bytes 相同。保留暫定身分，不硬換直式白稿或建立未核准 OG 圖 |

不新增空殼詳頁；既有 `/solutions` 四篇已包含問題、情境、技術與實施方向，本次用實際 anchor 深連結減少重複內容。獨立方案頁應在有獨立內容／SEO release 規格後執行。社群 OG Image 仍需可發布素材與分享設定驗收，保留既有無圖 Twitter summary；這是明確後續，不冒稱本次已製作。

## 3. 實作與內容保護

- Hero 保留品牌 slogan／technical tagline、既有 Logo／Tokens／字體。主 CTA 到首頁服務錨點，次 CTA 到 `/portfolio`，旁註為自製展示方向與目前狀態，未將規劃稱為客戶交付成果。
- 五張服務卡保留 R01–R05 及 service-* anchors。詳細服務以 ServiceId 對應真實 `/services#<id>`；AI 為 ai-automation。Maintenance 保留 R05，連到 cloud-infrastructure 並標「了解部署維護」，不假造 Maintenance 詳頁或服務分類。
- Technology 用五個具名稱的 article 卡片，與 Services 的企業用途分工；Why 第一項凸顯跨技術整合。
- 首頁三方案以 SolutionId 繼承 registry 的 summary／anchor／serviceIds／來源／proposed-direction。四篇詳解各加三項「可規劃的交付」，明示依需求、可用資料及約定範圍確認。
- Related Showcase 僅指向三個真正 Portfolio route，status 讀原 registry；AI 對應 integration-hub 時明示 AI/n8n 後續、尚未實作。未更改作品、媒體、source／Live null、Contact 無收件及 Privacy 草案。

九個公開路由、SEO registry、品牌 Canonical／OG、noindex／nofollow、robots／Sitemap 404、draft/dev 排除及 Base Path 保持既有架構；沒有 Backend、API、Analytics、新依賴、套件／lockfile、Vercel／DNS 或 Pages workflow 變更。獨立文案 PR #18 不在本次整合範圍，保留其原狀態。

## 4. 驗收程序與適用性

Root 管理單一正式 build／server 序列；首頁、來源及工具各有獨立 ownership，不讓多位代理各建一套驗收。使用 scripts/run-with-evidence.py 保存真實命令、cwd、UTC、exit、log SHA；先確認 0／7／timeout124 回執契約。每次重試新檔，不覆寫失敗。

普通模式 loopback3110 驗證後停止，才 build:pages 並掛載 loopback3111/xk-website。普通九頁兩寬 18 cases；Pages 九頁五寬 45 cases（320／375／768／1440／1920），Pages 執行 27 次 axe WCAG2／2.1 A／AA（九頁手機、桌機及手機展開選單）。每種模式另驗 18 keyboard、9 mobile、9 reduced-motion journeys、所有連結／錨點、精確 head、HTTP／資源、保護與實際 storage before／after。

本次不重做 Task 011 效能／field CWV 或 Task 012 完整 55 準則、AT、原生縮放稽核，不宣稱認證。真機／其他平台屬 Optional PENDING；新增基本可及回歸與七張真實截圖必須完成。axe incomplete、layout 候選、焦點外觀及人工截圖判定獨立保存，collector exit0 不能直接升為完整 PASS。

環境：Linux x86_64、Node v24.22.1、npm 11.9.0、Next 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3、Chromium 156.0.8078.79。Playwright／axe 是既有外部暫存工具，沒有新增網站依賴。完整環境與 UTC 起訖隨證據保存。

初次 source fingerprint `4876af2688b98fecc7f1f62983e29d902d20300a6778ed1ead83f9a778838e83`；最後為 `89cd35f0c24f792ecaa839df686ca86215393cf39956145f97ac63190a311f40`，皆包括新增未追蹤 source 檔的 110 個 runtime／config／public／build bytes。變更界線不是僅由 hash 判定：最後只加 Home 五卡的 article role，來源原文及精確差異另存。

## 5. 實際測試矩陣

所有尚未執行項目為 PENDING，未啟動命令的 exit 不適用。Required 結果必須對應最後提交的程式碼；後續只變更報告或遠端識別碼，不重跑無關網站 suite。

| Test ID | 適用性／預期與程序 | Actual | Exit | Status |
| --- | --- | --- | --- | --- |
| BF01 | Required：npm ci locked install | npm ci 完成、鎖定套件與 lock 未變；後續只有 role 屬性變更，未重裝依賴 | 0 | PASS |
| BF02 | Required：npx tsc --noEmit／npm run lint | 初次及最後修正後 TypeScript／Lint 各完成；不忽略警告或型別錯誤 | 0／0 | PASS |
| BF03 | Required：npm run build／普通3110 | 初次及最終普通 build 完成，3110 Ready；最終 Home375／1440 重驗 15 子項通過 | build 0；browser 0 | PASS |
| BF04 | Required：停止普通server後 npm run build:pages／靜態3111 | 普通 server 停止後各建 Pages；204 檔、Base Path／.nojekyll／draft-dev 排除與最後 Home 五寬通過 | build 0；browser 0 | PASS |
| BF05 | Required：18／45 responsive、全部links／anchors、新內容及CTA | 初次18／45版面、每模式177筆source/href／96錨點關係；最後Home額外2／5重驗，包含新CTA與五個具名稱article | 66／126及15／24子項各Exit0 | PASS |
| BF06 | Required：27 axe、keyboard／focus／mobile／motion＋人工判定 | 初次27 axe零violations但15個ARIA未決項經人工判FAIL；已修role，Home三次axe及鍵盤／motion補驗通過；最終342對比未決逐項判定 | 最終axe suite及人工helper 0 | PASS |
| BF07 | Required：Metadata／noindex／404／robots／Base Path／assets／Runtime／Network／storage | 九頁精確head、HTTP、五個預期404與63組storage實際前後；最後build再驗全部route，Home範圍補驗，零非預期Console／Runtime／Network | 各suite0 | PASS |
| BF08 | Required：七張實際截圖及人工視覺檢視 | 七張實際Pages圖已視覺檢視；最後五Home PNG bytes相同保留檢視bridge，Solutions兩圖由未改HTML/CSS佐證；三張focus圖實際檢視 | PNG與人工判定完成 | PASS |
| BF09 | Required：Markdown／local links／diff／secret／產物／版本對應 | 格式、local links、完整diff、機密與產物檢查於commit前收斂；110 source map及各版本界線可追溯 | 檢查0 | PASS |
| BF10 | Required：exact-head PR CI／artifact／review | PR 前快照；遠端更新同一 PR | 未啟動 | PENDING |
| BF11 | Required：授權merge後main CI／Pages／公開URL | PR 前快照；遠端更新同一 PR | 未啟動 | PENDING |
| BF12 | Optional：真機／額外效能／AT範圍 | 本次未執行，不以其他工具替代 | 未啟動 | PENDING |
| BF13 | Not Applicable：後端／DNS／Vercel／正式索引 | 不在本次範圍，保持現況 | 不適用 | N/A |

每項證據保存實際 Command/Procedure、Expected/Actual、Environment、真實 Exit、Status、Evidence 與 Notes。FAIL 不改 PASS；先修正再重驗，保留原失敗。外部實際拒絕才記 BLOCKED，未執行不冒作 N/A。

### 真正問題、工具失敗及重驗

| 原始結果 | 原因／修正 | 最後驗收與界線 |
| --- | --- | --- |
| 人工ARIA判定 FAIL，原axe自動suite雖Exit0仍不算整體通過 | 五服務卡的一般div帶aria-labelledby；改為具名稱article role，其他內容／樣式／href／handler沒有改動 | Home normal2／Pages5、3次axe、五個實際article名稱／鍵盤／mobile／motion補驗通過，ARIA未決已消除 |
| 第一個最終靜態預覽與Home補驗 FAIL | Root 的bridge工具誤將非Home HTML數量設9，實際為8公開頁＋3種404共11；目錄未準備完成仍啟動預覽，造成空目錄404 | 停止錯誤預覽，依實際12份HTML inventory校正工具、驗142個產物後才掛載204檔，再重驗24項Exit0；原錯誤server／HTTP／suite保留，不歸咎產品 |
| 人工helper對Axe截短href比對FAIL | Pages較長href在axe摘要出現ellipsis；以實際唯一selector、完整DOM opening attrs及精確prefix核對截短屬性 | 不降低4.5:1門檻或忽略節點，最後342項完整判定Exit0；原FAIL留存 |

最後role變更不影響其他八頁：已逐檔證明142個產物（含11份非Home/error HTML、3 CSS、fonts／JS）保持相同，HTML只替換真正Next BuildID，未任意正規化RSC。原24組非Home axe／其餘瀏覽器資料保留原版本，沒有冒作新掃描。最後Home三份新axe與實際computed styles另存；全範圍27份的342個對比未決項分成296 gradient、41完全遮住狀態、5部分遮住，最差保守比例5.1333:1。完全遮住的僅該狀態N/A，可見部分仍需判定；不是整個測試N/A或完整認證。

Pages基線有284筆、最後Home有35筆Next prefetch HEAD cancellation，原始事件皆保留；逐筆以同loader／fulfilled HEAD200／同文件tree GET200／Next callsite及獨立HEAD-GET200嚴格分類，零非預期錯誤。未忽略GET、資源、Console或Runtime失敗。server驗收後主動TERM的143是生命週期結束，不把原始receipt改寫PASS；Ready／HTTP另有證據。

所有長命令及完整Test ID／Expected／Actual／Exit／Environment見 [證據說明](bugfix001-008-artifacts/README.md) 與壓縮原始資料；source、contract、版本影響判定、人工結果、舊失敗及最後補驗均保存一次。

## 6. 檔案、截圖與剩餘事項

程式修改集中在 homepage config 與五個首頁元件、Solutions typed delivery／showcase registry 與詳解元件。文件更新 README、AGENTS、task index、implementation-notes；新增本報告、當次原始證據與七張截圖。最終實際檔案清單以 Feature Commit diff 為準，沒有提交 .next／out／node_modules／env／私鑰。

| 真實圖檔 | Viewport | 檢視 |
| --- | --- | --- |
| [LOCAL-pages-home-1440.png](../screenshots/bugfix001-008/LOCAL-pages-home-1440.png) | 1440 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-home-1920.png](../screenshots/bugfix001-008/LOCAL-pages-home-1920.png) | 1920 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-home-320.png](../screenshots/bugfix001-008/LOCAL-pages-home-320.png) | 320 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-home-375.png](../screenshots/bugfix001-008/LOCAL-pages-home-375.png) | 375 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-home-768.png](../screenshots/bugfix001-008/LOCAL-pages-home-768.png) | 768 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-solutions-1440.png](../screenshots/bugfix001-008/LOCAL-pages-solutions-1440.png) | 1440 × 1000 | PASS，實際本機Pages；非Vercel |
| [LOCAL-pages-solutions-375.png](../screenshots/bugfix001-008/LOCAL-pages-solutions-375.png) | 375 × 1000 | PASS，實際本機Pages；非Vercel |

尚待獨立處理：有內容規格的獨立方案頁、核准分享圖、正式品牌／中文名同步、Privacy／聯絡管道及索引開放。這些不是本次 UI FAIL，不以本次 CI／合併授權當作已完成或額外業務核准。

PR 前完成本機結果與報告；本次 PR CI／人工 review／使用者授權merge／main CI／Pages部署／公開HTTP逐階段另核對。後續實際 SHA、run／job／deployment／公開smoke結果更新同一 PR 說明，避免為記錄自身 SHA 反覆提交。
