# Design Collection 共用核心使用契約

日期：2026-11-26。實作階段：DC-002～DC-003。架構依據：[DC-001](../task/dc001.md)、[架構](../01_design/design-collection/architecture.md) 與 [工作包](../01_design/design-collection/work-packages.md#dc002)。結果見 [DC-002 報告](../reports/dc002-implementation.md)。

## 當前邊界

DC-003 整合 ModernFrame 與一個 `/design-collection/` Gallery，共 17 個公開目的地。Modern 原 16 個 URL 與 Metadata 保持；Heritage／Luxury 仍只是型別化規劃清冊，沒有風格切換器。核心可描述 49 個目的地，不代表其餘 32 頁存在或能發布。

原有品牌、服務、作品與報價 config 仍為權威資料；不維護三份內容，不為風格建立價格倍率。新增模組位於 `src/config/design-collection.ts` 與 `src/lib/design-collection/`，普通 Next.js 與 Pages 共用同一套純邏輯。globals.css 僅追加限定路徑的 @source not，避免純核心、測試及本輪文件／證據中的資料文字被 Tailwind 掃成正式 utility；不改任何呈現宣告或既有掃描路徑。

## 內容 DTO

`getDesignContent()` 回傳單一、深層凍結的 plain DTO，分成 site／about／home／services／solutions／portfolio／contact／quotation。先選取公開資料、深複製再 freeze；原 config、Lucide 元件及其 descriptors 不受影響。DTO 排除 Icon、React component、function／symbol 與非呈現必要的公司來源全文，可 JSON 序列化。

Home 的 R05 Maintenance 與詳細 Services 的 Cloud 分類依原資料保留，不能合併成錯誤服務碼。作品的 planned／implemented／future 欄位、技術 Planned 狀態、六品牌排序、模板署名、null 與未提供欄位、價格來源／range／from／quote／年度週期都保留。原 href 是內容事實，尚不依風格改寫。

`getDesignService`、`getDesignSolution`、`getDesignProject`、`getDesignWebsiteShowcase` 做精確 ID 查詢，未知 ID 回 undefined，不用模糊比對或默默換成另一筆。DTO 不接受使用者個人資料，也不蒐集輸入或處理收件。

## 路由與公開閘門

| API | 用途與限制 |
| --- | --- |
| `designCollectionRegistry` | 唯讀 styles／頁型／已知 slug／semantic anchors；Modern 與 Gallery implemented，其他 planned |
| `describeDesignRoute(request)` | 可描述 public 與 planned；回 canonicalPath／presentationPath／availability／hash 狀態，invalid 回 null |
| `resolveDesignHref(request)` | 只對 public 回 href；planned、unknown、invalid 回 null，沒有 allowPlanned 旗標 |
| `identifyDesignRoute(pathOrHref)` | 嚴格反查已知 Modern 及規劃路徑；拒絕外站、query、別名、編碼穿越與不合法路徑 |
| `getPublishedDesignRoutes()` | 只回目前 16 個 Modern＋Gallery，不是 49 筆計畫清單 |

九個內容 page key 為 home／about／services／solutions／portfolio／technical-project／brand-showcase／contact／quotation；另有獨立 collection key，不屬某 style。只有兩類詳頁接受已核定 slug；Gallery 不得綁 style，其他一般頁不得帶 slug。

路徑欄位不含 query／hash，除根目錄外無尾斜線，與現有 SEO 資料慣例一致；實際 Pages 保留 trailingSlash 設定。反查接受已知路徑的單一尾斜線，或正式 www 同 origin 絕對網址；不提供任意 URL normalization。只有已宣告 semantic anchor 能保留，不支援的 hash 明確丟棄並回 hashPreserved=false；目前 planned 系列 anchors 為空，不宣稱未實作 DOM 存在。

查詢字串與不明欄位不作為狀態或個資傳遞。外部作品／來源與 mailto 保持原目的地，不可送進內部 resolver 後強加系列前綴。未來發布新系列須修改已審閱 registry、具備實際 route、Metadata 與 fixture；不能只用 describe 結果當公開導覽。

## Metadata

`describeDesignMetadata` 是規劃／測試契約，包含 availability 與分開的 canonicalPath／presentationPath 及 Metadata；它不是發布許可。`createDesignPageMetadata` 是 server 頁的安全入口，只回 public，planned 一律 null。Gallery 已加入既有 SEO registry；未加入新系列，也沒有環境索引開關。

Modern 16 結果逐頁等同原 `createPageMetadata`。Heritage／Luxury 規劃結果 canonical 指向 Modern 同內容，OG URL 指向實際展示路徑；Gallery 為 self-canonical。所有結果固定 www、noindex/nofollow、無未核准圖片或 hreflang，Twitter 為 text-only summary；不新增 Organization／Product／Review 或重複 JSON-LD。Metadata 不使用 request host、query 或個人輸入。

## Contact／Quotation 與個資

`designContactInteractions.validate/createDraft` 重用原驗證及本機草稿，以既有 verified channels 為收件來源。沒有 fetch 或收件服務，不會自動寄信；長 mailto 保留原完整複製 fallback。

`designQuotationInteractions` 提供 fresh defaultSelection、sanitize、calculate、createInquiry，全部綁定原 catalog 與計算／摘要函式。回傳 detached readonly 資料，不修改原輸入、來源或原 storage。`DesignQuotationController` 只有 type-only 參照；未來 Client 仍直接使用既有 `useQuotationSelection`，不能把 client storage 模組 runtime import 進 server 資料層。

`createDesignInteractionScope(styleId, pageKey)` 僅接受三個已知 style 及 contact／quotation，產生只含 ID 的 stable remountKey；不是 href 或 storage key。`designInteractionResetPolicy` 明示 integration-required：未來 frame／Client 需用此 key 重設 Contact 草稿及 Quotation 個人欄位，先顯示提示。這次沒有在頁面掛 controller，因此不宣稱已實際切換風格或重設跨頁 PII。

Quotation 仍只有原 `xk:quotation:v1` 保存方案 IDs，個人欄位只在記憶體；本輪沒有新增 LocalStorage、cookie、sessionStorage、URL 或記錄使用者輸入的管道。

## Token、Portal 與列印

`requiredDesignTokenSchema`／`DesignSemanticTokens` 定義 color、typography、layout、spacing、radius、shadow、motion 完整角色，不提供新的實際 palette 或 CSS。`validateDesignSemanticTokens` 回 valid/errors；`assertDesignSemanticTokens` 在缺項、錯型、unknown 欄位或非法有限語法時拒絕。安全 simple CSS var alias 可引用原 Modern 來源；alias 解析、實際範圍、對比、字體授權與瀏覽器 CSS 支援需後續實測。Reduced Motion 的零時長須明確零值，不能用未知 alias 假定為零。

`designPresentationIsolationContract` 明示後續 style frame 提供 portal container，繼承該 frame 完整 semantic tokens，不預設掛 document.body。Print 仍為共用標準企業 A4，後續需具名 page 或等效隔離，並實測跨頁／跨風格列印。這次未改裸 `@page`、未掛 portal、未新建 CSS 或重畫摘要；descriptor 不能當成 DOM／列印隔離已通過。

## 測試與擴充

```sh
npm run test:design-collection
```

四組 Node.js 24 測試涵蓋獨立 route fixture、Modern／planned Metadata、不可變內容、純行為／PII 與 token 契約。`scripts/register-test-aliases.mjs` 只供 Node tests 解析既有 Next.js alias 與來源.ts，不由 app 引用，不更改 package type／config imports 或新增依賴。

每組測試有獨立預期，不從 adapter 反產生全部 expected。另以實際普通／Pages HTML 逐頁核對聲明 anchor，補足純資料單元測試不能證明 DOM 存在的限制。歷史核心驗收依 [DC-002](../task/dc002.md) 保留；本輪六品質指令及兩模式回歸／artifact 證據依 [DC-003](../task/dc003.md) 執行，FAIL 與重驗保留。DC-003 已整合 Modern layout／Gallery，見 [當次規格](../task/dc003.md)；DC-004／005 才實作新系列與 token 值。


## DC-003 路由外框與隔離預覽

原頁面在 `src/app/(modern)/`；route group 不改 URL。`src/app/layout.tsx` 只保留技術根，ModernFrame 用 fragment 維持直接的 skip／Header／main／Footer 子元素。Group 的 not-found 只有內容，root 的 not-found 才自帶完整 Frame；Gallery 頁自己包 Frame，避免未來新系列繼承 Modern 外框。

Privacy／dev 的既有 connection 與存取／預覽 gate 保持。Next.js 16 對已知路由中的 notFound 會產生 raw `__next_error__` document，再由 Client Boundary 恢復單一 Modern 外框；不能把這份私有路由原始回應當公開 HTML 的完整外框，也不應為改掉框架行為而放寬 gate 或改預覽生命週期。HTTP 仍須真 404、不含私人草案／dev 內容；瀏覽器恢復後須一份 Header／main／Footer／h1／skip。未知全域與 planned URL 的 root 404，以及 Pages 的 404 artifact 仍有完整 SSR Frame。

Route 搬移後先執行 `npx next typegen`；若舊 `.next/dev/types` 仍引用已搬路徑，確認它是 Git ignored 的生成快取後僅清理該目錄，不改 strict tsconfig、檢查範圍或應用行為來隱藏錯誤。
