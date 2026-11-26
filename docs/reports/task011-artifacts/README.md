# Task 011 原始量測證據

判讀、範圍與限制見 [實作報告](../task011-implementation.md) 與 [量測指南](../../03_engineering/performance-measurement.md)。數據及逐項測試見 `measurements.json`、`verification.json`；完整來源與 SHA 見 `manifest.json`。

`evidence.json.xz` 使用 Python 標準函式庫 LZMA／XZ 無損壓縮，以 `xk-performance-evidence-v1` 保存本次工具、profile、全部已選取原始 runs、Lighthouse JSON／HTML、trace、Network、Coverage、Observer、回執與 Log。它不是部署產物，不包含 `.next/`、`out/`、node_modules、npm cache 或機密。

相同內容只存一次，`files` 對應 `blobs` 的 SHA-256。原本 gzip 的 JSON／trace 先無損解開保存 payload；member 的 `sourceContainer` 另記原壓縮檔 SHA／bytes，還原的是逐 byte 相同的 payload，不宣稱重建相同 gzip wrapper。PNG 是原 bytes 的 base64，沒有重畫瀏覽器畫面。

## 還原並驗證

在 Repository 根目錄執行以下 Python，輸出到全新的暫存目錄；既有檔案不會覆寫。

```python
import base64
import lzma
import hashlib
import json
from pathlib import Path, PurePosixPath

archive = Path("docs/reports/task011-artifacts/evidence.json.xz")
manifest = json.loads(Path("docs/reports/task011-artifacts/manifest.json").read_text())
assert hashlib.sha256(archive.read_bytes()).hexdigest() == manifest["archiveSha256"]
record = json.loads(lzma.decompress(archive.read_bytes()))
target = Path("/tmp/xk-task011-replay")
target.mkdir(exist_ok=False)
for name, member in record["files"].items():
    relative = PurePosixPath(name)
    assert not relative.is_absolute() and ".." not in relative.parts
    content = record["blobs"][member["contentRef"]]
    data = content.encode() if member["encoding"] == "utf8" else base64.b64decode(content)
    assert len(data) == member["bytes"]
    assert hashlib.sha256(data).hexdigest() == member["sha256"]
    destination = target.joinpath(*relative.parts)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("xb") as output:
        output.write(data)
print("Verified", len(record["files"]), "members")
```

## 重現量測

先讀還原的 `measure.cjs`、`serve-pages.py`、`profiles/`、原始 `*-process.json` 與 Lighthouse `*-receipt.json`，核對實際完整 command、工具 SHA／版本及 server 模型。依 [量測指南](../../03_engineering/performance-measurement.md) 在正確 baseline／after worktree 建置；新實驗使用全新證據目錄，更新工具的 workspace、暫存路徑與 loopback URL，不覆寫原始 runs。

外部工具的鎖定版本及暫存 package manifest／lockfile 隨證據保存；它們沒有加入網站 Dependencies。既有 runner 自查的預期 Exit 7／124、工具失敗及重驗均保留原值，不能當成網站驗收失敗或偷偷改成 Exit 0。

Lighthouse／受控 CDP 是不同方法，僅各自比較相同條件的 baseline／after。原始 `COMPLETE` 表示量測程序完成，目標是否達標另見衍生結果；TBT、Long Tasks 或少量 Event Timing 不是 field INP。原始網路事件保留完整 redirect／failure，unique requestId map 數不等於所有 HTTP transactions；暖快取的 load 與 interaction 分期另列，不能混成原頁 initial payload。

頁面 PNG 僅作 UI 證據。沒有 DevTools UI 截圖時，直接交付真實 trace／network／font 資料，不把資料圖或網站截圖冒稱 DevTools 畫面。可用 Chrome Performance 匯入解開的 trace JSON 作進一步檢視。

## CI 來源修正補充證據

[source-fix-verification.json](source-fix-verification.json) 記錄最終原碼、五個品質命令、普通 18／Pages 23 定向補驗及 [204 檔 bridge](source-artifact-bridge.json)。[source-fix-evidence.json.xz](source-fix-evidence.json.xz) 保留其原始資料與失敗／重驗；使用相同 files／blobs 還原方式，archive SHA／member count 改讀該 verification 的 evidenceArchive。原始 font-only 量測與主封存不變，不能把補驗當成效能重測。
