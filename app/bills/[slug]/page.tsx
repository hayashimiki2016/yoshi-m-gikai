import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBillSlugs, getAllBills, getBillBySlug } from "@/lib/bills";
import { categoryLabel } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";
import { SampleBadge } from "@/components/SampleBadge";
import { StatusStepper } from "@/components/StatusStepper";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getAllBillSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = new Set(getAllBillSlugs());
  if (!slugs.has(slug)) return {};
  const bill = getBillBySlug(slug);
  return { title: `${bill.title}｜${siteConfig.name}` };
}

export default async function BillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = new Set(getAllBillSlugs());
  if (!slugs.has(slug)) notFound();
  const bill = getBillBySlug(slug);
  const otherBills = getAllBills()
    .filter((b) => b.slug !== bill.slug && b.category === bill.category)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="text-sm text-brand-600 underline underline-offset-2"
      >
        ← トップに戻る
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={bill.status} />
        {bill.isSample && <SampleBadge />}
        <span className="text-sm text-ink-faint">
          {formatDate(bill.submittedDate)} 提出 ／ {bill.session}
        </span>
      </div>

      {bill.isSample && bill.sampleNote && (
        <div className="mt-4 rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 text-sm text-fuchsia-900">
          <p className="font-semibold">このページはサンプルです</p>
          <p className="mt-1 leading-relaxed">{bill.sampleNote}</p>
        </div>
      )}

      <h1 className="mt-4 text-2xl font-black leading-snug text-ink sm:text-3xl">
        {bill.summary}
      </h1>
      <p className="mt-2 text-ink-soft">{bill.title}</p>
      <p className="mt-1 text-sm text-ink-faint">
        {categoryLabel(bill.category)}
      </p>

      <div className="mt-8">
        <StatusStepper status={bill.status} />
      </div>

      {bill.keyPoints && bill.keyPoints.length > 0 && (
        <Section title="🎯 この議案のポイント">
          <ul className="space-y-4">
            {bill.keyPoints.map((point, i) => (
              <li key={i}>
                <p className="font-bold text-ink">{point.heading}</p>
                <p className="mt-1 leading-relaxed text-ink-soft">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {bill.background && (
        <Section title="✏️ なぜこの議案が必要か">
          <p className="leading-relaxed text-ink-soft">{bill.background}</p>
        </Section>
      )}

      {bill.discussionPoints && bill.discussionPoints.length > 0 && (
        <Section title="👀 意見が分かれるところ">
          <ul className="space-y-4">
            {bill.discussionPoints.map((point, i) => (
              <li key={i}>
                <p className="font-bold text-ink">{point.heading}</p>
                <p className="mt-1 leading-relaxed text-ink-soft">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {bill.affectedPeople && bill.affectedPeople.length > 0 && (
        <Section title="🙋 影響を受ける人">
          <ul className="list-inside list-disc space-y-1 text-ink-soft">
            {bill.affectedPeople.map((person, i) => (
              <li key={i}>{person}</li>
            ))}
          </ul>
        </Section>
      )}

      {bill.councilorComment && (
        <Section title={`💬 ${siteConfig.councilorName}からひとこと`}>
          <div className="rounded-xl border-l-4 border-brand-500 bg-tint p-4 leading-relaxed text-ink-soft">
            {bill.councilorComment}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            ※ この欄は事実の要約ではなく、{siteConfig.councilorName}
            個人の意見です。
          </p>
        </Section>
      )}

      {bill.sourceLinks && bill.sourceLinks.length > 0 && (
        <Section title="🌐 関連リンク（一次資料）">
          <ul className="list-inside list-disc space-y-1">
            {bill.sourceLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline underline-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {otherBills.length > 0 && (
        <Section title={`${categoryLabel(bill.category)}の他の議案`}>
          <ul className="space-y-2">
            {otherBills.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/bills/${b.slug}`}
                  className="text-brand-600 underline underline-offset-2"
                >
                  {b.summary}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-line pt-6">
      <h2 className="mb-3 text-lg font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
