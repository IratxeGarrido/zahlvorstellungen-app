# Zahlvorstellungen – Lernstandserhebung

Interaktive Web-App mit 14 Items zur Leitidee Zahlvorstellungen (RLP Berlin-Brandenburg)
für Klasse 5 (Niveaustufen C/D) und Klasse 6 (Niveaustufen D/E).

Designsprache: angelehnt an Mathe Learnground (Fredoka, Nunito, Pastelltöne, Lumi-Maskottchen).

## Schnellstart

Voraussetzung: Node.js (Version 18 oder neuer). Falls noch nicht installiert: https://nodejs.org

```bash
# 1. Ins Projektverzeichnis wechseln
cd zahlvorstellungen-app

# 2. Abhängigkeiten installieren (einmalig, dauert ca. 30 Sekunden)
npm install

# 3. Lokal starten
npm run dev
```

Die App öffnet sich automatisch unter `http://localhost:5173`.

Zum Beenden im Terminal `Ctrl + C` drücken.

## Aufbau

```
zahlvorstellungen-app/
├── index.html              Einstiegspunkt mit Google Fonts
├── package.json
├── vite.config.js
├── public/
│   └── brain.svg           Lumi-Maskottchen als Favicon
└── src/
    ├── main.jsx            React-Bootstrap
    ├── App.jsx             Routing: Welcome → Item → Result
    ├── styles.css          Designsystem (Farben, Typografie, Komponenten)
    ├── components/
    │   └── ui.jsx          Bruch, Maskottchen, Feedback-Banner, Header
    └── items/
        ├── items1to4.jsx   Stellenwerttafel, Bruch am Strahl, Anteil, Zahlen ordnen
        ├── items5to8.jsx   Schätzen, Dezimalzahlvergleich, Teiler, Matching
        ├── items9to11.jsx  Drei Zahlenstrahl-Markierungen Klasse 5
        └── items12to14.jsx Zahlengerade negativ, gemischtes Ordnen, Gegenzahl
```

## Erprobungshinweise

- Der Startbildschirm fragt den Namen des Kindes ab (optional, nur lokal angezeigt).
- Drei Modi: nur Klasse 5 (11 Items), nur Klasse 6 (3 Items), alle 14 Items.
- Pro Aufgabe bekommen Kinder direktes Feedback. Bei richtiger Antwort geht es nach
  ca. 1 Sekunde automatisch zur nächsten Aufgabe weiter.
- Bei Bedarf können Aufgaben übersprungen werden (kleiner Link unten).
- Am Ende: Auswertungsbildschirm mit Medaille (Gold ≥ 80 %, Silber ≥ 50 %, sonst Bronze),
  Aufschlüsselung nach Teilbereich und Niveaustufe sowie einer Übersichtskachel pro Item.

## Datenschutz

Die App speichert nichts. Alle Eingaben bleiben im Browser-Speicher und sind nach
Schließen des Tabs verloren. Für Erprobungen mit dauerhafter Datenspeicherung müsste
ein Backend oder localStorage-Export ergänzt werden.

## Build für Auslieferung

Falls die App auf einem Tablet ohne Node.js laufen soll:

```bash
npm run build
# Erzeugt einen Ordner `dist/` mit fertigen statischen Dateien.
# Diesen Ordner kann jeder Webserver ausliefern (oder zum Testen):
npm run preview
```

## Lizenz

Erstellt für den Forschungs- und Ausbildungskontext am math.media.lab.
Inhalte basieren auf dem Rahmenlehrplan Berlin-Brandenburg (SenBJF, 2023, Teil C Mathematik).
# zahlvorstellungen-app
