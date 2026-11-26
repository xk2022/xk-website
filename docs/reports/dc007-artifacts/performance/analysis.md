# DC007 效能實測分析

更新：2026-11-26T17:50:18.749307+00:00

18/18 cold 已完整量測，六組 LCP／CLS 符合門檻，六組 TBT 均未達 200ms。採樣完整與性能通過是不同結果：`captureStatus=COMPLETE`、`targetStatus=FAIL`；outer durable runner 實際 `exitCode=1`，18個 Lighthouse 子程序均真實 `exitCode=0`，並非採樣中斷或丟棄失敗樣本。

## 版本、條件及可重現範圍

本輪是 **release-candidate baseline**，沒有 App 語意優化的第二版本，不產生 before/after 或改善率。DC007 local artifact strictcheck 實際2942/2942 PASS：49公開頁、516檔、164非HTML/RSC runtime檔（6CSS、21JS、115fonts及其他static），對既有已驗收DC006輸出只容許真實Next BuildID差異。此輸出等價證據不替代本輪效能實測或其他可及性驗收。

- 來源清冊：`/tmp/xk-dc007/source.json`，SHA256 `374151b8c4a42b0bc2546c6fa6baccca75bb54b3c474814e1f0601e7a85fe6e9`。
- cold harness SHA256 `4c805219bded958383a4ace0b9ecc3671b771a122769c54bcdef5e5af66bf2f8`；固定mobile config SHA256 `4f0810f189f3cc1960de5a9c57de728f97ec647d3b44932061c51885441f097a`。
- Pages：`http://127.0.0.1:3281/`，同一受控輸出、同一 server；gzip6預先壓縮，`/_next/static/`快取600秒，HTML no-cache／ETag。
- Mobile375×812、DPR1、CPU slowdown4、RTT150ms、download200000Bps、upload93750Bps，Lighthouse13.6.0、Chromium156.0.8078.79、Node24.22.1。18份configSettings逐項相等，工具版本一致。
- 每次cold使用新的Chrome process/profile，storage reset啟用；固定每頁連續3次，依Modern Home→Modern Quotation→Heritage Home→Heritage Quotation→Luxury Home→Luxury Quotation，不選樣本。
- Root提供獨占採樣時窗；其間無QA/PDF/axe/build/AT render。這是執行協調條件，不聲稱能控制虛擬主機的實體頻率或其他host負載。
- 原始JSON/HTML、trace、DevTools network log、每run receipt/log均在`cold/`；最外層真OS wait回執為`cold-process.json`。

## 全部六組 cold 結果

判定事先固定：每組3有效樣本，median LCP≤2500ms、CLS≤0.1、TBT≤200ms。表內 values 保留所有三筆；未四捨五入的數值在`cold/summary.json`與`analysis.json`。

| 風格／頁面 | LCP ms values；median [min–max] | CLS values；median [min–max] | TBT ms values；median [min–max] | 結果 |
|---|---|---|---|---|
| modern/home | 2037.639, 1889.860, 1857.614; **1889.860** [1857.614–2037.639] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1552.949, 1814.294, 965.657; **1552.949** [965.657–1814.294] | **FAIL：TBT** |
| modern/quotation | 1741.013, 1681.946, 1705.993; **1705.993** [1681.946–1741.013] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1064.019, 1503.269, 1294.676; **1294.676** [1064.019–1503.269] | **FAIL：TBT** |
| heritage/home | 1570.242, 1722.188, 1629.815; **1629.815** [1570.242–1722.188] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1827.308, 1278.147, 1441.245; **1441.245** [1278.147–1827.308] | **FAIL：TBT** |
| heritage/quotation | 1652.054, 1649.699, 1704.771; **1652.054** [1649.699–1704.771] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1107.293, 1225.644, 1280.872; **1225.644** [1107.293–1280.872] | **FAIL：TBT** |
| luxury/home | 1917.021, 1606.242, 1661.712; **1661.712** [1606.242–1917.021] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1432.559, 1305.136, 1079.977; **1305.136** [1079.977–1432.559] | **FAIL：TBT** |
| luxury/quotation | 1765.885, 1592.110, 1870.050; **1765.885** [1592.110–1870.050] | 0.000, 0.000, 0.000; **0.000** [0.000–0.000] | 1181.541, 1201.206, 1257.659; **1201.206** [1181.541–1257.659] | **FAIL：TBT** |

所有18筆LCP≤2500ms、CLS=0；所有18筆TBT>200ms，並非只有中位數或單一離群值失敗。

## 原始證據支持的瓶頸

`cold-home-diagnostic.json`保留Modern Home三份report與trace SHA、真子程序退出碼、完整mainthread分類、font／layout時序。該三次mainframe Layout合計約1994／2228／1499ms，12／13／13次>50ms Layout緊隨RemoteFontLoaded≤20ms，幾乎整份document（1147個objects）dirty。例：r1 font於3185.860ms完成，3193.028ms開始223.821ms Layout；另一font於3886.427ms完成，3890.759ms開始230.359ms Layout。這些late Layout在初次繪製後持續發生。

Modern Home每run16個font請求實際transfer1,091,912B，約總transfer1,380,352B的79%；現有Noto輸出108個`font-display:swap`子集。此處是實際請求bytes，不把全部115個font產物的容量當初載入下載量。多subset完成後反覆全頁排版，是已重複觀察到的主要成本；不將任一subset或單一URL宣稱唯一原因。

r1 mainthread audit：Style & Layout2129.944ms、Script Evaluation606.617ms、Rendering310.739ms；共享ReactDOM-containing `092r-mewpaf3q.js`中有247.1ms script-evaluation長task。GC在首三run的mainthread事件為5.767ms／14.846ms／無，證據不支持GC是主要瓶頸。報告與trace僅提供共享bundle層級歸因，沒有足夠callstack證明某一自製hook或Link是唯一來源。

CPU4和cloud-host性能影響絕對值，現在沒有隔離硬體與App成本的對照；不能將FAIL直接歸咎環境，也不能宣稱與任何真實手機或公開CDN相同。LCP/CLS合格並不消除載入期長task或保證互動流暢。

## 暖快取及實際互動

6/6 warm capture及實際互動已完成，最外層真OS wait `exitCode=0`，完成於2026-11-26T17:48:56.114Z。每case新context先prime再同context reload，真cache證據不是單憑reload推定；共27個實際動作（menu tap／Escape、Home原生CTA hash、Quotation service／build／addon），全部維持同document timeOrigin且interaction無Document request。

| 風格／頁面 | 真cache證據筆數 | 實際動作 | warm-load LCP ms | CLS | load longtasks | interaction longtasks | max recorded EventTiming ms | raw HEAD failure／review |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| modern/home | 29 | 3 | 760 | 0 | 0 | 1 | 88 | 7／Required |
| modern/quotation | 34 | 6 | 800 | 0 | 0 | 4 | 184 | 7／Required |
| heritage/home | 32 | 3 | 760 | 0 | 1 | 0 | 64 | 6／Required |
| heritage/quotation | 36 | 6 | 468 | 0 | 0 | 4 | 256 | 7／Required |
| luxury/home | 32 | 3 | 720 | 0 | 0 | 0 | 64 | 6／Required |
| luxury/quotation | 36 | 6 | 548 | 0 | 0 | 4 | 248 | 7／Required |

六case console errors、runtime errors、required GET/assets loading failures與HTTP≥400 response均為0；但所有六case的HEADreview旗標為true，共40筆HEAD transport failure原紀錄完整保留（包括其真實response欄位；未補造status）。本輪沒有逐筆完成全部協定分類，不將這6case寫成「全網路PASS」，也不解除既有整輪unknown network gate。

EventTiming最大已記錄duration為64–256ms，屬特定動作期間的lab診斷；不是INP、不是p75。load與interaction longtasks分開列出，其總和不冒稱Lighthouse TBT。暖cache的較低LCP只是不同cache條件的實際觀察，沒有修復cold六組TBT，也不是App優化改善率。

首輪`warm/`原FAIL／真exit1完整保留：ModernHome click後立即斷言hash而未等待NextLink非同步URL提交。Root僅於v2加入有界`waitForURL`確認真實hash提交，保留同document timeOrigin及其餘profile/cache/metrics/原有gates；沒有寫入hash、改App或忽略GET。`warm-version-bridge.json`記錄兩版本SHA；fresh6cases全部重驗，未用第一輪部分完成數補成6。

## 最小後續實驗與 Required 重驗

本輪不更換品牌字體、weight、display或介面以換取PASS，也未做反事實效能實驗。可考慮下一個獨立、可回退的小實驗：先針對trace證實重排成本較高的一個非首屏容器，評估是否能用screen-only排版隔離／延後非可見排版減少font完成後的全document工作；保留原文字、49目錄、語意、字體與native links。不預設某個CSS屬性有效，也不在本輪套用。字體載入策略若另提，須與隔離實驗分開，不能同時改多變數後宣稱單一因果。

- **Required**：在相同server、Chrome/LH版本、viewport、CPU/network/cache與獨占條件，先用Modern Home三cold做可行性對照，保留原18基準與所有新樣本。這只是實驗，不是整輪接受結果。
- **Required**：若候選確有可重複收益且沒有內容／行為回歸，再完整重驗六route×3cold與6warm；列每組median／range、raw values、所有超標。
- **Required**：檢查可見排版與品牌字型／權重、5寬視覺與幾何、section/fragment anchors、skiplink與focus、keyboard、StyleSwitcher同內容／fallback及無個資傳遞。
- **Required**：normal與Pages49路由HTTP／metadata／資源／unknown404/private輸出保護、受影響兩模式browser／axe，不能只用一個Home快照覆蓋其他頁。
- **Required**：print/PDF內容、QR／summary、分頁、圖片／字體、無隱私內容及控件可用性；任何screen-only優化都必須證明未影響列印。
- **Required**：npmci、TypeScript、ESLint、npmtest、normalbuild、Pagesbuild及exact-head CI／artifact對照。不得把新source與舊PASS無條件合併。

## 結論邊界

- 目前性能目標 **FAIL**，保留Draft／release未通過；不以綠色build或輸出等價覆蓋實測TBT。
- 無field資料：`inpMs=null`、`fieldWindow=null`，不聲稱CWV p75或真實使用者INP通過。
- 本檔只解釋性能證據，不能解除其他AT／network或跨項目阻礙。
