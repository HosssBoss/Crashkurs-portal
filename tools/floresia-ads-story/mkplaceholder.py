from PIL import Image, ImageDraw
import sys, math

def scene(w, h, path, mood):
    img = Image.new("RGB", (w, h)); d = ImageDraw.Draw(img)
    top, bot = mood
    for y in range(h):  # sky -> ground gradient
        t = y / h
        d.line([(0, y), (w, y)], fill=tuple(int(top[i] + (bot[i]-top[i])*t) for i in range(3)))
    gy = int(h*0.72)
    d.rectangle([0, gy, w, h], fill=(96, 96, 102))           # pavement
    for i in range(0, w, 120):
        d.line([(i, gy), (i-90, h)], fill=(112, 112, 118), width=3)
    # building band behind
    d.rectangle([0, int(h*0.34), w, gy], fill=(150, 148, 146))
    for x in range(60, w, 180):
        d.rectangle([x, int(h*0.40), x+110, int(h*0.56)], fill=(178, 190, 198))
    # the machine (centre-right, leaves the left free for the headline)
    mx, mw = int(w*0.44), int(w*0.40)
    my, mh = int(h*0.34), int(gy - h*0.34)
    d.rounded_rectangle([mx, my, mx+mw, my+mh], radius=26, fill=(248, 248, 250), outline=(210, 210, 214), width=4)
    d.rounded_rectangle([mx+18, my+96, mx+mw-18, my+int(mh*0.62)], radius=14, fill=(226, 238, 236))
    for r in range(3):                                        # flower rows behind glass
        for c in range(4):
            cx = mx+52+c*(mw-104)//3; cy = my+150+r*int(mh*0.135)
            d.ellipse([cx-22, cy-22, cx+22, cy+22], fill=(232, 96, 158))
            d.line([(cx, cy+20), (cx, cy+62)], fill=(72, 132, 84), width=7)
    d.rounded_rectangle([mx+22, my+22, mx+mw-22, my+80], radius=12, fill=(236, 91, 160))  # canopy w/ logo
    d.text((mx+int(mw*0.30), my+42), "FLORESIA", fill=(255, 255, 255))
    d.rounded_rectangle([mx+int(mw*0.62), my+int(mh*0.66), mx+mw-30, my+int(mh*0.80)], radius=10, fill=(38, 40, 48))
    img.save(path); print("wrote", path, img.size)

MOOD = {"day": ((150,186,220),(206,206,200)), "dusk": ((92,104,150),(180,150,140))}
for fmt, (w, h) in {"post": (1080,1350), "story": (1080,1920)}.items():
    for name, m in MOOD.items():
        scene(w, h, f"photos/placeholder_{name}_{fmt}.png", m)
