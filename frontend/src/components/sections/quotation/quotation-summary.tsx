import { memo } from "react";
import Image from "next/image";
import { CheckSquare, Square } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { quotationCatalog } from "@/config/quotation";
import { calculateQuotation, formatQuotationTotal, formatReferencePrice } from "@/lib/quotation/calculation";
import type { QuotationCatalog, QuotationSelection } from "@/lib/quotation/types";

type Props = { selection: QuotationSelection; customerName: string; projectName: string; catalog?: QuotationCatalog };

export const QuotationSummary = memo(function QuotationSummary({ selection, customerName, projectName, catalog = quotationCatalog }: Props) {
  const estimate = calculateQuotation(selection, catalog);
  const build = catalog.builds.find(({ id }) => id === selection.buildId);
  const service = catalog.services.find(({ id }) => id === selection.serviceId);
  const complexity = catalog.complexities.find(({ id }) => id === selection.complexity);
  const applicable = catalog.addons.filter(({ applicableBuildIds }) => build && applicableBuildIds.some((id) => id === build.id));

  return (
    <Section id="quotation-print-summary" aria-labelledby="quotation-print-title" background="surface" className="quotation-preview-section">
      <Container className="quotation-preview-outer">
        <div className="quotation-screen-only">
          <p className="type-caption font-semibold text-secondary">07 / A4 SUMMARY</p>
          <h2 id="quotation-print-title" className="type-h2 mt-3 text-primary">A4 方案摘要</h2>
          <p className="type-body mt-4 mb-8 max-w-3xl text-foreground">預覽依 A4 比例縮放；手機可在上方閱讀完整試算結果。選好方案後使用「列印 A4／另存 PDF」，在瀏覽器列印視窗選擇 A4 與另存 PDF。</p>
        </div>
        <div className="quotation-preview-container">
          <article data-a4-sheet="true" aria-label="A4 方案摘要，非正式報價" className="quotation-paper">
            <div data-summary-header="true" className="quotation-paper-header">
              <Image src="/brand/source/xk-logo-horizontal.svg" alt="探索萬象科技 XK SYSTEM 正式 Logo" width={850} height={204} unoptimized loading="eager" className="quotation-paper-logo" />
              <div><p>XK SYSTEM · Digital Solution Estimator</p><h3>數位服務方案摘要</h3><p>V1 參考試算 · 非正式報價單</p></div>
            </div>
            <dl className="quotation-paper-meta">
              <div><dt>客戶稱呼（選填）</dt><dd>{customerName.trim() || "未填寫"}</dd></div>
              <div><dt>專案名稱（選填）</dt><dd>{projectName.trim() || "未填寫"}</dd></div>
              <div><dt>服務類型</dt><dd>{service?.name}</dd></div>
              <div><dt>需求複雜程度</dt><dd>{complexity?.name}（不套用價格倍率）</dd></div>
            </dl>
            <div className="quotation-paper-base">
              <h4>{build ? `✓ ${build.code}｜${build.name}` : "請先選擇建置種類"}</h4>
              <p>{formatReferencePrice(estimate.base)} · {build?.reference.label ?? "尚未選定基礎方案"}</p>
            </div>
            <h4>附加服務與勾選狀態</h4>
            {build ? (
              <ul className="quotation-paper-addon-grid">
                {applicable.map((addon) => {
                  const included = estimate.includedAddonIds.includes(addon.id);
                  const selected = included || selection.addonIds.includes(addon.id);
                  const Icon = selected ? CheckSquare : Square;
                  return <li key={addon.id} data-summary-addon={addon.id} data-selected={selected} className={`quotation-paper-addon${selected ? " quotation-paper-selected" : ""}`}><Icon aria-hidden="true" /><div><strong>{selected ? "已選" : "未選"} · {addon.name}</strong><p>{included ? "基礎已含，不另計" : formatReferencePrice(addon.price, addon.billing === "annual")}</p></div></li>;
                })}
              </ul>
            ) : <p>選定基礎方案後，顯示適用的附加服務。</p>}
            <div className="quotation-paper-totals">
              <h4>本次預估費用</h4>
              <dl>
                <dt>基礎建置費</dt><dd>{formatReferencePrice(estimate.base)}</dd>
                <dt>一次性附加服務</dt><dd>{formatQuotationTotal(estimate.oneTimeExtras)}</dd>
                <dt>一次性建置費合計</dt><dd><strong>{formatQuotationTotal(estimate.oneTime)}</strong></dd>
                <dt>年度維護／服務費</dt><dd>{estimate.annual.status === "empty" ? "未選擇年度項目" : formatQuotationTotal(estimate.annual)}</dd>
                <dt>第三方服務費</dt><dd>依實際選用另計，未納入合計</dd>
                <dt>已選服務數量</dt><dd>{estimate.selectedCount} 項</dd>
              </dl>
              {estimate.oneTime.status === "pending" && estimate.oneTime.knownMin > 0 && <p>已知一次性項目至少 NT${estimate.oneTime.knownMin.toLocaleString("en-US")}，另有面議項目，並非完整總價。</p>}
            </div>
            <div className="quotation-paper-notes">
              <p>公司文件建議與本輪暫定價格僅供需求討論。面議不等於零元；「起」價未設上限；複雜程度不使用未確認倍率。</p>
              <p>基礎已含項目不重複計費。平台、網域、主機、模型用量與金流手續費等第三方支出另計；維護年約依支援範圍確認，不將月費自行年化。</p>
              <p>本摘要不是正式報價、訂單或合約；交付範圍、費用與稅務以正式確認為準。{estimate.thirdPartyNotes.join("；")}</p>
            </div>
            <div className="quotation-paper-footer">
              <div><strong>Explore Possibilities. Create Digital Value.</strong><p>www.xplorekaleidoscope.com</p><p>請至官網聯絡頁提供本份摘要，取得正式報價。</p></div>
              <figure><Image id="quotation-website-qr" src="/images/quotation/website-qr.svg" alt="官網 QR Code" width={100} height={100} unoptimized loading="eager" className="quotation-qr" /><figcaption className="quotation-qr-caption">官網</figcaption></figure>
              <figure><Image id="quotation-portfolio-qr" src="/images/quotation/portfolio-qr.svg" alt="作品集 QR Code" width={100} height={100} unoptimized loading="eager" className="quotation-qr" /><figcaption className="quotation-qr-caption">作品集</figcaption></figure>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
});
