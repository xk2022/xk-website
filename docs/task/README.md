# XK Website Development Tasks

本文件定義 Xplore Kaleidoscope（XK）官方網站的開發任務順序、範圍與交付原則。

所有任務以獨立、可驗收、可追蹤的開發單位執行。每個 Task 原則上只處理一種類型的功能，不將不同頁面、不同技術領域或不同部署工作合併在同一任務。

---

## 1. Repository

| 項目               | 設定                              |
| ------------------ | --------------------------------- |
| Website Repository | `xk2022/xk-website`               |
| Base Branch        | `main`                            |
| Feature Branch     | 每個 Task 使用獨立 Feature Branch |
| Framework          | Next.js                           |
| Language           | TypeScript                        |
| Styling            | Tailwind CSS                      |
| Deployment         | 依各任務指定的平台與設定          |
| Package Manager    | npm                               |

文件 Repository：

- `xk2022/xplore-kaleidoscope`
- 僅供讀取，不得直接修改。

---

## 2. 任務總覽

| Task | 任務名稱               | 開發類型                     | 主要交付                                                   |
| ---- | ---------------------- | ---------------------------- | ---------------------------------------------------------- |
| 001  | Repository Bootstrap   | Repository Infrastructure    | 專案初始化、Next.js、TypeScript、Git、開發環境             |
| 002  | XK Brand Design System | Design System                | 品牌色彩、Typography、Logo、共用 UI 元件                   |
| 003  | Corporate Homepage     | Website Page                 | 首頁、Header、Footer、Navigation                           |
| 004  | About Us               | Website Page                 | 品牌介紹、Mission、Vision、Capabilities、Founder           |
| 005  | Services               | Website Page                 | 服務分類、服務內容、合作流程                               |
| 006  | Solutions              | Website Page                 | 解決方案介紹、需求情境、技術解決方向                       |
| 007  | Portfolio              | Website Page                 | 技術作品集、專案展示、Demo Project                         |
| 008  | Contact                | Website Page                 | 聯絡方式、聯絡表單或其他已確認的聯絡管道                   |
| 009  | Privacy Policy         | Website Page / Legal Content | 隱私權政策                                                 |
| 010  | SEO                    | Technical Optimization       | Metadata、Canonical、Open Graph、Structured Data、Indexing |
| 011  | Performance            | Technical Optimization       | Core Web Vitals、資源最佳化、載入效能                      |
| 012  | Accessibility          | Technical Optimization       | WCAG、鍵盤操作、Focus、螢幕閱讀器相容性                    |
| 013  | Vercel Deployment      | Deployment Infrastructure    | Vercel 專案、Build、Production Deployment                  |
| 014  | Domain Configuration   | Domain Infrastructure        | Custom Domain、DNS、SSL、正式網址                          |

**任務拆分原則：**

- Solutions 與 Portfolio 是兩種不同的頁面目的，分開執行。
- Contact 與 Privacy Policy 是不同類型的內容，分開執行。
- SEO、Performance、Accessibility 各自獨立驗收。
- Vercel Deployment 與 Domain Configuration 分開執行。
- 不得因為功能相互關聯，就將不同任務合併。

---

## 3. 任務執行順序

### Phase 1 — Foundation

| Task | 任務                   |
| ---- | ---------------------- |
| 001  | Repository Bootstrap   |
| 002  | XK Brand Design System |

建立專案基礎環境與品牌設計系統。

### Phase 2 — Corporate Website

| Task | 任務               |
| ---- | ------------------ |
| 003  | Corporate Homepage |
| 004  | About Us           |
| 005  | Services           |
| 006  | Solutions          |
| 007  | Portfolio          |
| 008  | Contact            |
| 009  | Privacy Policy     |

完成官方網站主要頁面。

### Phase 3 — Technical Optimization

| Task | 任務          |
| ---- | ------------- |
| 010  | SEO           |
| 011  | Performance   |
| 012  | Accessibility |

分別改善搜尋引擎、網站效能與無障礙品質。

### Phase 4 — Deployment

| Task | 任務                 |
| ---- | -------------------- |
| 013  | Vercel Deployment    |
| 014  | Domain Configuration |

完成正式部署與網域設定。

---

## 4. 任務文件規範

每個任務必須有獨立 Markdown 文件：

```text
docs/
└── task/
    ├── README.md
    ├── task001.md
    ├── task002.md
    ├── task003.md
    ├── task004.md
    ├── task005.md
    ├── task006.md
    ├── task007.md
    ├── task008.md
    ├── task009.md
    ├── task010.md
    ├── task011.md
    ├── task012.md
    ├── task013.md
    └── task014.md
每份 Task 文件應包含：

任務目標

Repository 與前置條件

開發範圍

功能需求

技術與設計規範

不在本次範圍的項目

預期檔案異動

驗收標準

測試指令

測試結果與交付報告要求

Git Branch、Commit 與 Pull Request 規範

尚未完成事項

不得只記錄預計執行的測試，必須記錄實際執行結果。

5. 共通開發規範
5.1 開發原則
遵循既有 Repository 的 README.md 與 AGENTS.md。

開發前先檢查目前 main 的實際狀態。

以已合併程式碼為基礎，不假設前一任務已完成尚未合併的功能。

優先重用既有 Design System 與共用元件。

不重複建立相同功能的元件或樣式。

不得任意新增 npm Dependencies。

不得自行建立未經核准的品牌資訊、聯絡方式、客戶案例或商業承諾。

不得破壞既有頁面、路由與部署設定。

5.2 Git 規範
每個 Task 使用獨立 Feature Branch。

命名格式：


text
feature/website-{task-name}
Commit 格式：


text
feat(scope): implement feature
fix(scope): resolve issue
docs(scope): update documentation
每個任務必須：

由 main 建立 Feature Branch。

完成開發與測試。

提交 Commit。

建立 Pull Request。

等待 CI 通過。

經審核後合併至 main。

禁止直接修改 main，禁止未經授權自動合併。

5.3 品質檢查
依 Repository 實際設定執行適用的檢查：


bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
如任務涉及靜態匯出或 GitHub Pages，另執行：


bash
npm run build:pages
不得只因為指令存在，就宣稱已通過測試。必須確認實際執行結果與 Exit Code。

5.4 瀏覽器驗收
涉及網站頁面的任務，應依實際需求驗收：

Desktop / Tablet / Mobile Responsive。

頁面內容及元件完整性。

Header、Footer、Navigation。

站內連結及錨點。

Console、Runtime 與 Network Errors。

Keyboard Navigation。

Focus Visibility。

Reduced Motion。

Accessibility 自動掃描及必要人工檢查。

SEO Metadata。

靜態輸出與 Base Path（適用時）。

5.5 截圖
涉及視覺頁面的任務，必須產出實際網站截圖。

建議存放位置：


text
docs/screenshots/
至少包含：

Desktop Full Page

Mobile Full Page

重要內容區塊

截圖必須來自實際執行的網站，不得使用示意圖冒充驗收結果。

6. 測試報告與交付要求
每個 Task 必須產出獨立實作紀錄：


text
docs/
└── task-{name}-implementation.md
交付報告至少包含：

項目

必要內容

Repository

Repository 名稱

Base Commit

開發基準 Commit

Feature Branch

實際分支名稱

Commit

實際 Commit SHA

Pull Request

實際 PR 編號與網址

CI

實際執行結果

TypeScript

實際執行結果

Lint

實際執行結果

Build

實際執行結果

Browser QA

實際驗收結果

Responsive

實際檢查尺寸

Accessibility

實際掃描及人工檢查結果

Screenshots

實際產出檔案

Known Issues

已知問題及限制

Deployment

是否已合併及公開發布

測試結果標示
統一使用以下狀態：

PASS：實際執行並通過。

FAIL：實際執行但未通過。

NOT RUN：尚未執行。

BLOCKED：受外部條件阻礙。

N/A：不適用，並說明原因。

禁止：

將預計執行描述成已通過。

虛構 Commit SHA、PR 編號或 Actions Run ID。

使用舊任務的測試結果代替本次驗收。

將 PR 建立描述成已合併。

將 CI 通過描述成已正式發布。

7. 任務完成定義（Definition of Done）
每個 Task 必須符合以下條件，才能標記為完成：


符合 Task 原始需求。

沒有超出任務範圍的未授權變更。

程式碼符合 Repository 規範。

TypeScript 檢查通過（適用時）。

Lint 通過（適用時）。

Build 通過。

完成適用的瀏覽器驗收。

完成必要的 Responsive 與 Accessibility 檢查。

產出必要截圖。

更新實作紀錄及測試報告。

建立 Pull Request。

CI 結果有實際紀錄。

未完成事項與限制清楚列出。
任務的程式碼完成、PR 通過、合併及正式發布是不同狀態，必須分別記錄。

8. 任務相依性

text
Task 001 Repository Bootstrap
    |
    v
Task 002 XK Brand Design System
    |
    v
Task 003 Corporate Homepage
    |
    +--> Task 004 About Us
    |
    +--> Task 005 Services
    |
    +--> Task 006 Solutions
    |
    +--> Task 007 Portfolio
    |
    +--> Task 008 Contact
    |
    +--> Task 009 Privacy Policy
              |
              v
       Task 010 SEO
              |
              v
       Task 011 Performance
              |
              v
       Task 012 Accessibility
              |
              v
       Task 013 Vercel Deployment
              |
              v
       Task 014 Domain Configuration
說明：

Task 001、002 為後續網站開發基礎。

Task 003 提供共用網站外框及導覽。

Task 004–009 為獨立頁面任務，可依實際相依條件安排。

Task 010–012 為獨立技術品質任務。

Task 013、014 分別處理部署與網域。

實際執行時仍須以各 Task 的前置條件與 Repository 現況為準。

9. 目前任務進度
以下為任務規劃清單，不代表所有任務已完成或發布。

Task

任務名稱

狀態

001

Repository Bootstrap

依 Repository 紀錄確認

002

XK Brand Design System

已有實作紀錄

003

Corporate Homepage

已有實作紀錄

004

About Us

已有實作紀錄

005

Services

已有實作紀錄

006

Solutions

待依獨立規格執行

007

Portfolio

待建立獨立規格

008

Contact

待建立獨立規格

009

Privacy Policy

待建立獨立規格

010

SEO

待建立獨立規格

011

Performance

待建立獨立規格

012

Accessibility

待建立獨立規格

013

Vercel Deployment

待建立獨立規格

014

Domain Configuration

待建立獨立規格

10. 最終原則
一個 Task 對應一種類型的開發工作。

一個 Task 必須具備獨立規格、實作紀錄及驗收報告。

不得將未執行的測試標記為通過。

不得虛構品牌、商業、技術或部署成果。

不得破壞已完成且已合併的功能。

不得未經授權修改文件 Repository。

所有功能以 Pull Request 審核及合併為交付流程。

正式發布必須有實際部署證據。

本 README 為 XK 官方網站開發任務的總索引。各 Task 文件是個別工作的正式執行規格；若有範圍衝突，以最新核准的 Task 規格及已合併的 Repository 實際狀態為準。
```
