# DC-005 證據操作

日期：2026-11-26（UTC）。[實作報告](../dc005-implementation.md) 為結果入口。

- [主 manifest](manifest.json)：147份原始工具／結果／回執／log，17張正式PNG、4原PDF及4張150dpi渲染。工具與log全部gzip，保留解壓SHA、真退出碼與原始FAIL。
- [額外原生Autofill圖](supplement-media-manifest.json)：2張真375／1440 viewport，另計於17張外；真事件、值與pseudo證據在主manifest的native-autofill項目。
- [最終產物檢查器](remote-v3/manifest.json)：獨立18檔allowlist，1194項本地檢查及202檔source bridge。這不是遠端CI或部署成功的聲明；後續精確head／run／artifact證據更新同PR說明。
- 兩個375px修正前問題圖、首次HTTP／reduced-motion工具FAIL及封存器跨根拒絕紀錄保留。只使用最終7張override＋原10張作正式畫面；原suiteJSON不重寫。

## 重現方式

從Repository根目錄還原主證據至隔離暫存目錄，逐一依manifest的compression解壓並驗rawSha256；以source欄位保留原相對結構。不要直接把測試工具解壓至Repository，避免ESLint／Tailwind掃描。

Browser工具使用外部Playwright Core1.65.1、axe4.14.0、系統Chromium156；不屬網站npm dependencies。原始工具保留實際絕對路徑，移機時須明確設定相同工具位置與loopback server；不能只憑工具syntax成功推定產品通過。

正式主要命令均有同名receipt及log：`npm ci`、`npx tsc --noEmit`、`npm run lint`、`npm test`、`npm run build`、`npm run build:pages`。工具命令、開始／完成、cwd、returnCode／exitCode、logSHA均保留，不收集環境機密。

還原remote-v3的檢查器與artifact-baseline相對路徑後，可執行：

```sh
python3 inspect-ci-artifact.py --directory /path/to/tested/out --report /tmp/fresh-local-result.json
python3 inspect-ci-artifact.py --zip /path/to/github-pages.zip --github-metadata /path/to/api-metadata.json --expected-head EXACT_COMMIT_SHA --report /tmp/fresh-ci-result.json
```

只容許實際Next BuildID差異，所有靜態檔bytes及路由／HTML／RSC內容仍嚴格比對。不得以PR CI直接宣稱網站正式部署。4份PDF各自實際驗單頁A4／文字與繪圖界內／150及300DPI的2個QR；視覺byte bridge與4個原檔SHA分開記錄。
