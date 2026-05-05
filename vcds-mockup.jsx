/* === VCDS Software Mockup (hero) + VIN Decoder === */
const { useState: useS3, useEffect: useE3, useRef: useR3 } = React;

/* A faithful skeumorphic VCDS-style window */
function VCDSMockup() {
  const [tab, setTab] = useS3("scan");
  const [scanLines, setScanLines] = useS3([]);
  const [done, setDone] = useS3(false);

  const modules = [
    { addr: "01", name: "Motor / Engine",                state: "ok"  },
    { addr: "02", name: "Auto-HVAC",                     state: "ok"  },
    { addr: "03", name: "ABS Bremsen",                   state: "sfd2"},
    { addr: "08", name: "Klimatisierungselektronik",     state: "ok"  },
    { addr: "09", name: "Zentralelektronik",             state: "sfd2"},
    { addr: "13", name: "Distanzregelung",               state: "ok"  },
    { addr: "15", name: "Airbag",                        state: "sfd1"},
    { addr: "16", name: "Lenkradelektronik",             state: "ok"  },
    { addr: "17", name: "Schalttafeleinsatz",            state: "sfd2"},
    { addr: "19", name: "Diagnose-Interface",            state: "ok"  },
    { addr: "37", name: "Navigation",                    state: "ok"  },
    { addr: "44", name: "Lenkhilfe",                     state: "sfd1"},
    { addr: "55", name: "Leuchtweitenreg.",              state: "ok"  },
    { addr: "5F", name: "Informationselektr.",           state: "sfd2"},
    { addr: "BB", name: "Aktive Lenkung",                state: "ok"  },
  ];

  // Animated scan
  useE3(() => {
    let cancelled = false;
    let i = 0;
    setScanLines([]);
    setDone(false);
    const tick = async () => {
      while (i < modules.length && !cancelled) {
        await new Promise(r => setTimeout(r, 220));
        if (cancelled) return;
        i++;
        setScanLines(modules.slice(0, i));
      }
      if (!cancelled) {
        setDone(true);
        await new Promise(r => setTimeout(r, 4500));
        if (!cancelled) {
          i = 0;
          setScanLines([]);
          setDone(false);
          tick();
        }
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [tab]);

  return (
    <div className="vcds-window">
      <div className="vcds-titlebar">
        <div className="vcds-title">
          <span className="vcds-title-icon">V</span>
          <span>VCDS · Release 26.5 Beta · HEX-NET</span>
        </div>
        <div className="vcds-window-buttons">
          <span>−</span><span>□</span><span>×</span>
        </div>
      </div>
      <div className="vcds-toolbar">
        {[
          ["scan",   "Auto-Scan"],
          ["sfd",    "SFD-Session"],
          ["sgr",    "Steuergerät"],
          ["help",   "Hilfe"],
        ].map(([k, l]) => (
          <button key={k} className={`vcds-tab ${tab === k ? "active" : ""}`}
                  onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "scan" && (
        <div className="vcds-body">
          <div className="vcds-row">
            <div className="vcds-field">
              <label>VIN</label>
              <div className="vcds-value">WAUZZZ8V9MA0••••• </div>
            </div>
            <div className="vcds-field">
              <label>Fahrzeug</label>
              <div className="vcds-value">2024 Audi A3 Sportback 35 TFSI</div>
            </div>
            <div className="vcds-field">
              <label>Status</label>
              <div className={`vcds-value ${done ? "vcds-ok" : "vcds-running"}`}>
                {done ? "● Scan abgeschlossen" : "● Auto-Scan läuft…"}
              </div>
            </div>
          </div>

          <div className="vcds-modules">
            <div className="vcds-modules-head">
              <span>Adresse</span>
              <span>Steuergerät</span>
              <span>Status</span>
            </div>
            <div className="vcds-modules-body">
              {scanLines.map(m => (
                <div key={m.addr} className="vcds-module-row">
                  <span className="vcds-addr">{m.addr}</span>
                  <span className="vcds-name">{m.name}</span>
                  <span className={`vcds-state vcds-${m.state}`}>
                    {m.state === "ok"   && "✓ Offen"}
                    {m.state === "sfd1" && "🔒 SFD1"}
                    {m.state === "sfd2" && "🔒 SFD2"}
                  </span>
                </div>
              ))}
              {!done && scanLines.length < modules.length && (
                <div className="vcds-module-row vcds-loading">
                  <span className="vcds-addr">··</span>
                  <span className="vcds-name">Adressen werden geprüft…</span>
                  <span className="vcds-state">—</span>
                </div>
              )}
            </div>
            <div className="vcds-modules-foot">
              <span>{scanLines.length} / {modules.length} Module</span>
              <span className="vcds-foot-info">
                {done && (() => {
                  const sfd = modules.filter(m => m.state.startsWith("sfd")).length;
                  return `${sfd} Module SFD-geschützt · SFD-Session erforderlich`;
                })()}
              </span>
            </div>
          </div>
        </div>
      )}

      {tab === "sfd" && (
        <div className="vcds-body vcds-sfd-body">
          <div className="vcds-sfd-step done">
            <span className="vcds-sfd-num">01</span>
            <div>
              <div className="vcds-sfd-label">Token-Anforderung</div>
              <div className="vcds-sfd-meta">✓ Authentifiziert via Ross-Tech-Server · 04:00:00 verbleibend</div>
            </div>
          </div>
          <div className="vcds-sfd-step done">
            <span className="vcds-sfd-num">02</span>
            <div>
              <div className="vcds-sfd-label">03 — ABS Bremsen</div>
              <div className="vcds-sfd-meta">✓ Security Access erteilt</div>
            </div>
          </div>
          <div className="vcds-sfd-step active">
            <span className="vcds-sfd-num">03</span>
            <div>
              <div className="vcds-sfd-label">09 — Zentralelektronik</div>
              <div className="vcds-sfd-meta">… Backend-Antwort wird verarbeitet</div>
            </div>
          </div>
          <div className="vcds-sfd-step">
            <span className="vcds-sfd-num">04</span>
            <div>
              <div className="vcds-sfd-label">17 — Schalttafeleinsatz</div>
              <div className="vcds-sfd-meta">Wartet</div>
            </div>
          </div>
        </div>
      )}

      {tab === "sgr" && (
        <div className="vcds-body" style={{padding: "60px 24px", textAlign: "center", color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 12}}>
          [ Bitte zuerst Auto-Scan ausführen ]
        </div>
      )}
      {tab === "help" && (
        <div className="vcds-body" style={{padding: "32px 24px", color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.6}}>
          <strong style={{color: "var(--ink)"}}>VCDS Beta 26.5</strong> — Online-SFD-Service erfordert Verifizierung,
          Beta-Firmware auf dem Interface und einen erfolgreichen Auto-Scan vor der Buchung.
        </div>
      )}

      <div className="vcds-statusbar">
        <span>● HEX-NET · S/N HN1-CB-19A4F2</span>
        <span>K1: 500 kBaud · K2: 100 kBaud</span>
        <span>Ross-Tech LLC · Beta-Kanal</span>
      </div>
    </div>
  );
}

/* === Eignungs-Check (Leitsätze + Mail-CTA, ersetzt früheren VIN-Decoder) === */
function EignungsCheck() {
  const mailSubject = "Vorab-Prüfung Fahrzeug-Eignung Online-SFD";
  const mailBody = `Hallo VCDS-Team,

ich möchte vorab klären, ob mein Fahrzeug für den Online-SFD-Service unterstützt wird.

- Marke: 
- Modell: 
- Modelljahr: 
- VIN (optional, 17-stellig): 
- Geplante Aktion (Service, Diagnose, Codierung, Anpassung): 

Vielen Dank.`;
  const mailHref = "mailto:support@vcds.de?subject=" + encodeURIComponent(mailSubject) +
                   "&body=" + encodeURIComponent(mailBody);

  const faustregeln = [
    {
      meta: "Ab Modelljahr 2020 · neu eingeführte Modelle",
      title: "SFD ist die Mehrheit.",
      body: "Der Großteil der ab MJ 2020 neu eingeführten VAG-Modelle nutzt SFD — auch in aktuellen Baujahren. Service, Diagnose, Codierung und Anpassung sind via Online-SFD voll möglich.",
      tag: "Voll unterstützt",
      state: "ok",
    },
    {
      meta: "Selektiv neu eingeführt · koexistent zu SFD",
      title: "Bei SFD2: Codierung limitiert.",
      body: "SFD2 ist eine andere Architektur, die Codier-Änderungen, Anpassungen und Nachrüstung auf bestimmten Steuergeräten zusätzlich absichert. Service-Funktionen wie SRI-Reset, Bremsen-Wartungsmodus und Lenkwinkel-Anlernen bleiben über den regulären SFD-Unlock möglich — auch bei SFD2-Fahrzeugen.",
      tag: "Codierung limitiert",
      state: "warn",
    },
    {
      meta: "Pro Steuergerät unterschiedlich",
      title: "Eindeutig nur per Auto-Scan.",
      body: "Ein Fahrzeug kann SFD und SFD2 mischen — abhängig vom einzelnen Steuergerät. Verbindlich ist immer der Auto-Scan mit VCDS Beta 26.5.",
      tag: "Verbindlich",
      state: "neutral",
    },
  ];

  const stateConfig = {
    ok:   { Icon: Icon.Check,   modifier: "ok" },
    warn: { Icon: Icon.Warning, modifier: "warn" },
    neutral: { Icon: Icon.Server, modifier: "info" },
  };

  return (
    <section id="eignung">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Eignungs-Check</span>
        <h2>Was heißt das für <em>dein</em> Fahrzeug?</h2>
        <p className="lead">
          Drei Faustregeln als schnelle Orientierung. Im Zweifel beantworten wir deine Modellfrage per Mail innerhalb eines Werktags — verbindlich bleibt aber stets der Auto-Scan im Fahrzeug.
        </p>
      </div>
      <div className="wrap" style={{paddingBottom: 32}}>
        <div className="eignung-grid">
          {faustregeln.map((f, i) => {
            const cfg = stateConfig[f.state] || stateConfig.neutral;
            const IconC = cfg.Icon;
            return (
              <article key={i} className={`eignung-card eignung-card--${cfg.modifier}`}>
                <div className="eignung-card-bar"/>
                <header className="eignung-card-head">
                  <span className="eignung-pill">
                    <IconC/> {f.tag}
                  </span>
                  <span className="eignung-num">{String(i + 1).padStart(2, "0")}</span>
                </header>
                <h3 className="eignung-card-title">{f.title}</h3>
                <p className="eignung-card-body">{f.body}</p>
                <footer className="eignung-card-foot">
                  <span className="eignung-card-meta">{f.meta}</span>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
      <div className="wrap-tight" style={{paddingBottom: 80}}>
        <div style={{
          padding: "26px 28px",
          border: "1px solid var(--accent)",
          borderRadius: 6,
          background: "color-mix(in oklab, var(--accent) 7%, var(--bg-elev))",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap",
        }}>
          <div style={{maxWidth: "52ch"}}>
            <div style={{fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)",
                         marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase"}}>
              Im Zweifel vorab anfragen
            </div>
            <h3 style={{fontSize: "clamp(20px, 2.6vw, 26px)", marginBottom: 10,
                        color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.2}}>
              Modell-Eignung vorab prüfen lassen.
            </h3>
            <div style={{fontSize: 15, color: "var(--ink-dim)", lineHeight: 1.55}}>
              Unsicher, ob dein konkretes Modell unterstützt wird? Schick uns Marke, Modell und Modelljahr — Antwort meist innerhalb eines Werktags.
            </div>
          </div>
          <a href={mailHref} className="btn btn-primary btn-mono">
            ✉ Eignung per Mail anfragen <span className="arrow"><Icon.ArrowRight/></span>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { VCDSMockup, VCDSScreenshot, EignungsCheck });

/* === Real VCDS Beta 26.5 Main Screen — wrapped in chrome === */
function VCDSScreenshot() {
  return (
    <div className="vcds-shot">
      <div className="vcds-shot-bar">
        <span className="vcds-shot-icon">⚙</span>
        <span className="vcds-shot-title">VCDS: Main Screen</span>
        <span className="vcds-shot-controls">
          <span></span><span></span><span>×</span>
        </span>
      </div>
      <img
        src="assets/vcds-main-screen.jpg"
        alt="VCDS Beta 26.5.0 Main Screen mit Online-SFD Funktion"
        className="vcds-shot-img"
        loading="lazy"
      />
    </div>
  );
}
window.VCDSScreenshot = VCDSScreenshot;
