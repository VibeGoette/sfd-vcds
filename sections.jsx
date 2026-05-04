/* === Sections: Problem, Lösung, Compare, Voraussetzungen, Ablauf, UseCases, FAQ, Final === */

function ProblemSection() {
  return (
    <section id="problem">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Problem</span>
        <h2>Ab Modelljahr&nbsp;2020 neu eingeführte Fahrzeugmodelle: Steuergeräte verriegelt.</h2>
      </div>
      <div className="wrap" style={{paddingBottom: 80}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 48, alignItems:"start"}}
             className="problem-grid">
          <div>
            <p style={{fontSize: 17, lineHeight: 1.6, color: "var(--ink-dim)", marginBottom: 18}}>
              <strong style={{color: "var(--ink)"}}>SFD</strong> steht für „Schutz Fahrzeug Diagnose“. VW, Audi, Škoda, SEAT und Cupra verriegeln damit in allen ab Modelljahr&nbsp;2020 neu eingeführten Fahrzeugmodellen zentrale Steuergeräte gegen unautorisierten Zugriff.
            </p>
            <p style={{fontSize: 17, lineHeight: 1.6, color: "var(--ink-dim)"}}>
              Ohne SFD-Freischaltung bleiben Routinearbeiten blockiert: Service-Reset nach Inspektion, Bremsen öffnen für den Belagwechsel, Lenkwinkelsensor anlernen, Adaptionswerte zurücksetzen.
            </p>
            <p style={{fontSize: 18, lineHeight: 1.5, color: "var(--ink)", marginTop: 32, fontWeight: 500, letterSpacing: "-0.01em"}}>
              Wer keinen Zugang zur Markenwerkstatt hat, hat bisher nicht freigeschaltet. Damit ist jetzt Schluss.
            </p>
          </div>
          <div>
            <div style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              background: "var(--bg-card)",
              padding: 0,
              overflow: "hidden",
            }}>
              <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--ink-mute)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>Typische blockierte Operationen</div>
              {[
                ["Service-Reset (SRI)", "Bordnetz-SG"],
                ["Bremsbelagwechsel", "Bremsen-SG"],
                ["Lenkwinkelsensor anlernen", "Lenkhilfe-SG"],
                ["Codierung & Adaption", "diverse SGs"],
                ["Komfortfunktionen aktivieren", "Komfort-SG"],
                ["Anhängerkupplung freischalten", "Gateway-SG"],
              ].map(([op, mod], i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "20px 1fr auto",
                  gap: 14,
                  padding: "14px 20px",
                  borderBottom: i === 5 ? "none" : "1px solid var(--line)",
                  fontSize: 14.5,
                  alignItems: "center",
                }}>
                  <span style={{color: "var(--warn)"}}><Icon.Lock/></span>
                  <span style={{color: "var(--ink)"}}>{op}</span>
                  <span style={{fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)"}}>{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoesungSection() {
  return (
    <section id="loesung">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Lösung</span>
        <h2>Online-Freischaltung in unter zwei&nbsp;Minuten.</h2>
        <p className="lead">
          Der Online-SFD-Service von Ross-Tech läuft direkt aus VCDS heraus. Interface anstecken, Sitzung starten, freischalten, arbeiten. Die Authentifizierung passiert über Ross-Tech-Server gegen das Backend von&nbsp;VW.
        </p>
      </div>
      <div className="wrap" style={{paddingBottom: 80}}>
        <div className="three-col">
          {[
            {
              n: "01",
              title: "Sitzung starten",
              body: <>VCDS öffnen → <span className="inline-code">Applications</span> → <span className="inline-code">Start SFD Session</span>. Interface via USB mit dem PC verbunden, der PC mit dem Internet, das Interface mit dem Fahrzeug.</>,
            },
            {
              n: "02",
              title: "Authentifizieren",
              body: <>Anmeldung mit dem Ross-Tech-Konto. Server prüft die Berechtigung, generiert einen Session-Token und übergibt ihn an VCDS.</>,
            },
            {
              n: "03",
              title: "Steuergerät freischalten",
              body: <>Im Steuergerät <span className="inline-code">[Security Access]</span> wählen, die Freischaltung wird automatisch durchgeführt. Sitzung bleibt während der Arbeit aktiv.</>,
            },
          ].map(c => (
            <div key={c.n} className="col-card">
              <span className="num">SCHRITT&nbsp;{c.n}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  const sfd1Rows = [
    ["Vollständige Freischaltung", "Pro Steuergerät via Security Access", "ok"],
    ["Coding & Lange-Codierung", "Lichtsignaturen, Komfort, Retrofit", "ok"],
    ["Adaptionswerte ändern", "Lenkwinkel, AHK, Reifengröße", "ok"],
    ["Service-Funktionen", "SRI-Reset, EPB, Lenkwinkel anlernen", "ok"],
    ["Aktive Sitzung", "Bleibt offen bis manuell beendet", "ok"],
  ];
  const sfd2Rows = [
    ["Standard-Diagnose", "Fehlerspeicher, Live-Daten — ohne SFD nutzbar", "ok"],
    ["Service-Funktionen", "SRI, Bremsen, Lenkwinkel — über regulären SFD-Unlock", "ok"],
    ["Coding-Änderungen", "Backend lehnt grundsätzlich ab", "no"],
    ["Adaption / Retrofit", "Aftermarket-Zugriff auf SFD2-Schicht nicht vorgesehen", "no"],
  ];

  const RowIcon = ({ kind }) => {
    if (kind === "ok") return <Icon.Check className="check-ok"/>;
    if (kind === "warn") return <Icon.Check className="check-warn"/>;
    return <Icon.X className="check-no"/>;
  };

  return (
    <section id="vergleich">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Was geht – was nicht</span>
        <h2>SFD ist nicht gleich&nbsp;SFD.</h2>
        <p className="lead">SFD1 und SFD2 existieren parallel — beide werden weiterhin in neuen Modellen verbaut. Welche Variante ein Steuergerät verwendet, zeigt der Auto-Scan: <span className="inline-code">SFD1</span> oder <span className="inline-code">SFD2</span> wird pro Steuergerät ausgewiesen.</p>
      </div>
      <div className="wrap" style={{paddingBottom: 60}}>
        <div className="compare">
          <div className="compare-card">
            <span className="compare-tag"><Icon.Unlock/> Voll unterstützt</span>
            <h3>SFD1</h3>
            <div className="compare-meta">Seit Modelljahr 2020&nbsp;&middot;&nbsp;weiterhin im Einsatz</div>
            <div className="compare-rows">
              {sfd1Rows.map(([t, sub, k], i) => (
                <div key={i} className="compare-row">
                  <span><RowIcon kind={k}/></span>
                  <span className="label">{t}<small>{sub}</small></span>
                </div>
              ))}
            </div>
          </div>
          <div className="compare-card limited">
            <span className="compare-tag"><Icon.Lock/> Andere Architektur</span>
            <h3>SFD2</h3>
            <div className="compare-meta">Selektiv neu eingeführt&nbsp;&middot;&nbsp;koexistent zu SFD1</div>
            <div className="compare-rows">
              {sfd2Rows.map(([t, sub, k], i) => (
                <div key={i} className="compare-row">
                  <span><RowIcon kind={k}/></span>
                  <span className="label">{t}<small>{sub}</small></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="note-block">
          <strong>SFD1 und SFD2 sind keine Versionen, die aufeinander aufbauen — es sind zwei vom Prinzip her unterschiedliche Systeme, die parallel im Einsatz sind.</strong> Bei SFD2 prüft das Backend von VW jede Änderung gegen die VIN-spezifische Konfiguration. Änderungen außerhalb der vom Hersteller vorgesehenen Konfiguration werden serverseitig abgewiesen. Das ist keine Einschränkung von VCDS – das ist die Architektur von SFD2. Aftermarket-Tools haben aktuell keinen Zugriff auf diese Ebene.
        </div>
      </div>
    </section>
  );
}

function VoraussetzungenSection() {
  const [done, setDone] = useState({a: false, b: false, c: false});
  const allDone = done.a && done.b && done.c;

  const items = [
    {
      key: "a",
      title: "Verified User im Ross-Tech-Forum",
      body: "Ohne Verifizierung kein SFD-Service. Verifizierung ist kostenfrei, dauert 1 – 3 Werktage und ist an die Seriennummer des Interfaces gebunden.",
    },
    {
      key: "b",
      title: "VCDS Beta 26.5 installiert",
      body: <>Die Online-SFD-Funktionalität ist erst ab <span className="inline-code">Beta&nbsp;26.5</span> enthalten. Stable-Versionen können den Service nicht starten.</>,
    },
    {
      key: "c",
      title: "Beta-Firmware auf dem Interface",
      body: "Das Interface muss auf den Beta-Channel umgestellt und auf die aktuelle Firmware geflasht sein. Der Test ist simpel: Wenn ein vollständiger Auto-Scan mit Beta 26.5 funktioniert, ist die Firmware kompatibel.",
    },
  ];

  return (
    <section id="voraussetzungen">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Voraussetzungen</span>
        <h2>Drei Dinge müssen stimmen, bevor du loslegst.</h2>
        <p className="lead">Tippe auf die Felder rechts, um deinen Fortschritt abzuhaken. Wenn alle drei erfüllt sind, schalten wir unsere Support-Nummer frei – falls du noch Fragen hast.</p>
      </div>
      <div className="wrap-tight" style={{paddingBottom: 24}}>
        <div className="checklist">
          {items.map((it, i) => (
            <div key={it.key} className="check-item">
              <span className="check-num">0{i+1}&nbsp;/&nbsp;03</span>
              <div className="check-body">
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
              <button
                className={`check-state ${done[it.key] ? "done" : ""}`}
                onClick={() => setDone(d => ({...d, [it.key]: !d[it.key]}))}
                aria-pressed={done[it.key]}
              >
                <span className="box"/>
                {done[it.key] ? "ERLEDIGT" : "OFFEN"}
              </button>
            </div>
          ))}
        </div>

        <div className="warning">
          <div className="warning-icon"><Icon.Warning/></div>
          <div>
            <h3>Kritisch: Erst scannen, dann buchen.</h3>
            <p>
              Wer den SFD-Service bucht, ohne vorher erfolgreich einen Auto-Scan mit Beta&nbsp;26.5 durchgeführt zu haben, riskiert die automatische Kontosperre durch das Backend. Bei mehreren fehlgeschlagenen Anmeldeversuchen während einer SFD-Sitzung greifen Sicherheitsmechanismen – das Konto kann <span className="badge-92">mehrwöchig</span> für SFD-Sitzungen gesperrt werden. Das ist keine Strafe von Ross-Tech, das ist serverseitiger Schutz gegen Brute-Force.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: 24,
          padding: "20px 24px",
          border: "1px solid var(--line)",
          borderRadius: 6,
          background: allDone ? "color-mix(in oklab, var(--ok) 10%, var(--bg-elev))" : "var(--bg-elev)",
          borderColor: allDone ? "var(--ok)" : "var(--line)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexWrap: "wrap",
          transition: "all .2s ease",
        }}>
          <div style={{fontFamily: "var(--mono)", fontSize: 13, color: allDone ? "var(--ok)" : "var(--ink-dim)"}}>
            {allDone
              ? "✓ ALLE VORAUSSETZUNGEN ERFÜLLT — SUPPORT-NUMMER FREIGESCHALTET."
              : `STATUS: ${Object.values(done).filter(Boolean).length} / 3 ERLEDIGT — NUMMER NOCH GESPERRT`}
          </div>
          {allDone ? (
            <a href="tel:+4923458545800" className="btn btn-primary btn-mono">
              ☎ +49 (0) 234 58 54 58 00 <span className="arrow"><Icon.ArrowRight/></span>
            </a>
          ) : (
            <button className="btn btn-primary btn-mono" disabled
                    style={{opacity: 0.4, cursor: "not-allowed"}}>
              🔒 Support-Nummer · alle 3 Häkchen setzen
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function AblaufSection() {
  const steps = [
    { time: "Einmalig · 1 – 3 Werktage", title: "Konto verifizieren",
      body: "Im Ross-Tech-Forum registrieren, Verifizierung beantragen, Bestätigung abwarten." },
    { time: "Einmalig · ~10 Min.", title: "VCDS aktualisieren",
      body: "Beta 26.5 herunterladen, installieren, Interface auf Beta-Firmware-Channel umstellen, Firmware-Update durchführen." },
    { time: "~2 Min.", title: "Auto-Scan testen",
      body: "Interface mit dem Fahrzeug verbinden, vollständigen Scan durchführen. Läuft der Scan sauber durch, ist die Voraussetzung erfüllt." },
    { time: "Einmalig", title: "SFD-Service buchen",
      body: "Im Konto die SFD-Funktionalität aktivieren. Pro Account ein Interface – auch bei mehreren HEX-Geräten im Besitz." },
    { time: "~30 Sek.", title: "Sitzung starten",
      body: <>VCDS → <span className="inline-code">Applications</span> → <span className="inline-code">Start SFD Session</span>. Anmeldung mit Ross-Tech-Zugangsdaten. Sitzung bleibt aktiv, bis sie beendet wird.</> },
    { time: "Pro Operation · ~1 Min.", title: "Arbeiten",
      body: "Steuergerät auswählen, Security Access anfordern, gewünschte Funktion ausführen." },
  ];
  return (
    <section id="ablauf">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Ablauf</span>
        <h2>Vom Konto bis zum freigeschalteten Steuergerät.</h2>
      </div>
      <div className="wrap" style={{paddingBottom: 80}}>
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step-content">
                <div className="step-time">{s.time}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    {
      tag: "Service-Reset",
      title: "Inspektion abgeschlossen, SRI klemmt",
      body: "Inspektion durchgeführt, SRI lässt sich nicht zurücksetzen, weil das Bordnetzsteuergerät SFD-geschützt ist. Mit dem Online-Service: Sitzung starten, Steuergerät entsperren, Reset, Sitzung beenden.",
      duration: "Unter 2 Min.",
      compat: "SFD1 + SFD2",
    },
    {
      tag: "Bremsbelagwechsel",
      title: "Bremsen öffnen",
      body: "Belagwechsel an einem aktuellen Audi mit elektronischer Feststellbremse. Ohne SFD: Bremskolben fahren nicht zurück. Mit dem Online-Service: Wartungsmodus aktivieren, Beläge wechseln, Wartungsmodus deaktivieren.",
      duration: "Mit Wechsel: ~30 Min.",
      compat: "SFD1 + SFD2",
    },
    {
      tag: "Codierung",
      title: "Komfortfunktionen anpassen",
      body: "Bei Fahrzeugen mit SFD1 — der Mehrheit ab Modelljahr 2020 — nach der Freischaltung volle Codier- und Adaptions-Rechte. Lichtsignaturen, Komfortfunktionen, Anhängerkupplung – alles wieder zugänglich.",
      duration: "Variabel",
      compat: "Nur SFD1",
    },
  ];
  return (
    <section id="usecases">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>Use Cases</span>
        <h2>Wofür Werkstätten den Service nutzen.</h2>
      </div>
      <div className="wrap" style={{paddingBottom: 80}}>
        <div className="usecases">
          {cases.map((c, i) => (
            <div key={i} className="uc-card">
              <span className="uc-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className="uc-foot">
                <span>{c.compat}</span>
                <span className="duration">{c.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "Brauche ich pro Fahrzeug einen separaten Service?",
      a: "Nein. Der SFD-Service ist an das Konto und das Interface gebunden, nicht an ein Fahrzeug. Innerhalb der Laufzeit können beliebig viele Fahrzeuge entsperrt werden." },
    { q: "Funktioniert der Service offline?",
      a: "Nein. Für den Sitzungsstart wird eine aktive Internetverbindung benötigt. Sobald die Sitzung steht, kann das Interface auch in Bereichen ohne Empfang weiter mit dem Fahrzeug arbeiten – aber jede neue Sitzung erfordert Online-Zugang." },
    { q: "Was passiert bei mehreren Interfaces im Konto?",
      a: "Pro Konto wird zum jetzigen Zeitpunkt ein Interface für den SFD-Service aktiviert. Wer mehrere Interfaces besitzt, wählt das Gerät bei der Aktivierung aus." },
    { q: "Bin ich nach dem Kauf sofort einsatzbereit?",
      a: "Ja, sofern alle Voraussetzungen erfüllt sind. Wenn das Interface noch nicht auf Beta-Firmware ist oder die Verifizierung fehlt, wird der Auftrag bei Ross-Tech in der Warteschlange gehalten." },
    { q: "Was bedeutet die Kontosperre konkret?",
      a: "Bei wiederholten fehlgeschlagenen Anmeldeversuchen während einer SFD-Sitzung greift ein automatischer Sicherheitsmechanismus auf Backend-Seite. Das Konto wird mehrwöchig für SFD-Sitzungen gesperrt. Auto-Scans und sonstige VCDS-Funktionen bleiben verfügbar." },
    { q: "Funktioniert SFD mit älteren Interfaces?",
      a: "Voraussetzung ist die Beta-Firmware. HEX-NET und HEX-V2 sind unterstützt, sofern sie auf den Beta-Channel umgestellt werden können. Sehr alte Geräte ohne Update-Fähigkeit fallen heraus." },
    { q: "Was kostet der Service?",
      a: "Aktuell befindet sich der Service in der Public-Beta-Phase. Konditionen werden veröffentlicht, sobald sie final festgelegt sind." },
    { q: "Geht das auch bei Porsche oder Lamborghini?",
      a: "Aktuell nicht. Der Online-SFD-Service deckt VW, Audi, Škoda, SEAT, CUPRA, Bentley und MAN ab. Porsche, Lamborghini, Bugatti und Ducati nutzen andere Diagnose-Architekturen und sind nicht im SFD-Scope." },
    { q: "Welche Fahrzeuge sind betroffen?",
      a: "Alle VW-Konzernmarken Audi, Bentley, CUPRA, MAN, SEAT, Škoda und VW ab Modelljahr 2020/2021 — konkret die ab diesem Zeitpunkt neu eingeführten Modelle. Welche einzelnen Steuergeräte SFD-geschützt sind, zeigt der Auto-Scan im Fahrzeug." },
    { q: "Kann SFD dauerhaft deaktiviert werden?",
      a: "Nein. Weder VCDS noch ODIS können SFD permanent deaktivieren. Die Freischaltung läuft nach 90 Minuten automatisch ab — danach ist eine neue SFD-Sitzung erforderlich." },
    { q: "Warum muss ich einen Ausweis hochladen?",
      a: "VW verlangt 100% Rückverfolgbarkeit aller SFD-Tokens. Ross-Tech ist vertraglich zur Identitätsprüfung verpflichtet. Ohne verifizierte Identität keine SFD-Sitzung." },
    { q: "Wie lange dauert die Bearbeitung?",
      a: "1–3 Werktage. Die Identitätsprüfung wird manuell durchgeführt, sobald die Unterlagen vollständig vorliegen. Sobald freigeschaltet, ist das Konto sofort einsatzbereit." },
    { q: "Was ist der Diagnostic Filter?",
      a: "Ein zusätzlicher Schutzmechanismus, der bei neueren Modellen ab MJ 2024 den Zugriff auf Steuergeräte komplett blockiert (in VCDS sichtbar als „-R“ am VCID). Erst nach Gateway-Unlock und Filter-Deaktivierung sind die Module im Standard-Modus erreichbar." },
    { q: "Gibt es Nutzungslimits?",
      a: "Ja: maximal 50 Anfragen pro Stunde, 250 pro Tag und 20 verschiedene VINs pro Tag. Bei Überschreitung greift die automatische Kontosperre." },
    { q: "Werden meine Aktivitäten protokolliert?",
      a: "Ja. Jede SFD-Sitzung wird auf den Servern dokumentiert (Zeitstempel, VIN, Steuergerät). Das ist Teil der Architektur und nicht abstellbar." },
  ];
  return (
    <section id="faq">
      <div className="wrap sec-head">
        <span className="eyebrow"><span className="dot"/>FAQ</span>
        <h2>Häufige Fragen.</h2>
      </div>
      <div className="wrap-tight" style={{paddingBottom: 80}}>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="icon"><Icon.Plus/></span>
              </button>
              <div className="faq-a"><div className="faq-a-inner">{it.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta">
      <div className="wrap">
        <div className="final-cta">
          <div>
            <span className="eyebrow" style={{marginBottom: 18, display: "inline-flex"}}>
              <span className="dot"/>Bereit für die Freischaltung
            </span>
            <h2 style={{marginTop: 14}}>In dieser Reihenfolge.</h2>
            <p style={{marginTop: 16}}>
              Voraussetzungen prüfen, Beta installieren, scannen, buchen. Wer die Reihenfolge einhält, ist in unter einer halben Stunde einsatzbereit – auch ohne Markenwerkstatt im Rücken.
            </p>
          </div>
          <div className="final-cta-actions">
            <a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener" className="btn btn-primary">
              Direkt zum Forum von Ross-Tech <span className="arrow"><Icon.ArrowRight/></span>
            </a>
            <a href="#voraussetzungen" className="btn btn-secondary">Voraussetzungen prüfen</a>
            <button className="btn btn-secondary btn-mono" onClick={() => window.open("https://www.ross-tech.com/vcds/download/beta/26-5.php", "_blank")}>↓ Beta&nbsp;26.5 herunterladen ↗</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand brand-logo-stack">
              <img src="vcds-de-logo.png" alt="VCDS.de" className="brand-logo" style={{height: 32}}/>
              <span className="divider"></span>
              <span className="tag">Online-SFD</span>
            </div>
            <p style={{maxWidth: 44 + "ch", marginTop: 14, fontSize: 13}}>
              Online-Freischaltung für SFD-geschützte Steuergeräte aus dem VAG-Konzern. Public Beta seit 01.05.2026.
            </p>
          </div>
          <div>
            <h4>Service</h4>
            <ul>
              <li><a href="#loesung">Funktionsweise</a></li>
              <li><a href="#vergleich">SFD1 vs. SFD2</a></li>
              <li><a href="#eignung">Eignungs-Check</a></li>
              <li><a href="#voraussetzungen">Voraussetzungen</a></li>
              <li><a href="#ablauf">Ablauf</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Auto-Intern GmbH</h4>
            <ul>
              <li><a href="#impressum">Impressum</a></li>
              <li><a href="#datenschutz">Datenschutz</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
              <li style={{marginTop: 10}}><a href="tel:+4923458545800">Tel: +49 (0) 234 58 54 58 00</a></li>
              <li><a href="mailto:support@vcds.de">support@vcds.de</a></li>
              <li style={{marginTop: 10}}><a href="https://www.ross-tech.com/vcds/download/beta/26-5.php" target="_blank" rel="noopener">VCDS Beta 26.5 Download ↗</a></li>
              <li><a href="https://forums.ross-tech.com/index.php?threads/54647/" target="_blank" rel="noopener">Ross-Tech Forum-Thread ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-disclaimer">
          <strong style={{color: "var(--ink)", display: "block", marginBottom: 6, fontWeight: 500}}>von Auto-Intern GmbH</strong>
          SFD und SFD2 sind Schutzmechanismen der Volkswagen&nbsp;AG. Ross-Tech, VCDS und der Online-SFD-Service stehen in keinem direkten Vertragsverhältnis zur Volkswagen&nbsp;AG. Funktionalität und Verfügbarkeit können sich ändern, sobald der Hersteller die Backend-Schnittstellen anpasst. Stand der Informationen: Mai&nbsp;2026, öffentliche Beta.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ProblemSection, LoesungSection, CompareSection, VoraussetzungenSection,
  AblaufSection, UseCasesSection, FAQSection, FinalCTA, Footer,
});
