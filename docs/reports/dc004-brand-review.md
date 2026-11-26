# DC-004 品牌前置審閱與 DC-003 合併驗證

日期：2026-11-26（UTC）。分支：`feature/design-collection-heritage`，網站基準 `8ba299a5a48da41ca7f4d88d9b2149d7c83f6584`。狀態：**品牌審閱稿完成；完整 Heritage 實作 BLOCKED，等待同版本品牌審閱**。

## 1. 範圍與授權

使用者先要求執行 DC-004，前置核對發現 DC-003 未合併及 Heritage 品牌審閱缺件；後續使用者回覆「合併」，已明確授權合併 [PR #39](https://github.com/xk2022/xk-website/pull/39)。本輪完成其 main 部署確認，並準備 [Heritage 品牌審閱稿 v1](../01_design/design-collection/reviews/heritage-v1.md)，不把合併指令當作 Heritage 配色例外核准。

[工作包](../01_design/design-collection/work-packages.md#dc004) 明定「前置：DC-003 合併，Heritage 新增 palette／外框／素材適用範圍完成品牌審閱」。DC-003 前置已滿足，品牌前置仍缺。原型只在文件目錄，沒有新增 Next 路由、公開頁、Gallery 入口、品牌事實、依賴、價格、表單或風格切換器。新審閱 PR 等待審閱，不自動合併／發布。

## 2. 來源與差異

公司唯讀最新 main：`d03cd673c10a8f7c0427c558c562112aa4d34a8c`，tree `e63c7d55e20596db3f1386dad308a4b5ccb19e23`。相對 DC-003 核對版本 `cdb1ec70f1fa641f3022f53994ab6da83c4333de` 多 7 commits，主要是知識庫遷移與檢索；原品牌／工程的 8 份原文 Blob 不變。新入口不再缺 AGENTS；未修改公司 Repository。

| 公司來源 | Blob | 本稿適用內容 |
| --- | --- | --- |
| `AGENTS.md` 全文 | `a7ca443ddd1d1b847dc58152bbb56c1425c1b522` | 先查治理／決議、保留來源、只改指定範圍 |
| `05_brand/overview.md` §13 | `043a10768e35a62a9f7718b3f139402a349a25a8` | 官網／作品集外框與署名仍依公司規範，個案主視覺例外不能自動套用 Heritage |
| `05_brand/logo-guidelines.md` §13–24 | `75cf9814edb9f36c62fcad2e4a93bfe323bc7175` | Logo 03 原版、比例及配色，不染色、旋轉或加陰影 |
| `05_brand/字體與排版.md` §13 | `7cb59233ff54d2080c9a7736b639fab7e998aadc` | Inter／Noto Sans TC；公司桌面 H1 基準 56px，候選 52px 明列待審差異 |
| `05_brand/品牌色票與介面用途.md` §13–24 | `8ef832decbae1009f12c50ecfee6c953db3d3a7a` | 正式角色及對比；紙色／棕紅／黃銅沒有已核准例外 |
| `06_engineering/testing-and-release.md` §22 | `7b525804e46753e9b45432c4ba05f387a9b46f6f` | 依實際範圍驗證、保留發布核對 |
| `10_decisions/2026-11-25.md` §13 | `d1e52a425b301556d8138bcd3d16d401874ea3ae` | APP 部署邊界不擴張本靜態網站 |

以上來源固定於 [公司版本](https://github.com/xk2022/xplore-kaleidoscope/tree/d03cd673c10a8f7c0427c558c562112aa4d34a8c)。新增遷移文件保留原來源資訊；公司知識庫 metadata 驗證及 APP／VPS／Docker 流程不加入網站 scope。未找到 Heritage／Design Collection 核准紀錄。

網站內容來源固定於 base：`src/config/site.ts`／`homepage.ts`／`services.ts`／`website-showcases.ts` 與既有公開 URL。靜態核對實際比對 Hero、Services 五分類、五步合作與三 featured 的原 summary／note／alt／順序；圖說編排性補充明示為原型，不成為新的業務 catalog。正式實作仍消費共用 DTO。

## 3. 交付檔案

- 新增：`docs/01_design/design-collection/reviews/heritage-v1.md`、`heritage-v1.html`；本報告；[必要證據及工具](dc004-review-artifacts/README.md)；[375／1440px 實際截圖](../screenshots/design-collection/dc004-review/README.md)。
- 修改：根 `README.md`／`AGENTS.md`、`docs/01_design/README.md`、`docs/reports/README.md`、`docs/task/ROADMAP.md`、`docs/98_decisions/implementation-notes.md` 的必要入口與狀態。
- `src/app/globals.css` 只加三個精確的審閱文件／證據掃描排除及註解，沒有呈現宣告差異。價格、元件、路由、registry、Metadata、依賴／lock、Next 設定、workflow、DNS 與其他 Repository 未改。

## 4. 本機驗收與適用範圍

環境：Linux 6.18.57 x86_64、Node.js `24.22.1`、npm `11.9.0`、Python `3.12.14`、Chromium `156.0.8078.79`、axe Playwright `4.14.0`。原型只由 `python3 -m http.server 3240 --bind 127.0.0.1` 提供文件；不是應用 Backend，審閱後停止。命令均透過既有 `scripts/run-with-evidence.py` 記錄真 OS exit，見證據目錄的 receipts／logs；人工判讀無程序 exit。

| Test ID | 適用性／項目 | 實際指令或操作 | 預期／實際 | Exit | 狀態／證據 |
| --- | --- | --- | --- | --- | --- |
| HR-SOURCE | Required：前置、來源及核准 | fetch／GitHub 唯讀精確版本、規格及公司入口 | DC-003 已合併；品牌核准未找到，保持待審 | N/A，來源人工核對 | PASS，§1–2；品牌前置本身 BLOCKED |
| HR-STATIC | Required：結構、所有錨點／相對路徑、來源文案 | `node --import ./scripts/register-test-aliases.mjs /tmp/xk-dc004-review/check-prototype-v3.mjs` | 單一 h1／main／Header／Footer、5 sections、6 個本地素材引用、22 個正式 www 外鏈、exact featured／copy、無 JS／form | 0 | PASS，`static-v3.json`／log |
| HR-LAYOUT | Required：五寬與圖片 | `node /tmp/xk-dc004-review/prototype-browser-v2.cjs` | 320／375／768／1440／1920 全無橫溢；5 圖完成，手機單欄／桌面不等欄；共 28 assertions 全通過 | **2** | 原始 MANUAL_PENDING，`prototype-browser-result-v2.json`；不能改稱 Exit 0 |
| HR-A11Y | Required：axe／鍵盤／focus／Reduced Motion／無資料收集 | 同上，375／1440 關閉目錄及 375 開啟目錄 | 3 次 axe 零 violation；skip 到 main、原生目錄 Enter 開關、可見 focus、有效章節；Reduced Motion 0 動畫、0 script／form，38 回應均本機 200，Console／Runtime 0 error | **2** | 同份 raw receipt，3 個 incomplete 另判；不宣稱完整 WCAG／讀屏驗收 |
| HR-CONTRAST | Required：實際文字與待判節點 | `node /tmp/xk-dc004-review/adjudicate-prototype.cjs`＋本輪實際 CSS 色彩 | 185 個可見文字節點皆通過，最低 5.16856:1；exact 3 個 ↓ 裝飾 glyph 為相同純色，12.6521:1，父連結文字與 aria-hidden 核對；6 組 focus／功能邊界皆 ≥3:1 | 0 | PASS，`prototype-adjudication.json`／receipt；raw 2 保留 |
| HR-VISUAL | Required：實際畫面人工檢視 | 開啟本輪 375／1440 全頁 PNG 及 Hero／作品／合作視窗圖 | 實際看到手機單欄、桌面不等欄、編號服務清冊、圖說作品／狀態、五步與獨立 CTA；Logo 正常，無截斷／重疊／失效圖 | N/A，Root 人工視覺 | PASS，兩張交付 PNG；不是品牌 Owner 核准 |
| HR-PAGES | Required：文件不污染網站 | `npm run build:pages` | 真靜態建置及既有 guard 完成 | 0 | PASS，`build-pages.json`／log |
| HR-OUTPUT | Required：runtime 不變及非公開 | `python3 /tmp/xk-dc004-review/compare-output.py` | 154 runtime 資源 raw hash 相同；286 輸出僅正規化各自實際 Next Build ID 後完全相同；20 HTML＝17 公開＋3 404；原型未匯出 | 0 | PASS，`output-bridge-result.json`；參照 PR #39 實際 artifact，不以文件檔指紋代替行為判斷 |
| HR-DOC | Required：Markdown／格式／Diff／秘密／清冊 | 本輪 final-check 工具及 `git diff --cached --check` | 路徑／錨點／fence／清單有效，沒有產物、秘密或未審核檔案 | 見最終回執 | 結果及檔案指紋見 `final-check-result.json` |
| DC4-FULL | Required，後續完整 DC-004 | 16 新頁、六品質命令、兩模式全部功能／A4／跨風格等完整工作包 | 本稿沒有進行這些功能開發；**未把本機原型當成完整系列通過** | 未執行 | **BLOCKED**，等待品牌審閱，之後按原工作包執行 |
| HR-PRINT | N/A，本稿不新增試算／列印功能 | 未改既有 A4，網站 runtime 產物等價 | 不因新增文件重跑無關既有 Contact／Quotation／PDF suite | N/A | N/A，正式 Heritage 的 A4 仍列 DC4-FULL |

§4 的 38 回應是原型檔案與本地素材，不是正式官網的網路驗收。原型字體使用系統 fallback，不證明正式 next/font、真機、Safari 或真人讀屏；沒用棕紅／黃銅的 UI，不能宣稱它們已通過實際元件對比。

### 原始失敗與修正

1. `static-v1` Exit 1：初稿素材多上一層相對路徑；改成實際四層後 `static-v2` Exit 0。新增 favicon 後 `static-v3` 再檢 6 個素材引用，Exit 0。沒有修改 public 素材。
2. `prototype-browser` Exit 1：瀏覽器自動尋找根 favicon 造成 Console 404；原有 5 圖、五寬與其他檢查當時通過。加上既有官方 symbol SVG favicon，`prototype-browser-v2` 重驗 28 assertions 全通過、Console／Runtime 0，但 axe 留下 3 個 non-text decorative-arrow incomplete，真 Exit 2 保留。
3. `prototype-adjudication` 只接受上述 exact 三筆、三種狀態、同一 ↓ glyph、aria-hidden、純色及父連結文字／aria-hidden 語意；另量測文字／邊界。未放寬其他未知對比或把不完整掃描直接當 PASS。
4. `live-browser` 與 `live-browser-v2` Exit 1：Chromium 不信任本環境代理憑證；未到頁面功能。`live-browser-v3` 是明確允許該環境代理的功能診斷，不作 TLS 驗收；見 §5。

FAIL 留原值，修正只對實際影響重驗。新增 favicon 不改網站輸出；本輪生產差異只有掃描排除，已以實際 Pages 產物及之後 PR CI 驗證。沒有因文件或遠端事件補記而重跑 DC-003 全套既有 suite；歷史結果仍是歷史版本。

## 5. DC-003 合併、CI、部署及公開確認

| 階段 | 實際結果 |
| --- | --- |
| 最終 PR CI | [#87](https://github.com/xk2022/xk-website/actions/runs/45748874714)，head `0d2b05d4002637e26461519636eaccf21950cbe6`，SUCCESS，Deploy skipped |
| 使用者授權合併 | [PR #39](https://github.com/xk2022/xk-website/pull/39)，expected head 相符，merge SHA `8ba299a5a48da41ca7f4d88d9b2149d7c83f6584` |
| main CI／Pages | [#88／45750880906](https://github.com/xk2022/xk-website/actions/runs/45750880906)，exact merge SHA，Quality／Pages／Deploy success，03:47:05 UTC 部署完成；`main-ci.json`／log |
| main 與 PR artifact | 實際讀取兩份 ZIP，158 靜態檔 raw bytes 相同，全部 286 檔僅實際 Build ID 差異；main artifact `15085955305`，ZIP SHA `cc43318ca9b284e26dfa8d98da349e9f30f0579886307f4a62b29dd043a61cbe` |
| 正式 HTTP | 03:47:45–03:47:57 UTC，`python3 scripts/smoke-website.py --base-url https://www.xplorekaleidoscope.com/ --output /tmp/xk-dc004-review/live-dc003-result.json`，真 Exit 0／`complete:true`／**1,110 PASS**：17 頁、Metadata／links／anchors／資源及保護；`live-dc003.json`／result |
| 線上瀏覽器功能診斷 | 375／1440px，真 Exit 0／14 assertions PASS：Gallery、Modern、Footer 目錄、手機開關／Escape、55 次資源回應正常、Console／Runtime 0；`live-browser-v3.json`／result |
| TLS 限制 | 前兩次 Chromium `ERR_CERT_AUTHORITY_INVALID`。Python 的環境信任鏈正常，觀察到代理 issuer 為 OpenAI；v3 明示 `ignoreHTTPSErrors` 僅供功能診斷。未聲稱瀏覽器正式 TLS／原站憑證獨立驗收，HTTP smoke 未關閉其 TLS 驗證 |

已實際發布網址：<https://www.xplorekaleidoscope.com/>，Gallery：<https://www.xplorekaleidoscope.com/design-collection/>。原 PR Description 已補真實遠端事件；此表只記 DC-003 發布，不是本輪 Heritage 審閱 PR 的部署證據。

限定獨立覆核另確認：原型狀態／內容界線、exact 三筆箭頭裁定、154 個 runtime raw hash、286 輸出 Build ID 正規化均無阻擋問題。父連結只核對 DOM 文字與 aria-hidden，未聲稱讀屏或 browser accessible-name API 驗收。

## 6. Git／PR 與未完成事項

新分支以已合併 main 建立；本次 Commit／Push／PR 與精確 head CI／artifact 由同一審閱 PR Description 補記實際結果，不為自身 SHA 再製造循環提交。PR 前本報告與證據已完成。新 PR 不 merge、不發布功能分支、不變更 DNS。

品牌 Owner 仍需對本稿版本確認紙色及裝飾角色、Header／Footer／Logo 與展示主體的適用分界、桌面／手機構圖、52／36 字階及既有素材／字體範圍。決定欄見審閱稿；缺件保持 PENDING／BLOCKED，無阻擋技術 FAIL 不表示品牌前置或完整 DC-004 已完成。
