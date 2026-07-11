import type { BillStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/statusLabels";

const STATUS_STYLES: Record<BillStatus, string> = {
  審議中: "bg-blue-100 text-blue-800 ring-blue-600/20",
  可決: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  否決: "bg-rose-100 text-rose-800 ring-rose-600/20",
};

export function StatusBadge({ status }: { status: BillStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
