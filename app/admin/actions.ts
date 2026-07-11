"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  createSessionToken,
  verifySessionToken,
} from "@/lib/adminAuth";
import { updateBillStatusAndComment } from "@/lib/githubContent";

async function requireSession() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_PASSWORD ?? "";
  if (!verifySessionToken(token, secret)) {
    redirect("/admin");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    redirect("/admin?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, createSessionToken(expected), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin");
}

export async function updateBillAction(formData: FormData) {
  await requireSession();

  const path = String(formData.get("path") ?? "");
  const status = String(formData.get("status") ?? "");
  const comment = String(formData.get("comment") ?? "");

  if (!path) redirect("/admin?error=1");

  try {
    await updateBillStatusAndComment(path, status, comment);
  } catch {
    redirect("/admin?error=save");
  }

  redirect("/admin?saved=1");
}
