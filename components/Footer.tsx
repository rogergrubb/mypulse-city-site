import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-pulse py-16 px-10 text-center text-dim text-xs">
      <div className="text-base font-bold text-white mb-2">
        pulse<span className="text-pulse-gold">.</span>
      </div>
      <div>presence, from the horizon · mypulse.city</div>
      <div className="mt-3 flex gap-3 justify-center flex-wrap">
        <Link href="/docs" className="text-pulse-gold hover:text-white">
          Docs
        </Link>
        <span>·</span>
        <Link href="/pricing" className="text-pulse-gold hover:text-white">
          Pricing
        </Link>
        <span>·</span>
        <Link href="/play" className="text-pulse-gold hover:text-white">
          Play
        </Link>
        <span>·</span>
        <a
          href="mailto:hello@mypulse.city"
          className="text-pulse-gold hover:text-white"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
