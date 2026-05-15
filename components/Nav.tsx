import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-xl bg-bg/60 border-b border-pulse">
      <Link href="/" className="text-lg font-bold tracking-wider">
        pulse<span className="text-pulse-gold">.</span>
      </Link>
      <div className="hidden md:flex gap-7 text-sm text-muted">
        <Link href="/docs" className="hover:text-white transition">
          Docs
        </Link>
        <Link href="/pricing" className="hover:text-white transition">
          Pricing
        </Link>
        <Link href="/play" className="hover:text-white transition">
          Play Pulse
        </Link>
        <Link href="/dev" className="hover:text-white transition">
          Dev Portal
        </Link>
      </div>
      <Link
        href="/dev"
        className="bg-pulse-gold text-black px-4 py-2 rounded-md font-semibold text-xs tracking-widest uppercase hover:bg-white transition"
      >
        Get API Key
      </Link>
    </nav>
  );
}
