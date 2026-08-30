import type { KessanBreakdownItem, KessanScale } from "@/lib/types";
import { formatYenOku } from "@/lib/kessanFormat";

const BAR_COLORS = [
  "bg-brand-600",
  "bg-brand-500",
  "bg-brand-300",
  "bg-[#e8c39a]",
  "bg-[#d9d2c4]",
  "bg-[#c9beb0]",
];

export function KessanScaleChart({ kessan }: { kessan: KessanScale }) {
  return (
    <div className="space-y-6">
      <BreakdownGroup title="入ってきたお金の内訳（歳入）" items={kessan.income} />
      <BreakdownGroup title="使ったお金の内訳（歳出）" items={kessan.expense} />
    </div>
  );
}

function BreakdownGroup({
  title,
  items,
}: {
  title: string;
  items: KessanBreakdownItem[];
}) {
  const total = items.reduce((sum, item) => sum + item.amountYen, 0);

  return (
    <div className="rounded-2xl border border-line bg-tint p-5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-sm font-bold text-ink">合計 {formatYenOku(total)}</p>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item, i) => {
          const percent = total > 0 ? (item.amountYen / total) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-ink">{item.label}</span>
                <span className="text-ink-soft">
                  {formatYenOku(item.amountYen)}（{percent.toFixed(1)}%）
                </span>
              </div>
              <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-surface">
                <div
                  className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  style={{ width: `${Math.max(1, percent)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
