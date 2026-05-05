"""
OG-Image-Generator für sfd-vcds.vercel.app
1200×630 PNG mit 3D-Wireframe-Geometrie, brand-konform (vcds.de #2C3F69)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os
import subprocess

W, H = 1200, 630

# Brand colors (vcds.de CI)
INK_DARK = (30, 45, 77)        # var(--accent-ink) #1E2D4D
ACCENT = (44, 63, 105)         # var(--accent) #2C3F69
ACCENT_2 = (61, 85, 137)       # var(--accent-2) #3D5589
ACCENT_LIGHT = (138, 158, 200) # lighter blue for wireframe
ACCENT_RED = (227, 48, 56)     # CTA-Rot, akzent für BETA
WHITE = (255, 255, 255)
WHITE_DIM = (220, 226, 240)

# ----- Background: vertical gradient -----
img = Image.new("RGB", (W, H), INK_DARK)
draw = ImageDraw.Draw(img, "RGBA")

for y in range(H):
    t = y / H
    r = int(INK_DARK[0] + (ACCENT[0] - INK_DARK[0]) * t)
    g = int(INK_DARK[1] + (ACCENT[1] - INK_DARK[1]) * t)
    b = int(INK_DARK[2] + (ACCENT[2] - INK_DARK[2]) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# ----- 3D Icosahedron wireframe (left half, suggests Three.js) -----
# 12 vertices of icosahedron
phi = (1 + math.sqrt(5)) / 2
verts = [
    (-1,  phi, 0), ( 1,  phi, 0), (-1, -phi, 0), ( 1, -phi, 0),
    ( 0, -1,  phi), ( 0,  1,  phi), ( 0, -1, -phi), ( 0,  1, -phi),
    ( phi, 0, -1), ( phi, 0,  1), (-phi, 0, -1), (-phi, 0,  1),
]
# 30 edges
edges = [
    (0,1),(0,5),(0,7),(0,10),(0,11),
    (1,5),(1,7),(1,8),(1,9),
    (2,3),(2,4),(2,6),(2,10),(2,11),
    (3,4),(3,6),(3,8),(3,9),
    (4,5),(4,9),(4,11),
    (5,9),(5,11),
    (6,7),(6,8),(6,10),
    (7,8),(7,10),
    (8,9),(10,11),
]

# rotate around Y and X
ay, ax = 0.7, 0.4
def rot(p):
    x, y, z = p
    # Y rotation
    x2 = x * math.cos(ay) + z * math.sin(ay)
    z2 = -x * math.sin(ay) + z * math.cos(ay)
    # X rotation
    y2 = y * math.cos(ax) - z2 * math.sin(ax)
    z3 = y * math.sin(ax) + z2 * math.cos(ax)
    return (x2, y2, z3)

rotated = [rot(v) for v in verts]

# project
cx, cy = 280, H // 2 + 10
scale = 175
projected = []
for v in rotated:
    px = cx + v[0] * scale
    py = cy + v[1] * scale
    depth = v[2]  # -2 to 2 roughly
    projected.append((px, py, depth))

# normalize depth 0..1
zs = [p[2] for p in projected]
zmin, zmax = min(zs), max(zs)

# subtle outer glow halo
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(280, 60, -10):
    a = int(2 + (r - 60) / 220 * 8)
    gdraw.ellipse([cx - r, cy - r, cx + r, cy + r],
                  fill=(61, 85, 137, a))
glow = glow.filter(ImageFilter.GaussianBlur(radius=20))
img.paste(glow, (0, 0), glow)
draw = ImageDraw.Draw(img, "RGBA")

# draw edges with depth-based opacity
for i, j in edges:
    p1 = projected[i]
    p2 = projected[j]
    avgz = (p1[2] + p2[2]) / 2
    t = (avgz - zmin) / (zmax - zmin) if zmax > zmin else 0.5
    # back edges: low alpha; front: high alpha
    alpha = int(50 + t * 180)
    width = 1 if t < 0.5 else 2
    color = (
        int(ACCENT_2[0] + (ACCENT_LIGHT[0] - ACCENT_2[0]) * t),
        int(ACCENT_2[1] + (ACCENT_LIGHT[1] - ACCENT_2[1]) * t),
        int(ACCENT_2[2] + (ACCENT_LIGHT[2] - ACCENT_2[2]) * t),
        alpha,
    )
    draw.line([(p1[0], p1[1]), (p2[0], p2[1])], fill=color, width=width)

# draw vertices
for p in projected:
    t = (p[2] - zmin) / (zmax - zmin) if zmax > zmin else 0.5
    size = int(4 + t * 5)
    alpha = int(150 + t * 105)
    draw.ellipse([p[0] - size, p[1] - size, p[0] + size, p[1] + size],
                 fill=(255, 255, 255, alpha))

# ----- Fonts -----
def load_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

f_eyebrow = load_font(20, bold=True)
f_h1 = load_font(58, bold=True)
f_h1_lg = load_font(78, bold=True)
f_sub = load_font(26)
f_brands = load_font(18, bold=True)
f_badge = load_font(22, bold=True)
f_logo = load_font(32, bold=True)

# ----- Right column content -----
TX = 540  # text-left

# Top eyebrow with dot
draw.ellipse([TX, 87, TX + 9, 96], fill=ACCENT_RED)
draw.text((TX + 18, 80), "VCDS.DE  ·  ONLINE-SFD",
          font=f_eyebrow, fill=WHITE_DIM)

# Main headline
draw.text((TX, 130), "VAG-Steuergeräte", font=f_h1, fill=WHITE)
draw.text((TX, 200), "online freischalten.", font=f_h1, fill=WHITE)

# Sub-text
draw.text((TX, 295),
          "SFD-geschützte Steuergeräte direkt",
          font=f_sub, fill=WHITE_DIM)
draw.text((TX, 328),
          "aus der Werkstatt entsperren.",
          font=f_sub, fill=WHITE_DIM)

# BETA badge (red pill, top-right area)
badge_text = "PUBLIC BETA · MAI 2026"
bbox = draw.textbbox((0, 0), badge_text, font=f_badge)
bw = bbox[2] - bbox[0]
bh = bbox[3] - bbox[1]
bx, by = TX, 395
pad_x, pad_y = 18, 11
draw.rounded_rectangle(
    [bx, by, bx + bw + pad_x * 2, by + bh + pad_y * 2 + 4],
    radius=6, fill=ACCENT_RED
)
draw.text((bx + pad_x, by + pad_y - 2), badge_text,
          font=f_badge, fill=WHITE)

# Service-Keywords-row (mono separator)
draw.text((TX, 480),
          "Service  ·  Coding  ·  Diagnose  ·  Adaptation",
          font=f_brands, fill=WHITE_DIM)

# Brands row at bottom
brands_text = "VW  ·  AUDI  ·  ŠKODA  ·  SEAT  ·  CUPRA  ·  BENTLEY  ·  MAN"
draw.text((TX, 525), brands_text, font=f_brands, fill=ACCENT_LIGHT)

# ----- Bottom rule + URL -----
draw.line([(60, 580), (W - 60, 580)], fill=(61, 85, 137, 120), width=1)
draw.text((60, 593), "sfd-vcds.vercel.app",
          font=f_brands, fill=WHITE_DIM)
# right-aligned auto-intern footer
right_text = "Auto-Intern GmbH  ·  Bochum"
rb = draw.textbbox((0, 0), right_text, font=f_brands)
rw = rb[2] - rb[0]
draw.text((W - 60 - rw, 593), right_text, font=f_brands, fill=ACCENT_LIGHT)

out = "/home/claude/sfd-vcds/og-image.png"
img.save(out, "PNG", optimize=True)
print(f"✓ Saved {out} ({W}×{H})")

# Optimize size
size_kb = os.path.getsize(out) / 1024
print(f"  Filesize: {size_kb:.1f} KB")
