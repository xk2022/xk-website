# Task 009 — Privacy 草案技術實作與驗證

紀錄日期：2026-11-19 UTC。此報告是本次本機交付快照；PR、合併後 CI、部署及公開網址的後續實際證據更新於同一 PR 說明，不預填遠端識別碼。

**正式政策仍為 BLOCKED。** 品牌負責人於本會話明確回覆「尚無」核准資料。本次完成的範圍是 `draft-1` 內部草案、語意頁面、隔離預覽及發布保護；不是有效法律政策，不代表 Task 009 全部通過。技術合併與部署授權不會取代同版本 Owner／法律審查，也不會解鎖資料收件。

## 基準、授權與來源

- Repository：`xk2022/xk-website`，唯一可寫來源。初始 main 工作目錄乾淨，fresh fetch 後 Base 為 `4c6646fa7e54b1b1e2589615eee82926e9e54d7a`。
- Feature Branch：`feature/website-privacy-policy`。Task 008 PR #12 已合併，Merge `e77cd8110e110b6405e6bf3ce354ffb041b34c41` 是 Base 祖先；Task 001–008 已合併的九個公開路由全數納入 fresh regression。
- 本次使用者明確授權開發、驗證文件、Push、PR、CI 成功後合併 main 與確認部署；沒有法律正文核准或新個資蒐集授權。
- 已完整閱讀當次 [Task 009](../task/task009.md)、根 AGENTS／README、[協作流程](../03_engineering/subagent-workflow.md) 及 implementation notes。Task 001–005、Design System、首頁／About／Services、Pages 指南與 Task 008 的相同 Blob 先前全文閱讀有來源清冊，本輪重新核對版本並重讀相關來源；不把舊測試當本輪驗收。
- 文件 Repository 僅讀。fresh API 於 `2026-11-19T05:38:23.529Z` 確認 main 仍為 `95ef1275a46ace76e11f668178ca881087483398`，Tree `8bba493a05911a11a7e29d7d01650e9d0e00f3e7`，51／51 Blob bytes 相符。沒有新核准政策、正式主體、權利管道、保存或跨境資料證據。

八份內容來源的完整路徑、固定版本連結、Blob 與採用區段見本報告的結構化證據。它們是商業規劃／模板，不是獲准法律正文：

| ID | 文件／採用界線 | Git Blob |
| --- | --- | --- |
| BUSINESS_EN | Week 01 company profile；品牌背景，不推導法定主體 | `249dda3bc464c7fae497e037d8a9916ed93893e7` |
| BUSINESS_ZH | Week 01 公司介紹；中文名稱未定，不補法人資訊 | `d089b3baf8a7466716cfa13ff62bd959f812b108` |
| INIT | 正式建置技術決策；ASK 與 ANS 範例分開，不採範例信箱／Backend | `59f6c1151015bdec746229e78596e2311cdc2f6f` |
| MVP | Website MVP §8／12；候選欄位與可選 GA4 不當作現行行為 | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` |
| ARCH | Website Architecture §10–12；採內容集中，不採表單／API 範例 | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` |
| SITEMAP | Legal／Footer；現行 `/privacy` 優先於舊 `/privacy-policy` | `1f1b4584bbe06f0079542eedffa52215024da0f7` |
| HOSTING | §12.1 標題是建議電子郵件，不能證實信箱控制或收件 | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` |
| CASE | Case 01 §9／17 是 Demo 規劃與審核提醒，不是已交付成果 | `c9b151d01a7616abb939dd9747d704428d0bdd8c` |

MVP 的 budget／privacyAccepted 與 Case 01 的 subject／privacyConsent 是不同候選 schema，沒有相加成現行蒐集欄位；建議 contact／hello 信箱沒有公開或送達證據。Java、AI、資料庫服務能力不等於官網已啟用相應資料處理。

## 實作、發布界線與版本

`src/config/privacy.ts` 集中 readonly 型別、`draft-1`、Metadata 與九段草案；controllerName、effectiveDate、rightsContact 為 null。九個穩定 ID 是 `policy-scope`、`data-collection`、`data-use`、`retention`、`third-parties`、`cookies-tracking`、`your-rights`、`privacy-contact`、`policy-updates`。

`/privacy` 與單一 Server Component 沿用 Container／Section／SectionHeading、既有字體／Tokens／Lucide，提供單一 H1、具名目錄、九個區塊、顯著「草案，尚未核准生效」與未知欄位說明。沒有新的 Client Component、Backend、表單、追蹤、同意控制或依賴。

server-only publication helper 是結構防呆，不是法律審核系統。草案只在開發或隔離本機明確旗標預覽；一般公開 production 預設 404。route 與 generateMetadata 共用 guard，非 Pages 草案以 installed Next.js 的 `connection()` 在 request time 判定 server-only flag，避免 build-time 404 固定而無法本機審閱。正式 URL／Metadata 保持品牌 `/privacy`、zh-TW／zh_TW 及 noindex／nofollow，沒有假 OG Image 或法律 Schema。

Footer 為「隱私權政策（待確認）」純文字，規劃路由仍為 planned；沒有新增主導覽或有效法律連結。所有 Contact 管道與 API 保留空清單／unavailable，既有九個公開路由與首頁錨點保留。

Pages builder 以 Node.js 24 原生 TypeScript stripping 讀取純資料 config，不增加套件；強制 child `XK_PRIVACY_PREVIEW=0`，draft route 在 render 前 notFound，輸出後移除任何殘留 Privacy 路由／payload，並掃描全部公開文字與 JS 的原文、HTML entity 及 Unicode escaped 草案內容。核准狀態若缺資料或正式頁則建置失敗；原九頁／資源／noindex／404／.nojekyll／dev 保護保留。未改 package／lockfile、workflow、Next 設定、品牌素材、DNS 或 Pages Source。

隔離預覽命令（僅 loopback；旗標不是驗證身分，不可放公開 Preview）：

```sh
XK_PRIVACY_PREVIEW=1 npm run start -- --hostname 127.0.0.1 --port 3062
```

## 環境與受測版本

Linux 6.18.57 x86_64／glibc 2.41；Node.js 24.22.1、npm 11.9.0；Next.js 16.4.6、React 19.3.1、TypeScript 5.9.3、Tailwind CSS 4.3.3。瀏覽器工具為 Repository 外的 Playwright 1.65.1／Chromium 156.0.8078.79、axe-core 4.14.1，沒有加入 npm dependencies。

受測程式碼 fingerprint：`c12b3733d743333b81470fbfeccfcdd2d43d644d6b4586b61d043c56d97a1cf6`。104 個 runtime／素材／scripts／manifest／lockfile／Next／TS／workflow 檔案逐檔 SHA-256 map；以排序鍵、無額外空格的 JSON 計算 SHA-256。包含新增未追蹤檔，freeze 前已 stage 並檢查完整 Diff、單一 EOF LF 與格式。報告／截圖後補不改受測程式碼；PR 對照最終提交的同一範圍。

一般 production：`http://127.0.0.1:3060`；受控草案：`http://127.0.0.1:3062/privacy`；Pages：`http://127.0.0.1:3061/xk-website/`。一般及 Pages 建置依序執行，不同時覆寫 `.next/`。

## 資料流清冊與確認責任

以下清冊區分可由程式／Runtime 證實的事實與 Owner 才能提供的租戶／法律資訊。未知值為 Pending Confirmation，沒有由「無表單／無資料庫」推論完全沒有資料處理。

| ID／觸發 | 欄位、來源與目的 | 接收者／傳輸與證據 | 保存／刪除、確認狀態 |
| --- | --- | --- | --- |
| DF01 開啟網站 | URL、一般網路／裝置請求資料；提供頁面 | Source 為 Pages workflow；本輪 Pages API 確認 workflow、HTTPS、`https://xk2022.github.io/xk-website/`、cname null | 平台日誌欄位、實際處理地區、接收者、條款與保存／刪除待 Owner／服務管理者確認 |
| DF02 資源載入 | CSS、JS、站內圖片、icon；呈現網站 | 瀏覽器實測資源與 HTTP 清冊見逐項證據；品牌素材為站內檔案 | 瀏覽器快取與 Hosting 日誌分開；不猜年限 |
| DF03 字體 | Inter／Noto Sans TC；提供排版 | `next/font/google` 在 build 下載；Runtime 檢查同站 `_next`，不把建置下載當訪客 Google 請求 | Build cache、訪客 cache 與供應商紀錄的責任分開，未虛構保存或跨境結論 |
| DF04 導覽／預取 | 路由、錨點、Next 預取請求；提供切換 | 站內 Link／Base Path；GET／HEAD／RSC 依原始 Network 觀察，不當作詢問提交 | 無新增應用層追蹤保存；Hosting 紀錄待確認 |
| DF05 Contact | 六區塊資訊，無姓名／Email／需求輸入欄位 | `verifiedContactChannels=[]`、無表單／收件 API／郵件／反垃圾服務；Source 與 DOM／請求核對 | 沒有應用層詢問保存流程；不因此否認 Hosting 紀錄 |
| DF06 暫時 UI 狀態 | 手機選單記憶體狀態；提供操作 | 既有 Client Component；本次沒有新增收件接收者 | 新 Context 的 Cookie／Storage 前後快照與 Source 寫入檢查分開記錄 |
| DF07 草案預覽 | draft-1、九段內容與未確認欄位；供審閱 | 只在開發／loopback 隔離 flag 預覽；一般 404／Pages 排除；沒有簽核密件或個資進 Browser Bundle | 不公開有效政策；Footer 待確認，預覽旗標不是存取控制 |
| DF08 Cookie／Storage／Analytics | 應用程式未新增 SDK／寫入 | 新瀏覽器 Context 的 Cookie、localStorage、sessionStorage 與第三方請求清冊見實測 | 零觀察值只限受測模式／操作；供應商處理仍待 Owner，沒有新增 CMP 或假同意 |
| DF09 外站／嵌入 | 單純外部 Link 與自動載入資源分開 | 已確認聯絡清單為空；實際 DOM Link、第三方請求及字體由 fresh QA 列舉 | 新增外站管道／嵌入前須另核對資料行為、條款與告知 |
| DF10 Build／CI | 程式、依賴、命令與 Log；工程作業 | npm／字體建置下載／GitHub Actions；本輪正式 build 設 NEXT_TELEMETRY_DISABLED=1 | CI artifact retention 是工程設定，不能拿來當訪客資料保存期；未提交 Secrets |

實際確認人為品牌負責人（本會話使用者），法律審閱者尚待其指定；Codex 負責 Source／Runtime／部署技術證據，不能替 Owner 決定法律主體或供應商租戶資訊。本輪啟動日為 2026-11-19，未擅自設定日曆截止日；以下里程碑是解除草案限制的必要期限。

| 待確認事項 | 負責人與最晚里程碑 | 未確認 fallback |
| --- | --- | --- |
| 主體、法域、法律審閱者 | Owner 提供，其指定審閱者審查／正式政策核准前 | null／未指定，正式發布 BLOCKED |
| 實際欄位、用途、接收者、保存／刪除、跨境及 Hosting 條款 | Owner／實際服務管理者提供，審閱者確認／政策文字核准前 | 不補年限、保證、處理地點或合法依據，維持無新收件／追蹤 |
| 權利管道、控制權、公開許可、可用性與程序 | Owner 實際驗證，審閱者確認／政策公開前 | rightsContact null，無假 mailto、社群、按鈕或表單 |
| 同版本正文、版本、生效日、更新方式 | Owner 與法律審閱者／解除 draft 前 | draft-1、生效日 null，不能拿 build 日期替代 |
| Task 008 收件或未來 Hosting／網域變更 | 對應任務負責人及 Owner／變更公開前 | 重新盤點與審查，Task 008 完成不解鎖 PII 收件 |

## 品質指令與退出證據

正式指令均由 `python3 scripts/run-with-evidence.py --receipt … --log … --timeout … -- <command>` 執行，原子回執包含 OS wait 取得的真實 returnCode／exitCode、時間與 Log SHA。npm 使用已確認可寫的 `/tmp/xk-task008/npm-cache`；沒有修改 HOME、套件版本或 lockfile。

| Test ID | Command／預期 | Actual／Exit Code | Status／Evidence |
| --- | --- | --- | --- |
| P09-C01 | `npm ci`，既有 lockfile 重現 | 616 packages，12s，Exit 0 | PASS；checks/npm-ci-1.json／log |
| P09-C02 | `npx tsc --noEmit`，Strict TS 無錯誤 | Exit 0 | PASS；checks/tsc-1.json／log |
| P09-C03 | `npm run lint`，零 warning | Exit 0，無 ESLint 錯誤或警告 | PASS；checks/lint-1.json／log |
| P09-C04 | `npm run build`，保留普通 production | Exit 0，Privacy 為受控動態路由 | PASS；checks/build-1.json／log |
| P09-C05 | `npm run build:pages`，草案排除及既有斷言保留 | Exit 0，static artifact verified，Base Path `/xk-website` | PASS；checks/pages-build-1.json／log |

P09-C05 刻意讓外層環境帶 `XK_PRIVACY_PREVIEW=1`，builder 的 child 固定為 0；成功排除草案，沒有靠操作習慣避免旗標外洩。一般服務與隔離預覽於 Pages build 前停止，兩個受控程序實際 Exit 143、兩埠關閉；這是預期的服務清理，不當作測試 Exit 0。最終稽核為補 ordinary Storage 快照另執行一次同版本 `npm run build`，真 Exit 0，沒有因此重跑其他品質指令或已通過的 Pages 矩陣。

補充防護測試：P09-G01–G08 共 8 組實際通過（draft 公開拒絕、隔離預覽、Pages 優先禁止、development、記憶體合成 approved fixture、缺件、非法日期／draft version、不允許協定）；Exit 0、完整結束標記。合成 approved 資料只在測試記憶體，不改網站 config、不當核准證據。Validator 的 20 個草案 marker／19 段正文，原文／Unicode／雙重轉義／HTML entity 等 101 個斷言通過，原八個 helper bytes 保留。

P09-F09 另以同一普通 build 在 loopback 3063 明確啟用既有 `XK_DESIGN_SYSTEM_PREVIEW=1`，`/dev/design-system` 實測 HTTP 200、noindex、139,546 bytes；真 Exit 0，服務清理觀察到 -15。預設關閉與 Pages 排除另有 fresh 驗收，沒有重跑不相關的設計系統 Button 套件。

保留既有 ESLint 9 deprecated 提示、npm 更新提示，以及 Node.js 原生讀取 `.ts` 的 MODULE_TYPELESS_PACKAGE_JSON 警告；它們不是 lint warning 或建置失敗。不為消除提示更改 package.json／lockfile／type／版本。

## 瀏覽器實際結果與工具修正

以下是同一程式碼版本的 **逐項聚合**，不是把原始 Exit 1 的完整程序改寫成 Exit 0。完整執行結束、原始失敗、定向重驗與真實 parent Exit 均保留；已完成且未受工具修正影響的 assertion 沿用其本輪真實紀錄，受影響項目必須有新的通過證據。各列的實際 CLI、時間、expected count、completion marker 與原始結果位置見 execution-record／acceptance-summary。

| 模式 | 完成後逐項狀態 | 實際覆蓋 |
| --- | --- | --- |
| General | 26 項＝23 PASS＋2 法律 BLOCKED＋1 Optional PENDING | 九公開路由內容／Metadata、公開 Privacy／dev 404、既有導覽與錨點，以及補測的普通儲存快照 |
| Controlled Preview | 26 項＝22 PASS＋1 Disabled N/A＋2 法律 BLOCKED＋1 Optional PENDING | 草案結構／Metadata、五寬、8 次 axe、9 目錄、鍵盤／Focus／觸控／Reduced Motion、5 個長 URL SSR fixture、3 張指定圖 |
| Pages | 37 項＝33 PASS＋1 Disabled N/A＋2 法律 BLOCKED＋1 Optional PENDING | 九公開路由 × 五寬＝45 case、48 次 axe、導覽／服務及首頁聯絡錨點、Base Path、產物／404／dev／草案保護 |

合計 50 個頁寬 case、56 次 axe，受測 WCAG 2／2.1 A／AA 違規為 0，包含手機展開選單。這不是完整輔助科技認證。Pages 主矩陣觀察 151 個資源皆 GET 成功、429 個原始 HEAD 事件逐一嚴格佐證；Metadata 定向重驗另有 145 個資源與 54 個 HEAD。原始資料、配對依據與錯誤未刪除，沒有針對 GET／資源／Console／Runtime 加豁免。

全部站內目的地與錨點以真 HTTP／實體 ID 檢查，並實際點擊服務、Contact、跨頁／刷新與九條目錄，保留首頁舊 `#contact`。General／Pages 各 146 筆是以「來源頁面＋href」去重後的 Link 記錄，全部為站內目標；不是宣稱原始 DOM 只有 146 個 `<a>`。頁尾與權利聯絡沒有未核准 Privacy 或假管道 Link。

Runtime 清冊由實際 Browser／CDP／Storage 記錄派生，只有各受測 loopback origin；未觀察自動外部請求或應用程式 POST。字體 URL 位於站內 `_next/static/media`；建置下載不當訪客 Google 連線。Pages 與草案新 Context 的 Cookie、localStorage、sessionStorage 前後快照及寫入探針均保留；Owner 的 Hosting 日誌與條款仍待確認。Synthetic 長網址 fixture 與真正 application requests 分欄，不把 mock 權利 Link 當正式管道。

普通資料行為補測於 06:08:58–06:09:11 UTC 完成，真 Exit 0、2 個 assertion（新增 D03 與重驗既有 F07，因此 general unique count 只加 1）。九個路由各用 fresh Context，保留導航前 storageState、document init 前 local／session 與互動後 Cookie／local／session／IndexedDB databases，均為空；310 個實際 CDP 請求全部是同站 GET、0 POST／0 external，28 個資源驗證成功。舊 run 的 after=0 狀態仍為 PENDING，缺漏只由新證據解決，不追認原紀錄為完成。

| 原始失敗／缺漏 | 原因與影響 | 修正與實際重驗 |
| --- | --- | --- |
| General 前置 Exit 1，未開 Browser | 舊工具指紋算法與本輪完整 files-map 定義不同 | 逐檔核對同一 frozen map 與 canonical JSON SHA；重啟首次正式 general，不改 app |
| General 首完整程序 Exit 1，5 項工具 FAIL | 根 canonical／OG 不同尾斜線序列化；About／Services H1 的 `<br>`；把 BrowserContext 當 APIRequestContext | 依現有 Source 核對精確 URL、只處理標題排版空白、正確 request.newContext；定向重驗 5 項及流量。首個定向仍有 Home OG slash FAIL，最後 Home Metadata＋network 2 項真 Exit 0 |
| Preview 前置 Exit 1，無頁面 assertion | NetworkMonitor 未接受新 preview mode | 以 general 等價觀察契約支援 preview，單頁 structure／metadata／network 3 項真 Exit 0 |
| Preview 完整程序 Exit 1，menu／network FAIL | outside-click 選到被選單覆蓋的 H1；合成 SSR HTML 漏 icon，5 個 fixture favicon GET 被關頁取消 | 實際 aria-controls panel 邊界及 hit-test 選外部點；fixture 使用實頁 declared icon。第一次 menu 定向仍誤取內層 nav padding，原 FAIL 保留；最終 menu＋network 2 項真 Exit 0，五 fixture＋network 的 6 個 PASS 有原始證據 |
| Pages 完整程序 Exit 1，9 個 Metadata 工具 FAIL | Pages trailingSlash 序列化與一般模式期望不同 | 核對 Next 設定、既有 validator 與實際 metadata，依模式核對品牌 origin／logical path／query／hash；只補 9 Metadata＋network，10 項真 Exit 0（06:03:21–06:03:33 UTC） |
| 最後稽核：general after 快照為 0 | 有空 Context 與零寫入探針，仍不能替代規格要求的瀏覽後快照 | 原缺漏明示，另外恢復同版本 normal build／3060，僅補普通資料行為測試，不重跑已 PASS 的 45／48 矩陣 |

上述修改只影響 Repository 外的驗收工具與證據；app freeze 未變。原 Exit 1、原 FAIL、錯誤訊息、後續工具版本與定向成功保留在壓縮證據；沒有追認原失敗為成功。法律項目仍為 BLOCKED。

## 本輪規格矩陣

適用性與 Status 分開。表內的 PASS 有實際子項紀錄；BLOCKED 不是 N/A。32 個規格項目中，正式資料與法律相關缺件不因技術驗收而轉為通過；核准前沒有完整 Task 009 PASS。

| Test ID | 適用性／預期 | 實際結果與範圍 | Status |
| --- | --- | --- | --- |
| P09-C01–C05 | Required，各指令 Exit 0 | 分項真實結果見上表 | PASS |
| P09-D01 | Required，完整資料流清冊／責任 | DF01–10、Source／Runtime 與未知值分開，Owner／期限／fallback 已列 | PASS |
| P09-D02 | Required，正式用途／保存／接收者揭露一致 | 草案無虛構承諾；正式 Hosting 用途、保存／刪除與跨境仍缺 Owner 資料 | BLOCKED |
| P09-D03 | Required，新 Context 實際觀察 | Pages／草案及普通九路由都有本輪前後快照；ordinary 缺漏已由獨立真 Exit 0 補測解決，舊紀錄不改 | PASS |
| P09-D04 | Required，權利與真實管道 | rightsContact null，沒有正式可驗管道或處理程序 | BLOCKED |
| P09-D05 | Required，同版本核准 gate | Owner 已確認尚無核准資料，法律審閱者未指定 | BLOCKED |
| P09-D06 | Required，Task 008 依賴 | 空 verified 清單／unavailable，無新增 PII 收件或同意控制 | PASS |
| P09-D07 | Not Applicable，新表單／CMP | 任務未授權且未建立這些功能 | N/A |
| P09-F01 | Required，草案公開保護 | production 404、隔離草案標示及 Pages 排除，Footer 純文字 | PASS |
| P09-F02 | Required，核准正式頁 | 沒有核准資料；草案 200 不代替正式頁驗收 | BLOCKED |
| P09-F03 | Required，目錄／全部連結含權利管道 | 草案九目錄、全部現行站內 Link／錨點技術通過；正式權利管道仍無法驗 | BLOCKED |
| P09-F04 | Required，九公開路由 fresh regression | 主要內容／既有服務與聯絡錨點，普通及 Pages 分模式驗收 | PASS |
| P09-F05 | Required，MobileNavigation 契約 | 展開／Escape 還原 Focus／外部點擊／Link／桌面斷點與觸控實測 | PASS |
| P09-F06 | Required，Metadata／語言 | 三模式均已核對；Pages trailingSlash 序列化依實際模式驗證，品牌 URL 不帶 Query／Fragment | PASS |
| P09-F07 | Required，Console／Runtime／Network | 最終技術子項的原始事件與資源 GET 驗證，原工具失敗另保留 | PASS |
| P09-F08 | Required，Pages／404／.nojekyll | 真 Base Path 靜態服務、產物與路由／正文防漏，原 dev 保護保留 | PASS |
| P09-F09 | Required，開發頁保護 | 普通預設 404，既有明確 flag 200；Pages 排除 | PASS |
| P09-F10 | Optional，部署後公開 Smoke | PR 前尚未發生；後續本次技術部署與公開 404 保護結果補同 PR，正式政策仍未核准 | PENDING |
| P09-R01–R05 | Required，五指定寬度 | 草案五寬與九既有頁面五寬分模式驗收，實際頁面／模式見逐項 JSON | PASS |
| P09-A01 | Required，axe WCAG 2／2.1 A／AA | 五寬與展開手機選單，範圍／違規數見原始 axe 結果；不宣稱完整認證 | PASS |
| P09-A02 | Required，Keyboard／Focus | Skip Link、正反 Tab、Enter、九目錄、Footer、可見焦點及無隱藏可 Focus 選單 | PASS |
| P09-A03 | Required，Reduced Motion／人工視覺 | reduce 實測，Root 實看五寬長文／Logo／頁尾及 320 px 合成長 URL | PASS |
| P09-A04 | Not Applicable，Disabled | 新政策沒有 disabled 控制，不為測試新增假操作 | N/A |
| P09-A05 | Optional，螢幕閱讀器補測 | 本輪未做完整真實輔助科技驗收，axe 不代替此項 | PENDING |

F03 的技術子項通過與整項 BLOCKED 不衝突：沒有真實權利管道，就不能聲稱「全部正式政策連結可用」。D02、D04、D05、F02、F03 共五個必要法律／正式內容項目仍 BLOCKED。此表為 PR 前快照；尚未發生的遠端階段不填 PASS。

## 截圖與人工視覺

三張圖來自本輪隔離本機 `/privacy`、同一 freeze 版本。它們是 **draft-1，尚未核准生效**，不是正式公開政策或收件證據。

| 檔案 | 實際尺寸 | SHA-256 |
| --- | --- | --- |
| [桌面長文](../screenshots/task009-privacy-desktop.png) | 1440 × 4790 | `488d658e309b5c3bcb1ea4c9a5b2633c11eb3de29eb49cee972169d205c6f47d` |
| [手機長文](../screenshots/task009-privacy-mobile.png) | 375 × 6459 | `f4dec296e5c967b38b8c443aa8940dd111fd6d6e96ad49e43b2cb85e090ec832` |
| [聯絡／版本／頁尾](../screenshots/task009-privacy-contact-footer.png) | 1440 × 1284 | `87b907153f35e09aaf74497e646cd7687814777367f15943161899f7a841cfa7` |

Root 以 view_image 實看上面三張及 320／768／1920 px 補圖共六張，五種寬度皆有實際目視；草案標示、未知主體／日期、目錄、九段、版本與 Footer 清楚，未見水平裁切、重疊或 Logo 比例變更。另實看 320 px 實際 PrivacyPolicy SSR 合成長 URL 圖，長字串與合成權利 Link 自然換行。fixture 明確標示非公開政策／非正式權利管道／非收件證據，沒有寫入 config 或發布。

截圖在工具修正前已完成同版本的渲染與視覺範圍；後續只修驗收工具，不改 app，沒有假稱重拍。正式三圖 bytes 與已人工檢視來源逐張相同；補圖與合成 fixture 只留必要雜湊及證據，不加入 Portfolio media。

## Known Issues 與完成界線

- 正式政策必要項目缺件：Owner 須提供主體／資料流／真實權利管道，指定法律審閱者，取得同版本正文與生效資訊。嚴重程度為正式政策發布 blocker；目前無法由開發者修補。解除前保持 draft／公開 404／Pages 排除，不能宣稱政策生效或完整 Task 009 完成。
- Hosting 租戶日誌、處理地區、接收者、適用條款與保存／刪除待 Owner／服務管理者確認。程式與 Runtime 觀察不能證明供應商沒有處理 IP 或紀錄。
- 輔助科技完整補測沒有執行；自動 axe 與本輪鍵盤／視覺範圍不等於完整無障礙認證。
- 測試工具原始失敗、原因與重驗分開保存；沒有以跳過必要測試、調低標準或忽略 GET／Console／Runtime 錯誤取得通過。

## Git、Review 與部署階段

本報告於建立 PR 前完成本機驗收。Feature Commit／PR URL 在實際提交後由同 PR 說明對照；不為記錄自身 SHA 另做文件 Commit。

| 階段 | 本機交付快照 |
| --- | --- |
| Source／內容與發布保護覆核 | 已由獨立 agent 聚焦確認 draft 路徑 Blocking 0；不是法律審閱或 GitHub approval |
| 本機開發與技術驗收 | 逐項紀錄與必要證據納入本 PR；法律必要項目仍 BLOCKED |
| Feature Branch Commit／Push／PR | PENDING，尚未在此快照發生；後續真實 SHA／URL 補同 PR |
| PR exact-head CI／artifact | PENDING，需核對實際 head／run／jobs／artifact，不沿用舊任務 |
| GitHub PR Review | PENDING，記實際評論與審查狀態，不能把 CI 或內部 agent review 當 GitHub approved |
| 授權合併 | 本次使用者已明確授權技術 CI 通過後合併；實際 Merge SHA／時間尚待事件發生 |
| 合併後 main CI／Pages 部署 | PENDING，必須核對 Merge SHA 對應 run，不把 PR Deploy SKIPPED 當部署成功 |
| 公開 URL／資源／Base Path／草案 404 Smoke | PENDING，部署後實測並補同 PR；技術網站發布不等於政策發布 |
| 同版本 Owner／法律核准與正式政策生效 | BLOCKED，沒有核准資料，與前述工程階段分開 |

後續 Task 008 資料收件、Hosting 或網域變更時，需重盤點、重審與重驗相關範圍。未核准前不新增 PII 收件，不因這份草案合併而解鎖新功能。

## 新增與修改檔案

| 動作 | 檔案 | 用途 |
| --- | --- | --- |
| 新增 | `src/config/privacy.ts` | 型別、draft-1、nullable 資料、九段草案與 Metadata |
| 新增 | `src/lib/privacy-publication.ts` | server-only 結構／預覽／發布保護 |
| 新增 | `src/app/privacy/page.tsx` | Route、雙 guard、Metadata |
| 新增 | `src/components/sections/privacy/privacy-policy.tsx` | 共用長文／目錄 Server Component |
| 修改 | `src/components/layout/site-footer.tsx` | 草案待確認文字，正式版才允許 Link |
| 修改 | `scripts/build-github-pages.mjs` | 草案排除／防漏、核准版結構驗證 |
| 修改 | `AGENTS.md` | Task 009 護欄與驗收範圍 |
| 修改 | `README.md` | 草案狀態及安全本機預覽方式 |
| 修改 | `docs/task/README.md` | 追加當前執行紀錄入口，不改歷史快照 |
| 修改 | `docs/98_decisions/implementation-notes.md` | 追加本次來源、實作與核准界線 |
| 新增 | `docs/reports/task009-implementation.md` | 本報告 |
| 新增 | `docs/reports/task009-verification.json` | 版本 map、命令／退出碼、來源、聚合及證據索引 |
| 新增 | `docs/reports/task009-evidence.json.gz` | 唯一原始文字證據包，不含暫存工具或 build output |
| 新增 | `docs/screenshots/task009-privacy-desktop.png` | 本次桌面草案截圖 |
| 新增 | `docs/screenshots/task009-privacy-mobile.png` | 本次手機草案截圖 |
| 新增 | `docs/screenshots/task009-privacy-contact-footer.png` | 本次底部草案截圖 |

`src/config/navigation.ts` 不需修改：Privacy 原為 planned，本次保持未公開。98 個既有 runtime／素材／依賴／設定檔 bytes 未變，原 AGENTS Next.js generated block 與歷史 implementation notes 前綴保留；沒有提交 `.next/`、`out/`、node_modules、環境變數、暫存工具、機密或真實聯絡訊息。

## 證據與重驗界線

[驗證摘要](task009-verification.json) 記錄完整版本／命令／退出碼索引；[原始證據包](task009-evidence.json.gz) 包含 202 個文字證據成員，SHA-256 為 `afbde85d3f93c703ea56cdc7e7871009aea6f6602df9ccf40077f514af53f05b`，壓縮後 2,373,860 bytes，202／202 還原雜湊核對成功。

證據包 schema 為 `xk-text-evidence-v1`：`files` 以原相對路徑索引 bytes／SHA／contentRef；`blobs[contentRef]` 是原始 UTF-8 文字，同內容只存一次。還原時將每個 blob 編碼為 UTF-8，再按成員 SHA 核對。包括五品質指令及補測回執／Log、source-audit、frozen-code、execution-record、acceptance-summary、runtime-inventory、ordinary-storage-coverage-gap、各輪原始 results／axe／network-classification／唯一 network NDJSON、review 與截圖 manifest。暫存工具只保留執行路徑及 source SHA，不把工具或產物提交。

每個 assertion 有唯一 Test ID、預期／實際、模式／URL／Viewport／版本、開始完成時間與狀態。個別 assertion 沒有獨立 OS process，Exit Code 為不適用（null），同列另連實際 parent processReceipt／actualProcessExitCode；不把 null 捏造成 0。CLI、程序退出、工具修正與版本邊界可交叉查證。Optional 螢幕閱讀器維持 PENDING，Disabled／新表單有據 N/A；正式資料與法律必要 gate 為 BLOCKED。

格式、連結及報告補充只改文件／證據，經 Runtime map 核對未變，不因此重跑已完成的五寬矩陣。最後完整 Diff／文件檢查與之後的 PR exact head、CI、merge、main CI、部署及公開 Smoke 的真實結果記錄於同 PR，不能由本地成功推定遠端已完成。

文件驗證：README／任務索引／本報告 Markdown lint Exit 0；AGENTS 新規則及 implementation notes 新段落以片段檢查，保留歷史與 Next generated block。首次片段抽取自行多加一個空行而有 MD012／Exit 1（tool chunk `141e6a`），修正暫存抽取格式後兩片段零問題／Exit 0，未改原文件來配合工具。60 個相對 Link、16 個 staged 檔案、完整 Diff／EOF／機密與產物檢查通過，受測 Runtime map 未變。
