---
id: XK-DOC-0901
kind: document
title: 官網 Repository 結構與操作入口
status: reference
version: "1.0"
source: https://github.com/xk2022/xplore-kaleidoscope/blob/76252e621ecb5c508494b49d4cd1eabd340b7e81/06_engineering/website-project-readme-template.md
---

# 官網 Repository 結構與操作入口

更新：2026-11-27。公司文件版本為 `76252e621ecb5c508494b49d4cd1eabd340b7e81`。本次使用者要求整理既有專案並合併部署，採用公司共用首層 `frontend/`；2026-11-20 的 `frontend/website/` 是未採行的歷史規劃。只修改官網庫，不修改公司文件庫。

## 實際結構

```text
xk-website/
├── .github/workflows/       # 品質、靜態輸出與 main Pages 發布
├── .nvmrc                  # 共用 Node.js 24 版本
├── docs/                   # 設計、工程、任務、報告及證據
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── components.json
│   ├── src/                # 原 App Router、元件、設定、共用邏輯
│   ├── public/             # 品牌、圖片、圖示、QR、授權文字
│   └── scripts/            # 前端建置、單元測試、fixtures、HTTP smoke
├── backend/.gitkeep         # 共用結構保留；未實作後端
├── infrastructure/.gitkeep  # 保留；實際 Pages 設定仍在 .github/
├── tests/e2e/.gitkeep       # 保留；未新增 npm E2E 測試框架
├── scripts/                # 跨元件回執與歷史證據引用驗證
├── AGENTS.md
└── README.md
```

`backend/`、`infrastructure/`、`tests/e2e/` 的保留目錄不是已實作功能。沒有新增 Backend、API、資料庫、Docker、CMS、Analytics 或 npm dependency。Next.js、React、TypeScript、Tailwind CSS 4、shadcn/ui、Lucide 與既有鎖定版本均沿用。

## 日常操作

從 Repository 根目錄執行：

```sh
cd frontend
npm ci
npm run dev
```

品質指令同樣在 `frontend/`：

```sh
npx next typegen
npx tsc --noEmit
npm run lint
npm test
npm run build
npm run build:pages
```

一般 production 使用 `frontend/.next/`，靜態輸出使用 `frontend/out/`。一般 build／server 驗收與 Pages build／server 依序執行，避免覆寫同一個 `.next/`。使用根目錄回執工具時指定實際前端工作目錄：

```sh
cd frontend
python3 ../scripts/run-with-evidence.py \
  --receipt /tmp/xk-build.json --log /tmp/xk-build.log \
  --timeout 600 -- npm run build:pages
```

CI 的 shell 指令工作目錄為 `frontend/`；npm cache lockfile 為 `frontend/package-lock.json`，Node 版本檔仍為根 `.nvmrc`。Upload action 使用明確的 `frontend/.next/`、`frontend/out/`，不依賴 shell 的 working-directory。

Tailwind 掃描明確以 `frontend/` 為 base，符合 Turbopack 的專案邊界；`globals.css` 原文件排除路徑同步加上一層，根文件本身不再屬於前端自動掃描範圍。首次嘗試掃描整個 Repository 造成 outside-configured-roots 建置失敗，原失敗保留後改正。這是工作區邊界修正，不重新設計 tokens 或為了分數移除樣式；以真實建置產物與頁面驗證差異，不只看來源路徑判定畫面相同。

## 歷史證據與連結

歷史 Task、測試原件、JSON／gzip、圖片及 manifest 不搬移、不重寫狀態或雜湊。新舊原始碼對照見 [repository-path-map.json](../98_decisions/repository-path-map.json)。歷史報告中描述當時 `src/`／`public/` 的文字仍屬原時點；可點擊的文件連結調整至實際新位置。

有些 immutable manifest 的 `repo-reference` 指向搬移前的字體。使用以下工具先找原路徑，只有原路徑不存在才套用明確對照，並驗證原 encoded／raw SHA、大小與 gzip；不能以新路徑掩蓋原檔的雜湊錯誤：

```sh
python3 scripts/validate-evidence-references.py \
  --repo . --output /tmp/xk-evidence-references.json
```

歷史 source snapshot 不代表目前來源清單；重播舊測試須使用當時固定的 Git commit，不能把搬移前的 PASS 改稱搬移後實測。根 `.gitignore` 同時保留舊快取忽略及新的 `frontend/` 產物規則；本機舊的 ignored 快取不是正式 Repository 結構，不提交或刪除使用者的暫存工作。

## 部署適用範圍

本庫是 XK 自有企業形象官網，維持 `https://www.xplorekaleidoscope.com/`、空 basePath 及既有 GitHub Actions → GitHub Pages。公司 README 範本的 Showcase Hub／slug 用於作品集展示，不把正式官網改為展示子目錄，也不修改其他 Repository、DNS 或 Custom Domain。

使用者已於本次明確授權 PR #45 合併與部署；這取代 R01 開發階段的 no-merge/no-deploy 限制。合併、CI、部署與公開實測分別記錄於同一 PR。原 [R01 效能 FAIL、網路未知與真人 AT BLOCKED](../reports/dc007-r01-performance.md) 繼續保留，合併不表示完整 DC-007 驗收通過，也不批准法律政策、索引或品牌遷移。
