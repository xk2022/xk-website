# Task 014 — Domain Configuration（網域、DNS、SSL 與正式網址設定）

本文件是未來正式執行 Task 014 的獨立規格。本輪只撰寫規格，**不查探管理員 session、不註冊／購買／轉移網域、不修改 DNS、Nameserver、Vercel Domain、Pages Custom Domain 或 HTTPS 設定**。已知品牌網域不代表已驗證所有權或實際供應商；全部待驗收初始為 **PENDING**。

## 1. Task Overview

| 項目 | 規格 |
| --- | --- |
| Project / Brand | Xplore Kaleidoscope / XK |
| Task | 014 — Domain Configuration |
| 類型 | Domain Infrastructure，與 Task 013 Vercel Deployment 獨立 |
| 品牌網域 | `xplorekaleidoscope.com` |
| 既有品牌 Canonical | `https://xplorekaleidoscope.com`；不等於 DNS 已指向網站 |
| 目標 | 在真實所有權、現況與當次授權確認後，建立正確 DNS、HTTPS、www／apex 政策及可維運正式網址 |
| 正式實作分支 | `feature/website-domain-configuration` |
| 獨立報告 | 未來 `docs/reports/task014-implementation.md`，本輪不建立假報告或假連結 |
| 階段界線 | 先交付唯讀 audit、精確 DNS changeset 與 rollback；獲授權後才做指定外部寫入及真正 DNS／TLS／HTTP 驗收 |

完整完成 Task 014 必須有真實網域驗收證據。只完成設定提案、程式 Build、PR CI 或 Vercel Ready，不能宣稱 DNS／SSL／正式網址完成。

## 2. Repository & Prerequisites

| 前置條件 | 要求 |
| --- | --- |
| Website Repository | `xk2022/xk-website`，唯一可修改的 Repo；開始前核對 remote、branch、status、最新 main／Base SHA 與未提交工作 |
| 本次研究基準 | Website `main@e2a8f5a33f24d1ea65a3afc3780014a33c204528`；本輪分支 `docs/task-specifications-006-014`，不是未來實作 Base |
| 文件 Repository | `xk2022/xplore-kaleidoscope`，僅讀；固定研究 `main@95ef1275a46ace76e11f668178ca881087483398` |
| Task 013 | DNS cutover 前有真正被授權的 Vercel Project／Production URL／ID／SHA 與健康驗收、Domain 管理權限。唯讀 DNS 盤點／計畫可先平行，不等於可切換 |
| 所有權與服務商 | 域名持有人／可決策人、Registrar、權威 DNS provider／NS、區域控制權、Vercel Team／Project 及操作者均須確認，不從名稱或公開查詢猜帳戶 |
| 發布政策 | 使用者／品牌負責人確認 apex 為主、www 行為、網站版本、變更時間、回復門檻與影響；索引開放另由 Task 010 決策 |
| 既有服務保護 | 取得現有 zone／provider export、網站／郵件／驗證／DNSSEC／CAA 等 inventory，確認改動不影響其他服務 |

公開 DNS、RDAP／WHOIS 或憑證可支持技術盤點，但不能單獨證明註冊帳戶、付費、續約權或可寫權限。未提供授權管理存取時，完成公開唯讀與 owner 提供的匯出審查；不能探測未知登入 session。外部前置資料不足維持 Pending Confirmation，實際受阻則記 BLOCKED 及解除條件。

## 3. Reference Documents

### 3.1 Website 來源

完整閱讀 [AGENTS](../../AGENTS.md)、[README](../../README.md)、[任務索引](README.md)、[Task 001](task001.md)、[Task 002](task002.md)、[Task 003](task003.md)、[Task 004](task004.md)、[Task 005](task005.md)、[Task 006](task006.md)、[Task 010](task010.md)、[Task 013](task013.md)、[歷史紀錄](../implementation-notes.md)、[Design System](../brand-design-system.md)、[首頁](../homepage-implementation.md)、[About](../about-implementation.md)、[Services](../services-implementation.md) 與 [Pages 指南](../github-pages-deployment.md)。新規格連結不表示功能已執行；Task 013 報告必須於未來實際存在後再引用。

下表 Website 來源 Branch 為 `main`，Commit 固定為上述研究基準，保留實際採用與歷史證據界線：

| 路徑 | Git Blob SHA | 採用內容／核准界線 |
| --- | --- | --- |
| `src/config/site.ts` | `6653507e18de1d78f8e4c1aca058d666d654f704` | 品牌 apex HTTPS 常數，尚非 Domain binding 或 DNS 證明 |
| `src/app/layout.tsx` | `c97305e70015983ca3e41801b6bcb24ad222ec65` | metadataBase、語言、construction noindex／nofollow；不因 DNS 完成自行開索引 |
| `next.config.ts` | `07606ad3f492dfb5b747e96ddb22144e54a45612` | 一般 Vercel 根路徑與條件 Pages export／Base Path 分離 |
| `scripts/build-github-pages.mjs` | `f1aa1df74b6abf867e12739a6c3bce49566ebf31` | 品牌 URL／Base Path／noindex／404／dev 排除驗證，修改需保留既有斷言 |
| `.github/workflows/ci.yml` | `8cb71f8208e3ca55085230bd996fbf95aac8296c` | Pages main-only 自動發布，任務不擅改或停用 |
| `docs/github-pages-deployment.md` | `8faae7d96f9ec0b560197b5ed51a2d2bc015f43f` | 保留雙模式與歷史來源限制；legacy／403 是當時快照，非目前設定結論 |

### 3.2 文件來源、核准與缺漏

以下均來自文件 Repository 的固定 Commit `95ef1275a46ace76e11f668178ca881087483398`，Branch `main`，只讀。執行時讀取最新差異、重新記錄 Commit／Blob，不把新增建議自動視為核准。

| 路徑 | Git Blob SHA | 狀態／採用內容 |
| --- | --- | --- |
| `doc/00_initGPT/04_目前使用的個人品牌名稱或網站網址.md` | `06dc46435640018cd9d8f196504ba511a8b8403b` | ASK 提供網域字串；ANS 承認無法確認註冊狀態。採品牌域名，不採已持有／已建信箱的推論 |
| `doc/00_initGPT/05_Xplore Kaleidoscope 正式建置技術決策如下.md` | `59f6c1151015bdec746229e78596e2311cdc2f6f` | ASK 支持 Vercel 技術方向；其餘是建置範本，沒有實際 DNS／Vercel owner 或部署核准 |
| `doc/01_business-plan/week-02/01_brand-identity_品牌視覺識別規範.md` | `19378775e986d5c8e002035685668d381532cae4` | 初版規劃；品牌網域與已合併常數一致，不證明註冊／控制權 |
| `doc/01_business-plan/week-02/07_domain-hosting_網域、DNS、主機與部署架構規劃.md` | `9c1c5c8177c423bacaa97b5199a22430ddf6bc2c` | 初版規劃；§4 建議 apex 與 www 永久轉址，§5 明記示例值須由服務商確認，§10 HTTPS／續期，§18 是待辦 |
| `doc/01_business-plan/week-02/08_website-architecture_官方網站 Next.js 技術架構設計.md` | `15c1483bf47be33bc29b755a220fb465b5dd8a1a` | 初版規劃；採 Metadata／Preview 索引保護，不採舊 root、Backend 或任意 open robots |
| `doc/01_business-plan/week-02/09_website-mvp_官方網站 MVP 開發規格.md` | `5bc98a653e0b92ceb3e4439ae1b15e26e6b8a71d` | 初版規劃；採實際正式網址／HTTPS 驗收，不把規劃信箱或完整商業目標當完成 |

**已知缺漏：** 沒有確認的 Registrar、NS、DNS provider 帳戶、zone export、註冊／續約資訊、可寫操作者、實際 Vercel Domain target、現行 MX／SPF／DKIM／DMARC、CAA／DNSSEC 設定或本次變更授權。Cloudflare 僅為「可使用」；`xplore-kaleidoscope-website`、Vercel IP、CNAME 等不能由舊規劃猜出。

正式執行查當時 [Vercel Domains](https://vercel.com/docs/domains) 與實際 Registrar／DNS provider 官方指引、Vercel Project 當時顯示的 verification／record recommendations，記錄日期／Project／domain／採用值來源。若有衝突，以當次明確指示、已確認服務現況及必要保護為準，不以一般教學硬套 IP／NS／CAA。

## 4. Scope & Requirements

### 4.1 Phase A — 唯讀 audit 與具體提案

盤點註冊／續約責任、權威 DNS、現行 website／mail records、Vercel Production 與 Domain 狀態、Canonical、Pages、HTTPS 與 redirect。產出第 6 節逐筆 changeset、影響及 rollback，交由有權決策人審閱；此階段不改任何外部設定。

### 4.2 Phase B — 已授權的設定

只有當次授權明確涵蓋指定 zone／record／Vercel Project／domain／redirect／變更窗口與 rollback 範圍時，執行審閱後的最小差異。既有明確授權已涵蓋者可沿用，不重複確認。重新讀現值確認沒有他人新變更後才寫入，不以空白範本覆寫整區。

### 4.3 Phase C — 真實驗證與維運交接

驗證權威 DNS 與不同 recursive resolver 的收斂、apex／www HTTP→HTTPS、www→canonical apex 永久轉址、憑證／chain／hostname／期限、主要頁面與資源、Canonical／OG、郵件相關記錄保護及續約責任。觀察窗口、重查時間與限制如實記錄，不能保證固定「立即」或「48 小時必完成」。

本任務不預設更換 Nameserver、不購買域名、不轉移 Registrar、不停用 Pages、不建立 api／app／admin／dev／wildcard records、不申請 Mail／Backend 服務。若出現這些必要性，先提出獨立具體差異及取得相應授權。

## 5. Information Architecture & UX

不新增訪客頁面。使用者網址體驗應為：輸入核准的 HTTP／HTTPS apex 或 www → 安全且有限次數的永久重新導向 → 唯一 canonical HTTPS 網址的正確內容；保留路徑與 Query，Fragment 為瀏覽器端行為另測錨點，不宣稱伺服器能讀取 Fragment。

既有主要網域常數為 apex，Week02 亦建議不含 www；**目標提案為 `https://xplorekaleidoscope.com`，在變更前由品牌／網域 Owner 確認**。`www` 作別名而非不同內容站。永久轉址接受經確認的 301 或 308（Vercel 常用行為以當時設定為準），記錄實際 status／Location，不為迎合舊文件 301 用多層互相衝突規則。

正式根路徑不帶 `/xk-website`；Pages 仍依原網址及 Base Path 存在。是否將舊 Pages／Vercel 系統網址全站轉址到品牌域名是獨立決策，本任務不擅自加入。保護手機、跨頁、深層直接載入與原錨點，不修改聯絡待確認等商業內容來假裝可營運。

## 6. Content & Data Specification

### 6.1 Inventory 與 Pending Confirmation

| 資訊 | 誰／何時確認 | 未確認時處理 |
| --- | --- | --- |
| 註冊持有人／決策人、Registrar、到期日／auto-renew／通知責任 | 網域 Owner，任何購買／轉移／設定前 | Pending Confirmation；只做公開技術盤點，不猜註冊狀態或代購 |
| 權威 NS／DNS provider／zone／可寫操作者 | DNS Owner，以 NS 與受授權 provider 設定核對，變更前 | Pending Confirmation；無法完整盤點時不寫 DNS，記實際限制 |
| Vercel Team／Project／Production ID／網址／Domain 權限 | Task 013 Owner，加入 domain 或 DNS cutover 前 | Pending Confirmation；不指向猜測 Project 或尚未健康驗收的版本 |
| Apex／www canonical、保留服務、窗口與風險 | 品牌／DNS／發布負責人，changeset 審核時 | 保留現況；不自行採不同主要 host 或開索引 |
| DNS record target／verification／CAA 要求 | 實際 Vercel Project 與 provider 當時推薦，寫入前 | 值保持 Pending Confirmation；禁猜 A／AAAA IP、CNAME、NS、TXT token |
| 生產寫入與 rollback 授權 | 有權 Owner，Phase B 前，記精確範圍與有效窗口 | 交付 Phase A 報告，不執行相依寫入，不宣稱完整 Task 完成 |

zone inventory 需記錄 record ID（可取得時）、type、name／FQDN、value／多值、TTL、provider proxy／flattening 選項與用途。公開 DNS 查詢不能列出全部 selector／子網域；完整性由授權 zone export 與 Owner 確認。含驗證 token／個資的完整匯出保存在受保護位置，Repo 報告只存必要去識別摘要與證據索引。

### 6.2 可審閱 DNS changeset

以下是**欄位契約，不是待直接執行的記錄值**。每個候選變更一列；無需變更的現值亦註明保留，不讓空表被誤認已備妥。

| Change ID | Zone／Name／Type | 現值與原 TTL／proxy | 建議操作與新值／TTL | 值來源／時間／Project | 影響與相依性 | 精確回復動作 | Owner／授權證據 | 執行／驗證狀態 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D14-C01 | Apex 的實際 A／AAAA／ALIAS 等，待盤點 | Pending Confirmation | Pending Confirmation，不填通用 IP | 從 Vercel／provider 當時確認 | 既有網站／IPv4／IPv6／flattening 待查 | 還原同 record 的原值／TTL／選項 | Pending Confirmation | PENDING |
| D14-C02 | `www` 的實際 CNAME／其他類型，待盤點 | Pending Confirmation | Pending Confirmation，不猜 target | 對應實際 Project 的推薦值 | 衝突 record 與 redirect 待查 | 還原原 record 或刪除本次新增項 | Pending Confirmation | PENDING |
| D14-C03 | 確有需要的網域驗證 record | Pending Confirmation | 只採當次 challenge 提供的值，不寫入範例 token | 實際平台 verification 狀態 | 既有 TXT／驗證用途須保留 | 僅回復本次改動，不刪其他 TXT | Pending Confirmation | PENDING |

根網域是否使用 A、AAAA、ALIAS／ANAME、CNAME flattening，以實際 Vercel／provider 相容規則決定，不硬性要求某種型別。IPv6 未被驗證支援時不新增 AAAA；若既有 AAAA 會送到舊站，必須在 changeset 明列其處置與授權，不能只改 A 後忽略另一條流量。

### 6.3 保護既有服務與 TTL

- 保存 MX 與其優先序、SPF／DKIM／DMARC TXT、其他所有權／Search Console 驗證、子網域與 CAA；不因新增網站 A／CNAME 刪除同名其他必要記錄。DNS 存在不證明 mailbox 可用，不因此公開新 Email。
- 先檢查 apex／www 的型別衝突、provider flattening／proxy／CDN 規則與現行 HTTP 規則；不把 Cloudflare 視為既定供應商，不盲開 proxy 或關閉安全設定。
- 保護 DNSSEC、DS 與 Nameserver 的一致性，不關閉 DNSSEC 或移轉 NS 以求憑證成功。若需遷移，另作涵蓋完整 zone、registrar DS 與切換回復的明確計畫及授權。
- CAA 若限制簽發，依當時 Vercel CA 要求及 Owner 核准作最小差異；不得隨意移除或建立通用 allow 規則。ACME／TLS 驗證失敗須保留真實原因。
- 原 TTL、負快取與 provider 最低值先記錄。可提議在窗口前降低相關 TTL，但這也是須授權的 DNS 變更；等待原 TTL 的影響，不承諾降低後立即全球生效。穩定後依核准值恢復，不能把規劃的 300／3600 秒當目前設定。

### 6.4 Rollback 與續約資料

rollback 表列：觸發條件、Owner／操作者、原 record／TTL／proxy／redirect／Vercel Domain 對應、精確還原順序、舊站健康證據、回復後 DNS／TLS／HTTP／郵件 record 重驗。DNS 回復也需快取收斂；恢復 Vercel Deployment 不等於恢復 DNS。首次無可用舊目標須明記限制、停止 cutover 或採核准修復方案，不捏造零停機保證。

維運交接列 Registrar／DNS／Vercel 責任人角色、到期日／續約機制與付款／通知責任、帳戶保護／復原責任、TLS 自動續期與到期檢查方式。私人個資、密碼、付款資料、私鑰、recovery codes 不進 Repo；Owner 尚未指定時明列 Pending Confirmation 及期限，不虛構自動續約已開啟。

## 7. Design System & Technical Constraints

沿用既有 Next.js、React、Strict TS、Tailwind CSS、shadcn/ui、Lucide、字體、Tokens 與原稿 Provisional Logo。DNS／Vercel Domain 設定不需要改品牌 UI、加 npm 依賴、Backend、Database、Docker 或 Mail Server。

Node／npm／Next 及 lockfile 依正式執行版本核對。一般 `npm run build` 保持 Vercel 預設根路徑，Pages 僅由 `build:pages` 旗標產生 `out/`。不能因品牌網域無 Base Path 就將 Pages 的既有 `/xk-website` 設定永久清空。

DNS／SSL 不以關閉 TLS 驗證、忽略憑證錯誤（例如 `curl -k`）、只測 IPv4、刪 CAA／DNSSEC、將 404 rewrite 成首頁或曝光驗證 Secrets 作為通過方式。檢查失敗先釐清 resolver／record／certificate／平台限制，保留問題與重驗證據。

## 8. Navigation, SEO & Deployment

| 範圍 | 必須符合的行為 |
| --- | --- |
| Canonical Domain | 目標 apex HTTPS 依第 5 節確認；與 `siteConfig.url`／metadataBase／各真實頁 Canonical／OG URL 一致 |
| WWW／HTTP | 核准的永久轉址 301／308 至唯一 HTTPS host，保留 path／query，無 loop／非預期跨域／多次無必要跳轉 |
| HTTPS／TLS | apex 與 www 都有涵蓋 hostname 的有效 certificate／chain、未過期、受支援 TLS；redirect 前 www 的 TLS 亦須有效 |
| Routing／Assets | 實際公開頁／深層直接載入／首頁錨點正常；CSS／JS／字體／Logo／icon 無 mixed content 或錯誤專案前綴 |
| 例外路由 | 真正未知路由及 `/dev/design-system` 按正式模式回 404，不公開預覽驗收頁 |
| Indexing | 現有 noindex／nofollow 保留，直到 Task 010／使用者另確認；Domain／TLS 完成不等於公開索引授權 |
| Sitemap／robots／Schema | 只檢查實際存在項目與真實 canonical URL；本任務不新增不存在頁或虛構 Schema，不提前做完整 SEO |
| GitHub Pages | 原 workflow／Source／Environment／公開 URL 與 Base Path 保留；是否另綁 domain／停站／轉址須獨立明確授權 |

Task 013 提供健康 Vercel Production，Task 014 才處理品牌網域 binding／DNS cutover／HTTPS。加入 Vercel Domain、要求 ownership verification、改 redirect 即使未改 Git 仍是外部操作，必須在 changeset／授權與報告列明。不要把 `.next/`、Pages artifact 或 CI 綠燈當成正式網域驗證。

## 9. File Structure & Change Scope

| 類型 | 未來允許位置 | 邊界 |
| --- | --- | --- |
| 必須新增 | `docs/reports/task014-implementation.md` | 獨立 audit／changeset／授權／回復／DNS／TLS／HTTP／維運報告 |
| 必要補充 | `README.md`、`docs/implementation-notes.md` | 實際正式網址及操作紀錄，追加歷史而非覆蓋 |
| 證據 | 報告引用的實際安全日誌／截圖位置 | 完整 zone export 與 private verification 資訊在受控位置，不提交 Secrets |
| 條件式程式變更 | `src/config/site.ts`、既有 Metadata／URL 驗證 | 只有已核准 canonical 政策確需修正時最小調整，與 Task 010 協調，保留各平台回歸 |
| 外部設定 | 指定 zone record、Vercel Project Domain／redirect | 僅逐筆已核准差異，記錄操作前後及授權；不以整區重建替代 |

不預設新增 `CNAME` 檔、`vercel.json`、DNS Terraform、workflow、套件或 Secret 儲存程式；GitHub Pages 的 CNAME 會改發布行為，不能當一般靜態檔順手加入。不修改文件 Repository、原始品牌素材、無關路由或部署條件，不提交 build 產物、私鑰、env／`.vercel` 或暫存工具。

## 10. Implementation Procedure

1. 確認正式執行的使用者範圍與 Repository／最新 main／Base／工作目錄；讀來源及 Task 013 實際報告，不假設它已完成。
2. Phase A：使用公開唯讀查詢與已授權提供的 provider inventory，記錄 NS、SOA、A／AAAA／CNAME、MX／相關 TXT、CAA／DNSSEC、註冊／續約責任與當時 HTTP／TLS。
3. 對照健康 Vercel Production 與當時 Project 的 Domain requirements，確認 apex／www 目標與服務衝突；不根據舊教學 IP 或只看公開 NS 推定 admin provider。
4. 產出逐筆 changeset、current／desired、TTL、值來源、影響、回復與驗收窗口；列第 6 節 Pending Confirmation，完成安全可審閱報告。先不寫 DNS／Vercel Domain。
5. 若需要 Repo 調整，僅於功能分支修改已確認 URL／文件；完成第 11 節適用本機回歸及報告再建 PR，外部驗收仍 PENDING。
6. Phase B 前確認精確 Owner／project／zone／record 授權與生效窗口，保存當下 export 並再次讀現值。現值與審閱提案不同先調整提案，不能覆蓋其他人的變更。
7. 在授權範圍內依平台程序加入／驗證指定 domain、執行最小 DNS／redirect 差異。ownership TXT／TTL／CAA 等額外需要亦須納入授權範圍，不順手動郵件、NS／DS 或未授權子網域。
8. Phase C：查權威與至少兩個不同 recursive resolver，依真實 TTL／負快取記錄多次時間與結果；確認 Vercel Domain 與 certificate ready，檢查 apex／www 的 TLS 及 HTTP 轉址鏈。
9. 對品牌正式網址完成所有真實頁面、連結、深層重載、assets、手機／Desktop、Metadata／noindex、Console／Runtime／Network／mixed content 檢查；另核對原有郵件等 record 未變，未建 mailbox 不宣稱送收信成功。
10. 若觸發回復條件，由已授權操作者執行計畫，記錄實際回復、快取限制與重驗；沒有授權只回報具體問題，不隱藏失敗或臨時換其他 target。
11. 完成獨立報告、真實證據、續約／TLS 維運交接與 Known Issues。完整任務未完成時標示實際階段；PR／CI／Merge／外部設定／公開網址分別交付，不把文件或合併視為網域成功。

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

### 11.1 Phase A — 唯讀與變更準備

下表命令供未來正式執行；本輪不執行。`$xk_authoritative_ns` 等變數必須先由實際查詢／核准 inventory 設定，不使用猜測 NS／IP。紀錄完整 query、resolver、時間、輸出與退出碼；DNS 命令 exit 0 不等於答案符合預期，須檢查 RCODE／Answer／TTL／DNSSEC。

| Test ID | 適用性與原因 | 命令／程序與預期證據 | 狀態 |
| --- | --- | --- | --- |
| D14-A01 | Required：正確前置與所有權 | 核對最新 main、實際 Task 013 Project／Production SHA／URL／健康結果、Owner／權限與當次範圍；未確認不改外部服務 | PENDING |
| D14-A02 | Required：實際權威 DNS | `dig NS xplorekaleidoscope.com`、`dig SOA xplorekaleidoscope.com`，與 owner 指定 provider／zone 核對；有需要 `dig +trace`，保存真實 delegation，不只查 cached A | PENDING |
| D14-A03 | Required：網站 record inventory | 分別 `dig xplorekaleidoscope.com A`／`AAAA`、`dig www.xplorekaleidoscope.com CNAME`／`A`／`AAAA`，再向已確認權威 NS 查詢；記多值、TTL、alias／flattening 實況 | PENDING |
| D14-A04 | Required：保護其他服務 | `dig xplorekaleidoscope.com MX`／`TXT`／`CAA`、`dig _dmarc.xplorekaleidoscope.com TXT`；DKIM selector 由 provider export 取得再查。比對完整授權 zone export，不能以猜 selector／ANY 回應聲稱 inventory 完整 | PENDING |
| D14-A05 | Required：DNSSEC 與憑證相依性 | `dig xplorekaleidoscope.com DS`／`DNSKEY`、`dig +dnssec xplorekaleidoscope.com A` 及 provider／registrar 設定核對；必要時用可用的 validating 工具檢查，不僅憑 dig exit code 宣稱 chain 正確；確認 CAA 不阻擋指定 CA | PENDING |
| D14-A06 | Required：變更可審閱／可回復 | 逐筆 current／desired／TTL／proxy、provider／Vercel target 來源、服務影響、精確 rollback、owner／窗口／授權；沒有猜 IP／NS／token，沒有整區覆寫 | PENDING |
| D14-A07 | Required：續約／維運可交接 | 授權 Owner 確認 registrar／域名到期／auto-renew／通知／付款與帳戶復原責任、TLS 續期與失敗處理；未知列 Pending Confirmation，敏感值不入 Repo | PENDING |

### 11.2 本機與 Git／既有平台回歸

| Test ID | 適用性與原因 | 命令／程序與預期證據 | 狀態 |
| --- | --- | --- | --- |
| D14-L01 | Required：Task 執行的網站回歸約束 | `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build` 各自記真實 exit／輸出；保留既有版本，不用這些命令取代 DNS／HTTPS 驗證 | PENDING |
| D14-L02 | Required：根路徑正常 | 一般 build 後新啟 `npm run start`，實際公開頁 200、未知／dev 404、canonical／OG／assets 無 `/xk-website`；檢查所有有效 URL／錨點 | PENDING |
| D14-L03 | Required：Pages 不能被 cutover 設定破壞 | 一般 server 停止後 `npm run build:pages`，沿指南掛載實際 Base Path，原頁／assets／404／`.nojekyll`／dev 排除通過；切回一般 server 先重新 build | PENDING |
| D14-L04 | Required：Repo 修改必經實際 CI | 本次 PR 精確 head 的 quality／pages-build 與 deploy skipped、Review／main stages 分開；文件 CI 不冒充外部 Domain binding | PENDING |
| D14-L05 | Not Applicable：本任務不重做 UI | 不新增全站功能／完整五種指定寬度 axe 專案；若實際改共用 UI／Metadata，對受影響頁重做五種指定寬度、keyboard／Focus／axe／reduced motion；基本遠端手機／Desktop smoke 仍 Required | PENDING |

### 11.3 Phase B／C — 已授權寫入後的 DNS、TLS 與 HTTP

| Test ID | 適用性與原因 | 命令／程序與預期證據 | 狀態 |
| --- | --- | --- | --- |
| D14-W01 | Required：寫入門檻不可省略 | 真實授權記錄覆蓋當次 zone／records／project domain／redirect／窗口／rollback；執行前現值仍與提案一致；未授權維持 PENDING，實際阻礙記 BLOCKED | PENDING |
| D14-W02 | Required：精確操作證據 | 每項變更保存安全的前後值／TTL／provider log／時間／操作者，Vercel ownership／domain status 真實完成，未動 MX／TXT／NS／DNSSEC／CAA 等未授權項 | PENDING |
| D14-D01 | Required：權威答案符合批准 target | `dig @"$xk_authoritative_ns" xplorekaleidoscope.com A`／`AAAA`，以及 www 實際類型，答案與 Project／changeset 完全一致；所有權威 NS 核對，無舊 AAAA／多值導致分流 | PENDING |
| D14-D02 | Required：Propagation 不能只看單一 cache | 對至少兩個真實選定的 recursive resolver，各執行 `dig @"$xk_recursive_resolver" xplorekaleidoscope.com A`／`AAAA` 及 www 實際類型；記 resolver address、time、TTL、RCODE／answer；依實際原 TTL／負快取追蹤，不假造「全球完成」或固定時限 | PENDING |
| D14-T01 | Required：apex 與 www TLS 均有效 | `curl -I https://xplorekaleidoscope.com`／`https://www.xplorekaleidoscope.com` 不加 `-k`；用 `openssl s_client -showcerts -connect xplorekaleidoscope.com:443 -servername xplorekaleidoscope.com -verify_return_error -verify_hostname xplorekaleidoscope.com < /dev/null` 與 www 對應命令保存 chain／hostname／TLS／verify 結果；取得公開 leaf certificate 後以 `openssl x509 -in "$xk_leaf_certificate" -noout -subject -issuer -dates -ext subjectAltName` 核對 SAN／issuer／有效期，不只看連線 exit | PENDING |
| D14-T02 | Required：HTTPS／WWW 轉址體驗 | 對 HTTP apex、HTTP www、HTTPS www 與核准 canonical，各以 `curl -sS -L --max-redirs 5 -D <暫存headers> -o <暫存body> -w '%{http_code} %{url_effective}\n' '<實際URL>'`，檢查 301／308／Location 與最終 200、path／query 保留、無 loop／mixed content | PENDING |
| D14-H01 | Required：正式內容真正在正確 host | 品牌網址首頁與所有實際公開內頁 GET 200、正確內容／版本；深層直接載入／refresh／跨頁／錨點／手機與 Desktop 導覽正常，未知／dev HTTP 404，不把平台預設頁當成功 | PENDING |
| D14-H02 | Required：IPv4／IPv6 不能忽略 | 發布 A 時 `curl -4` 驗 HTTP／HTTPS；有發布 AAAA 時另 `curl -6` 與可用 IPv6 網路重驗。無 AAAA 的 IPv6 endpoint 驗收可記 Not Applicable 並有查詢依據；有 AAAA 卻環境無 IPv6 記 BLOCKED，不冒稱成功 | PENDING |
| D14-H03 | Required：真正 Browser／資源 | 至少 375／1440px 正式網址實測，Console／Runtime／Network、CSS／JS／字體／Logo／icon 無失敗或 HTTP 資源；鍵盤／Focus／手機選單基本 smoke，保存真實安全截圖／結果 | PENDING |
| D14-S01 | Required：SEO host 與 gate | 真實 response／HTML Canonical／OG／metadataBase／語言正確、沒有 Pages 子路徑／Preview host；原 noindex／nofollow 保留，已存在 sitemap／robots 只列真實頁與核准政策 | PENDING |
| D14-S02 | Required：服務未受破壞 | 變更前後完整授權 zone export 及指定 public queries 比對，原 MX／SPF／DKIM／DMARC／驗證／CAA／DNSSEC 未非預期變更；provider health 有資料才報，不能據 DNS 推定信箱投遞成功 | PENDING |
| D14-R01 | Required：回復與交接 | 具體 rollback 指令／UI 步驟／現值還原／舊目標健康／授權與 DNS 快取限制、再次 DNS／TLS／HTTP 驗證及續約／certificate 維運責任有文件 | PENDING |
| D14-O01 | Optional：僅在必要且授權時實際回復 | 觸發回復後保存原失敗與還原 record／redirect／domain 的真實證據及重驗；未演練保留 PENDING 與理由，不能冒稱已演練 | PENDING |
| D14-O02 | Optional：額外解析／裝置診斷 | 可補 DNSViz／其他地區 resolver／實體裝置檢查；不取代權威＋兩 resolver／Browser 核心證據 | PENDING |
| D14-N01 | Not Applicable：不屬本任務 | 註冊購買、NS／Registrar 遷移、Mail provisioning、API／app 子網域、Backend／DB／完整 SEO 索引開放；不得為湊驗收執行 | PENDING |

公開 resolver 的選擇於報告記真實來源，不在本規格固定 DNS Provider。需要 `dig`／`openssl` 等工具但環境缺少時，使用等效已可用工具並記輸出／限制，或記 BLOCKED；不為文件工作安裝網站依賴。TLS／DNS／HTTP 任一必要結果失敗時保留 FAIL 與外部原因，不能用 Build／CI／Vercel Ready 代替。

### Test Failure Policy

- `FAIL` 不得標記為 `PASS`，原始失敗與重驗紀錄均須保留。
- 發現問題必須記錄原因、影響範圍及修正方式；可修正的問題應先修正，再重新執行相關測試及必要回歸。
- 無法修正的問題必須列入報告的 Known Issues，註明嚴重程度、交付影響、目前狀態及後續處理方式。
- 存在阻礙交付的 `FAIL` 或必要驗收的 `BLOCKED`，不得宣稱任務完整通過。交付須符合原規格；不適用項目只有在附上理由與依據後才能記為 `N/A`。
- 不得透過跳過測試、降低驗收標準、隱藏錯誤或展示舊成功結果取得 `PASS`。
- 外部服務、權限或環境造成的阻礙，必須記錄實際原因、發生時間、影響測試及解除條件；不得虛構執行結果。

## 12. Test Report & Evidence

正式執行時必須建立獨立 `docs/reports/task014-implementation.md`，本輪不建檔、不填假結果。報告明確分 Phase A audit／proposal、Phase B authorized change、Phase C verification／handover，不把準備工作當成完整網域完成。

除共通證據欄位外，必須包含：

- Repository／status／Base／feature／受測 SHA／tree、實際相關檔案與外部設定清單、Task 013 真實 Project／Production ID／SHA／URL。
- 來源 Repository／Branch／Commit／Blob／核准狀態、Pending Confirmation 的 Owner／截止階段／fallback。
- 真實 Registrar／NS／provider／zone 的必要非機密資料、完整 zone export 的安全存放索引與覆蓋限制，現有 mail／TXT／CAA／DNSSEC／TTL inventory。
- 各筆 current→desired、record target 的平台來源／查閱時間、依賴／風險／審核／授權／操作者／窗口、寫入前後值與實際執行時間，未寫入也明確記錄。
- 第 11 節完整 commands／query／resolver／expected／actual／exit／status，DNS propagation 時序、憑證 hostname／chain／issuer／有效期／TLS／renewal，完整 redirect status／Location／最終 URL。
- 所有已實作頁面、版本／HTTP、資源／mixed content、Browser／Responsive／鍵盤基本 smoke、Console／Runtime／Network、Canonical／noindex、Pages 保護與郵件 record 比對。
- 問題、影響、修正、重驗、rollback 方案／是否實際執行、快取／IPv6／權限等限制、續約與憑證維運責任、真實 Git／PR／CI 及正式網址狀態。

至少提供品牌網址 Desktop／Mobile 的真實網站畫面及不含機密的 domain／TLS／redirect 證據；可用安全的 HTTP／TLS logs 補足技術證明。截圖記 URL、SHA、Viewport／尺寸／時間與人工檢視，遮蔽私人帳戶、驗證 token、收信資訊、secret／bypass URL。檔案真正存在後再建立連結；完整 provider 匯出不為證據而公開到 Repo。

PR 前先完成本機檢查、Phase A inventory／changeset／rollback 報告，尚未發生的外部寫入及驗收維持 PENDING，並標明可審閱階段成果；正式執行後補真實證據。不能為完成報告提前操作 DNS，也不能在必要外部驗收尚未完成時宣稱 Task 014 全部 PASS。

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

未來正式實作從最新已合併 main 建立 `feature/website-domain-configuration`，建議 Conventional Commit `chore(domain): document XK domain configuration`；有程式改動時採符合實際內容的 scope。不直接 push main，不自動 merge；PR 需包含獨立報告、最小 Repo diff、外部 changeset／授權／回復／真實結果與未發生階段，排除機密與 build 產物。

**PR 的建立、審核與合併，不自動授權 DNS／Nameserver／Domain binding／Redirect／TLS 或帳戶變更。** 網域寫入須由實際有權人對可審閱 changeset 的精確範圍授權；若當次已有明確涵蓋的指示則直接按範圍執行，不反覆詢問。擴大到未授權 record／provider／付費／NS 或刪除服務，先另行確認。過往 Pages 或文件 Push and merge 不推定為未來 DNS 權限。

不為了取得綠燈弱化 main-only 條件或將 CI artifact 視為 DNS 驗證。外部設定即使不產生 Git diff，也須在報告記錄前後與授權。只交付準備 PR 時如實說明 Domain 未切換、待授權／受阻階段與解除條件。

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

| 交付項目 | 預期內容 | 狀態 |
| --- | --- | --- |
| Phase A audit | 真實 ownership／Registrar／NS／provider／Vercel／zone／TLS／Canonical 盤點與待確認清單 | PENDING |
| 精確變更與回復提案 | 每筆 record／Domain／redirect 的原值、新值來源、TTL、影響、Owner、當次授權與 rollback | PENDING |
| Phase B 操作紀錄 | 已授權差異的前後證據與時間，未操作項如實記錄，不含機密 | PENDING |
| Phase C 正式網址驗收 | 真實 DNS propagation、apex／www TLS／HTTPS／redirect、全部真實頁／資源／Metadata／索引保護與既有服務回歸 | PENDING |
| 獨立報告與證據 | `docs/reports/task014-implementation.md`，有指令、適用性、狀態、修復重驗與安全畫面／logs | PENDING |
| 維運交接 | 網域續約／通知／付款／帳戶與 TLS 自動續期／故障處理的責任與待確認事項 | PENDING |
| Git／PR／CI／交付 | 真實版本與分階段狀態；不能只報 CI 代替外部設定完成 | PENDING |

## 15. Out of Scope & Future Work

購買／轉移 Registrar、Nameserver migration、變更 DNSSEC／DS 架構、Mail Service／信箱／SPF／DKIM／DMARC 新建、API／app／admin／dev／wildcard 網域、Backend／Database／VPS／Docker、其他品牌域名、付費服務、HSTS preload 等長期政策，不在預設範圍。若必要先列具體依賴與獨立授權，不隱含在網站 record 設定。

不重做 Task 013 部署、不將未完成商業功能補成空殼、不改 Logo／品牌、不建立假聯絡信箱或宣稱 SSL 等於法律／隱私／營運完整。正式 Search Console／索引開放與完整 SEO 由 Task 010 另行確認；DNS 完成不授權開放索引或關閉 Pages。

對缺少 owner／provider／實際 record value／續約／授權、無可用舊站回復、IPv6 網路／CA／平台限制等，依第 6／11 節如實保留 Pending Confirmation／PENDING／BLOCKED 或實際 FAIL；不得猜測並宣稱完成。

## 16. Final Delivery Checklist

以下是未來 Task 014 的初始清單，本輪規格撰寫不勾選。

執行狀態依第 11 節統一使用 `PENDING`、`PASS`、`FAIL`、`BLOCKED`、`N/A`。僅有證據的 `PASS` 可勾選；其餘保持未勾選，`N/A` 附判定理由且不視為缺少適用驗收。必要項目仍為 `PENDING`、`FAIL` 或 `BLOCKED` 時，不得宣稱完整通過。以下是規格初始清單，本輪文件修訂不代填功能結果。

- [ ] PENDING — Repository／最新 main／來源版本、Task 013 真實健康 Production 與本次範圍已核對。
- [ ] PENDING — 域名 Owner、Registrar、DNS provider／權威 NS／zone、Vercel Project 與操作權限有實際依據。
- [ ] PENDING — 唯讀 audit、完整 zone export 安全索引、現有網站／郵件／TXT／CAA／DNSSEC／TTL 盤點與限制已記錄。
- [ ] PENDING — Apex／www／HTTPS／canonical 提案、精確 changeset、值來源、影響與 rollback 可審閱，未猜 IP／NS／target。
- [ ] PENDING — 指定外部寫入有當次精確授權，操作前重讀現值，沒有覆寫他人或未授權服務。
- [ ] PENDING — Vercel domain／verification 與最小 DNS／redirect 變更有真實前後證據，MX／TXT／DNSSEC／CAA 與其他服務受到保護。
- [ ] PENDING — 權威 DNS 與至少兩個 recursive resolver 驗證完成，propagation／TTL／IPv4／適用 IPv6 的限制如實記錄。
- [ ] PENDING — Apex 與 www certificate hostname／chain／期限／TLS、HTTP→HTTPS／www→apex 永久轉址及 path／query 正常。
- [ ] PENDING — 正式網址所有真實頁、深層重載、連結／錨點、375／1440px Browser、Console／Runtime／Network／assets／mixed content／404／dev 保護驗收完成。
- [ ] PENDING — Canonical／OG／語言及索引 gate 正確，未因網域完成自行移除 noindex／nofollow。
- [ ] PENDING — 本次 npm ci／TS／Lint／一般 Build／Pages regression 及對應 CI 已記，未替代 DNS／TLS／HTTP 實測。
- [ ] PENDING — 可操作 rollback 與真實限制、網域續約／通知／帳戶責任、TLS 續期與故障處理交接完成。
- [ ] PENDING — 獨立報告、安全截圖／logs、完整 diff、真實 Commit／PR／CI／外部操作與正式網址狀態清楚，未關閉 Pages 或越界部署。
- [ ] PENDING — Test Failure Policy 已遵守，失敗、阻礙與 Known Issues 有完整記錄，沒有阻礙交付的未解決必要驗收。
- [ ] PENDING — 每項測試的 Test ID、預期／實際結果、狀態與可追溯證據已記錄，沒有以預期或舊結果代填。
- [ ] PENDING — 獨立報告已在 PR 建立前完成並納入同一 PR，最後測試、後續重驗與實際提交的程式碼一致。
- [ ] PENDING — 本機、Feature Commit、PR CI、PR Review、合併授權、main CI、部署與公開 URL 驗證分別記錄；未發生階段維持 PENDING 並說明，沒有冒稱已發布。
