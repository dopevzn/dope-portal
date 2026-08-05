import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileText,
  LockKeyhole,
  LogOut,
  Presentation,
  ShieldCheck,
  Target,
} from "lucide-react";

import {
  investorDisclaimer,
  investorDocuments,
  investorMetrics,
  useOfFunds,
} from "@/lib/investor-package";
import { hasDavidAccess, lockDavidRoom, unlockDavidRoom } from "./actions";

type PageProps = { searchParams: Promise<{ error?: string }> };

export const dynamic = "force-dynamic";

function Logo({ className = "" }: { className?: string }) {
  return <Image src="/dopevzn-logo.webp" alt="DOPE VZN" width={600} height={283} priority className={className} />;
}

function AccessScreen({ error }: { error?: string }) {
  const message = error === "invalid" ? "That password is not correct. Please try again." : error === "configuration" ? "Private access is temporarily unavailable." : null;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(215,38,56,0.2),transparent_34%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:auto,64px_64px,64px_64px]" />
      <div className="relative w-full max-w-lg rounded-[28px] border border-white/10 bg-black/80 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <Logo className="h-auto w-36 object-contain" />
          <div className="rounded-full border border-[#D72638]/40 bg-[#D72638]/10 p-3 text-[#D72638]"><LockKeyhole className="size-5" /></div>
        </div>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.28em] text-[#D72638]">Private Capital Room</p>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Prepared for David Keyser.</h1>
        <p className="mt-5 text-base leading-7 text-white/55">Enter the private access password to review the investment opportunity, financial materials, and next steps.</p>
        <form action={unlockDavidRoom} className="mt-10">
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Access password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" maxLength={128} required className="mt-3 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/25" placeholder="Enter password" />
          {message ? <p className="mt-3 text-sm text-[#ff6b7d]">{message}</p> : null}
          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D72638] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ee3347]">Enter Capital Room <ArrowUpRight className="size-4" /></button>
        </form>
        <p className="mt-8 text-xs leading-5 text-white/30">{investorDisclaimer}</p>
      </div>
    </main>
  );
}

function DavidRoom() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4"><Logo className="h-auto w-24 object-contain" /><div className="h-8 w-px bg-white/15" /><p className="text-sm text-white/65">Capital Room · David Keyser</p></div>
          <form action={lockDavidRoom}><button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 transition hover:border-[#D72638]/60 hover:text-white">Exit <LogOut className="size-3.5" /></button></form>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(215,38,56,0.2),transparent_36%)]" />
        <Logo className="pointer-events-none absolute -right-16 top-8 hidden w-[38rem] opacity-[0.035] lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-10 lg:py-28">
          <div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D72638]">Prepared exclusively for David Keyser</p><h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Thank you for believing in the vision.</h1></div>
          <div className="max-w-xl lg:pb-2"><p className="text-lg leading-8 text-white/65">You believed in DOPE VZN before there was a formal capital process. This room gives you a clear and honest view of where the company stands, where it is going, and how your potential investment would be used.</p><p className="mt-6 text-sm font-semibold text-white/80">Michael Sanders</p><p className="mt-1 text-sm text-white/40">Director of Storytelling</p></div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02]"><div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-8 lg:grid-cols-4 lg:px-10">{investorMetrics.map(([value,label,note])=><div key={label} className="border-white/10 px-3 py-6 lg:border-r lg:px-8 last:border-r-0"><p className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{value}</p><p className="mt-3 text-sm font-semibold text-white/80">{label}</p><p className="mt-1 text-xs text-white/35">{note}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">The opportunity</p><h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">From project work to a durable production company.</h2></div><div className="grid gap-4 sm:grid-cols-2">{[["Existing demand","Management reports $55,000 in revenue from December 2024 through December 2025."],["Clear growth use","Capital is directed toward working capital, software, financial systems, and sales infrastructure."],["Lean operating model","DOPE VZN can scale through a curated contractor network before taking on heavy fixed payroll."],["National capability","The five-year plan builds multi-city production systems without premature office expansion."]].map(([title,copy])=><div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><CheckCircle2 className="size-5 text-[#D72638]" /><h3 className="mt-7 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></div>)}</div></div></section>

      <section className="border-y border-white/10 bg-[#0a0a0a]"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">Capital deployment</p><h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">Every dollar has a defined job.</h2><p className="mt-5 text-base leading-7 text-white/55">The raise strengthens the operating foundation. It is not intended for owner lifestyle, unnecessary equipment, or vague growth.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-white/10">{useOfFunds.map(([category,amount,percent],index)=><div key={category} className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-5 sm:px-7 ${index !== useOfFunds.length-1 ? "border-b border-white/10" : ""}`}><p className="text-sm font-semibold text-white/75">{category}</p><p className="text-sm font-bold text-white">{amount}</p><p className="w-10 text-right text-sm text-white/35">{percent}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D72638]">Private investor briefing</p><h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">Start with the deck. Go deeper from there.</h2></div><p className="max-w-md text-sm leading-6 text-white/45">The narrative and numbers are maintained as one investor package for a consistent diligence experience.</p></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{investorDocuments.map((document,index)=>{const Icon=document.type === "presentation" ? Presentation : document.type === "document" ? FileText : BarChart3;return <a key={document.title} href={document.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#D72638]/60 hover:bg-white/[0.045]"><div className="flex items-center justify-between"><Icon className="size-5 text-[#D72638]" /><span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">0{index+1}</span></div><h3 className="mt-14 text-2xl font-bold">{document.title}</h3><p className="mt-4 text-sm leading-6 text-white/50">{document.description}</p><div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition group-hover:text-white">Open document <ArrowUpRight className="size-4" /></div></a>})}</div></section>

      <section className="border-t border-white/10 bg-white/[0.02]"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-3 lg:px-10">{[[ShieldCheck,"Relationship first","Written terms, honest risk disclosure, and no exaggerated promises protect the friendship."],[Target,"Clear accountability","Quarterly reporting covers revenue, gross margin, cash, pipeline, milestones, use of funds, and risks."],[BarChart3,"Professional review","The final structure will be selected only after legal, tax, ownership, and financial review."]].map(([Icon,title,copy])=><div key={String(title)}><Icon className="size-6 text-[#D72638]" /><h3 className="mt-6 text-xl font-bold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-white/50">{String(copy)}</p></div>)}</div></section>

      <footer className="border-t border-white/10"><div className="mx-auto max-w-7xl px-6 py-8 text-xs leading-5 text-white/30 lg:px-10"><p>DOPE VZN Capital Room · Prepared for David Keyser</p><p className="mt-3 max-w-5xl">{investorDisclaimer}</p></div></footer>
    </main>
  );
}

export default async function DavidKeyserPage({ searchParams }: PageProps) {
  const hasAccess = await hasDavidAccess();
  const { error } = await searchParams;
  if (!hasAccess) return <AccessScreen error={error} />;
  return <DavidRoom />;
}
