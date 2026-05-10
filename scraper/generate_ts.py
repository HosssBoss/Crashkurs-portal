#!/usr/bin/env python3
"""Generates TypeScript topic blocks from scraped JSONs. Supports 4 or 5 options."""
import json, pathlib, sys, re

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

FILES = [
    ("output/01_chemie.json",       "chemie",      "docsdocs-chemie",       "Docsdocs Chemie",       "🧪"),
    ("output/01_physik.json",       "physik",      "docsdocs-physik",       "Docsdocs Physik",       "⚡"),
    ("output/02_biochemie1.json",   "biochemie",   "docsdocs-biochemie1",   "Docsdocs Biochemie 1",  "🧬"),
    ("output/02_physiologie1.json", "physiologie", "docsdocs-physiologie1", "Docsdocs Physiologie 1","🫀"),
]

def ts_str(s):
    if not s:
        return '""'
    s = s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\r", "")
    return f'"{s}"'

results = {}
for fname, fach, topic_id, topic_name, emoji in FILES:
    p = pathlib.Path(fname)
    if not p.exists():
        print(f"// SKIP: {fname} not found", file=sys.stderr)
        continue
    d = json.loads(p.read_text(encoding="utf-8"))
    all_qs = d["questions"]
    # Nur filtern wenn correct_index außerhalb der options liegt
    qs = [q for q in all_qs
          if isinstance(q.get("correct_index"), int)
          and 0 <= q["correct_index"] < len(q.get("options", []))
          and len(q.get("options", [])) >= 2]
    print(f"// {fach}: {len(qs)} valid questions (from {len(all_qs)} total)", file=sys.stderr)

    q_lines = []
    for q in qs:
        ci = q["correct_index"]
        opts = q["options"]
        # Mindestens 4 Optionen, maximal 5
        while len(opts) < 4:
            opts.append("")
        opts = opts[:5]
        explanation = q.get("explanation") or f"Die richtige Antwort ist: {opts[ci]}"
        opts_ts = ",\n              ".join(ts_str(o) for o in opts)
        q_lines.append(f"""          {{
            id: {ts_str(str(q['id']))},
            question: {ts_str(q['question'])},
            options: [
              {opts_ts}
            ],
            correctIndex: {ci},
            explanation: {ts_str(explanation)},
          }}""")

    topic_ts = f"""      {{
        id: "{topic_id}",
        name: {ts_str(topic_name)},
        emoji: "{emoji}",
        questions: [
{(",\n").join(q_lines)}
        ],
      }}"""
    results.setdefault(fach, []).append(topic_ts)

for fach, topics in results.items():
    for t in topics:
        print(f"\n// ── ADD TO {fach.upper()}.topics ──────────────────────────")
        print(t + ",")
