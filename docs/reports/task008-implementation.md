# Task 008 — Contact 實作與驗證報告

依 [Task 008](../task/task008.md) 實作 `/contact` 靜態資訊頁。預設模式為 `unavailable`／no-form，`verifiedContactChannels` 仍為空。頁面能力與收件能力分開：本次沒有新增可收取客戶需求的管道、表單、Backend 或接收服務，也沒有取得新的品牌管道／法律核准。

本報告的本機驗收內容須在 PR 建立前完成；下方尚未發生的階段維持 PENDING。後續真實遠端結果記錄於本報告與同一 PR 的最新交付紀錄，不能以本機成功代替 CI 或部署證據。

## 基準、授權與來源

| 項目 | 實際紀錄 |
| --- | --- |
| Repository | `xk2022/xk-website`，唯一修改範圍 |
| Base | `main@99e375e6f9621862b0ab1a0db9351f4963f199fb`；fetch 後與 origin/main 相同，初始 Working Tree 乾淨 |
| Feature Branch | `feature/website-contact-page` |
| 前置合併 | Task 001–007 的七個 Merge Commit 均經 `git merge-base --is-ancestor` 檢查 Exit 0；[Task 007 PR #11](https://github.com/xk2022/xk-website/pull/11) 已合併 |
| 使用者授權 | 本次明確要求執行 Task 008、確認程式與規格、產出驗證文件並 Push and merge；授權不擴及新收件管道、表單、法律政策、DNS 或其他 Repository |
| 文件 Repository | `xk2022/xplore-kaleidoscope`，唯讀；latest main `95ef1275a46ace76e11f668178ca881087483398` |
| 文件 Tree | `8bba493a05911a11a7e29d7d01650e9d0e00f3e7`；fresh API 於 2026-11-19T01:21:16.285Z 查詢 main，完整 Tree 無截斷，51/51 Blob 與快照實際 bytes 相同 |
| Active Mode | `unavailable`，由空的 `verifiedContactChannels` 派生；並非手動宣告服務可用 |
| PublicationRecord | `[]`；沒有已核准可公開的 Email／品牌 URL，不建立虛構核准紀錄 |
| 收件能力 | 未就緒，PENDING owner gate；本次預設交付不要求實際收件，因此不將資訊頁技術範圍列 BLOCKED，也不宣稱端到端收件 PASS |

已閱讀 AGENTS、README、Task 001–008、既有 Design System／首頁／About／Services／Solutions／Portfolio 實作紀錄與 Pages 指南；Task 009 全文用於確認資料與法律邊界。歷史文件是當時快照，其中舊路徑、待合併文字與舊驗收不冒充本次狀態。閱讀 manifest、來源 Blob、逐項需求及原始觀察將隨驗證證據保存。

六份 Contact 主要來源均固定在上述文件 Commit；品牌、Logo、色票與 Typography 文件也重新核對。C01–C06 原文沒有新的正式管道、帳號控制權或受控寄收證據：

| ID | 文件／精確章節 | Git Blob SHA／採用界線 |
| --- | --- | --- |
| C01 | `week-01/05_customer-development.md` §3／5／10 | `8cf9ca6d6111c6031202944ff4b8f345b75f3c22`；需求、痛點及 Discovery 準備，不採 KPI、營收或客戶成果 |
| C02 | `week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md` §12.1–12.3 | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c`；建議信箱不是已啟用或可收件證據 |
| C03 | `week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` §9–12 | `15c1483bf47be33bc29b755a220fb465b5dd8a1a`；集中設定、Server Components 與安全原則，舊 API／Backend 不採用 |
| C04 | `week-02/09_website-mvp_官方網站 MVP 開發規格.md` §8 | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d`；候選欄位與流程未獲本次資料／法律／服務核准 |
| C05 | `week-03/02_case-01-corporate-website.md` §9／17 | `c9b151d01a7616abb939dd9747d704428d0bdd8c`；示範計畫，不與 C04 聯集合成正式 schema |
| C06 | `week-01/02_service-catalog.md` §3 S01／§4 S02／§5 S03／§6 S04／§11 | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c`；可討論服務，名稱及錨點沿用 Services；不採價格、固定工期、SLA |

以上相對路徑均從文件 Repository 的 `doc/01_business-plan/` 起算；完整 path／Commit／Blob／section 也保留於 `src/config/contact-page.ts` 與來源證據。

## 實作內容與相容性

| 順序／ID | 責任 |
| --- | --- |
| `contact-hero` | 單一 H1「從理解需求，開始探索合作可能。」、Contact XK、品牌／技術標語、真實管道錨點及 Services CTA |
| `contact-channels` | 空清單顯示「正式聯絡管道確認中」及指定說明、Services／About／首頁；只有 verified registry 非空才使用同一管道 renderer |
| `contact-preparation` | 商業目標、現有系統與限制、需要討論範圍三項準備；提醒不分享帳密／敏感資料，附五個既有 Services 錨點 |
| `contact-process` | 整理需求→確認可用管道→依情況討論下一步；不虛構已收到訊息或回覆時限 |
| `contact-data-note` | 說明沒有線上表單／提交，提醒最小資訊範圍，明確區分應用與託管商可能的存取紀錄 |
| `contact-next-step` | 「先了解適合的技術服務。」及 Services／About／首頁真實連結 |

新增 route 與六 Sections 均為 Server Components；資料在 typed `ContactPageContent` 集中管理。`getContactAvailability` 接收原有 `ContactChannel` 清單派生狀態，未修改該 API／清單。五個服務名稱與 URL 經 `ServiceId`／`serviceCategories` 取得，無第二份服務文案或失效明細內頁。

Header／Footer／MobileNavigation 共用 `contactNavigation.href=/contact`；`plannedRoutes` 對應 implemented。首頁 `#contact`、原待確認內容與服務錨點保留，只新增同源「查看聯絡資訊」。About／Services 等原有效首頁 CTA 保留。Privacy 尚未實作，不建立死連結或假同意控制。

沿用 Section、Container、Button、Card、SectionHeading、XkLogo、BrandPattern、八色 Tokens、Inter／Noto Sans TC、Focus 與 Reduced Motion。中文 SectionHeading 明確 `titleLang="zh-TW"`；手寫 CTA H2 繼承 HTML `zh-TW`。Logo 原稿與暫定狀態、全部套件版本、lockfile、Next／Tailwind／TypeScript 設定及 workflow 均保持不變。

SEO 使用 absolute Title `聯絡我們 | Xplore Kaleidoscope`、指定 Description、品牌 `https://xplorekaleidoscope.com/contact` Canonical／OG URL、`zh_TW` 及 `noindex, nofollow`；沒有虛構 OG Image、Organization 聯絡資料或 Review Schema。Pages validator 僅追加 Contact，原八頁、資源、404、`.nojekyll` 與 dev payload 保護完整保留。

## 資料盤點與 Task 009 邊界

| 行為／資料 | 實際範圍與限制 |
| --- | --- |
| 訪客輸入／提交 | 沒有 form、input、submit、接收 API 或外部收件服務；網站不能接收需求 |
| Email／電話／社群 | verified registry 為空，不發布建議地址、泛用平台首頁、電話、地圖或預約 |
| Cookie／Storage／Query | 本次不新增訪客資料寫入或持久儲存；實際 browser 盤點結果須以後附 fresh 證據為準 |
| 網站載入 | Next.js 的 HTML、CSS、JS、字體、圖示與導覽／prefetch 請求屬實際網站傳輸，不當作需求提交 |
| 字體 | `next/font` 建置時取得、自行託管；不能把 build 階段外連誤寫成訪客向 Google 提交資料 |
| 託管 | GitHub Pages 可能依其設定保留存取紀錄；未確認法律主體、保存、刪除、跨境與權利程序，不發表「完全不蒐集資料」或合規保證 |
| Task 009 | Privacy 未執行／未核准，不宣稱政策完成或已生效；新管道／收集功能啟用前須另行確認資料契約、owner 與法律審查 |
| 測試 fixture | 只在隔離暫存環境使用 reserved `example.invalid` 合成長字串，不公開、不點擊、不寄信；不是核准或真實收件證據 |

## 環境與受測版本

- Linux 6.18.57 x86_64／Debian 13，Node.js 24.22.1、npm 11.9.0。
- Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3、shadcn 4.23.0、Lucide React 1.74.0、ESLint 9.39.5；manifest／lockfile 與 Base 相同。
- Chromium 156.0.8078.79、Playwright 1.65.1、axe 4.14.1；QA 工具位於 `/tmp`，沒有加入 app Dependencies。手機操作為瀏覽器觸控模擬，不冒稱實體設備測試。
- App 指紋 SHA256：`42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b`。依序雜湊排序的 `src` TS／TSX／CSS／SVG 路徑與 bytes，再加 package.json、package-lock.json、next.config.ts、Pages script；品質指令與已完成的 browser run 前後均核對；未完成 attempt 的觀察限制另外記錄，不包含報告以避免自我引用。
- 報告內獨立 async assertions 共用 Node process，單項 Exit Code 為 null／不適用；整輪實際 process exit 另列，不為每一項虛構 0。人工目視沒有 shell Exit Code。

## 品質指令與實際退出碼

所有時間 UTC，日期均為 2026-11-19。Expected Result 為 Exit 0 且該次 app 指紋不變；初次失敗與各 source epoch 均保留。最新五項為 C08-Q01-R02、C08-Q02-R01、C08-Q03-R01、C08-Q04-R01、C08-Q05-R01，全部 Exit 0，對應最終 `42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b`。

| Test ID | 實際 Command／Procedure | 時間 | Actual Result／Exit Code | Source Epoch／Status／原始 Log |
| --- | --- | --- | --- | --- |
| C08-Q01 | `npm ci` | 01:26:20–01:26:35 | Exit 254；該次指紋不變 | previous／FAIL；`install.log` |
| C08-Q01-R01 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm ci` | 01:26:57–01:27:10 | Exit 0；該次指紋不變 | previous／PASS；`install-retest.log` |
| C08-Q02 | `env npm_config_cache=/tmp/xk-task008/npm-cache npx tsc --noEmit` | 01:27:14–01:27:17 | Exit 0；該次指紋不變 | previous／PASS；`typecheck.log` |
| C08-Q03 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run lint` | 01:27:21–01:27:24 | Exit 0；該次指紋不變 | previous／PASS；`lint.log` |
| C08-Q04 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run build` | 01:27:39–01:27:48 | Exit 0；該次指紋不變 | previous／PASS；`build.log` |
| C08-Q05 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run build:pages` | 01:33:20–01:33:26 | Exit 0；該次指紋不變 | previous／PASS；`pages-build.log` |
| C08-Q01-R02 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm ci` | 02:06:27–02:06:39 | Exit 0；該次指紋不變 | current／PASS；`install-final.log` |
| C08-Q02-R01 | `env npm_config_cache=/tmp/xk-task008/npm-cache npx tsc --noEmit` | 02:07:05–02:07:08 | Exit 0；該次指紋不變 | current／PASS；`typecheck-final.log` |
| C08-Q03-R01 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run lint` | 02:07:57–02:08:01 | Exit 0；該次指紋不變 | current／PASS；`lint-final.log` |
| C08-Q04-R01 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run build` | 02:08:24–02:08:32 | Exit 0；該次指紋不變 | current／PASS；`build-final.log` |
| C08-Q05-R01 | `env npm_config_cache=/tmp/xk-task008/npm-cache npm run build:pages` | 02:11:55–02:12:02 | Exit 0；該次指紋不變 | current／PASS；`pages-build-final.log` |

初次 npm ci 因預設 `/home/agent/.npm/_cacache` 無法建立，伴隨 tarball／cleanup 警告後以 ENOENT／Exit 254 結束。改用可寫 `/tmp/xk-task008/npm-cache` 後重新安裝成功，最終版本再完整 npm ci；未改 HOME、套件或 lockfile。安裝時既有 ESLint 9 deprecated 提示保留；零警告規則指的是實際 ESLint 執行，檢查 Exit 0。

## 一般 production 實際驗收

最終一般 build 後，以 `env npm_config_cache=/tmp/xk-task008/npm-cache npm run start -- --hostname 127.0.0.1 --port 3050` 新啟 server，再執行：

```sh
node /tmp/xk-task008/browser.cjs --mode=general --base=http://127.0.0.1:3050/ --run=general-finalfresh --expected-fingerprint=42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b
```

2026-11-19T02:09:33.128Z–2026-11-19T02:10:14.900Z，實際 Process Exit 0，**27/27 PASS**。九頁 HTTP 200、單一 H1／區塊數、精確 Metadata、Contact 六區塊／三準備／三流程／五服務錨點、39 unique 站內目的地／345 link occurrences、實際跨頁及保留首頁 `#contact` 全部通過。28 個 observed 資源獨立 GET 200，原始 Console／Runtime／request failures 為 0；未知路由及 production 預設 dev 頁為預期 404。

新 context 觀察 form／input／submit／mailto／tel、Cookie、localStorage／sessionStorage entries、storage mutation、submission及 external provider requests 均為 0。這只描述 app 與當次瀏覽器，不推論 Hosting 完全無 logs。information ready=true、receiving ready=false／PENDING owner confirmation，沒有寄信或收件。

新一般 server 經核對 owned npm→sh→next PID／命令後 SIGTERM 停止，工具實際 completion Exit 143，確認 3050 連線拒絕後才建 Pages；這是受控停止結果，不是品質測試 Exit 0。舊 epoch 的 server stop 紀錄另留在 history。沒有在 Pages build 後誤用一般 `.next/` server。

## Pages 瀏覽器與實際驗收

一般 server 已停止後執行 `npm run build:pages`，確認 `out/contact/index.html` 與所有已合併頁、Base Path、Metadata、404、`.nojekyll`、dev route／payload 排除。以全新 `/tmp/xk-contact-preview-final.ba_ecbs5/xk-website/` 副本啟動 Python 靜態 server，URL 為 `http://127.0.0.1:3051/xk-website/`；沒有用 `npm run start` 冒充 Pages。

最終完整指令：

```sh
node /tmp/xk-task008/browser.cjs --mode=pages --base=http://127.0.0.1:3051/xk-website/ --run=pages-durable-final --screenshots=1 --expected-fingerprint=42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b
```

2026-11-19T02:21:47.245Z–2026-11-19T02:24:35.404Z，實際 Process Exit 0，**148 項＝141 PASS＋7 有據 N/A**。九個路由為 `/`、`/about`、`/services`、`/solutions`、`/portfolio`、`/portfolio/corporate-website`、`/portfolio/enterprise-management`、`/portfolio/integration-hub`、`/contact`。

| Test Item／範圍 | Expected Result | Actual Result／證據 |
| --- | --- | --- |
| R01 九頁 × 五寬 | 320／375／768／1440／1920px，完整閱讀順序、無水平溢出／裁切 | 45/45 完成；卡片、Logo、CTA 與文字幾何通過 |
| A01 axe | WCAG 2／2.1 A／AA 零檢出違規，含 Contact 320／375／768 展開選單 | 48 次全部零違規；每次原始 axe JSON 保留 |
| F01／F02 Contact | 六區塊、單一指定 H1、三準備、三流程、派生 unavailable、五服務真錨點 | 全部符合；無假表單／Email／電話／地圖／Privacy Link |
| F04 全部連結／錨點 | 九頁所有實際連結、目標 ID、HTTP 與 Base Path 可用 | 39 unique destinations／345 occurrences；實際跨頁與首頁舊錨點正常 |
| A02 鍵盤與導覽 | Tab／Shift+Tab／Enter、Skip Link、可見 Focus、Escape 還焦、點連結／外部／斷點關閉 | 九頁與 Contact 實際 CTA、mobile disclosure 全部通過 |
| R02 375px touch | 真正瀏覽器觸控模擬，選單→Contact→管道錨點→About，不依賴 Hover | 完整流程及 context close 實際完成；逐步 trace 保留 |
| A03 Reduced Motion | 減少動態偏好下過渡 0s、捲動 auto，無動畫依賴 | 九頁全部通過；沒有實際 disabled 操作，因此 disabled 子項 N/A，不造假控制 |
| R02 長字串 | 實際 renderer 在五寬處理長 Email／URL／中英文字，不裁切或省略 | 隔離 SSR 真正執行 channels-only；五寬 PASS、真實 CSS／字體，無外部啟動或公開 registry 改動 |
| P01 資料盤點 | 不新增表單提交、收件服務、持久儲存或未核准第三方請求 | 完整互動後無輸入／提交、Cookie／Storage mutation／外部 provider，Hosting logs 邊界明示 |
| B01 資源與錯誤 | 觀察資源可獨立 GET 200，沒有未處理 Console／Runtime／非預期 Network Error | 147 個資源 GET 200；raw GET failures 0、非預期錯誤 0 |
| S01 SEO | 各頁精確 Title／Description／Canonical／OG／語言／noindex，無假圖片／Schema | 九頁一般／Pages 均符合；Contact 固定內容正確 |
| G01 靜態保護 | Contact＋八舊頁、Base Path、資源、404、`.nojekyll`、dev route／payload 排除 | Validator、HTML／資源實體及實際 HTTP 通過；未知路由 404 |

B01 原始紀錄另有 **506 個 HEAD 完成事件**，全數保留，依精確方法／URL、同 document epoch／Next-URL 來源、fulfilled 200／CDP 200、一對一後續成功 tree GET 與真實 Next bundle callsite 才分類。沒有忽略一般 GET、沒有停用產品 prefetch，也不推測 Next 主動取消請求；「非預期錯誤 0」與原始事件數分開回報。

隔離 fixture 只在獨立 module cache 以兩筆 reserved `example.invalid` 合成資料替換 registry，實際渲染 `ContactChannels`／`ContactChannelList` 及派生函式；輸出透過獨立 browser context 的 route interception 提供，使用本次 production CSS／字體。沒有新增 app route／server、未點擊 Email／外部 URL，不是管道公開許可、所有權或收件證據。

## 七張截圖與人工視覺

以下七張由本次最終 Pages 真實瀏覽器產生，已原 bytes 複製到 Repository；SHA256、尺寸、URL／Viewport／取景及人工紀錄在結構化證據。Root 與獨立 reviewer 已在前一 source epoch 逐張實際開啟檢視，另看 320／375px 的 Hero、fallback、準備、流程與 Footer，以及五寬長字串 fixture，共 22 張實際 PNG。最終 current epoch 的七張正式圖重新由 fresh build 拍攝，再與已目視的七張 PNG 逐 bytes／SHA256 比對一致；`manual-visual-epoch-bridge.json` 明列版本與路徑。原兩份 22 張目視紀錄保留原指紋，不改稱已重新目視新版本 22 張。版面閱讀順序、原稿 Logo、品牌／技術標語、真實 CTA、空狀態、資料注意及 Footer 可讀，沒有可見裁切或重疊；不宣稱人工看過全部 45 個自動案例。

| Test ID／實際截圖 | PNG 尺寸 | Viewport | 取景／人工結果 |
| --- | --- | --- | --- |
| C08-E01 [task008-contact-desktop.png](../screenshots/task008-contact-desktop.png) | 1440 × 3957 | 1440 × 1000 | 完整 unavailable 桌面；PASS |
| C08-E02 [task008-contact-mobile.png](../screenshots/task008-contact-mobile.png) | 375 × 6177 | 375 × 1000 | 完整 unavailable 手機；PASS |
| C08-E03 [task008-contact-channels.png](../screenshots/task008-contact-channels.png) | 1440 × 578 | 1440 × 1000 | 誠實空狀態及三真實連結；PASS |
| C08-E04 [task008-contact-preparation.png](../screenshots/task008-contact-preparation.png) | 1440 × 1204 | 1440 × 1000 | 三準備、五服務導覽及三步合作；PASS |
| C08-E05 [task008-contact-data-note.png](../screenshots/task008-contact-data-note.png) | 1440 × 486 | 1440 × 1000 | 資料注意／無表單與 Hosting 邊界；PASS |
| C08-E06 [task008-contact-mobile-navigation.png](../screenshots/task008-contact-mobile-navigation.png) | 375 × 1000 | 375 × 1000 | 展開選單、Contact 入口與關閉 Focus；PASS |
| C08-E07 [task008-contact-footer.png](../screenshots/task008-contact-footer.png) | 1440 × 553 | 1440 × 1000 | 有效頁尾導覽及 Privacy 待建立純文字；PASS |

額外表單的 error／submitting／success／failure 圖為 N/A：未另獲授權、無核准收件服務，未製作示意成功狀態。axe 與 scripted 操作只涵蓋本次頁面／狀態，不是完整輔助科技或法律合規認證；其他瀏覽器／實體設備／完整螢幕閱讀器補測未執行。

## 失敗、未完成與重驗

| Test／試次 | 真實結果與影響 | 修正、重驗與限制 |
| --- | --- | --- |
| C08-Q01 初次安裝 | FAIL，實際 Exit 254；預設 npm cache mkdir ENOENT，app／lockfile 未變 | C08-Q01-R01 改用暫存 cache，Exit 0；兩份原始 Log 都保留 |
| C08-D01 初次 Markdown | FAIL，README 第 105 行 MD012 多餘空行 | 已移除一個空行；最初僅保存 stdout，numeric exit 未保留故維持 null，不猜造；最後完整文件檢查另保存實際 exit |
| 首輪 Pages formal | 整輪未完成／FAIL；原始 snapshot 仍 PENDING，停在 touch375，沒有完整 output／completion code | 原始 bytes 未改寫；exec session 句柄失效、PID 已 zombie，kernel observed status 0 與工具實際 completion code 不同，後者不可得／null，不作 PASS |
| 觸控獨立診斷 | 01:52:07–01:52:10，逐步 newContext→watch→Home→Menu→Contact→anchor→About→close 完成，實際 Exit 0 | 沒有重現 UI 問題；首輪細部原因仍 unknown，不推定為 app bug 或隱藏失敗 |
| 前一 source epoch Pages 完整重驗 | 148 項完整結束、141 PASS＋7 有據 N/A，實際 Exit 0 | 工具加入 heartbeat／keepalive、逐步 trace、20s 觸控等待界限及有界測試；沒有以改產品或跳過 touch 換取 PASS |
| 窄版補充截圖 | 01:57:48–01:57:51，5/5 PASS，實際 Exit 0 | 只補四張實際 prep／Footer PNG，不代替主 148 項；exact tool／manifest／trace 獨立保留 |

最後五個品質指令與最新完整 General／Pages 對應 current app 指紋；較早歷史仍記原指紋。原 FAIL、未完成 snapshot、未知 numeric exit 與成功重驗各自保留，不把未完成事件追認成成功；後續只有文件／證據修改，必須再次核對 app 指紋與 Markdown／連結。

最新 source epoch 另有一輪 02:14–02:16 的完整 148 項結果，但原工具 completion 的 numeric exit 未保留；raw PASS148 與 exit null／NOT FINAL 分別保存，正式驗收狀態為 FAIL（缺少必要程序完成證據，不代表 app assertions 失敗），沒有追認其為最終交付。最後重新透過外部 Python `subprocess.wait()` runner 執行全套，真實 Exit 0 回執、Node PID、完整 stdout／SHA 及工具 completion Exit 0 相互對照，避免再次依賴聊天回應保留退出碼。最終只選 `pages-durable-final` 的實際完成結果。

## 最後格式修正與 Source Epoch

完整 staged Diff 檢查發現新檔 `contact-preparation.tsx` 的額外 EOF 空行。先前 unstaged-only 檢查尚未涵蓋 untracked 新檔；重現 `git diff --cached --check` 的實際 Exit 2 與原輸出保留於 C08-D02。只移除一個 LF，精確 `old == new + LF`，沒有改 JSX、文案或行為，之後全部五品質及一般／Pages Browser 重新執行，沒有將舊結果直接套給新指紋。

| Source Epoch | 指紋／用途 |
| --- | --- |
| Previous | `5dfa8be441c40d2c447a25fd05bce494e4d8ba0290bd21fb3e22630960c8c964`；保留原品質、General、首輪 incomplete、診斷、Pages 重驗、人工目視與原圖 |
| Current | `42c8e5bf5b069f643981fdef2741cd530cd55809123c744c24ded3d2c2a4c62b`；最後五品質、fresh General 與完整 fresh Pages，作為實際提交依據 |

`source-epoch-change.json` 保留單檔 old／new SHA、原始 bytes及一個 LF 的實際差異。最後文件檢查同時執行 staged／unstaged diff；完整檔案清單相對 origin/main 比較，避免 staging 後遺漏檔案。所有當前必要本機檢查均已有新版本完成證據。

## 規格矩陣與尚未發生階段

此為 PR 建立前的本機快照；規格 27 項為 **18 PASS、7 N/A、2 PENDING**。PENDING 分別是尚未發生的必要 PR CI 階段，以及未選擇的 Optional 額外瀏覽器／輔助科技。不得把遠端 CI 尚未執行寫成全部必要階段均完成。每項 Command／Procedure、Environment、Expected／Actual、Exit Code、Status、Evidence／Notes 與原始 assertions 都在結構化驗證紀錄；單項 async exit 為 null，整輪真實 exit 另列。

| Test ID | 本次判定／Actual Result | Status |
| --- | --- | --- |
| C08-Q01 | 初次 FAIL 254 保留；前 epoch cache 修正 Exit 0；current fresh npm ci Exit 0 | PASS |
| C08-Q02 | Strict TypeScript Exit0 | PASS |
| C08-Q03 | ESLint Exit0、零警告 | PASS |
| C08-Q04 | 一般 build Exit0＋九頁一般 server 27PASS | PASS |
| C08-Q05 | Pages build／validator Exit0＋完整靜態驗收 | PASS |
| C08-F01 | 六區塊、指定 H1、三準備／三流程／真 CTA | PASS |
| C08-F02 | unavailable 空狀態、零 form/input/mailto/POST | PASS |
| C08-F03 | 未採用公開管道；沒有 owner／可用性核准，不發布 | N/A |
| C08-F04 | 共用聯絡來源、39 destinations／345 occurrences、原錨點 | PASS |
| C08-F05 | information ready=true；receiving ready=false／PENDING owner gate | PASS |
| C08-P01 | 完整互動資料盤點與 Task009 邊界，無新收集／儲存 | PASS |
| C08-T01 | 未另授權 form／schema，不啟用 | N/A |
| C08-T02 | 沒有真實提交，未製作假 disabled／success | N/A |
| C08-T03 | 沒有核准 provider，不以 mock 當送達 | N/A |
| C08-T04 | 未授權服務，沒有新第三方／反 spam／secret 整合 | N/A |
| C08-T05 | 本次預設資訊頁未另要求實際收件／核准測試收件者 | N/A |
| C08-R01 | 九頁 × 五寬45cases完成 | PASS |
| C08-R02 | 五寬實際 renderer fixture及375px touch完成 | PASS |
| C08-A01 | 48次axe零違規，heading／裝飾／名稱／對比視覺核對 | PASS |
| C08-A02 | 九頁鍵盤、Skip、Focus、Escape／各關閉條件完成 | PASS |
| C08-A03 | 九頁reduce過渡0s；disabled子項有據N/A | PASS |
| C08-B01 | 147 個資源 GET 200，506 個原始 HEAD 嚴格分類，unexpected 0 | PASS |
| C08-S01 | 九頁兩模式精確Metadata／noindex | PASS |
| C08-G01 | 九頁HTML／Base Path／404／.nojekyll／dev保護 | PASS |
| C08-CI01 | PR尚未建立；須補本次精確head CI與artifact，不能由local替代 | PENDING |
| C08-O01 | 只執行Chromium desktop/mobile emulation，未補其他browser／實機／完整screenreader | PENDING |
| C08-X01 | 排除Backend／DB／CRM／會員／Analytics，未為測試開發 | N/A |

## Known Issues 與 Pending Confirmation

| 項目／嚴重度 | 狀態、負責人與解除條件 |
| --- | --- |
| 正式管道／收件能力，業務未就緒 | PENDING；品牌 owner 在公開管道前提供公開許可、帳號控制、用途／責任及受控寄收或品牌頁可用性證據，完成 PublicationRecord；本次預設資訊頁不因此阻塞 |
| 表單與資料處理，未授權範圍 | PENDING；只有另外明確授權後，owner／服務管理者／Task009 審查者先確認 provider／schema／反 spam／個資契約，不自行選 vendor 或補法律承諾 |
| Privacy／法律資訊，後續任務 | PENDING；Task009 未執行／核准，未建立路由或假告知；不宣稱 Hosting 無 logs、法定主體、保存天數或政策生效 |
| 首輪 Pages 提早結束，驗收工具歷史問題 | 未取得可定位單一步驟的原始 completion；細因 unknown。當次未完成明列 FAIL，獨立診斷與最終完整重驗均 Exit0，未留下當前未通過的必要本機驗收 |
| 初次文件檢查 numeric exit，證據限制 | 最初原輸出保留但數值不可得，記 null；最後文件格式／連結檢查須實際通過。沒有補造歷史退出碼 |
| 額外瀏覽器／實體設備／完整 screen reader，Optional | PENDING；目前只有 Chromium 及觸控模擬，不冒作已執行或 N/A |
| ESLint 9 deprecated，既有工具鏈提示 | 保留版本與相容 peer；本次零警告 lint 通過，未違反版本凍結做升降級 |

## Git、Review 與部署階段

| 階段 | PR 前本機快照 |
| --- | --- |
| 本機開發／驗收 | 已完成上列適用範圍，最後文件／證據封存門檻完成後才建立 PR |
| Feature Commit／Push | PENDING；實際提交後補真 SHA，程式碼以本報告 app 指紋對照 |
| PR CI／artifact | PENDING；必須驗本次 head 的 quality／pages-build 成功、deploy skipped，以及實際下載 artifact |
| PR Review | 已有獨立規格、來源、程式審核，Blocking0；GitHub review／comments 只在 PR 後依實際結果記錄，不冒稱真人核准 |
| 使用者授權合併 | 本次已有明確 Push and merge 授權；PR／CI／review 狀態核對後才能記實際 merge SHA／時間 |
| main CI | PENDING；只取 merge SHA 的實際 run／jobs，不能沿用 PR CI |
| 正式部署／公開驗證 | PENDING；main deploy success與公開HTTP／內容／Base Path／資源 smoke分開確認，不發布未審feature branch或改Source／DNS |

遠端結果只能在實際發生後補上；報告是有時間界線的本機快照，同一 PR 最新交付紀錄承接精確後續 head／CI／merge／main 部署／公開網址。僅補文件與遠端狀態時仍核對原 app 指紋，避免為自我引用 SHA 反覆變更受測程式。

## 新增與修改檔案

最終提交範圍以完整 Git Diff 核對；不提交 `.next/`、`out/`、node_modules、npm cache、Secret、訪客資料或暫存 QA Dependencies。以下共 24 檔，來源程式只改必要 11 檔；文件原稿與其他 Repository 不變。

- `AGENTS.md`
- `README.md`
- `docs/98_decisions/implementation-notes.md`
- `docs/reports/task008-evidence.json.gz`
- `docs/reports/task008-implementation.md`
- `docs/reports/task008-verification.json`
- `docs/screenshots/task008-contact-channels.png`
- `docs/screenshots/task008-contact-data-note.png`
- `docs/screenshots/task008-contact-desktop.png`
- `docs/screenshots/task008-contact-footer.png`
- `docs/screenshots/task008-contact-mobile-navigation.png`
- `docs/screenshots/task008-contact-mobile.png`
- `docs/screenshots/task008-contact-preparation.png`
- `scripts/build-github-pages.mjs`
- `src/app/contact/page.tsx`
- `src/components/sections/contact/contact-channels.tsx`
- `src/components/sections/contact/contact-cta.tsx`
- `src/components/sections/contact/contact-data-note.tsx`
- `src/components/sections/contact/contact-hero.tsx`
- `src/components/sections/contact/contact-preparation.tsx`
- `src/components/sections/contact/contact-process.tsx`
- `src/components/sections/home-contact-cta.tsx`
- `src/config/contact-page.ts`
- `src/config/navigation.ts`

## 證據與完成門檻

本機驗收報告、逐項摘要、原始 bytes 封存與七張真實 PNG 均在 PR 建立前完成，納入同一功能 PR。壓縮封存包含原始 Log／JSON／axe／exact工具 snapshot／trace／fixture與截圖，依 SHA256 驗 bytes，可安全還原；報告不以摘要取代原始失敗。最後文件格式、相對路徑、原 notes 前綴／Next generated block、source 指紋、完整Diff與秘密／產物檢查另記實際結果。

逐項驗證見 [Task 008 結構化摘要](task008-verification.json)，原始 bytes 見 [Task 008 壓縮證據](task008-evidence.json.gz)。本次封存包含所有正式、診斷、補圖與兩 source epoch 的原始檔；打包時全部逐 bytes 還原一致，後續獨立讀取封存再次驗 SHA256。七張正式 PNG 與來源候選 bytes 相同。

## 實際 PR／CI 補記（第一個 Code Commit 快照）

功能 Commit：`d5042910e14041bd3f5d71193cde31c1febf19c9`，已 Push 至 feature branch；[PR #12](https://github.com/xk2022/xk-website/pull/12) 以 main 為 Base。建立時 main 已由 `99e375e…` 前進為 `dabcdad6a7394478f0fec478c38b755419a8a3d4`，只改 `docs/task/temp.md` 的 Task 007 規劃文件。已在 feature 以 `3e16e5c58639b643c1e76685ca34b6a7b2d9303a` 同步並保留，app 指紋仍為 42c8e5bf…，沒有整合未核准分支或改寫該文件。

[PR head A Actions run 44445276310](https://github.com/xk2022/xk-website/actions/runs/44445276310) 實際 success：quality job `135295790172` 與 pages-build job `135296095319` success，deploy job `135296403011` skipped。此為該 exact head 的 C08-CI01 PASS，並非正式部署。GitHub Reviews 0、inline comments 0，不稱真人審核核准；獨立本機審核 Blocking 0。

實際下載 github-pages artifact `14492923340`，ZIP SHA256 `632ea46626b904242ca2474def1fc717595b0f72df5403c3da0b9bfb7030c100` 與 GitHub digest 相同。檢查通過：九頁、203 個實體檔、62 個 HTML／TXT／JSON payload、127 個靜態資源實體（115 woff2、3 CSS、8 JS、1 SVG），精確 Metadata／Canonical／noindex、Contact 六區塊／誠實空狀態、Base Path、404／.nojekyll／dev 保護及恰三 Portfolio slugs 全符合。

此補記僅修改報告與結構化 remoteSnapshot，原始 gzip、七圖及 app 程式不變。前方本機矩陣保留 PR 前時點；新增實際 remoteSnapshot 承接 C08-CI01 已發生的結果。最終 evidence Commit 的自身 SHA／新 head CI、使用者授權 merge、main CI、部署與公開 smoke 將在同一 PR 的最新交付紀錄逐階段補上，不以 head A 成功替代最終 head 或 main。後續真實狀態請見 [同 PR 最新交付](https://github.com/xk2022/xk-website/pull/12)。

本次 PR／CI 補記初次 Markdown 檢查另發現一個新增標題前的多餘空行（MD012、實際 Exit 1）；已移除後重新完整格式／連結檢查 Exit 0。此為文件補記的修正，原始輸出與兩次實際退出碼保留於 remoteSnapshot，沒有改 app 或重用舊文件檢查冒充通過。
