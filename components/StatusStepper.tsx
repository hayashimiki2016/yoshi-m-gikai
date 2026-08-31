import type { BillStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/statusLabels";

const STAGE: Record<BillStatus, number> = {
  上程: 1,
  審議中: 2,
  可決: 3,
  否決: 3,
};

export function StatusStepper({ status }: { status: BillStatus }) {
  const current = STAGE[status];
  const isFinal = current === 3;

  const steps: { label: string; active: boolean; done: boolean }[] = [
    { label: "上程", active: current === 1, done: current >= 1 },
    { label: "審議中", active: current === 2, done: current >= 2 },
    {
      label: isFinal ? STATUS_LABELS[status] : "議決",
      active: isFinal,
      done: isFinal,
    },
  ];

  return (
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 font-semibold ${
              step.active
                ? "bg-grad text-[#fff8f2] shadow-brand"
                : step.done
                  ? "bg-tint text-brand-700"
                  : "bg-tint text-ink-faint"
            }`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && <span className="text-line">→</span>}
        </li>
      ))}
    </ol>
  );
}
