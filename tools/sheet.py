# Contactblad voor beoordeling: python tools/social-sheet.py <map-glob> <uit.jpg> [kolommen] [breedte]
import sys, glob
from PIL import Image
files = sorted(sum([glob.glob(g, recursive=True) for g in sys.argv[1].split(',')], []))
out = sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5; W = int(sys.argv[4]) if len(sys.argv) > 4 else 360
ims = []
for f in files:
    im = Image.open(f).convert('RGB'); r = W / im.width; ims.append(im.resize((W, int(im.height * r))))
rows = (len(ims) + cols - 1) // cols
H = max(i.height for i in ims)
sheet = Image.new('RGB', (cols * (W + 10) + 10, rows * (H + 10) + 10), (200, 200, 200))
for i, im in enumerate(ims):
    sheet.paste(im, (10 + (i % cols) * (W + 10), 10 + (i // cols) * (H + 10)))
sheet.save(out, quality=82); print(len(ims), sheet.size)
