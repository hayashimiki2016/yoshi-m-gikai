import type { BillStatus } from "./types";

export const STATUS_LABELS: Record<BillStatus, string> = {
  上程: "上程",
  審議中: "審議中",
  可決: "可決・承認",
  否決: "否決・不承認",
};

export const STATUS_OPTIONS: BillStatus[] = ["上程", "審議中", "可決", "否決"];
