import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing — Pulse SDK",
  description:
    "Free 1,000 MAU forever. Indie $19/mo. Growth $0.05/MAU. Scale $0.02/MAU. Posted publicly. No sales call.",
};

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  limit: string;
  featured?: boolean;
  features: string[];
  cta: string;
  href: string;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    limit: "1,000 MAU",
    features: [
      "Full SDK access",
      "Real-time presence",
      "3D renderer",
      "\"Built on Pulse\" credit",
    ],
    cta: "Start free",
    href: "/dev/dashboard",
  },
  {
    name: "Indie",
    price: "$19",
    priceSuffix: "/mo",
    limit: "10,000 MAU",
    featured: true,
    features: [
      "Everything in Free",
      "No branding required",
      "Custom domain",
      "Email support",
    ],
    cta: "Upgrade to Indie",
    href: "/dev/dashboard",
  },
  {
    name: "Growth",
    price: "$0.05",
    priceSuffix: "/MAU/mo",
    limit: "10K – 100K MAU",
    features: [
      "Webhooks",
      "Analytics dashboard",
      "Multi-region",
      "Priority support",
    ],
    cta: "Scale on the meter",
    href: "/dev/dashboard",
  },
  {
    name: "Scale",
    price: "$0.02",
    priceSuffix: "/MAU/mo",
    limit: "100K+ MAU",
    features: [
      "Dedicated infra",
      "99.95% SLA",
      "SOC 2 compliance",
      "Custom features",
    ],
    cta: "Talk to us",
    href: "mailto:hello@mypulse.city",
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <Nav />

      <section className="pt-36 pb-12 px-10 max-w-6xl mx-auto">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          Pricing
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
          Transparent. Posted.{" "}
          <span className="pulse-grad-text">No sales call.</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl mb-12">
          Start free. Scale on a public meter. No surprise invoices, no
          minimums, no enterprise unless you actually need it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className="mt-14 bg-card-soft border border-pulse rounded-2xl p-7">
          <div className="text-xs uppercase tracking-widest text-pulse-gold font-semibold mb-3">
            Enterprise
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold mb-1">
                $50K+/yr · unlimited MAU
              </div>
              <div className="text-sm text-muted">
                Dedicated infra, custom features, on-prem option, 24/7
                support.
              </div>
            </div>
            <a
              href="mailto:hello@mypulse.city"
              className="bg-transparent border border-pulse text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white/5 transition whitespace-nowrap"
            >
              hello@mypulse.city
            </a>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-sm text-muted leading-relaxed">
          <FAQ
            q="What's an MAU?"
            a="A monthly active user — any user that emits or subscribes at least once in a calendar month. We dedupe by your userId."
          />
          <FAQ
            q="Do you charge for inactive users?"
            a="No. Pulse is metered on MAU, not seats. If a user doesn't pulse this month, they don't count."
          />
          <FAQ
            q="What about overages?"
            a="Grow into the Growth tier automatically — your dashboard meter is the single source of truth. No surprise invoices."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative rounded-2xl p-7 border ${
        tier.featured
          ? "border-pulse-gold bg-pulse-gold/[0.04]"
          : "border-pulse bg-card-soft"
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-2.5 left-6 bg-pulse-gold text-black text-[9px] px-2 py-0.5 rounded font-bold tracking-widest">
          POPULAR
        </div>
      )}
      <div className="text-xs text-muted tracking-widest uppercase">
        {tier.name}
      </div>
      <div className="text-4xl font-bold mt-2">
        {tier.price}
        {tier.priceSuffix && (
          <span className="text-sm text-muted font-normal">
            {tier.priceSuffix}
          </span>
        )}
      </div>
      <div className="text-pulse-gold text-sm mb-5">{tier.limit}</div>
      <ul className="text-sm text-muted divide-y divide-white/5">
        {tier.features.map((f) => (
          <li key={f} className="py-1.5">
            <span className="text-pulse-gold">→</span> {f}
          </li>
        ))}
      </ul>
      <Link
        href={tier.href}
        className={`block text-center mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm transition ${
          tier.featured
            ? "bg-pulse-gold text-black hover:bg-white"
            : "bg-transparent text-white border border-pulse hover:bg-white/5"
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="text-white font-semibold mb-1.5">{q}</div>
      <div>{a}</div>
    </div>
  );
}
