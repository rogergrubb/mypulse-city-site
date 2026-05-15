import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Docs — Pulse SDK",
  description:
    "Quick-start docs for @mypulsecity/sdk — emit, subscribe, renderInto. Ten lines to a planetary presence layer.",
};

export default function Docs() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <Nav />

      <section className="pt-36 pb-16 px-10 max-w-4xl mx-auto">
        <div className="text-pulse-gold text-[11px] tracking-[0.25em] font-semibold uppercase mb-3">
          Pulse SDK Docs · v0.1
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
          Quick start
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
          Drop-in ambient real-world presence for any app. Three function
          calls. Ten lines of code. A planetary-scale, beautifully-rendered,
          GPS-aware presence layer in your product before lunch.
        </p>

        <H2>1. Install</H2>
        <CodeBlock>
          <span className="code-com">{"# npm"}</span>
          {"\n"}
          {"$ "}
          <span className="code-fn">npm install</span> @mypulsecity/sdk
          {"\n\n"}
          <span className="code-com">{"# or via CDN"}</span>
          {"\n"}
          <span className="code-kw">&lt;script</span>{" "}
          <span className="code-var">src</span>=
          <span className="code-str">
            &quot;https://cdn.mypulse.city/sdk/v1/pulse.min.js&quot;
          </span>
          <span className="code-kw">&gt;&lt;/script&gt;</span>
        </CodeBlock>

        <H2>2. Initialize</H2>
        <CodeBlock>
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
          <span className="code-str">&quot;pk_live_abc123&quot;</span>,{" "}
          <span className="code-com">// grab one at /dev</span>
          {"\n  "}
          <span className="code-var">userId</span>:{" "}
          <span className="code-str">&quot;user_42&quot;</span>,{" "}
          <span className="code-com">// your app&apos;s user ID</span>
          {"\n"}
          {`});`}
        </CodeBlock>

        <H2>3. Broadcast presence</H2>
        <p className="text-muted text-sm leading-relaxed mb-3">
          Call <Code>emit()</Code> whenever the device location updates.
          Idempotent — re-emit as often as you like.
        </p>
        <CodeBlock>
          <span className="code-kw">await</span>{" "}
          <span className="code-var">pulse</span>.
          <span className="code-fn">emit</span>
          {`({`}
          {"\n  "}
          <span className="code-var">lat</span>:{" "}
          <span className="code-num">37.7749</span>,
          {"\n  "}
          <span className="code-var">lon</span>: -
          <span className="code-num">122.4194</span>,
          {"\n  "}
          <span className="code-var">color</span>:{" "}
          <span className="code-str">&quot;#ff6b35&quot;</span>,
          {"\n  "}
          <span className="code-var">label</span>:{" "}
          <span className="code-str">&quot;rojelio&quot;</span>,
          {"\n"}
          {`});`}
        </CodeBlock>

        <H2>4. Subscribe to nearby pulses</H2>
        <p className="text-muted text-sm leading-relaxed mb-3">
          Live WebSocket stream of pulses within range. Server-side geo
          bounding-box filtering keeps payloads tiny.
        </p>
        <CodeBlock>
          <span className="code-kw">const</span>{" "}
          <span className="code-var">unsubscribe</span> ={" "}
          <span className="code-var">pulse</span>.
          <span className="code-fn">subscribe</span>(
          {"\n  "}
          {`{ `}
          <span className="code-var">radiusMiles</span>:{" "}
          <span className="code-num">20</span>{" "}
          {`},`}
          {"\n  "}(<span className="code-var">pulses</span>) {`=> {`}
          {"\n    "}
          <span className="code-com">
            {
              "// pulses: { userId, lat, lon, distanceMiles, bearingDegrees, color, label, ... }[]"
            }
          </span>
          {"\n    "}
          <span className="code-fn">console</span>.
          <span className="code-fn">log</span>(
          <span className="code-str">
            {"`${pulses.length} pulses nearby`"}
          </span>
          );
          {"\n  "}
          {`}`}
          {"\n"}
          );
          {"\n\n"}
          <span className="code-com">
            {"// later: clean up"}
          </span>
          {"\n"}
          <span className="code-var">unsubscribe</span>();
        </CodeBlock>

        <H2>5. Drop the 3D view</H2>
        <p className="text-muted text-sm leading-relaxed mb-3">
          Three.js bundled internally — no peer dependency. Pick a style:{" "}
          <Code>sky-beams</Code>, <Code>ground-pins</Code>,{" "}
          <Code>minimap</Code>, or <Code>globe</Code>.
        </p>
        <CodeBlock>
          <span className="code-kw">const</span>{" "}
          <span className="code-var">view</span> ={" "}
          <span className="code-var">pulse</span>.
          <span className="code-fn">renderInto</span>(
          {"\n  "}
          <span className="code-fn">document</span>.
          <span className="code-fn">getElementById</span>(
          <span className="code-str">&quot;pulse-view&quot;</span>),
          {"\n  "}
          {`{`}
          {"\n    "}
          <span className="code-var">centerOnUser</span>:{" "}
          <span className="code-kw">true</span>,
          {"\n    "}
          <span className="code-var">range</span>:{" "}
          <span className="code-num">20</span>,
          {"\n    "}
          <span className="code-var">style</span>:{" "}
          <span className="code-str">&quot;sky-beams&quot;</span>,
          {"\n  "}
          {`}`}
          {"\n"}
          );
          {"\n\n"}
          <span className="code-var">view</span>.
          <span className="code-fn">setRange</span>(
          <span className="code-num">50</span>);{" "}
          <span className="code-com">
            {"// update range at runtime"}
          </span>
          {"\n"}
          <span className="code-var">view</span>.
          <span className="code-fn">destroy</span>();{" "}
          <span className="code-com">{"// cleanup"}</span>
        </CodeBlock>

        <H2>React component</H2>
        <CodeBlock>
          <span className="code-kw">import</span>{" "}
          {`{ PulseView }`}{" "}
          <span className="code-kw">from</span>{" "}
          <span className="code-str">
            &quot;@mypulsecity/sdk/react&quot;
          </span>
          ;
          {"\n\n"}
          <span className="code-kw">&lt;PulseView</span>
          {"\n  "}
          <span className="code-var">apiKey</span>=
          <span className="code-str">&quot;pk_live_…&quot;</span>
          {"\n  "}
          <span className="code-var">userId</span>=
          <span className="code-str">&quot;user_42&quot;</span>
          {"\n  "}
          <span className="code-var">range</span>=
          {`{`}
          <span className="code-num">20</span>
          {`}`}
          {"\n  "}
          <span className="code-var">style</span>=
          <span className="code-str">&quot;sky-beams&quot;</span>
          {"\n  "}
          <span className="code-var">onPulseClick</span>=
          {`{(p) => navigate(`}
          <span className="code-str">{"`/profile/${p.userId}`"}</span>
          {`)}`}
          {"\n"}
          <span className="code-kw">/&gt;</span>
        </CodeBlock>

        <H2>Server-side API</H2>
        <p className="text-muted text-sm leading-relaxed mb-3">
          For backend ingestion and analytics — use your{" "}
          <Code>sk_live_…</Code> key, never ship it to the client.
        </p>
        <CodeBlock>
          <span className="code-fn">POST</span>{" "}
          https://api.mypulse.city/v1/pulses/emit
          {"\n"}
          <span className="code-fn">GET</span>{" "}
          {
            "https://api.mypulse.city/v1/pulses/nearby?lat=…&lon=…&radius=20"
          }
          {"\n"}
          <span className="code-fn">POST</span>{" "}
          https://api.mypulse.city/v1/webhooks
        </CodeBlock>
        <p className="text-muted text-sm leading-relaxed mb-10">
          Webhook events: <Code>pulse.entered_region</Code>,{" "}
          <Code>pulse.left_region</Code>,{" "}
          <Code>pulse.proximity_match</Code>,{" "}
          <Code>pulse.batch_anomaly</Code>.
        </p>

        <H2>Privacy</H2>
        <ul className="space-y-2 text-muted text-sm leading-relaxed mb-10">
          <li>
            <span className="text-pulse-gold">→</span> Coarse location
            (±100m) is the default. Users opt in to precise (±5m).
          </li>
          <li>
            <span className="text-pulse-gold">→</span> No background
            tracking. Ever.
          </li>
          <li>
            <span className="text-pulse-gold">→</span> TLS 1.3 in transit,
            AES-256 at rest. GDPR / CCPA compliant.
          </li>
          <li>
            <span className="text-pulse-gold">→</span> We never sell user
            data. Written into our terms as a brand promise.
          </li>
        </ul>

        <div className="bg-card-soft border border-pulse rounded-2xl p-7 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div>
            <div className="text-base font-semibold mb-1">
              Ready to ship?
            </div>
            <div className="text-sm text-muted">
              Grab an API key — free 1,000 MAU forever.
            </div>
          </div>
          <Link
            href="/dev/dashboard"
            className="bg-pulse-gold text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white transition whitespace-nowrap"
          >
            Get API Key →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-4">
      {children}
    </h2>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-bg-card px-1.5 py-0.5 rounded text-pulse-gold text-[0.85em] font-mono">
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-bg-card rounded-2xl p-6 border border-pulse font-mono text-[13px] leading-[1.7] overflow-x-auto mb-6">
      <code>{children}</code>
    </pre>
  );
}
