import matter from "gray-matter";

const OWNER = "hayashimiki2016";
const REPO = "yoshi-m-gikai";
const BRANCH = "main";
const BILLS_DIR = "content/bills";

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

interface GithubFile {
  path: string;
  content: string;
  sha: string;
}

export interface AdminBillSummary {
  path: string;
  title: string;
  summary: string;
  status: string;
  councilorComment: string;
}

export async function listBillPaths(): Promise<string[]> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${BILLS_DIR}?ref=${BRANCH}`,
    { headers: authHeaders(), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`議案一覧の取得に失敗しました (${res.status})`);
  }
  const data: { name: string; path: string }[] = await res.json();
  return data
    .filter((f) => f.name.endsWith(".md"))
    .map((f) => f.path)
    .sort();
}

async function getBillFile(path: string): Promise<GithubFile> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: authHeaders(), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`${path} の取得に失敗しました (${res.status})`);
  }
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { path, content, sha: data.sha };
}

export async function getAdminBillSummary(
  path: string
): Promise<AdminBillSummary> {
  const { content } = await getBillFile(path);
  const { data } = matter(content);
  return {
    path,
    title: data.title ?? "",
    summary: data.summary ?? "",
    status: data.status ?? "審議中",
    councilorComment: data.councilorComment ?? "",
  };
}

export async function updateBillStatusAndComment(
  path: string,
  status: string,
  councilorComment: string
): Promise<void> {
  const { content, sha } = await getBillFile(path);
  const parsed = matter(content);
  parsed.data.status = status;
  parsed.data.councilorComment = councilorComment;
  const newContent = matter.stringify(parsed.content, parsed.data);

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `管理画面から更新: ${path}`,
        content: Buffer.from(newContent, "utf8").toString("base64"),
        sha,
        branch: BRANCH,
      }),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${path} の更新に失敗しました (${res.status}) ${errText}`);
  }
}
