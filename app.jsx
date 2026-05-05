/* === Main App — vcds.de brand === */
const { useState: useAppState, useEffect: useAppEffect } = React;

function App() {
  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "typography": "modern",
    "heroVisual": "screenshot"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(tweakDefaults)
    : [tweakDefaults, () => {}];

  const [menuOpen, setMenuOpen] = useAppState(false);
  useAppEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useAppEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme || "light";
    // Typography swap
    const fonts = {
      modern:    { sans: "'Inter Tight', 'Inter', system-ui, sans-serif" },
      technical: { sans: "'IBM Plex Sans', 'Inter Tight', system-ui, sans-serif" },
      editorial: { sans: "'Fraunces', Georgia, serif" },
    };
    const f = fonts[tweaks.typography] || fonts.modern;
    document.documentElement.style.setProperty("--sans", f.sans);
  }, [tweaks.theme, tweaks.typography]);

  return (
    <>
      {/* === Top Nav === */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="brand brand-logo-stack">
            <a href="https://vcds.de" aria-label="Zur VCDS.de-Startseite">
              <img src="vcds-de-logo.png" alt="VCDS.de" className="brand-logo"/>
            </a>
            <span className="divider"></span>
            <span className="tag">Online-SFD</span>
          </div>
          <div className="nav-links">
            <a href="#loesung">Funktionsweise</a>
            <a href="#vergleich">SFD1 vs. SFD2</a>
            <a href="#eignung">Eignungs-Check</a>
            <a href="#voraussetzungen">Voraussetzungen</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#faq">FAQ</a>
            <a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener" className="forum-link">Forum ↗</a>
          </div>
          <div className="nav-ctas">
            <a href="https://www.auto-intern.de/shop/vcds/" target="_blank" rel="noopener" className="nav-cta-shop">
              Shop ↗
            </a>
            <a href="mailto:support@vcds.de?subject=Online-SFD%20Support" className="nav-cta nav-cta-desktop">
              ✉ support@vcds.de
            </a>
          </div>
          <button
            className={"nav-burger" + (menuOpen ? " open" : "")}
            aria-label="Menü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile" onClick={() => setMenuOpen(false)}>
            <div className="nav-mobile-inner" onClick={e => e.stopPropagation()}>
              <a href="#loesung" onClick={() => setMenuOpen(false)}>Funktionsweise</a>
              <a href="#vergleich" onClick={() => setMenuOpen(false)}>SFD1 vs. SFD2</a>
              <a href="#eignung" onClick={() => setMenuOpen(false)}>Eignungs-Check</a>
              <a href="#voraussetzungen" onClick={() => setMenuOpen(false)}>Voraussetzungen</a>
              <a href="#ablauf" onClick={() => setMenuOpen(false)}>Ablauf</a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
              <a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener" className="forum-link">Forum-Thread ↗</a>
              <a href="https://www.ross-tech.com/vcds/download/beta/26-5.php" target="_blank" rel="noopener">Beta 26.5 Download ↗</a>
              <a href="https://www.auto-intern.de/shop/vcds/" target="_blank" rel="noopener" className="mobile-cta-shop">
                Auto-Intern Shop ↗
              </a>
              <a href="mailto:support@vcds.de?subject=Online-SFD%20Support" className="mobile-cta">
                ✉ support@vcds.de
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* === Hero === */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-meta">
                <span className="beta-badge">
                  <span className="pulse"/>
                  Public Beta · erschienen im Mai 2026
                </span>
              </div>
              <h1>SFD-Schutz freischalten.<br/>Mit&nbsp;VCDS. <em>Online.</em></h1>
              <p className="hero-sub">
                Seit Mai&nbsp;2026 öffentlich verfügbar: Der Online-SFD-Service für VCDS entsperrt geschützte Steuergeräte in Fahrzeugen des VAG-Konzerns – direkt aus der Werkstatt, ohne Umweg über den Markenhändler.
              </p>
              <div className="hero-ctas">
                <a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener" className="btn btn-primary">
                  Direkt zum Forum von Ross-Tech <span className="arrow"><Icon.ArrowRight/></span>
                </a>
                <a href="#voraussetzungen" className="btn btn-secondary">Voraussetzungen prüfen</a>
              </div>

              <div style={{marginTop: 36, display: "flex", gap: 24, flexWrap: "wrap",
                           fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)"}}>
                <span>✓ VW · Audi · Škoda · SEAT · CUPRA · Bentley · MAN</span>
                <span>✓ HEX-NET · HEX-V2</span>
                <a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener"
                   style={{color: "var(--accent)", borderBottom: "1px solid currentColor"}}>
                  Original-Thread im Ross-Tech-Forum ↗
                </a>
              </div>
            </div>
            <div>
              {tweaks.heroVisual === "terminal" ? <HeroTerminal/>
                : tweaks.heroVisual === "vcds" ? <VCDSMockup/>
                : <VCDSScreenshot/>}
            </div>
          </div>

          {/* Trust bar */}
          <div className="trust">
            <div className="trust-item">
              <div className="trust-icon"><Icon.Shield/></div>
              <div className="trust-text">
                <strong>Offiziell durch Ross-Tech</strong><br/>
                Hersteller von VCDS
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Icon.Hardware/></div>
              <div className="trust-text">
                <strong>HEX-NET & HEX-V2</strong><br/>
                mit Beta-Firmware
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><Icon.Beta/></div>
              <div className="trust-text">
                <strong>Public Beta</strong><br/>
                erschienen im Mai 2026
              </div>
            </div>
            <a href="https://t.me/vcdsde" target="_blank" rel="noopener" className="trust-item trust-item-link">
              <div className="trust-icon"><Icon.Telegram/></div>
              <div className="trust-text">
                <strong>Community auf Telegram</strong><br/>
                t.me/vcdsde
              </div>
            </a>
          </div>
        </div>
      </section>

      <ProblemSection/>
      <LoesungSection/>
      <CompareSection/>
      <EignungsCheck/>
      <VoraussetzungenSection/>
      <AblaufSection/>
      <UseCasesSection/>
      <FAQSection/>
      <FinalCTA/>
      <Footer/>

      {/* === Tweaks panel === */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Erscheinungsbild">
            <window.TweakRadio
              label="Theme"
              value={tweaks.theme}
              options={[{value:"light",label:"Light"},{value:"dark",label:"Dark"}]}
              onChange={v => setTweak("theme", v)}
            />
            <window.TweakRadio
              label="Typografie"
              value={tweaks.typography}
              options={[
                {value:"modern",label:"Modern"},
                {value:"technical",label:"Technisch"},
                {value:"editorial",label:"Editorial"},
              ]}
              onChange={v => setTweak("typography", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Hero-Visual">
            <window.TweakRadio
              label="Darstellung"
              value={tweaks.heroVisual}
              options={[
                {value:"screenshot",label:"Screenshot"},
                {value:"vcds",label:"Mockup"},
                {value:"terminal",label:"Terminal"},
              ]}
              onChange={v => setTweak("heroVisual", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
