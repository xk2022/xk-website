# SEO 保護模式與後續發布

依據 [Task 010](task/task010.md)。本階段交付 Metadata 與爬取規則的保護模式，保留全站 `noindex, nofollow`，不代表正式品牌網域已驗證、已提交 Search Console 或已被索引。

## 目前的資料來源與界線

- `src/config/site.ts` 是品牌名稱與語言的單一來源；Origin 使用 `src/config/deployment.ts` 的 `https://www.xplorekaleidoscope.com`（2026-11-23 使用者指定）。所有現有 Metadata 與 JSON-LD 沿用此值。
- `src/config/seo.ts` 集中實際路由與既有逐頁文案；`public` 只代表真實可讀，不代表可索引。
- `src/lib/seo.ts` 處理品牌 URL、absolute title、Open Graph、Twitter summary、robots 與最小 WebSite JSON-LD。
- Root Layout 保留原 title template 與 noindex／nofollow。各頁明確提供自己的 title／description／OG／Twitter，避免繼承其他頁面的文案。
- 沒有核准分享圖或社群 handle 時省略相關欄位；App icon 保留。暫定 Logo 不當作已核准分享圖。
- 只提供品牌層級的 WebSite 資料；它不聲稱目前 URL 是已核准頁面、法人、產品或客戶案例。沒有 Organization、ProfessionalService、LocalBusiness、Product、Review、SearchAction 或虛構 Breadcrumb。

## 候選與排除清冊

候選是未來 release 可逐項審查的清冊，**不是目前公開 Sitemap**。現在所有候選仍受 HTML noindex／nofollow 保護，內容修改日未知時不填 lastModified。

| 路徑 | 現況與未來判定 |
| --- | --- |
| `/` | 已合併公開首頁；未來須另納入明確 release 範圍 |
| `/about` | 已合併公開品牌介紹；不推導法定主體 |
| `/services` | 已合併公開服務介紹；未實作的服務明細頁不隨之收錄 |
| `/solutions` | 已合併公開提案方向；不宣稱現成商用產品或客戶成果 |
| `/portfolio` | 已合併公開展示規劃；三個計畫仍為 PLANNED |
| `/portfolio/corporate-website` | 既有自製展示規劃詳頁，不能推升為已交付案例 |
| `/portfolio/enterprise-management` | 同上；沒有新的系統實作或 Live 證據 |
| `/portfolio/integration-hub` | 同上；AI／n8n 規劃不當作已商用產品 |
| `/contact` | 公開靜態資訊頁，沒有正式管道或表單收件 |
| `/privacy` | draft-1，正式政策未核准；公開 404，排除候選與 Pages HTML／payload |
| `/dev/…`、404、未知 slug | 工具／錯誤頁，排除候選 |
| planned 服務詳頁、`/en`、舊 `/privacy-policy`、產品／文章 | 未實作或不採用的路由，排除 |
| fragment、query、localhost、Preview、Pages 複本 URL | 不生成獨立候選或品牌 Canonical |

新增頁面時，先確認實際合併、內容依據、route 可用與原任務 gate，再更新 SEO registry、頁面 Metadata 與驗收；不要自動複製 plannedRoutes。Privacy 變成 approved 必須先完成 Task 009 的同版本核准，不由 SEO 任務改旗標解鎖。

## robots 與 Sitemap

一般模式與自訂網域 Pages 均提供根目錄 `/robots.txt`（空 Base Path）。允許爬取公開 HTML，是為了讓 crawler 讀到 noindex；開發／草案路徑另排除，不攔必要 CSS、JavaScript 或字體。不輸出 Sitemap 宣告，也不用非標準 `Noindex:` 指令。

目前 robots 位於 `https://www.xplorekaleidoscope.com/robots.txt`，不宣稱控制 `xk2022.github.io/robots.txt`；HTML noindex 保護持續。robots 與 noindex 都不是機密內容的存取控制，也不保證搜尋引擎收錄結果。

保護模式不建立 sitemap.ts、空 XML 或 public/sitemap.xml；一般與 Pages 的 `sitemap.xml` 保持 HTTP 404。候選雖有九個真實可讀路由，沒有因此獲准發布正式可提交的 Sitemap。

## 正式索引 release 的必要變更

以下僅為後續操作規則，本次不執行正式索引或 GSC 操作。

1. Owner 指定實際 production Origin、apex／www 決策與 release 路由；對應 Task 013／014 或等效核准流程提供 DNS、HTTPS、redirect 與公開內容證據。
2. 逐頁確認內容、Contact／Privacy 的實際適用 gate、真實 HTTP 200／Link／Canonical；不為未上線功能補造聯絡或法律資料。
3. 由 Owner 明確授權索引範圍。在獨立 release PR 中逐頁調整允許索引的 Metadata、robots 及 validator；Preview、Pages 複本、draft、dev、錯誤頁保留保護，不靠環境字串、query 或 Browser Storage 解鎖。
4. 該 PR 才新增 Next.js Metadata Sitemap Route 或等效靜態機制：取已核准 release 清冊，排除所有 draft／planned／dev／404／query／fragment／副本，產生唯一絕對 HTTPS 品牌 URL，正常尾斜線一致，正確 XML 編碼；lastmod 只取有證據的內容修改日。
5. 驗收 XML 格式、清單完整且無重複、每個 URL 真正 200、Canonical／語言／robots／資源正確，以及兩種 build／CI。不可只刪除舊 noindex 斷言換取通過。
6. 依當次明確授權審查、合併、部署，分別確認 main CI、正式公開 HTML、真正 origin 根 robots、Sitemap 及資源；完成後才進入另獲授權的 GSC 提交。

## Search Console 操作待辦

確認人是品牌／站點 Owner（本會話使用者）；網域與部署工作負責人尚未另行指定。日期基準為 2026-11-19，以下使用必要里程碑，不編造姓名或日曆截止日。

| 項目 | 最晚時點／負責人 | 未確認 fallback |
| --- | --- | --- |
| 分享圖、權利與社群 handle | 新增欄位前／Owner | 省略 image／handle，保留文字 summary |
| 法定 Schema 與 Privacy 狀態 | 對應 Schema／法律候選加入前／Owner 與必要法律審閱者 | 只保留最小 WebSite，草案不收錄 |
| 真實 production Origin、HTTPS、redirect | 索引 release 前／Owner 與 Task 013／014 負責人 | 保留品牌 Canonical 設定與 noindex，不猜 DNS 值 |
| release 範圍與索引授權 | release PR 與正式發布前／Owner | 正式索引 gate BLOCKED，保護模式持續 |
| GSC property、管理權限與驗證方法 | 驗證／提交前／站點與網域 Owner | GSC 維持待辦，不建立帳號／property、不加假 token、不提交 |

Owner 需先選定並證實自己有權管理的 Domain property 或 URL-prefix property。若需 TXT，移交 Task 014 的明確 DNS 授權，不因 SEO 任務自行寫入 DNS。不能以 GitHub Pages 可讀推論品牌網域 property 已驗證。

未來驗證時記錄 property、方法、日期與去敏證據；提交時記錄真實回應。已驗證、已提交、已抓取、已索引與搜尋表現是不同階段，不保證排名、曝光或收錄時間。GSC 不需要順帶啟用 Analytics。
