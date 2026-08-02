import Link from "next/link";
import { ArrowRight, BarChart3, FileText, Presentation, ShieldCheck } from "lucide-react";

const documents = [
  {
    title: "Investment Memorandum",
    description: "Company strategy, operating model, financial plan, risks, and five-year roadmap.",
    href: "https://docs.google.com/document/d/1eRZaL05NK-6xfi8l-0w4jke98jg-SjGohuNJA9KDonE/edit",
    icon: FileText,
  },
  {
    title: "Financial Model",
    description: "Historical baseline, monthly forecast, five-year model, scenarios, break-even, and use of funds.",
    href: "https://docs.google.com/spreadsheets/d/1daw1a-GBSWPgp6R76LsseMFY8eETt6nJSwcJl3WAV0k/edit",
    icon: BarChart3,
  },
  {
    title: "Pitch Deck",
    description: "The complete 12-slide investor presentation covering the opportunity, traction, growth strategy, financial outlook, and capital deployment.",
    href: "https://docs.google.com/presentation/d/1muoa-qxBQt35pVclDit8DSupDSqms2QJQ7ISgBuHrpM/edit",
    icon: Presentation,
  },
] as const;

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/40">DOPE VZN</p>
            <p className="mt-2 text-sm text-white/70">Capital Room</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/50">
            <ShieldCheck className="size-4 text-[#D90429]" /> Confidential
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,4,41,0.18),transparent_34%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D90429]">Private capital access</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                Cinematic storytelling. National ambition. Disciplined growth.
              </h1>
            </div>
            <div className="max-w-xl lg:pb-2">
              <p className="text-lg leading-8 text-white/65">
                The DOPE VZN Capital Room gives prospective investment partners a clear view of the company, financial model, growth plan, and capital strategy.
              </p>
              <Link
                href="/investors/david-keyser"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D90429] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ef183c]"
              >
                Enter David Keyser Room <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-8 lg:grid-cols-4 lg:px-10">
          {[
            ["$55K", "Historical revenue", "Dec. 2024-Dec. 2025"],
            ["$10K", "Capital discussion", "Targeted growth capital"],
            ["60%", "Year 1 margin target", "Base-case assumption"],
            ["$225K", "Year 5 revenue", "Base-case forecast"],
          ].map(([value, label, note]) => (
            <div key={label} className="border-white/10 px-4 py-6 lg:border-r lg:px-8 last:border-r-0">
              <p className="text-4xl font-black tracking-[-0.04em]">{value}</p>
              <p className="mt-3 text-sm font-semibold text-white/80">{label}</p>
              <p className="mt-1 text-xs text-white/40">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D90429]">Core materials</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">Review the opportunity in the right order.</h2>
          <p className="mt-5 text-base leading-7 text-white/50">Start with the pitch deck, then use the memorandum and model for deeper diligence.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {documents.map((document, index) => {
            const Icon = document.icon;
            return (
              <a
                key={document.title}
                href={document.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#D90429]/60 hover:bg-white/[0.045]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-[#D90429]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">0{index + 1}</span>
                </div>
                <h3 className="mt-14 text-2xl font-bold">{document.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/50">{document.description}</p>
              </a>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>DOPE VZN Capital Room</p>
          <p>Confidential - Private discussion only</p>
        </div>
      </footer>
    </main>
  );
}
