import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

import { ClerkSetupRequired } from "@/components/auth/clerk-setup-required";
import { BrandMark } from "@/components/brand-mark";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <ClerkSetupRequired
        title="Clerk is not configured yet."
        description="Add your Clerk publishable key and secret key to .env.local to render the production sign-in flow."
      />
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,255,66,0.08),transparent_28%,rgba(255,53,72,0.08)),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />
      <div className="relative flex w-full max-w-md flex-col gap-6">
        <Link href="/" aria-label="Return to DOPE Portal home">
          <BrandMark />
        </Link>
        <div className="rounded-[8px] border border-border bg-card p-4 shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/app"
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "w-full shadow-none",
                card: "bg-transparent shadow-none border-0 text-foreground",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton:
                  "border border-border bg-background text-foreground hover:bg-secondary",
                formFieldLabel: "text-foreground",
                formFieldInput:
                  "rounded-md border-border bg-background text-foreground",
                footerActionText: "text-muted-foreground",
                footerActionLink: "text-primary",
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
