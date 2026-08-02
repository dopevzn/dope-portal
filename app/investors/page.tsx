import Link from "next/link";

const documents = [
  {
    title: "Investment Memorandum",
    description: "Company strategy, operating model, five-year plan, risks, and investment discussion.",
    href: "https://docs.google.com/document/d/1eRZaL05NK-6xfi8l-0w4jke98jg-SjGohuNJA9KDonE/edit",
  },
  {
    title: "Financial Model",
    description: "Historical baseline, Year 1 monthly forecast, five-year model, scenarios, break-even, and use of funds.",
    href: "https://docs.google.com/spreadsheets/d/1daw1a-GBSWPgp6R76LsseMFY8eETt6nJSwcJl3WAV0k/edit",
  },
  {
    title: "Pitch Deck",
    description: "Concise investor presentation covering opportunity, traction, growth strategy, and capital deployment.",
    href: "https://docs.google.com/presentation/d/1yCI5McA1dwDHmzUgB6NDODQby4zLmls3stEGJhhFOI8/edit",
  },
];

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">DOPE VZN</p>
              <p className="mt-2 text-sm text-white/70">Private Investor Portal</p>
            </div>
            <div className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60">
              Confidential
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d8ff42]">Private access</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Building a nationally capable production company.
            </h1>
          </div>
          <div className="max-w-xl lg:pb-2">
            <p className="text-lg leading-8 text-white/65">
              This portal contains the current investment memorandum, financial model, pitch deck, and diligence materials for DOPE VZN.
            </p>
            <p className="mt-5 text-sm leading-6 text-white/45">
              Materials are provided for private discussion only. Financial projections are management assumptions and are not guarantees.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-10 lg:grid-cols-4 lg:px-10">
          {[
            ["$55K", "Management-reported revenue", "Dec. 2024 to Dec. 2025"],
            ["$10K", "Capital under discussion", "Targeted growth capital"],
            ["60%", "Year 1 gross-margin target", "Base-case assumption"],
            ["$225K", "Year 5 base-case revenue", "Nationally capable boutique"],
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
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">Investor materials</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">Review the company in the right order.</h2>
          <p className="mt-5 text-base leading-7 text-white/60">
            Start with the deck, then review the memorandum and financial model for supporting detail.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {documents.map((document, index) => (
            <a
              key={document.title}
              href={document.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#d8ff42]/50 hover:bg-white/[0.045]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">0{index + 1}</span>
                <span className="text-white/30 transition group-hover:text-[#d8ff42]">↗</span>
              </div>
              <h3 className="mt-14 text-2xl font-bold">{document.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/50">{document.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>DOPE VZN · Confidential Investor Materials</p>
          <Link href="/investors/david-keyser" className="font-semibold text-white/80 hover:text-[#d8ff42]">
            Open David Keyser room →
          </Link>
        </div>
      </section>
    </main>
  );
}
