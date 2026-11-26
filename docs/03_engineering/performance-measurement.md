# 效能量測與重驗

依 [Task 011](../task/task011.md) 執行。數據、指令、原始 runs 與受測版本見 [本次報告](../reports/task011-implementation.md)；本指南描述重現條件，不是跨裝置效能保證。

## 準備與版本

先核對最新 main、工作樹、公開部署 SHA 與所有真實路由，保留使用者變更。鎖定 Node.js 24.x、現有 lockfile、瀏覽器及工具版本；測試工具安裝於 Repository 外，不修改應用 Dependencies。依 [協作流程](subagent-workflow.md) 從首個長指令保存真實退出回執。

正式量測使用 production 產物。先 `npm ci`、`npm run build`，以 loopback production server 測代表頁；停止服務後才執行 `npm run build:pages`，以獨立靜態伺服器提供 `/xk-website/`。不要以 dev／HMR、`next start` 或另一版本的產物冒充 Pages。

在修改前固定 baseline；記錄程式碼 Commit 及逐檔 SHA。先 review 可重現瓶頸、預期作用與風險，再做最小修改。沒有證據時不拆 Client Component、不停用 Link 預取、不新增 lazy wrapper 或預載全部中文字體。

## 固定 profiles

| 條件 | Mobile | Desktop |
| --- | --- | --- |
| Viewport | 375 × 812 | 1440 × 1000 |
| 裝置 | Chromium emulation、DPR 1，非真機 | Chromium emulation、DPR 1 |
| CPU slowdown | 4× | 1× |
| CDP latency | 150 ms | 無網路節流 |
| CDP download／upload | 200000／93750 bytes/s | 無網路節流 |

Lighthouse 使用實際 DevTools 節流，不與 simulated 結果混比。13.6.0 的設定換算使用 KiB：1562.5／732.421875 Kbps 對應上述 bytes/s；重現前查該工具版本的 help／source 並匯出實際設定，不猜預設值。工具升版、主機／內容或網路條件改變時，重新建立基準。

同一機器依序採樣，暫停其他 Browser、axe、Build 與重度工作；記錄硬體／虛擬化限制。不可控制的雲端 host workload、電源狀態與外部網路須列限制。

## 採樣與判讀

- Pages 全部公開路由分別做 mobile／desktop 冷載入，每個案例至少三次有效 runs；保留每次值，報告中位數與範圍，不能挑最好一次。
- Home 與實際最大內容／互動風險頁補暖快取、跨頁、CTA 與手機選單。冷快取使用新 context；暖快取保留同 context，從 CDP／HTTP 記錄證明快取命中，不能只用第二次導航推定。
- 一般 Next.js production 的相同代表頁也做三次比較。Lighthouse 原始 JSON／HTML、trace、network 與實際設定完整保存；Lighthouse storage reset 與保留 context 的暖快取分開。
- LCP 記錄真正元素與時間；CLS 包含載入及操作；同時記錄 Long Tasks、JS initial／async、transfer／decoded bytes、font／SVG／第三方請求及 Cache Header。沒有量到的 metric 使用 null 與原因。
- LCP ≤ 2.5 秒、CLS ≤ 0.1 是既有工程目標；超標如實記錄 FAIL、範圍與原因。不新增未核准的 Lighthouse 分數或 bundle 硬門檻。
- Event Timing／互動 trace 是受控診斷。TBT、Performance Score 或少量點擊都不能代替 field INP；沒有足夠授權 field 資料時，CWV p75 保持 PENDING，不能宣稱 CWV PASS。

## 傳輸與部署界線

本機 Pages 使用固定受控模型：文字資源 gzip level 6、hashed 靜態資源 `max-age=600`、HTML `no-cache` 與 ETag。這是可比較的本機伺服器條件，不代表 GitHub Pages 的實際 Header；公開 CDN 的 HTTPS／Cache／壓縮另外讀取實際 Response，不與 localhost 計算改善率。

不修改 Pages Source、CI 部署條件、DNS、Vercel、Secrets 或 HTML immutable 政策。保留 Base Path、404、`.nojekyll`、開發／Privacy 草案排除、Metadata 與 noindex。公開站驗證須先確認部署 job／deployment 對應本次 merge SHA，再檢查實際頁面及資源；PR build artifact 不是部署成功。

## 重驗與證據

修正後用相同工具、profile、cache 與傳輸模型做 after。保留原始失敗與工具修正，不覆寫舊檔；排除異常 run 須有實際原因並補樣本。若條件不同，不能計算直接改善率。

程式 freeze 後執行 `npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm run build`、`npm run build:pages`，以及九頁五寬、有效連結／錨點、鍵盤／Focus／選單、axe、Reduced Motion、Console／Runtime／Network、SEO 與發布保護回歸。效能採樣與功能回歸錯開，截圖人工檢視。頁面截圖只證明畫面，不當作 LCP／waterfall 或真機證據。

在 PR 前完成同版本報告；原始資料附 SHA manifest，保留重現工具／profile 與 log。巨大資料可壓縮保存，必須可還原及核對 SHA，不能為縮檔刪除不利結果。之後依實際 Diff 選擇重驗範圍；純文件、遠端識別碼及報告補記不觸發無關網站重跑。

產生報告後也要核對實際 CI artifact：Tailwind 自動掃描可能把驗收資料當成 utility 來源。本 Task 在 globals.css 明確排除兩個 Task 011 證據／報告路徑，避免文件補記影響 production CSS。若新增排除規則後所有 runtime assets 相同、HTML／RSC 僅差嚴格已知的 Build ID，可以版本 bridge 保留原量測並針對建置來源補驗；不可單憑原碼指紋或 CI 綠燈假定產物相同。
