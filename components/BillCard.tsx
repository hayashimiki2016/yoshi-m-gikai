import Link from "next/link";
import type { Bill } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { SampleBadge } from "./SampleBadge";
import { formatDate } from "@/lib/format";

export function BillCard({ bill }: { bill: Bill }) {
  return (
    <Link
      href={`/bills/${bill.slug}`}
      className="group flex flex-col gap-3 rounded-[28px] border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-brand"
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={bill.status} />
        {bill.isSample && <SampleBadge />}
        <span className="text-xs text-ink-faint">
          {formatDate(bill.submittedDate)} 提出
        </span>
      </div>
      <p className="text-lg font-bold leading-snug text-ink group-hover:text-brand-600">
        {bill.summary}
      </p>
      <p className="text-sm text-ink-soft">{bill.title}</p>
    </Link>
  );
}
