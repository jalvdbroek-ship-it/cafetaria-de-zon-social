// Alle social-stukken als HTML, versie 2 ("De bende van De Zon"). Bevestigde feiten staan in FACTS; verzin hier niets bij.
import { char } from "./personages.mjs";
export const FACTS = {
  naam: "Cafetaria De Zon",
  adres: "Noordeinde 12",
  postcode: "3238 BG",
  plaats: "Zwartewaal",
  tel: "0181 66 36 69",
  telLink: "+31181663669",
  uren: [
    ["Maandag", null],
    ["Dinsdag", "12:30 – 22:00"],
    ["Woensdag", "12:30 – 22:00"],
    ["Donderdag", "12:30 – 22:00"],
    ["Vrijdag", "12:30 – 23:00"],
    ["Zaterdag", "12:30 – 23:00"],
    ["Zondag", "12:30 – 21:00"],
  ],
};

const ill = (n, style = "") => `<svg class="ill" style="${style}" aria-hidden="true"><use href="#ill-${n}"/></svg>`;
const ic = (n) => `<svg class="icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const abs = (inner, style) => `<div class="abs" style="${style}">${inner}</div>`;
const C = (name, o = {}) => char(name, o);
const at = (name, o, x, y, z = 2) => char(name, { ...o, style: `left:${x}px;top:${y}px;z-index:${z};${o.style || ""}` });
const sunlogo = `<svg class="sunlogo" aria-hidden="true"><use href="#ill-zon"/></svg>`;
const brandbar = (right = "Noordeinde 12, Zwartewaal") => `<div class="brandbar">${sunlogo}<span>Cafetaria De Zon</span><span class="grow"></span><span class="dim">${right}</span></div>`;
const infobar = () => `<div class="infobar"><div><span class="lab">Open · ma dicht</span><b>Di t/m do</b> 12:30 – 22:00<br><b>Vr en za</b> 12:30 – 23:00<br><b>Zo</b> 12:30 – 21:00</div><div><span class="lab">Adres</span><span class="big">Noordeinde 12</span><br>3238 BG Zwartewaal</div><div><span class="lab">Bel en haal af</span><span class="big">${FACTS.tel}</span><br>Pinnen of contant</div></div>`;
const bel = (cls = "") => `<span class="chip ${cls}">${ic("phone")}Bel ${FACTS.tel}</span>`;
const bub = (text, style, { cls = "", small = "", tail = 70 } = {}) => `<div class="bub ${cls}" style="--tl:${tail}px;${style}">${text}${small ? `<small>${small}</small>` : ""}</div>`;
const tag = (text, style, cls = "") => `<div class="tag ${cls}" style="${style}">${text}</div>`;
const star = (text, { x, y, size = 260, fill = "var(--ember-bright)", rot = -8, color = "var(--ink)", fs = 46, n = 14 }) => {
  let pts = "";
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 0.78 : 1;
    pts += `${(50 + 49 * r * Math.cos(a)).toFixed(1)},${(50 + 49 * r * Math.sin(a)).toFixed(1)} `;
  }
  return `<div class="star" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;transform:rotate(${rot}deg);font-size:${fs}px;color:${color}"><svg viewBox="0 0 100 100"><polygon points="${pts}" fill="${fill}" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></svg><span>${text}</span></div>`;
};
const tick = (text, top, cls = "", rot = 0, n = 4) => `<div class="ticker ${cls}" style="top:${top}px;transform:rotate(${rot}deg)">${Array.from({ length: n }, () => `<span>${text}</span><i></i>`).join("")}</div>`;
const burst = (b1, b2, x = "50%", y = "60%") => `<div class="burst" style="--b1:${b1};--b2:${b2};transform-origin:${x} ${y}"></div>`;
const dots = (o = 0.14, extra = "") => `<div class="dots ${extra}" style="--o:${o}"></div>`;
const grain = `<div class="grain"></div>`;
const post = (bg, inner, fmt = "f-feed") => `<div class="post ${bg} ${fmt}">${inner}${grain}</div>`;

const pieces = [];
export default pieces;
const add = (id, folder, file, fmt, html, meta = {}) => pieces.push({ id, folder, file, fmt, html, ...meta });

/* ============ FEEDPOSTS 1080x1350 ============ */
add("F01", "feed-posts", "F01-intro-hoi-zwartewaal", "f-feed", post("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "70%")}${dots(0.1)}
  ${at("zon", { mood: "cool", pose: "cheer", size: 400 }, 660, 190, 2)}
  <h1 class="hx l sh abs" style="left:70px;top:84px;z-index:6">Hoi<br>Zwartewaal.</h1>
  ${tag("Wij zijn de bende van De Zon", "left:70px;top:420px;transform:rotate(-3deg)", "ember")}
  ${tag("Dinsdag t/m zondag open", "left:110px;top:520px;transform:rotate(2deg)", "")}
  ${at("frietje", { mood: "happy", pose: "wave", size: 410 }, -30, 730, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 480 }, 170, 680, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 400 }, 480, 750, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 380 }, 690, 760, 5)}
  ${at("slaatje", { mood: "happy", pose: "hips", size: 300 }, 860, 840, 3)}
  ${infobar()}`));

add("F02", "feed-posts", "F02-frites-zin-in-frites", "f-feed", post("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "70%", "62%")}${dots(0.1)}
  <h1 class="hx xl sh abs" style="left:70px;top:84px;z-index:6">Zin<br>in frites?</h1>
  ${at("frietje", { mood: "wow", pose: "up", size: 720, rot: 4 }, 350, 360, 3)}
  ${bub("Ik zou<br>wel weten<br>wat.", "left:70px;top:700px;transform:rotate(-3deg)", { tail: 330 })}
  ${tag("Afhalen kan", "left:90px;top:1000px;transform:rotate(-6deg)", "ember")}
  ${infobar()}`));

add("F03", "feed-posts", "F03-hamburgers-burgerzin", "f-feed", post("bg-ember", `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "30%", "62%")}${dots(0.12)}
  <h1 class="hx xl sh abs" style="left:70px;top:84px;z-index:6">Burger-<br>zin?</h1>
  ${at("burg", { mood: "cool", pose: "point", size: 720, rot: -3 }, 90, 400, 3)}
  ${bub("Iemand zei<br>burger?", "right:60px;top:560px;transform:rotate(3deg)", { cls: "sun tr", tail: 120 })}
  ${tag("Haal 'm af", "right:70px;top:1000px;transform:rotate(4deg)", "ember")}
  ${infobar()}`));

add("F04", "feed-posts", "F04-snacks-snacktijd-vraag", "f-feed", post("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "70%", "60%")}${dots(0.16)}
  <h1 class="hx xl abs z6" style="left:70px;top:84px;color:var(--sun);text-shadow:8px 8px 0 var(--ember)">Snack-<br>tijd.</h1>
  ${at("snack", { mood: "happy", pose: "cheer", size: 700, rot: 5 }, 400, 380, 3)}
  ${bub("Wat is jouw<br>favoriet?", "left:70px;top:700px;transform:rotate(-3deg)", { small: "Zeg het in de reacties.", tail: 360 })}
  <div class="abs z6" style="left:70px;top:1000px"><span class="chip sun">${ic("message-circle")}Reageer hieronder</span></div>
  ${infobar()}`));

add("F05", "feed-posts", "F05-vegetarisch-geen-vlees-ook-prima", "f-feed", post("bg-paper2", `
  ${burst("var(--paper-2)", "var(--paper)", "60%", "65%")}${dots(0.1)}
  <h1 class="hx l shs abs z6" style="left:70px;top:84px">Geen vlees?<br>Ook prima.</h1>
  ${at("slaatje", { mood: "wink", pose: "hips", size: 700, rot: -4 }, 330, 400, 3)}
  ${bub("Vegetarisch kan<br>bij De Zon.", "left:70px;top:720px;transform:rotate(-3deg)", { cls: "sun", tail: 300 })}
  ${tag("Vraag ernaar bij de balie", "left:70px;top:1010px;transform:rotate(-3deg)", "ember")}
  ${infobar()}`));

add("F06", "feed-posts", "F06-merkpost-bij-de-zon-schijnt-het-altijd", "f-feed", post("bg-paper2", `
  ${burst("var(--paper-2)", "var(--paper)", "50%", "60%")}
  <div class="rain" style="opacity:.9"></div>
  <p class="abs z6 lead" style="left:70px;top:86px;font-size:62px;font-weight:800;letter-spacing:-0.03em">Het regent.</p>
  <h1 class="hx m shs abs z6" style="left:70px;top:176px">Bij De Zon<br>schijnt het<br>altijd.</h1>
  ${at("zon", { mood: "cool", pose: "cheer", size: 760 }, 330, 440, 3)}
  ${tag("Haal wat lekkers af", "left:70px;top:1050px;transform:rotate(-4deg)", "ember")}
  ${infobar()}`));

add("F07", "feed-posts", "F07-achter-de-balie-FOTO-NODIG", "f-feed", post("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "50%")}${dots(0.1)}
  <h1 class="hx m sh abs z6" style="left:70px;top:84px">Kijkje<br>achter de balie.</h1>
  <div class="slot abs z3" style="left:110px;top:420px;width:860px;height:740px;border-radius:24px;transform:rotate(-2deg);border-width:8px;background:var(--paper)">FOTO NODIG<br>Balie of medewerker aan het werk<br>(met toestemming)</div>
  ${at("zon", { mood: "wink", pose: "cheer", size: 300 }, 760, 250, 5)}
  ${infobar()}`), { needsPhoto: true });

add("F08", "feed-posts", "F08-bezoek-kom-langs", "f-feed", post("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "50%", "50%")}${dots(0.14)}
  <h1 class="hx xl abs z6" style="left:70px;top:84px;color:var(--sun);text-shadow:8px 8px 0 var(--ember)">Kom<br>langs.</h1>
  <div class="hard abs z4" style="left:70px;top:500px;width:940px;height:330px;transform:rotate(-2deg);padding:34px 44px">
    <div style="font-size:112px;font-weight:800;letter-spacing:-0.045em;line-height:.9">Noordeinde</div>
    <div style="font-size:48px;font-weight:700;margin-top:22px">3238 BG Zwartewaal</div>
  </div>
  ${star("12", { x: 760, y: 420, size: 300, rot: 8, fs: 130, fill: "var(--sun)" })}
  <div class="abs z6" style="left:70px;top:900px"><span class="chip sun" style="font-size:40px;padding:20px 30px">Dinsdag t/m zondag open</span></div>
  ${at("frietje", { mood: "happy", pose: "wave", size: 380 }, 270, 830, 2)}
  ${at("burg", { mood: "cool", pose: "hips", size: 500 }, 610, 740, 2)}
  ${infobar()}`));

const checkIc = `<svg viewBox="0 0 48 48"><path d="M10 25l10 10 18-22"/></svg>`;

add("F09", "feed-posts", "F09-interactie-frites-of-snack", "f-feed", post("bg-sun", `
  <div class="abs" style="inset:0;background:var(--ember);clip-path:polygon(54% 0,100% 0,100% 100%,46% 100%)"></div>
  ${dots(0.12)}
  <h1 class="hx l abs z6" style="left:70px;top:84px;color:var(--ink);text-shadow:7px 7px 0 var(--paper)">Kies er één.</h1>
  ${at("frietje", { mood: "happy", pose: "cheer", size: 520 }, -20, 480, 3)}
  ${at("snack", { mood: "cool", pose: "cheer", size: 460, flip: true }, 600, 520, 3)}
  ${star("VS", { x: 400, y: 560, size: 280, rot: -8, fs: 110, fill: "var(--paper)" })}
  <div class="nr abs z6" style="left:200px;top:300px">1</div><div class="nr abs z6" style="left:820px;top:300px">2</div>
  <p class="abs z6" style="left:110px;top:410px;font-size:54px;font-weight:800;letter-spacing:-0.03em">Frites</p>
  <p class="abs z6" style="left:760px;top:410px;font-size:54px;font-weight:800;letter-spacing:-0.03em;color:var(--paper)">Snack</p>
  ${tag("Reageer met 1 of 2", "left:330px;top:1040px;transform:rotate(-3deg)", "ink")}
  ${infobar()}`));

add("F10", "feed-posts", "F10-afhalen-geen-zin-om-te-koken", "f-feed", post("bg-paper", `
  ${burst("var(--paper)", "var(--paper-2)", "50%", "60%")}${dots(0.1)}
  <h1 class="hx l shs abs z6" style="left:70px;top:84px">Geen zin<br>om te koken?</h1>
  ${tag("Wij wel.", "left:70px;top:420px;transform:rotate(-4deg)", "ember")}
  ${at("burg", { mood: "happy", pose: "hips", size: 470 }, 70, 560, 3)}
  ${at("frietje", { mood: "wow", pose: "up", size: 470 }, 500, 540, 4)}
  ${star("Pinnen<br>of<br>contant", { x: 800, y: 380, size: 250, rot: 10, fs: 40, fill: "var(--sun)" })}
  ${bub("Bel, kies,<br>haal af.", "left:300px;top:420px;transform:rotate(2deg);font-size:48px", { cls: "sun", tail: 60 })}
  ${infobar()}`));

add("F11", "feed-posts", "F11-maandag-de-zon-slaapt", "f-feed", post("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "50%", "50%")}${dots(0.12)}
  <h1 class="hx l abs z6 sh e" style="left:70px;top:84px">Maandag:<br>de Zon<br>slaapt.</h1>
  ${at("zon", { mood: "sleep", pose: "none", size: 640 }, 380, 400, 3)}
  <div class="zzz" style="left:830px;top:410px;font-size:120px">Z</div><div class="zzz" style="left:900px;top:330px;font-size:90px">z</div><div class="zzz" style="left:950px;top:270px;font-size:64px">z</div>
  ${tag("Dinsdag zijn we er weer", "left:70px;top:620px;transform:rotate(-4deg)", "sun")}
  ${tag("Vanaf 12:30 uur", "left:130px;top:730px;transform:rotate(3deg)", "")}
  ${infobar()}`));

add("F12", "feed-posts", "F12-late-zon-vrijdag-zaterdag", "f-feed", post("bg-night", `
  <div class="abs" style="inset:0;background:linear-gradient(180deg,var(--night) 0%,oklch(0.36 0.1 35) 58%,var(--ember) 100%)"></div>
  <div class="abs" style="left:150px;top:700px;width:780px;height:780px;border-radius:50%;background:var(--ember-bright);border:8px solid var(--ink)"></div>
  ${dots(0.1)}
  <h1 class="hx xl abs z6" style="left:70px;top:84px;color:var(--sun);text-shadow:8px 8px 0 var(--ink)">Late<br>Zon.</h1>
  ${at("zon", { mood: "cool", pose: "cheer", size: 520, rot: 6 }, 520, 130, 3)}
  ${bub("Vrijdag en zaterdag<br>tot 23:00.", "left:70px;top:560px;transform:rotate(-3deg)", { cls: "sun", tail: 300, small: "Zondag tot 21:00." })}
  ${at("burg", { mood: "cool", pose: "cheer", size: 470 }, 30, 700, 4)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 450 }, 600, 720, 4)}
  ${infobar()}`));

add("F13", "feed-posts", "F13-pinnen-of-contant", "f-feed", post("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "30%", "50%")}${dots(0.1)}
  <h1 class="hx l sh abs z6" style="left:70px;top:84px">Pinnen of<br>contant?</h1>
  <div class="hard abs z4" style="left:70px;top:420px;width:620px;padding:34px 40px;transform:rotate(-2deg)">
    ${["Pinnen", "Contant", "Honger"].map((t) => `<div style="display:flex;align-items:center;gap:30px;padding:16px 0;font-size:76px;font-weight:800;letter-spacing:-0.04em"><span class="check">${checkIc}</span>${t}</div>`).join("")}
  </div>
  ${at("snack", { mood: "happy", pose: "cheer", size: 520, rot: 5 }, 600, 520, 5)}
  ${tag("Allebei kan.", "left:90px;top:960px;transform:rotate(-4deg)", "ember")}
  ${infobar()}`));

/* ============ CARROUSELS 1080x1350 ============ */
const slide = (bg, n, total, inner, { last = false, swipe = true } = {}) => post(bg, `${inner}<div class="count" style="z-index:9;${bg === "bg-night" || bg === "bg-ember" ? "color:var(--paper)" : ""}">${n}/${total}</div>${last ? infobar() : swipe ? `<div class="swipe" style="z-index:9;bottom:250px;${bg === "bg-night" ? "color:var(--sun)" : ""}">Swipe ${ic("arrow-right")}</div>${infobar()}` : infobar()}`);
const profile = (n, total, { bg, name, who, mood, pose, rows, tagline, fill }) =>
  slide(bg, n, total, `
  ${burst(fill[0], fill[1], "30%", "55%")}${dots(0.1)}
  <h1 class="hx xl abs z6 ${bg === "bg-paper" || bg === "bg-paper2" ? "shs" : "sh"}" style="left:70px;top:84px">${name}</h1>
  ${tag(who, "left:76px;top:330px;transform:rotate(-3deg)", "ink")}
  ${at(name.toLowerCase().replace("ijsje", "ijsje"), { mood, pose, size: 560, rot: -3 }, -40, 470, 3)}
  <div class="hard abs z5" style="left:430px;top:420px;width:580px;padding:32px 38px;transform:rotate(2deg)">
    ${rows.map(([k, v]) => `<div style="margin:14px 0"><div style="font-size:26px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--ember)">${k}</div><div style="font-size:46px;font-weight:800;letter-spacing:-0.03em;line-height:1.02;margin-top:4px">${v}</div></div>`).join("")}
  </div>
  ${tagline ? bub(tagline, "left:470px;top:960px;transform:rotate(-2deg);font-size:46px", { cls: "sun", tail: 70 }) : ""}`);

const C1 = 8;
add("C1-1", "carousels", "C1-slide-1", "f-feed", slide("bg-sun", 1, C1, `
  ${burst("var(--sun)", "var(--amber)", "50%", "70%")}${dots(0.1)}
  <h1 class="hx xl sh abs z6" style="left:70px;top:84px">Ontmoet<br>de bende.</h1>
  ${tag("Swipe en kies je favoriet", "left:70px;top:480px;transform:rotate(-3deg)", "ember")}
  ${at("zon", { mood: "cool", pose: "cheer", size: 330 }, 700, 440, 2)}
  ${at("frietje", { mood: "happy", pose: "wave", size: 410 }, -30, 700, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 470 }, 170, 650, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 390 }, 480, 720, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 370 }, 690, 730, 5)}
  ${at("slaatje", { mood: "happy", pose: "hips", size: 290 }, 860, 810, 3)}`, { swipe: false }));

add("C1-2", "carousels", "C1-slide-2", "f-feed", profile(2, C1, { bg: "bg-sun", name: "Zon", who: "De baas van de zaak", mood: "cool", pose: "cheer", fill: ["var(--sun)", "var(--amber)"], tagline: "Ik open dinsdag t/m zondag om 12:30.",
  rows: [["Superkracht", "Schijnt. Ook als het regent."], ["Beste vriend", "Iedereen met trek"], ["Houdt niet van", "Maandag. Dan slaapt hij."]] }));
add("C1-3", "carousels", "C1-slide-3", "f-feed", profile(3, C1, { bg: "bg-paper", name: "Frietje", who: "Altijd in de buurt", mood: "happy", pose: "wave", fill: ["var(--paper)", "var(--paper-2)"], tagline: "Ik deel graag. Echt waar.",
  rows: [["Superkracht", "Verdwijnt binnen drie minuten"], ["Beste vriend", "Elke snack"], ["Houdt niet van", "Koud worden"]] }));
add("C1-4", "carousels", "C1-slide-4", "f-feed", profile(4, C1, { bg: "bg-ember", name: "Burg", who: "Stevig en stoer", mood: "cool", pose: "hips", fill: ["var(--ember)", "oklch(0.58 0.17 40)"], tagline: "Past in één hand. Bijna.",
  rows: [["Superkracht", "Maakt elke trek stil"], ["Beste vriend", "Frietje, natuurlijk"], ["Houdt niet van", "Dieetpraat"]] }));
add("C1-5", "carousels", "C1-slide-5", "f-feed", profile(5, C1, { bg: "bg-night", name: "Snack", who: "Spontaan en knapperig", mood: "wink", pose: "cheer", fill: ["var(--night)", "var(--night-2)"], tagline: "Eén pakken is nooit genoeg.",
  rows: [["Superkracht", "Knapperig van buiten"], ["Beste vriend", "Wie hem als eerste pakt"], ["Houdt niet van", "Wachten"]] }));
add("C1-6", "carousels", "C1-slide-6", "f-feed", profile(6, C1, { bg: "bg-paper2", name: "IJsje", who: "Zoet en cool", mood: "happy", pose: "wave", fill: ["var(--paper-2)", "var(--paper)"], tagline: "Altijd ruimte voor mij.",
  rows: [["Superkracht", "Koelt je af"], ["Beste vriend", "Frietje, na afloop"], ["Houdt niet van", "Smelten"]] }));
add("C1-7", "carousels", "C1-slide-7", "f-feed", profile(7, C1, { bg: "bg-sun", name: "Slaatje", who: "Vegetarisch kan ook", mood: "wink", pose: "hips", fill: ["var(--sun)", "var(--amber)"], tagline: "Vegetarisch kan bij De Zon.",
  rows: [["Superkracht", "Maakt het vegetarisch"], ["Beste vriend", "Iedereen die geen vlees eet"], ["Houdt niet van", "Vergeten worden"]] }));
add("C1-8", "carousels", "C1-slide-8", "f-feed", slide("bg-sun", 8, C1, `
  ${burst("var(--sun)", "var(--amber)", "50%", "70%")}${dots(0.1)}
  <h1 class="hx l sh abs z6" style="left:70px;top:84px">Kom de<br>bende<br>ontmoeten.</h1>
  ${at("zon", { mood: "cool", pose: "cheer", size: 330 }, 700, 120, 2)}
  ${at("frietje", { mood: "happy", pose: "wave", size: 400 }, -20, 650, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 460 }, 190, 610, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 380 }, 500, 690, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 360 }, 700, 700, 5)}
  ${at("slaatje", { mood: "happy", pose: "hips", size: 280 }, 860, 780, 3)}
  ${tag("Haal af aan het Noordeinde", "left:70px;top:530px;transform:rotate(-3deg)", "ember")}`, { last: true }));

const C2 = 6;
const bignr = (n, x, y) => `<div class="nr abs z6" style="left:${x}px;top:${y}px;width:170px;height:170px;font-size:110px;border-width:8px;box-shadow:10px 10px 0 var(--ink)">${n}</div>`;
add("C2-1", "carousels", "C2-slide-1", "f-feed", slide("bg-ember", 1, C2, `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "70%", "60%")}${dots(0.12)}
  <h1 class="hx xl sh abs z6" style="left:70px;top:84px">Afhalen<br>bij De Zon.</h1>
  ${tag("In 4 simpele stappen", "left:70px;top:480px;transform:rotate(-3deg)", "sun")}
  ${at("frietje", { mood: "wow", pose: "up", size: 640 }, 400, 520, 3)}
  ${at("burg", { mood: "cool", pose: "hips", size: 400 }, 20, 700, 4)}`, { swipe: false }));

add("C2-2", "carousels", "C2-slide-2", "f-feed", slide("bg-sun", 2, C2, `
  ${burst("var(--sun)", "var(--amber)", "50%", "60%")}${dots(0.1)}
  ${bignr(1, 70, 84)}
  <h1 class="hx l sh abs z6" style="left:70px;top:290px">Kies wat<br>je lust.</h1>
  ${["Frites", "Hamburgers", "Snacks", "Vegetarisch", "IJs", "Dranken"].map((t, i) => tag(t, `left:${[70, 330, 640, 90, 470, 740][i]}px;top:${[640, 700, 640, 790, 830, 770][i]}px;transform:rotate(${[-4, 3, -3, 3, -4, 5][i]}deg);font-size:50px;padding:16px 34px`, ["ember", "", "ink", "", "ember", "sun"][i])).join("")}
  ${at("frietje", { mood: "happy", pose: "wave", size: 300 }, 640, 130, 3)}
  ${at("slaatje", { mood: "happy", pose: "hips", size: 250 }, 840, 360, 3)}`));

add("C2-3", "carousels", "C2-slide-3", "f-feed", slide("bg-paper", 3, C2, `
  ${burst("var(--paper)", "var(--paper-2)", "50%", "60%")}${dots(0.1)}
  ${bignr(2, 70, 84)}
  <h1 class="hx l shs abs z6" style="left:70px;top:290px">Bel<br>De Zon.</h1>
  <div class="hard sun abs z5" style="left:70px;top:680px;width:840px;padding:30px 40px;transform:rotate(-2deg)"><div style="font-size:30px;font-weight:800;letter-spacing:.12em;text-transform:uppercase">Bellen kan</div><div style="font-size:98px;font-weight:800;letter-spacing:-0.05em;line-height:1">${FACTS.tel}</div></div>
  ${tag("Zeg wat je wilt halen", "left:90px;top:960px;transform:rotate(-3deg)", "ember")}
  ${at("burg", { mood: "happy", pose: "point", size: 400, flip: true }, 640, 230, 3)}`));

add("C2-4", "carousels", "C2-slide-4", "f-feed", slide("bg-night", 4, C2, `
  ${burst("var(--night)", "var(--night-2)", "50%", "60%")}${dots(0.14)}
  ${bignr(3, 70, 84)}
  <h1 class="hx l abs z6" style="left:70px;top:290px;color:var(--sun);text-shadow:8px 8px 0 var(--ember)">Haal af.</h1>
  <div class="hard abs z4" style="left:70px;top:560px;width:640px;padding:30px 40px;transform:rotate(-2deg)"><div style="font-size:84px;font-weight:800;letter-spacing:-0.045em;line-height:.9">Noordeinde 12</div><div style="font-size:42px;font-weight:700;margin-top:14px">3238 BG Zwartewaal</div></div>
  ${tag("Dinsdag t/m zondag vanaf 12:30", "left:70px;top:900px;transform:rotate(2deg)", "sun")}
  ${at("snack", { mood: "happy", pose: "cheer", size: 540, rot: 4 }, 520, 330, 3)}`));

add("C2-5", "carousels", "C2-slide-5", "f-feed", slide("bg-sun", 5, C2, `
  ${burst("var(--sun)", "var(--amber)", "30%", "50%")}${dots(0.1)}
  ${bignr(4, 70, 84)}
  <h1 class="hx l sh abs z6" style="left:70px;top:290px">Pinnen<br>of contant.</h1>
  <div class="hard abs z4" style="left:70px;top:640px;width:560px;padding:26px 36px;transform:rotate(-2deg)">${["Pinnen", "Contant"].map((t) => `<div style="display:flex;align-items:center;gap:26px;padding:12px 0;font-size:70px;font-weight:800;letter-spacing:-0.04em"><span class="check">${checkIc}</span>${t}</div>`).join("")}</div>
  ${at("zon", { mood: "cool", pose: "cheer", size: 470 }, 580, 540, 3)}`));

add("C2-6", "carousels", "C2-slide-6", "f-feed", slide("bg-ember", 6, C2, `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "50%", "70%")}${dots(0.12)}
  <h1 class="hx xl sh abs z6" style="left:70px;top:84px">Smake-<br>lijk!</h1>
  ${at("frietje", { mood: "happy", pose: "wave", size: 420 }, -20, 600, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 480 }, 190, 560, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 400 }, 510, 640, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 370 }, 710, 650, 5)}
  ${tag("Haal af aan het Noordeinde", "left:70px;top:430px;transform:rotate(-3deg)", "sun")}`, { last: true }));

const C3 = 7;
const result = (n, letter, name, who, bg, fill, mood, pose, line) =>
  slide(bg, n, C3, `
  ${burst(fill[0], fill[1], "70%", "55%")}${dots(0.1)}
  <h1 class="hx l abs z6 ${bg === "bg-paper" || bg === "bg-paper2" ? "shs" : "sh"}" style="left:70px;top:84px">Jij bent<br>${name}.</h1>
  ${star(letter, { x: 790, y: 90, size: 230, rot: 8, fs: 120, fill: "var(--sun)" })}
  ${tag(who, "left:70px;top:400px;transform:rotate(-3deg)", "ink")}
  ${at(name.toLowerCase(), { mood, pose, size: 600, rot: 3 }, 430, 440, 3)}
  ${bub(line, "left:70px;top:560px;transform:rotate(-2deg);font-size:50px;width:430px", { cls: "sun", tail: 300 })}`, { swipe: n < C3 - 1 });
add("C3-1", "carousels", "C3-slide-1", "f-feed", slide("bg-night", 1, C3, `
  ${burst("var(--night)", "var(--night-2)", "50%", "60%")}${dots(0.14)}
  <h1 class="hx xl abs z6" style="left:70px;top:84px;color:var(--sun);text-shadow:8px 8px 0 var(--ember)">Welk type<br>ben jij?</h1>
  ${tag("Doe de test, kies A, B, C of D", "left:70px;top:480px;transform:rotate(-3deg)", "sun")}
  ${at("frietje", { mood: "wow", pose: "up", size: 360 }, -10, 690, 4)}
  ${at("burg", { mood: "wow", pose: "cheer", size: 380 }, 240, 670, 5)}
  ${at("snack", { mood: "wow", pose: "up", size: 340 }, 520, 720, 4)}
  ${at("ijsje", { mood: "wow", pose: "cheer", size: 330 }, 740, 730, 5)}`, { swipe: false }));
add("C3-2", "carousels", "C3-slide-2", "f-feed", slide("bg-paper", 2, C3, `
  ${burst("var(--paper)", "var(--paper-2)", "50%", "50%")}${dots(0.1)}
  <h1 class="hx m shs abs z6" style="left:70px;top:84px">Zaterdagavond.<br>Wat doe jij?</h1>
  ${[["A", "Bank, film en niemand die iets vraagt.", "var(--sun)"], ["B", "Ik heb honger. Echt honger.", "var(--ember)"], ["C", "Spontaan. Ik zie wel.", "var(--paper)"], ["D", "Iets zoets erachteraan.", "var(--sun)"]]
    .map(([l, t, c], i) => `<div class="hard abs z4" style="left:${70 + (i % 2) * 20}px;top:${340 + i * 190}px;width:900px;height:160px;padding:0 34px;display:flex;align-items:center;gap:30px;transform:rotate(${[-1.5, 1.2, -1, 1.5][i]}deg);background:${c};${c === "var(--ember)" ? "color:var(--paper)" : ""}"><span class="nr" style="flex:none;background:var(--paper);color:var(--ink)">${l}</span><span style="font-size:52px;font-weight:800;letter-spacing:-0.03em;line-height:1.02">${t}</span></div>`).join("")}`));
add("C3-3", "carousels", "C3-slide-3", "f-feed", result(3, "A", "Frietje", "Antwoord A", "bg-sun", ["var(--sun)", "var(--amber)"], "happy", "wave", "Gezellig en altijd welkom."));
add("C3-4", "carousels", "C3-slide-4", "f-feed", result(4, "B", "Burg", "Antwoord B", "bg-ember", ["var(--ember)", "oklch(0.58 0.17 40)"], "cool", "hips", "Eerlijk, stevig en zonder omwegen."));
add("C3-5", "carousels", "C3-slide-5", "f-feed", result(5, "C", "Snack", "Antwoord C", "bg-night", ["var(--night)", "var(--night-2)"], "wink", "cheer", "Spontaan en altijd in voor meer."));
add("C3-6", "carousels", "C3-slide-6", "f-feed", result(6, "D", "IJsje", "Antwoord D", "bg-paper2", ["var(--paper-2)", "var(--paper)"], "happy", "wave", "Zoet en relaxed. Altijd cool."));
add("C3-7", "carousels", "C3-slide-7", "f-feed", slide("bg-sun", 7, C3, `
  ${burst("var(--sun)", "var(--amber)", "50%", "70%")}${dots(0.1)}
  <h1 class="hx l sh abs z6" style="left:70px;top:84px">Welke letter<br>ben jij?</h1>
  ${tag("Reageer met A, B, C of D", "left:70px;top:420px;transform:rotate(-3deg)", "ember")}
  ${at("frietje", { mood: "happy", pose: "wave", size: 410 }, -30, 640, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 470 }, 170, 600, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 390 }, 480, 670, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 370 }, 700, 680, 5)}`, { last: true }));

/* ============ STORIES 1080x1920 ============ */
const story = (bg, inner) => `<div class="post ${bg} f-story">${inner}<div class="abs z6" style="left:70px;top:96px;display:flex;align-items:center;gap:14px;font-size:38px;font-weight:800">${sunlogo.replace("sunlogo", "sunlogo\" style=\"width:60px;height:60px;color:var(--ember-bright)")}De Zon</div>${grain}</div>`;
add("S01", "stories", "S01-onze-week", "f-story", story("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "45%")}${dots(0.1)}
  <h1 class="hx l sh abs z6" style="left:70px;top:230px">Onze week.</h1>
  ${at("zon", { mood: "cool", pose: "cheer", size: 290 }, 790, 170, 3)}
  <div class="hard abs z4" style="left:70px;top:520px;width:940px;padding:26px 40px;transform:rotate(-1.5deg)">
    ${FACTS.uren.map(([d, t]) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:16px 0;border-bottom:5px dotted color-mix(in oklch,var(--ink) 25%,transparent);font-size:62px;font-weight:800;letter-spacing:-0.03em;${t ? "" : "opacity:.6"}"><span>${d}</span><span style="font-variant-numeric:tabular-nums">${t || "De Zon slaapt"}</span></div>`).join("")}
  </div>
  ${tag("Noordeinde 12, Zwartewaal", "left:90px;top:1370px;transform:rotate(-3deg)", "ember")}
  ${tag("Pinnen of contant", "left:560px;top:1460px;transform:rotate(3deg)", "")}`));
add("S02", "stories", "S02-poll-frites-of-snack", "f-story", story("bg-sun", `
  <div class="abs" style="inset:0;background:var(--ember);clip-path:polygon(54% 0,100% 0,100% 100%,46% 100%)"></div>${dots(0.12)}
  <h1 class="hx l abs z6" style="left:70px;top:230px;color:var(--ink);text-shadow:7px 7px 0 var(--paper)">Frites<br>of snack?</h1>
  ${at("frietje", { mood: "happy", pose: "cheer", size: 720 }, -90, 640, 3)}
  ${at("snack", { mood: "cool", pose: "cheer", size: 640, flip: true }, 500, 700, 3)}
  ${star("VS", { x: 390, y: 700, size: 300, rot: -8, fs: 120, fill: "var(--paper)" })}
  ${tag("Stem hieronder", "left:340px;top:1370px;transform:rotate(-3deg)", "ink")}`));
add("S03", "stories", "S03-vraag-jouw-standaard-bestelling", "f-story", story("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "50%", "50%")}${dots(0.14)}
  <h1 class="hx m abs z6" style="left:70px;top:230px;color:var(--sun);text-shadow:7px 7px 0 var(--ember)">Wat is jouw<br>standaard<br>bestelling?</h1>
  ${at("burg", { mood: "wow", pose: "point", size: 740, rot: -3 }, 10, 700, 3)}
  ${at("frietje", { mood: "happy", pose: "wave", size: 520 }, 560, 800, 3)}
  ${tag("Zet je antwoord hieronder", "left:200px;top:1400px;transform:rotate(-3deg)", "sun")}`));
add("S04", "stories", "S04-afhalen-pin-of-contant", "f-story", story("bg-ember", `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "50%", "50%")}${dots(0.12)}
  <h1 class="hx l sh abs z6" style="left:70px;top:230px">Haal af.<br>Pin of<br>contant.</h1>
  <div class="hard abs z4" style="left:70px;top:760px;width:600px;padding:26px 36px;transform:rotate(-2deg)">${["Bel en bestel", "Haal af aan het Noordeinde", "Pinnen of contant"].map((t) => `<div style="display:flex;align-items:center;gap:22px;padding:12px 0;font-size:46px;font-weight:800;letter-spacing:-0.03em;line-height:1.05"><span class="check" style="width:64px;height:64px">${checkIc}</span>${t}</div>`).join("")}</div>
  ${at("snack", { mood: "cool", pose: "cheer", size: 520, rot: 4 }, 560, 760, 3)}
  <div class="abs z6" style="left:70px;top:1400px">${bel("sun")}</div>`));
add("S05", "stories", "S05-route-noordeinde-12", "f-story", story("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "50%", "50%")}${dots(0.14)}
  <h1 class="hx l abs z6" style="left:70px;top:230px;color:var(--sun);text-shadow:7px 7px 0 var(--ember)">Zo kom je<br>bij De Zon.</h1>
  <div class="hard abs z4" style="left:70px;top:640px;width:940px;height:340px;padding:34px 44px;transform:rotate(-2deg)"><div style="font-size:120px;font-weight:800;letter-spacing:-0.045em;line-height:.9">Noordeinde</div><div style="font-size:50px;font-weight:700;margin-top:22px">3238 BG Zwartewaal</div></div>
  ${star("12", { x: 750, y: 540, size: 300, rot: 8, fs: 130, fill: "var(--sun)" })}
  ${at("snack", { mood: "wink", pose: "point", size: 640 }, 40, 1000, 3)}
  ${tag("Link-sticker met route", "left:520px;top:1340px;transform:rotate(3deg)", "sun")}`));
add("S06", "stories", "S06-weekend-tot-23-uur", "f-story", story("bg-night", `
  <div class="abs" style="inset:0;background:linear-gradient(180deg,var(--night) 0%,oklch(0.36 0.1 35) 60%,var(--ember) 100%)"></div>
  <div class="abs" style="left:100px;top:1100px;width:880px;height:880px;border-radius:50%;background:var(--ember-bright);border:8px solid var(--ink)"></div>${dots(0.1)}
  <h1 class="hx xl abs z6" style="left:70px;top:230px;color:var(--sun);text-shadow:8px 8px 0 var(--ink)">Het<br>weekend.</h1>
  ${bub("Vrijdag en zaterdag<br>tot 23:00.", "left:70px;top:760px;transform:rotate(-3deg)", { cls: "sun", tail: 300, small: "Zondag tot 21:00." })}
  ${at("zon", { mood: "cool", pose: "cheer", size: 460, rot: 6 }, 560, 520, 3)}
  ${at("burg", { mood: "cool", pose: "cheer", size: 430 }, 60, 1000, 4)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 400 }, 620, 1040, 4)}
  ${tag("Noordeinde 12, Zwartewaal", "left:300px;top:1470px;transform:rotate(-2deg)", "")}`));
add("S07", "stories", "S07-ijsje", "f-story", story("bg-paper2", `
  ${burst("var(--paper-2)", "var(--paper)", "50%", "55%")}${dots(0.1)}
  <h1 class="hx xl shs abs z6" style="left:70px;top:230px">Een<br>ijsje?</h1>
  ${at("ijsje", { mood: "wow", pose: "cheer", size: 900, rot: -4 }, 170, 640, 3)}
  ${bub("Ja, dat hebben<br>we ook.", "left:70px;top:560px;transform:rotate(-3deg)", { cls: "sun", tail: 280 })}
  ${tag("Vraag ernaar bij de balie", "left:90px;top:1450px;transform:rotate(-3deg)", "ember")}`));
add("S08", "stories", "S08-lokaal-wie-neem-jij-mee", "f-story", story("bg-ember", `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "50%", "55%")}${dots(0.12)}
  <h1 class="hx l sh abs z6" style="left:70px;top:230px">Wie neem jij<br>mee naar<br>De Zon?</h1>
  ${at("frietje", { mood: "happy", pose: "wave", size: 600 }, -90, 780, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 700 }, 120, 720, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 580 }, 480, 800, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 520 }, 700, 840, 5)}
  ${tag("Tag je maat", "left:330px;top:1400px;transform:rotate(-4deg)", "sun")}`));
add("S09", "stories", "S09-quiz-welk-type", "f-story", story("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "55%")}${dots(0.1)}
  <h1 class="hx l sh abs z6" style="left:70px;top:230px">Welk type<br>ben jij?</h1>
  ${[["A", "frietje", "Frietje", 70, 650], ["B", "burg", "Burg", 560, 650], ["C", "snack", "Snack", 70, 1060], ["D", "ijsje", "IJsje", 560, 1060]].map(([l, n, t, x, y]) => `<div class="hard abs z3" style="left:${x}px;top:${y}px;width:450px;height:380px;overflow:hidden"><span class="nr abs z6" style="left:22px;top:20px">${l}</span>${at(n, { mood: "happy", pose: "wave", size: 300 }, 80, 70, 2)}</div>`).join("")}
  ${tag("Doe mee met de quiz", "left:300px;top:1500px;transform:rotate(-3deg)", "ember")}`));
add("S10", "stories", "S10-de-zon-gaat-op", "f-story", story("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "50%")}${dots(0.1)}
  <h1 class="hx xl sh abs z6" style="left:70px;top:230px">De Zon<br>gaat op.</h1>
  <svg class="abs arc z2" viewBox="0 0 960 560" style="left:60px;top:700px;width:960px;height:560px;color:var(--ink)"><path d="M30 550A450 450 0 0 1 930 550"/></svg>
  ${at("zon", { mood: "cool", pose: "cheer", size: 700 }, 190, 480, 3)}
  <div class="abs z4" style="left:0;right:0;top:1250px;height:130px;background:var(--ink)"></div>
  ${tag("Dinsdag t/m zondag vanaf 12:30", "left:150px;top:1380px;transform:rotate(-2deg)", "ember")}
  ${tag("Noordeinde 12, Zwartewaal", "left:230px;top:1490px;transform:rotate(2deg)", "")}`));

/* ============ REEL-COVERS 1080x1920 ============ */
const cover = (bg, inner) => story(bg, inner);
add("R01", "reels/covers", "R01-frites-in-beeld", "f-story", cover("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "60%")}${dots(0.1)}
  <h1 class="hx xl sh abs z6" style="left:70px;top:300px">Frites<br>in beeld.</h1>
  ${at("frietje", { mood: "wow", pose: "up", size: 1120 }, -20, 600, 3)}`));
add("R02", "reels/covers", "R02-snack-tijd", "f-story", cover("bg-night", `
  ${burst("var(--night)", "var(--night-2)", "50%", "60%")}${dots(0.14)}
  <h1 class="hx xl abs z6" style="left:70px;top:300px;color:var(--sun);text-shadow:8px 8px 0 var(--ember)">Snack-<br>tijd.</h1>
  ${at("snack", { mood: "happy", pose: "cheer", size: 1080, rot: 4 }, 0, 640, 3)}`));
add("R03", "reels/covers", "R03-pov-afhalen", "f-story", cover("bg-ember", `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "50%", "60%")}${dots(0.12)}
  <h1 class="hx l sh abs z6" style="left:70px;top:300px">POV: je<br>haalt af.</h1>
  ${at("burg", { mood: "cool", pose: "point", size: 1020 }, -30, 620, 3)}
  ${tag("Noordeinde 12", "left:600px;top:1300px;transform:rotate(4deg)", "sun")}`));
add("R04", "reels/covers", "R04-kijkje-in-de-zon", "f-story", cover("bg-paper", `
  ${burst("var(--paper)", "var(--paper-2)", "50%", "60%")}${dots(0.1)}
  <h1 class="hx l shs abs z6" style="left:70px;top:300px">Kijkje<br>bij De Zon.</h1>
  ${at("zon", { mood: "wink", pose: "cheer", size: 1020 }, 20, 620, 3)}`));
add("R05", "reels/covers", "R05-alleen-bij-de-cafetaria", "f-story", cover("bg-paper2", `
  ${burst("var(--paper-2)", "var(--paper)", "50%", "60%")}${dots(0.1)}
  <h1 class="hx m shs abs z6" style="left:70px;top:290px">Dingen die je<br>alleen bij de<br>cafetaria hoort.</h1>
  ${at("frietje", { mood: "happy", pose: "wave", size: 560 }, -80, 860, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 660 }, 130, 800, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 540 }, 480, 880, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 490 }, 700, 910, 5)}`));

/* ============ PROFIEL EN HIGHLIGHTS ============ */
add("P01", "assets/profiel", "profielfoto-1080", "f-square", `<div class="post bg-sun f-square">${burst("var(--sun)", "var(--amber)", "50%", "50%")}${at("zon", { mood: "cool", pose: "none", size: 820 }, 130, 50, 3)}</div>`);
add("P02", "assets/profiel", "facebook-omslag-1640x624", "f-cover", `<div class="post bg-sun f-cover">${burst("var(--sun)", "var(--amber)", "35%", "50%")}${dots(0.1)}
  <h1 class="hx m sh abs z6" style="left:80px;top:70px;font-size:104px">Cafetaria<br>De Zon.</h1>
  ${tag("Noordeinde 12, Zwartewaal", "left:90px;top:360px;transform:rotate(-2deg)", "ember")}
  ${tag("Bel 0181 66 36 69 · pinnen of contant", "left:90px;top:460px;transform:rotate(1.5deg);font-size:36px", "")}
  ${at("frietje", { mood: "happy", pose: "wave", size: 330 }, 700, 270, 4)}
  ${at("burg", { mood: "cool", pose: "hips", size: 390 }, 880, 230, 5)}
  ${at("snack", { mood: "wink", pose: "cheer", size: 320 }, 1130, 290, 4)}
  ${at("ijsje", { mood: "happy", pose: "wave", size: 300 }, 1330, 310, 5)}
  ${at("zon", { mood: "cool", pose: "cheer", size: 300 }, 1330, -40, 3)}</div>`);
const hl = (id, name, inner) => add(id, "assets/profiel", `highlight-${name}`, "f-story", `<div class="post bg-sun f-story">${burst("var(--sun)", "var(--amber)", "50%", "50%")}<div class="abs z2" style="left:190px;top:640px;width:700px;height:700px;border-radius:50%;background:var(--paper);border:10px solid var(--ink);box-shadow:16px 16px 0 var(--ink)"></div>${inner}</div>`);
hl("H01", "kaart", `${at("frietje", { mood: "happy", pose: "wave", size: 470 }, 300, 700, 4)}`);
hl("H02", "tijden", `${at("zon", { mood: "cool", pose: "cheer", size: 520 }, 280, 700, 4)}`);
hl("H03", "route", `${at("snack", { mood: "wink", pose: "point", size: 480 }, 300, 690, 4)}`);
hl("H04", "afhalen", `${at("burg", { mood: "cool", pose: "hips", size: 500 }, 290, 690, 4)}`);

/* ============ SJABLONEN (bewerkbaar) ============ */
add("T01", "templates/sjablonen", "sjabloon-actie-feed", "f-feed", post("bg-ember", `
  ${burst("var(--ember)", "oklch(0.58 0.17 40)", "50%", "60%")}${dots(0.12)}
  ${star("ACTIE", { x: 770, y: 80, size: 260, rot: 10, fs: 54, fill: "var(--sun)" })}
  <h1 class="hx m sh abs z6" style="left:70px;top:260px;max-width:700px">[Wat is de actie?]</h1>
  <p class="abs z6 lead" style="left:70px;top:640px;max-width:11em;font-size:50px">[Geldig van … tot …. Alleen invullen als de eigenaar het bevestigt.]</p>
  ${at("frietje", { mood: "wow", pose: "up", size: 430 }, 600, 640, 4)}
  ${infobar()}`), { template: true });
add("T02", "templates/sjablonen", "sjabloon-foto-feed", "f-feed", post("bg-paper", `
  ${burst("var(--paper)", "var(--paper-2)", "50%", "50%")}${dots(0.1)}
  <div class="hard abs z3" style="left:80px;top:70px;width:920px;height:760px;padding:24px;transform:rotate(-1.5deg)"><div class="slot" style="width:100%;height:100%;border-radius:20px">Foto hier (assets/foto/…)</div></div>
  <h1 class="hx s shs abs z6" style="left:80px;top:880px">[Titel]</h1>
  <p class="abs z6 lead" style="left:80px;top:990px;font-size:42px">[Eén zin.]</p>
  ${at("zon", { mood: "wink", pose: "cheer", size: 280 }, 760, 700, 5)}
  ${infobar()}`), { template: true });
add("T03", "templates/sjablonen", "sjabloon-vraag-story", "f-story", story("bg-sun", `
  ${burst("var(--sun)", "var(--amber)", "50%", "55%")}${dots(0.1)}
  <h1 class="hx m sh abs z6" style="left:70px;top:300px">[Vraag aan je volgers?]</h1>
  ${at("zon", { mood: "wow", pose: "up", size: 600 }, 240, 900, 3)}
  ${tag("Plaats hier de vraag- of poll-sticker", "left:120px;top:1500px;transform:rotate(-2deg)", "ink")}`), { template: true });
