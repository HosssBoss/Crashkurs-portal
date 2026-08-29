# Florésia Ads — Story-Format-Erweiterung

Der `floresia-ads` Skill rendert nur **1080×1350 (4:5, Beitrag)**.
Dieses Verzeichnis ergänzt **1080×1920 (9:16, Story/Reel)** und rendert beide
Platzierungen aus *einem* Briefing.

## Verwendung

```bash
export NODE_PATH=$PWD/node_modules
node build.js briefs out
```

Pro Briefing entstehen `<name>_post.png` und `<name>_story.png`.
Ein optionaler `story: {...}` Block im Briefing überschreibt Felder nur für 9:16.

## Was die Erweiterung löst

Die 9:16-Fläche ist nicht einfach eine höhere 4:5 — drei Dinge brechen sonst:

1. **Meta Story Safe Zones.** Oben 250 px (Profilzeile) und unten 250 px
   ("Mehr dazu") werden von Metas UI überdeckt. Headline, CTA, Badge und das
   Split-Panel (Logo oben, CTA/www-Pill unten) werden aus diesen Zonen gerückt.
2. **Subline-Position.** Die Engine setzt das `top` der Subline inline, berechnet
   gegen den 4:5-Headline-Ursprung (46 px). Story schiebt die Headline auf 300 px,
   also muss die Subline dieselben 254 px mitwandern — sonst steht sie *über*
   der Headline.
3. **Playfair Display.** Ist hier weder per apt noch über fonts.google.com
   installierbar. `build.js` bettet die npm-woff2-Dateien
   (`@fontsource/playfair-display`) als data-URI ein, sonst fällt der CTA-Serif
   still auf eine Ersatzschrift zurück.

## Setup in dieser Umgebung

```bash
npm install playwright @fontsource/playfair-display
apt-get install -y fonts-montserrat      # Montserrat Black (900) = Headline
pip3 install pillow                      # für analyze.py / mkplaceholder.py
```

Chromium liegt vorinstalliert unter `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`;
`build.js` zeigt per `executablePath` darauf (`PW_CHROME` überschreibt das).
`npx playwright install` ist nicht nötig und schlägt fehl.

## Motive

`mkplaceholder.py` erzeugt nur **Platzhalter-Szenen** zum Prüfen von Layout und
Safe Zones. Für echte Ads die Pfade `bg` / `story.bg` in den Briefings auf die
echten Florésia-Fotos zeigen lassen und neu rendern — sonst ändert sich nichts.
