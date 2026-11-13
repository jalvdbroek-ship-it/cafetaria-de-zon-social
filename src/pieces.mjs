// Alle social-stukken als HTML. Bevestigde feiten staan in FACTS; verzin hier niets bij.
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
const foot = (v = "") => `<div class="foot ${v}"><svg class="sunlogo" aria-hidden="true"><use href="#ill-zon"/></svg><span>Cafetaria De Zon</span><span class="grow"></span><span class="dim">Noordeinde 12, Zwartewaal</span></div>`;
const top = (right = "") => `<div class="topbar"><svg class="sunlogo" aria-hidden="true"><use href="#ill-zon"/></svg><span>De Zon</span><span class="grow"></span><span>${right}</span></div>`;
const bel = (cls = "") => `<span class="chip ${cls}">${ic("phone")}Bel ${FACTS.tel}</span>`;
const rays = (cx, cy, r1, r2, from, to, step, sw = 7) => {
  let out = "";
  for (let a = from; a <= to; a += step) {
    const t = (a * Math.PI) / 180;
    out += `<line x1="${(cx + r1 * Math.cos(t)).toFixed(1)}" y1="${(cy - r1 * Math.sin(t)).toFixed(1)}" x2="${(cx + r2 * Math.cos(t)).toFixed(1)}" y2="${(cy - r2 * Math.sin(t)).toFixed(1)}" stroke="var(--ink)" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  return out;
};

const pieces = [];
const add = (id, folder, file, fmt, html, meta = {}) => pieces.push({ id, folder, file, fmt, html, ...meta });

/* ============ FEEDPOSTS 1080x1350 ============ */
add("F01", "feed-posts", "F01-intro-hoi-zwartewaal", "f-feed", `
<div class="post bg-sun f-feed">
  <svg class="abs arc" viewBox="0 0 1080 700" style="left:0;top:542px;width:1080px;height:700px;color:var(--ink)"><path d="M90 700A450 450 0 0 1 990 700"/></svg>
  <svg class="abs" viewBox="0 0 1080 480" style="left:0;top:762px;width:1080px;height:480px">
    ${rays(540, 480, 300, 370, 12, 168, 24)}
    <circle cx="540" cy="480" r="260" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="7"/>
  </svg>
  <div class="pad"><h1 class="h1 m">Hoi<br>Zwartewaal.</h1><p class="lead" style="margin-top:40px;max-width:13em">Wij zijn Cafetaria De Zon, aan het Noordeinde 12.</p></div>
  ${foot("inkfoot")}
</div>`);

add("F02", "feed-posts", "F02-frites-zin-in-frites", "f-feed", `
<div class="post bg-paper f-feed">
  ${abs(ill("frites"), "right:-30px;bottom:130px;width:760px;height:760px;transform:rotate(7deg)")}
  <div class="pad"><h1 class="h1">Zin<br>in<br>frites?</h1></div>
  ${abs(bel("ember"), "left:84px;bottom:160px")}
  <div class="sticker sun" style="left:84px;top:690px">Afhalen kan</div>
  ${foot()}
</div>`);

add("F03", "feed-posts", "F03-hamburgers-burgerzin", "f-feed", `
<div class="post bg-ember f-feed">
  ${abs(ill("hamburger"), "right:-40px;bottom:120px;width:800px;height:800px;transform:rotate(-6deg)")}
  <div class="pad"><h1 class="h1">Burger-<br>zin?</h1><p class="lead" style="margin-top:36px;max-width:11em">Haal ’m af aan het Noordeinde.</p></div>
  ${abs(`<span class="chip">${ic("map-pin")}Noordeinde 12</span>`, "left:84px;bottom:160px")}
  ${foot("sunfoot")}
</div>`);

add("F04", "feed-posts", "F04-snacks-snacktijd-vraag", "f-feed", `
<div class="post bg-night f-feed">
  ${abs(ill("snack"), "right:-20px;bottom:130px;width:700px;height:700px;transform:rotate(8deg)")}
  <div class="pad"><h1 class="h1">Snack-<br>tijd.</h1><p class="lead" style="margin-top:36px;max-width:11em">Wat is jouw favoriet? <span class="accent">Zeg het in de reacties.</span></p></div>
  ${abs(`<span class="chip sun">${ic("message-circle")}Reageer hieronder</span>`, "left:84px;bottom:160px")}
  ${foot("sunfoot")}
</div>`);

add("F05", "feed-posts", "F05-vegetarisch-geen-vlees-ook-prima", "f-feed", `
<div class="post bg-paper2 f-feed">
  ${abs(ill("blad"), "right:-20px;bottom:290px;width:600px;height:600px;transform:rotate(6deg)")}
  <div class="pad"><h1 class="h1 m">Geen<br>vlees?<br><span class="accent">Ook prima.</span></h1><p class="lead" style="margin-top:36px;max-width:11em">Vegetarisch kan bij De Zon.</p></div>
  ${abs(bel("ink"), "left:84px;bottom:160px")}
  ${foot()}
</div>`);

add("F06", "feed-posts", "F06-merkpost-bij-de-zon-schijnt-het-altijd", "f-feed", `
<div class="post bg-sun f-feed">
  <div class="rain"></div>
  <svg class="abs" viewBox="0 0 1080 520" style="left:0;top:722px;width:1080px;height:520px">
    ${rays(540, 520, 330, 410, 8, 172, 18)}
    <circle cx="540" cy="520" r="290" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="7"/>
  </svg>
  <div class="pad"><p class="lead" style="font-size:60px;font-weight:700">Het regent.</p><h1 class="h1 s" style="margin-top:20px">Bij De Zon schijnt het altijd.</h1></div>
  ${foot("inkfoot")}
</div>`);

add("F07", "feed-posts", "F07-achter-de-balie-FOTO-NODIG", "f-feed", `
<div class="post bg-paper f-feed">
  <div class="abs slot" style="left:84px;right:84px;top:84px;height:760px">Hier komt jullie foto<br>van de balie</div>
  <div class="pad" style="padding-top:900px"><h1 class="h1 xs">Een kijkje achter de balie.</h1><p class="lead" style="margin-top:24px;font-size:42px">Zo ziet het eruit aan het Noordeinde.</p></div>
  ${foot()}
</div>`, { needsPhoto: true });

add("F08", "feed-posts", "F08-bezoek-kom-langs", "f-feed", `
<div class="post bg-night f-feed">
  <div class="pad"><h1 class="h1">Kom<br>langs.</h1></div>
  ${abs(`<div style="background:var(--paper);color:var(--ink);border:8px solid var(--ink);outline:6px solid var(--paper);border-radius:28px;padding:44px 56px 48px"><div style="font-size:112px;font-weight:800;letter-spacing:-0.04em;line-height:.95">Noordeinde 12</div><div style="margin-top:14px;font-size:54px;font-weight:700">3238 BG Zwartewaal</div></div>`, "left:84px;right:84px;top:640px")}
  ${abs(`<span class="chip sun">Dinsdag t/m zondag open</span>`, "left:84px;bottom:160px")}
  ${foot("sunfoot")}
</div>`);

add("F09", "feed-posts", "F09-interactie-frites-of-snack", "f-feed", `
<div class="post bg-paper f-feed">
  <div class="abs" style="left:0;top:0;width:540px;height:1242px;background:var(--sun)"></div>
  <div class="abs" style="left:540px;top:0;width:540px;height:1242px;background:var(--ember)"></div>
  <div class="pad"><h1 class="h1 xs" style="position:relative;z-index:3;max-width:6em">Kies<br>er één.</h1></div>
  ${abs(ill("frites"), "left:-30px;top:500px;width:520px;height:520px;transform:rotate(-6deg)")}
  ${abs(ill("snack"), "left:570px;top:500px;width:500px;height:500px;transform:rotate(6deg)")}
  ${abs(`<span style="font-size:110px;font-weight:800;letter-spacing:-0.04em">1</span><br><span style="font-size:64px;font-weight:800">Frites</span>`, "left:84px;top:1020px;line-height:1")}
  ${abs(`<span style="font-size:110px;font-weight:800;letter-spacing:-0.04em;color:var(--paper)">2</span><br><span style="font-size:64px;font-weight:800;color:var(--paper)">Snack</span>`, "left:624px;top:1020px;line-height:1")}
  <div class="abs" style="left:430px;top:380px;width:220px;height:220px;border-radius:50%;background:var(--paper);border:6px solid var(--ink);display:grid;place-items:center;font-size:84px;font-weight:800;z-index:4">of?</div>
  ${foot()}
</div>`);

add("F10", "feed-posts", "F10-afhalen-geen-zin-om-te-koken", "f-feed", `
<div class="post bg-paper f-feed">
  ${abs(ill("frites"), "right:-10px;bottom:130px;width:640px;height:640px;transform:rotate(-5deg)")}
  <div class="pad"><h1 class="h1 m">Geen zin om te koken?</h1><p class="lead" style="margin-top:36px;max-width:12em">Haal het bij De Zon.</p></div>
  <div class="sticker ember" style="left:84px;top:720px">Pinnen of contant</div>
  ${abs(bel("ember"), "left:84px;bottom:160px")}
  ${foot()}
</div>`);

/* ============ CARROUSELS 1080x1350 ============ */
const slide = (bg, n, total, inner, last = false, footV = "") => `
<div class="post ${bg} f-feed">
  ${top("")}
  <div class="count">${n}/${total}</div>
  ${inner}
  ${last ? "" : `<div class="swipe">Swipe ${ic("arrow-right")}</div>`}
  ${foot(footV)}
</div>`;
const catSlide = (bg, n, total, word, tag, ills, footV) =>
  slide(bg, n, total, `
  <div class="pad" style="padding-top:260px"><h1 class="h1 ${word.length > 9 ? "m" : ""}">${word}</h1><p class="lead" style="margin-top:30px;max-width:10em">${tag}</p></div>
  ${ills}`, false, footV);

const C1 = [
  slide("bg-sun", 1, 7, `<div class="pad" style="padding-top:260px"><h1 class="h1">De kaart van De Zon.</h1><p class="lead" style="margin-top:34px">Swipe en kijk wat er is.</p></div>
    ${abs(ill("frites"), "left:30px;bottom:250px;width:420px;height:420px;transform:rotate(-8deg)")}${abs(ill("hamburger"), "left:330px;bottom:310px;width:420px;height:420px;transform:rotate(4deg)")}${abs(ill("snack"), "left:640px;bottom:260px;width:400px;height:400px;transform:rotate(9deg)")}`, false, "inkfoot"),
  catSlide("bg-paper", 2, 7, "Frites", "Daar begint het mee.", abs(ill("frites"), "right:-20px;bottom:120px;width:720px;height:720px;transform:rotate(7deg)")),
  catSlide("bg-ember", 3, 7, "Hamburgers", "Voor de grote trek.", abs(ill("hamburger"), "right:-30px;bottom:120px;width:740px;height:740px;transform:rotate(-6deg)"), "sunfoot"),
  catSlide("bg-night", 4, 7, "Snacks", "Voor erbij, of ervoor.", abs(ill("snack"), "right:-10px;bottom:130px;width:700px;height:700px;transform:rotate(8deg)"), "sunfoot"),
  catSlide("bg-paper2", 5, 7, "Vegetarisch", "Zonder vlees, met smaak.", abs(ill("blad"), "right:0;bottom:120px;width:640px;height:640px;transform:rotate(6deg)")),
  catSlide("bg-sun", 6, 7, "IJs & dranken", "Voor het toetje. Of de dorst.", `${abs(ill("ijs"), "right:230px;bottom:130px;width:480px;height:480px;transform:rotate(-6deg)")}${abs(ill("beker"), "right:10px;bottom:140px;width:420px;height:420px;transform:rotate(8deg)")}`, "inkfoot"),
  slide("bg-night", 7, 7, `<div class="pad" style="padding-top:260px"><h1 class="h1 m">De actuele kaart? Bel of kom langs.</h1></div>
    ${abs(bel("sun"), "left:84px;top:800px")}${abs(`<span class="chip ghost">${ic("map-pin")}Noordeinde 12, Zwartewaal</span>`, "left:84px;top:960px")}`, true, "sunfoot"),
];

const stepSlide = (bg, n, total, num, word, sub, extra = "", last = false, footV = "") =>
  slide(bg, n, total, `<div class="pad" style="padding-top:250px">
    <div style="width:210px;height:210px;border-radius:50%;background:var(--ember);color:var(--paper);border:6px solid var(--ink);display:grid;place-items:center;font-size:140px;font-weight:800;letter-spacing:-0.04em">${num}</div>
    <h1 class="h1" style="margin-top:50px">${word}</h1><p class="lead" style="margin-top:30px;max-width:13em">${sub}</p></div>${extra}`, last, footV);

const C2 = [
  slide("bg-sun", 1, 6, `<div class="pad" style="padding-top:260px"><h1 class="h1">Zin in iets lekkers?</h1><p class="lead" style="margin-top:34px">In vier stappen aan tafel.</p></div>${abs(ill("frites"), "right:-10px;bottom:120px;width:640px;height:640px;transform:rotate(7deg)")}`, false, "inkfoot"),
  stepSlide("bg-paper", 2, 6, "1", "Kies.", "Frites, een burger, snacks, vegetarisch of een ijsje.", `${abs(ill("hamburger"), "right:-20px;bottom:130px;width:560px;height:560px;transform:rotate(-6deg)")}`),
  stepSlide("bg-paper2", 3, 6, "2", "Bel.", `<span style="font-size:76px;font-weight:800;letter-spacing:-0.03em">${FACTS.tel}</span>`, `${abs(`<svg class="icon" style="width:380px;height:380px;color:var(--ember)"><use href="#i-phone"/></svg>`, "right:70px;bottom:190px;transform:rotate(-12deg)")}`),
  stepSlide("bg-ember", 4, 6, "3", "Haal af.", "Aan het Noordeinde 12 in Zwartewaal.", `${abs(`<svg class="icon" style="width:380px;height:380px;color:var(--sun)"><use href="#i-shopping-bag"/></svg>`, "right:70px;bottom:190px;transform:rotate(8deg)")}`, false, "sunfoot"),
  stepSlide("bg-night", 5, 6, "4", "Betaal.", "Pinnen of contant.", `${abs(`<svg class="icon" style="width:360px;height:360px;color:var(--amber)"><use href="#i-credit-card"/></svg>`, "right:80px;bottom:200px;transform:rotate(-8deg)")}`, false, "sunfoot"),
  slide("bg-sun", 6, 6, `<div class="pad" style="padding-top:260px"><h1 class="h1">Smullen!</h1><p class="lead" style="margin-top:34px;max-width:12em">Dinsdag t/m zondag vanaf 12:30 uur.</p></div>${abs(bel("ink"), "left:84px;top:900px")}`, true, "inkfoot"),
];

const keuze = (bg, n, total, num, word, ills, footV, wsize = "") =>
  slide(bg, n, total, `<div class="pad" style="padding-top:250px"><div style="font-size:220px;font-weight:800;letter-spacing:-0.05em;line-height:.8" class="accent">${num}</div><h1 class="h1 ${wsize}" style="margin-top:30px">${word}</h1></div>${ills}`, false, footV);
const C3 = [
  slide("bg-ember", 1, 7, `<div class="pad" style="padding-top:260px"><h1 class="h1 m">Jouw keuze bij De Zon.</h1><p class="lead" style="margin-top:34px;max-width:12em">Swipe en stem in de reacties.</p></div>${abs(ill("snack"), "right:-30px;bottom:120px;width:640px;height:640px;transform:rotate(8deg)")}`, false, "sunfoot"),
  keuze("bg-paper", 2, 7, "1", "Frites", abs(ill("frites"), "right:-20px;bottom:120px;width:700px;height:700px;transform:rotate(7deg)")),
  keuze("bg-sun", 3, 7, "2", "Hamburger", abs(ill("hamburger"), "right:-20px;bottom:120px;width:720px;height:720px;transform:rotate(-6deg)"), "inkfoot", "m"),
  keuze("bg-night", 4, 7, "3", "Snacks", abs(ill("snack"), "right:-10px;bottom:130px;width:680px;height:680px;transform:rotate(8deg)"), "sunfoot"),
  keuze("bg-paper2", 5, 7, "4", "Vegetarisch", abs(ill("blad"), "right:0;bottom:120px;width:620px;height:620px;transform:rotate(6deg)"), "", "m"),
  keuze("bg-ember", 6, 7, "5", "IJs", abs(ill("ijs"), "right:10px;bottom:120px;width:640px;height:640px;transform:rotate(-6deg)"), "sunfoot"),
  slide("bg-sun", 7, 7, `<div class="pad" style="padding-top:260px"><h1 class="h1 m">Welk cijfer is van jou?</h1><p class="lead" style="margin-top:34px;max-width:12em">Reageer hieronder met 1 tot en met 5.</p></div>${abs(`<span class="chip ink">${ic("message-circle")}Jouw cijfer?</span>`, "left:84px;top:860px")}`, true, "inkfoot"),
];
C1.forEach((h, i) => add(`C1-${i + 1}`, "carousels/C1-ontdek-de-menukaart", `C1-slide-${i + 1}`, "f-feed", h));
C2.forEach((h, i) => add(`C2-${i + 1}`, "carousels/C2-zin-in-iets-lekkers", `C2-slide-${i + 1}`, "f-feed", h));
C3.forEach((h, i) => add(`C3-${i + 1}`, "carousels/C3-jouw-keuze", `C3-slide-${i + 1}`, "f-feed", h));

/* ============ STORIES 1080x1920 ============ */
const story = (bg, inner, extra = "") => `<div class="post ${bg} f-story">${top("")}${extra}<div class="pad story">${inner}</div></div>`;

add("S01", "stories", "S01-onze-week", "f-story", story("bg-paper", `<h1 class="h1 s">Onze week.</h1><table class="week" style="margin-top:56px">${FACTS.uren.map(([d, t]) => `<tr class="${t ? "" : "dim"}"><td>${d}</td><td>${t || "Gesloten"}</td></tr>`).join("")}</table>`));
add("S02", "stories", "S02-poll-frites-of-snack", "f-story", story("bg-sun", `<h1 class="h1 m">Frites<br>of snack?</h1>`, `${abs(ill("frites"), "left:-60px;top:900px;width:560px;height:560px;transform:rotate(-8deg)")}${abs(ill("snack"), "right:-40px;top:900px;width:540px;height:540px;transform:rotate(8deg)")}`));
add("S03", "stories", "S03-vraag-jouw-standaard-bestelling", "f-story", story("bg-night", `<h1 class="h1 m">Wat is jouw standaard bestelling?</h1><p class="lead accent" style="margin-top:40px">Typ het hieronder.</p>`, `${abs(ill("hamburger"), "right:-80px;top:1000px;width:560px;height:560px;transform:rotate(-8deg)")}`));
add("S04", "stories", "S04-afhalen-pin-of-contant", "f-story", story("bg-ember", `<h1 class="h1 m">Haal af.<br>Pin of contant.</h1><p class="lead" style="margin-top:40px">Noordeinde 12, Zwartewaal.</p>`, `${abs(`<svg class="icon" style="width:420px;height:420px;color:var(--sun)"><use href="#i-shopping-bag"/></svg>`, "right:80px;top:1040px;transform:rotate(8deg)")}`));
add("S05", "stories", "S05-route-noordeinde-12", "f-story", story("bg-night", `<h1 class="h1 m">Zo kom je bij De Zon.</h1><div style="margin-top:60px;background:var(--paper);color:var(--ink);border:8px solid var(--ink);outline:6px solid var(--paper);border-radius:28px;padding:40px 48px"><div style="font-size:98px;font-weight:800;letter-spacing:-0.04em;line-height:.95">Noordeinde 12</div><div style="margin-top:12px;font-size:50px;font-weight:700">3238 BG Zwartewaal</div></div><p style="margin-top:56px"><span class="chip sun">Dinsdag t/m zondag open</span></p>`));
add("S06", "stories", "S06-weekend-tot-23-uur", "f-story", story("bg-sun", `<h1 class="h1 m">Het weekend.</h1><p class="lead" style="margin-top:36px;max-width:10em">Vrijdag en zaterdag open tot 23:00 uur.</p>`, `<svg class="abs" viewBox="0 0 1080 700" style="left:0;top:1100px;width:1080px;height:700px">${rays(540, 700, 330, 420, 10, 170, 20)}<circle cx="540" cy="700" r="290" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="7"/></svg>`));
add("S07", "stories", "S07-ijsje", "f-story", story("bg-paper2", `<h1 class="h1 m">Een<br>ijsje?</h1><p class="lead" style="margin-top:36px">Ja, dat hebben we ook.</p>`, `${abs(ill("ijs"), "right:20px;top:960px;width:640px;height:640px;transform:rotate(-8deg)")}`));
add("S08", "stories", "S08-lokaal-wie-neem-jij-mee", "f-story", story("bg-ember", `<h1 class="h1 m">Wie neem jij mee naar De Zon?</h1><p class="lead" style="margin-top:40px">Tag een Zwartewaler.</p>`, `${abs(`<svg class="icon" style="width:380px;height:380px;color:var(--sun)"><use href="#i-users"/></svg>`, "right:90px;top:1050px;transform:rotate(-6deg)")}`));

/* ============ REEL-COVERS 1080x1920 (tekst binnen de middelste 1080x1350) ============ */
const cover = (bg, inner) => `<div class="post ${bg} f-story"><div class="pad" style="padding:420px 84px 0">${inner}</div></div>`;
add("R01", "reels/covers", "R01-frites-in-beeld", "f-story", cover("bg-sun", `<h1 class="h1 m">Frites in beeld.</h1>${abs(ill("frites"), "right:-50px;top:900px;width:700px;height:700px;transform:rotate(7deg)")}`));
add("R02", "reels/covers", "R02-snack-tijd", "f-story", cover("bg-night", `<h1 class="h1 m">Snack-<br>tijd.</h1>${abs(ill("snack"), "right:-20px;top:900px;width:680px;height:680px;transform:rotate(8deg)")}`));
add("R03", "reels/covers", "R03-pov-afhalen", "f-story", cover("bg-ember", `<h1 class="h1 m">POV: je haalt af.</h1>${abs(`<svg class="icon" style="width:400px;height:400px;color:var(--sun)"><use href="#i-shopping-bag"/></svg>`, "right:90px;top:1000px;transform:rotate(8deg)")}`));
add("R04", "reels/covers", "R04-kijkje-in-de-zon", "f-story", cover("bg-paper", `<h1 class="h1 m">Kijkje bij De Zon.</h1>${abs(ill("zon"), "right:20px;top:950px;width:560px;height:560px;color:var(--ember-bright)")}`));
add("R05", "reels/covers", "R05-alleen-bij-de-cafetaria", "f-story", cover("bg-paper2", `<h1 class="h1 s">Dingen die je alleen bij de cafetaria hoort.</h1>${abs(ill("hamburger"), "right:-20px;top:1000px;width:620px;height:620px;transform:rotate(-6deg)")}`));

/* ============ PROFIEL EN HIGHLIGHTS ============ */
add("P01", "assets/profiel", "profielfoto-1080", "f-square", `<div class="post bg-sun f-square"><svg class="abs" viewBox="0 0 1080 1080" style="inset:0;width:100%;height:100%"><g transform="translate(540 540)">${rays(0, 0, 260, 380, 0, 337.5, 22.5, 22).replaceAll("var(--ink)", "var(--ink)")}<circle r="190" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="22"/></g></svg></div>`);
add("P02", "assets/profiel", "facebook-omslag-1640x624", "f-cover", `<div class="post bg-sun f-cover"><svg class="abs arc" viewBox="0 0 700 360" style="right:60px;top:200px;width:700px;height:360px;color:var(--ink)"><path d="M30 340A320 320 0 0 1 670 340"/></svg><svg class="abs" viewBox="0 0 700 360" style="right:60px;top:200px;width:700px;height:360px">${rays(350, 340, 120, 175, 10, 170, 20, 9)}<circle cx="350" cy="340" r="100" fill="var(--ember-bright)" stroke="var(--ink)" stroke-width="9"/></svg><div class="abs" style="left:90px;top:130px;color:var(--ink)"><div style="font-size:150px;font-weight:800;letter-spacing:-0.045em;line-height:.9">Cafetaria<br>De Zon</div><div style="margin-top:28px;font-size:42px;font-weight:700;line-height:1.2">Noordeinde 12, Zwartewaal<br>${FACTS.tel}</div></div></div>`);
const hl = (id, name, inner) => add(id, "assets/profiel", `highlight-${name}`, "f-story", `<div class="post bg-sun f-story"><div class="abs" style="left:240px;top:660px;width:600px;height:600px;border-radius:50%;background:var(--paper);border:10px solid var(--ink);display:grid;place-items:center">${inner}</div></div>`);
hl("H01", "kaart", `<div style="width:360px;height:360px">${ill("frites")}</div>`);
hl("H02", "tijden", `<svg class="icon" style="width:340px;height:340px;color:var(--ink)"><use href="#i-clock"/></svg>`);
hl("H03", "route", `<svg class="icon" style="width:340px;height:340px;color:var(--ember)"><use href="#i-navigation"/></svg>`);
hl("H04", "afhalen", `<svg class="icon" style="width:340px;height:340px;color:var(--ember)"><use href="#i-shopping-bag"/></svg>`);

/* ============ SJABLONEN (bewerkbaar) ============ */
add("T01", "templates/sjablonen", "sjabloon-actie-feed", "f-feed", `
<div class="post bg-ember f-feed">
  <div class="sticker sun" style="right:84px;top:90px">ACTIE</div>
  <div class="pad" style="padding-top:260px"><h1 class="h1 m">[Wat is de actie?]</h1><p class="lead" style="margin-top:36px;max-width:12em">[Geldig van … tot …. Alleen invullen als de eigenaar het bevestigt.]</p></div>
  ${abs(bel("sun"), "left:84px;bottom:160px")}
  ${foot("sunfoot")}
</div>`, { template: true });
add("T02", "templates/sjablonen", "sjabloon-foto-feed", "f-feed", `
<div class="post bg-paper f-feed">
  <div class="abs photo" style="left:84px;right:84px;top:84px;height:820px"><div class="slot" style="width:100%;height:100%;border:0;border-radius:0">Foto hier (assets/foto/…)</div></div>
  <div class="pad" style="padding-top:960px"><h1 class="h1 xs">[Titel]</h1><p class="lead" style="margin-top:18px;font-size:42px">[Eén zin.]</p></div>
  ${foot()}
</div>`, { template: true });
add("T03", "templates/sjablonen", "sjabloon-vraag-story", "f-story", story("bg-sun", `<h1 class="h1 m">[Vraag aan je volgers?]</h1><p class="lead" style="margin-top:40px">Plaats hieronder de vraag- of pollsticker.</p>`), { template: true });

export default pieces;
