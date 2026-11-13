// Rendert de motion-graphic video's (9:16, 1080x1920, 30 fps, zonder geluid) naar social-media/videos/*.mp4
// Gebruik: node tools/video.mjs [m1|m2|m3]   (vereist ffmpeg in PATH)
import { loadPlaywright } from "./browser.mjs";
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

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

const scenes = {
  m1: {
    file: "M1-de-zon-gaat-op",
    dur: 9,
    html: `
<div id="sky" class="abs" style="inset:0"></div>
<div class="abs" style="left:0;right:0;top:1180px;bottom:0;background:var(--night)"></div>
<div id="brand" class="abs" style="left:84px;top:110px;display:flex;align-items:center;gap:16px;font-size:40px;font-weight:800"><svg style="width:64px;height:64px;color:var(--ember)"><use href="#ill-zon"/></svg>De Zon</div>
<svg class="abs" viewBox="0 0 1080 1920" style="left:0;top:0;width:1080px;height:1920px">
  <defs><clipPath id="clip"><rect x="0" y="0" width="1080" height="1180"/></clipPath></defs>
  <path id="arc" d="M160 1180A380 380 0 0 1 920 1180" fill="none" stroke="var(--ink)" stroke-width="5" stroke-dasharray="0.1 18" stroke-linecap="round"/>
  <g clip-path="url(#clip)"><g id="sun"><circle r="92" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="8"/>${rays(124, 168, 12, 8)}</g></g>
  <line x1="40" y1="1180" x2="1040" y2="1180" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
</svg>
<div id="l1" class="abs lead" style="left:84px;top:230px;font-size:56px;font-weight:700">Dinsdag t/m zondag</div>
<h1 id="h1" class="abs h1" style="left:84px;top:310px;font-size:140px">De&nbsp;Zon<br>gaat op.</h1>
<div id="c1" class="abs" style="left:84px;top:1250px"><span class="chip sun">Vanaf 12:30 uur</span></div>
<div id="c2" class="abs lead" style="left:84px;top:1380px;color:var(--night-ink);font-size:58px">Noordeinde 12, Zwartewaal</div>
<div id="c3" class="abs" style="left:84px;top:1470px"><span class="chip ember" style="background:var(--ember-bright);border-color:var(--ember-bright);color:var(--ink)"><svg class="icon"><use href="#i-phone"/></svg>Bel 0181 66 36 69</span></div>`,
    render: `
const t = window.__t;
const k = E(P(t, 0.3, 1.8));
$('sky').style.background = 'color-mix(in oklch, var(--sun) ' + (k * 100) + '%, var(--night))';
$('arc').style.opacity = k; $('brand').style.opacity = k; $('brand').style.color = 'var(--ink)';
const p = 0.5 * E(P(t, 0.3, 6.6));
const x = 540 - 380 * Math.cos(Math.PI * p), y = 1180 - 380 * Math.sin(Math.PI * p);
$('sun').setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + (t * 14) + ')');
show($('l1'), 1.7, 2.3); show($('h1'), 2.2, 3.0, 70);
show($('c1'), 3.6, 4.2); show($('c2'), 5.0, 5.7); pop($('c3'), 6.6, 7.2);
`,
  },
  m2: {
    file: "M2-zin-in-categorieen",
    dur: 9,
    html: (() => {
      const cats = [
        ["Frites", "frites", "var(--sun)", "var(--ink)", 0],
        ["Hamburgers", "hamburger", "var(--ember)", "var(--paper)", 1],
        ["Snacks", "snack", "var(--night)", "var(--night-ink)", 2],
        ["Vegetarisch", "blad", "var(--paper-2)", "var(--ink)", 3],
        ["IJs", "ijs", "var(--sun)", "var(--ink)", 4],
        ["Dranken", "beker", "var(--ember)", "var(--paper)", 5],
      ];
      return (
        cats
          .map(
            ([w, ill, bg, fg, i]) => `
<div id="L${i}" class="abs" style="inset:0;background:${bg};color:${fg};clip-path:inset(0 100% 0 0)">
  <div class="abs" style="left:84px;top:330px;font-size:60px;font-weight:700">Zin in</div>
  <h1 class="abs h1" style="left:84px;top:410px;font-size:${w.length > 9 ? 150 : 200}px">${w}</h1>
  <div id="I${i}" class="abs" style="left:230px;top:900px;width:640px;height:640px">${`<svg class="ill"><use href="#ill-${ill}"/></svg>`}</div>
</div>`
          )
          .join("") +
        `
<div id="end" class="abs" style="inset:0;background:var(--sun);color:var(--ink);clip-path:inset(0 100% 0 0)">
  <svg id="endsun" class="abs" style="left:340px;top:330px;width:400px;height:400px;color:var(--ember-bright)"><use href="#ill-zon"/></svg>
  <div id="e1" class="abs h1" style="left:0;right:0;top:800px;text-align:center;font-size:100px">Haal af bij<br>De&nbsp;Zon.</div>
  <div id="e2" class="abs" style="left:0;right:0;top:1090px;text-align:center"><span class="chip ink"><svg class="icon"><use href="#i-phone"/></svg>Bel 0181 66 36 69</span></div>
  <div id="e3" class="abs lead" style="left:0;right:0;top:1250px;text-align:center;font-size:48px">Noordeinde 12, Zwartewaal</div>
</div>`
      );
    })(),
    render: `
const t = window.__t, step = 1.1;
for (let i = 0; i < 6; i++) {
  const a = i * step;
  const k = E(P(t, a, a + 0.35));
  $('L' + i).style.clipPath = 'inset(0 ' + ((1 - k) * 100) + '% 0 0)';
  const ik = BACK(P(t, a + 0.15, a + 0.7));
  $('I' + i).style.transform = 'scale(' + ik + ') rotate(' + ((1 - ik) * -20 + (i % 2 ? 6 : -6)) + 'deg)';
}
const e = E(P(t, 6.6, 7.0));
$('end').style.clipPath = 'inset(0 ' + ((1 - e) * 100) + '% 0 0)';
$('endsun').style.transform = 'rotate(' + (t * 30) + 'deg)';
show($('e1'), 7.0, 7.6, 60); pop($('e2'), 7.6, 8.2); show($('e3'), 8.1, 8.7, 30);
`,
  },
  m3: {
    file: "M3-afhalen-in-3-stappen",
    dur: 10,
    html: `
<div class="abs" style="inset:0;background:var(--paper)"></div>
<h1 id="title" class="abs h1" style="left:84px;top:260px;font-size:120px">Afhalen bij<br>De&nbsp;Zon.</h1>
${[
  ["1", "Kies", "frites"],
  ["2", "Bel", null],
  ["3", "Haal af", null],
]
  .map(
    ([n, w, ill], i) => `
<div id="s${i}" class="abs" style="left:84px;right:84px;top:${640 + i * 250}px;height:210px;border-radius:28px;background:${["var(--sun)", "var(--ember)", "var(--night)"][i]};color:${["var(--ink)", "var(--paper)", "var(--night-ink)"][i]};display:flex;align-items:center;gap:36px;padding:0 44px;border:5px solid var(--ink)">
  <div style="width:120px;height:120px;border-radius:50%;background:var(--paper);color:var(--ink);border:5px solid var(--ink);display:grid;place-items:center;font-size:76px;font-weight:800">${n}</div>
  <div style="flex:1;font-size:84px;font-weight:800;letter-spacing:-0.03em">${w}${i === 1 ? `<div style="font-size:50px;font-weight:700;letter-spacing:0;margin-top:2px">0181 66 36 69</div>` : ""}</div>
  <div id="ic${i}" style="width:130px;height:130px">${i === 0 ? `<svg class="ill"><use href="#ill-frites"/></svg>` : i === 1 ? `<svg class="icon" style="width:130px;height:130px"><use href="#i-phone"/></svg>` : `<svg class="icon" style="width:130px;height:130px;color:var(--amber)"><use href="#i-shopping-bag"/></svg>`}</div>
</div>`
  )
  .join("")}
<div id="st" class="sticker ember" style="left:640px;top:1440px">Pinnen of contant</div>
<div id="ad" class="abs lead" style="left:84px;top:1480px;font-size:46px;max-width:480px">Noordeinde 12<br>Zwartewaal</div>`,
    render: `
const t = window.__t;
show($('title'), 0.2, 0.9, 60);
[1.2, 3.1, 5.0].forEach((a, i) => {
  const k = E(P(t, a, a + 0.6));
  const el = $('s' + i);
  el.style.opacity = P(t, a, a + 0.15);
  el.style.transform = 'translateX(' + ((1 - k) * -900) + 'px)';
});
$('ic1').style.transform = 'rotate(' + (t > 3.7 && t < 5 ? Math.sin(t * 28) * 12 : 0) + 'deg)';
pop($('st'), 6.8, 7.4, -10); show($('ad'), 7.6, 8.2, 30);
`,
  },
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
