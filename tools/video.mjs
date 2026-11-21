// Rendert de motion-graphic video's (9:16, 1080x1920, 30 fps, zonder geluid) naar social-media/videos/*.mp4
// Gebruik: node tools/video.mjs [m1|m2|m3]   (vereist ffmpeg in PATH)
import { loadPlaywright } from "./browser.mjs";
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { scenes } from "./scenes.mjs";

const sm = join(dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv[2];
const FPS = 30;

function sprite() {
  const ill = readFileSync(join(sm, "assets/illustraties.svg"), "utf8").trim();
  const icons = ["phone", "map-pin", "shopping-bag", "credit-card", "banknote"]
    .map((n) => {
      const svg = readFileSync(join(sm, "assets/icons", `${n}.svg`), "utf8");
      const inner = svg.replace(/<!--[\s\S]*?-->/g, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
      return `<symbol id="i-${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
    })
    .join("");
  return `<svg class="sprite" aria-hidden="true">${icons}${ill}</svg>`;
}

const HELPERS = `
const E = (x) => 1 - Math.pow(1 - x, 3);
const P = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const BACK = (x) => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const $ = (id) => document.getElementById(id);
function show(el, a, b, dy = 50) { const k = E(P(window.__t, a, b)); el.style.opacity = k; el.style.transform = 'translateY(' + ((1 - k) * dy) + 'px)'; }
function pop(el, a, b, rot = 0) { const k = BACK(P(window.__t, a, b)); el.style.opacity = P(window.__t, a, a + 0.12); el.style.transform = 'scale(' + k + ') rotate(' + rot + 'deg)'; }
`;

const rays = (r1, r2, n, sw) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    d += `M${(r1 * Math.cos(a)).toFixed(1)} ${(r1 * Math.sin(a)).toFixed(1)}L${(r2 * Math.cos(a)).toFixed(1)} ${(r2 * Math.sin(a)).toFixed(1)}`;
  }
  return `<path d="${d}" stroke="var(--ink)" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;
};

const SPRITE = sprite();
const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
mkdirSync(join(sm, "videos/bron"), { recursive: true });

for (const [key, sc] of Object.entries(scenes)) {
  if (only && only !== key) continue;
  const htmlPath = join(sm, "videos/bron", `${sc.file}.html`);
  writeFileSync(
    htmlPath,
    `<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>${sc.file}</title><link rel="stylesheet" href="../../assets/brand.css"></head><body class="f-story">${SPRITE}<div class="post f-story" style="background:var(--paper)">${sc.html}</div><script>${HELPERS}window.render = (tt) => { window.__t = tt; ${sc.render} };window.render(0);</script></body></html>`
  );
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  const out = join(sm, "videos", `${sc.file}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-vf", "scale=in_range=full:out_range=limited:flags=lanczos,format=yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-profile:v", "high", "-r", String(FPS), "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => { ff.on("close", (c) => (c === 0 ? res() : rej(new Error("ffmpeg " + c)))); });
  const frames = Math.round(sc.dur * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f === Math.round(frames * 0.55)) await page.screenshot({ path: join(sm, "videos/bron", `${sc.file}-still.png`) });
  }
  ff.stdin.end();
  await done;
  await page.close();
  console.log(`${sc.file}.mp4 (${(statSync(out).size / 1024 / 1024).toFixed(1)} MB, ${sc.dur}s)`);
}
await browser.close();
