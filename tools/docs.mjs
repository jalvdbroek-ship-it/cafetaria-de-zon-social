// Genereert captions, kalender, videoformats, merkrichtlijnen en de presentatie (HTML + PDF).
// Gebruik: node tools/docs.mjs [--pdf]
import { loadPlaywright } from "./browser.mjs";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const sm = join(dirname(fileURLToPath(import.meta.url)), "..");
const { default: pieces } = await import(pathToFileURL(join(sm, "src/pieces.mjs")).href);
const { captions, videos, opnamelijst, kalender } = await import(pathToFileURL(join(sm, "src/content.mjs")).href);
const { char, CAST } = await import(pathToFileURL(join(sm, "src/personages.mjs")).href);
const withPdf = process.argv.includes("--pdf");
// Elke tabel in een zijwaarts scrollbaar vak, zodat de pagina op een telefoon niet te breed wordt
const scrollTables = (t) => t.replace(/<div class="scroll-x">(<table[\s\S]*?<\/table>)<\/div>/g, "$1").replace(/<table[\s\S]*?<\/table>/g, (m) => `<div class="scroll-x" role="region" tabindex="0" aria-label="Tabel, scroll zijwaarts voor meer kolommen">${m}</div>`);
const w = (rel, text) => { const p = join(sm, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, rel.endsWith(".html") ? scrollTables(text) : text); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""').replaceAll("\n", " ")}"`).join(";")).join("\n");
const by = Object.fromEntries(pieces.map((p) => [p.id, p]));
const capBy = Object.fromEntries(captions.map((c) => [c.id, c]));
const DAYS = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const dagNaam = (iso) => DAYS[new Date(iso + "T12:00:00Z").getUTCDay()];
const datumNl = (iso) => new Date(iso + "T12:00:00Z").toLocaleDateString("nl-NL", { day: "numeric", month: "short", timeZone: "UTC" });

const group = (p) => (p.folder.startsWith("feed") ? "feed" : p.folder.startsWith("carousels") ? "carrousels" : p.folder.startsWith("stories") ? "stories" : p.folder.startsWith("reels") ? "reel-covers" : "profiel");
const src = (id, pre = "") => {
  const p = by[id];
  if (p.needsPhoto || p.template) return `${pre}${p.folder}/${p.file}.png`;
  const g = group(p);
  return `${pre}exports/${g}/${p.file}.${g === "profiel" ? "png" : "jpg"}`;
};

/* ---------- statistiek ---------- */
const stat = (t) => kalender.filter((k) => k.t === t).length;
const uniq = (t) => new Set(kalender.filter((k) => k.t === t).map((k) => k.id)).size;
const stats = { feed: uniq("Feed"), car: uniq("Carrousel"), storyPlacements: stat("Story"), storyUnique: uniq("Story"), reels: stat("Reel"), days: new Set(kalender.map((k) => k.d)).size };
console.log("Statistiek:", stats);

/* ---------- captions ---------- */
w("captions/captions.md", `# Captions\n\nAlleen bevestigde feiten. Emoji: maximaal één per bericht (🌞). Hashtags: 3 tot 6.\n\n${captions.map((c) => `## ${c.id}: ${c.naam}\n\n- **Plaatsing:** ${c.platform}\n- **Doel:** ${c.doel}\n- **CTA:** ${c.cta}\n- **Beeld:** ${c.beeld}\n\n${c.tekst}\n\n${c.tags}\n`).join("\n")}\n## Videoformats V1 tot V5\n\n${videos.map((v) => `### ${v.id}: ${v.titel}\n\n${v.caption}\n\n${v.tags}\n`).join("\n")}`);
w("captions/captions.csv", csv([["ID", "Naam", "Plaatsing", "Doel", "CTA", "Beeld", "Caption", "Hashtags"], ...captions.map((c) => [c.id, c.naam, c.platform, c.doel, c.cta, c.beeld, c.tekst, c.tags]), ...videos.map((v) => [v.id, v.titel, "Reel (echte opname)", v.doel, v.cta, v.beeld, v.caption, v.tags])]));

/* ---------- kalender ---------- */
const capText = (id) => capBy[id]?.tekst || videos.find((v) => v.id === id)?.caption || "";
const rows = kalender.map((k) => [datumNl(k.d), dagNaam(k.d), k.p, k.t, k.id, k.onderwerp, k.doel, k.beeld, k.cta, k.status, capText(k.id)]);
const head = ["Datum", "Dag", "Platform", "Type", "ID", "Onderwerp", "Doel", "Benodigd beeld", "CTA", "Status", "Caption"];
w("content-calendar/kalender-30-dagen.csv", csv([head, ...rows]));
w("content-calendar/kalender-30-dagen.md", `# Contentkalender: 23 november t/m 22 december 2026\n\nMaandag is gesloten (story over de week). Captions staan in \`captions/captions.md\`.\n\n| ${head.slice(0, 10).join(" | ")} |\n|${head.slice(0, 10).map(() => " --- ").join("|")}|\n${rows.map((r) => `| ${r.slice(0, 10).join(" | ")} |`).join("\n")}\n\n## Publicatiemomenten\n\nGeen bewezen optimale tijden zonder accountdata. Startadvies om te toetsen met Insights: berichten rond het avondeten in de late namiddag, weekendberichten op vrijdag.\n`);

/* ---------- videoformats ---------- */
for (const v of videos) {
  w(`reels/${v.id}-${v.titel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.md`, `# ${v.id}: ${v.titel}\n\n- **Formaat:** 9:16, 1080 × 1920 px, 30 fps, ${v.duur}\n- **Concept:** ${v.concept}\n- **Doel:** ${v.doel}\n- **Beeldmateriaal:** ${v.beeld}\n- **Cover:** \`reels/covers/${by[v.cover].file}.png\`\n\n## Shots\n\n${v.shots.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n## Camerabewegingen\n\n${v.camera}\n\n## Tekst in beeld\n\n${v.tekst}\n\n## Voice-over\n\n${v.voice}\n\n## Muziekstijl\n\n${v.muziek}\n\n## Montage\n\n${v.montage}\n\n## Caption en CTA\n\n${v.caption}\n\n${v.tags}\n\n**CTA:** ${v.cta}\n\n## Rechten\n\nAlleen eigen opnames. Personen alleen met schriftelijke toestemming. Muziek volgens \`legal/muziek-en-rechten.md\`.\n`);
}
w("reels/opnamelijst.md", `# Opnamelijst voor De Zon\n\nVoor één opnamemiddag (ongeveer twee uur, op een rustig moment, bijvoorbeeld 13:00 tot 15:00). Gebruik een smartphone in staand formaat (9:16) met schone lens en daglicht. Alle beelden zijn van de échte zaak en de échte producten.\n\n## Foto's en video\n\n${opnamelijst.map((o) => `- [ ] ${o}`).join("\n")}\n\n## Tips\n\n- Filmen in 4K of 1080p, 30 of 60 fps; voor slow motion 120 fps.\n- Houd de telefoon stil of leun hem tegen de balie.\n- Geen merken van derden of klantgegevens in beeld.\n- Vraag medewerkers vooraf om toestemming (zie \`legal/muziek-en-rechten.md\`).\n- Zet de beelden in een gedeelde map; wij monteren en plaatsen ze in de templates.\n`);

/* ---------- bouwstenen voor HTML ---------- */
const sprite = (() => {
  const ill = readFileSync(join(sm, "assets/illustraties.svg"), "utf8").trim();
  return `<svg class="sprite" aria-hidden="true">${ill}</svg>`;
})();
const fig = (id, pre, label) => `<figure><img src="${src(id, pre)}" alt="${esc(label || id)}" loading="lazy"><figcaption>${esc(label || id)}</figcaption></figure>`;
const headHtml = (title, pre) => `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="Concept voor Cafetaria De Zon in Zwartewaal: social media-pakket met posts, carrousels, stories, video en captions. Nog niet gepubliceerd."><meta name="robots" content="noindex"><link rel="stylesheet" href="${pre}assets/brand.css"><link rel="stylesheet" href="${pre}assets/doc.css"></head><body class="doc">${sprite}`;

const colors = [
  ["Zonnegeel", "--sun", "#F7B500", "Primair: vlakken, accenten", "9,1 : 1 met inkt"],
  ["Crème", "--paper", "#FFF6E0", "Primair: achtergrond", "15,4 : 1 met inkt"],
  ["Inktbruin", "--ink", "#2B1B10", "Primair: tekst en lijnen", "n.v.t."],
  ["Brandoranje", "--ember", "#B93D00", "Primair: knoppen, stickers, vlakken", "5,2 : 1 met crème"],
  ["Heldere oranje", "--ember-bright", "#E8590C", "Secundair: zon en illustraties (geen tekst)", "4,6 : 1 met inkt"],
  ["Nacht", "--night", "#1F1B18", "Secundair: avond, infoband", "15,2 : 1 met nachttekst"],
  ["Amber", "--amber", "#FFB020", "Secundair: accent op nacht", "9,3 : 1 op nacht"],
  ["Crème 2", "--paper-2", "#FBE9BE", "Secundair: rustige vlakken", "13,8 : 1 met inkt"],
  ["Sla", "--leaf", "#6B8F3D (benadering)", "Alleen voor Slaatje (vegetarisch)", "n.v.t."],
];
const swatches = `<div class="swatches">${colors.map(([n, v, hex, use, c]) => `<div class="sw"><div class="chipc" style="background:var(${v})"></div><div class="meta"><b>${n}</b>${hex}<br>${use}<br>${c}</div></div>`).join("")}</div>`;
const illSet = Object.entries(CAST).map(([k, n]) => `<div>${char(k, { size: 150, style: "position:relative" })}${n}</div>`).join("");

/* ---------- merkrichtlijnen ---------- */
const guidelines = `${headHtml("Merkrichtlijnen social media: Cafetaria De Zon", "../")}
<header class="cover"><div class="wrap"><h1>Merkrichtlijnen social media</h1><p>Cafetaria De Zon, Zwartewaal. Dit document hoort bij de goedgekeurde website en vertaalt de huisstijl naar Instagram en Facebook.</p></div></header>
<section><div class="wrap"><h2>Karakter</h2>
<p>De Zon is warm, gezellig en een beetje speels. We praten als een buur: kort, vriendelijk, met een knipoog. We beloven niets wat niet is bevestigd.</p>
<div class="grid c3"><div class="callout"><b>Wel</b><br>Korte zinnen. "Jij" en "je". Eén grap per bericht. Altijd adres of telefoon erbij waar het kan.</div><div class="callout"><b>Niet</b><br>Hype ("de allerlekkerste"), verzonnen acties, prijzen zonder bevestiging, "vers" of "ambachtelijk" zonder bewijs.</div><div class="callout"><b>Emoji</b><br>Maximaal één per bericht, bij voorkeur 🌞. Nooit als vervanging van woorden en nooit in de afbeelding.</div></div></div></section>
<section><div class="wrap"><h2>Kleuren</h2>${swatches}<p class="small">Gebruik per afbeelding één dominante kleur (zonnegeel, crème, brandoranje of nacht). Tekst altijd inktbruin op geel of crème, crème op oranje, nachttekst op nacht. Contrastwaarden zijn gemeten met de WCAG-formule.</p></div></section>
<section><div class="wrap"><h2>Typografie</h2>
<p style="font-size:clamp(44px,12vw,96px);font-weight:800;letter-spacing:-0.04em;line-height:.95">Bricolage Grotesque</p>
<table><tr><th>Rol</th><th>Gebruik</th><th>Gewicht en maat (feed 1080 breed)</th></tr><tr><td>Kop</td><td>Eén tot vier woorden, korte zinnen</td><td>800, 100 tot 160 px, regelafstand 0,9, letterafstand -4,5%</td></tr><tr><td>Lead</td><td>Eén ondersteunende zin</td><td>600, 42 tot 48 px</td></tr><tr><td>Chip</td><td>CTA (bel, adres, reageer)</td><td>800, 46 px, rand 5 px inkt</td></tr><tr><td>Infoband</td><td>Naam en adres</td><td>700, 30 px</td></tr></table>
<p class="small">Lettertype: SIL Open Font License 1.1. Verbind de woorden "De Zon" in een kop met een vaste spatie zodat de naam niet breekt.</p></div></section>
<section><div class="wrap"><h2>Herbruikbare elementen</h2>
<h3>Illustraties</h3><div class="illset">${illSet}</div>
<p class="small">De bende van De Zon: Zon, Frietje, Burg, Snack, IJsje en Slaatje. Eigen tekeningen met dikke inktlijn en vlakke kleuren, elk met een gezicht, armen en benen. Ze praten in stripballonnen en reageren op elkaar. Alleen figuurtjes voor producten die echt bestaan; geen A-merken. Gezichten: blij, cool (zonnebril), verrast, knipoog, slaperig en verdrietig.</p>
<h3>Kaders en vlakken</h3><p>Zonnestraal-achtergronden met een fijn stippenraster, harde inktschaduwen op kaarten, ballonnen en stickers, en een donkere infoband onderaan met openingstijden, adres, telefoon en "pinnen of contant". De figuurtjes staan achter de toonbank (de infoband). Stickers zijn sterren met 6 px inktrand, licht gekanteld.</p>
<h3>CTA-stijlen</h3><div class="grid c4"><div><span class="chip ember">Bel 0181 66 36 69</span></div><div><span class="chip">Noordeinde 12</span></div><div><span class="chip sun">Reageer hieronder</span></div><div><span class="chip ink">Vraag ernaar</span></div></div>
<h3>Iconen</h3><p>Lucide (ISC-licentie), lijndikte 2, afgeronde uiteinden: telefoon, route, tas, pas, reactie, mensen, klok.</p></div></section>
<section><div class="wrap"><h2>Formaten en veilige zones</h2><table><tr><th>Plaatsing</th><th>Formaat</th><th>Regel</th></tr><tr><td>Instagram en Facebook feed</td><td>1080 × 1350 px (4:5)</td><td>Infoband onderaan; tekst niet dichter dan 84 px bij de rand</td></tr><tr><td>Carrousel</td><td>1080 × 1350 px</td><td>Teller bovenin, swipe-aanwijzing linksonder, laatste slide met CTA</td></tr><tr><td>Stories en Reels</td><td>1080 × 1920 px (9:16)</td><td>Houd de bovenste 250 px en onderste 340 px vrij van belangrijke tekst</td></tr><tr><td>Reel-covers</td><td>1080 × 1920 px</td><td>Titel binnen de middelste 1080 × 1350 px, zodat de uitsnede in het profielraster werkt</td></tr><tr><td>Profielfoto</td><td>1080 × 1080 px</td><td>Cirkelvormig bijgesneden: zon blijft midden</td></tr><tr><td>Facebook-omslag</td><td>1640 × 624 px</td><td>Naam links, zon rechts</td></tr></table></div></section>
<section><div class="wrap"><h2>Fotostijl</h2>
<p>Er zijn nog geen eigen foto's. Zodra die er zijn:</p><ul><li>Daglicht, dichtbij, warm. De Zon en het echte eten staan centraal.</li><li>Alleen producten die echt worden verkocht, zoals ze worden geserveerd.</li><li>Geen stockbeelden van andere zaken, geen AI-foodbeelden.</li><li>Eenvoudige achtergrond (balie, papier, bakje). Geen filters die het eten oranje maken.</li><li>Personen alleen met schriftelijke toestemming.</li></ul>
<p>Bij een foto in een post gebruik je het sjabloon <code>templates/sjablonen/sjabloon-foto-feed</code>.</p></div></section>
<section><div class="wrap"><h2>Voorbeelden</h2><div class="grid c4">${["P01", "F01", "F12", "S01"].map((i) => fig(i, "../", i)).join("")}</div></div></section>
<section><div class="wrap"><h2>Sjablonen gebruiken</h2><p>Elk ontwerp is een HTML-bestand in <code>templates/html</code>. Pas de tekst aan in een editor, draai <code>node tools/render.mjs</code> en nieuwe PNG- en JPG-bestanden verschijnen in de mappen en in <code>exports</code>. Gebruik de sjablonen in <code>templates/sjablonen</code> voor acties, foto's en vragen.</p></div></section>
</body></html>`;
w("brand-guidelines/brand-guidelines.html", guidelines);

/* ---------- presentatie ---------- */
const fp = (ids, pre = "", cls = "c5") => `<div class="grid ${cls}">${ids.map((i) => fig(i, pre, `${i}: ${capBy[i]?.naam || ""}`)).join("")}</div>`;
const c1 = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `C1-${n}`), c2 = [1, 2, 3, 4, 5, 6].map((n) => `C2-${n}`), c3 = [1, 2, 3, 4, 5, 6, 7].map((n) => `C3-${n}`);
const videoFiles = [["M1-de-zon-gaat-op", "M1: De Zon gaat op (9 s)"], ["M2-zin-in-categorieen", "M2: Zin in… (9 s)"], ["M3-afhalen-in-3-stappen", "M3: Afhalen in 3 stappen (10 s)"], ["M4-frietje-tegen-burg", "M4: Frietje tegen Burg (10 s)"]];

const deck = `${headHtml("Social media pakket: Cafetaria De Zon", "")}
<nav class="nav"><div class="wrap"><a href="#samenvatting">Samenvatting</a><a href="#basis">Basis</a><a href="#strategie">Strategie</a><a href="#design">Design</a><a href="#feed">Feed</a><a href="#carrousels">Carrousels</a><a href="#stories">Stories</a><a href="#video">Video</a><a href="#kalender">Kalender</a><a href="#captions">Captions</a><a href="#tools">Tools</a><a href="#juridisch">Juridisch</a><a href="#advies">Advies</a></div></nav>
<header class="cover"><div class="wrap"><h1>Cafetaria De Zon op social media</h1><p>Eerste complete pakket voor Instagram en Facebook. Een WebRnds-oplevering, gebouwd op de goedgekeurde website. Concept ter beoordeling, niets is op Instagram of Facebook geplaatst.</p><div class="castrow">${Object.keys(CAST).map((k, i) => char(k, { mood: ["cool", "happy", "cool", "wink", "happy", "happy"][i], pose: ["cheer", "wave", "hips", "cheer", "wave", "hips"][i], size: 196, style: "position:relative" })).join("")}</div></div></header>

<section id="samenvatting"><div class="wrap"><h2>Wat je krijgt</h2>
<div class="grid c4"><div class="callout"><b>13 feedposts</b><br>12 direct publiceerbaar, 1 wacht op een foto van de balie</div><div class="callout"><b>3 carrousels</b><br>8, 6 en 7 slides</div><div class="callout"><b>10 stories</b><br>plus 3 sjablonen en 4 highlight-covers</div><div class="callout"><b>4 video's + 5 videoformats</b><br>4 motion-reels (MP4), 5 formats met echte opnames</div></div>
<p>Plus: merkrichtlijnen, strategie, contentkalender voor 30 dagen (${stats.days} dagen, ${kalender.length} plaatsingen), alle captions, opnamelijst, rechtenoverzicht en bewerkbare bronbestanden.</p>
<div class="callout"><b>Eerlijk vooraf:</b> er zijn nog geen eigen foto's, geen bevestigde producten, prijzen of acties en geen bestaande social accounts gevonden. Daarom is dit pakket grafisch (eigen illustraties en typografie) en staat er een opnamelijst klaar. Alles wat in beeld staat is bevestigd: naam, adres, telefoon, tijden, pin en contant, afhalen en de categorieën.</div></div></section>

<section id="basis"><div class="wrap"><h2>Basis en onderzoek</h2>
<table><tr><th>Bevestigd (bron: website, Eatbu-pagina van De Zon)</th><th>Niet bevestigd, dus niet gebruikt</th></tr><tr><td>Cafetaria De Zon, Noordeinde 12, 3238 BG Zwartewaal<br>0181 66 36 69<br>Di t/m do 12:30 tot 22:00, vr en za tot 23:00, zo tot 21:00, ma gesloten<br>Pin en contant, afhalen<br>Categorieën: frites, hamburgers, snacks, vegetarisch, ijs, dranken</td><td>Productnamen en prijzen (voorbeeldmenu op de site)<br>Acties en aanbiedingen<br>Bezorgen, terras, geschiedenis, team<br>Beoordelingen<br>Bestaande Facebook- of Instagrampagina<br>Definitief domein van de website</td></tr></table>
<ul><li><b>Huisstijl:</b> kleuren, lettertype, illustraties en toon komen van de goedgekeurde website.</li><li><b>Accounts:</b> zoeken leverde geen bevestigd account op; controleer in de apps of er al een pagina bestaat.</li><li><b>Concurrentie:</b> in deze sessie leverde onderzoek geen betrouwbare, bronvaste voorbeelden op. Er is niets gekopieerd.</li><li><b>Cijfers:</b> geen verifieerbare Nederlandse gebruiksstatistieken per leeftijd gevonden; de kanaalkeuze is een redenering die na vier weken met Insights wordt getoetst.</li><li><b>Let op:</b> in de klantmap staat een oudere sitebouw met een uitgebreidere kaart (zoals milkshakes en een terras). Die beweringen zijn niet door de eigenaar bevestigd en dus niet overgenomen.</li></ul></div></section>

<section id="strategie"><div class="wrap"><h2>Strategie</h2>
<table><tr><th>Kanaal</th><th>Rol</th><th>Prioriteit</th></tr><tr><td>Facebook</td><td>Lokale vindbaarheid, tijden, route, buurtgroepen</td><td>Hoog</td></tr><tr><td>Instagram</td><td>Beeld, reels, stories, interactie</td><td>Hoog</td></tr><tr><td>TikTok</td><td>Alleen hergebruik van reels</td><td>Laag, later</td></tr></table>
<h3>Contentpijlers</h3><div class="grid c4"><div class="callout"><b>1 Producten</b><br>per categorie, zonder verzonnen namen</div><div class="callout"><b>2 Frites en snacks</b><br>echte beelden vanaf week 2</div><div class="callout"><b>3 Jouw keuze</b><br>polls en vragen</div><div class="callout"><b>4 Afhalen en praktisch</b><br>tijden, pin of contant, route</div><div class="callout"><b>5 Achter de balie</b><br>alleen met toestemming</div><div class="callout"><b>6 Lokaal</b><br>Zwartewaal, taggen, buurtgroepen</div><div class="callout"><b>7 Humor en seizoen</b><br>zon, regen, winter</div><div class="callout"><b>8 Acties</b><br>alleen na bevestiging; sjabloon staat klaar</div></div>
<h3>Lokaal</h3><ul><li>Zwartewaal altijd zichtbaar: locatie taggen, adres tonen, hashtags #zwartewaal #voorneaanzee.</li><li>Buurtgroepen alleen na toestemming van de beheerders.</li><li>Reageren binnen een dag; één vaste contactpersoon.</li><li>Offline naar online: kleine sticker "Volg De Zon" op de afhaalzak zodra de accountnaam vaststaat.</li></ul>
<p>Volledige strategie: <a href="strategy/strategie.md">strategy/strategie.md</a></p></div></section>

<section id="design"><div class="wrap"><h2>Design system</h2><p>Dezelfde kleuren en typografie als de website: zonnegeel, crème, brandoranje, inktbruin en nacht, in Bricolage Grotesque. Nieuw: de bende van De Zon, zes figuurtjes met een eigen karakter die in alle posts, stories en video's terugkomen.</p>${swatches}<h3>Illustraties</h3><div class="illset">${illSet}</div><h3>Profiel en highlights</h3><div class="grid c5">${["P01", "H01", "H02", "H03", "H04"].map((i) => fig(i, "")).join("")}</div><div style="margin-top:16px">${fig("P02", "", "Facebook-omslag 1640 × 624")}</div><p>Volledige richtlijnen: <a href="brand-guidelines/brand-guidelines.html">merkrichtlijnen</a> (HTML en PDF).</p></div></section>

<section id="feed"><div class="wrap"><h2>13 feedposts</h2>${fp(["F01", "F02", "F03", "F04", "F05"])}<div style="height:20px"></div>${fp(["F06", "F07", "F08", "F09", "F10"])}<div style="height:20px"></div>${fp(["F11", "F12", "F13"], "", "c3")}<p class="small">F07 (achter de balie) is een sjabloon en wacht op een echte foto. De andere twaalf zijn klaar om te plaatsen. Formaat 1080 × 1350 px.</p></div></section>

<section id="carrousels"><div class="wrap"><h2>3 carrousels</h2><h3>C1: Ontmoet de bende</h3><div class="grid c8">${c1.map((i) => fig(i, "", i.split("-")[1])).join("")}</div><h3>C2: Afhalen in 4 stappen</h3><div class="grid c6">${c2.map((i) => fig(i, "", i.split("-")[1])).join("")}</div><h3>C3: Welk type ben jij?</h3><div class="grid c7">${c3.map((i) => fig(i, "", i.split("-")[1])).join("")}</div></div></section>

<section id="stories"><div class="wrap"><h2>10 stories</h2><div class="grid c4">${["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10"].map((i) => fig(i, "", `${i}: ${capBy[i].naam.replace("Story: ", "")}`)).join("")}</div><p class="small">Formaat 1080 × 1920 px. Bovenste 250 en onderste 340 px blijven vrij van belangrijke tekst. Stickers (poll, vraag, link) voeg je in Instagram zelf toe.</p></div></section>

<section id="video"><div class="wrap"><h2>Video en reels</h2>
<h3>4 motion-reels (klaar, zonder geluid)</h3><div class="grid c4">${videoFiles.map(([f, l]) => `<figure><video controls preload="metadata" poster="videos/bron/${f}-still.png" src="videos/${f}.mp4"></video><img class="stillonly" src="videos/bron/${f}-still.png" alt="${l}"><figcaption>${l}</figcaption></figure>`).join("")}</div>
<h3>5 videoformats met echte opnames</h3>
<table><tr><th>Format</th><th>Concept</th><th>Duur</th><th>Cover</th></tr>${videos.map((v) => `<tr><td><b>${v.id}</b> ${v.titel}</td><td>${v.concept}</td><td>${v.duur}</td><td>${v.cover}</td></tr>`).join("")}</table>
<div class="grid c5">${["R01", "R02", "R03", "R04", "R05"].map((i) => fig(i, "", i)).join("")}</div>
<p class="small">Per format staan shots, camerabewegingen, tekst in beeld, voice-over, muziekstijl, montage, caption en CTA in <code>reels/V1…V5</code>. De opnamelijst staat in <code>reels/opnamelijst.md</code>. Muziek: niet meegeleverd, zie rechten.</p></div></section>

<section id="kalender"><div class="wrap"><h2>Contentkalender, 23 november t/m 22 december 2026</h2><div class="scroll-x"><table><tr><th>Datum</th><th>Platform</th><th>Type</th><th>ID</th><th>Onderwerp</th><th>Doel</th><th>Beeld</th><th>Status</th></tr>${kalender.map((k) => `<tr><td>${dagNaam(k.d).slice(0, 2)} ${datumNl(k.d)}</td><td>${k.p === "Intern" ? "Intern" : "IG + FB"}</td><td>${k.t}</td><td>${k.id}</td><td>${esc(k.onderwerp)}</td><td>${esc(k.doel)}</td><td>${esc(k.beeld)}</td><td>${k.status === "Klaar" ? '<span class="tag ok">Klaar</span>' : `<span class="tag">${esc(k.status)}</span>`}</td></tr>`).join("")}</table></div><p class="small">Volledig met captions en CTA: <code>content-calendar/kalender-30-dagen.csv</code>. Er zijn geen bewezen beste publicatietijden zonder accountdata; start met de late namiddag en toets met Insights.</p></div></section>

<section id="captions"><div class="wrap"><h2>Captions</h2><table><tr><th>ID</th><th>Caption</th><th>Hashtags</th></tr>${captions.filter((c) => !c.id.startsWith("S")).map((c) => `<tr><td><b>${c.id}</b><br>${esc(c.naam)}</td><td>${esc(c.tekst).replaceAll("\n", "<br>")}</td><td>${esc(c.tags)}</td></tr>`).join("")}${videos.map((v) => `<tr><td><b>${v.id}</b><br>${esc(v.titel)}</td><td>${esc(v.caption)}</td><td>${esc(v.tags)}</td></tr>`).join("")}</table><p class="small">Stories hebben de tekst in beeld; stickers en optionele teksten staan in <code>captions/captions.md</code>.</p></div></section>

<section id="tools"><div class="wrap"><h2>Skills en tools</h2>
<h3>Skillry Premium</h3><p>De verbinding werkt (zoeken, toegang en download zijn gecontroleerd; lidtoegang, daglimiet niet bereikt). Er zijn zes zoekrondes gedaan op onder meer social media, Instagram, Canva/Adobe, kalenders en copywriting, food photography, reels en ondertiteling, en ruim twintig kandidaten bekeken. <b>Er is geen Skill geïnstalleerd en er zijn geen kosten gemaakt.</b></p>
<table><tr><th>Kandidaat</th><th>Prijs</th><th>Oordeel</th></tr>
<tr><td>bs-launchmotion-grid-social-proof-wall</td><td>€ 4,99</td><td>Vereist bestaande social posts over het product; die zijn er nog niet. Afgevallen.</td></tr>
<tr><td>bs-launchmotion-ui-beat-cut-montage</td><td>€ 4,99</td><td>Merkfilm in witte SaaS-stijl; vereist HyperFrames, Claude Opus en ffmpeg. Past niet bij het warme merk.</td></tr>
<tr><td>bs-creatormotion-type-keyword-caption</td><td>€ 4,99</td><td>Ondertitelanimatie over een spreker. Interessant zodra er echte video met spraak is. Nu niet nodig.</td></tr>
<tr><td>bs-wonky-cute-doodles</td><td>€ 4,99 + betaalde AI-beelden (FAL)</td><td>AI-illustraties en extra kosten; zou vragen om toestemming. Eigen illustraties zijn consistenter met de site.</td></tr>
<tr><td>bs-openai-style-poster en de "style OG"-Skills</td><td>€ 4,99 + FAL-kosten</td><td>16:9 of merkgebonden stijl en betaalde AI. Niet geschikt voor 4:5 en 9:16.</td></tr></table>
<p><b>Conclusie:</b> geen Skill is aantoonbaar beter dan de eigen werkwijze (HTML naar PNG en MP4). Er is geen Skill voor cafetaria's, Instagram-templates of kalenders gevonden. Als de eigenaar later echte spraakvideo's heeft, kan een ondertitel-Skill zin hebben (met toestemming voor kosten).</p>
<h3>Gebruikte tools</h3><ul><li><b>HTML en CSS</b> voor de ontwerpen, met <b>Playwright</b> (Chromium) om PNG en JPG te maken. De HTML-bestanden zijn de bewerkbare bronnen.</li><li><b>ffmpeg</b> voor MP4 (H.264, 30 fps, stil AAC-spoor).</li><li><b>Adobe:</b> Acrobat en After Effects staan op deze computer, maar Photoshop, Illustrator, Premiere, Express, Canva en CapCut zijn vanuit deze omgeving niet beschikbaar. After Effects is niet gebruikt: het ontwerp is volledig in code, wat het beter herhaalbaar en aanpasbaar maakt. Kijk bij echte video-opnames of Premiere of CapCut voor de montage beter past.</li><li><b>AI-beeld en AI-video:</b> bewust niet gebruikt (aanbod niet bevestigd, risico op misleidende beelden, geen abonnement zonder toestemming).</li></ul></div></section>

<section id="juridisch"><div class="wrap"><h2>Juridische controle</h2>
<table><tr><th>Onderdeel</th><th>Status</th></tr>
<tr><td>Lettertype Bricolage Grotesque</td><td>OFL 1.1, commercieel toegestaan</td></tr>
<tr><td>Illustraties, zonsymbool, ontwerpen, video's</td><td>Eigen werk van WebRnds; geen derde-partij beelden</td></tr>
<tr><td>Iconen (Lucide)</td><td>ISC-licentie, commercieel toegestaan</td></tr>
<tr><td>Foto's</td><td>Geen gebruikt. De voorbeeldfoto's van de website zijn bewust niet gebruikt</td></tr>
<tr><td>AI-media</td><td>Niet gebruikt</td></tr>
<tr><td>Muziek</td><td>Niet gebruikt. Let op: voor Reels met geluid is bedrijfsrecht nodig; een licentie voor organisch geldt niet automatisch voor advertenties</td></tr>
<tr><td>Personen</td><td>Geen in beeld. Voor opnames is schriftelijke toestemming nodig (AVG, portretrecht)</td></tr>
<tr><td>Logo</td><td>Het officiële logo of bord is niet ontvangen. Het zonsymbool is een huisstijlelement, geen merkregistratie</td></tr></table>
<p>Details: <code>legal/assets-en-licenties.md</code> en <code>legal/muziek-en-rechten.md</code>. Geen juridische garantie.</p></div></section>

<section id="advies"><div class="wrap"><h2>Kritische eindcontrole en verbeteradvies</h2>
<h3>Wat al is verbeterd tijdens de controle</h3><ul><li>Overlappende elementen opgelost, swipe-aanwijzing naar linksonder verplaatst, "De Zon" wordt niet meer afgebroken, een story verwees naar een sticker die niet in beeld staat (aangepast).</li><li>De carrousel "Populaire keuzes" is omgezet naar "Jouw keuze", omdat populariteit niet bevestigd is. Zo verzamelen we eerst echte voorkeuren.</li><li>De video's zijn getoetst op beeldformaat, duur en codec.</li></ul>
<h3>Grootste kans: echt beeld</h3><p>Eén opnamemiddag van twee uur levert foto's en de vijf videoformats op. Daarmee wordt F07 een echte post en komen V1 tot V5 live. Dit is de belangrijkste stap om het pakket commercieel sterker te maken.</p>
<h3>Meer lokale kansen</h3><ul><li>Google Bedrijfsprofiel controleren en met dezelfde beelden en tijden vullen.</li><li>Lokale Facebookgroepen (met toestemming van beheerders).</li><li>Sticker "Volg De Zon" op de afhaalzak en aan de balie; vraag klanten "zag je ons op Instagram?" om effect te meten.</li><li>Samenwerking met verenigingen of scholen, alleen op initiatief van de eigenaar.</li></ul>
<h3>Betere videoformats en efficiëntie</h3><ul><li>Ondertitels altijd aan; veel kijkers zetten het geluid niet aan.</li><li>Een vast wekelijks format ("Frietvraag van de week") met één opname per week.</li><li>Alle teksten staan in bronbestanden: tekst aanpassen en opnieuw renderen kost minuten.</li></ul>
<h3>Ontbrekende formats (voorstel, niet gemaakt)</h3><p>Facebook-evenementen, Google-berichten, een WhatsApp Business-profiel en een kleine lokale advertentie (budget en abonnement alleen na toestemming).</p>
<h3>Vervolg</h3><p>Dit pakket is een concept. Er wordt niets gepubliceerd en er start geen nieuwe fase zonder jouw akkoord.</p></div></section>
</body></html>`;
w("index.html", deck);

/* ---------- readme ---------- */
w("README.md", `# Social media pakket: Cafetaria De Zon\n\nConcept ter beoordeling, niets is op Instagram of Facebook geplaatst. Open \`index.html\` voor de presentatie.\n\n## Mappen\n\n- \`index.html\` en \`presentatie.pdf\`: presentatie voor de klant\n- \`brand-guidelines\`: merkrichtlijnen (HTML en PDF)\n- \`strategy\`: strategie\n- \`content-calendar\`: 30 dagen (CSV en MD)\n- \`feed-posts\`, \`carousels\`, \`stories\`, \`reels/covers\`: masters (PNG)\n- \`reels\`: videoformats V1 tot V5 en opnamelijst\n- \`videos\`: MP4's M1 tot M3 en bronbestanden\n- \`captions\`: captions (MD en CSV)\n- \`templates\`: bewerkbare HTML van elk ontwerp (\`html\`) en sjablonen voor actie, foto en vraag (\`sjablonen\`)\n- \`assets\`: lettertype, CSS, illustraties, iconen en profielafbeeldingen\n- \`legal\`: assets, licenties en rechten\n- \`exports\`: upload-klare JPG/PNG en MP4, op plaatsing gesorteerd\n\n## Aanpassen en opnieuw maken\n\n\`\`\`\nnode tools/render.mjs        # alle ontwerpen naar PNG en JPG\nnode tools/video.mjs         # de MP4's (ffmpeg vereist)\nnode tools/docs.mjs --pdf    # captions, kalender, formats, presentatie en PDF's\n\`\`\`\n\nTeksten staan in \`src/pieces.mjs\` (ontwerpen) en \`src/content.mjs\` (captions, formats, kalender). Playwright is nodig (\`npm install\`).\n\n## Regels\n\n- Alleen bevestigde feiten: naam, adres, telefoon, tijden, pin en contant, afhalen, categorieën.\n- Geen prijzen, acties of productnamen zonder bevestiging van de eigenaar.\n- Aanname: afhalen gaat via bellen of aan de balie. Bevestig dit.\n- Geen stock, geen AI-beelden, geen muziek meegeleverd.\n`);
w("package.json", JSON.stringify({ name: "cafetaria-de-zon-social", version: "1.0.0", private: true, type: "module", scripts: { render: "node tools/render.mjs", video: "node tools/video.mjs", docs: "node tools/docs.mjs --pdf" }, devDependencies: { playwright: "^1.60.0" } }, null, 2) + "\n");

/* ---------- exports: video's ---------- */
mkdirSync(join(sm, "exports/reels-video"), { recursive: true });
for (const f of readdirSync(join(sm, "videos")).filter((x) => x.endsWith(".mp4"))) copyFileSync(join(sm, "videos", f), join(sm, "exports/reels-video", f));

/* ---------- PDF ---------- */
if (withPdf) {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [html, pdf] of [["index.html", "presentatie.pdf"], ["brand-guidelines/brand-guidelines.html", "brand-guidelines/brand-guidelines.pdf"]]) {
    await page.goto(pathToFileURL(join(sm, html)).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => { for (const i of document.images) { i.loading = "eager"; } await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))); });
    await page.pdf({ path: join(sm, pdf), format: "A4", printBackground: true, margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" } });
    console.log(pdf);
  }
  await browser.close();
}
console.log("docs klaar");
