import { verifiedContactChannels } from "../../config/contact.ts";
import { quotationCatalog } from "../../config/quotation.ts";
import { formatQuotationTotal, formatReferencePrice } from "./calculation.ts";
import type { QuotationEstimate, QuotationSelection } from "./types.ts";

const cleanLabel = (value: string, max: number) => value.trim().slice(0, max).replace(/[\u0000-\u001f\u007f]/g, " ");

/** Local text only. Personal labels are never persisted, logged or put in an HTTP URL. */
export function createQuotationInquiry(selection: QuotationSelection, estimate: QuotationEstimate, customerName: string, projectName: string) {
  const build = quotationCatalog.builds.find(({ id }) => id === selection.buildId);
  const service = quotationCatalog.services.find(({ id }) => id === selection.serviceId);
  const complexity = quotationCatalog.complexities.find(({ id }) => id === selection.complexity);
  const lines = [
    "XK SYSTEM 方案詢價摘要（參考試算，非正式報價）", "",
    ...(cleanLabel(customerName, 40) ? [`客戶稱呼：${cleanLabel(customerName, 40)}`] : []),
    ...(cleanLabel(projectName, 60) ? [`專案名稱：${cleanLabel(projectName, 60)}`] : []),
    `服務類型：${service?.name ?? "待選擇"}`,
    `建置種類：${build ? `${build.code}｜${build.name}` : "待選擇"}`,
    `需求程度：${complexity?.name ?? "基礎 Basic"}（需求標記，不套用倍率）`, "",
    ...estimate.lines.map((line) => `✓ ${line.name}：${line.included ? "基礎已含，不另計" : formatReferencePrice(line.price, line.billing === "annual")}`), "",
    `一次性建置費：${formatQuotationTotal(estimate.oneTime)}`,
    ...(estimate.oneTime.status === "pending" && estimate.oneTime.knownMin > 0 ? [`已知一次性項目至少 NT$${estimate.oneTime.knownMin.toLocaleString("en-US")}，另有面議項目。`] : []),
    `年度費用：${estimate.annual.status === "empty" ? "未選擇年度項目" : formatQuotationTotal(estimate.annual)}`,
    "第三方平台、網域、主機、模型及付款手續費依實際選用另計，未假定為零。",
    ...estimate.thirdPartyNotes.map((note) => `- ${note}`), "",
    "以上為需求討論用的參考區間，含暫定項目；面議與上限未定不等於零元。",
    "正式交付內容、費用、稅務與合作條件以雙方確認的正式報價為準。",
    "請勿提供帳號密碼、金鑰或敏感資料。",
  ];
  const text = lines.join("\r\n");
  const mailBody = lines.filter((line) => !line.startsWith("客戶稱呼：") && !line.startsWith("專案名稱：")).join("\r\n");
  const channel = verifiedContactChannels.find(({ href }) => href.startsWith("mailto:"));
  const recipient = channel ? new URL(channel.href).pathname : null;
  const candidate = recipient && build ? `mailto:${recipient}?subject=${encodeURIComponent("XK SYSTEM 方案詢價")}&body=${encodeURIComponent(mailBody)}` : null;
  return { text, href: candidate && candidate.length <= 1800 ? candidate : null };
}
