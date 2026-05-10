@AGENTS.md

# MedLearn / Medico Mentor Portal

Lernportal für Medizinstudierende an privaten deutschen Hochschulen. Studenten lernen mit Multiple-Choice-Quizzes, geordnet nach Standort → Semester → Fach → Unterthema.

---

## Projekt-Übersicht

| | |
|---|---|
| **Name** | MedLearn / Medico Mentor Portal |
| **Zweck** | Quiz-Lernportal für Vorklinik-Crashkurse |
| **Zielgruppe** | Medizinstudierende an MSB, MSH, HMU |
| **Admin-Email** | hosam828@outlook.de |
| **Deployment** | Vercel (push auf `main` → Auto-Deploy) |

---

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions (`"use server"`)
- **React 19** — `useActionState` (nicht `useFormState`!), Client Components mit `"use client"`
- **Supabase** — Auth (email/password) + PostgreSQL-Datenbank
- **Tailwind CSS 4** — Utility-first, keine Config-Datei nötig
- **TypeScript** — strict mode
- **@anthropic-ai/sdk** — für KI-Features (PDF-Extraktion, Fragen-Kategorisierung)

---

## Next.js 16 Breaking Changes (WICHTIG)

### proxy.ts statt middleware.ts
```
// FALSCH: middleware.ts existiert nicht mehr
// RICHTIG: proxy.ts im Root-Verzeichnis
```
Die Datei heißt `proxy.ts`. Beide Dateien gleichzeitig → Build-Fehler.

### params ist ein Promise
```typescript
// FALSCH (Next.js 14):
export default function Page({ params }: { params: { standort: string } }) {

// RICHTIG (Next.js 16):
export default async function Page({ params }: { params: Promise<{ standort: string }> }) {
  const { standort } = await params;
```

### "use server" Dateien
- Dürfen **nur async functions** exportieren
- Kein Export von Objekten, Konstanten oder Typen
- Typen/Konstanten → separate Datei ohne `"use server"` auslagern

### useFormState → useActionState
```typescript
// FALSCH: import { useFormState } from "react-dom"
// RICHTIG:
import { useActionState } from "react";
const [state, action, pending] = useActionState(serverAction, undefined);
```

---

## Verzeichnisstruktur

```
crashkurs-portal/
├── app/
│   ├── page.tsx                        # Startseite / Standortauswahl
│   ├── layout.tsx                      # Root Layout (Fonts, Metadata)
│   ├── globals.css                     # Tailwind + Theme-Variablen
│   ├── [standort]/
│   │   ├── page.tsx                    # Semesterauswahl (Server Component)
│   │   ├── StandortClient.tsx          # Semester → Fach Auswahl (Client)
│   │   └── [fach]/quiz/
│   │       ├── page.tsx                # Quiz-Wrapper (Server Component)
│   │       └── QuizClient.tsx          # Quiz-Logik (Client Component)
│   ├── admin/
│   │   ├── layout.tsx                  # Auth-Guard (nur hosam828@outlook.de)
│   │   ├── page.tsx                    # Dashboard
│   │   ├── error.tsx                   # Error Boundary
│   │   ├── _components/
│   │   │   ├── AdminNav.tsx            # Sidebar-Navigation
│   │   │   └── QuestionForm.tsx        # Frage erstellen/bearbeiten
│   │   ├── fragen/
│   │   │   ├── page.tsx                # Fragenliste (Server Component)
│   │   │   ├── FragenClient.tsx        # Tabelle + Filter + Import (Client)
│   │   │   └── new/page.tsx            # Neue Frage
│   │   ├── kategorisierung/
│   │   │   └── page.tsx                # KI-Kategorisierung
│   │   ├── questions/                  # Legacy-Fragenverwaltung
│   │   └── pdf/page.tsx                # PDF → Fragen Extraktion
│   ├── actions/
│   │   ├── auth.ts                     # login, signup, logout
│   │   ├── admin.ts                    # createQuestion, updateQuestion, deleteQuestion
│   │   ├── fragen.ts                   # toggleStatus, moveFrage, deleteFrage, importFromQuizData, loadFragen
│   │   └── kategorisierung.ts          # kategorisiereAlleFragen, kategorisiereFach
│   ├── components/
│   │   └── NavAuth.tsx                 # Login/Logout-Button in Navbar
│   ├── login/                          # Login-Seite
│   └── register/                       # Registrierungs-Seite
├── lib/
│   ├── quiz-data.ts                    # Statische Quizfragen (lokal, nicht Supabase)
│   ├── themen-config.ts                # Kanonische Themen-Taxonomie pro Fach
│   └── supabase/
│       ├── client.ts                   # Browser-Client
│       └── server.ts                   # Server-Client (cookie-based)
├── supabase/
│   ├── questions.sql                   # Initiales Schema + RLS
│   └── migration_v2.sql                # status + source_id Spalten (muss manuell ausgeführt werden!)
├── scraper/                            # Python-Scraper für docsdocs.net
│   └── output/                         # Gescrapte JSON-Dateien
├── proxy.ts                            # Next.js 16 Middleware (Auth-Refresh + Admin-Guard)
└── AGENTS.md                           # Hinweis auf Next.js 16 Breaking Changes
```

---

## Routen

| Route | Beschreibung |
|---|---|
| `/` | Standortauswahl (MSB, MSH, HMU) |
| `/[standort]` | Semesterauswahl → Fächerübersicht |
| `/[standort]/[fach]/quiz` | Quiz (Themenauswahl → Fragen → Ergebnis) |
| `/login` | Login |
| `/register` | Registrierung |
| `/admin` | Admin-Dashboard (nur hosam828@outlook.de) |
| `/admin/fragen` | Fragenverwaltung (Tabelle + Kategorien-View) |
| `/admin/fragen/new` | Neue Frage manuell erstellen |
| `/admin/kategorisierung` | KI-Kategorisierung mit Claude Haiku |
| `/admin/pdf` | PDF hochladen → Fragen automatisch extrahieren |

---

## Supabase

### Tabellen

**`questions`**
```sql
id           uuid PRIMARY KEY
question     text
options      jsonb          -- string[]
correct_index int
explanation  text
fach         text           -- chemie | biochemie | physik | physiologie | biologie
thema        text           -- Unterthema (z.B. "Enzyme & Kinetik")
source       text           -- "quiz-data" | "manual" | "pdf"
source_id    text UNIQUE    -- Deduplizierung (z.B. "quizdata:as-1")
status       text           -- "active" | "inactive"
created_by   uuid
created_at   timestamptz
updated_at   timestamptz
```

**`quiz_results`**
```sql
id         uuid PRIMARY KEY
user_id    uuid
standort   text
fach       text
thema      text
score      int
total      int
percentage int
created_at timestamptz
```

### Migrationen
1. `supabase/questions.sql` — Grundtabelle, RLS, Trigger
2. `supabase/migration_v2.sql` — `status` + `source_id` Spalten, Indizes
   → **Muss manuell im Supabase SQL-Editor ausgeführt werden!**

### RLS-Policies
- Admin (hosam828@outlook.de) → voller Zugriff
- Authentifizierte User → nur READ auf `questions`

---

## Fachstruktur & Semester

```
Semester 1: Chemie, Physik
Semester 2: Biochemie 1, Physiologie 1
Semester 3: Bald verfügbar
Semester 4: Bald verfügbar
```

### Fach-Farben (UI)
| Fach | Farbe |
|---|---|
| Chemie | Amber (`text-amber-300`) |
| Physik | Indigo (`text-indigo-300`) |
| Biochemie | Emerald (`text-emerald-300`) |
| Physiologie | Rose (`text-rose-300`) |

### Standort-Farben (UI)
| Standort | Farbe |
|---|---|
| MSB Berlin | Sky (`text-sky-300`) |
| MSH Hamburg | Teal (`text-teal-300`) |
| HMU Potsdam | Violet (`text-violet-300`) |

---

## Themen-Taxonomie (lib/themen-config.ts)

Die kanonischen Unterthemen für die KI-Kategorisierung:

- **Chemie**: Atombau & Periodensystem, Chemische Bindung, Stöchiometrie & Gleichgewichte, Thermodynamik & Kinetik, Säuren & Basen, Redox & Elektrochemie, Funktionelle Gruppen, Stereochemie, Reaktionsmechanismen, Lösungen & Elektrolyte
- **Physik**: Mechanik & Statik, Hydrostatik & Strömungslehre, Elektrodynamik, Optik, Thermodynamik, Schwingungen & Wellen, Atomphysik & Strahlung, Biophysik
- **Biochemie**: Aminosäuren & Peptide, Proteinstruktur & -funktion, Enzyme & Kinetik, Kohlenhydrate & Glykolyse, Lipide & Membranen, Nukleinsäuren, DNA-Replikation & -Reparatur, Transkription & Translation, Vitamine & Coenzyme, Energiestoffwechsel
- **Physiologie**: Herz & Kreislauf, Elektrophysiologie & Membranpotenzial, Atemphysiologie, Niere & Elektrolyte, Nervensystem & Synapsen, Muskelphysiologie, Endokrinologie, Sinnesphysiologie, Blut & Hämostase, Gastrointestinaltrakt

---

## Admin-Bereich

- Zugriff nur für `hosam828@outlook.de` — geprüft in `app/admin/layout.tsx` UND `proxy.ts`
- Admin-Client immer über `getAdminClient()` Helper holen (wirft Error bei falschem User)
- Farben im Admin: **Violet-Akzente** — nicht mit den User-UI-Farben ändern!

### Workflow: Fragen hinzufügen
1. **Quiz-Data Import**: `/admin/fragen` → "Quiz-Data importieren" (einmalig, dedupliziert via `source_id`)
2. **KI-Kategorisierung**: `/admin/kategorisierung` → alle Fragen in ~1–3 Min. mit Claude Haiku klassifizieren
3. **Manuell**: `/admin/fragen/new` → Frage per Formular erstellen
4. **PDF**: `/admin/pdf` → PDF hochladen, Claude extrahiert Fragen automatisch

---

## Umgebungsvariablen (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ANTHROPIC_API_KEY=...
```

---

## Wichtige Befehle

```bash
npm run dev                                          # Lokaler Dev-Server (localhost:3000)
npx tsc --noEmit                                     # TypeScript-Check
npx next build                                       # Production Build

git add . && git commit -m "..." && git push origin main   # Deploy auf Vercel
```

---

## Geplante Features (Roadmap)

- **Stripe-Zahlung** — Zugang für zahlende Studenten freischalten
- **Semester 3 & 4** — weitere Fächer (Anatomie, Histologie, ...)
- **Altklausuren** — PDF-Klausuren pro Standort/Fach durchsuchen
- **Fortschrittsanalyse** — Lernstatistiken pro User
- **Rangliste** — Vergleich mit Kommilitonen

---

## Häufige Fehler & Lösungen

| Fehler | Ursache | Lösung |
|---|---|---|
| `"use server" file can only export async functions` | Objekt/Konstante in Server-Action-Datei exportiert | In separate Datei ohne `"use server"` auslagern |
| `Both middleware.ts and proxy.ts detected` | Beide Dateien existieren | `middleware.ts` löschen, nur `proxy.ts` verwenden |
| `Invalid API key` im Admin | Supabase-Projekt pausiert oder falscher Anon-Key | Supabase Dashboard → Settings → API → Anon Key prüfen |
| `(QuizTopic \| undefined)[]` TypeScript-Fehler | Doppelte Kommas `,,` in `quiz-data.ts` | Zeilen mit nur `,` entfernen (Merge-Script-Bug) |
| Admin zeigt "Nicht autorisiert" | Falsche Email eingeloggt | Mit hosam828@outlook.de einloggen |
