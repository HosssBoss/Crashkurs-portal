#!/usr/bin/env python3
"""
docsdocs.net Quiz-Scraper v5

Verbesserungen:
- Alle Klausuren werden ausgewählt (nicht nur die größte)
- 5 Antwortmöglichkeiten werden unterstützt
- Automatische Textbereinigung (μ, →, α/β/γ/δ/ε, Leerzeichen)
- Korrekte Antwort per Polling erkannt (bis 35s für Server-Latenzen)
- Vorab-beantwortete Fragen werden sofort erkannt (kein Überprüfen nötig)
- Bild-Fragen werden via <img>-Tag-Erkennung übersprungen

Verwendung:
    python scrape_docsdocs.py --email USER --passwort PASS
    python scrape_docsdocs.py --fach chemie --email USER --passwort PASS
    python scrape_docsdocs.py --debug --email USER --passwort PASS
"""

import asyncio
import json
import re
import sys
import os
import argparse
import traceback
from pathlib import Path
from datetime import datetime
from getpass import getpass

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ─── AUTO-SETUP ──────────────────────────────────────────────────────────────

def ensure_dependencies():
    import importlib.util
    if importlib.util.find_spec("playwright") is None:
        import subprocess
        print("Playwright wird installiert ...")
        subprocess.run([sys.executable, "-m", "pip", "install", "playwright"], check=True)
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)
        os.execv(sys.executable, [sys.executable] + sys.argv)

ensure_dependencies()

from playwright.async_api import async_playwright, Page, BrowserContext, TimeoutError as PWTimeout

# ─── KONFIGURATION ───────────────────────────────────────────────────────────

BASE_URL     = "https://docsdocs.net"
BASE_URL_WWW = "https://www.docsdocs.net"
MANAGER_URL  = "https://www.docsdocs.net/trainer/manager"

SUBJECTS = {
    "01_chemie": {
        "name": "Chemie",
        "semester": "01",
        "keywords": ["chemie"],
        "exclude_kw": ["biochemie"],
        "url": "https://www.docsdocs.net/trainer/select/subject/01ec-5fd9-fbb26baa-a000-3cf437b0a1cb",
        "expected": 362,
    },
    "01_physik": {
        "name": "Physik",
        "semester": "01",
        "keywords": ["physik"],
        "exclude_kw": [],
        "url": "https://www.docsdocs.net/trainer/select/subject/01ec-5fda-ff46e926-8c00-d8b26caa32d5",
        "expected": 196,
    },
    "02_biochemie1": {
        "name": "Biochemie 1",
        "semester": "02",
        "keywords": ["biochemie"],
        "exclude_kw": [],
        "url": "https://www.docsdocs.net/trainer/select/subject/01ee-075f-c6a8bc46-af00-fa2b8a121d61",
        "expected": 335,
    },
    "02_physiologie1": {
        "name": "Physiologie 1",
        "semester": "02",
        "keywords": ["physiologie"],
        "exclude_kw": [],
        "url": "https://www.docsdocs.net/trainer/select/subject/01ee-075f-8ce12a3e-b200-5addfd41b874",
        "expected": 113,
    },
}

OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

# ─── TEXTBEREINIGUNG ─────────────────────────────────────────────────────────

_GREEK = [
    (r'\b[Aa]lpha\b', 'α'), (r'\b[Bb]eta\b', 'β'), (r'\b[Gg]amma\b', 'γ'),
    (r'\b[Dd]elta\b', 'δ'), (r'\b[Ee]psilon\b', 'ε'),
]

def fix_text(text: str) -> str:
    """Bereinigt Sonderzeichen und korrigiert häufige Formatierungsfehler."""
    if not text:
        return text
    text = text.replace('->', '→').replace('-->', '→')
    for pat, repl in _GREEK:
        text = re.sub(pat, repl, text)
    # Mikro vor Einheiten: ul, uL, ug, uG, umol, ukat, uM
    text = re.sub(r'\bu([lLgGkKmM])\b', r'μ\1', text)
    text = re.sub(r'\bu(mol|kat|Mol)\b', r'μ\1', text)
    # Mehrfache Leerzeichen normalisieren
    text = re.sub(r'[ \t]{2,}', ' ', text)
    return text.strip()


def clean_text(raw: str) -> str:
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = re.sub(r"[ \t]+", " ", raw)
    raw = re.sub(r"\n{3,}", "\n\n", raw)
    return fix_text(raw.strip())


def has_image(text: str) -> bool:
    return bool(re.search(r"\[Bild\]|\[Abbildung\]|Abb\.\s*\d", text, re.I))


def is_bad_text(text: str) -> bool:
    if not text or len(text.split()) < 3:
        return True
    ratio = sum(c.isalpha() for c in text) / max(len(text), 1)
    return ratio < 0.2


# ─── LOGGING ─────────────────────────────────────────────────────────────────

def log(msg: str, level: str = "INFO"):
    icons = {"INFO": "   ", "OK": "[+]", "SKIP": "[>]", "WARN": "[!]", "ERR": "[X]", "SAVE": "[S]"}
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"[{ts}] {icons.get(level, '   ')} {msg}", flush=True)


async def ss(page: Page, name: str, debug: bool):
    if debug:
        p = OUTPUT_DIR / f"dbg_{name}_{datetime.now().strftime('%H%M%S')}.png"
        await page.screenshot(path=str(p), full_page=True)
        log(f"Screenshot: {p.name}")


# ─── LOGIN ────────────────────────────────────────────────────────────────────

async def login(page: Page, username: str, password: str, debug: bool) -> bool:
    log("Login ...")
    await page.goto(BASE_URL, wait_until="domcontentloaded")
    await page.wait_for_timeout(1500)

    if "login" not in page.url.lower():
        for txt in ["Login", "Anmelden"]:
            try:
                lnk = await page.wait_for_selector(
                    f'a:has-text("{txt}"), button:has-text("{txt}")',
                    timeout=3000, state="visible")
                if lnk:
                    await lnk.click()
                    await page.wait_for_load_state("domcontentloaded")
                    await page.wait_for_timeout(800)
                    break
            except PWTimeout:
                continue

    for sel in ['input[type="text"]', 'input[name="username"]']:
        try:
            el = await page.wait_for_selector(sel, timeout=6000, state="visible")
            if el:
                await el.fill(username)
                break
        except PWTimeout:
            continue

    try:
        pw = await page.wait_for_selector('input[type="password"]', timeout=5000)
        await pw.fill(password)
    except PWTimeout:
        log("Passwort-Feld nicht gefunden", "ERR")
        return False

    url_before = page.url
    try:
        btn = await page.query_selector('button[type="submit"]') or \
              await page.query_selector('button:has-text("Login")')
        if btn:
            await btn.click()
        else:
            await pw.press("Enter")
    except Exception:
        await pw.press("Enter")

    try:
        await page.wait_for_url(lambda u: "login" not in u.lower() and u != url_before, timeout=20000)
    except PWTimeout:
        await page.wait_for_timeout(3000)

    success = "login" not in page.url.lower()
    log(f"Login {'OK' if success else 'FEHLGESCHLAGEN'} | {page.url}", "OK" if success else "ERR")
    return success


# ─── SESSION ERSTELLEN ────────────────────────────────────────────────────────

async def create_session_largest_klausur(page: Page, subject: dict, debug: bool) -> str | None:
    """
    Navigiert zur Subject-URL, wählt die GRÖSSTE Klausur aus, startet Abfrage.
    Mehrere Klausuren gleichzeitig auszuwählen blockiert docsdocs — wähle nur die größte.
    Gibt Training-URL zurück oder None wenn Manager-Lookup nötig.
    """
    await page.goto(subject["url"], wait_until="domcontentloaded")
    await page.wait_for_timeout(3000)
    await ss(page, f"subject_{subject['name']}", debug)

    checkboxes = await page.query_selector_all('input[type="checkbox"][value]')
    log(f"Gefundene Klausuren-Checkboxen: {len(checkboxes)}")

    if not checkboxes:
        log("Keine Checkboxen gefunden – direkt zu Manager", "WARN")
        return None

    # Größte Klausur nach Frageanzahl auswählen
    best_cb = None
    best_count = 0
    for cb in checkboxes:
        try:
            val = await cb.get_attribute("value") or ""
            if not val:
                continue
            try:
                parent = await cb.evaluate_handle("el => el.closest('label, div.px-4')")
                pt = await parent.inner_text()
                nums = re.findall(r"\d+", pt)
                count = int(nums[-1]) if nums else 0
                if count > best_count:
                    best_count = count
                    best_cb = cb
                    log(f"  Klausur: {pt.strip()[:50]} → {count} Fragen")
            except Exception:
                pass
        except Exception:
            pass

    if not best_cb and checkboxes:
        best_cb = checkboxes[0]

    if not best_cb:
        return None

    log(f"Wähle größte Klausur ({best_count} Fragen) aus", "OK")
    try:
        await best_cb.click()
        await page.wait_for_timeout(1000)  # Svelte-State aktualisieren lassen
    except Exception as e:
        log(f"Checkbox-Klick fehlgeschlagen: {e}", "WARN")

    # Abfrage starten – erst JavaScript, dann Playwright
    url_before = page.url
    clicked_text = await page.evaluate("""
        () => {
            const btns = [...document.querySelectorAll('button')];
            const candidates = btns.filter(b =>
                b.classList.contains('button-ddblue') ||
                (b.textContent || '').includes('Abfrage') ||
                (b.textContent || '').includes('tarten')
            );
            for (const btn of candidates) {
                if (!btn.disabled) {
                    btn.click();
                    return (btn.textContent || '').trim();
                }
            }
            return null;
        }
    """)
    log(f"Start-Button per JS geklickt: '{clicked_text}'", "OK" if clicked_text else "WARN")

    if not clicked_text:
        # Playwright-Fallback
        for sel in [".button-ddblue", 'button:has-text("Abfrage starten")', 'button:has-text("Starten")']:
            btn = await page.query_selector(sel)
            if btn:
                await btn.click(force=True)
                break

    # Polling auf URL-Änderung (bis 15s)
    for _ in range(30):
        await page.wait_for_timeout(500)
        url = page.url
        if url != url_before:
            if "/trainer/training/" in url:
                log(f"Direkt auf Training-URL: {url}", "OK")
                return url
            if "/trainer/manager" in url:
                log("Auf Manager gelandet – suche neue Session", "OK")
                # NICHT wegnavigieren – Session direkt im aktuellen Manager suchen
                await page.wait_for_timeout(1000)
                return await _find_session_on_current_manager(page, subject, debug)
            log(f"URL nach Start: {url}", "INFO")
            break

    await ss(page, f"after_start_{subject['name']}", debug)
    if "/trainer/training/" in page.url:
        return page.url
    return None


async def _find_session_on_current_manager(page: Page, subject: dict, debug: bool) -> str | None:
    """Sucht die Session im AKTUELL geöffneten Manager (nach Weiterleitung vom Start)."""
    keywords = subject["keywords"]
    exclude  = subject.get("exclude_kw", [])
    rows = await page.query_selector_all("div.cursor-pointer")
    for row in rows:
        try:
            t = (await row.inner_text()).strip().lower()
            if any(kw in t for kw in keywords) and not any(ex in t for ex in exclude):
                log(f"Neue Session im Manager: [{t[:60]}]", "OK")
                await row.click()
                return await _find_and_click_fortsetzen(page, subject, debug)
        except Exception:
            continue
    log("Keine neue Session im Manager gefunden", "WARN")
    return None


async def _find_and_click_fortsetzen(page: Page, subject: dict, debug: bool) -> str | None:
    """
    Nach dem Klick auf eine Manager-Reihe: sucht 'Fortsetzen' oder Training-Links.
    """
    # Warte länger auf Panel-Expansion
    await page.wait_for_timeout(2000)
    await ss(page, f"after_row_click_{subject['name']}", debug)

    # Methode 1: Fortsetzen-Button
    for sel in [
        'button:has-text("Fortsetzen")',
        'a:has-text("Fortsetzen")',
        '[class*="button"]:has-text("Fortsetzen")',
        'button:has-text("Weiter")',
        'button:has-text("Starten")',
    ]:
        try:
            el = await page.query_selector(sel)
            if el and await el.is_visible():
                log(f"Klicke '{await el.inner_text()}' ...", "OK")
                await el.click()
                await page.wait_for_timeout(3000)
                if "/trainer/training/" in page.url:
                    return page.url
                break
        except Exception:
            continue

    # Methode 2: Direkten Training-Link klicken
    links = await page.query_selector_all('a[href*="/trainer/training/"]')
    if links:
        href = await links[0].get_attribute("href") or ""
        if href:
            url = href if href.startswith("http") else f"https://www.docsdocs.net{href}"
            log(f"Training-Link gefunden: {url}", "OK")
            return url

    # Methode 3: URL direkt aus dem DOM extrahieren (Svelte state)
    try:
        url = await page.evaluate("""
            () => {
                const links = document.querySelectorAll('a[href]');
                for (const a of links) {
                    if (a.href.includes('/trainer/training/')) return a.href;
                }
                return null;
            }
        """)
        if url:
            return url
    except Exception:
        pass

    log("Kein Fortsetzen/Training-Link gefunden", "WARN")
    await ss(page, f"no_fortsetzen_{subject['name']}", True)
    return None


async def get_training_url_from_manager(page: Page, subject: dict, debug: bool) -> str | None:
    """Findet die Training-URL im Manager."""
    await page.goto(MANAGER_URL, wait_until="domcontentloaded")
    await page.wait_for_timeout(2000)
    await ss(page, f"manager_{subject['name']}", debug)

    rows = await page.query_selector_all("div.cursor-pointer")
    log(f"Manager: {len(rows)} Eintraege")

    keywords = subject["keywords"]
    exclude  = subject.get("exclude_kw", [])

    # Zeige alle Manager-Einträge zur Diagnose
    for i, row in enumerate(rows[:5]):
        try:
            t = (await row.inner_text()).strip().replace('\n', ' ')[:80]
            log(f"  [{i}] {t}", "INFO")
        except Exception:
            pass

    target_row = None
    for row in rows:
        try:
            t = (await row.inner_text()).strip().lower()
        except Exception:
            continue
        if any(kw in t for kw in keywords) and not any(ex in t for ex in exclude):
            target_row = row
            log(f"Session gefunden: [{t[:80]}]", "OK")
            break

    if not target_row:
        # Fallback: Nimm den ERSTEN Eintrag (könnte neu erstellt worden sein)
        if rows:
            log("Kein passender Eintrag – probiere ersten Eintrag", "WARN")
            try:
                t = (await rows[0].inner_text()).strip().lower()
                # Nur nehmen wenn kein anderes bekanntes Fach
                other_fach = [kw for kw in ["chemie", "physik", "biochemie", "physiologie"]
                              if kw not in keywords and kw not in exclude]
                if not any(o in t for o in other_fach):
                    target_row = rows[0]
                    log(f"Fallback-Session: [{t[:80]}]", "WARN")
            except Exception:
                pass

    if not target_row:
        log(f"Keine Session fuer '{subject['name']}' im Manager", "WARN")
        return None

    await target_row.click()
    training_url = await _find_and_click_fortsetzen(page, subject, debug)

    if not training_url:
        return None

    if not training_url.startswith("http"):
        training_url = f"https://www.docsdocs.net{training_url}"

    if "/trainer/training/" not in training_url:
        log(f"Ungueltige Training-URL: {training_url}", "WARN")
        return None

    log(f"Training URL: {training_url}", "OK")
    return training_url


# ─── FRAGE LESEN ─────────────────────────────────────────────────────────────

async def read_current_question(page: Page) -> dict | None:
    """
    Liest Frage + alle Antwortoptionen (4 oder 5) von der Trainer-Seite.
    Erkennt Bild-Fragen via <img>-Tags in der Frage.
    """
    await page.wait_for_timeout(400)

    try:
        await page.wait_for_selector('input[name="selectedMCSAnswer"]', timeout=8000)
    except PWTimeout:
        return None

    # Bild-Prüfung via DOM (img-Tags im Frage-Container)
    has_img = await page.evaluate("""
        () => {
            const qtEl = document.querySelector('.questiontext');
            if (qtEl && qtEl.querySelector('img')) return true;
            // Prüfe auch den umgebenden Container der Radios
            const firstRadio = document.querySelector('input[name="selectedMCSAnswer"]');
            if (!firstRadio) return false;
            let container = firstRadio.parentElement;
            for (let i = 0; i < 8; i++) {
                if (!container) break;
                if (container.querySelector('img')) return true;
                container = container.parentElement;
            }
            return false;
        }
    """)
    if has_img:
        log("Bild-Frage (img-Tag) uebersprungen", "SKIP")
        return {"skip": True, "reason": "image"}

    # Fragetext
    q_text = ""
    try:
        q_text = await page.evaluate("""
            () => {
                const qtEl = document.querySelector('.questiontext');
                if (qtEl) return (qtEl.textContent || '').trim().replace(/\\s+/g, ' ');

                const firstRadio = document.querySelector('input[name="selectedMCSAnswer"]');
                if (!firstRadio) return '';
                let container = firstRadio.parentElement;
                for (let i = 0; i < 5; i++) {
                    if (!container || !container.parentElement) break;
                    container = container.parentElement;
                }
                if (!container) return '';
                const els = container.querySelectorAll('span, p');
                let best = '';
                for (const el of els) {
                    if (el.querySelector('input[name="selectedMCSAnswer"]')) continue;
                    const t = (el.textContent || '').trim().replace(/\\s+/g, ' ');
                    if (t.length > best.length && t.split(' ').length >= 5) best = t;
                }
                return best;
            }
        """) or ""
        q_text = clean_text(q_text)
    except Exception:
        pass

    if not q_text or len(q_text.split()) < 4:
        try:
            q_text = await page.evaluate("""
                () => {
                    for (const sel of ['.questiontext', '[class*="question"]', 'h1, h2, h3, h4']) {
                        const el = document.querySelector(sel);
                        if (el) {
                            const t = (el.textContent || '').trim().replace(/\\s+/g, ' ');
                            if (t.split(' ').length >= 5) return t;
                        }
                    }
                    const allEls = document.querySelectorAll('p, h2, h3, h4, span');
                    let best = '';
                    for (const el of allEls) {
                        if (el.querySelector('input')) continue;
                        const t = (el.textContent || '').trim().replace(/\\s+/g, ' ');
                        if (t.length > best.length && t.split(' ').length >= 5 && t.length < 1000) {
                            best = t;
                        }
                    }
                    return best;
                }
            """) or ""
            q_text = clean_text(q_text)
        except Exception:
            pass

    if not q_text or len(q_text.split()) < 4:
        return None

    if has_image(q_text):
        log("Bild-Frage (Text-Marker) uebersprungen", "SKIP")
        return {"skip": True, "reason": "image"}

    # Optionen lesen – alle Radio-Buttons (4 oder 5)
    try:
        js_result = await page.evaluate("""
            () => {
                const radios = Array.from(document.querySelectorAll('input[name="selectedMCSAnswer"]'));
                return radios.map(radio => {
                    const rid = radio.id || radio.value || '';
                    const labels = Array.from(document.querySelectorAll('label[for="' + rid + '"]'));
                    let bestText = '';
                    for (const lbl of labels) {
                        const t = (lbl.textContent || '').trim().replace(/\\s+/g, ' ');
                        if (t.length > bestText.length && t.length > 2) bestText = t;
                    }
                    return { id: rid, text: bestText };
                });
            }
        """)
    except Exception:
        js_result = []

    if not js_result:
        return None

    options = []
    radio_ids = []
    for i, item in enumerate(js_result):
        radio_ids.append(item.get("id", ""))
        text = clean_text(item.get("text", ""))
        options.append(text if text else f"Option {i+1}")

    if len(options) < 2:
        return None

    return {
        "question": q_text,
        "options": options,
        "radio_ids": radio_ids,
        "correct_index": None,
    }


# ─── ANTWORT ERKENNEN ────────────────────────────────────────────────────────

async def detect_correct_answer(page: Page) -> int | None:
    """Erkennt die korrekte Antwort via ddblue-Klasse (funktioniert pre- und post-reveal)."""
    try:
        return await page.evaluate("""
            () => {
                const radios = Array.from(document.querySelectorAll('input[name="selectedMCSAnswer"]'));
                if (!radios.length) return null;

                // Methode 1: ddblue-Element enthält Radio-Button
                const blueEls = Array.from(document.querySelectorAll('[class*="ddblue"]'));
                for (const el of blueEls) {
                    for (let i = 0; i < radios.length; i++) {
                        if (el.contains(radios[i])) return i;
                    }
                }

                // Methode 2: Aufwärts von Radio traversieren
                for (let i = 0; i < radios.length; i++) {
                    let el = radios[i].parentElement;
                    let depth = 0;
                    while (el && depth < 12) {
                        const cls = el.getAttribute('class') || '';
                        if (cls.includes('ddblue')) return i;
                        el = el.parentElement;
                        depth++;
                    }
                }
                return null;
            }
        """)
    except Exception:
        return None


async def reveal_correct_answer(page: Page, q: dict, debug: bool) -> int | None:
    """
    Gibt die korrekte Antwort zurück.
    Strategie:
    1. Prüfen ob Antwort bereits sichtbar (vorab beantwortete Frage → sofort)
    2. Erste Option anklicken + Überprüfen klicken
    3. Polling bis zu 35s auf ddblue-Markierung warten
    """
    # Schritt 1: Bereits aufgedeckt?
    idx = await detect_correct_answer(page)
    if idx is not None and 0 <= idx < len(q.get("options", [])):
        log(f"  Bereits aufgedeckt: Option [{idx}] = {q['options'][idx][:50]}")
        return idx

    # Schritt 2: Erste Option anklicken
    try:
        radios = await page.query_selector_all('input[name="selectedMCSAnswer"]')
        if radios:
            await radios[0].click()
            await page.wait_for_timeout(200)
    except Exception:
        pass

    # Schritt 3: Überprüfen-Button klicken
    btn = await page.query_selector("button.button-ddblue")
    if not btn:
        for txt in ["Überprüfen", "Uberprufen", "Prüfen", "Check"]:
            btn = await page.query_selector(f'button:has-text("{txt}")')
            if btn:
                break
    if not btn:
        return None

    try:
        await btn.click(force=True, timeout=5000)
    except Exception:
        return None

    await ss(page, "after_check", debug)

    # Schritt 4: Polling bis zu 35s (Server-Latenz bei neuen Fragen)
    n_opts = len(q.get("options", []))
    for attempt in range(70):  # 70 × 500ms = 35s
        await page.wait_for_timeout(500)
        idx = await detect_correct_answer(page)
        if idx is not None and 0 <= idx < n_opts:
            log(f"  Richtig: Option [{idx}] = {q['options'][idx][:50]} (nach {(attempt+1)*0.5:.1f}s)")
            return idx

    log("  Korrekte Antwort nicht erkannt nach 35s", "WARN")
    return None


# ─── NAVIGATION ──────────────────────────────────────────────────────────────

async def get_question_counter(page: Page) -> tuple[int, int]:
    try:
        result = await page.evaluate("""
            () => {
                const inp = document.querySelector('input[type="number"].base-input');
                if (!inp) return [0, 0];
                return [parseInt(inp.value) || 0, parseInt(inp.max) || 0];
            }
        """)
        if result and len(result) == 2:
            return int(result[0]), int(result[1])
    except Exception:
        pass
    return 0, 0


async def jump_to_question(page: Page, n: int) -> bool:
    try:
        await page.evaluate(f"""
            () => {{
                const inp = document.querySelector('input[type="number"].base-input');
                if (!inp) return false;
                inp.value = '{n}';
                inp.dispatchEvent(new Event('input', {{bubbles: true}}));
                inp.dispatchEvent(new Event('change', {{bubbles: true}}));
                inp.dispatchEvent(new KeyboardEvent('keydown', {{key: 'Enter', bubbles: true}}));
            }}
        """)
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(1500)
        return True
    except Exception:
        return False


async def click_next(page: Page, old_counter: int = 0) -> bool:
    clicked = False
    for sel in [
        'button:has-text("Weiter")',
        'button:has-text("Nächste")',
        'button:has-text("Next")',
    ]:
        try:
            btn = await page.query_selector(sel)
            if btn and await btn.is_visible():
                await btn.click()
                clicked = True
                break
        except Exception:
            continue

    if not clicked:
        next_n = old_counter + 1 if old_counter > 0 else 2
        await jump_to_question(page, next_n)
        clicked = True

    # Warten bis Counter sich ändert
    for _ in range(40):
        await page.wait_for_timeout(200)
        new_c, _ = await get_question_counter(page)
        if new_c != old_counter and new_c > 0:
            break

    await page.wait_for_timeout(200)
    return clicked


# ─── FACH SCRAPEN ─────────────────────────────────────────────────────────────

async def scrape_subject(
    page: Page,
    subject_key: str,
    subject: dict,
    debug: bool,
    only_fach: str | None,
) -> dict:

    if only_fach and only_fach.lower() not in subject["name"].lower():
        return {}

    sep = "=" * 58
    log(f"\n{sep}")
    log(f"Starte: {subject['name']} (Semester {subject['semester']})")
    log(f"Erwartet: {subject['expected']} Fragen")
    log(sep)

    # Schritt 1: Neue Session mit der größten Klausur erstellen
    log("Erstelle Session mit größter Klausur ...")
    training_url = await create_session_largest_klausur(page, subject, debug)

    # Schritt 2: Falls nicht direkt auf Training-URL, über Manager holen
    if not training_url:
        log("Suche Session im Manager ...")
        training_url = await get_training_url_from_manager(page, subject, debug)

    if not training_url:
        log(f"Training-URL nicht gefunden fuer '{subject['name']}'", "ERR")
        return {}

    # Schritt 3: Zur Training-Seite navigieren, zu Frage 1 springen
    await page.goto(training_url, wait_until="domcontentloaded")
    await page.wait_for_timeout(2000)
    log(f"Training-URL: {training_url}")

    c0, t0 = await get_question_counter(page)
    log(f"Session: {c0}/{t0} Fragen")
    if c0 != 1 or t0 == 0:
        log("Springe zu Frage 1 ...")
        await jump_to_question(page, 1)
        await page.wait_for_timeout(1000)

    all_questions: list[dict] = []
    stats = {"skipped_images": 0, "skipped_unclear": 0, "skipped_no_answer": 0, "duplicates": 0}
    seen: set[str] = set()
    consecutive_failures = 0
    consecutive_skips    = 0  # Zählt aufeinanderfolgende Skips (Bild/Duplikate) ohne neue Frage
    max_counter_seen     = 0

    while consecutive_failures < 8 and consecutive_skips < 20:
        current, total = await get_question_counter(page)

        if current > max_counter_seen:
            max_counter_seen = current

        # Reguläres Ende: Counter über Maximum
        if total > 0 and current > total and len(all_questions) > 0:
            log(f"Alle {total} Fragen abgearbeitet", "OK")
            break

        # Schleifenende: Counter springt zurück nach dem Ende
        if total > 0 and max_counter_seen >= total and current < max_counter_seen - 3:
            log(f"Session vollständig – Counter zurückgesprungen ({max_counter_seen}→{current})", "OK")
            break

        # Schleifenende: 0/0 nach normalem Verlauf (Session abgelaufen)
        if total == 0 and current == 0 and max_counter_seen > 5 and len(all_questions) > 0:
            log("Session abgeschlossen (Counter 0/0)", "OK")
            break

        log(f"Frage {current}/{total} | Gesammelt: {len(all_questions)}")

        q = await read_current_question(page)

        if q is None:
            log("Keine Frage erkannt", "WARN")
            await ss(page, f"no_q_{current}", True)
            consecutive_failures += 1
            consecutive_skips    += 1
            if not await click_next(page, current):
                break
            continue

        if q.get("skip"):
            reason = q.get("reason", "unclear")
            stats[f"skipped_{reason}s"] = stats.get(f"skipped_{reason}s", 0) + 1
            consecutive_skips += 1
            await click_next(page, current)
            continue

        q_key = q["question"].lower().strip()
        if q_key in seen:
            log("Duplikat – ueberspringe", "SKIP")
            stats["duplicates"] += 1
            consecutive_failures += 1
            consecutive_skips    += 1
            if not await click_next(page, current):
                break
            continue

        # Neue, gültige Frage → Skips zurücksetzen
        consecutive_skips = 0
        seen.add(q_key)

        correct_idx = await reveal_correct_answer(page, q, debug)

        if correct_idx is None:
            stats["skipped_no_answer"] += 1
            log(f"Korrekte Antwort unbekannt: {q['question'][:60]}", "SKIP")
            consecutive_failures += 1
        else:
            entry = {
                "id": f"{subject_key}_{len(all_questions)+1}",
                "question": q["question"],
                "options": q["options"],
                "correct_index": correct_idx,
                "correct_answer": q["options"][correct_idx] if correct_idx < len(q["options"]) else "",
            }
            all_questions.append(entry)
            consecutive_failures = 0
            log(f"#{len(all_questions):>3} OK | {q['question'][:65]}", "OK")
            log(f"       [{correct_idx}] {q['options'][correct_idx][:55]}")

        if not await click_next(page, current):
            log("Kein Weiter-Button – Ende", "WARN")
            consecutive_failures += 1

    log(f"\nFertig: {len(all_questions)} Fragen | "
        f"Bilder: {stats.get('skipped_images', 0)} | "
        f"Duplikate: {stats['duplicates']} | "
        f"Kein Ergebnis: {stats['skipped_no_answer']}")

    return {
        "meta": {
            "fach": subject["name"],
            "semester": subject["semester"],
            "scraped_at": datetime.now().isoformat(),
            "total": len(all_questions),
            "expected": subject["expected"],
            "skipped": stats,
        },
        "questions": all_questions,
    }


# ─── SPEICHERN ────────────────────────────────────────────────────────────────

def save_json(subject_key: str, data: dict):
    if not data or not data.get("questions"):
        log(f"Nichts zu speichern fuer {subject_key}", "WARN")
        return
    ts = datetime.now().strftime("%Y%m%d_%H%M")
    for path in [
        OUTPUT_DIR / f"{subject_key}_{ts}.json",
        OUTPUT_DIR / f"{subject_key}.json",
    ]:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    log(f"Gespeichert: {subject_key}.json ({data['meta']['total']} Fragen)", "SAVE")


# ─── HAUPT ────────────────────────────────────────────────────────────────────

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--debug",    action="store_true")
    parser.add_argument("--fach",     type=str, default=None)
    parser.add_argument("--email",    type=str, default=None)
    parser.add_argument("--passwort", type=str, default=None)
    args = parser.parse_args()

    print("\n" + "=" * 60)
    print("  docsdocs.net Quiz-Scraper v5")
    print("=" * 60 + "\n")

    username = args.email    or input("Benutzername: ").strip()
    password = args.passwort or getpass("Passwort:     ")
    print()

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(channel="msedge",
                                               headless=not args.debug,
                                               args=["--no-sandbox"])
            log("Browser: Microsoft Edge", "OK")
        except Exception:
            browser = await p.chromium.launch(headless=not args.debug,
                                               args=["--no-sandbox"])
            log("Browser: Chromium", "OK")

        ctx: BrowserContext = await browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent=("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                        "AppleWebKit/537.36 (KHTML, like Gecko) "
                        "Chrome/124.0.0.0 Safari/537.36"),
            locale="de-DE",
        )
        page: Page = await ctx.new_page()

        if not await login(page, username, password, args.debug):
            log("Login fehlgeschlagen – Abbruch", "ERR")
            await browser.close()
            return

        total = 0
        for key, subject in SUBJECTS.items():
            try:
                data = await scrape_subject(page, key, subject, args.debug, args.fach)
                if data and data.get("questions"):
                    save_json(key, data)
                    total += data["meta"]["total"]
            except Exception as e:
                log(f"Fehler bei {subject['name']}: {e}", "ERR")
                traceback.print_exc()
                await ss(page, f"error_{key}", True)

        await browser.close()

    print("\n" + "=" * 60)
    log(f"Fertig! {total} Fragen gesamt in: {OUTPUT_DIR.resolve()}", "OK")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
