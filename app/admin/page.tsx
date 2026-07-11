import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";
import {
  type AdminBillSummary,
  getAdminBillSummary,
  listBillPaths,
} from "@/lib/githubContent";
import { STATUS_OPTIONS, STATUS_LABELS } from "@/lib/statusLabels";
import { loginAction, logoutAction, updateBillAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  const authed = verifySessionToken(token, process.env.ADMIN_PASSWORD ?? "");

  if (!authed) {
    return <LoginScreen error={error} />;
  }

  let bills: AdminBillSummary[];
  let loadError: string | null = null;
  try {
    const paths = await listBillPaths();
    bills = await Promise.all(paths.map((p) => getAdminBillSummary(p)));
  } catch (e) {
    bills = [];
    loadError = e instanceof Error ? e.message : "議案一覧の取得に失敗しました";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-black text-ink">管理画面</h1>
        <form action={logoutAction}>
          <button className="text-sm text-ink-soft underline underline-offset-2">
            ログアウト
          </button>
        </form>
      </div>

      {saved === "1" && (
        <p className="mb-6 rounded-xl bg-tint px-4 py-3 text-sm text-brand-700">
          保存しました。1分ほどで公開サイトに反映されます。
        </p>
      )}
      {error === "save" && (
        <p className="mb-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          保存に失敗しました。もう一度お試しください。
        </p>
      )}
      {loadError && (
        <p className="mb-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {loadError}
        </p>
      )}

      <div className="space-y-6">
        {bills.map((bill) => (
          <form
            key={bill.path}
            action={updateBillAction}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <input type="hidden" name="path" value={bill.path} />
            <p className="font-bold text-ink">{bill.summary || bill.title}</p>
            <p className="mt-1 text-xs text-ink-faint">{bill.path}</p>

            <label className="mt-4 block text-sm font-semibold text-ink-soft">
              状況
              <select
                name="status"
                defaultValue={bill.status}
                className="mt-1 block w-full rounded-lg border border-line bg-cream px-3 py-2 text-ink"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-ink-soft">
              林みきからの一言
              <textarea
                name="comment"
                defaultValue={bill.councilorComment}
                rows={4}
                className="mt-1 block w-full rounded-lg border border-line bg-cream px-3 py-2 text-ink"
              />
            </label>

            <button
              type="submit"
              className="mt-4 rounded-full bg-grad px-5 py-2 text-sm font-bold text-[#fff8f2] shadow-brand"
            >
              保存する
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ error }: { error?: string }) {
  return (
    <div className="mx-auto max-w-sm px-4 py-20 sm:px-6">
      <h1 className="text-xl font-black text-ink">管理画面ログイン</h1>
      <form action={loginAction} className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-semibold text-ink-soft">
          パスワード
          <input
            type="password"
            name="password"
            autoFocus
            className="mt-1 block w-full rounded-lg border border-line bg-cream px-3 py-2 text-ink"
          />
        </label>
        {error === "1" && (
          <p className="text-sm text-rose-600">パスワードが違います。</p>
        )}
        <button
          type="submit"
          className="rounded-full bg-grad px-5 py-2 text-sm font-bold text-[#fff8f2] shadow-brand"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
