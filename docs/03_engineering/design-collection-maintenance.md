# Design Collection 維護指南

2026-11-27 工作區更新：以下 npm／npx、`src/`、`public/` 與前端 scripts 路徑以 `frontend/` 為工作目錄；從 Repo 根先 `cd frontend`。跨元件 runner 留在根 `scripts/`，詳細目錄與歷史路徑對照見 [Repository 結構](repository-layout.md)。

本文件是操作流程，不是驗收報告。基線為已合併的 [PR #44](https://github.com/xk2022/xk-website/pull/44)／`ee4b4709a9f8daa755e2595a46c158b3c92d8229`：Modern、Heritage、Luxury 各 16 頁，加 Gallery 共 49 頁。當次範圍依 [任務索引](../task/README.md)、[DC-007](../task/dc007.md) 與 [工作包](../01_design/design-collection/work-packages.md)；API 細節見 [核心契約](design-collection-core.md)。過去的 CI、合併與部署不代替新變更的驗證。

## 共享資料與呈現層

先修改權威來源，再讓三系列消費同一筆資料；不在 theme 內複製文案、價目或商業狀態。

| 內容 | 權威來源 |
| --- | --- |
| 品牌、About、首頁 | `src/config/site.ts`、`about.ts`、`homepage.ts` |
| 服務、方案、解決方案 | `src/config/services.ts`、`service-plans.ts`、`solutions.ts`、`solution-showcases.ts` |
| 技術作品與品牌展示 | `src/config/portfolio.ts`、`website-showcases.ts` |
| 聯絡與本機詢問草稿 | `src/config/contact.ts`、`contact-page.ts`、`contact-inquiry.ts`、`inquiry.ts` |
| 試算、來源與費用週期 | `src/config/quotation.ts`；計算／摘要／選項保存使用 `src/lib/quotation/` |

[content.ts](../../frontend/src/lib/design-collection/content.ts) 的 `getDesignContent()` 回傳 detached、深層 readonly 的 plain DTO；`getDesignService`、`getDesignSolution`、`getDesignProject`、`getDesignWebsiteShowcase` 依 ID 查找，未知 ID 回 `undefined`。不得修改 DTO、freeze 原 config 或把 Icon／React component／函式塞入 DTO。首頁 Maintenance 與 Services 詳頁 Cloud 分類各有原始用途，不能為了主題對齊而合併或改掉其 ID／anchor。

各系列只擁有 composition、scoped tokens／recipes／Frame；Contact 驗證、Quotation 計算與儲存沿用共享實作。比較內容時依資料 ID、狀態、完整限制及價格來源核對 leaf 文字；父 `li`／`p` 的串接或順序不同須具體判讀，不把 diagnostic 候選一律忽略。

## 路由、加頁與加作品

[registry](../../frontend/src/config/design-collection.ts) 與 [routes.ts](../../frontend/src/lib/design-collection/routes.ts) 是發布清冊及 URL 入口。`describeDesignRoute()` 可描述已知 planned destination；只有 `resolveDesignHref()` 回傳的非 null 目的地可製作公開連結。`identifyDesignRoute()` 嚴格反查，`getPublishedDesignRoutes()` 提供公開清冊。`resolveDesignContentHref()` 只映射已辨識的內部內容，保留外站、mailto 與未知網址；不要用字串取代 `/` 來轉換全站連結。

目前每系列為七個主頁＋三個技術詳頁＋六個品牌展示詳頁；Gallery 是獨立的一頁。Modern 保留原網址，另兩套位於 `/design-collection/heritage`、`/design-collection/luxury`。不建立 `/design-collection/modern` 別名。

新增頁面時按下列順序處理：

1. 先確認內容、公開狀態與該次授權。若只是規劃，留在未發布資料，不先加入公開 registry／導航。
2. 在共享來源與 DTO 增加必要欄位；新增 page key 時同步 `src/lib/design-collection/types.ts`、registry `contentPages` 及各系列實際頁面。現行 implemented style 會套用全部 content pages，不能只登記新 key 卻缺少某系列頁面。
3. 建立 Modern 與兩系列的 route composition、靜態參數白名單及實際 semantic anchors。每頁恰有一份 Frame；技術 root 的字體與 WebSite JSON-LD 不重複。新 anchor 只有實際存在後才加入 registry。
4. 同步 SEO registry／metadata、Gallery 對照、Header／Footer 及相關 CTA。導航由 [navigation-model.ts](../../frontend/src/lib/design-collection/navigation-model.ts) 的 `getDesignNavigationModel()`、`getDesignHeaderItems()`、`getDesignDirectoryGroups()` 產生，不手抄一份清冊。
5. 明確核定新的總數與 URL，再更新獨立 [route fixture](../../frontend/scripts/fixtures/design-collection-contract.json)、原生測試、Pages builder guard 及 HTTP smoke 的預期。不要從 resolver 自動反產全部 expected，也不要只改 fixture 讓失敗消失。
6. 依實際影響驗證新頁、舊入口、三向切換、深頁 reload、有效／無效 hash、unknown 404 與兩模式輸出；以真實結果更新當次報告。

新增作品則先更新原 registry。技術作品的 Planned／已實作功能、技術、媒體與驗證來源分開；已公開的規劃詳頁不代表作品功能已完成。品牌詳頁須有可用的 `href`、`image`、`detail` 並通過既有 `getBrandShowcase()` 條件，才會進入詳頁 slug 清冊。保留原排序、署名、素材權利及外連限制；reference-only 模板維持 null 圖／目的地，不冒充六個品牌詳頁之一。同步 [showcase fixture](../../frontend/scripts/fixtures/showcase-contract.json) 及相關斷言。共享新增一個已核准頁面／作品通常會增加三個展示 URL，須重新計算清冊，不能永久硬編碼 49。

## Metadata、公開與價格狀態

使用 [metadata.ts](../../frontend/src/lib/design-collection/metadata.ts) 的 `createDesignPageMetadata()`；planned style 回 null，不能由描述 API 存在推定可發布。Modern canonical 維持原路徑；Heritage／Luxury canonical 指向 Modern 同內容，OG URL 指向自己的展示路徑；Gallery self-canonical。保持固定 www origin、noindex/nofollow、text-only Twitter、每頁一份 WebSite JSON-LD；沒有另行核准就不加索引開關、Sitemap、分享圖、hreflang 或公司／產品／評價承諾。

Privacy 草案、dev、未知 style／slug 與未實作路徑保持發布保護；本機 preview flag 不是公開部署設定。普通模式已知 private error-shell 與 Client Boundary 恢復需分別判讀，不能為了完整 SSR 外框而放寬 gate。Pages 必須排除草案內容與 payload，不能只藏導航。

試算目錄保留 `reference-awaiting-owner-review`、company-reference／task-provisional 與原 source references。range、from、quote、一次性及年度費用分開；未知不當 0，不把公司月費年化，也不替複雜度標籤新增倍率。只有正式內含矩陣才能設定 `includedAddonIds` 並避免重計。風格名稱不構成高級版方案、價格核准或正式報價；修改時同步 [quotation fixture](../../frontend/scripts/fixtures/quotation-contract.json) 的獨立預期與資料來源界線。

## Contact、PII 與 StyleSwitcher

Contact 是 `email-draft` 本機預覽／複製／開啟郵件草稿，不是收件 API，也不會自動寄出或確認送達。管道由既有 verified registry 決定，不猜地址；沒有新收件與法律核准就不加 fetch、後端、追蹤或成功送達文案。以合成資料驗證，勿在 QA 點擊寄出真正 Email。表單欄位、SSR 空值／未 hydration 控制與手動複製 fallback 依 [Contact fixture](../../frontend/scripts/fixtures/contact-contract.json) 維護。

Quotation 唯一保存 key 為 `xk:quotation:v1`，只含 version、serviceId、buildId、addonIds、complexity；個人欄位留在記憶體。不得新增風格偏好 key、cookie、sessionStorage、query 或 hash 來帶稱呼、Email、專案名稱、訊息。改 ID 時同步 sanitizer／fixture，讓舊或未知選項安全失效；勿清除使用者其他網站儲存。

[StyleSwitcher](../../frontend/src/components/design-collection/shared/style-switcher-client.tsx) 只取 server 產生的輕量導航模型，Client 不載入整份商業 DTO／server-only builder。`navigation.ts` 的 `resolveStyleSwitch(model, pathname, hash, targetStyleId)` 保留 page key／合法 slug；hash 只有來源與目標都宣告時才保留，query 不轉送。Gallery／未知頁的 fallback 需明示前往真正首頁，current 項目保持可見文字與 aria-current。

每份 Frame 的 switcher 位於 Header 後、唯一 main 前，使用真連結以保留新分頁／中鍵／歷史行為；不要改成全域 pathname 換主題。改動後實測原生手機選單展開時直接點 switcher、Tab／Escape／外部點擊、back／forward、同頁 hash 及 deep link。Contact／Quotation 的 style/page 變化、Activity 與 bfcache 必須清空個人 state、被保留的 DOM 個人欄位值及草稿 href，維持可見提示；僅有 remount key 不算驗證。拒絕 storage／Clipboard 時仍能手動操作。重用控制項時保留 fixture 中的 ID、label／for 及 aria 關聯；不要在同一可見頁重複掛載同一表單造成 ID 衝突。

## CSS、Portal 與標準 A4

三套 scope、portal container、完整 semantic tokens 留在各 `src/design-systems/`／Frame；新增 portal 要掛正確 scope，不預設 document.body。不要覆寫全域 root 或把第三方主題 CSS 留在返回 Modern 後生效；測冷進入、三向切換與 back／forward。

標準 A4 共用 `quotation-summary.tsx` 與 `quotation.css`。具名 `@page xk-quotation` 只在 active `[data-quotation-page="true"]` 時套用，維持白紙、原 Logo／兩 QR；switcher、導航與螢幕控制列印隱藏。測三套 Quotation→其他頁→回原風格後的 print media；實際影響 A4 時產生並檢查 PDF，不用 print-media screenshot 代替頁數、邊界與 QR 解碼。不以裁切、刪內容或未知當 0 通過。

## 兩模式操作與證據

使用 Node.js 24；先從 Repo 根目錄 `cd frontend`。以下是操作命令，並非本輪已執行結果。長指令逐項透過 [runner](../../scripts/run-with-evidence.py) 保存新 receipt／log；每次重跑換新目錄或版本後綴，不覆寫原證據。例如：

```sh
python3 ../scripts/run-with-evidence.py --receipt /tmp/xk-maint/lint.json --log /tmp/xk-maint/lint.log --timeout 600 -- npm run lint
```

依序執行六項品質指令；route 搬移需先依核心指南處理 typegen／已確認的舊生成快取，不修改 strict 檢查來掩蓋錯誤：

```sh
npm ci
npx tsc --noEmit
npm run lint
npm test
npm run build
```

選未占用的 loopback ports，並記錄在當次回執。普通模式先啟動服務；另一終端執行 smoke 及該任務的實際瀏覽器矩陣：

```sh
DC_NORMAL_PORT=3280
npm run start -- --hostname 127.0.0.1 --port "$DC_NORMAL_PORT"
```

```sh
npm run test:smoke -- --base-url http://127.0.0.1:3280/ --output /tmp/xk-maint/normal-http.json
```

普通驗收結束後，核對該次專屬 PID／指令與連接埠，確認 server 真正停止，再執行第六項 `npm run build:pages`。停止 npm／shell wrapper 不一定終止 Next.js 子程序；不能只憑終端 session 結束推定 port 已關閉，也不要廣泛終止其他任務的 Node 程序。不要同時覆寫 `.next/`。Pages 的 loopback preview 可用下列標準庫片段；未知路徑保留真 404，使用 exported `404.html`，不做首頁 200 fallback：

```sh
npm run build:pages
DC_PAGES_PORT=3281
python3 - "$DC_PAGES_PORT" <<'PY'
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
class PagesPreview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="out", **kwargs)
    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        body = Path("out/404.html").read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)
ThreadingHTTPServer(("127.0.0.1", int(sys.argv[1])), PagesPreview).serve_forever()
PY
```

```sh
npm run test:smoke -- --base-url http://127.0.0.1:3281/ --output /tmp/xk-maint/pages-http.json
```

preview 只供本機檢查，不是正式部署服務。HTTP／native tests 不能代替 keyboard、真人讀屏、真 browser zoom、實際展開狀態、截圖、PDF 或效能採樣。DC-007 的 49×5 layouts／模式、47 張網站圖、六份 worst-case 與兩份 APP/from 補充的真 PDF、至少 18 cold samples 等 Required 範圍依工作包執行，不因本指南提供指令就視為完成。證據／報告不得擴張 Tailwind 輸出；先收斂工具與狹窄掃描排除，再按實際影響重驗。保存全部 FAIL、incomplete、未完成狀態與版本 bridge，不將舊檢查改稱重跑。

## 效能問題的修復邊界

效能門檻 FAIL 先保存固定 profile 的全部原始樣本、真 exit、median／range 及 trace。對照 font completion、Layout、Script Evaluation 與長 task 的實際順序，不能只憑資產數量推論唯一原因。若要改 loading／rendering，先做最小隔離對照，再確認外觀、字體 swap、深頁 anchor、keyboard／focus、所有內容與白色 A4 沒有退化；正式修正後以同 profile 重驗至少三個樣本及受影響完整矩陣。沒有實際 after 不宣稱改善率，也不以換品牌字體、放寬 CPU／網路或只挑有利 run 取得 PASS。尚未修復的真未達目標列 Known Issues，不能宣稱 release 通過。

### R01 原生字體與離屏排版

[R01 規格](../task/dc007-r01.md)及[重驗報告](../reports/dc007-r01-performance.md)延續 Draft PR #45；此處是維護操作邊界，不是正式效能 PASS。公司來源仍為 `f1be01c0c5d8bc5b1238f250838e336bef47b149`，字體／品牌／靜態網站規範沒有新變更。

Noto Sans TC 關鍵子集採原生本機字體宣告，版本仍為 `2.004-H2`、variable weight 100–900、swap，僅預載經審閱的882個普通字碼核心。108個原始分片、其剩餘Unicode範圍及原Arial metrics fallback保留；不將未來新增CJK自動視為已優化。來源、完整OFL、固定母檔與core SHA、精簡字碼及重生命令見[字體維護文件](../../frontend/src/app/fonts/README.md)。重生只寫暫存輸出、核對預期SHA，不覆寫正式檔；新文案先重新稽核coverage及UVS，再決定是否更新core。

離屏策略僅在 screen media 對首頁首段以外區塊、試算操作區及Footer啟用；Hero、Header、風格切換與標準A4不延遲，列印維持完整即時排版。保留全部DOM與控制項，不使用固定高度裁切內容。調整intrinsic尺寸或範圍後，驗證深層hash直入／reload、Tab與focus、尋找頁面文字、選項變更／展開、返回導航、完整捲動與早期列印，並觀察實際字體完成與滾動後成本；不能只看首屏TBT。正式after與兩模式回歸完成前，不將pilot或來源檢查寫成驗收通過。

### R01 試算渲染候選與失敗保留

最終候選保留完整 100–900 字體軸、原生 screen 離屏排版與 memoized 摘要。store controller／deferred enablement 試作仍未達標，已撤回；初始化、選取、價格、驗證、複製及列印流程保持原有行為。正式 after、Normal／Pages 回歸、畫面與 PDF／warm 完成前，不得宣稱效能 PASS。

Footer自訂導覽、隱去靜態內容的Suspense及runtime-priority實驗均已撤回，不屬現行建置或維護流程。縮為400／700軸的字體試作也未通過精確glyph檢查；保留原完整variable軸與glyph／UVS證據，glyf／gvar字體不套用CFF修法。失敗原型、程序退出碼與原因只從 [R01 報告](../reports/dc007-r01-performance.md)追溯，不從歷史快照恢復已刪工具、額外建置處理或其測試命令。

## Logo V2 過渡、Known Issues 與 rollback

公司規範固定參考 [f1be01c0 的 Logo V2 使用規範](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/05_brand/logo-guidelines.md#v10-歷史與過渡素材logo-03) 與 [2026-11-26 confirmed 決議](https://github.com/xk2022/xplore-kaleidoscope/blob/f1be01c0c5d8bc5b1238f250838e336bef47b149/10_decisions/2026-11-26.md)。既有網站／產品暫用原部署素材，待 V2 相應衍生資產交付並驗收後安排更新。一般 UI 仍 Inter／Noto Sans TC；Manrope 600 只屬已轉向量的 Logo 字標。不要把 V2 母稿的存在改成此輪換 Logo、載新字體、全站換色或重染 Logo03 的授權；品牌資產遷移另立範圍並驗證。

目前問題、外部環境限制、未完成 Required 項及實際證據以 [DC-007 報告](../reports/dc007-implementation.md) 的 Known Issues／驗收矩陣與 [R01 版本報告](../reports/dc007-r01-performance.md)為準；本指南不宣稱其已通過。真人讀屏BLOCKED與原網路未知不能由效能修復自動解除。修復只針對可重現缺陷，附原失敗與受影響重驗，不順帶升級依賴或增加業務功能；R01 當時沿用 Draft PR 等待審閱且不合併部署；2026-11-27 使用者另已授權同 PR #45 合併與部署，見 [Repository 結構](repository-layout.md)。合併不會將 Known Issues 或完整 DC-007 改為 PASS。

需要 rollback 時，由 owner 先確認問題版本、最後可用 commit／artifact 與回退後應有的路由清冊。從當時最新 main 建立獨立 rollback 分支，以 revert 形成可審閱 PR；merge commit 先核對 parent／差異再決定 revert 範圍。不 force push、不直接修改 main、不以 DNS 或關閉 guard 規避缺陷。

rollback PR 需自己的品質／兩模式與受影響流程驗證、精確 head CI 及實際 Pages artifact；合併依該次有效授權。之後核對 main CI／Pages deployment 的實際 SHA、公開 URL、資產、回退後清冊、SEO／Privacy 與必要互動，保留失敗及時間線。舊成功部署、單一綠色 CI 或手動替換檔案都不能代替這份回退證據。
