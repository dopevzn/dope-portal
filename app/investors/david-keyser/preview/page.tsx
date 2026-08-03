import Image from "next/image";
import { ArrowUpRight, BarChart3, CheckCircle2, FileText, Presentation, ShieldCheck, Target } from "lucide-react";

const documents = [
  {
    title: "Pitch Deck",
    description: "The complete investor presentation covering the opportunity, traction, financial outlook, and capital plan.",
    href: "https://docs.google.com/presentation/d/1muoa-qxBQt35pVclDit8DSupDSqms2QJQ7ISgBuHrpM/edit",
    icon: Presentation,
  },
  {
    title: "Investment Memorandum",
    description: "Detailed business model, market position, operations, risks, and five-year roadmap.",
    href: "https://docs.google.com/document/d/1eRZaL05NK-6xfi8l-0w4jke98jg-SjGohuNJA9KDonE/edit",
    icon: FileText,
  },
  {
    title: "Financial Model",
    description: "Historical baseline, five-year model, scenarios, break-even, and use of funds.",
    href: "https://docs.google.com/spreadsheets/d/1daw1a-GBSWPgp6R76LsseMFY8eETt6nJSwcJl3WAV0k/edit",
    icon: BarChart3,
  },
] as const;

const funds = [
  ["Working capital reserve", "$4,000", "40%"],
  ["Legal and accounting readiness", "$2,000", "20%"],
  ["Essential software", "$1,800", "18%"],
  ["Sales and CRM implementation", "$900", "9%"],
  ["Financial systems", "$700", "7%"],
  ["Workflow and data protection", "$400", "4%"],
  ["Contingency", "$200", "2%"],
] as const;

function Logo({ className = "" }: { className?: string }) {
  return <Image src="/dopevzn-logo.webp" alt="DOPE VZN" width={560} height={560} priority className={className} />;
}

export default function DavidKeyserPreviewPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <Logo className="h-auto w-24 object-contain" />
            <div className="h-8 w-px bg-white/15" />
            <p className="text-sm text-white/65">Capital Room · David Keyser</p>
          </div>
          <p className="rounded-full border border-[#D72638]/40 bg-[#D72638]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6b7d]">Preview</p>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(215,38,56,0.2),transparent_36%)]" />
        <Logo className="pointer-events-none absolute -right-16 top-8 hidden w-[38rem] opacity-[0.035] lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-10 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D72638]">Prepared exclusively for David Keyser</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Thank you for believing in the vision.</h1>
          </div>
          <div className="max-w-xl lg:pb-2">
            <p className="text-lg leading-8 text-white/65">You believed in DOPE VZN before there was a formal capital process. This room gives you a clear and honest view of where the company stands, where it is going, and how your potential investment would be used.</p>
            <p className="mt-6 text-sm font-semibold text-white/80">Michael Sanders</p>
            <p className="mt-1 text-sm text-white/40">Director of Storytelling</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-8 lg:grid-cols-4 lg:px-10">
          {[["$55K", "Historical revenue", "Dec. 2024-Dec. 2025"], ["$10K", "Investment discussion", "Targeted growth capital"], ["60%", "Year 1 margin target", "Base-case assumption"], ["$225K", "Year 5 revenue", "Base-case forecast"]].map(([value, label, note]) => (
            <div key={label} className="border-white/10 px-3 py-6 lg:border-r lg:px-8 last:border-r-0">
              <p className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{value}</p>
              <p className="mt-3 text-sm font-semibold text-white/80">{label}</p>
              <p className="mt-1 text-xs text-white/35">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">The opportunity</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">From project work to a durable production company.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[["Existing demand", "Management reports $55,000 in revenue from December 2024 through December 2025."], ["Clear growth use", "Capital is directed toward working capital, software, financial systems, and sales infrastructure."], ["Lean operating model", "DOPE VZN can scale through a curated contractor network before taking on heavy fixed payroll."], ["National capability", "The five-year plan builds multi-city production systems without premature office expansion."]].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <CheckCircle2 className="size-5 text-[#D72638]" />
                <h3 className="mt-7 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">Capital deployment</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">Every dollar has a defined job.</h2>
            <p className="mt-5 text-base leading-7 text-white/55">The raise strengthens the operating foundation. It is not intended for owner lifestyle, unnecessary equipment, or vague growth.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            {funds.map(([category, amount, percent], index) => (
              <div key={category} className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-5 sm:px-7 ${index !== funds.length - 1 ? "border-b border-white/10" : ""}`}>
                <p className="text-sm font-semibold text-white/75">{category}</p>
                <p className="text-sm font-bold text-white">{amount}</p>
                <p className="w-10 text-right text-sm text-white/35">{percent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">Private investor briefing</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">Start with the deck. Go deeper from there.</h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {documents.map((document, index) => {
            const Icon = document.icon;
            return (
              <a key={document.title} href={document.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#D72638]/60 hover:bg-white/[0.045]">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-[#D72638]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">0{index + 1}</span>
                </div>
                <h3 className="mt-14 text-2xl font-bold">{document.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/50">{document.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition group-hover:text-white">Open document <ArrowUpRight className="size-4" /></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-3 lg:px-10">
          {[[ShieldCheck, "Relationship first", "Written terms, honest risk disclosure, and no exaggerated promises protect the friendship."], [Target, "Clear accountability", "Quarterly reporting covers revenue, gross margin, cash, pipeline, milestones, use of funds, and risks."], [BarChart3, "Professional review", "The final structure will be selected only after legal, tax, ownership, and financial review."]].map(([Icon, title, copy]) => (
            <div key={String(title)}>
              <Icon className="size-6 text-[#D72638]" />
              <h3 className="mt-6 text-xl font-bold">{String(title)}</h3>
              <p className="mt-3 text-sm leading-6 text-white/50">{String(copy)}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>DOPE VZN Capital Room · Prepared for David Keyser</p>
          <p>Confidential · Private discussion only · Preview mode</p>
        </div>
      </footer>
    </main>
  );
}
