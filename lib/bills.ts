import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Bill, BillFrontmatter } from "./types";

const BILLS_DIR = path.join(process.cwd(), "content", "bills");

export function getAllBillSlugs(): string[] {
  return fs
    .readdirSync(BILLS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getBillBySlug(slug: string): Bill {
  const filePath = path.join(BILLS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    ...(data as BillFrontmatter),
    slug,
    content,
  };
}

export function getAllBills(): Bill[] {
  return getAllBillSlugs()
    .map((slug) => getBillBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.submittedDate).getTime() -
        new Date(a.submittedDate).getTime()
    );
}
