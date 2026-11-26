# Design Collection 共用核心使用契約

日期：2026-11-26。已合併基準：DC-002～DC-005，main `9322810f27e74e5ed4faa35a3b3931b3719f0c9a`；當前分支為 [DC-006](../task/dc006.md) `feature/design-collection-navigation-seo`，本機功能與版面驗收已完成，最終 CI／artifact 待新 PR。架構依據：[DC-001](../task/dc001.md)、[架構](../01_design/design-collection/architecture.md) 與 [工作包](../01_design/design-collection/work-packages.md)。

## 當前邊界

Modern、Heritage、Luxury 各 16 頁及 `/design-collection/` Gallery 共 49 個目的地已實際合併、部署與公開驗證；先前 DC-003 的 17 頁／兩系列 planned 是歷史階段。系列規格／原驗收及實際遠端事件分別見 [DC-004](../reports/dc004-implementation.md)、[DC-005](../reports/dc005-implementation.md) 與 [合併整合報告](../reports/design-collection-integration.md)，不能改稱本輪 DC-006 測試。

DC-006 的純導航 API、server-only 導航模型、內容 href adapter 與三套 Frame／Header／Footer／CTA 的共用切換及比較已接入，本機功能與版面驗收已完成。URL 為唯一風格來源，Client 不以 pathname 套用全站 theme，也不引入完整 server 內容。原始 incomplete／網路診斷及限定重驗見 [DC-006 報告](../reports/dc006-implementation.md)；[本輪截圖](../screenshots/design-collection/dc006/) 為 18 張實際 Pages 畫面，已逐張檢視。最終 CI／artifact 待新 PR；DC-007 尚未開始。

原有品牌、服務、作品與報價 config 仍為權威資料；不維護三份 catalog，不為風格建立價格倍率。核心位於 `src/config/design-collection.ts` 與 `src/lib/design-collection/`，普通 Next.js 與 Pages 共用。純核心／測試／文件／證據以限定 `@source not` 排除 Tailwind discovery；三套正式呈現樣式由各 Frame 與 scoped design system 管理，不由 DTO 文字生成。

## 內容 DTO

`getDesignContent()` 回傳單一、深層凍結的 plain DTO，分成 site／about／home／services／solutions／portfolio／contact／quotation。先選取公開資料、深複製再 freeze；原 config、Lucide 元件及其 descriptors 不受影響。DTO 排除 Icon、React component、function／symbol 與非呈現必要的公司來源全文，可 JSON 序列化。

Home 的 R05 Maintenance 與詳細 Services 的 Cloud 分類依原資料保留，不能合併成錯誤服務碼。`services.page.websiteGuide` 提供同源網站導讀與作品分類連結。作品的 planned／implemented／future 欄位、技術 Planned 狀態、六品牌排序、模板署名、null 與未提供欄位、價格來源／range／from／quote／年度週期都保留。原 href 是內容事實；呈現時由共用 adapter 映射已知內鏈，不改寫外部來源事實。

`getDesignService`、`getDesignSolution`、`getDesignProject`、`getDesignWebsiteShowcase` 做精確 ID 查詢，未知 ID 回 undefined，不模糊比對或默默換另一筆。DTO 不接受使用者個人資料，也不蒐集輸入或處理收件。

## 路由與公開閘門

| API | 用途與限制 |
| --- | --- |
| `designCollectionRegistry` | 唯讀 styles／頁型／已知 slug／semantic anchors；三系列與 Gallery 均 implemented，未來 planned 仍不可公開 |
| `describeDesignRoute(request)` | 可描述已核定的 public／planned identity；回 canonicalPath／presentationPath／availability／hash 狀態，invalid 回 null |
| `resolveDesignHref(request)` | 只對 public 回 href；planned、unknown、invalid 回 null，沒有 allowPlanned 旗標 |
| `identifyDesignRoute(pathOrHref)` | 嚴格反查已知三系列／Gallery；拒絕外站、query、別名、編碼穿越與不合法路徑 |
| `getPublishedDesignRoutes()` | 目前精確回三系列各 16＋Gallery，共 49 個已公開 descriptor |
| `resolveDesignContentHref(href, styleId)` | 將可辨識的已公開站內內容映至指定系列；Gallery 仍為 Gallery，合法 detail slug 與 descriptor 接受的 hash 交回同一 resolver；目標未公開時拋錯 |

九個內容 page key 為 home／about／services／solutions／portfolio／technical-project／brand-showcase／contact／quotation；另有獨立 collection key，不屬某 style。只有兩類詳頁接受已核定 slug；Gallery 不得綁 style，一般頁不得帶 slug。

路徑欄位不含 query／hash，除根目錄外無尾斜線，與 SEO 慣例一致；實際 Pages 保留 trailingSlash。反查接受已知路徑的單一尾斜線，或正式 www 同 origin 絕對網址，不提供任意 URL normalization。只有已宣告 semantic anchor 能由 route resolver 保留，不支援的 hash 丟棄並回 `hashPreserved=false`；資料宣告仍須對應實際 DOM，不能用空 anchor 冒充完成。

`resolveDesignContentHref` 對外站、mailto、未知 URL 保持原值，不能解讀成未知網址已通過公開閘門；單獨的 `#semantic-id` 也保持原值，因為此 adapter 沒有當前頁 context，呼叫端須提供真實頁內錨點。它不把任意網址加上風格前綴。Heritage／Luxury links adapters 現在委派此函式，查詢字串與個資不得作為跨風格狀態。

## DC-006 導航與切換 API

`src/lib/design-collection/navigation.ts` 不匯入業務內容、React、storage 或 server-only 模組，可供 Client 使用；它只依伺服器提供的公開模型決策。

| 純型別／API | 契約 |
| --- | --- |
| `DesignNavigationModel` | styles 的 id／name／homeHref、公開 routes 的 path／styleId／pageKey／slug／anchors，以及 collectionHref；不含公司全文、價格或個資 |
| `DesignHeaderItem`／`DesignDirectoryGroup` | 可序列化的 Header current／label／href 與 Footer 分組／entries 型別；不是第二份品牌 catalog |
| `normalizeDesignPathname(pathname)` | 嚴格接受根或小寫英數／連字號路徑與單一尾斜線，非根移除該斜線；非法／重複斜線／query／編碼等回 null，不先用 URL normalization 隱藏 traversal |
| `resolveStyleSwitch(model, pathname, hash, targetStyleId)` | 已知 source 以 pageKey＋合法 slug 找 target；無 counterpart 時用真實目標首頁並標 `fallback`；無可用 style／目的地回 null |
| `StyleSwitchDestination` | styleId／name／href／current／fallback／reason／hashPreserved；reason 為 same-content、gallery、unknown-page 或 missing-counterpart |

Switcher 只在 source 與 target 都宣告同一 semantic anchor 時保留 hash；Gallery、未知／不合法頁或缺 counterpart 的首頁 fallback 不保留 hash。API 沒有 query 參數，因此不轉移搜尋字串或個人欄位；Client 啟用連結時只傳目前 pathname／hash。`current` 只有真實同內容且 source style 相同才成立，不能將 Gallery／404 當成 Modern 內容頁。

`src/lib/design-collection/navigation-model.ts` 明確 `import "server-only"`，Client 不得 runtime import。它使用同一 registry、`getPublishedDesignRoutes()` 與 `resolveDesignHref()`，對未公開目的地拋錯：

- `getDesignNavigationModel()` 只輸出 implemented styles 與公開路由／anchor 輕量模型。
- `getDesignHeaderItems(styleId, currentPageKey?, keys?, includeCollection=true)` 以七個主要頁型為預設，允許 Frame 指定原導覽順序／子集；Modern 保留 home／about／services／solutions／portfolio 五項，Gallery 比較採七頁且不加入 collection 本身。
- `getDesignDirectoryGroups(order)` 按呼叫端指定系列順序產生已公開分組，另加 Gallery 分組；詳頁標籤取同源 DTO。完整 Footer 必須傳入三系列，讓 49 個目的地皆可到達。

共用 server `StyleSwitcher` wrapper 將模型傳給 `StyleSwitcherClient`；Client 只負責 URL／hash／history 訂閱與原生連結目的地，不決定 Frame theme、不保存偏好。非目前風格為真實 `<a>`；目前項目用可見文字與 `aria-current="page"` 標示。三套 Frame 的整合契約為 Header 後、唯一 main 前正常文流 band，列印隱藏；Gallery 三首頁卡保留，另用同一 resolver 生成七主頁×三系列比較。原生手機選單展開後直接點 band 的 click／focus／Escape／外部點擊協調，以及新分頁／back／forward，均須本輪實測，不能由 API 存在推定通過。

## Metadata

`describeDesignMetadata` 描述 availability、canonicalPath／presentationPath 及 Metadata，不是發布許可。`createDesignPageMetadata` 是 server 頁安全入口，只回 public，planned 一律 null。既有 SEO registry 已涵蓋 Gallery 與兩套完整系列，沒有環境索引開關。

Modern 16 結果保持原 `createPageMetadata`；Heritage／Luxury 32 頁 canonical 指向 Modern 同內容，OG URL 指向其展示路徑；Gallery self-canonical。所有結果固定 www、noindex/nofollow、無未核准圖片或 hreflang，Twitter text-only summary；不新增 Sitemap、Organization／Product／Review 或重複 JSON-LD。Metadata 不使用 request host、query 或個人輸入，截圖不等於核准分享圖。

## Contact／Quotation 與個資

`designContactInteractions.validate/createDraft` 重用原驗證及本機草稿，以既有 verified channels 為收件來源。沒有 fetch 或收件服務，不會自動寄信；長 mailto 保留原完整複製 fallback。

`designQuotationInteractions` 提供 fresh defaultSelection、sanitize、calculate、createInquiry，全部綁定原 catalog 與計算／摘要函式。回 detached readonly 資料，不修改原輸入、來源或 storage。`DesignQuotationController` 只有 type-only 參照；實際 Client 仍直接使用既有 `useQuotationSelection`，不把 client storage 模組 runtime import 進 server 資料層。

`createDesignInteractionScope(styleId, pageKey)` 接受三個已知 style 與 contact／quotation，產生只含 ID 的 stable remountKey，不是 href 或 storage key。`designInteractionResetPolicy` 的 integration-required 描述本身不掛 controller；既有兩系列 adapters 已傳 scope 至共用表單／試算，頁面／風格／history／Activity／bfcache 清除由共享 Client 實作。DC-006 加入真 Switcher 後仍須重驗個人欄位確實清空與可見提示，不能僅由 remount key 推論行為。

Quotation 仍只有原 `xk:quotation:v1` 保存方案 IDs，個人欄位只在記憶體。不新增 LocalStorage key、cookie、sessionStorage、偏好或 URL 輸入管道；拒絕 storage／Clipboard 仍可本機操作與手動複製。

## Token、Portal 與列印

`requiredDesignTokenSchema`／`DesignSemanticTokens` 定義 color、typography、layout、spacing、radius、shadow、motion 完整角色；純核心本身不提供 palette。Modern／Heritage／Luxury 的正式 token 值與 scoped recipes 位於各 `src/design-systems/`，以已核准版本為界。`validateDesignSemanticTokens` 回 valid/errors，`assertDesignSemanticTokens` 拒絕缺項、錯型、unknown 欄位或非法有限語法。alias 語法有效不代表解析後對比已測；Reduced Motion 零時長需明確零值。

`designPresentationIsolationContract` 是 integration-required 契約，不掛 portal 或改 `@page`。Heritage／Luxury Frame 已提供各自 scope／portal 容器；實際新增 portal 必須繼承當前 frame tokens，不預設掛 document.body。標準白色 A4 目前由共用 quotation renderer、具名 `@page xk-quotation` 與啟用標記隔離，原 Logo／QR 不因風格改變。DC-006 band 以 print 規則隱藏；本輪仍驗跨頁／跨風格 print media 與離頁回復。僅在實際 byte／diff 證明數學、A4、QR 未變時限定沿用原物理 PDF 證據，不冒稱新印六份或提前完成 DC-007。

## 測試與擴充

```sh
npm run test:design-collection
```

既有 Node.js 24 測試涵蓋獨立 route fixture、Metadata、不可變內容、純行為／PII 與 token 契約；本輪新增 navigation 決策的獨立預期與必要整合驗證，最終 v2 六品質與 typegen 均 Exit 0。本機功能與版面驗收已完成；normal／Pages 的原始 incomplete／網路診斷、人工判讀及限定重驗詳見 [本輪報告](../reports/dc006-implementation.md)，不將原 suite Exit 2／1 概稱為全數測試 PASS。`scripts/register-test-aliases.mjs` 只供 Node tests 解析既有 Next.js alias 與來源 `.ts`，不由 app 引用，不改 package type／production config 或依賴。

不得從 adapter 反產生全部 expected。兩模式須以實際 49 頁 HTML／HTTP、所有內鏈與宣告 anchor、五寬各 245 layouts、真實切換／鍵盤／axe／個資／列印與 artifact 補足純模型無法證明 DOM／事件可用的限制；保存全部原 FAIL／Exit／incomplete 與必要人工判讀。本輪新增 spec／report／artifacts／截圖均有版本邊界，舊 DC-002～005 證據不改稱本輪重跑。完成後新 PR 待審、不自動合併；DC-007 尚未開始。

## DC-003 路由外框與隔離預覽

原頁面在 `src/app/(modern)/`；route group 不改 URL。`src/app/layout.tsx` 只保留技術根，ModernFrame 用 fragment 維持直接的 skip／Header／main／Footer 子元素。Group 的 not-found 只有內容，root 的 not-found 才自帶完整 Frame；Gallery 頁自己包 Frame，避免未來新系列繼承 Modern 外框。

Privacy／dev 的既有 connection 與存取／預覽 gate 保持。Next.js 16 對已知路由中的 notFound 會產生 raw `__next_error__` document，再由 Client Boundary 恢復單一 Modern 外框；不能把這份私有路由原始回應當公開 HTML 的完整外框，也不應為改掉框架行為而放寬 gate 或改預覽生命週期。HTTP 仍須真 404、不含私人草案／dev 內容；瀏覽器恢復後須一份 Header／main／Footer／h1／skip。未知全域／未知 style 或 slug 的 root 404，以及 Pages 的 404 artifact 仍有完整 SSR Frame。

Route 搬移後先執行 `npx next typegen`；若舊 `.next/dev/types` 仍引用已搬路徑，確認它是 Git ignored 的生成快取後僅清理該目錄，不改 strict tsconfig、檢查範圍或應用行為來隱藏錯誤。
