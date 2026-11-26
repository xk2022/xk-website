# DC-003 實際畫面

日期：2026-11-26。來源與結果見 [驗證報告](../../../reports/dc003-implementation.md)。

- [Gallery 手機 375px](gallery-375.png)、[Gallery 桌面 1440px](gallery-1440.png)。
- `baseline/` 是同環境、搬移前 main 794b076 的 Home／Services／Portfolio／Contact／Quotation，各 375／1440px；`pages/` 為搬移後同組十張實際 full-page PNG。
- `comparison/` 是明示的衍生裁切／差異圖，保留原始畫面。十組 Footer 前嚴格 pixel delta 皆 0；新增 Gallery li 使 Footer 多一列。Header 僅兩個對應的 React useId 改名，詳細 DOM 證明在證據中。
- [一般模式原 PDF](a4/normal.pdf)、[Pages 原 PDF](a4/pages.pdf)，以及 [一般渲染](a4/normal-150dpi.png)／[Pages 渲染](a4/pages-150dpi.png)；17 加購、40／60字測試名稱、兩 QR 均實際驗證。沒有裁切、縮放或修改 PDF。
- `menu/normal/` 與 `menu/pages/` 分別是新收的七張 375×1000 原始展開選單 PNG，用於 contrast incomplete 遮蔽判讀，不是產品裝飾資產。
- Root 已查看十組指定對照的裁切／縮圖、兩寬 Footer 增量、Gallery 兩原圖、兩 PDF 渲染及 menu 圖；沒有文字／圖形截斷或無法解釋的頁面差異。

實際 source hashes、原 `/tmp/xk-dc003/` 路徑、檢查命令與結果保留於 [證據](../../../reports/dc003-artifacts/README.md)。`SHA256SUMS` 核對本目錄所有實際圖檔／PDF（不包含清單自身）。這些本機圖不代表已部署。
