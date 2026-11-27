[正式官網：www.xplorekaleidoscope.com](https://www.xplorekaleidoscope.com/)

# XK Website｜XK SYSTEM 官方企業網站

Xplore Kaleidoscope 的自有企業形象官網，介紹網站建置、Java 企業系統、系統整合與 AI 應用服務，讓訪客了解合作方式、瀏覽展示並整理詢價需求。

## 專案資訊

| 項目 | 內容 |
| --- | --- |
| 專案名稱 | XK SYSTEM 官方企業網站 |
| Repository | [xk2022/xk-website](https://github.com/xk2022/xk-website) |
| 網站類型 | Corporate Website（CORP／企業形象官網） |
| 專案狀態 | production；既有正式官網持續維護 |
| 專案性質 | XK 自主規劃及維護的自有官網 |
| 主要使用者 | 有網站、企業系統、整合或 AI 應用需求的訪客與潛在合作對象 |
| 核心用途 | 公司與服務資訊、合作流程、展示瀏覽、需求整理與參考試算 |
| 正式網址／部署 | `https://www.xplorekaleidoscope.com/`；自有 GitHub Actions → GitHub Pages，網域根路徑 |
| 維護狀態 | 持續維護；驗收缺口見下方報告 |
| 最後更新 | 2026-11-27 |

分類及資訊結構依公司 [README 範本](https://github.com/xk2022/xplore-kaleidoscope/blob/76252e621ecb5c508494b49d4cd1eabd340b7e81/06_engineering/website-project-readme-template.md)與[網站分類規範](https://github.com/xk2022/xplore-kaleidoscope/blob/76252e621ecb5c508494b49d4cd1eabd340b7e81/06_engineering/website-repository-naming.md)。保留既有 repo 名稱；網站分類不觸發改名或 DNS 變更。

## 功能與使用界線

| 功能 | 入口／用途 |
| --- | --- |
| 公司與服務資訊 | `/about/`、`/services/`：定位、能力、服務及合作流程 |
| 解決方向 | `/solutions/`：需求情境及相關服務，依實際規劃狀態標示 |
| 作品瀏覽 | `/portfolio/` 與已登錄詳頁；保留品牌提案、第三方模板署名及技術規劃狀態 |
| 聯絡需求整理 | `/contact/`：檢查、預覽、複製摘要及開啟 Email 草稿，由訪客自行寄出 |
| 方案參考試算 | `/quotation/`：選項與費用狀態、標準 A4 摘要、固定 QR 及 Email 詢價草稿 |
| Design Collection | `/design-collection/`：Modern、Heritage、Luxury 三種呈現，共用內容與互動核心 |

既有正式網站已有三系列各 16 頁＋Gallery，共 49 個公開 URL。Design Collection 是官網內的呈現系列，並非不同服務等級或另一個公司。本站的正式 www／Pages 部署與作品集的 XK Showcase Hub 分開管理；不把此 repo 改成中央展示平台，也不填入未確認的展示 slug 或網域。

展示、提案與規劃不等於客戶交付。試算保留參考／待審價格、面議及一次／年度費用差異，不是正式報價、訂單或付款承諾。Contact／Quotation 沒有站內直接收件端點；個人欄位只留目前頁面記憶體，試算 LocalStorage 僅保存選項 ID。詳見[聯絡流程](docs/reports/contact-inquiry-form.md)與[試算規格](docs/task/quotation-estimator-v1.md)。

## 交付與驗收狀態

正式官網持續運作，與新一輪 release acceptance 分別追蹤。使用者已授權 [PR #45](https://github.com/xk2022/xk-website/pull/45) 合併及部署；實際 merge、main CI、發布版本與公開驗證以 PR／部署紀錄為準。本次資料夾整理也須核對其實際發布版本，不能由授權或本機建置推認已部署。

DC-007／R01 驗收仍 **FAIL／BLOCKED**：三系列 Quotation 的正式 TBT 中位數仍超過 200ms；Pages 有原始 required-image abort／完成狀態未知；Required 真人讀屏紀錄仍缺。改善、限定人工補證、CI 或部署成功都不會自動關閉這些缺口。原 FAIL、incomplete 與重驗界線保留於 [DC-007 報告](docs/reports/dc007-implementation.md)及 [R01 效能與回歸報告](docs/reports/dc007-r01-performance.md)。

SEO 維持 noindex／nofollow、Sitemap 未發布；Privacy 為受控草案。索引、法律、聯絡收件服務及品牌素材遷移各有自己的核准門檻。

## 技術與目錄

Next.js 16.4.6 App Router、React 19.3.1、TypeScript、Tailwind CSS 4、shadcn/ui 與 Lucide。前端使用集中式 TypeScript 設定；目前沒有 Backend、資料庫或 CMS。精確依賴以 [frontend/package.json](frontend/package.json) 與 [鎖定檔](frontend/package-lock.json)為準。

```text
xk-website/
├── frontend/                 前端套件、框架設定與建置工作目錄
│   ├── src/                  頁面、元件、內容設定及共用邏輯
│   ├── public/               靜態素材
│   ├── scripts/              前端建置與測試工具
│   ├── package.json
│   └── package-lock.json
├── backend/                  預留，尚無後端實作
├── infrastructure/           預留
├── tests/e2e/                預留跨元件 E2E 目錄
├── scripts/                  跨目錄驗收與證據工具
├── docs/                     規格、工程指南、報告及歷史證據
├── .github/workflows/        品質檢查與正式 Pages 工作流程
├── AGENTS.md
└── README.md
```

前端來源、資產與套件統一放在 `frontend/`；未啟用目錄以 README／`.gitkeep` 保留，不表示已建置相應系統。歷史 raw 證據維持原 bytes，移動後的定位與驗證依本輪路徑映射，不改寫舊測試結果。

## 本機開發與驗證

使用 Node.js 24.x 與 npm；HTTP smoke／證據工具另需 Python 3。從 repo 根目錄開始，以下指令在同一個 shell 執行：

```sh
cd frontend
npm ci
npm run dev
```

開啟 <http://localhost:3000>。一般開發不需要後端；Privacy 的受控預覽旗標不可用於公開部署。

品質與一般正式建置也在 `frontend/` 執行：

```sh
npx next typegen
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run start` 提供一般 Next.js production 模式。停止該服務後再執行 Pages 建置，兩種模式共用 `frontend/.next/`：

```sh
npm run build:pages
python3 -m http.server 3281 --bind 127.0.0.1 --directory out
```

Pages 產物位於 `frontend/out/`，本機靜態預覽為 <http://127.0.0.1:3281/>。正式效能量測須遵循固定 profile 與 server 契約，不能用此簡易預覽替代。定向測試入口為 `npm run test:quotation`、`npm run test:design-collection`、`npm run test:fonts`；HTTP smoke 使用 `npm run test:smoke -- --base-url <實際網址>`。所有測試結果須綁定實際版本，詳見工程指南。

## 部署、維護與文件

正式 www 由本 repo 的 [GitHub Actions](.github/workflows/ci.yml) 部署到 GitHub Pages，保留空 basePath／assetPrefix；一般 Next.js build 相容路徑也保留。Vercel 尚無本 repo 的正式環境驗收紀錄。公開 URL、深層 reload、資產及主要操作要對實際部署版本另驗；授權合併、CI、部署及 DC-007 acceptance 是不同事實。

| 文件入口 | 用途 |
| --- | --- |
| [文件總索引](docs/README.md) | 現行分類與完整文件入口 |
| [AGENTS](AGENTS.md)／[協作流程](docs/03_engineering/subagent-workflow.md) | 權責、來源、分支與驗收規則 |
| [任務索引](docs/task/README.md)／[Roadmap](docs/task/ROADMAP.md) | 規格、進度與當前工作 |
| [工程索引](docs/03_engineering/README.md)／[Smoke](docs/03_engineering/website-smoke.md) | 程式、驗收及工具使用 |
| [Design Collection 維護](docs/03_engineering/design-collection-maintenance.md) | 共用內容、路由、切換、print 與 rollback |
| [效能量測](docs/03_engineering/performance-measurement.md)／[字型維護](frontend/src/app/fonts/README.md) | 固定量測及字型來源／重生契約 |
| [網域部署](docs/04_deployment/custom-domain-deployment.md)／[發布準備](docs/04_deployment/publication-readiness.md) | 正式網址與尚需核准的公開事項 |
| [DC-007](docs/reports/dc007-implementation.md)／[R01](docs/reports/dc007-r01-performance.md) | Known Issues、實際結果與原始證據界線 |

品牌、自有內容與第三方素材各依權利及來源使用；公開 repo 不等於授權轉用全部內容。字型 OFL 與模板署名保留，其他授權範圍由權利人確認。
