XK Website — Task 002
品牌設計系統（Brand Design System）建置
一、專案基本資訊

專案名稱：Xplore Kaleidoscope

Repository：xk-website

品牌縮寫：XK

品牌標語：

Explore Possibilities. Create Digital Value.

技術標語：

Building Digital Solutions with Web, Java & AI.

前置任務：

Task 001 — Repository Bootstrap

本次任務：

Task 002 — Brand Design System Implementation

二、任務目標

建立一套完整、可重複使用且容易維護的 XK 品牌設計系統。

本次工作的重點不是開發完整首頁，而是建立未來所有網站頁面都能共用的視覺基礎及 UI Components。

完成後，應能支援後續：

Header / Footer
Homepage
About
Services
Solutions
Portfolio
Contact

請優先考慮品牌一致性、元件重用性、響應式設計及未來擴充能力。

三、執行前檢查

開始修改前，請先檢查：

閱讀 AGENTS.md。
閱讀 docs/implementation-notes.md。
檢查 src/app/globals.css。
檢查 src/app/layout.tsx。
檢查現有 Components。
檢查 package.json。
檢查 components.json。
確認目前 Git Branch 及工作目錄狀態。

請保留 Task 001 已完成的 Next.js 架構及設定。

不要重新初始化專案。

不要覆蓋或刪除既有功能。

如果發現規格衝突，請先以已確認的品牌決策為準，並在執行報告中說明。

四、品牌識別方向

品牌名稱：

Xplore Kaleidoscope

品牌縮寫：

XK

品牌設計方向：

Geometric Kaleidoscope
XK Letterform
Geometric Symmetry
Modern Technology
Professional
International
Clean Corporate Design

視覺設計要求：

使用幾何對稱及多層次結構作為設計靈感。
XK 字母組合應具有辨識度。
整體風格保持現代科技感。
避免過度複雜或裝飾性過強。
必須適合企業官網及未來 SaaS 產品。
桌面及手機版都必須保持良好視覺效果。

重要：

目前 Logo 尚未正式核准。

本次建立的 XK Logo 僅為 Provisional Logo（暫定版本）。

不得將暫定 Logo 描述為最終核准的品牌識別。

五、品牌色彩系統（Color System）

以下色彩為已確認的初期品牌色彩，不得任意替換。

Token HEX 用途
Primary #101A33 品牌主色
Secondary #3157D5 品牌輔助色
Accent #19B8D5 強調色
Background #FFFFFF 主要背景
Surface #F5F7FB 區塊背景
Foreground #172033 主要文字
Muted #667085 次要文字
Border #E4E8F0 邊框

實作要求：

使用 CSS Custom Properties。
遵循 Tailwind CSS 4 的 CSS-first 設計方式。
建立語意化色彩 Tokens。
將品牌色彩與 UI 元件樣式分開管理。
避免在各個 Component 重複硬編碼 HEX。
注意文字與背景的對比度。
保留未來擴充 Dark Mode 的可能性，但本次不需要實作 Dark Mode。

另外，請特別注意：

Muted 代表次要文字顏色。

Surface 代表區塊背景顏色。

不要混淆兩者在 shadcn/ui 中的語意用途。

六、字體及排版系統（Typography）

沿用 Task 001 已設定的字體：

Inter
Noto Sans TC

不得無故替換字體。

建立以下 Typography Roles：

樣式 用途
Display 首頁大型標題
H1 頁面主標題
H2 區塊標題
H3 卡片及子標題
Body Large 重要說明文字
Body 一般內文
Body Small 輔助文字
Caption 標籤及註解
Button 按鈕文字

實作要求：

使用 Responsive Typography。
定義合理的 Font Size。
定義一致的 Font Weight。
設定適當的 Line Height。
中英文混合文字必須有良好的閱讀體驗。
中文文字避免使用過大的 Letter Spacing。
優先考慮可讀性，而非單純追求視覺效果。
七、Design Tokens 建置

建立集中管理的設計 Tokens。

至少包含：

7.1 Colors

品牌色彩及語意化 UI 色彩。

7.2 Typography

字體、字級、字重及行高。

7.3 Spacing

建立統一的間距尺度。

建議使用 Tailwind CSS 預設間距系統，避免自行創造大量不一致的數值。

7.4 Border Radius

建立統一的圓角規範。

例如：

Small
Medium
Large
Extra Large
Full
7.5 Shadows

建立：

Subtle
Default
Elevated
7.6 Container

定義：

Maximum Width
Horizontal Padding
Responsive Container
Section Spacing
7.7 Motion

定義：

Transition Duration
Easing
Hover Transition

必須尊重 prefers-reduced-motion。

避免不必要的動畫及複雜視覺效果。

八、共用 UI Components

請建立或完善以下元件：

text
src/
└── components/
├── ui/
│ ├── button.tsx
│ └── card.tsx
│
├── layout/
│ ├── container.tsx
│ └── section.tsx
│
└── brand/
└── xk-logo.tsx

可依照現有架構調整，但應保持職責清楚。

8.1 XK Logo

建立可重複使用的幾何 XK Logo。

設計要求：

使用 Inline SVG 或 CSS Geometry。
具有 XK 字母組合概念。
具有幾何對稱及 Kaleidoscope 設計元素。
支援不同尺寸。
支援淺色及深色背景。
提供適當的 Accessible Label。
不依賴未授權的外部 Logo 圖片。

請使用清楚的 Component Props，例如：

size
variant
showWordmark
className

Logo 必須標示為暫定版本。

不要將它描述為最終品牌 Logo。

8.2 Button

建立統一的 Button Component。

至少支援：

Primary
Secondary
Outline
Ghost

尺寸：

Small
Medium
Large

要求：

Hover State
Focus State
Disabled State
Accessible Interaction
Responsive Layout

優先沿用已安裝的 shadcn/ui Button。

不要重複建立功能相同的 Button。

8.3 Card

建立可重複使用的 Card Component。

支援：

Default Card
Interactive Card
Optional Icon
Title
Description
Consistent Padding
Consistent Border Radius

避免過度設計。

8.4 Container

建立共用 Container。

統一管理：

Maximum Width
Horizontal Padding
Responsive Width
8.5 Section

建立共用 Section。

支援：

Default Background
Surface Background
Consistent Vertical Spacing
Optional ClassName
九、品牌視覺元素

建立可重複使用的視覺設計：

Geometric Grid Background
Kaleidoscope-inspired Pattern
Subtle Gradient Accent
Decorative Geometric Shapes
Brand Color Background Variations

設計原則：

視覺簡潔。
幾何結構明確。
保持專業企業形象。
不要使用過度鮮豔的漸層。
避免大量 Glassmorphism。
避免不必要的動畫。
注意手機版效能。

裝飾性元素不得影響主要內容的可讀性。

十、Design System Showcase

如果有助於驗收，可以建立開發用的 Design System Showcase。

展示內容：

XK Logo Variations
Brand Colors
Typography
Buttons
Cards
Container
Section
Geometric Background

注意：

這是開發及驗收工具，不是正式公開頁面。

不得讓未完成的 Design System Showcase 出現在正式網站導覽中。

十一、程式碼品質要求

必須符合：

TypeScript Strict Mode。
Component Reusability。
Semantic HTML。
Accessibility。
Responsive Design。
Consistent Naming。
Centralized Design Tokens。
Maintainable Code Structure。

不要加入不必要的第三方套件。

不要實作：

Spring Boot Backend
PostgreSQL
Contact API
AI Chatbot
Analytics
假客戶案例
假客戶評價
未經確認的公司統計資料
十二、響應式測試

至少檢查以下寬度：

裝置 Viewport
Small Mobile 320px
Mobile 375px
Tablet 768px
Desktop 1440px
Large Desktop 1920px

確認：

沒有水平溢出。
Logo 顯示正常。
字體大小合理。
Button 可正常操作。
Card 間距一致。
中文排版正常。
Geometric Decoration 不會遮蔽內容。
十三、Git Workflow

建立 Feature Branch：

feature/website-brand-design-system

不要直接修改 main。

不要自動 Merge。

完成後建立 Pull Request，等待審核。

十四、驗收指令

請實際執行：

bash
npm run lint
npx tsc --noEmit
npm run build

如果有建立 Design System Showcase，請實際檢查其顯示效果。

不得僅根據程式碼推測測試成功。

十五、完成報告

完成後請使用繁體中文回報：

新增檔案。
修改檔案。
Brand Design Tokens。
Color System。
Typography System。
XK Logo 設計說明。
UI Components。
Geometric Visual Elements。
Responsive 測試結果。
Accessibility 測試結果。
TypeScript 結果。
ESLint 結果。
Production Build 結果。
Git Branch。
Pull Request。
尚未完成事項。

如有可能，提供以下截圖：

Logo Variations
Brand Color Palette
Typography
Button Variations
Card Variations
Design System Showcase
十六、完成定義（Definition of Done）

本次任務完成後，XK 官網必須具備：

完整的品牌色彩 Tokens。
統一的 Typography System。
可重複使用的 XK Logo。
共用 Button Component。
共用 Card Component。
共用 Container Component。
共用 Section Component。
可延伸的 Geometric Visual Elements。
Responsive Design。
通過 TypeScript、ESLint 及 Production Build。

本次只完成 Brand Design System。

不要提前開發完整 Homepage。

不要開發 Backend。

不要變更任何已確認的品牌及技術決策。

最終目標：

建立能支援 Xplore Kaleidoscope 官方網站及未來 AI SaaS 產品的統一品牌設計基礎。

Explore Possibilities. Create Digital Value.
