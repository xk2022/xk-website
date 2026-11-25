# XK-ESTIMATOR — 客戶方案試算 V1

建立日期：2026-11-25（Asia/Taipei）。本文件落實本輪使用者需求，新增 `/quotation`，不是正式報價／訂單／付款系統。

## 基準、規範與交付邊界

- Website base：`main@eaadead716f9a277b93aedc10e6fe234f1cc813a`，初始乾淨；分支 `feature/quotation-estimator`。保留 Next.js 16.4.6、React 19.3.1、TypeScript、Tailwind 4、shadcn/ui、Lucide、一般 build 與 GitHub Pages 靜態輸出。
- 公司文件僅讀最新 main 固定版本 `5be640ab11811b24706101ea13db73185e9ce4d8`。根目錄 `AGENTS.md` 回應 404，完整 tree 無同名規範；以現存正式公司／服務／品牌／工程文件及網站 AGENTS／workflow 執行，缺檔記入報告，不建立或修改文件 Repository。
- 公司正式來源已搬到 `doc/01_company`、`02_services`、`03_brand`、`04_engineering`；舊 Week 02 只在 archive，不反向覆蓋正式資料。來源內部分英譯連結失效，以 tree 中實際繁中檔案核對。
- CORP 只指企業形象官網，管理平台為 APP；正式分類包含 SHOP，沒有 AI Repo 前綴。AI 整合作為服務方向，相關 Web 系統沿用 APP 分類。此工具仍是官網公開內容，不改為 APP 後端或 Vite 專案。
- 正式品牌文件色票優先於本輪暫定表。只在試算頁以 scoped semantic variables 套用 Midnight `#101828`、Electric Blue `#2563EB`、Cyan `#06B6D4`、Off White `#F8FAFC`、本文 `#334155`、說明 `#64748B`、邊框 `#E2E8F0`；背景白色。既有官網 Tokens／頁面保持不變，主動作採品牌藍。
- 試算頁與 A4 重用已存在的正式 Logo 03 原檔；horizontal Blob `e1a52e7e30c943df03a5805d06754204fa4ce484` 與最新來源一致。新頁依正式來源標示 XK SYSTEM，不全站替換既有 provisional 元件或宣稱法定公司改名。
- 價格文件多是建議，不是核准公開價目表。本輪數值均為參考且待 Owner 審閱；來源有對應項目時優先公司建議，無對應項目才採本輪暫定表或標面議。不得把 CMS 整合混作任意後台、把月費乘 12 當正式年價、以 AI 通用最低額覆蓋不同標籤的服務。
- 完成 Commit／Push／Draft PR／CI，等待人工驗收；不合併、不發布分支、不改 DNS／平台／其他正式頁價格。APP 免費 DEMO 平台規範不適用於切換本官網部署，不建立 Render／Vercel／資料庫資源。

## 內容與資訊架構

1. 品牌頁首：正式 Logo、XK SYSTEM、數位服務方案試算、Digital Solution Estimator、品牌簡介及三步操作指引。全頁明示參考試算，不是正式報價。
2. 服務類型：四個原生 radio 選項：網站建置／系統開發／系統優化／AI 應用整合。切換後清除不相容的建置與附加選項。
3. 建置種類：原生 radio 卡片，依服務篩選；LP／BRAND／CORP／SHOP／APP 沿正式分類。顯示名稱、用途、對象、參考區間與來源層級、有效 Services 錨點及真實 Showcase 或明標 Planned／尚無同類展示。不虛構完成案例。
4. 附加服務：視覺、內容、行銷、功能、維運五組 checkbox；涵蓋本輪各項要求。依建置可用性篩選；已確認內含項目自動勾選並停用加價，否則不自行編造內含矩陣。表單與預約分項，若兩項同選各依明確範圍計列，不冒稱同一功能兩次。
5. 複雜程度：Basic／Standard／Advanced，顯示差異；沒有正式倍率，三者只作需求討論標記，不改變參考區間。
6. 即時結果：基礎、一次性附加、一次性總計、年度、第三方另計、服務數量。所有價格集中 config；個人欄位與試算邏輯分離。
7. A4 預覽：直式單頁；Logo、客戶稱呼與專案名稱（皆選填、長度有界、只留記憶體）、選項與勾選狀態、區間／面議、一次與年費、價格說明、官網與作品集固定 QR。支援瀏覽器列印／另存 PDF，不製造正式報價編號或成功簽約狀態。
8. CTA：取得正式報價／聯繫 XK SYSTEM／相關作品，沿用商務信箱與 Contact。生成含選項及估價的可複製摘要；短內容可開郵件草稿，長內容採完整複製，沒有自動寄信／提交成功宣稱。

## 計算契約

- `range`：min/max 都有界，逐項相加；`from`：只有下界，上界保持未知；`quote`：上下界未知並說明原因。未知不轉為 0，不以任意上限製造有限區間。
- 一次性與年度各自加總；第三方實際平台、模型、付款手續費等另計並明示未納入。未選年度項目顯示「未選擇年度項目」，不說免費。
- 存在面議項目的合計標待評估；可另外標「已知項目小計」，不能把它當完整總價。from 只顯示起價與上限待評估。
- 已內含附加選項只計一次，不增加額外費用；含未知價的內含項目亦不造成假額外待估。專案管理、測試、風險不另設疊加費。
- 將不可用／重複／未知 ID 排除，選項依 catalog 穩定排序；服務切換先重置建置與附加；複雜度無數值倍率。

## 儲存、可及性與部署

- 唯一本機 key：`xk:quotation:v1`，只保存版本、serviceId、buildId、addonIds、complexity。客戶稱呼／專案名稱不得進 LocalStorage、URL、log、QR 或網路請求。
- 保存後重新整理可復原方案；格式錯誤、未知版本／ID、儲存被封鎖時安全降級到可用的頁內狀態並告知。重設只移除自己的 key，不清除其他網站資料。
- 使用 label／fieldset／legend、原生 radio／checkbox、已選文字與勾號。可見 Focus、鍵盤操作、Reduced Motion、對比與 disabled 原因。讀屏可取得總計，不以整頁 live region 反覆朗讀。
- `/quotation` Metadata 使用既有品牌工具與 www Canonical，保留 noindex/nofollow、Privacy 草案公開 404／Sitemap 保護與空 Pages Base Path。Services 新增「立即試算方案」入口，Footer 目錄加入已實作頁，不改舊正式服務價格。
- 原生 SVG QR 離線產生與實際解碼，不向外部 QR 服務傳資料；兩模式均提供 root-relative 靜態圖。

## 檔案分工與驗收

- `src/config/quotation.ts`：目錄、相容性、內含、來源與價格。
- `src/lib/quotation/`：型別、純計算／清洗、持久化與摘要；不加入 Backend／API／資料庫／會員登入。
- `src/components/sections/quotation/`、`src/app/quotation/`：互動卡片、結果、CTA、A4 與頁面範圍 CSS。
- `public/images/quotation/`：兩個固定 QR；既有 Logo 原檔不改。
- Services／SEO／Navigation／Footer、Pages guard／smoke 作必要增量整合。README／AGENTS／實作紀錄／本輪報告同步更新；新增資料從 Tailwind 掃描排除。
- 最終版本執行 `npm ci`、`npx tsc --noEmit`、`npm run lint`、原生計算與儲存測試、`npm run build`、`npm run build:pages`。一般 server 3210 驗完停止，再用 Pages 3211，勿同時覆寫 .next。
- 兩模式驗新頁主要流程及既有關聯頁；HTTP smoke 覆蓋全部公開路由、連結／錨點、圖片／CSS／JS／Base Path／Metadata／404。新頁使用 320／375／768／1440／1920px，鍵盤、Focus、radio／checkbox／disabled、Reduced Motion、局部 axe、Console／Runtime／Network。
- 明確測：每服務切換、相容重設、多選、區間算式、from／quote、未知非零、一次／年費、內含不重計、三複雜度不改價、惡意／過期／封鎖儲存、PII 不落盤、重新整理方案復原、複製拒絕 fallback、mailto 攔截不實寄。
- 產出桌面／手機／選擇狀態與 A4 真實截圖、至少一份最長輸入／全部適用附加選中的實際列印 PDF；檢查 1 頁、A4 尺寸、文字／圖形無裁切、QR 真解碼。一般版／Pages 版分別檢查列印；不以 CSS 目測代替 PDF 證據。
- 報告 `docs/reports/quotation-estimator-v1.md`：來源 commit/blob、差異、完整檔案、環境、Test ID／指令／預期／實際／真退出碼、原 FAIL 與重驗、圖與 PDF、Known Issues、Commit／PR／CI。原始資料 /tmp；只封存必要證據，不寫假 PASS。
- PR 建立前完成報告；後續 CI 證據更新同一 PR Description，不做記錄自己 SHA 的循環提交。人工驗收、價格確認、Merge 與正式部署未發生就維持 PENDING。
