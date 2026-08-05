"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dope_vzn_david_access";

function getExpectedToken() {
  const password = process.env.DAVID_INVESTOR_PASSWORD;
  const secret = process.env.DAVID_INVESTOR_SESSION_SECRET || password;

  if (!password || !secret) {
    throw new Error("Investor portal password is not configured.");
  }

  return createHmac("sha256", secret)
    .update("david-keyser-capital-room:v1")
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function unlockDavidRoom(formData: FormData) {
  const submittedPassword = String(formData.get("password") ?? "").slice(0, 128);
  const expectedPassword = process.env.DAVID_INVESTOR_PASSWORD;

  if (!expectedPassword) {
    redirect("/investors/david-keyser?error=configuration");
  }

  if (!safeEqual(submittedPassword, expectedPassword)) {
    redirect("/investors/david-keyser?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, getExpectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/investors/david-keyser",
    maxAge: 60 * 60 * 8,
    priority: "high",
  });

  redirect("/investors/david-keyser");
}

export async function lockDavidRoom() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/investors/david-keyser");
}

export async function hasDavidAccess() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    return Boolean(token && safeEqual(token, getExpectedToken()));
  } catch {
    return false;
  }
}
