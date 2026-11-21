// Contactvel van alle figuurtjes. Gebruik: node tools/cast-test.mjs
import { loadPlaywright } from "./browser.mjs";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const sm = join(dirname(fileURLToPath(import.meta.url)), "..");
const { char } = await import(pathToFileURL(join(sm, "src/personages.mjs")).href);
const rows = [
  ["zon", "happy", "wave"], ["zon", "cool", "cheer"], ["zon", "sleep", "hug"], ["frietje", "happy", "wave"], ["frietje", "wow", "up"],
  ["burg", "cool", "hips"], ["burg", "wink", "point"], ["snack", "happy", "cheer"], ["snack", "sad", "hug"], ["ijsje", "happy", "wave"], ["slaatje", "happy", "hips"], ["frietje", "sad", "hug"],
];
const html = `<!doctype html><link rel="stylesheet" href="../assets/brand.css"><body style="overflow:auto;background:var(--paper);height:auto"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;padding:20px;width:1800px">${rows.map(([n, m, p]) => `<div style="background:var(--sun);border:3px solid var(--ink);text-align:center">${char(n, { mood: m, pose: p, size: 260, style: "position:relative" })}<div style="font-weight:800">${n} ${m} ${p}</div></div>`).join("")}</div>`;
writeFileSync(join(sm, "tools/.cast.html"), html);
const { chromium } = await loadPlaywright();
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1840, height: 900 } });
await pg.goto(pathToFileURL(join(sm, "tools/.cast.html")).href);
await pg.evaluate(() => document.fonts.ready);
await pg.screenshot({ path: process.env.TEMP + "/cast.png", fullPage: true });
await b.close();
