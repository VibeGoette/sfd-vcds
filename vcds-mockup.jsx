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
        <span>Ross-Tech LLC · Beta-Channel</span>
      </div>
    </div>
  );
}

/* === VIN Decoder Mock === */
function VINDecoder() {
  const [vin, setVin] = useS3("WAUZZZ8V9MA000123");
  const [result, setResult] = useS3(null);
  const [loading, setLoading] = useS3(false);

  const decode = (v) => {
    const clean = (v || "").toUpperCase().trim();
    if (clean.length < 11) return null;
    // Year char position 10 (index 9) per WMI convention; we'll simplify
    const yearChar = clean[9];
    const yearMap = { L:2020, M:2021, N:2022, P:2023, R:2024, S:2025, T:2026 };
    const year = yearMap[yearChar] || 2022;
    const wmi = clean.slice(0,3);
    const brandMap = {
      WAU: "Audi", WVW: "Volkswagen", WV1: "VW Nutzfahrzeuge",
      TMB: "Škoda", VSS: "SEAT", VWV: "Cupra", "3VW": "Volkswagen",
    };
    const brand = brandMap[wmi] || "VAG-Konzern";
    const sfd = year >= 2024 ? "SFD2" : year >= 2020 ? "SFD1" : "kein SFD";
    return { brand, year, sfd, wmi };
  };

  const handleDecode = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = decode(vin);
      setResult(r || { error: "VIN unvollständig (mindestens 11 Zeichen)" });
      setLoading(false);
    }, 600);
  };

  useE3(() => { handleDecode(); }, []);

  const sfdColor = result?.sfd === "SFD1" ? "var(--ok)"
                : result?.sfd === "SFD2" ? "var(--warn)"
                : "var(--ink-mute)";

  return (
    <section id="vin">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>VIN-Lookup</span>
        <h2>SFD1 oder SFD2? Im Zweifel <em>kurz prüfen</em>.</h2>
        <p className="lead">
          Der finale Status wird stets vom Auto-Scan ausgewiesen — der Lookup hier basiert auf Modelljahr und WMI und liefert in &lt;&nbsp;1&nbsp;Sek. einen ersten Anhaltspunkt.
        </p>
      </div>
      <div className="wrap-tight" style={{paddingBottom: 80}}>
        <div className="vin-tool">
          <div className="vin-input-row">
            <label className="vin-label">VIN</label>
            <input
              className="vin-input"
              type="text"
              value={vin}
              onChange={e => setVin(e.target.value.toUpperCase())}
              maxLength={17}
              spellCheck={false}
              placeholder="WAUZZZ8V9MA000123"
            />
            <button className="btn btn-primary btn-mono" onClick={handleDecode}
                    disabled={loading}>
              {loading ? "Prüfe…" : "Prüfen"}
            </button>
          </div>

          <div className="vin-result">
            {result?.error && (
              <div className="vin-error">{result.error}</div>
            )}
            {result && !result.error && (
              <>
                <div className="vin-cell">
                  <div className="vin-cell-label">Marke</div>
                  <div className="vin-cell-value">{result.brand}</div>
                  <div className="vin-cell-meta">WMI&nbsp;{result.wmi}</div>
                </div>
                <div className="vin-cell">
                  <div className="vin-cell-label">Modelljahr</div>
                  <div className="vin-cell-value">{result.year}</div>
                  <div className="vin-cell-meta">Aus VIN-Position 10</div>
                </div>
                <div className="vin-cell vin-cell-sfd">
                  <div className="vin-cell-label">SFD-Variante</div>
                  <div className="vin-cell-value" style={{color: sfdColor}}>
                    {result.sfd}
                  </div>
                  <div className="vin-cell-meta">
                    {result.sfd === "SFD1" && "Voll unterstützt"}
                    {result.sfd === "SFD2" && "Service + Diagnose, Coding limitiert"}
                    {result.sfd === "kein SFD" && "Keine Freischaltung erforderlich"}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="vin-disclaimer">
            Hinweis: Indikativ. Verbindlich ist der Auto-Scan im Fahrzeug.
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { VCDSMockup, VCDSScreenshot, VINDecoder });

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
      <div className="vcds-shot-caption">
        <span className="vcds-shot-dot"></span>
        VCDS Beta 26.5.0 · 34&#8239;716 Codes Loaded · Online-SFD aktiv
      </div>
    </div>
  );
}
window.VCDSScreenshot = VCDSScreenshot;
