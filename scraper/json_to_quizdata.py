#!/usr/bin/env python3
"""
Konvertiert die gescrapten JSON-Dateien in das quiz-data.ts Format
und gibt TypeScript-Code aus, der direkt in lib/quiz-data.ts eingefügt werden kann.

Verwendung:
    python json_to_quizdata.py output/01_chemie.json
    python json_to_quizdata.py output/*.json > ../lib/quiz-data-docsdocs.ts
"""

import json
import sys
import re
from pathlib import Path

# Mapping: JSON-Dateiname → Fach-ID + Emoji
FACH_MAP = {
    "01_chemie":       ("chemie",      "🧪"),
    "01_physik":       ("physik",      "⚡"),
    "02_biochemie1":   ("biochemie",   "🧬"),
    "02_physiologie1": ("physiologie", "🫀"),
}

# Thema-Name aus Dateiname ableiten
THEMA_MAP = {
    "01_chemie":       {"id": "docsdocs-chemie",       "name": "Docsdocs Chemie",       "emoji": "🧪"},
    "01_physik":       {"id": "docsdocs-physik",       "name": "Docsdocs Physik",       "emoji": "⚡"},
    "02_biochemie1":   {"id": "docsdocs-biochemie1",   "name": "Docsdocs Biochemie 1",  "emoji": "🧬"},
    "02_physiologie1": {"id": "docsdocs-physiologie1", "name": "Docsdocs Physiologie 1","emoji": "🫀"},
}

def ts_string(s: str) -> str:
    """Escaped einen String für TypeScript."""
    if s is None:
        return '""'
    s = s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\r", "")
    return f'"{s}"'

def convert_file(path: Path) -> tuple[str, list[dict]]:
    stem = path.stem
    # Timestamp entfernen falls vorhanden: 01_chemie_20260509_1234 → 01_chemie
    base_key = re.sub(r"_\d{8}_\d{4}$", "", stem)

    if base_key not in FACH_MAP:
        print(f"[WARN] Kein Mapping für '{base_key}' – überspringe {path.name}", file=sys.stderr)
        return None, []

    fach_id, _ = FACH_MAP[base_key]
    thema = THEMA_MAP[base_key]

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    print(f"[OK] {path.name}: {len(questions)} Fragen → Fach '{fach_id}'", file=sys.stderr)

    return fach_id, thema, questions

def format_question(q: dict) -> str:
    options = q.get("options", [])
    correct = q.get("correct_index", 0)
    explanation = q.get("explanation") or (
        f"Die richtige Antwort ist: {options[correct]}" if options and correct is not None and correct < len(options) else ""
    )

    options_ts = ",\n          ".join(ts_string(o) for o in options[:4])
    while options_ts.count('",') < 3 and len(options) < 4:
        options_ts += ',\n          ""'

    return f"""        {{
          id: "{q.get('id', 0)}",
          question: {ts_string(q.get('question', ''))},
          options: [
          {options_ts}
          ],
          correctIndex: {correct if correct is not None else 0},
          explanation: {ts_string(explanation)},
        }}"""

def main():
    if len(sys.argv) < 2:
        print("Verwendung: python json_to_quizdata.py output/01_chemie.json [...]")
        sys.exit(1)

    # Dateien einlesen
    by_fach: dict[str, list] = {}
    thema_by_fach: dict[str, dict] = {}

    for arg in sys.argv[1:]:
        for path in Path(".").glob(arg) if "*" in arg else [Path(arg)]:
            if not path.exists():
                print(f"[ERR] Datei nicht gefunden: {path}", file=sys.stderr)
                continue
            result = convert_file(path)
            if result[0] is None:
                continue
            fach_id, thema, questions = result
            by_fach.setdefault(fach_id, []).extend(questions)
            thema_by_fach[fach_id] = thema

    if not by_fach:
        print("[ERR] Keine gültigen Dateien gefunden.", file=sys.stderr)
        sys.exit(1)

    # TypeScript-Code ausgeben
    print("// Automatisch generiert von json_to_quizdata.py")
    print("// Füge diesen Code in lib/quiz-data.ts ein (in das quizData-Objekt)\n")

    for fach_id, questions in by_fach.items():
        thema = thema_by_fach[fach_id]
        q_ts = ",\n".join(format_question(q) for q in questions)
        print(f"""  // {fach_id.upper()} – {len(questions)} Fragen
  // In SUBJECTS['{fach_id}'].topics hinzufügen:
  {{
    id: "{thema['id']}",
    name: {ts_string(thema['name'])},
    emoji: "{thema['emoji']}",
    questions: [
{q_ts}
    ],
  }},
""")

if __name__ == "__main__":
    main()
