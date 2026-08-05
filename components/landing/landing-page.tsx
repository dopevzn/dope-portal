import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

import { investorDisclaimer } from "@/lib/investor-package";

export function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(215,38,56,0.2),transparent_34%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />

      <header className="relative border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Image
            src="/dopevzn-logo.webp"
            alt="DOPE VZN"
            width={600}
            height={283}
            priority
            className="h-auto w-28 object-contain"
          />
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/50">
            <ShieldCheck className="size-4 text-[#D72638]" /> Confidential
          </div>
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D72638]">
              Private capital access
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              DOPE VZN Capital Room.
            </h1>
          </div>
          <div className="max-w-xl lg:pb-2">
            <LockKeyhole className="size-7 text-[#D72638]" />
            <p className="mt-7 text-lg leading-8 text-white/65">
              Confidential materials are available only through a personalized,
              password-protected investor room.
            </p>
            <Link
              href="/investors/david-keyser"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D72638] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ee3347]"
            >
              Enter private room <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 text-xs leading-5 text-white/30 lg:px-10">
          {investorDisclaimer}
        </div>
      </footer>
    </main>
  );
}
