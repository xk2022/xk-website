# Task 007 — Portfolio 實作與驗證報告

本報告於建立功能 PR 前完成本機驗收內容。一般模式最終 **23/23 PASS、Exit 0**；Pages 最終 **123 項＝121 PASS＋2 有據 N/A、0 FAIL、Exit 0**。五個品質指令全部 Exit 0；所有原始失敗保留，沒有把預期結果或舊 Task 成果寫成本次成功。本次純文件補正加入第 10 節實際第一輪 PR 證據；後續最終 head／合併／部署依同 PR 最新交付紀錄確認，未發生階段不預填成功。

本次完成的是四個 Portfolio 網頁。三個展示計畫仍為 **PLANNED**，沒有任何案例系統完成、客戶成果或 Live Demo 的宣稱。

## 1. Repository、版本與範圍

- Website：`xk2022/xk-website`；最新已合併 Base `43ddd7ed0e339d35ece949a656188defcaa5ac72`。初始 Working Tree 乾淨，從 main 建立 `feature/website-portfolio-page`，沒有覆蓋使用者工作。
- Task 001–006 的實際 Merge Commit 均已確認是 Base 的祖先，六次 `git merge-base --is-ancestor` 實際 Exit 0；Task 006 為 [PR #10](https://github.com/xk2022/xk-website/pull/10)。這是前置證據，不代替 Task 007 驗收。
- 文件 Repository 最新 main 重新確認為 `95ef1275a46ace76e11f668178ca881087483398`，Tree `8bba493a05911a11a7e29d7d01650e9d0e00f3e7`。完整唯讀快照 51 個 Blob 再核對，本次 P01–P10 全文重新閱讀且 10/10 原始 bytes 的 Git Blob SHA-1 一致。沒有修改該 Repository。
- 已讀根 AGENTS／README、Task 001–005 正式規格、歷史實作、Design System、Pages 指南及 Task 006／007；歷史缺檔、Legacy Pages、舊 Vercel／monorepo 規劃不覆蓋現行架構，不恢復已刪除替代原稿。
- 實際版本：Node v24.22.1、npm 11.9.0、Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3、shadcn 4.23.0、Lucide React 1.74.0。Strict／noUncheckedIndexedAccess 與 `@/*` 保留。
- 使用者本輪明確授權 Task 007 開發、核對、驗證文件及 Push and merge。此授權不擴及其他 Task、案例 Backend、DNS、Pages Source 或 Vercel 設定。

受測程式碼 SHA256 指紋：

```text
3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13
```

依 localeCompare 遞迴排序 `src/` 中 ts／tsx／css／svg，逐筆加入相對路徑及 bytes，再加入 package.json、package-lock.json、next.config.ts、scripts/build-github-pages.mjs 的路徑及 bytes。五個品質指令前後及四輪 Browser run 完全一致；只有外部驗收工具與報告變動。後續若改產品碼，必須重跑受影響驗收。

## 2. 來源與作品狀態 Gate

下表 Commit 一律為上述文件版本。這些文件是規劃參考，不是案例完成、客戶、素材或公開源碼授權。支持章節與採用內容完整保留於 `src/config/portfolio.ts` 及驗證 JSON 的 sourceReview。

| ID | 原始路徑 | 實際 Git Blob SHA |
| --- | --- | --- |
| P01 | `doc/01_business-plan/week-03/01_portfolio-strategy_XK 技術作品展示策略.md` | `88103f938cfb421878de414194db4b981ec5c024` |
| P02 | `doc/01_business-plan/week-03/02_case-01-corporate-website.md` | `c9b151d01a7616abb939dd9747d704428d0bdd8c` |
| P03 | `doc/01_business-plan/week-03/03_case-02-java-enterprise-system.md` | `4b338c79ac83db44307832754404a28496303189` |
| P04 | `doc/01_business-plan/week-03/04_case-03-api-integration-platform.md` | `be1dbacf99ac76d5032ca6cecf221a9a000ff89b` |
| P05 | `doc/01_business-plan/week-03/05_portfolio-content.md` | `e9aae178cdcef6afca313fde3cd501bd533ee028` |
| P06 | `doc/01_business-plan/week-03/README.md` | `aaf4dae6b3e80f485fd9a98dd76637a10dc9e561` |
| P07 | `doc/01_business-plan/week-01/02_service-catalog.md` | `cc1c2bacbc1f5367667005a9d4a3b288fc8cfd0c` |
| P08 | `doc/01_business-plan/week-02/05_website-sitemap_ 官方網站資訊架構與網站地圖.md` | `1f1b4584bbe06f0079542eedffa52215024da0f7` |
| P09 | `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` |
| P10 | `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` |

| 作品 slug | 分類／相關 ServiceId | 狀態與已確認範圍 |
| --- | --- | --- |
| corporate-website | Website Development；website-development | PLANNED；官網現有成果不自動等於完整 Case 01 完成，Contact API／多語／原始 Vercel 方向仍需獨立確認 |
| enterprise-management | Java Enterprise Solutions；java-enterprise、system-integration | PLANNED；摘要 Customer／Product／Order 與詳細 Users／Departments／Employees／Customers／Projects／Tasks 存在差異，不合併成完整 ERP |
| integration-hub | System Integration；system-integration、java-enterprise | PLANNED；ERP／CRM 等為模擬情境，AI／n8n 為後續，不宣稱已整合、即時監控或 SLA |

三案 type 固定 demonstration，可見標示 Self-Initiated Demonstration Project。implementedFeatures／implementedTechnologies／media 全空，sourceLink／liveDemo 全為 null，statusEvidence 只有 planning-reference，沒有擁有人進度核准或完成測試。網站測試 PASS 不改作品狀態。

P05 的 enterprise-integration-hub 與本規格 canonical integration-hub 有差異；本次採明確指定的 integration-hub，沒有舊公開頁須遷移，不建立假 redirect，舊 alias 實測 404。來源模組分歧、尚未核准的案例狀態、素材與 Live 均按規格 fallback 處理，不自行補造業務資訊。

## 3. 實作與元件分工

- `/portfolio` 由六個主 Section 組成：portfolio-hero、portfolio-introduction、portfolio-projects、portfolio-technology、portfolio-transparency、portfolio-next-step。H1、介紹、Title／Description 精確依規格；三張卡在手機／平板／桌面為 1／2／3 欄，分類與技術是文字標籤。
- 三詳頁共用 `[slug]` Server Page 與 ProjectDetail，依序八 Section：project-overview、project-challenge、project-solution、project-technology、project-evidence、project-status、project-services、project-next-step。背景、問題、規劃方案／架構／功能、技術、實作證據空狀態、狀態及服務／CTA 由集中 typed registry 呈現。
- Promise params 依已安裝 Next.js 文件 await，generateStaticParams 只回傳三個 registry slug，dynamicParams=false，lookup 不存在時 notFound；不 fallback 到別案。詳頁 absolute Title 為實際專案名加「XK 技術作品集」。
- 所有新 TSX 為 Server Components，沿用 Section／Container／Card／Button／SectionHeading／XkLogo／BrandPattern；中文 SectionHeading 明確 titleLang=zh-TW，手寫 CTA H2 合法繼承 html zh-TW。整卡 Link 無 nested interactive。
- Header／Footer／Mobile 共用「技術作品集」入口，位於 Solutions 後與聯絡前；Footer 舊規劃中文字移除。Services 由 ServiceId 解析現有 serviceCategories 與真實錨點；Contact 沿用 contactNavigation。Home／About／Services／Solutions 與舊錨點保留。
- Metadata 保留品牌 Canonical／OG URL、zh-TW／zh_TW、website 與 noindex／nofollow，沒有假 OG Image 或 Schema。一般 Next build 與 Pages export 分開；Validator 追加四頁、恰三 slug／四 Portfolio HTML、語言與引用資源檢查，既有四頁／404／.nojekyll／dev payload 保護保留。

## 4. 實際檔案清單

| 動作 | 檔案 |
| --- | --- |
| 修改 | `AGENTS.md` |
| 修改 | `README.md` |
| 修改 | `docs/implementation-notes.md` |
| 新增 | `docs/reports/task007-evidence.json.gz` |
| 新增 | `docs/reports/task007-implementation.md` |
| 新增 | `docs/reports/task007-verification.json` |
| 新增 | `docs/screenshots/task007-corporate-website-detail.png` |
| 新增 | `docs/screenshots/task007-enterprise-management-detail.png` |
| 新增 | `docs/screenshots/task007-integration-hub-detail.png` |
| 新增 | `docs/screenshots/task007-portfolio-desktop.png` |
| 新增 | `docs/screenshots/task007-portfolio-footer.png` |
| 新增 | `docs/screenshots/task007-portfolio-mobile.png` |
| 新增 | `docs/screenshots/task007-portfolio-projects.png` |
| 修改 | `scripts/build-github-pages.mjs` |
| 新增 | `src/app/portfolio/[slug]/page.tsx` |
| 新增 | `src/app/portfolio/page.tsx` |
| 修改 | `src/components/layout/site-footer.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-cta.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-hero.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-introduction.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-projects.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-technology.tsx` |
| 新增 | `src/components/sections/portfolio/portfolio-transparency.tsx` |
| 新增 | `src/components/sections/portfolio/project-card.tsx` |
| 新增 | `src/components/sections/portfolio/project-detail.tsx` |
| 新增 | `src/components/sections/portfolio/project-labels.tsx` |
| 修改 | `src/config/navigation.ts` |
| 新增 | `src/config/portfolio.ts` |

新程式為 11 個 TSX 加集中 portfolio.ts；必要整合為 navigation／Footer／Pages validator。未修改 Dependencies、lockfile、Next／Tailwind 設定、workflow、原 Logo／Tokens、其他 Repository 或帳號設定，未提交 .next、out、node_modules、暫存工具或機密。

### 素材與資產路徑

沒有經核准且可驗證的案例系統素材，media=[]，UI 顯示「尚無可驗證的系統畫面」，沒有 img／iframe／不存在圖片請求，也沒有假 Source／Live 按鈕。ProjectMedia 型別仍定義 src／alt／尺寸／類型／來源／創作者／權利／相符 Commit／日期／審核記錄，留待真正具備素材時逐項確認。

沿用的品牌 inline SVG 與既有 source 記錄未改，Logo 保持 Provisional；圖示使用既有 Lucide。沒有需要前綴的新 public 圖片，因此不新增空 public/images/portfolio 或多餘 asset helper。網站自身的七張 QA 截圖只放 docs/screenshots，不加入三案 media，不充當案例系統畫面。

## 5. 環境、命令與真實品質結果

環境：Linux 6.18.57 x86_64；Chromium 156.0.8078.79（Debian 13、headless）、Playwright 1.65.1、axe-core 4.14.1。工具位於應用套件外，沒有新增 npm Dependencies。375px touch 為真實瀏覽器輸入模擬，isMobile／hasTouch、2× Device Scale，不是實體手機。

| Test ID | 實際命令 | UTC 開始 → 結束 | Status／Exit Code |
| --- | --- | --- | --- |
| P07-Q01 | `npm ci` | 2026-11-19T00:07:37Z → 2026-11-19T00:07:46Z | PASS / 0 |
| P07-Q02 | `npx tsc --noEmit` | 2026-11-19T00:08:10Z → 2026-11-19T00:08:14Z | PASS / 0 |
| P07-Q03 | `npm run lint` | 2026-11-19T00:08:14Z → 2026-11-19T00:08:17Z | PASS / 0 |
| P07-Q04 | `npm run build` | 2026-11-19T00:09:02Z → 2026-11-19T00:09:11Z | PASS / 0 |
| P07-Q05 | `npm run build:pages` | 2026-11-19T00:20:28Z → 2026-11-19T00:20:34Z | PASS / 0 |

npm ci 的既有 ESLint 9.39.5 deprecated 提醒與 npm 新版通知保留，未升降級；安裝仍 Exit 0，專案 ESLint 零錯誤／警告。完整 stdout／stderr 已納入驗證 JSON 的 quality.logText。

一般 build 後啟動新的 `npm run start -- --hostname 127.0.0.1 --port 3040`。首次預設沙箱 listen EPERM、Exit 1；以工具允許的網路權限重啟後 Ready149ms，才執行一般模式。驗收後工具 session Ctrl+C 回報 130，子程序仍存活；核實本次 PID 命令／父子關係後 SIGTERM 並實測 3040 ConnectionRefused，才執行 Pages build。沒有把長時間 server 的受控停止寫成品質指令 Exit 0。

Pages build Exit 0 後，fresh out 複製至 `/tmp/xk-portfolio-preview._2gvj6jy/xk-website/`，以 `python3 -u -m http.server 3041 --bind 127.0.0.1 --directory /tmp/xk-portfolio-preview._2gvj6jy` 提供。實測 Portfolio HTTP200/H1 後才跑靜態 Suite；完成後 session 停止回報 1，核實本次 Python 程序後 SIGTERM 並確認 3041 關閉。server-execution 保留啟動、停止與受限清理讀取的實際結果；它們不代替品質五指令或 Browser 程序結果。

四輪完整實際 Browser 命令如下；沒有沿用舊 Task run：

```sh
node /tmp/xk-task007/browser.cjs --mode=general --base=http://127.0.0.1:3040/ --run=general-formal --expected-fingerprint=3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13
```

```sh
node /tmp/xk-task007/browser.cjs --mode=general --base=http://127.0.0.1:3040/ --run=general-retest --expected-fingerprint=3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13
```

```sh
node /tmp/xk-task007/browser.cjs --mode=pages --base=http://127.0.0.1:3041/xk-website/ --run=pages-formal --screenshots=1 --expected-fingerprint=3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13
```

```sh
node /tmp/xk-task007/browser.cjs --mode=pages --base=http://127.0.0.1:3041/xk-website/ --run=pages-retest --screenshots=1 --expected-fingerprint=3e166b2e7502e4ac3b38b651960f4d11b2f310ffd37583c9bd1e920c2b0cfd13
```

| 模式 | UTC 開始 → 結束 | 項數 | 原始統計 | 程序 Exit Code |
| --- | --- | --- | --- | --- |
| general | 2026-11-19T00:13:20.339Z → 2026-11-19T00:13:50.181Z | 23 | 2 FAIL, 21 PASS | 1 |
| general | 2026-11-19T00:17:22.792Z → 2026-11-19T00:17:59.325Z | 23 | 23 PASS | 0 |
| pages | 2026-11-19T00:22:32.713Z → 2026-11-19T00:24:53.739Z | 123 | 1 FAIL, 2 N/A, 120 PASS | 1 |
| pages | 2026-11-19T00:32:40.883Z → 2026-11-19T00:35:17.461Z | 123 | 2 N/A, 121 PASS | 0 |

## 6. 逐項驗收對照

| Test ID | 適用性 | 實際結果 | Status |
| --- | --- | --- | --- |
| P07-F01 | Required | 8 頁 HTTP200；Section 數 7/9/10/9/6/8/8/8、三卡、三詳頁及所有固定內容；五個負向 URL 404 | PASS |
| P07-F02 | Required | 10/10 文件 Blob、22 refs、三 demonstration／PLANNED、空 implemented／media、null source／Live；沒有升級狀態或商業成果 | PASS |
| P07-F03 | Required | 三案完整呈現各自規劃／已實作／後續技術與功能，Case02 模組差異及 Case03 AI／n8n future 明示；H2／有效語言驗證 | PASS |
| P07-F04 | Required | 36 unique 站內目的地、304 link occurrences；卡片／麵包屑／服務錨點／CTA／深層刷新實際操作通過 | PASS |
| P07-R01 | Required | 八頁 × 320／375／768／1440／1920px＝40 案，無水平溢出、裁切或 Logo 比例失真 | PASS |
| P07-R02 | Required | 三卡 1/2/3 欄、長標籤與詳頁順序正常；375px 觸控 menu／project／contact 實際操作 | PASS |
| P07-A01 | Required | 40 頁寬案例＋Portfolio 320/375/768 展開選單，共43次 WCAG 2／2.1 A／AA axe，違規0 | PASS |
| P07-A02 | Required | 四新頁 Skip／Focus、Tab／Shift+Tab／Enter／卡片與CTA；Escape還焦、連結／外點／桌面斷點關閉、無殘留或modal鎖定 | PASS |
| P07-A03 | Required | 四新頁 reduce 偏好：transition0s、animation最小值1e-05s、scroll auto，資訊與操作仍正常 | PASS |
| P07-A04 | Not Applicable | 四新頁真實DOM nativeDisabled／disabledLink／ariaDisabled／form全0，沒有假停用操作 | N/A |
| P07-M01 | Required | 案例media全空且文字fallback正確，無案例圖片失敗請求；既有SVG／icon與來源保留，icon完整body200/411bytes/sourceSHA核對 | PASS |
| P07-M02 | Not Applicable | 未採Completed／Live，無核准source／系統media；案例核心流程與每案三張系統圖品質層級不適用，不製造假圖 | N/A |
| P07-B01 | Required | 最終Pages 123 observed資源（含RSC）獨立GET全200；GET abort0，Console／Runtime／非預期Network0；451個HEAD逐筆嚴格分類，raw仍保留 | PASS |
| P07-B02 | Required | 四輪及五品質指令受測app指紋一致，工具修正未改產品碼 | PASS |
| P07-S01 | Required | 四新頁精確Title／Description／Canonical／OG及語言／robots／單一H1；所有既有頁Metadata回歸，無假OG／Schema | PASS |
| P07-G01 | Required | 八公開HTML、404、.nojekyll、Base Path與實體資源；Portfolio恰四HTML／三slug，unknown／wrong-case／legacy／dev保護及payload排除 | PASS |
| P07-CI01 | Required | 第10節實作Commit A的PR CI成功、Deploy skipped，實際下載artifact91項通過；後續文件head必須另驗，不能沿用A | PASS |
| P07-X01 | Not Applicable | 不建立三案Backend／DB／API或驗不存在的客戶成果，未有這些runtime功能 | N/A |
| P07-E01–E07／V01 | Required | 七張真實Portfolio QA圖、320／375補充已人工閱讀，最終35候選圖與首輪全部同SHA，正式七圖按原bytes複製 | PASS |

每個實際測試的 Command / Procedure、Environment、Expected Result、Actual Result、Exit Code、Status、Evidence、Notes 在驗證 JSON 的 runs.tests／quality；程序完整退出碼以 formalExecutions 為準。程序內 async assertion 沒有獨立 shell Exit Code，保留 null 並說明，不捏造0或把整項改為N/A。

## 7. 失敗、修正與完整重驗

1. 初次一般模式 F03：工具誤把合法繼承 html zh-TW 的手寫 CTA H2 當成 SectionHeading，要求自身 lang。只對該手寫 CTA 改驗有效語言；真正共用 SectionHeading 仍驗自身 lang=zh-TW，沒有降低規格或改產品迎合錯誤測試。
2. 初次一般模式 B01：一筆 favicon GET ERR_ABORTED。原始資料僅有同URL成功，缺少同筆完整lifecycle／CDP／body，不能追認精確原因；原FAIL及限制保留。工具新增實際browser icon完整SVG200／bytes／SHA檢查與原生pending完成／quiet等待，B01沒有icon忽略清單；完整一般23項重驗Exit0，107筆icon lifecycle全部finished。
3. 首次Pages B01實際為 **3 GET＋1 HEAD**。三個tree GET在工具將舊頁IntegrationHub768px resize到1440後觸發prefetch，隨即gotoHome，與導航同毫秒中止；沒有完整body證據，仍保留FAIL，不稱GET成功或Next主動abort。
4. 第四個HEAD另揭露工具跨document貪婪配對：舊頁缺少成功tree時借用新頁tree，造成後續23筆配對偏移。原始錯誤分類紀錄保留為首輪工具缺陷，不能用作最終有效證據。
5. 工具增加 viewport／捲動／可見性變更後與刻意導航前的全請求settlement，HEAD/tree必須同真CDP loader document epoch、同Next-URL/referrer來源、最近因果時序且一對一，禁止跨頁借tree或重複使用；任何GET資源錯誤仍FAIL。
6. 使用同一份app指紋在新Browser context完整重跑全部123項，最終121PASS＋2N/A、Exit0；451個HEAD都有fulfilled200／CDP200／正確document來源treeGET200／實際prefetch callsite及獨立HEAD／GET200佐證。沒有停用產品prefetch、跳過測試、改驗收門檻或隱藏錯誤。

首兩種模式的初輪FAIL未覆寫。原run、錯誤、lifecycle／navigation／CDP、獨立診斷、所有axe原JSON與重驗完整證據均保留於壓縮證據檔；摘要另列每筆HEAD來源與配對證明。

## 8. 實際截圖與人工檢視

下列是Portfolio網頁自身驗收圖，不是三個案例系統已完成的截圖。正式檔案只在完整Pages PASS後複製；Viewport為CSS尺寸，PNG尺寸讀自實際header。

| Test ID | 真實檔案 | PNG尺寸 | Viewport | SHA256前綴 |
| --- | --- | --- | --- | --- |
| P07-E01 | [task007-portfolio-desktop.png](../screenshots/task007-portfolio-desktop.png) | 1440 × 4699 | 1440 × 1000 | `a129a847f965f79a…` |
| P07-E02 | [task007-portfolio-mobile.png](../screenshots/task007-portfolio-mobile.png) | 375 × 8761 | 375 × 1000 | `ebdb1c1a43e6525a…` |
| P07-E03 | [task007-portfolio-projects.png](../screenshots/task007-portfolio-projects.png) | 1440 × 1105 | 1440 × 1000 | `00bdaffd22238014…` |
| P07-E04 | [task007-corporate-website-detail.png](../screenshots/task007-corporate-website-detail.png) | 1440 × 5823 | 1440 × 1000 | `6d799caa5a9851a3…` |
| P07-E05 | [task007-enterprise-management-detail.png](../screenshots/task007-enterprise-management-detail.png) | 1440 × 5924 | 1440 × 1000 | `d9961c3e36e7086a…` |
| P07-E06 | [task007-integration-hub-detail.png](../screenshots/task007-integration-hub-detail.png) | 1440 × 5851 | 1440 × 1000 | `a6cf133bf5d7bf99…` |
| P07-E07 | [task007-portfolio-footer.png](../screenshots/task007-portfolio-footer.png) | 1440 × 552 | 1440 × 1000 | `cb59695f6ec2ed58…` |

本輪實際人工檢視七張指定圖，以及320px Hero／三卡、320px Enterprise技術、375px Integration狀態；獨立覆核另檢視11張三案320／375 overview／technology／status與Hero／卡片。標語與CTA完整、Logo等比例、卡片間距一致、長標籤可換行、Planned與無素材／實作證據界線清楚，無觀察到裁切／重疊／假圖或完成誤導。共35份最終候選PNG與首輪逐SHA比對相同；人工已讀影像與最終PASS版本完全對應，正式七圖copy後再次核對SHA。

自動axe與這些人工視覺不代表完整Screen Reader或全平台WCAG認證。

## 9. 可追溯證據、Known Issues與未完成事項

- [結構化驗證摘要](task007-verification.json)：五個品質log全文、四輪測試與原FAIL、每項expected／actual、全部raw request failures與每筆HEAD配對摘要、來源／狀態／素材與人工視覺記錄。
- [完整原始JSON證據](task007-evidence.json.gz)：100份原始run／classifier／axe／failure／manifest JSON以gzip保存；每份原文字串還原後SHA256已核對100/100，沒有刪除FAIL或丟棄完整stack／header／lifecycle。壓縮檔SHA與bytes在摘要evidenceSerialization；可用Python標準庫gzip/json讀取rawFiles，不新增應用套件。
- 初輪favicon的原始精確原因無足夠證據追認；完整重驗的資源及操作皆通過，保留此診斷限制，不用後續PASS改寫原FAIL。目前無未解的本機必要驗收阻礙；遠端階段仍須另實測。
- 安裝時既有ESLint deprecated提醒未升級處理；此為保留套件版本的已知上游提醒，不是本次lint失敗。
- Optional／PENDING：未另跑dev HMR、額外瀏覽器、實體裝置或完整螢幕閱讀器；已跑fresh一般production及Pages、指定五寬與觸控，未冒稱其他環境完成。
- Owner Pending Confirmation：三案真實進度／完成範圍／Live授權、是否採用現有官網作Completed Demo、Case02模組定稿、合法案例素材／可公開原始碼、正式聯絡資料、最終Logo／OG／中文品牌等。維持PLANNED／空素材／null連結，不阻擋本次有來源的規劃介紹頁。
- Task 008–014、案例系統、Backend／CMS／Analytics、Vercel／DNS／索引放行未實作，不以Portfolio完成當作其成果。

## 10. Git、PR、CI 與部署階段

本機報告、原始證據與七張實際圖已於建立 PR 前納入實作 Commit。此為 PR 建立後的一次純文件補正，原始 gzip、PNG 與受測 app 指紋均不變；本節保留第一輪 PR 的實際證據快照，不把它冒充後續文件 head 或 main 的結果。

| 階段 | 實際結果與證據 |
| --- | --- |
| Feature Commit／Push | `3ea24fb0af58b8f4ec0c1ff65910eb54f7eadd27`，已推送 feature/website-portfolio-page |
| Pull Request | [PR #11](https://github.com/xk2022/xk-website/pull/11)，Base main@43ddd7ed0e339d35ece949a656188defcaa5ac72 |
| 第一輪 PR CI | [Run 44432489191](https://github.com/xk2022/xk-website/actions/runs/44432489191)，精確 head 為上述 A；2026-11-19 00:52:24–00:53:43 UTC，SUCCESS |
| Quality | [Job 135253077967](https://github.com/xk2022/xk-website/actions/runs/44432489191/job/135253077967)，SUCCESS；00:52:26–00:53:01 UTC |
| Pages build | [Job 135253356255](https://github.com/xk2022/xk-website/actions/runs/44432489191/job/135253356255)，SUCCESS；00:53:04–00:53:43 UTC |
| PR Deploy | [Job 135253668053](https://github.com/xk2022/xk-website/actions/runs/44432489191/job/135253668053)，SKIPPED；未部署功能分支 |
| 實際 artifact | github-pages 14487631243，91 項斷言 PASS；197 檔、八頁精確 Metadata／H1／robots／lang、Portfolio 恰三 slug／四 HTML、127 個自託管引用資源與 CSS 字體存在、56 份 payload 無 dev，404／icon／.nojekyll 正確 |
| Review | 獨立程式／來源／文件／證據／PNG 覆核 Blocking 0；固定遠端 A 的 28 changed blobs 與全部 153 head blobs 均匹配本機 bytes，31 受保護 blobs 未改。這不是 GitHub 正式 APPROVED review；00:53:18.930–00:53:19.738 UTC 實際讀取 reviews／inline comments 均空 |
| 使用者授權 | 本輪明確要求 Push and merge；仍須驗證最終 head 的實際 CI 與 artifact，才可合併 |
| 後續階段 | 此快照時，純文件補正的新 head CI／artifact、Merge／main CI／Deploy／公開 URL 驗證均 PENDING，實際發生後記錄於下方同 PR |

實際 ZIP SHA256 `d02f9a9b819cb451585460acadd0bdcd230c2a91afe7da5ec863d23bbf84b3d6` 與 GitHub digest 相符；透過 connector 下載該 run 的實際 artifact，沒有沿用本機 out 或舊 Task 產物。完整 CI／jobs／artifact／下載與 checker 證據在摘要 remote 區塊；沒有提交下載產物或暫時 signed URL。127 是全部靜態引用，與 Browser 實際載入的 123 個資源（含 RSC）分開計算。

後續最終文件 Commit 的 Checks／artifact、真實 Merge SHA、main CI／部署與公開 URL 的 HTTP／Browser 結果，將補在 [PR #11 最新交付紀錄](https://github.com/xk2022/xk-website/pull/11)。每階段採精確當次 head／Run，不引用 A 的結果代替新 head，也不為報告自身 SHA 無限追加 Commit。只有取得實際 main Deploy 與公開站證據後，才可宣稱上線。

Task 007 原始規格的初始 PENDING／歷史研究敘述保持不改；本報告記錄正式實作與指定時點的真實驗收。
