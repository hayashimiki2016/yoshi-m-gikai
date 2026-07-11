export type BillStatus = "審議中" | "可決" | "否決" | "継続審査" | "取り下げ";

export interface KeyPoint {
  heading: string;
  body: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface BillFrontmatter {
  title: string;
  summary: string;
  status: BillStatus;
  submittedDate: string;
  session: string;
  category: string;
  tags?: string[];
  sourceLinks?: SourceLink[];
  keyPoints?: KeyPoint[];
  background?: string;
  discussionPoints?: KeyPoint[];
  affectedPeople?: string[];
  councilorComment?: string;
  isSample?: boolean;
  sampleNote?: string;
}

export interface Bill extends BillFrontmatter {
  slug: string;
  content: string;
}
