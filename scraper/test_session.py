"""Test: click session row on manager page to find quiz URL."""
import asyncio, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")
from playwright.async_api import async_playwright
from pathlib import Path

OUTPUT = Path(__file__).parent / "output"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=False, args=["--no-sandbox"])
        ctx = await browser.new_context(viewport={"width": 1280, "height": 900}, locale="de-DE")
        page = await ctx.new_page()

        # Login
        await page.goto("https://docsdocs.net", wait_until="domcontentloaded")
        await page.wait_for_timeout(1500)
        try:
            link = await page.wait_for_selector('a:has-text("Login")', timeout=3000)
            await link.click()
            await page.wait_for_timeout(1000)
        except Exception:
            pass
        await page.fill('input[type="text"]', "Hossboss1")
        await page.fill('input[type="password"]', "Alinnigga1")
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(3000)
        print(f"Logged in: {page.url}")

        # Go to manager
        await page.goto("https://www.docsdocs.net/trainer/manager", wait_until="domcontentloaded")
        await page.wait_for_timeout(2000)
        print(f"Manager URL: {page.url}")

        # Find session rows (cursor-pointer DIVS in the table area)
        rows = await page.query_selector_all("div.cursor-pointer")
        print(f"div.cursor-pointer rows: {len(rows)}")
        for i, row in enumerate(rows[:8]):
            try:
                t = (await row.inner_text()).strip().replace("\n", " ")[:100]
                print(f"  Row {i}: [{t}]")
            except Exception as e:
                print(f"  Row {i}: ERROR {e}")

        if not rows:
            print("No rows found!")
            await page.screenshot(path=str(OUTPUT / "dbg_no_rows.png"), full_page=True)
            await browser.close()
            return

        # Click first Chemie row
        chemie_row = None
        for row in rows:
            try:
                t = await row.inner_text()
            except Exception:
                continue
            if "Chemie" in t:
                chemie_row = row
                break

        if not chemie_row:
            print("No Chemie row – clicking first row")
            chemie_row = rows[0]

        print(f"\nClicking Chemie row...")
        await chemie_row.click()
        await page.wait_for_timeout(1500)
        print(f"URL after row click: {page.url}")

        # Context-Menü sollte erschienen sein – "Fortsetzen" klicken
        fortsetzen = None
        for sel in ['button:has-text("Fortsetzen")', 'a:has-text("Fortsetzen")']:
            try:
                fortsetzen = await page.query_selector(sel)
                if fortsetzen:
                    break
            except Exception:
                pass

        if fortsetzen:
            print("Clicking 'Fortsetzen'...")
            url_before = page.url
            await fortsetzen.click()
            await page.wait_for_timeout(4000)
            print(f"URL after Fortsetzen: {page.url}")
        else:
            print("'Fortsetzen' button not found!")

        print(f"\nURL: {page.url}")

        # Radio buttons lesen
        radios = await page.query_selector_all('input[name="selectedMCSAnswer"]')
        print(f"Radio buttons: {len(radios)}")
        for i, r in enumerate(radios):
            val = await r.get_attribute("value") or ""
            rid = await r.get_attribute("id") or val
            # Label text
            lbl = await page.query_selector(f'label[for="{rid}"]')
            lbl_text = (await lbl.inner_text()).strip() if lbl else ""
            print(f"  [{i}] id={rid[:30]} label={lbl_text[:60]}")

        # Frage-Text
        q_els = await page.query_selector_all(".leading-snug, .text-base, h2, h3, p")
        for el in q_els[:5]:
            t = (await el.inner_text()).strip()
            if len(t) > 10:
                print(f"  Q? [{t[:100]}]")

        # Erste Option klicken
        if radios:
            print("\nKlicke erste Option...")
            await radios[0].click()
            await page.wait_for_timeout(500)

        # "Überprüfen" klicken
        ueberpruef = await page.query_selector("button.button-ddblue")
        if ueberpruef:
            print("Klicke 'Überprüfen'...")
            await ueberpruef.click()
            await page.wait_for_timeout(2000)

        await page.screenshot(path=str(OUTPUT / "dbg_after_ueberpruef.png"), full_page=True)
        content = await page.content()
        (OUTPUT / "html_after_ueberpruef.html").write_text(content, encoding="utf-8")

        # CSS-Klassen auf Optionen nach Überprüfen prüfen
        print("\nOption classes after Überprüfen:")
        radios2 = await page.query_selector_all('input[name="selectedMCSAnswer"]')
        for i, r in enumerate(radios2):
            rid = await r.get_attribute("id") or ""
            cls_r = (await r.get_attribute("class")) or ""
            parent = await r.evaluate_handle("el => el.closest('div, label, li')")
            par_cls = ""
            try:
                par_cls = await parent.get_attribute("class") or ""
            except Exception:
                pass
            lbl = await page.query_selector(f'label[for="{rid}"]')
            lbl_cls = (await lbl.get_attribute("class")) or "" if lbl else ""
            lbl_text = (await lbl.inner_text()).strip()[:40] if lbl else ""
            print(f"  [{i}] r_cls={cls_r[:40]} par_cls={par_cls[:60]} lbl_cls={lbl_cls[:50]} | {lbl_text}")

        # Navigation → suchen
        print("\nNavigation buttons:")
        btns = await page.query_selector_all("button")
        for btn in btns:
            t = (await btn.inner_text()).strip()
            c = await btn.get_attribute("class") or ""
            typ = await btn.get_attribute("type") or ""
            if t or "arrow" in c.lower() or "nav" in c.lower():
                print(f"  [{t[:40]}] type={typ} class={c[:60]}")

        # SVG buttons (arrow buttons are often just SVG)
        svg_btns = await page.query_selector_all("button svg, a svg")
        print(f"SVG in buttons/links: {len(svg_btns)}")

        await browser.close()

asyncio.run(main())
