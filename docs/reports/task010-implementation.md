# Task 010 — SEO 保護模式實作與驗證

紀錄日期：2026-11-19 UTC。這是本次保護模式的本機交付紀錄；正式索引、公開 Sitemap、GSC 與網域發布是不同階段。PR／CI／merge／main CI／部署及公開 Smoke 的後續真實證據更新於同一 PR 說明，不為記錄自身 SHA 再做文件 Commit。

## 基準、授權與來源

- 唯一可寫 Repository：`xk2022/xk-website`。fresh fetch 後 Base 為 `b423b28fc98d82fe2269c8e486c9da22a112602b`，初始 main 工作目錄乾淨；Task 009 PR #14 的草案技術已合併，不等於正式政策核准。
- Feature Branch：`feature/website-seo`。使用者明確授權本次開發、驗證文件、Push、PR、CI 成功後合併 main 及確認部署；沒有開放搜尋索引、GSC、DNS、Analytics 或法律正文核准授權。
- 已完整閱讀 [Task 010](../task/task010.md)、AGENTS、README 與 [協作流程](../subagent-workflow.md)，核對任務索引、implementation notes、Task 001–005、Design System、首頁／About／Services／Pages 指南及已合併後續頁面。相同 Blob 的先前全文閱讀及本輪重核／相關章節重讀有 coverage 紀錄；不沿用歷史測試 PASS。
- 文件 Repository `xk2022/xplore-kaleidoscope` 僅讀。fresh API 於 `2026-11-19T06:28:21.823Z` 確認 main 仍為 `95ef1275a46ace76e11f668178ca881087483398`，Tree `8bba493a05911a11a7e29d7d01650e9d0e00f3e7`，51／51 Blob bytes 相符。

| 來源 ID | 採用與排除界線 | 固定版本 Git Blob |
| --- | --- | --- |
| BUSINESS_EN | 品牌／服務定位，不推導營收成果、法人或已商用 SaaS | `249dda3bc464c7fae497e037d8a9916ed93893e7` |
| BUSINESS_ZH | 中文名稱未定，不補造法律主體／地址 | `d089b3baf8a7466716cfa13ff62bd959f812b108` |
| INIT | ASK 技術方向可追溯；ANS 的 i18n／Backend／品牌提案不取代現站 | `59f6c1151015bdec746229e78596e2311cdc2f6f` |
| SITEMAP | §14／16／17 採短路由、真實語言與 SEO 原則；未實作清單不收錄 | `1f1b4584bbe06f0079542eedffa52215024da0f7` |
| ARCH | §13 採 Metadata API；new Date 與 allow＋Sitemap 範例不是授權 | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` |
| MVP | §11／12 採準確自然文案；可選 GA4 不等於已啟用 | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` |
| HOSTING | 採正式 origin／HTTPS／redirect 驗證需求，不猜 DNS 或帳號設定 | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` |

完整路徑、固定版本 URL、章節與採用界線見結構化證據中的 source-audit。沒有新增已核准分享圖、社群 handle、完整法定 Schema、GSC 權限或正式域名／索引放行證據。Copywriting 建議的 `/images/og-image.jpg` 是規劃，沒有生成或假引用該圖。

## 實作與路由規則

`src/config/seo.ts` 是 9 個 public 內容路由與 1 個 draft Privacy 的 typed registry；`public` 表示真實可讀，不表示可索引。保護政策固定為 `mode: protected`、`publishSitemap: false`，沒有透過 query、Browser Storage 或環境變數解鎖索引的入口。

`src/lib/seo.ts` 是小型純函式，品牌資料仍只來自既有 siteConfig。URL 限制為純 HTTPS 品牌 origin 與清楚站內 path，拒絕外站／Query／Fragment／traversal／歧義路徑。Metadata 使用 absolute title、各頁專屬 description／OG／Twitter `summary`，強制 noindex／nofollow，不輸出無核准圖、site／creator handle 或假的語言 alternate。

Root Layout 只增加一個 `application/ld+json` script，安全序列化時將 `<` 轉 Unicode；資料僅有 `@context`、`@type: WebSite`、品牌 name／url 與 inLanguage。它是網站品牌實體，出現在共用 Layout 不表示當前錯誤／草案 URL 是有效或已核准頁面。沒有 Organization、地址、電話、Product、Review、SearchAction 或虛構 Breadcrumb。

原可見 UI、字體、Tokens、Logo 與 Component API 未改。八個 route 的 default render、Portfolio static params／getProject、Privacy ensurePrivacyAccess 共 11 個函式與基準 bytes 相同；Layout 原字體與可見 JSX 保留。Privacy config／publication guard、Contact 空管道／無表單、Portfolio 三 slug／PLANNED 狀態與所有既有導航不變。

robots 使用安裝版本的靜態 Metadata Route。一般 `/robots.txt` 為 `Allow: /`、`Disallow: /dev/` 及 `/privacy`；Pages 使用實際 Base Path 前綴。允許 crawler 讀 HTML noindex，不等於允許索引。沒有 Sitemap 宣告、非標準 Noindex 指令或整站 Disallow，也沒有把 robots 當存取控制。

Pages `/xk-website/robots.txt` 不是 origin 根 `/robots.txt`，本任務不操作或宣稱控制 `xk2022.github.io/robots.txt`。目前以 HTML noindex 作可控保護；正式域名根 robots 需後續 release 實證。保護模式沒有 sitemap.ts 或空 XML，`sitemap.xml` 保持 404。

Pages validator 新增逐頁 Metadata／唯一 Canonical／OG／Twitter／安全 WebSite、registry 與所有實際 HTML／導覽／三 slug、robots 與 Sitemap 不發布的交叉驗證。機械移除 Task 010 新增區塊並還原迴圈抽取後，整份 script 與 Task 009 baseline bytes 相同；原九頁、資源、404／.nojekyll、dev 與 Privacy 原文／轉義防漏斷言未降低。

## 候選、排除及 release／GSC

九個公開內容頁是未來 release 可審查候選，目前仍全部 noindex／nofollow。Privacy 為 draft、不列正式候選；planned 服務詳頁、`/en`、舊 `/privacy-policy`、未知 slug、dev、404、query、fragment、Preview／localhost／Pages 複本不收錄。`robots.txt` 是機器端點，不當作內容頁候選。

正式 Sitemap 生成規則與 Owner 待確認清單完整記於 [SEO 操作指南](../seo-operations.md)：只取獲准 release、已合併／內容核准、HTTP 200／Canonical 正確的路由，XML 正確編碼、唯一絕對 HTTPS 品牌 URL；未知 lastmod 省略，不用 build 日期。正式生成、索引修改、Validator、CI 與公開驗收需在同一後續 release PR 明確審查。

實際確認人是品牌／站點 Owner（本會話使用者），法律審閱者與 Task 013／014 實際負責人尚待其指定。本輪日期為 2026-11-19，期限使用「新增欄位前／正式 release 前／GSC 驗證提交前」里程碑，不編造姓名或日曆截止日。分享圖／handle 未核准時省略，法定資料未齊只輸出 WebSite；正式 origin／HTTPS／redirect／索引範圍與授權未齊，正式索引 gate BLOCKED，保護模式持續。

GSC property、管理權限、Domain 或 URL-prefix 方法待 Owner 確認。需要 TXT 時另依 Task 014 授權，不造 token、不建立 property、不提交 Sitemap／request indexing、不順帶啟用 Analytics。驗證、提交、抓取、索引與排名各自需要證據，不保證搜尋成果。這些後續條件不阻擋 Task 010 指定的保護模式交付。

## 環境與受測版本

Linux 6.18.57 x86_64／glibc 2.41；Node.js 24.22.1、npm 11.9.0，鎖定 Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。Playwright 1.65.1、Chromium 156.0.8078.79、axe-core 4.14.1 位於 Repository 外，未加入 dependencies。

受測 code fingerprint：`0c51f6fcc2cc912e625bd16e0e638dbeeb073629daba82b71dd42786a4e7a8a9`。107 個 runtime／素材／scripts／manifest／lockfile／Next／TS／workflow 檔案逐檔 SHA-256 map，以排序鍵、無額外空格的 JSON 計算 SHA-256。freeze 前涵蓋 staged／unstaged／untracked，新檔逐一閱讀，格式／EOF 先收斂；沒有只看舊指紋或沿用 Task 009 PASS。

一般 production 使用 3070，隔離 Privacy head 審閱使用 loopback 3072，Pages 靜態預覽使用 3071、Base Path `/xk-website`。先驗一般服務再建置 Pages，不同時覆寫 `.next/`。文件／遠端 ID 補記不改受測 runtime，後續影響範圍另行記錄。

## 逐頁 exact Metadata 清冊

以下 title／description 亦為同頁 OG／Twitter title／description；siteName 為 Xplore Kaleidoscope、OG locale zh_TW／type website、Twitter card summary，無圖片或 handle。Canonical／OG 為品牌 URL，框架正常單一尾斜線可接受；沒有 Query、Fragment 或 Pages 前綴。日期未知，所有 contentLastModified 省略。

| Path／availability | Title | Description | Canonical／OG URL |
| --- | --- | --- | --- |
| `/`／public | Xplore Kaleidoscope \| Web, Java & AI Digital Solutions | Xplore Kaleidoscope 提供網站開發、Java 企業系統、系統架構整合及 AI 商業應用解決方案，協助企業打造數位價值。 | `https://xplorekaleidoscope.com/` |
| `/about`／public | 關於 XK \| Xplore Kaleidoscope | 認識 Xplore Kaleidoscope（XK），了解我們的品牌理念、網站開發、Java 企業系統、系統整合與 AI 應用技術能力。 | `https://xplorekaleidoscope.com/about` |
| `/services`／public | 服務項目 \| Xplore Kaleidoscope | 探索 Xplore Kaleidoscope 的網站開發、Java 企業系統、系統整合、AI 應用與雲端技術服務，打造符合企業需求的數位解決方案。 | `https://xplorekaleidoscope.com/services` |
| `/solutions`／public | 解決方案 \| Xplore Kaleidoscope | 探索 XK 如何依企業需求組合網站開發、Java 企業系統、API 與資料整合、AI 應用及部署技術，規劃合適的數位解決方案。 | `https://xplorekaleidoscope.com/solutions` |
| `/portfolio`／public | 技術作品集 \| Xplore Kaleidoscope | 探索 XK 的網站、Java 企業系統與 API 整合展示規劃，了解各專案的背景、技術方向與實際開發狀態。 | `https://xplorekaleidoscope.com/portfolio` |
| `/portfolio/corporate-website`／public | XK Corporate Website Showcase \| XK 技術作品集 | XK Corporate Website Showcase 自製展示規劃，目前為 Planned；探索企業網站的品牌資訊、響應式版面與可維護前端方向，尚未提供完整案例系統的實作與部署證據。 | `https://xplorekaleidoscope.com/portfolio/corporate-website` |
| `/portfolio/enterprise-management`／public | XK Enterprise Management System \| XK 技術作品集 | XK Enterprise Management System 自製展示規劃，目前為 Planned；了解 Java 管理系統的流程、資料與權限規劃，模組範圍仍待確認，尚未提供實作完成證據。 | `https://xplorekaleidoscope.com/portfolio/enterprise-management` |
| `/portfolio/integration-hub`／public | XK Enterprise Integration Hub \| XK 技術作品集 | XK Enterprise Integration Hub 自製展示規劃，目前為 Planned；探索模擬系統之間的 API 與資料交換方向，AI 與 n8n 屬後續規劃，尚未提供實作完成證據。 | `https://xplorekaleidoscope.com/portfolio/integration-hub` |
| `/contact`／public | 聯絡我們 \| Xplore Kaleidoscope | 了解如何與 Xplore Kaleidoscope（XK）討論網站、Java 企業系統、系統整合與 AI 應用需求，查看已確認的聯絡資訊與合作準備事項。 | `https://xplorekaleidoscope.com/contact` |
| `/privacy`／draft | 隱私權政策 \| Xplore Kaleidoscope | 了解 Xplore Kaleidoscope 網站的個人資料處理、第三方服務與隱私權相關資訊。 | `https://xplorekaleidoscope.com/privacy` |

Privacy 一列只適用隔離草案預覽；一般公開與 Pages 必須保持 404／正文排除，並不因 metadata registry 存在而成為有效政策。上述是原文與設定清冊，實際 HTML／HTTP 驗收另記下方結果，不用 Source 搜尋冒充結果。

## 品質指令、工具與審閱

所有長指令透過既有 `scripts/run-with-evidence.py` 保存真實 OS wait 的 returnCode／exitCode、時間、命令、獨立 Log 與 SHA；從第一個 helper 測試就使用回執。npm cache 先確認 `/tmp/xk-task008/npm-cache` 可寫，不改 HOME 或 lockfile。工具自查的 0／7／124 為預設成功、合成失敗與 timeout，三個實際退出皆符合預期；原非零回執保留，不把它們改稱 app PASS。

| Test ID | 實際 Command | 預期 | 實際結果／Exit Code | 證據成員 |
| --- | --- | --- | --- | --- |
| S10-C01 | `npm ci` | 重現既有 lockfile | 616 packages／12s，Exit 0 | checks/npm-ci-1.json／log |
| S10-C02 | `npx tsc --noEmit` | Strict TS、真實 Metadata API 無錯 | Exit 0 | checks/tsc-1.json／log |
| S10-C03 | `npm run lint` | 零錯誤／warning | Exit 0，無 ESLint 錯誤或警告 | checks/lint-1.json／log |
| S10-C04 | `npm run build` | 普通 build 與靜態 robots | Exit 0；robots 為靜態、Privacy 保留受控動態邊界 | checks/build-1.json／log |
| S10-C05 | `npm run build:pages` | 原保護與 SEO 產物成功 | Exit 0，artifact verified／Base Path `/xk-website` | checks/pages-build-1.json／log |

Pages 建置前已停止普通與隔離預覽服務，實際兩程序 Exit 143、兩埠關閉；這是預期清理，不當作測試 Exit 0。外層刻意帶 `XK_PRIVACY_PREVIEW=1`，builder child 強制為 0，沒有因此解鎖 Privacy 草案。普通／Pages 沒有同時覆寫 `.next/`。

S10-U01–U10 十組 helper 實測均通過／真 Exit 0、完整結束標記，涵蓋 URL 及不安全來源拒絕、未知 route 不 fallback、不可覆蓋 noindex／summary、九 public／draft 清冊、無 Sitemap robots、既有 unreserved Base Path、真實五欄位 WebSite 與 closing-script 安全 round-trip。Validator 48 項正反 fixtures 真 Exit 0，包含九頁 metadata 與重複／污染 Canonical、假 image／handle／額外 Schema、矛盾 robots／Sitemap 的拒絕。

正式 baseline 前，審閱發現新 robots helper 的初版 regex 過度限制舊 Base Path 的 `.`／`~`；已修正並以空根、預設路徑、`/project.v2/~preview` 正向與純 dot segment 負向七項自查通過。這是實作審閱修正，不冒稱曾執行失敗測試，也沒有在正式矩陣後修改程式。

獨立 focused review 只做一次，確認 protected mode、最小 Schema 事實、Privacy guard、robots 與 builder 原斷言，Blocking 0；不當作法律審核或 GitHub approved。source 自查十筆原文一致、十二檔 focused TS 零診斷及可見函式保留證據另存，沒有以此取代上述正式命令。

Browser 工具重用前次已實證的 API／URL／HEAD 契約，先執行 17 個無網路契約及 plan/API 形狀 preflight。第一次受環境 sandbox 阻擋 `spawnSync EPERM`、真 Exit 1，尚未啟 Browser 或執行頁面 assertion；使用本來就必要的網路執行權限後，同工具完整 preflight 真 Exit 0，原失敗回執保留。沒有變更 app 或降低條件。

既有 npm ESLint 9 deprecated、npm 更新提示及 Node 原生讀取 `.ts` 的 MODULE_TYPELESS_PACKAGE_JSON 提示均保留。它們不是本次 ESLint warning 或建置失敗；沒有修改 package／lockfile／module type 或版本來消除提示。

## 最終 HTML／HTTP 與 Browser 結果

三種正式網站程序首輪均真 Exit 0，expected count／完整結束標記與來源 map 相符，沒有網站 FAIL 或定向重驗。plan-only preflight 是未執行的契約清單，不列為正式驗收。可選項目未選擇時仍為 PENDING，不偽作 N/A 或 PASS。

| 模式 | 開始／完成（UTC） | 真 Exit／逐項狀態 | 覆蓋 |
| --- | --- | --- | --- |
| Ordinary production | 06:45:30–06:45:54 | 0；27 項＝21 PASS＋6 Optional PENDING | 九公開 route 的 HTTP HTML／final head、exact Metadata／Twitter／WebSite、robots／Sitemap、所有現行 Link／錨點／主要跨頁、保護與資源 |
| Isolated Privacy preview | 06:45:32–06:45:35 | 0；5／5 PASS | 新 factory 的草案 Metadata／Schema、guard 狀態、儲存與資源；不代替有效政策或重做原 Task 009 全部 UI 驗收 |
| Pages static | 06:50:00–06:52:06 | 0；43 項＝36 PASS＋1 Disabled N/A＋6 Optional PENDING | 九公開 route、45 頁寬／48 axe、互動、Base Path、robots／Sitemap 404、靜態與原草案／dev 保護 |

每個 route 保留實際 HTTP HTML／final head，核對單一 exact title、description、絕對品牌 Canonical／OG、各頁 Twitter summary、robots、語言與可解析唯一 WebSite。未用 Source 字串搜尋取代產物。Title／OG／Twitter 沒有重複品牌或其他頁面描述；沒有分享圖／handle／hreflang／法定 Schema。

一般 robots HTTP 200，解析後只有 `User-agent: *`、`Allow: /`、`Disallow: /dev/`、`Disallow: /privacy`。Pages robots HTTP 200，同規則加 `/xk-website` 前綴；沒有 Sitemap／Noindex 指令、沒有誤攔 `_next`。Sitemap、dev、未知 slug 與 Privacy 的預期 404 以獨立測項記錄，不遮蔽 CSS／JS／字體／icon 的錯誤。Pages `.nojekyll`／404 文件及九個內容 HTML 均驗證，無 dev 或草案 HTML／payload／正文外洩。

全部站內 Link／錨點依真實 URL／HTTP 與目標 ID 驗證，另實際點擊五個服務目的地、跨頁／刷新、舊首頁聯絡錨點與 Contact 入口。普通／Pages 各 146 筆是「來源頁面＋href」去重後記錄，不聲稱原 DOM 只有 146 個 anchor。主要導航、Footer 與未公開路由狀態保留。

Pages 九頁 × 320／375／768／1440／1920 px 共 45 個響應式 case，48 次 axe 包括適用手機選單展開；WCAG 2／2.1 A／AA 違規為 0。Skip Link、Tab／Shift+Tab／Enter、CTA、可見 Focus、手機選單名稱／expanded／controls／Escape 還原／連結／外部 hit-test／桌面斷點、375 px touch、Reduced Motion 均有本輪實際結果。沒有做完整真實螢幕閱讀器驗收，不宣稱 WCAG 2.2 或完整認證。

| Runtime 模式 | 真實 Context／前後快照 | 實際流量與資源 |
| --- | --- | --- |
| Ordinary | 10 fresh Context／10 after；21 個 document init before，含 reload | 762 筆 CDP 請求，全部同 3070 origin GET；28 資源成功、0 raw fail／0 unexpected |
| Privacy preview | 1 fresh Context／1 before／1 after | 41 筆同 3072 origin GET；26 資源成功、0 error |
| Pages | 25 fresh Context／25 after；95 個 document init before，含 reload | 153 資源成功；387 個原始 HEAD 依同 document／loader／initiator／因果完成 tree／獨立 HTTP 嚴格配對，0 unexpected |

Cookie、localStorage、sessionStorage／IndexedDB 與實際寫入探針結果保留，未觀察新收件／POST／外部載入。Schema 的 `https://schema.org` 是資料內容，不等於瀏覽器發出外部請求。字體實際由站內 `_next` 提供，建置下載與訪客 Runtime 分開；仍不由此推論 Hosting 沒有處理 IP 或存取紀錄。每個 Context 真實 after 數與 Context 數相等，沒有沿用前次 after=0 缺漏。

## 人工視覺與截圖適用性

本任務沒有可見 UI／文案／alt／heading 改動，因此正式 Desktop／Mobile 截圖為 Optional、未選擇新增 `docs/screenshots/task010-seo-*.png`，保持 PENDING 並記理由；新視覺 Section／圖為 Not Applicable。沒有沿用舊任務圖片冒作現版，也沒有為機器 Metadata 新增行銷介面。

Root 實際以 view_image 檢視本輪 Pages 首頁五種寬度的完整 QA 暫存圖。Header／暫定 Logo 比例、Hero／CTA、卡片／閱讀順序與 Footer 未見裁切、重疊或新增 SEO 隱藏介面；這是共用 Layout 影響的代表人工確認，不宣稱逐張人工檢視所有 45 個頁寬案例。其他頁面均有本輪結構／responsive／axe 實測。原 capture 與 Root 後續判讀時間／SHA 分開保存，這五張輔助圖不作正式新視覺產物提交。

## 規格矩陣與必要門檻

下表以 Task 010 的適用性判斷。29 個 Required 均已有本輪 PASS；正式 index release 不在本次授權範圍，其前置不足的判定已完成，但沒有冒稱正式 Sitemap／GSC 完成。Optional 後續階段不轉為 N/A。

| Test ID | 適用性／預期 | 實際結果與理由 | Status |
| --- | --- | --- | --- |
| S10-C01–C05 | Required，各品質指令真 Exit 0 | 五分項回執與 Log 完整，見品質表 | PASS |
| S10-M01 | Required，逐頁 exact Metadata | 九公開頁兩模式與隔離草案最終 HTML／head 核對，清冊同原文 | PASS |
| S10-M02 | Required，URL／Base Path | 品牌 HTTPS、真 path、正常單尾斜線，無 Query／Fragment／Pages 前綴污染；站內路徑有效 | PASS |
| S10-M03 | Required，保護索引 | Layout／所有可讀內容頁 noindex／nofollow，無開索引旗標／繼承覆蓋 | PASS |
| S10-M04 | Required，分享圖／handle | 核准素材缺件時正確省略，文字 summary 不虛構目的地 | PASS |
| S10-M05 | Required，語言 | HTML zh-TW、OG zh_TW、WebSite zh-TW，無假英文 alternate | PASS |
| S10-M06 | Required，安全 JSON-LD | 最小唯一五欄位 WebSite 與真品牌相符，拒絕假法定／評價／產品／搜尋資料 | PASS |
| S10-M07 | Required，robots HTTP／規則 | 一般／Pages 都 200；允許讀 noindex、無 Sitemap、說明 project 限制 | PASS |
| S10-M08 | Required，Sitemap 保護 | endpoint 404、無空 XML／宣告，候選及排除清冊／生成規則明確 | PASS |
| S10-M09 | Required，真實內容日期 | contentLastModified 全省略，不用 build 日期或亂填 lastmod | PASS |
| S10-M10 | Required，設定／Diff | 原 UI、Tokens、Logo、字體、依賴、workflow／雙模式與原斷言保留 | PASS |
| S10-F01 | Required，Fresh HTTP／內容回歸 | 九公開頁兩模式 200，草案／dev／unknown 依原 gate | PASS |
| S10-F02 | Required，全部 Link／錨點 | URL／HTTP／ID 與主要實際跨頁／服務／舊聯絡錨點完成 | PASS |
| S10-F03 | Required，Console／Runtime／Network | 實際資源與每 Context 前後快照，非預期錯誤 0 | PASS |
| S10-F04 | Required，靜態產物／404／.nojekyll | 九 HTML、robots、資源、error document 與 dev／Privacy 排除完成 | PASS |
| S10-R01–R05 | Required，五指定寬度逐頁 | 45 本輪 case，範圍／模式／viewport 逐項保存 | PASS |
| S10-A01 | Required，axe | 48 次涵蓋五寬與展開選單，零自動規則違規 | PASS |
| S10-A02 | Required，Keyboard／Focus | 跳轉、正反 Tab、Enter、可見焦點／CTA 均實測 | PASS |
| S10-A03 | Required，MobileNavigation | 完整原契約與觸控／斷點實測 | PASS |
| S10-A04 | Required，Reduced Motion／人工 | reduce 與 Root 五寬代表頁實看完成，範圍不誇大 | PASS |
| S10-A05 | Not Applicable，Disabled | 未新增或改動停用控制，不創造假 Button | N/A |
| S10-A06 | Optional，螢幕閱讀器補測 | 無可見語意改動，本輪未選擇完整真實補測；axe 不代替 | PENDING |
| S10-E01 | Not Applicable，新視覺 Section／圖 | 本任務只改機器資料，原 UI 未變 | N/A |
| S10-P01 | Required，release gate 判定 | 已判定缺正式 Origin／release 授權等，正式索引 gate BLOCKED；保護模式可交付 | PASS |
| S10-P02 | Optional，正式 XML／開索引 | 未納入本輪 protected 授權，需後續 release PR；未執行 | PENDING |
| S10-P03 | Optional，GSC 驗證／提交 | property／權限／方法待 Owner，未操作 | PENDING |
| S10-P04 | Optional，公開 Smoke | 本機報告快照尚未部署；獲授權後結果補同 PR | PENDING |
| S10-P05 | Not Applicable，搜尋成果保證 | 不保證排名／收錄／流量，沒有編造成效數據 | N/A |
| S10-P06 | Not Applicable，DNS／Vercel／Analytics | 不屬保護模式，未做未授權設定 | N/A |

## Known Issues 與交付階段

本次 protected mode 沒有未修正的必要 FAIL／BLOCKED。工具 sandbox EPERM 已以適當執行權限解除並保留原紀錄；網站三模式首輪均 Exit 0，未跳過測試、降低標準或忽略 GET／Console／Runtime 錯誤。Formal release、GSC、分享素材與法定 Schema 的缺件及 Owner／期限／fallback 是操作指南列明的後續工作，不以技術交付暗中放行。

本報告在 PR 建立前完成並與實作同一變更集提交；最後 code map 與所有正式結果一致。文件／證據與遠端 ID 補充不改 runtime，不因此重跑已 PASS 的網站矩陣。若後續 code 改動，依實際影響重驗並保存原失敗與版本邊界。

| 階段 | 本機交付快照／後續依據 |
| --- | --- |
| 本機 protected mode | 必要項目完成，來源、兩 build、三網站模式與人工範圍均有實際證據 |
| Feature Commit／Push／PR | 此快照尚未發生；實際 SHA／URL 於提交後在同 PR 對照 |
| PR exact-head CI／artifact | PENDING，不能用本機結果代替或將 Deploy SKIPPED 視為部署 |
| GitHub PR Review | PENDING，記實際意見；內部 source review 不冒稱 GitHub approval |
| 使用者授權合併 | 本輪已明確授權 CI 通過後合併；Merge SHA／時間仍待實際事件 |
| main CI／Pages 部署／公開 Smoke | PENDING，實際發生後補同 PR，分別核對 Merge SHA／run／HTTP／robots／Sitemap／資源 |
| 正式 index release | BLOCKED／未授權，另依操作指南與 Task 013／014 證據進行 |
| GSC property／驗證／提交／索引成果 | PENDING，沒有本次操作或成功宣稱 |

## 新增與修改檔案

| 動作 | 路徑 | 用途 |
| --- | --- | --- |
| 新增 | `src/config/seo.ts` | typed 路由清冊與固定 protected policy |
| 新增 | `src/lib/seo.ts` | 純 URL／Metadata／robots／Schema 工具 |
| 新增 | `src/app/robots.ts` | 靜態相容 robots Metadata Route |
| 修改 | `src/app/layout.tsx` | 只加安全、非視覺 WebSite script |
| 修改 | `src/app/page.tsx` | 首頁 Metadata factory |
| 修改 | `src/app/about/page.tsx` | About Metadata factory |
| 修改 | `src/app/services/page.tsx` | Services Metadata factory |
| 修改 | `src/app/solutions/page.tsx` | Solutions Metadata factory |
| 修改 | `src/app/portfolio/page.tsx` | Portfolio Metadata factory |
| 修改 | `src/app/portfolio/[slug]/page.tsx` | 三個既有 slug 的 Metadata factory，原路由保留 |
| 修改 | `src/app/contact/page.tsx` | Contact Metadata factory |
| 修改 | `src/app/privacy/page.tsx` | guard 後的草案 Metadata factory |
| 修改 | `scripts/build-github-pages.mjs` | 精確 SEO／registry／robots／Sitemap 保護驗證 |
| 修改 | `README.md` | 目前進度、保護模式與驗收入口 |
| 修改 | `AGENTS.md` | Task 010 操作與驗收護欄 |
| 修改 | `docs/task/README.md` | 追加當前紀錄入口，保留歷史 |
| 修改 | `docs/implementation-notes.md` | 追加來源、修正、實測與範圍 |
| 新增 | `docs/seo-operations.md` | 候選／排除、生成規則、release／GSC 權責與 fallback |
| 新增 | `docs/reports/task010-implementation.md` | 本報告與 exact Metadata／狀態矩陣 |
| 新增 | `docs/reports/task010-verification.json` | 版本／退出碼／來源／機器資料與證據索引 |
| 新增 | `docs/reports/task010-evidence.json.gz` | 唯一文字證據包，含真實 HTTP HTML／head／robots |

94 個既有 runtime／素材／依賴／設定檔 bytes 保留，包括 Privacy config／publication guard、全域 Tokens、原始 Logo、package／lockfile、Next／TS 設定與 workflow。AGENTS Next.js generated block 與 implementation notes 歷史前綴保留。沒有提交 `.next/`、`out/`、node_modules、暫存工具、Secrets、個資或新的正式截圖。

## 證據與追溯

[驗證摘要](task010-verification.json) 對照 Base／107-file map、五品質指令及 helper、三個正式網站程序、完整結束標記／count、逐頁資料、人工視覺與後續階段。[原始文字證據](task010-evidence.json.gz) 是唯一封存，SHA-256 `a8b9b51679148491a93be51ec18dad812cfe4f7fafa1cb16173ad23c40b3d52c`，2,061,200 bytes，168／168 成員還原雜湊核對成功；161 個唯一文字 Blob，同 bytes 不重複存。

schema 為 `xk-text-evidence-v1`：`files` 對應原相對路徑、bytes、SHA、contentRef；`blobs[contentRef]` 是原始 UTF-8 文字，還原需編碼並核對該 SHA。包括 source／route baseline、review、frozen map、quality receipt／Log、tool preflight 原失敗與成功、每模式原始 results／actual HTTP HTML／final head／robots、raw axe／network NDJSON／分類與 storage、視覺 SHA manifest。只保留有用原始資料一次；不把工具、圖片或 build output 塞進文字包。

每個 assertion 的 Test ID、預期／實際、程序／命令、時間、mode／URL／viewport／版本及 evidence 路徑可交叉追溯。assertion 本身不是獨立 OS process，其 Exit Code 為不適用（null），同列另有真實 parent receipt／actualProcessExitCode；不將 null 捏成 0。所有正式 Required assertion 均完成且符合預期，三個網站程序完整 Exit 0。根據本輪變更影響沒有 UI 修改，不增正式 PNG；後續純文件／遠端事件不觸發不相關網站重跑。

保護模式達成本次必要交付門檻；Repository 報告保留 PR 前快照，之後的 exact-head PR CI、Review、授權 merge、main CI、部署及公開 HTML／robots／Sitemap 404／資源結果以同 PR 真實事件紀錄補充。正式索引或 GSC 只有後續條件及授權齊備才能操作，不由這份報告或技術 CI 自動放行。

文件檢查另保留初次報告 Markdown lint 的 MD034／Exit 1（tool chunk `9bd01c`）：正文中的 Schema URL 缺少 Markdown 標記，已補行內 code；不改程式或降低 lint 規則。修正後的文件檢查、Link／完整 Diff 與歷史保留證據記入驗證摘要，這類文件修正不重跑已完成的網站矩陣。
