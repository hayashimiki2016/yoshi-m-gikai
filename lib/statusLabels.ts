import type { BillStatus } from "./types";

export const STATUS_LABELS: Record<BillStatus, string> = {
  審議中: "審議中",
  可決: "可決・承認",
  否決: "否決・不承認",
};

export const STATUS_OPTIONS: BillStatus[] = ["審議中", "可決", "否決"];
