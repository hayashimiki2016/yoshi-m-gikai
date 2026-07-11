import { getAllBills } from "@/lib/bills";
import { CATEGORIES, OTHER_CATEGORY, categoryLabel } from "@/lib/categories";
import { BillCard } from "@/components/BillCard";
import { siteConfig } from "@/lib/siteConfig";

export default function Home() {
  const bills = getAllBills();

  const usedCategoryIds = Array.from(new Set(bills.map((b) => b.category)));
  const knownIds = new Set(CATEGORIES.map((c) => c.id));
  const orderedCategoryIds = [
    ...CATEGORIES.map((c) => c.id),
    ...usedCategoryIds.filter((id) => !knownIds.has(id)),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <section className="mb-12 rounded-3xl bg-grad px-6 py-12 text-[#fff8f2] shadow-brand sm:px-10">
        <p className="text-sm font-semibold text-[#fff3e4]">
          吉川市議会 議案説明サイト
        </p>
        <h1 className="mt-2 text-2xl font-black leading-snug sm:text-3xl">
          いま吉川市議会で
          <br className="sm:hidden" />
          話し合われていること
        </h1>
        <p className="mt-3 max-w-2xl text-[#fff3e4]">
          {siteConfig.description}
        </p>
      </section>

      {orderedCategoryIds.map((categoryId) => {
        const categoryBills = bills.filter((b) => b.category === categoryId);
        if (categoryBills.length === 0) return null;
        const label =
          categoryId === OTHER_CATEGORY.id
            ? OTHER_CATEGORY.label
            : categoryLabel(categoryId);

        return (
          <section key={categoryId} className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-ink">{label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {categoryBills.map((bill) => (
                <BillCard key={bill.slug} bill={bill} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
