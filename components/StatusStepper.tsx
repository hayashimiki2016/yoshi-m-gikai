import type { BillStatus } from "@/lib/types";

const FINAL_LABELS: Partial<Record<BillStatus, string>> = {
  可決: "可決・成立",
  否決: "否決",
  継続審査: "継続審査",
  取り下げ: "取り下げ",
};

export function StatusStepper({ status }: { status: BillStatus }) {
  const isFinal = status !== "審議中";
  const finalLabel = FINAL_LABELS[status] ?? status;

  const steps: { label: string; active: boolean; done: boolean }[] = [
    { label: "提出", active: false, done: true },
    { label: "審議中", active: !isFinal, done: true },
    { label: finalLabel, active: isFinal, done: isFinal },
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
