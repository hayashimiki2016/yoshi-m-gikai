export interface Category {
  id: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "財政", label: "財政💰" },
  { id: "教育", label: "教育🏫" },
  { id: "子育て", label: "子育て👶" },
  { id: "福祉・医療", label: "福祉・医療🏥" },
  { id: "防災・安全", label: "防災・安全🚨" },
  { id: "環境・ごみ", label: "環境・ごみ🌿" },
  { id: "まちづくり・インフラ", label: "まちづくり・インフラ🏗️" },
  { id: "上下水道", label: "上下水道🚰" },
  { id: "産業・農業", label: "産業・農業🌾" },
  { id: "議会・行政", label: "議会・行政🏛️" },
];

export const OTHER_CATEGORY: Category = { id: "その他", label: "その他" };

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
