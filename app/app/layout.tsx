import { auth } from "@clerk/nextjs/server";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app/app-shell";

export const dynamic = "force-dynamic";

export default async function ProtectedAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    !process.env.CLERK_SECRET_KEY
  ) {
    const { ClerkSetupRequired } = await import(
      "@/components/auth/clerk-setup-required"
    );

    return (
      <ClerkSetupRequired
        title="Protected app shell is waiting on Clerk."
        description="Add the Clerk publishable key and secret key to .env.local to activate authentication and view the RecruitLook command center."
      />
    );
  }

  await auth.protect({ unauthenticatedUrl: "/sign-in" });

  return <AppShell>{children}</AppShell>;
}
