# XK Website — XK SYSTEM 官方形象網站

Xplore Kaleidoscope 的品牌官網（BRAND），展示數位品牌、Java 企業系統、系統整合及 AI 應用服務，提供作品瀏覽、需求整理與參考方案試算。

- [正式官網](https://www.xplorekaleidoscope.com/)
- [作品展示](https://www.xplorekaleidoscope.com/portfolio/)
- [方案試算](https://www.xplorekaleidoscope.com/quotation/)
- [文件總索引](docs/README.md) · [開發任務](docs/task/README.md) · [協作規範](AGENTS.md)

## 1. 目前功能

| 功能 | 路徑 | 說明 |
| --- | --- | --- |
| 品牌首頁 | `/` | 品牌定位、服務、精選展示與詢價 |
| 關於 XK | `/about/` | 品牌介紹、使命、能力與工作方式 |
| 服務項目 | `/services/` | 五大服務方向與合作流程 |
| 解決方案 | `/solutions/` | 依企業需求提供規劃方向 |
| 作品展示 | `/portfolio/` | 六項自製品牌／提案展示、第三方模板及三項技術規劃，依實際狀態標示 |
| 作品詳頁 | `/portfolio/[slug]/`、`/portfolio/showcases/[slug]/` | 僅輸出已定義的 slug |
| 聯絡我們 | `/contact/` | 需求摘要、複製與 Email 草稿；由訪客自行寄出 |
| 方案試算 | `/quotation/` | 建置與加購參考金額、A4 摘要及 Email 詢價草稿 |
| 設計系列 | `/design-collection/` | 本輪 Gallery；Modern 可瀏覽，其餘規劃中 |

Modern 目前保留 16 個公開頁面。展示及規劃不等於客戶交付；試算不是正式報價、訂單或付款。聯絡與試算均沒有站內直接收件端點；聯絡資料只留在頁面記憶體，試算僅保存選項 ID，不保存客戶稱呼及專案名稱。

更多：[Contact 報告](docs/reports/contact-inquiry-form.md)、[試算規格](docs/task/quotation-estimator-v1.md)、[試算報告](docs/reports/quotation-estimator-v1.md)。

## 2. XK Design Collection

同一品牌、三套獨立版面，資料與互動核心共用。

| 系列 | 入口方向 | 狀態 |
| --- | --- | --- |
| Modern 現代專業 | 現有根路徑 | 原 16 頁已運作；共用核心見 DC-002，本輪 DC-003 相容整合 |
| Heritage 懷舊復古 | `/design-collection/heritage/`（規劃） | 設計提案，尚未實作 |
| Luxury 奢華精品 | `/design-collection/luxury/`（規劃） | 設計提案，尚未實作 |

架構規格已合併（[PR #30](https://github.com/xk2022/xk-website/pull/30)），不代表新風格已核准上線。完整目標為三系列各 16 頁及 1 個 Gallery，共 49 頁；子網域及正式索引須另行授權。

- [架構規格](docs/01_design/design-collection/architecture.md)
- [三套 Design System](docs/01_design/design-collection/design-systems.md)
- [DC-001～007 工作包](docs/01_design/design-collection/work-packages.md)

DC-002 共用核心已合併。DC-003 本輪保留 Modern 16 頁並新增 `/design-collection/` Gallery（共 17 頁），僅 Modern 可瀏覽，Heritage／Luxury 仍規劃中。見 [本輪規格](docs/task/dc003.md)、[核心 API](docs/03_engineering/design-collection-core.md) 與 [實作驗證](docs/reports/dc003-implementation.md)。新系列版型、palette、portal／跨系列 print 隔離與個資重設仍待後續工作包。

## 3. 技術架構

| 項目 | 現行配置 |
| --- | --- |
| Framework | Next.js 16.4.6（App Router） |
| UI | React 19.3.1、TypeScript 5、Tailwind CSS 4.3.3、shadcn/ui、Lucide |
| Runtime | Node.js 24.x、npm |
| Hosting | GitHub Actions → GitHub Pages；保留一般 Next.js production build |
| Data | 集中式 TypeScript 設定，不依賴 Backend、資料庫或 CMS |

現有網站以共用 Layout、UI 元件與資料設定組成。DC-002 已抽取共用核心；三風格後續依 DC 規格各自實作呈現層；尚未落地的架構不能視為現有程式。

| 路徑 | 職責 |
| --- | --- |
| `src/app/` | App Router、頁面、Metadata、全域樣式 |
| `src/components/` | Layout、Sections、UI 元件 |
| `src/config/` | 品牌、服務、案例、聯絡、試算及 SEO 設定 |
| `src/lib/` | 共享工具、驗證與計算 |
| `public/` | 靜態素材 |
| `scripts/` | 建置、測試及驗收工具 |
| `.github/workflows/` | CI／Pages 工作流程 |
| `docs/` | 規格、設計、報告及證據 |

完整技術與資料夾對照見 [工程索引](docs/03_engineering/README.md)，設計規格入口見 [設計索引](docs/01_design/README.md)。

精確依賴以 [package.json](package.json) 與 [package-lock.json](package-lock.json) 為準。

## 4. 本機開發

安裝 Node.js 24.x，從 Repo 根目錄執行：

```sh
npm ci
npm run dev
```

開啟 <http://localhost:3000>。一般開發不需 Backend 或環境變數。內部設計驗收頁為 `/dev/design-system`；Privacy 草案僅供受控審閱，勿部署預覽旗標至公開環境。

## 5. 測試與品質

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run build:pages
```

一般 production 模式在完成 `npm run build` 後以 `npm run start` 驗收，停止服務後再建 Pages；兩者共用建置工作區。Pages 輸出於 `out/`，使用靜態 HTTP server 預覽，不使用 `npm run start` 提供 Pages 產物。

- 試算定向測試：`npm run test:quotation`。
- Design Collection 核心定向測試：`npm run test:design-collection`（亦納入 `npm test`）。
- 網站 smoke、Responsive、Accessibility、Performance 等實際驗收依 [Smoke 指引](docs/03_engineering/website-smoke.md)、[效能量測](docs/03_engineering/performance-measurement.md) 與當次任務規格。
- [CI 工作流程](.github/workflows/ci.yml) 負責品質及靜態建置；所有結果以實際 head/run 為準。

## 6. 部署與公開限制

| 項目 | 目前狀態 |
| --- | --- |
| GitHub Pages | 正式對外平台，www 自訂網域根路徑 |
| Vercel | Next.js 相容建置保留；未確認正式專案及部署 |
| SEO | 保護模式，noindex/nofollow；Sitemap 未發布 |
| Privacy | 內部草案，未核准的正式政策不對外輸出 |
| 收件／價格 | Email 草稿，無站內收件；價格為參考、未核准項目保留待確認 |

PR 執行品質檢查及 Pages artifact；main 的既有工作流程負責正式部署。合併、CI、部署、公開實測與業務核准各自核對，不能互相取代。

參考：[網域部署](docs/04_deployment/custom-domain-deployment.md)、[SEO](docs/04_deployment/seo-operations.md)、[發布前置清單](docs/04_deployment/publication-readiness.md)。

## 7. Roadmap

現行任務進度、依賴、已合併 PR 與發布證據集中於 [Roadmap](docs/task/ROADMAP.md)。詳細功能範圍依 [任務索引](docs/task/README.md) 與 [DC 工作包](docs/01_design/design-collection/work-packages.md)；未完成項目不列為已提供功能。

## 8. 文件與協作

| 入口 | 用途 |
| --- | --- |
| [README](README.md) | 最新專案概要、快速入門及狀態 |
| [AGENTS](AGENTS.md) | 開發、AI Agent、驗收及 Git 規則 |
| [docs/README](docs/README.md) | 文件分類及連結 |
| [docs/task/README](docs/task/README.md) | 任務規格、進度與交付 |
| [歷史決策](docs/98_decisions/implementation-notes.md) | 既有實作與歷史限制 |
| [公司規範](https://github.com/xk2022/xplore-kaleidoscope) | 公司層級品牌與工程規範 |

歷史詳細內容保留在各 Task、報告及 [重構前 README 固定版本](https://github.com/xk2022/xk-website/blob/9a7ca8ebef026b6be49e8fe51f3afa1057a3768b/README.md)。後續更新摘要與來源連結，不再逐項追加整段實作報告。

## 9. 品牌與權利

XK SYSTEM 品牌與自有內容不得僅因 Repo 可公開瀏覽而推定開放授權；第三方模板、圖片、商標與案例各依來源及授權使用。本 Repo 未見獨立 LICENSE 文件；授權範圍須由權利人確認。
