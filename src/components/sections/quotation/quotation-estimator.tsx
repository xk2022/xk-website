"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clipboard, Printer, RotateCcw } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quotationCatalog } from "@/config/quotation";
import { calculateQuotation, formatQuotationTotal, formatReferencePrice, sanitizeQuotationSelection } from "@/lib/quotation/calculation";
import { createQuotationInquiry } from "@/lib/quotation/inquiry";
import { useQuotationSelection } from "@/lib/quotation/storage";
import type { ComplexityId, QuotationAddon, QuotationCatalog, QuotationSelection, QuotationTotal, ServiceTypeId } from "@/lib/quotation/types";
import { cn } from "@/lib/utils";

import { QuotationSummary } from "./quotation-summary";

const catalog: QuotationCatalog = quotationCatalog;
const addonGroups: readonly { id: QuotationAddon["group"]; name: string }[] = [
  { id: "visual", name: "視覺設計" },
  { id: "content", name: "內容製作" },
  { id: "marketing", name: "行銷設定" },
  { id: "integration", name: "功能整合" },
  { id: "maintenance", name: "部署與維運" },
];
const fieldClass = "type-body min-h-12 w-full min-w-0 rounded-md border bg-background px-4 py-3 text-foreground";
const selectedCardClass = "border-secondary bg-secondary/5";

function SelectedLabel({ selected }: { selected: boolean }) {
  return selected ? (
    <span className="type-body-sm mt-3 inline-flex max-w-full items-center gap-2 font-medium text-secondary">
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
      <Check aria-hidden="true" className="size-4 shrink-0" />已選擇
    </span>
  ) : null;
}

function PendingSubtotal({ total }: { total: QuotationTotal }) {
  if (total.status !== "pending") return null;
  return (
    <div className="type-body-sm mt-3 space-y-1 text-muted-foreground">
      <p className="font-medium text-foreground">已知項目小計</p>
      <p>{total.knownMin > 0
        ? `已知項目至少 NT$${total.knownMin.toLocaleString("zh-TW")}，另有面議項目。`
        : "尚無可加總的已知金額，另有面議項目。"}</p>
    </div>
  );
}

function TotalRow({ kind, label, total, annual = false }: {
  kind: "extras" | "one-time" | "annual";
  label: string;
  total: QuotationTotal;
  annual?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-lg border bg-background p-5 sm:p-6" data-total-kind={kind} data-total-status={total.status}>
      <dt className="type-body font-semibold text-primary">{label}</dt>
      <dd className="mt-3 min-w-0">
        <p className="type-body-lg break-words font-semibold text-primary">{annual && total.status === "empty" ? "未選擇年度項目" : formatQuotationTotal(total)}</p>
        <PendingSubtotal total={total} />
      </dd>
    </div>
  );
}

export function QuotationEstimator() {
  const { selection, hydrated, persistence, storageMessage, setSelection, reset } = useQuotationSelection();
  const [customerName, setCustomerName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [copying, setCopying] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [printing, setPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState("");
  const summaryTextRef = useRef<HTMLTextAreaElement>(null);

  const builds = catalog.builds.filter((build) => build.serviceId === selection.serviceId);
  const selectedBuild = builds.find((build) => build.id === selection.buildId);
  const availableAddons = selectedBuild
    ? catalog.addons.filter((addon) => addon.applicableBuildIds.includes(selectedBuild.id))
    : [];
  const estimate = calculateQuotation(selection, catalog);
  const ready = hydrated && !!selectedBuild;
  const inquiry = ready ? createQuotationInquiry(selection, estimate, customerName, projectName) : null;
  const oneTimeText = formatQuotationTotal(estimate.oneTime);
  const annualText = estimate.annual.status === "empty" ? "未選擇年度項目" : formatQuotationTotal(estimate.annual);
  const persistenceText = !hydrated
    ? "正在載入已儲存的方案。"
    : storageMessage || (persistence === "unavailable"
      ? "此瀏覽器無法儲存方案；仍可在本頁試算，重新整理後需重新選擇。"
      : persistence === "saved"
        ? "方案選項已保存在此瀏覽器；客戶稱呼與專案名稱不會儲存。"
        : "方案可在本頁調整；客戶稱呼與專案名稱只留在目前頁面。");

  function changeSelection(next: QuotationSelection) {
    setSelection(sanitizeQuotationSelection(next, catalog));
    setCopyStatus("");
    setPrintStatus("");
  }

  function chooseService(serviceId: ServiceTypeId) {
    changeSelection({ serviceId, buildId: null, addonIds: [], complexity: selection.complexity });
  }

  function chooseBuild(buildId: string) {
    changeSelection({ ...selection, buildId, addonIds: [] });
  }

  function chooseAddon(id: string, checked: boolean) {
    changeSelection({ ...selection, addonIds: checked ? [...selection.addonIds, id] : selection.addonIds.filter((entry) => entry !== id) });
  }

  function chooseComplexity(complexity: ComplexityId) {
    changeSelection({ ...selection, complexity });
  }

  function resetQuotation() {
    reset();
    setCustomerName("");
    setProjectName("");
    setCopyStatus("");
    setPrintStatus("已重設方案與本頁個人欄位。");
  }

  async function printQuotation() {
    if (!ready || printing) return;
    setPrinting(true);
    setPrintStatus("正在準備列印，請在瀏覽器列印視窗中選擇列印或另存 PDF。");
    try {
      await document.fonts.ready;
      window.print();
      setPrintStatus("");
    } catch {
      setPrintStatus("目前無法開啟列印，您仍可複製詢價摘要或前往聯絡頁。");
    } finally {
      setPrinting(false);
    }
  }

  async function copyInquiry() {
    if (!inquiry || copying) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(inquiry.text);
      setCopyStatus("已複製詢價摘要；請貼到您的郵件中確認並自行寄出，目前尚未寄信。");
    } catch {
      summaryTextRef.current?.focus();
      summaryTextRef.current?.select();
      setCopyStatus("無法自動複製，已選取下方完整摘要；請手動複製到您的郵件中。");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div id="quotation-estimator" data-quotation-ready={hydrated}>
      <Section id="quotation-introduction" aria-labelledby="quotation-title" className={cn("quotation-screen-only", "border-b")}>
        <Container>
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,.6fr)] lg:gap-12">
            <div className="min-w-0">
              <p lang="en" className="type-caption mb-4 font-semibold text-secondary">01 / DIGITAL SOLUTION ESTIMATOR</p>
              <p className="type-body-lg mb-3 font-semibold tracking-wide text-primary">XK SYSTEM</p>
              <h1 id="quotation-title" className="type-h1 break-words text-primary">數位服務方案試算</h1>
              <p className="type-body-lg mt-6 max-w-3xl text-foreground">依需求選擇網站、系統與 AI 整合方向，先整理服務範圍，再討論合適的方案。</p>
              <p className="type-body-sm mt-4 max-w-3xl font-medium text-foreground">本頁價格僅供參考試算，參考數值待審閱；實際範圍、費用與合作條件需另行確認，不構成正式報價、訂單或付款承諾。</p>
            </div>
            <div className="min-w-0 rounded-lg border bg-background p-6">
              <Image src="/brand/source/xk-logo-horizontal.svg" alt="XK 正式品牌識別" width={850} height={204} unoptimized className="h-auto w-full max-w-80" />
              <p className="type-body mt-5 font-semibold text-primary">XK SYSTEM</p>
              <p className="type-body-sm mt-2 text-muted-foreground">網站建置、系統開發、系統優化與 AI 應用整合。</p>
            </div>
          </div>
          <ol aria-label="試算操作指引" className="mt-8 grid gap-4 sm:grid-cols-3">
            {["選擇服務與建置種類", "搭配附加服務與需求程度", "檢視試算、列印並準備詢價"].map((step, index) => (
              <li key={step} className="type-body-sm flex min-w-0 items-start gap-3 rounded-lg border bg-surface p-4"><span aria-hidden="true" className="font-semibold text-secondary">{index + 1}</span><span className="min-w-0 break-words">{step}</span></li>
            ))}
          </ol>
          <div className="mt-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p id="quotation-storage-status" className="type-body-sm max-w-3xl text-muted-foreground">{persistenceText}</p>
            <Button variant="outline" disabled={!hydrated} onClick={resetQuotation}><RotateCcw aria-hidden="true" />重設方案</Button>
          </div>
          <noscript><p className="type-body mt-6 rounded-lg border bg-surface p-5">此試算工具需要 JavaScript。您仍可<Link href="/contact" className="inline-flex min-h-11 items-center rounded-sm text-secondary underline underline-offset-4">前往聯絡 XK SYSTEM</Link>說明需求與確認報價。</p></noscript>
        </Container>
      </Section>

      <Section id="quotation-services" aria-labelledby="quotation-services-title" className="quotation-screen-only">
        <Container>
          <SectionHeading id="quotation-services-title" eyebrow="02 / SERVICE TYPE" title="選擇服務類型" titleLang="zh-TW" description="先選擇主要需求。切換服務時會清除原建置與附加選項，避免將不同範圍混在同一份試算。" />
          <fieldset disabled={!hydrated} className="min-w-0">
            <legend className="sr-only">服務類型</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {catalog.services.map((service) => {
                const selected = selection.serviceId === service.id;
                return (
                  <Card key={service.id} className={cn("gap-3", selected && selectedCardClass)}>
                    <div className="flex min-w-0 items-start gap-3">
                      <input id={`quotation-service-${service.id}`} name="quotation-service" type="radio" value={service.id} checked={selected} onChange={() => chooseService(service.id)} aria-describedby={`quotation-service-${service.id}-description`} className="mt-3 size-5 shrink-0 accent-secondary" />
                      <label htmlFor={`quotation-service-${service.id}`} className="type-body-lg min-h-11 min-w-0 cursor-pointer break-words py-1.5 font-semibold text-primary">{service.name}</label>
                    </div>
                    <p id={`quotation-service-${service.id}-description`} className="type-body-sm break-words text-muted-foreground">{service.description}</p>
                    <SelectedLabel selected={selected} />
                  </Card>
                );
              })}
            </div>
          </fieldset>
        </Container>
      </Section>

      <Section id="quotation-builds" background="surface" aria-labelledby="quotation-builds-title" className={cn("quotation-screen-only", "border-y")}>
        <Container>
          <SectionHeading id="quotation-builds-title" eyebrow="03 / BUILD SCOPE" title="選擇建置種類" titleLang="zh-TW" description="以用途與對象比較方向。價格下方標示參考來源；展示與規劃會清楚分開，並不代表所有功能已完成。" />
          <fieldset disabled={!hydrated} className="min-w-0">
            <legend className="sr-only">建置種類</legend>
            <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
              {builds.map((build) => {
                const selected = selection.buildId === build.id;
                return (
                  <Card key={build.id} className={cn("h-full", selected && selectedCardClass)}>
                    <div>
                      <p className="type-caption mb-3 font-semibold text-secondary">{build.code}</p>
                      <div className="flex min-w-0 items-start gap-3">
                        <input id={`quotation-build-${build.id}`} name="quotation-build" type="radio" value={build.id} checked={selected} onChange={() => chooseBuild(build.id)} aria-describedby={`quotation-build-${build.id}-description quotation-build-${build.id}-price`} className="mt-3 size-5 shrink-0 accent-secondary" />
                        <label htmlFor={`quotation-build-${build.id}`} className="type-h3 min-h-11 min-w-0 cursor-pointer break-words py-1 font-semibold text-primary">{build.name}</label>
                      </div>
                      <SelectedLabel selected={selected} />
                    </div>
                    <div id={`quotation-build-${build.id}-description`} className="type-body-sm space-y-3 text-muted-foreground">
                      <p className="break-words">{build.positioning}</p>
                      <p className="break-words"><span className="font-semibold text-foreground">適合對象：</span>{build.audience}</p>
                    </div>
                    <div id={`quotation-build-${build.id}-price`} className="mt-auto border-t pt-5">
                      <p className="type-body-sm text-muted-foreground">基礎建置參考</p>
                      <p className="type-body-lg mt-2 break-words font-semibold text-primary">{formatReferencePrice(build.price)}</p>
                      {build.price.kind === "quote" && <p className="type-body-sm mt-2 text-muted-foreground">{build.price.reason}</p>}
                      <p className="type-caption mt-3 font-medium text-secondary">{build.reference.label}</p>
                    </div>
                    <div className="type-body-sm flex min-w-0 flex-col items-start gap-2 border-t pt-4">
                      <Link href={build.serviceLink.href} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline underline-offset-4"><span className="min-w-0 break-words">{build.serviceLink.label}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link>
                      {build.showcase ? (
                        <>
                          {build.showcase.status === "planned" && <p className="text-muted-foreground">Planned／規劃中，尚無同類完成展示。</p>}
                          <Link href={build.showcase.href} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline underline-offset-4"><span className="min-w-0 break-words">{build.showcase.label}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link>
                        </>
                      ) : <p className="text-muted-foreground">尚無可公開的同類展示。</p>}
                    </div>
                  </Card>
                );
              })}
            </div>
          </fieldset>
        </Container>
      </Section>

      <Section id="quotation-addons" aria-labelledby="quotation-addons-title" className="quotation-screen-only">
        <Container>
          <SectionHeading id="quotation-addons-title" eyebrow="04 / ADDITIONAL SERVICES" title="搭配附加服務" titleLang="zh-TW" description="只顯示所選建置可搭配的項目。一次性費用與年度費用分開試算，實際內容及第三方費用需另行確認。" />
          {!selectedBuild ? <p className="type-body rounded-lg border bg-surface p-6 text-foreground">請先選擇建置種類，再檢視可搭配的附加服務。</p> : (
            <div className="space-y-10">
              {addonGroups.map((group) => {
                const addons = availableAddons.filter((addon) => addon.group === group.id);
                if (!addons.length) return null;
                return (
                  <fieldset key={group.id} disabled={!hydrated} className="min-w-0">
                    <legend className="type-h3 mb-5 font-semibold text-primary">{group.name}</legend>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {addons.map((addon) => {
                        const included = estimate.includedAddonIds.includes(addon.id);
                        const selected = selection.addonIds.includes(addon.id);
                        return (
                          <Card key={addon.id} className={cn("gap-4", selected && selectedCardClass)}>
                            <div className="flex min-w-0 items-start gap-3">
                              <input id={`quotation-addon-${addon.id}`} name="quotation-addon" type="checkbox" value={addon.id} checked={selected} disabled={included} onChange={(event) => chooseAddon(addon.id, event.target.checked)} aria-describedby={`quotation-addon-${addon.id}-description quotation-addon-${addon.id}-price`} className="mt-2.5 size-5 shrink-0 accent-secondary" />
                              <label htmlFor={`quotation-addon-${addon.id}`} className={cn("type-body-lg min-h-11 min-w-0 break-words py-1 font-semibold text-primary", !included && "cursor-pointer")}>{addon.name}</label>
                            </div>
                            <p id={`quotation-addon-${addon.id}-description`} className="type-body-sm break-words text-muted-foreground">{addon.description}</p>
                            <div id={`quotation-addon-${addon.id}-price`} className="mt-auto border-t pt-4">
                              <p className="type-body font-semibold text-primary">{included ? "基礎已含，不另計" : formatReferencePrice(addon.price, addon.billing === "annual")}</p>
                              {!included && addon.price.kind === "quote" && <p className="type-body-sm mt-2 text-muted-foreground">{addon.price.reason}</p>}
                              <p className="type-caption mt-2 text-muted-foreground">{addon.billing === "annual" ? "年度項目" : "一次性項目"} · {addon.reference.label}</p>
                            </div>
                            <SelectedLabel selected={selected} />
                          </Card>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      <Section id="quotation-complexity" background="surface" aria-labelledby="quotation-complexity-title" className={cn("quotation-screen-only", "border-y")}>
        <Container>
          <SectionHeading id="quotation-complexity-title" eyebrow="05 / REQUIREMENT COMPLEXITY" title="標記需求複雜程度" titleLang="zh-TW" description="此標記用於後續討論，沒有價格倍率。切換 Basic、Standard 或 Advanced 不會改變目前的參考金額。" />
          <fieldset disabled={!hydrated} className="min-w-0">
            <legend className="sr-only">需求複雜程度</legend>
            <div className="grid gap-4 md:grid-cols-3">
              {catalog.complexities.map((complexity) => {
                const selected = selection.complexity === complexity.id;
                return (
                  <Card key={complexity.id} className={cn("gap-3", selected && selectedCardClass)}>
                    <div className="flex min-w-0 items-start gap-3">
                      <input id={`quotation-complexity-${complexity.id}`} name="quotation-complexity" type="radio" value={complexity.id} checked={selected} onChange={() => chooseComplexity(complexity.id)} aria-describedby={`quotation-complexity-${complexity.id}-description`} className="mt-2.5 size-5 shrink-0 accent-secondary" />
                      <label htmlFor={`quotation-complexity-${complexity.id}`} className="type-body-lg min-h-11 min-w-0 cursor-pointer break-words py-1 font-semibold text-primary">{complexity.name}</label>
                    </div>
                    <p id={`quotation-complexity-${complexity.id}-description`} className="type-body-sm text-muted-foreground">{complexity.description}</p>
                    <SelectedLabel selected={selected} />
                  </Card>
                );
              })}
            </div>
          </fieldset>
        </Container>
      </Section>

      <Section id="quotation-results" aria-labelledby="quotation-results-title" className="quotation-screen-only">
        <Container>
          <SectionHeading id="quotation-results-title" eyebrow="06 / REFERENCE ESTIMATE" title="檢視即時試算" titleLang="zh-TW" description="金額由目前的建置與附加選項計算。面議項目會保留未知金額，已知小計不等於完整總價。" />
          <p className="type-body mb-6 font-medium text-primary">目前已選擇 {estimate.selectedCount} 項建置與服務。</p>
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{hydrated ? `試算結果：已選 ${estimate.selectedCount} 項，一次性總計 ${oneTimeText}；年度費用 ${annualText}。` : ""}</div>
          <dl className="grid min-w-0 gap-4 md:grid-cols-2">
            <div className="min-w-0 rounded-lg border bg-background p-5 sm:p-6" data-total-kind="base" data-total-status={!estimate.base ? "empty" : estimate.base.kind === "quote" ? "pending" : estimate.base.kind}>
              <dt className="type-body font-semibold text-primary">基礎建置</dt>
              <dd className="mt-3">
                <p className="type-body-lg break-words font-semibold text-primary">{formatReferencePrice(estimate.base)}</p>
                {estimate.base?.kind === "quote" && <p className="type-body-sm mt-3 text-muted-foreground">{estimate.base.reason}</p>}
              </dd>
            </div>
            <TotalRow kind="extras" label="一次性附加服務" total={estimate.oneTimeExtras} />
            <TotalRow kind="one-time" label="一次性總計（參考）" total={estimate.oneTime} />
            <TotalRow kind="annual" label="年度費用（每年）" total={estimate.annual} annual />
          </dl>
          <div className="mt-6 rounded-lg border bg-surface p-5 sm:p-6">
            <h3 className="type-h3 text-primary">第三方費用另計</h3>
            <p className="type-body-sm mt-3 text-foreground">如涉及第三方平台、模型用量、付款手續費或外部服務，將依實際方案另計，未納入上述金額。</p>
            {estimate.thirdPartyNotes.length > 0 && <ul className="type-body-sm mt-4 list-disc space-y-2 pl-5 text-muted-foreground">{estimate.thirdPartyNotes.map((note) => <li key={note} className="break-words">{note}</li>)}</ul>}
          </div>
          <Card className="mt-8">
            <h3 className="type-h3 text-primary">準備 A4 試算摘要</h3>
            <p id="quotation-personal-note" className="type-body-sm text-muted-foreground">以下欄位皆為選填，只留在目前頁面，不會儲存至本機方案或網址。請勿填寫敏感資料。</p>
            <div className="grid min-w-0 gap-6 md:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="quotation-customer" className="type-body mb-2 block font-medium text-primary">客戶稱呼（選填）</label>
                <input id="quotation-customer" type="text" autoComplete="off" value={customerName} maxLength={40} disabled={!hydrated} onChange={(event) => { setCustomerName(event.target.value.slice(0, 40)); setCopyStatus(""); }} aria-describedby="quotation-personal-note quotation-customer-hint" className={fieldClass} />
                <p id="quotation-customer-hint" className="type-body-sm mt-2 text-muted-foreground">最多 40 字。</p>
              </div>
              <div className="min-w-0">
                <label htmlFor="quotation-project" className="type-body mb-2 block font-medium text-primary">專案名稱（選填）</label>
                <input id="quotation-project" type="text" autoComplete="off" value={projectName} maxLength={60} disabled={!hydrated} onChange={(event) => { setProjectName(event.target.value.slice(0, 60)); setCopyStatus(""); }} aria-describedby="quotation-personal-note quotation-project-hint" className={fieldClass} />
                <p id="quotation-project-hint" className="type-body-sm mt-2 text-muted-foreground">最多 60 字。</p>
              </div>
            </div>
            <p id="quotation-print-note" className="type-body-sm text-muted-foreground">{!hydrated ? "請等待方案載入後再列印。" : !selectedBuild ? "請先選擇建置種類，才能列印或複製試算摘要。" : "列印將使用下方 A4 摘要；可在瀏覽器列印視窗中另存 PDF。"}</p>
            <div><Button variant="secondary" disabled={!ready} aria-disabled={printing} aria-busy={printing} aria-describedby="quotation-print-note" onClick={printQuotation}><Printer aria-hidden="true" />列印 A4／另存 PDF</Button></div>
            <p id="quotation-print-status" role="status" aria-live="polite" className="type-body-sm min-h-6 text-foreground">{printStatus}</p>
          </Card>
        </Container>
      </Section>

      <QuotationSummary selection={selection} estimate={estimate} customerName={customerName} projectName={projectName} />

      <Section id="quotation-next-step" background="surface" aria-labelledby="quotation-next-step-title" className={cn("quotation-screen-only", "border-t")}>
        <Container>
          <SectionHeading id="quotation-next-step-title" eyebrow="08 / DISCUSS YOUR PROJECT" title="從參考試算，走向實際方案" titleLang="zh-TW" description="確認目前選項後，可複製詢價摘要或開啟 Email 草稿。草稿仍須由您確認並寄出，本頁不會自動提交或確認信件送達。" />
          <p id="quotation-inquiry-note" className="type-body-sm mb-5 max-w-4xl text-foreground">{!hydrated ? "請等待方案載入。" : !selectedBuild ? "請先選擇建置種類，才能取得正式報價入口或複製摘要；您仍可直接前往聯絡頁說明需求。" : inquiry?.href ? "開啟草稿後，請自行核對收件地址、選項與內容再寄出。" : "摘要較長，請先複製，再至聯絡頁寄送。"}</p>
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            {inquiry?.href ? <Button asChild variant="secondary"><a href={inquiry.href} aria-describedby="quotation-inquiry-note">取得正式報價<ArrowUpRight aria-hidden="true" /></a></Button> : ready ? <Button asChild variant="secondary"><Link href="/contact#contact-channels" aria-describedby="quotation-inquiry-note">取得正式報價<ArrowUpRight aria-hidden="true" /></Link></Button> : <Button variant="secondary" disabled aria-describedby="quotation-inquiry-note">取得正式報價<ArrowUpRight aria-hidden="true" /></Button>}
            <Button variant="outline" disabled={!ready} aria-disabled={copying} aria-busy={copying} aria-describedby="quotation-inquiry-note" onClick={copyInquiry}><Clipboard aria-hidden="true" />複製詢價摘要</Button>
            <Button asChild variant="outline"><Link href="/contact">聯繫 XK SYSTEM<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="ghost"><Link href="/portfolio">相關作品<ArrowUpRight aria-hidden="true" /></Link></Button>
          </div>
          <p id="quotation-copy-status" role="status" aria-live="polite" aria-atomic="true" className="type-body-sm mt-4 min-h-6 text-foreground">{copyStatus}</p>
          <label htmlFor="quotation-inquiry-text" className="type-body mt-6 mb-3 block font-medium text-primary">完整詢價摘要（可手動選取複製）</label>
          <textarea ref={summaryTextRef} id="quotation-inquiry-text" readOnly rows={12} value={inquiry?.text ?? ""} aria-describedby="quotation-inquiry-note" className={cn(fieldClass, "resize-y")} />
        </Container>
      </Section>
    </div>
  );
}
