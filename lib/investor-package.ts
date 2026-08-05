export const investorDocuments = [
  {
    title: "Pitch Deck",
    description:
      "The investor presentation covering the opportunity, traction, financial outlook, and capital plan.",
    href: "https://docs.google.com/presentation/d/1muoa-qxBQt35pVclDit8DSupDSqms2QJQ7ISgBuHrpM/edit",
    type: "presentation",
  },
  {
    title: "Investment Memorandum",
    description:
      "The business model, market position, operating plan, financial assumptions, risks, and five-year roadmap.",
    href: "https://docs.google.com/document/d/1eRZaL05NK-6xfi8l-0w4jke98jg-SjGohuNJA9KDonE/edit",
    type: "document",
  },
  {
    title: "Financial Model",
    description:
      "The management-reported historical baseline, Year 1 forecast, five-year model, scenarios, break-even analysis, and use of funds.",
    href: "https://docs.google.com/spreadsheets/d/1daw1a-GBSWPgp6R76LsseMFY8eETt6nJSwcJl3WAV0k/edit",
    type: "spreadsheet",
  },
] as const;

export const investorMetrics = [
  ["$55K", "Historical revenue", "Management-reported · Dec. 2024–Dec. 2025"],
  ["$10K", "Capital discussion", "Targeted growth capital"],
  ["60%", "Year 1 gross margin", "Base-case planning assumption"],
  ["$225K", "Year 5 revenue", "Base-case projection"],
] as const;

export const useOfFunds = [
  ["Working capital reserve", "$4,000", "40%"],
  ["Professional services and investment readiness", "$2,000", "20%"],
  ["Operating technology stack", "$1,800", "18%"],
  ["Sales pipeline and client acquisition", "$800", "8%"],
  ["Financial controls and investor reporting", "$700", "7%"],
  ["Data protection and workflow standards", "$500", "5%"],
  ["Contingency", "$200", "2%"],
] as const;

export const investorDisclaimer =
  "Confidential. Prepared solely for private discussion. Historical revenue is management-reported and subject to diligence. Projections are management estimates, not guarantees of future performance. This material is not a formal securities offering or legal, tax, accounting, or investment advice.";
