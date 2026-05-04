# sfd-vcds

Landingpage für den **VCDS Online-SFD-Service** — Public Beta seit 01.05.2026.

Statische Single-Page-Site, ausgeliefert als reines HTML/CSS/JS. React + Babel werden via CDN im Browser geladen, kein Build-Step nötig.

## Stack

- HTML/CSS (Inter Tight, IBM Plex Sans, Fraunces, JetBrains Mono via Google Fonts)
- React 18 + ReactDOM (UMD, production builds via unpkg)
- Babel Standalone für In-Browser-JSX-Kompilierung
- Hosting: Vercel (Static)

## Lokal testen

Da Babel im Browser läuft, funktioniert kein simples `file://` — wegen CORS-Restriktionen brauchst du einen lokalen Server:

```bash
python3 -m http.server 8080
# oder
npx serve .
```

Dann `http://localhost:8080` öffnen.

## Struktur

```
index.html              Einstiegspunkt (Meta, Schema.org, Script-Loader)
styles.css              Haupt-Stylesheet (Brand, Layout, Komponenten)
styles-extra.css        Zusätzliche Sektion-Styles
app.jsx                 Root-App, Nav, Hero
components.jsx          Icons, kleine UI-Bausteine
sections.jsx            Problem, Lösung, Vergleich, VIN, Voraussetzungen, FAQ, CTA, Footer
vcds-mockup.jsx         3D-Mockup-Visual fürs Hero
vcds-de-logo.png        Brand-Logo
assets/
  vcds-main-screen.jpg  VCDS-Screenshot fürs Hero
```

## Deployment

Push auf `main` → Vercel deployt automatisch.

## Quelle

Design ursprünglich in Claude Design (claude.ai/design) prototypisiert, dann als Handoff-Bundle exportiert und für Production aufbereitet (Tweaks-Panel entfernt, Production-React-Build, Meta-Tags ergänzt).
