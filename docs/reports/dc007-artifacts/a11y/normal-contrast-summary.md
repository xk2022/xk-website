# DC-007 normal：384 個對比 incomplete 限定覆核

本輪 **384／384 已逐項判讀**：354 個實際漸層 paint bound、30 個完整不透明選單遮蔽及相同 closed target 對比，未發現已證明的對比缺陷，未知 target 0。這是本次目標範圍的判斷；原 normal suite **Exit 1、119 scans、0 violations、384 incomplete 全部保留**，不是將 axe incomplete 改為 0，也不替代真人讀屏或完整 WCAG 認證。

- Final row map：`adjudication-normal-v2.json`，每項有原 test ID／axe index／JSON pointer、原 HTML、fresh HTML／target／text／font 比對、actual surface、漆層、threshold／contrast 及遮擋結論。
- Fresh collector：31 個原 route／width／state、384 個 target 全數找到；保留原 response HTML gzip、五份實際 runtime CSS、三份 source snapshot 及 SHA，source snapshot 與正式 freeze 相同。三個選單各實際 closed／open，共六 PNG；另有四張代表漸層畫面，十圖均已檢視（詳 `visual-review-normal.json`）。
- 354 個梯度分層：257 light surface radial＋49 white section radial＋30 white figure masked conic＋18 dark figure。Home dark figure 額外計入 axe related 未列出的兩條 9% grid；mask 只會降低 alpha，不當作另一種漆色。最近 opaque 表面與後繪的 relative foreground context 由 fresh DOM／computed style 證明，沒有以純白預設代替實際背景。
- 24 個展開選單下方 gradient target 另保守包住真實 8% menu shadow，對 text/background 共同 alpha 分 1,000 個封閉區間計算界限。最小 gradient 下限 **4.7932155:1**；所有原門檻均為 4.5:1 或 3:1。最小 closed target 比值 **4.9747527:1**。
- 30 個 bgOverlap 每個 box 完全被實際不透明白色 panel 遮住，各有 9／9 topmost panel hit。關閉選單後相同 target／text 另算 passing paint，不替不可見 glyph 杜撰白底對比；沒有部分遮擋待猜測項。

真實 OS 收據：`capture-normal-v1-command.json` Exit 1（sandbox Chromium launch SIGTRAP／setsockopt，不是 App 對比失敗）；`capture-normal-v2-command.json` Exit 0（僅補 local-browser network 權限）；`adjudicate-normal-v2-command.json` Exit 0。原始失敗與 v1 數值初稿均保留，最終以 v2 含 menu-shadow 的 row map 為準。

Focused collector 另保留六筆 aborted GET fetch；它的 Exit 0 只證明 paint 補採完整，沒有宣稱網路通過。正式 suite 的 attribution／GET script cancel 由其他 owner 處理。本工作未修改 App、正式 QA 工具或原 suite，未重跑 axe/full suite，沒有執行 Pages；Pages 若沿用須另有精確 target/state/HTML/CSS bridge。
