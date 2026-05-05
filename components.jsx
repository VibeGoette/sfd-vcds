/* === Shared icons + small components === */
const { useState, useEffect, useRef } = React;

const Icon = {
  Check: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  Hardware: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10v4M10 10v4M14 10v4M18 10v4"/>
    </svg>
  ),
  Beta: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  Warning: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l10 18H2L12 3z"/>
      <path d="M12 10v5M12 18v.01"/>
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 018 0v4"/>
    </svg>
  ),
  Unlock: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 018-1"/>
    </svg>
  ),
  Server: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="6" rx="1"/>
      <rect x="3" y="14" width="18" height="6" rx="1"/>
      <path d="M7 7h.01M7 17h.01"/>
    </svg>
  ),
  Telegram: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.5 3.5L2.5 11l6 2.2L17 6.5l-7 8.5v4l3-3 4 3 4.5-15.5z"/>
    </svg>
  ),
};

/* === Hero terminal — animated auto-scan === */
function HeroTerminal() {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState("scanning");
  const seqRef = useRef(0);

  const script = [
    { t: 60,  k: "prompt", v: "VCDS> " },
    { t: 30,  k: "cmd",    v: "auto-scan --beta 26.5" },
    { t: 600, k: "dim",    v: "Connecting via HEX-NET (S/N: HN1-CB-19A4F2)..." },
    { t: 400, k: "ok",     v: "✓ Interface online · Beta-Firmware 1.78.7" },
    { t: 350, k: "dim",    v: "Reading VIN..." },
    { t: 350, k: "info",   v: "VIN: WAUZZZ8V9MA0••••• · 2024 Audi A3 Sportback 35 TFSI" },
    { t: 300, k: "dim",    v: "Querying gateway..." },
    { t: 250, k: "ok",     v: "✓ 19 modules detected" },
    { t: 200, k: "dim",    v: "─────────────────────────────────────────" },
    { t: 200, k: "ok",     v: "01-Engine                ✓ open" },
    { t: 180, k: "warn",   v: "03-ABS Brakes            🔒 SFD2 protected" },
    { t: 180, k: "warn",   v: "09-Cent. Electronics     🔒 SFD2 protected" },
    { t: 180, k: "warn",   v: "17-Instruments           🔒 SFD2 protected" },
    { t: 180, k: "ok",     v: "44-Steering Assist       ✓ open" },
    { t: 200, k: "dim",    v: "─────────────────────────────────────────" },
    { t: 250, k: "info",   v: "3 modules require SFD-Session." },
    { t: 600, k: "prompt", v: "VCDS> " },
    { t: 30,  k: "cmd",    v: "sfd start-session --account beta@werkstatt.de" },
    { t: 800, k: "dim",    v: "Authenticating against Ross-Tech servers..." },
    { t: 600, k: "ok",     v: "✓ Session token issued · expires in 4h00m" },
    { t: 350, k: "ok",     v: "✓ 03-ABS Brakes      → unlocked" },
    { t: 250, k: "ok",     v: "✓ 09-Cent. Elect.    → unlocked" },
    { t: 250, k: "ok",     v: "✓ 17-Instruments     → unlocked" },
    { t: 400, k: "info",   v: "■ Werkstatt-Modus aktiv. Frei zum Arbeiten." },
  ];

  useEffect(() => {
    let cancelled = false;
    let acc = [];
    let i = 0;
    const tick = async () => {
      while (i < script.length && !cancelled) {
        const step = script[i];
        await new Promise(r => setTimeout(r, step.t));
        if (cancelled) return;
        // group prompt+cmd on the same line
        if (step.k === "prompt") {
          acc = [...acc, { k: "promptline", parts: [{ k: "prompt", v: step.v }] }];
        } else if (step.k === "cmd" && acc.length && acc[acc.length-1].k === "promptline") {
          const last = acc[acc.length-1];
          acc = [...acc.slice(0,-1), { ...last, parts: [...last.parts, { k: "cmd", v: step.v }] }];
        } else {
          acc = [...acc, { k: step.k, v: step.v }];
        }
        setLines([...acc]);
        i++;
      }
      if (!cancelled) {
        setPhase("done");
        // restart loop after delay
        await new Promise(r => setTimeout(r, 5500));
        if (!cancelled) {
          acc = []; i = 0;
          setLines([]); setPhase("scanning");
          tick();
        }
      }
    };
    tick();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="terminal" role="img" aria-label="VCDS Auto-Scan und SFD-Session Demo">
      <div className="term-bar">
        <div style={{display:"flex", alignItems:"center", gap: 12}}>
          <div className="term-dots"><i/><i/><i/></div>
          <span>VCDS · Beta 26.5 · Online-SFD</span>
        </div>
        <span style={{color: phase === "done" ? "#22c55e" : "#60a5fa"}}>
          {phase === "done" ? "● ready" : "● running"}
        </span>
      </div>
      <div className="term-body">
        {lines.map((l, idx) => {
          if (l.k === "promptline") {
            return (
              <div key={idx} className="term-line">
                {l.parts.map((p, j) => (
                  <span key={j} className={p.k === "prompt" ? "term-prompt" : "term-cmd"}>{p.v}</span>
                ))}
              </div>
            );
          }
          const cls = {
            ok: "term-ok",
            warn: "term-warn",
            info: "term-info",
            dim: "term-dim",
          }[l.k] || "";
          return <div key={idx} className={`term-line ${cls}`}>{l.v}</div>;
        })}
        {phase !== "done" && <span className="cursor"/>}
      </div>
    </div>
  );
}

/* ===== Trust Marquee ===== */
const TRUST_ITEMS = [
  { type: "shield",   title: "Offiziell durch Ross-Tech",  sub: "Hersteller von VCDS" },
  { type: "hardware", title: "HEX-NET & HEX-V2",           sub: "mit Beta-Firmware" },
  { type: "beta",     title: "Public Beta",                sub: "erschienen im Mai 2026" },
  { type: "telegram", title: "Community auf Telegram",     sub: "t.me/vcdsde",
    href: "https://t.me/vcdsde", linkText: "t.me/vcdsde" },
];

function TrustItem({ item, keyId }) {
  const iconMap = {
    shield:   <Icon.Shield/>,
    hardware: <Icon.Hardware/>,
    beta:     <Icon.Beta/>,
    telegram: <Icon.Telegram/>,
  };
  const inner = (
    <>
      <div className="trust-icon">{iconMap[item.type]}</div>
      <div className="trust-text">
        <strong>{item.title}</strong>
        {item.linkText
          ? <span className="trust-link-url">{item.linkText}</span>
          : item.sub}
      </div>
    </>
  );
  if (item.href) {
    return (
      <a key={keyId} href={item.href} target="_blank" rel="noopener"
         className="trust-item trust-item-link" aria-label={`${item.title} — ${item.sub}`}>
        {inner}
      </a>
    );
  }
  return <div key={keyId} className="trust-item">{inner}</div>;
}

function TrustMarquee() {
  return (
    <section className="trust-section" aria-label="Vertrauenssignale">
      <div className="trust-track">
        {TRUST_ITEMS.map((it, i) => (
          <TrustItem key={i} keyId={i} item={it}/>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Icon, HeroTerminal, TrustMarquee });
