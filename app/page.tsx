import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        <HeroCanvas />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-pulse-gold/10 text-pulse-gold text-[11px] tracking-[0.2em] font-semibold mb-7 border border-pulse-gold/30">
            PRESENCE • SDK • REAL-TIME
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Presence,
            <br />
            <span className="pulse-grad-text">from the horizon.</span>
          </h1>
          <p className="text-base md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Pulse is the real-time ambient-presence SDK for the
            location-aware web. Show your users who&apos;s around — visible
            from miles away, beautiful from blocks away — in ten lines of
            code.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link
              href="/dev"
              className="bg-pulse-gold text-black px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-white transition transform hover:-translate-y-0.5"
            >
              Start free → 1,000 MAU
            </Link>
            <Link
              href="/play"
              className="bg-transparent text-white border border-pulse px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-white/5 hover:border-white/20 transition"
            >
              Play the demo
            </Link>
          </div>
        </div>
      </section>

      {/* SDK SECTION */}
      <section id="sdk" className="px-10 py-24 max-w-6xl mx-auto">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          The SDK
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
          Ten lines to a planetary presence layer.
        </h2>
        <p className="text-muted text-lg max-w-2xl leading-relaxed mb-14">
          Three functions. Real-time WebSockets. A built-in 3D renderer.
          Drop it in, ship today.
        </p>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <pre className="bg-bg-card rounded-2xl p-7 border border-pulse font-mono text-[13px] leading-[1.7] overflow-x-auto">
            <code>
              <span className="code-kw">import</span> Pulse{" "}
              <span className="code-kw">from</span>{" "}
              <span className="code-str">&quot;@mypulsecity/sdk&quot;</span>;
              {"\n\n"}
              <span className="code-kw">const</span>{" "}
              <span className="code-var">pulse</span> ={" "}
              <span className="code-kw">new</span>{" "}
              <span className="code-fn">Pulse</span>{`({`}
              {"\n  "}
              <span className="code-var">apiKey</span>:{" "}
              <span className="code-str">&quot;pk_live_abc123&quot;</span>,
              {"\n  "}
              <span className="code-var">userId</span>:{" "}
              <span className="code-str">&quot;user_42&quot;</span>,
              {"\n"}
              {`});`}
              {"\n\n"}
              <span className="code-com">{"// 1. Broadcast presence"}</span>
              {"\n"}
              <span className="code-var">pulse</span>.
              <span className="code-fn">emit</span>
              {`({ `}
              <span className="code-var">lat</span>:{" "}
              <span className="code-num">37.77</span>,{" "}
              <span className="code-var">lon</span>: -
              <span className="code-num">122.42</span>{" "}
              {`});`}
              {"\n\n"}
              <span className="code-com">
                {"// 2. Subscribe to nearby pulses"}
              </span>
              {"\n"}
              <span className="code-var">pulse</span>.
              <span className="code-fn">subscribe</span>
              {`({ `}
              <span className="code-var">radiusMiles</span>:{" "}
              <span className="code-num">20</span>{" "}
              {`}, (`}
              <span className="code-var">pulses</span>
              {`) => {`}
              {"\n  "}
              <span className="code-fn">console</span>.
              <span className="code-fn">log</span>(
              <span className="code-str">
                {"`${pulses.length} users visible`"}
              </span>
              );
              {"\n"}
              {`});`}
              {"\n\n"}
              <span className="code-com">
                {"// 3. Drop the 3D view anywhere"}
              </span>
              {"\n"}
              <span className="code-var">pulse</span>.
              <span className="code-fn">renderInto</span>(
              <span className="code-var">element</span>,{" "}
              {`{ `}
              <span className="code-var">range</span>:{" "}
              <span className="code-num">20</span>{" "}
              {`});`}
            </code>
          </pre>

          <div className="flex flex-col gap-5">
            <Feature
              icon="⚡"
              title="Sub-200ms real-time"
              body="WebSocket-first global infrastructure. Pulses propagate instantly across continents."
            />
            <Feature
              icon="🎨"
              title="3D renderer included"
              body="Drop in our WebGL scene. Sky-beams, ground-pins, minimap, or globe view — your call."
            />
            <Feature
              icon="🔒"
              title="Privacy by default"
              body="Coarse location (±100m) by default. Users opt in to precise. No background tracking. Ever."
            />
            <Feature
              icon="🌐"
              title="Framework-agnostic"
              body="React, Vue, Svelte, React Native, Unity. Vanilla JS core. 140KB gzipped."
            />
          </div>
        </div>
      </section>

      {/* GAME SHOWCASE */}
      <section className="px-10 py-16 max-w-6xl mx-auto">
        <div className="relative overflow-hidden border border-pulse rounded-3xl px-10 py-16 text-center bg-gradient-to-b from-pulse-flame/5 to-transparent">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,107,53,0.25),transparent_60%)]" />
          <div className="relative">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-pulse-flame/15 text-pulse-flame text-[11px] tracking-[0.2em] font-semibold mb-7 border border-pulse-flame/40">
              SHOWCASE APP — BUILT ON PULSE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 flame-grad-text">
              Pulse — the game.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-7">
              Multiplayer flame-throwing jetpack combat over photoreal
              real-world cities. The world&apos;s most visible Pulse SDK
              demo — and the most fun.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Link
                href="/play"
                className="bg-pulse-gold text-black px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white transition"
              >
                Drop into the arena
              </Link>
              <Link
                href="/docs"
                className="bg-transparent text-white border border-pulse px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white/5 transition"
              >
                View the source — built on Pulse SDK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="px-10 py-24 max-w-6xl mx-auto">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
          Transparent. Posted. No sales call.
        </h2>
        <p className="text-muted text-lg max-w-2xl leading-relaxed mb-10">
          Start free. Scale on a public meter. No surprise invoices, no
          minimums.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-pulse-gold text-black px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white transition"
        >
          See all tiers →
        </Link>
      </section>

      {/* DESIGN PARTNERS */}
      <section className="px-10 py-24 max-w-4xl mx-auto text-center">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          Design Partners
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
          Building dating, events, fitness, or social?
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-7">
          First 3 design partners get Pulse Growth tier free for life in
          exchange for a case study + logo on this page.
        </p>
        <a
          href="mailto:hello@mypulse.city"
          className="inline-block bg-pulse-gold text-black px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white transition"
        >
          Pitch us your app →
        </a>
      </section>

      <Footer />
    </main>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pulse-gold/10 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
