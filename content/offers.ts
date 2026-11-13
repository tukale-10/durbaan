export type OfferLine = "impact" | "partner" | "business" | "enterprise";

export const offers: Record<
  OfferLine,
  { name: string; href: string; audience: string; problem: string; promise: string; leadPackage: string; short: string }
> = {
  impact: {
    name: "Durbaan Impact",
    href: "/impact",
    audience: "NGOs, INGO country programs, UN and donor-funded projects",
    problem: "Donors cannot see or trust your results.",
    promise: "Your impact, visible and credible to donors.",
    leadPackage: "Donor-Ready",
    short: "For NGOs and programs",
  },
  partner: {
    name: "Durbaan Partner",
    href: "/partners",
    audience: "Consultancies, research and evaluation firms, agencies",
    problem: "You win contracts but lack media, data and design capacity.",
    promise: "Your delivery team for stories, data and design.",
    leadPackage: "Bid and Delivery Partner",
    short: "For consultancies and agencies",
  },
  business: {
    name: "Durbaan Business",
    href: "/business",
    audience: "Clinics, schools, hotels, restaurants, logistics and retail",
    problem: "Customers do not find you or trust you online.",
    promise: "Look like the business you already are.",
    leadPackage: "Business Credibility Kit",
    short: "For growing businesses",
  },
  enterprise: {
    name: "Durbaan Enterprise",
    href: "/enterprise",
    audience: "Telecoms, banks, remittance companies, large firms and government agencies",
    problem: "Reporting, CSR and internal data are scattered and dull.",
    promise: "Your performance, clear to your board and your public.",
    leadPackage: "Annual and Impact Report",
    short: "For corporates and institutions",
  },
};
