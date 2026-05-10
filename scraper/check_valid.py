import json, pathlib
files = [
    "output/01_chemie.json",
    "output/01_physik.json",
    "output/02_biochemie1.json",
    "output/02_physiologie1.json",
]
for f in files:
    d = json.loads(pathlib.Path(f).read_text(encoding="utf-8"))
    qs = d["questions"]
    valid = [q for q in qs if q.get("correct_index", 0) < 4]
    bad   = [q for q in qs if q.get("correct_index", 0) >= 4]
    print(f"{f}: total={len(qs)}, valid(ci<4)={len(valid)}, filtered={len(bad)}")
    for q in bad[:3]:
        print(f"  ci={q['correct_index']} opts={len(q['options'])} | {q['question'][:70]}")
