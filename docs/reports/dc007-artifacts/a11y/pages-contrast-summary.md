# DC-007 Pages：384 個 incomplete 限定對照

**384／384 paint inputs 精確對應**：354 漸層沿用已證明的 normal v2 公式／界限，30 選單遮蔽另有 Pages 實際 closed／open 補採；未知 0，沒有已證明的對比缺陷。這是 **PASS_SCOPED_PAGES_CONTRAST_PENDING_FINAL_RAW_LINK**：最終正式 raw 連結由 Root 在完整 suite 結束後核對，不預填整套退出碼。

- `pages-axe-projection.json` 在 119 個正式 AXE records 及其 119 個 PASS test records 完成後固定，含原 manualStyles／incomplete／axePlan／source 及完成紀錄；當時整套仍 PENDING，不使用仍變動整檔 SHA 當 freeze。投影 SHA：`0ab803fbcbf958837b314d07097b4edd1aab5f588a53762e7f32a6c3ca278509`。
- `pages-contrast-bridge.json` 是逐 384 row map，逐筆保留 Pages selector／JSON pointer／原 test ID、對應 normal v2 row／minimumContrast 與判斷。所有 color／font／祖先／位置幾何／實際面板／9 點 hit／related／viewport 輸入相同；沒有重算同一 384 公式或重抓 31 state。
- 27 個 HTML 差異只限已核定公開內鏈的一個尾斜線，含不變合法 semantic hash；其中 20 個 selector 分五種明列 href-suffix alias。逐項以獨立 49-route fixture 核對 path／anchor，沒有任意 URL normalization，也沒有略過其他 HTML／paint 差異。
- 五份 normal 實際 runtime CSS 在 Pages 皆重新 HTTP 200、原 bytes SHA 相同。三個實際 Pages menu 共 30 closed／open target pairs 與 normal fresh paint／effects／panel／geometry 完全相同；每個 open box 完整遮蓋、9／9 panel top hits。六張 Pages PNG 均已逐張檢視，見 `visual-review-pages.json`。

真實 OS 收據：`pages-projection-command.json`、`pages-menus-v1-command.json`、`pages-bridge-command.json` 皆 Exit 0；它們不是完整 Pages suite 退出碼。新 collector 保留 15 筆 HEAD fetch abort，未將其視為網路通過或通用白名單。正式 Pages 的 119 scans、0 violations、384 incomplete 與 normal 原 suite Exit 1 均保持原樣，不宣稱真人 AT 或完整 WCAG。

Root 完整 suite 結束後執行並保存收據：

```sh
python /tmp/xk-dc007/a11y/project-pages-contrast-v2.py --input /tmp/xk-dc007/pages-final/result.json --compare /tmp/xk-dc007/a11y/pages-axe-projection.json
```

該工具會核對完整 frozen 投影相同並輸出最終 raw SHA；若投影有變，這份橋接不可直接沿用。所有 browser 已結束，可以進行獨占效能採樣。

v2 最終核對 helper 與原投影函式相同，僅加上 `finishedAt`／非 running 狀態守門；初始 helper／projection／收據均保留，避免尚未結束的 raw 被標成 final。
