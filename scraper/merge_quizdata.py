#!/usr/bin/env python3
"""
Merged gescrapte docsdocs-Topics in lib/quiz-data.ts.
Entfernt zuerst alle bestehenden docsdocs-Topics, dann fügt neue ein.
Unterstützt 4 und 5 Antwortoptionen.
"""
import re, sys, pathlib

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

QUIZDATA  = pathlib.Path("../lib/quiz-data.ts")
TOPICS_TS = pathlib.Path("output/quiz-topics-filtered.ts")


# ── 1. Topic-Blöcke aus generierter Datei parsen ─────────────────────────────
topic_blocks: dict[str, str] = {}
current_key = None
current_lines: list[str] = []
for line in TOPICS_TS.read_text(encoding="utf-8").splitlines():
    m = re.match(r"// ── ADD TO (\w+)\.topics", line)
    if m:
        if current_key and current_lines:
            topic_blocks[current_key] = "\n".join(current_lines).strip()
        current_key = m.group(1).lower()
        current_lines = []
    elif current_key is not None:
        current_lines.append(line)

if current_key and current_lines:
    topic_blocks[current_key] = "\n".join(current_lines).strip()

print(f"Parsed topic blocks: {list(topic_blocks.keys())}", file=sys.stderr)
for k, v in topic_blocks.items():
    q_count = v.count('"question"') + v.count("question:")
    print(f"  {k}: ~{q_count} questions", file=sys.stderr)


# ── 2. Bestehende quiz-data.ts lesen ─────────────────────────────────────────
src = QUIZDATA.read_text(encoding="utf-8")
original_len = len(src)


# ── 3. Bestehende docsdocs-Topics entfernen ───────────────────────────────────

def remove_topic_by_id(source: str, topic_id: str) -> str:
    """
    Entfernt einen Topic-Block mit der gegebenen id aus dem Array.
    Sucht nach '{ id: "TOPIC_ID"', verfolgt Klammer-Tiefe, entfernt Block + Komma.
    """
    # Verschiedene Schreibweisen matchen: mit/ohne Leerzeichen, einfache/doppelte Anführung
    pattern = rf'id:\s*["\']?{re.escape(topic_id)}["\']?'
    m = re.search(pattern, source)
    if not m:
        print(f"  Topic '{topic_id}' nicht gefunden – kein Entfernen nötig", file=sys.stderr)
        return source

    # Rückwärts zum öffnenden { des Topics
    brace_pos = source.rfind('{', 0, m.start())
    if brace_pos < 0:
        return source

    # Vorwärts Klammer-Tiefe verfolgen
    depth = 0
    i = brace_pos
    end_pos = -1
    while i < len(source):
        if source[i] == '{':
            depth += 1
        elif source[i] == '}':
            depth -= 1
            if depth == 0:
                end_pos = i + 1
                break
        i += 1

    if end_pos < 0:
        return source

    # Vorangehendes Komma + Leerzeichen entfernen
    pre = source[:brace_pos]
    # Entferne letztes Komma in pre (gehört zur Trennung der Array-Elemente)
    pre_stripped = pre.rstrip()
    if pre_stripped.endswith(','):
        pre = pre_stripped[:-1] + '\n'
    else:
        # Komma könnte NACH dem Block sein
        post = source[end_pos:]
        post_stripped = post.lstrip()
        if post_stripped.startswith(','):
            source = source[:brace_pos] + post_stripped[1:]
        else:
            source = source[:brace_pos] + post
        print(f"  Topic '{topic_id}' entfernt", file=sys.stderr)
        return source

    source = pre + source[end_pos:]
    print(f"  Topic '{topic_id}' entfernt", file=sys.stderr)
    return source


def remove_subject_key(source: str, subject: str) -> str:
    """Entfernt einen gesamten Subject-Block (z.B. physiologie: { ... },) aus quizData."""
    pattern = rf'\n  {re.escape(subject)}:\s*\{{'
    m = re.search(pattern, source)
    if not m:
        print(f"  Subject '{subject}' nicht gefunden – kein Entfernen nötig", file=sys.stderr)
        return source

    # Klammer-Tiefe verfolgen ab dem {
    brace_start = source.index('{', m.start())
    depth = 0
    i = brace_start
    end_pos = -1
    while i < len(source):
        if source[i] == '{':
            depth += 1
        elif source[i] == '}':
            depth -= 1
            if depth == 0:
                end_pos = i + 1
                break
        i += 1

    if end_pos < 0:
        return source

    # Trailing Komma + Newline entfernen
    block_end = end_pos
    while block_end < len(source) and source[block_end] in ',\n\r ':
        if source[block_end] == '\n':
            block_end += 1
            break
        block_end += 1

    source = source[:m.start()] + '\n' + source[block_end:]
    print(f"  Subject '{subject}' entfernt", file=sys.stderr)
    return source


# Bestehende docsdocs-Topics aus den 3 Haupt-Fächern entfernen
for topic_id in ["docsdocs-chemie", "docsdocs-physik", "docsdocs-biochemie1"]:
    src = remove_topic_by_id(src, topic_id)

# Physiologie war als eigenes Subject eingefügt – komplett entfernen
src = remove_subject_key(src, "physiologie")

print(f"Nach Bereinigung: {len(src)} chars (vorher: {original_len})", file=sys.stderr)


# ── 4. Topics in bestehende Fächer einfügen ───────────────────────────────────

def insert_topic(source: str, subject: str, new_topic: str) -> str:
    """Fügt ein neues Topic ans Ende des subjects.topics-Arrays ein."""
    subject_start = re.search(
        rf"^  {re.escape(subject)}: \{{\n    topics: \[",
        source, re.MULTILINE
    )
    if not subject_start:
        print(f"  [WARN] Subject '{subject}' nicht gefunden", file=sys.stderr)
        return source

    # Klammer-Tiefe verfolgen ab dem [
    pos = subject_start.end()
    depth = 1
    i = pos
    while i < len(source) and depth > 0:
        if source[i] == '[':
            depth += 1
        elif source[i] == ']':
            depth -= 1
        i += 1

    close_bracket_pos = i - 1
    indent = "      "
    insertion = f",\n{indent}{new_topic}\n    "
    result = source[:close_bracket_pos] + insertion + source[close_bracket_pos:]
    print(f"  Topic in '{subject}' eingefügt (Pos {close_bracket_pos})", file=sys.stderr)
    return result


for subj in ["biochemie", "chemie", "physik"]:
    if subj in topic_blocks:
        src = insert_topic(src, subj, topic_blocks[subj])


# ── 5. Physiologie als neues Subject einfügen ─────────────────────────────────
if "physiologie" in topic_blocks:
    phys_topic = topic_blocks["physiologie"]
    new_subject = f"""
  physiologie: {{
    topics: [
      {phys_topic}
    ],
  }},"""
    src = re.sub(r"\n\};$", new_subject + "\n};", src)
    print("  Subject 'physiologie' hinzugefügt", file=sys.stderr)


# ── 6. Ergebnis schreiben ─────────────────────────────────────────────────────
QUIZDATA.write_text(src, encoding="utf-8")
lines = src.count('\n') + 1
print(f"Fertig. quiz-data.ts: {len(src)} chars / {lines} Zeilen", file=sys.stderr)
