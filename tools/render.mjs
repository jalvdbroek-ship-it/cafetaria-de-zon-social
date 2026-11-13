// Rendert alle social-stukken uit social-media/src/pieces.mjs naar PNG (master), JPG (exports) en HTML (bewerkbare bron).
// Gebruik: node tools/render.mjs [ID,ID,...]
import { loadPlaywright } from "./browser.mjs";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, relative, posix } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const sm = join(dirname(fileURLToPath(import.meta.url)), "..");
const { default: pieces } = await import(pathToFileURL(join(sm, "src/pieces.mjs")).href);
const nb = (html) => html.replace(/<(h1|p class="lead)[\s\S]*?<\/(h1|p)>/g, (m) => m.replaceAll("De Zon", "De&nbsp;Zon"));
const only = process.argv[2]?.split(",");

const sizes = { "f-feed": [1080, 1350], "f-square": [1080, 1080], "f-story": [1080, 1920], "f-cover": [1640, 624] };

function sprite() {
  const ill = readFileSync(join(sm, "assets/illustraties.svg"), "utf8").trim();
  const used = ["phone", "map-pin", "navigation", "arrow-right", "clock", "shopping-bag", "credit-card", "message-circle", "users", "heart", "banknote"];
  const icons = used
    .map((n) => {
      const svg = readFileSync(join(sm, "assets/icons", `${n}.svg`), "utf8");
      const inner = svg.replace(/<!--[\s\S]*?-->/g, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
      return `<symbol id="i-${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
    })
    .join("");
  return `<svg class="sprite" aria-hidden="true" focusable="false">${icons}${ill}</svg>`;
}
const SPRITE = sprite();

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const page = await ctx.newPage();
let count = 0;

for (const p of pieces) {
  if (only && !only.includes(p.id)) continue;
  const [w, h] = sizes[p.fmt];
  const htmlPath = join(sm, "templates/html", `${p.file}.html`);
  mkdirSync(dirname(htmlPath), { recursive: true });
  const css = posix.relative("templates/html", "assets/brand.css");
  writeFileSync(htmlPath, `<!doctype html>\n<html lang="nl"><head><meta charset="utf-8"><title>${p.id} ${p.file}</title><link rel="stylesheet" href="../../assets/brand.css"></head>\n<body class="${p.fmt}">\n${SPRITE}\n${nb(p.html.trim())}\n</body></html>\n`);
  await page.setViewportSize({ width: w, height: h });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  const png = join(sm, p.folder, `${p.file}.png`);
  mkdirSync(dirname(png), { recursive: true });
  await page.screenshot({ path: png, type: "png" });

  if (!p.needsPhoto && !p.template) {
    const group = p.folder.startsWith("feed") ? "feed" : p.folder.startsWith("carousels") ? "carrousels" : p.folder.startsWith("stories") ? "stories" : p.folder.startsWith("reels") ? "reel-covers" : "profiel";
    const out = join(sm, "exports", group, `${p.file}.${group === "profiel" ? "png" : "jpg"}`);
    mkdirSync(dirname(out), { recursive: true });
    if (group === "profiel") await page.screenshot({ path: out, type: "png" });
    else await page.screenshot({ path: out, type: "jpeg", quality: 93 });
  }
  count++;
}
await browser.close();
console.log(`${count} stukken gerenderd`);
