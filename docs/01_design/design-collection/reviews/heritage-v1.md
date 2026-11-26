# Heritage 品牌審閱稿 v1

日期：2026-11-26。狀態：**DRAFT／待品牌審閱**。網站基準：`main@8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`（[DC-003／PR #39](https://github.com/xk2022/xk-website/pull/39) 已合併）。

本稿把 [DC-004 工作包](../work-packages.md#dc004) 的品牌前置做成可審閱畫面，並非完整設計系列交付。公開網站仍是 Modern 16 頁加 Gallery 共 17 頁；Heritage 沒有公開入口或新路由，Gallery 的規劃狀態不變。

## 1. 審閱方式

- [原型 HTML](heritage-v1.html)：只有本機文件預覽，不由 Next.js 或 Pages 匯出；從 Repository 根目錄以 `python3 -m http.server 3240 --bind 127.0.0.1` 啟動，開啟 <http://127.0.0.1:3240/docs/01_design/design-collection/reviews/heritage-v1.html>，審閱完停止服務。不要把 Repository 根目錄服務公開。
- [桌面 1440px](../../../screenshots/design-collection/dc004-review/heritage-1440.png)、[手機 375px](../../../screenshots/design-collection/dc004-review/heritage-375.png)。截圖是本次原型，不是正式網站、未完成系統或客戶交付的畫面。
- [驗證與範圍紀錄](../../../reports/dc004-brand-review.md)。原型只示範首頁構圖；Contact／Quotation 連往既有 Modern 頁面，不是假裝已實作 Heritage 功能。

## 2. 品牌適用邊界

公司最新 main `d03cd673c10a8f7c0427c558c562112aa4d34a8c`（tree `e63c7d55e20596db3f1386dad308a4b5ccb19e23`）重新核對；新根 AGENTS 與品牌／工程文件入口已讀，來源對照見驗證紀錄。知識庫遷移沒有核准 Heritage 例外。舊來源只作固定歷史引用，不把公司知識庫建置流程加入本網站。

| 範圍 | 本稿處理 | 核准狀態 |
| --- | --- | --- |
| 公司身分、Logo、聯絡與服務事實 | 沿用既有來源，Logo 原始 SVG 不染色、不加效果、不重畫 | 未提出新公司事實；不以此推論新的商業或法律核准 |
| Header／Footer 公司外框 | 白底或正式深色，保留原 Logo 比例與品牌互動色 | 仍須品牌 Owner 核對整體呈現 |
| 展示主體 | 紙色、細線、章節與不等寬編輯構圖 | **提案，未核准公開** |
| 字體 | `Inter`／`Noto Sans TC` 基準；本機原型允許 `Noto Sans CJK TC` 系統 fallback | 正式版本須用既有自託管 Next 字體；本稿未驗證其載入與字形等價 |
| 材質／照片 | CSS 紙感與既有真實網站預覽，無新下載素材 | 無新增外部素材授權；不得以展示圖暗示客戶交付 |
| 服務、價格、作品及互動 | 引用既有資料，未建立新的產品、報價或表單行為 | 不構成價格、服務成果或收件能力核准 |

## 3. 待審視覺角色

以下均限定為 Heritage 展示主體候選值，不修改 Modern 全站或試算頁色票。原型對比量測只證明所列組合，不能推論所有正式元件已通過。

| 角色 | 候選值 | 用途限制 |
| --- | --- | --- |
| 紙色背景 | `#F4E9D8` | 展示主體 |
| 內容表面 | `#FFF9F0` | 乾淨的正文、圖說及行動框 |
| 正文／標題 | `#2D241E` | 正文、章節層級 |
| 次要文字 | `#705D4A` | 說明與圖說；仍須逐表面對比 |
| 品牌互動 | `#2563EB` | 連結、主 CTA 及 focus，依實際表面驗證 |
| 裝飾棕紅／黃銅 | `#8A3B2E`／`#B58A4C` | 僅提案角色，未使用的候選不宣稱已測；不能直接作小字或必要控制邊界 |
| 裝飾線／功能邊界 | `#D5C7B1`／`#806B55` | 分開裝飾與必要辨識邊界，不能只憑顏色表達狀態 |

正文至少 16px、行高 1.7；Hero 的 52px／36px 是待審編輯字階，非新增公司字體標準。無 Serif、新字體依賴、外部字體請求、動畫套件或未授權紙材。

## 4. 獨立版面審閱

| 區塊 | 與 Modern 的構圖差異 | 保留內容 |
| --- | --- | --- |
| Header／Footer | 刊頭、分隔線導覽、刊尾索引；手機原生可展開目錄 | 品牌、可見導覽、可操作聯絡及頁尾索引 |
| Hero | 桌面主標與導讀不等寬；手機單欄，另列章節索引 | 原品牌定位與真實服務／試算入口 |
| 服務 | 編號清冊、需求與服務資訊分欄，細線形成閱讀節奏 | 原五類 Services 分類與對應摘要 |
| 作品 | 圖片、圖說、狀態與來源組成編輯清冊 | 原三筆 featured ID、順序、展示性質，無客戶成果宣稱 |
| 合作／CTA | 五步章節與獨立行動框 | 原合作流程；Email 草稿與參考試算的實際界線 |

編號是閱讀與流程順序，沒有創業年份、世代傳承、歷史照片、團隊人數或保證成果。手機不以桌面縮圖替代單欄閱讀。

## 5. 內容與工程交接

本稿文案來自基準版本的 `src/config/site.ts`、`homepage.ts`、`services.ts`、`website-showcases.ts`、`inquiry.ts` 與既有公開頁；原型有來源清單。它是固定版本的視覺樣張，不是第三份可維護業務 catalog。正式實作必須消費 [共用核心 DTO](../../../03_engineering/design-collection-core.md)，不能把 HTML 中的文案或價格抄成新的資料來源。

原型無 JavaScript、儲存、收件、API 或試算實作；只提供有效頁內錨點、原生目錄與明示前往現有官網的連結。`src/app/globals.css` 僅排除此審閱目錄及證據的 Tailwind 掃描，沒有新增呈現宣告；必須比較建置資源，防止文件產生正式 utility。

品牌審閱完成後，DC-004 仍須完成獨立 Frame／完整語意 tokens／recipes、16 頁共用內容、路由與 Metadata、registry／fixture、Contact／Quotation／PII／A4、兩模式與五寬等 [工作包全部驗收](../work-packages.md#dc004)。本稿不縮減或取代那些條件。

## 6. Owner 決定與後續門檻

| 決定 | 狀態 | 需要記錄 |
| --- | --- | --- |
| 紙色與裝飾色可否用於 Heritage 展示主體 | PENDING | 對本稿版本的同意或具體修改值 |
| 官方品牌外框與展示主體的分界 | PENDING | Header／Footer／Logo 與主體的適用範圍 |
| 編輯構圖及待審字階 | PENDING | 桌面與手機構圖的意見 |
| 素材與字體範圍 | PENDING | 既有素材、正式自託管字體，是否有其他已授權資產 |

核准紀錄需指向本稿 Commit／PR 及審閱版本；技術 CI、DC-003 合併、這次「合併」指示及無意見都不能當作品牌核准。若要求修改，先更新本稿與受影響畫面／測試再送審。核准後才能進入 Heritage 公開版本實作；新 PR 的合併與發布仍依當次授權。
