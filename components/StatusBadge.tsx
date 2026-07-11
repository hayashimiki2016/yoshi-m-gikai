import type { BillStatus } from "@/lib/types";

const STATUS_STYLES: Record<BillStatus, string> = {
  審議中: "bg-blue-100 text-blue-800 ring-blue-600/20",
  可決: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  否決: "bg-rose-100 text-rose-800 ring-rose-600/20",
  継続審査: "bg-amber-100 text-amber-800 ring-amber-600/20",
  取り下げ: "bg-tint text-ink-soft ring-ink-faint/20",
};

export function StatusBadge({ status }: { status: BillStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
