import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Build with Pulse — Developer Portal",
  description:
    "Get an API key and ship ambient real-world presence in your app in under 5 minutes.",
};

export default function DevPortal() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <Nav />

      <section className="pt-36 pb-16 px-10 max-w-5xl mx-auto">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          Developer Portal
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
          Build with{" "}
          <span className="pulse-grad-text">Pulse</span>.
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          One npm install. Three functions. A planetary-scale, real-time
          3D presence layer in your app before lunch.
        </p>

        <div className="flex gap-3.5 flex-wrap mb-16">
          <Link
            href="/dev/dashboard"
            className="bg-pulse-gold text-black px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white transition"
          >
            Get API Key
          </Link>
          <Link
            href="/docs"
            className="bg-transparent text-white border border-pulse px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white/5 transition"
          >
            Read the docs →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-pulse-gold mb-3 font-semibold">
              60-second quick start
            </div>
            <ol className="space-y-3 text-muted text-sm leading-relaxed">
              <li>
                <span className="text-white font-semibold">1.</span> Sign
                in → grab your{" "}
                <code className="bg-bg-card px-1.5 py-0.5 rounded text-pulse-gold text-xs">
                  pk_live_…
                </code>{" "}
                key.
              </li>
              <li>
                <span className="text-white font-semibold">2.</span>{" "}
                <code className="bg-bg-card px-1.5 py-0.5 rounded text-pulse-gold text-xs">
                  npm install @mypulsecity/sdk
                </code>
              </li>
              <li>
                <span className="text-white font-semibold">3.</span>{" "}
                Initialize Pulse with your key + a user ID.
              </li>
              <li>
                <span className="text-white font-semibold">4.</span> Call{" "}
                <code className="bg-bg-card px-1.5 py-0.5 rounded text-pulse-gold text-xs">
                  emit()
                </code>{" "}
                with a lat/lon — you&apos;re live.
              </li>
              <li>
                <span className="text-white font-semibold">5.</span>{" "}
                Drop{" "}
                <code className="bg-bg-card px-1.5 py-0.5 rounded text-pulse-gold text-xs">
                  renderInto()
                </code>{" "}
                into any DOM element for a 3D view.
              </li>
            </ol>
          </div>

          <pre className="bg-bg-card rounded-2xl p-6 border border-pulse font-mono text-[13px] leading-[1.7] overflow-x-auto">
            <code>
              <span className="code-com">{"// install"}</span>
              {"\n"}
              {"$ "}
              <span className="code-fn">npm install</span> @mypulsecity/sdk
              {"\n\n"}
              <span className="code-kw">import</span> Pulse{" "}
              <span className="code-kw">from</span>{" "}
              <span className="code-str">&quot;@mypulsecity/sdk&quot;</span>;
              {"\n\n"}
              <span className="code-kw">const</span>{" "}
              <span className="code-var">pulse</span> ={" "}
              <span className="code-kw">new</span>{" "}
              <span className="code-fn">Pulse</span>
              {`({`}
              {"\n  "}
              <span className="code-var">apiKey</span>:{" "}
              <span className="code-str">
                &quot;pk_live_YOURKEY&quot;
              </span>
              ,
              {"\n  "}
              <span className="code-var">userId</span>:{" "}
              <span className="code-str">&quot;user_42&quot;</span>,
              {"\n"}
              {`});`}
              {"\n\n"}
              <span className="code-kw">await</span>{" "}
              <span className="code-var">pulse</span>.
              <span className="code-fn">emit</span>
              {`({ `}
              <span className="code-var">lat</span>:{" "}
              <span className="code-num">37.77</span>,{" "}
              <span className="code-var">lon</span>: -
              <span className="code-num">122.42</span>{" "}
              {`});`}
              {"\n\n"}
              <span className="code-var">pulse</span>.
              <span className="code-fn">renderInto</span>(
              <span className="code-var">el</span>,{" "}
              {`{ `}
              <span className="code-var">range</span>:{" "}
              <span className="code-num">20</span>{" "}
              {`});`}
            </code>
          </pre>
        </div>
      </section>

      <section className="px-10 py-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Docs"
            body="Quick start, API reference, code samples in JS / React / RN."
            href="/docs"
          />
          <Card
            title="Pricing"
            body="Public, posted, no sales call. Free 1,000 MAU forever."
            href="/pricing"
          />
          <Card
            title="Demo: Pulse the game"
            body="See the SDK driving real-time multiplayer presence."
            href="/play"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Card({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-card-soft border border-pulse rounded-2xl p-6 hover:border-pulse-gold/40 transition"
    >
      <div className="text-base font-semibold mb-2">{title}</div>
      <div className="text-sm text-muted leading-relaxed">{body}</div>
      <div className="text-pulse-gold text-xs mt-3">Open →</div>
    </Link>
  );
}
