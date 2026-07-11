import type { BillStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/statusLabels";

export function StatusStepper({ status }: { status: BillStatus }) {
  const isFinal = status !== "審議中";

  const steps: { label: string; active: boolean; done: boolean }[] = [
    { label: "提出", active: false, done: true },
    { label: "審議中", active: !isFinal, done: true },
    { label: isFinal ? STATUS_LABELS[status] : "議決", active: isFinal, done: isFinal },
  ];

  return (
    <ol className="flex items-center gap-2 text-sm">
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
