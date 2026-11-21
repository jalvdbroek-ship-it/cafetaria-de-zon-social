// De scènes van de video's (1080x1920, zonder geluid). Elke scène heeft html en een render(t)-functie die per beeld de animatie zet.
import { pathToFileURL } from "node:url";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const sm = join(dirname(fileURLToPath(import.meta.url)), "..");
const { char } = await import(pathToFileURL(join(sm, "src/personages.mjs")).href);

const rel = (name, o, id, x, y, extra = "") => `<div id="${id}" class="abs" style="left:${x}px;top:${y}px;transform-origin:50% 100%;${extra}">${char(name, { ...o, style: "position:relative;" })}</div>`;
const tagH = (id, text, x, y, cls = "", extra = "") => `<div id="${id}" class="tag ${cls}" style="left:${x}px;top:${y}px;${extra}">${text}</div>`;
const INFO = `
<div id="info" class="abs" style="left:0;right:0;bottom:0;height:460px;background:var(--ink);border-top:10px solid var(--sun);padding:36px 70px;color:var(--night-ink);font-size:44px;font-weight:700;line-height:1.2">
  <div style="color:var(--ember-bright);font-size:26px;font-weight:800;letter-spacing:.14em;text-transform:uppercase">Open · maandag dicht</div>
  <div style="margin-top:8px;font-size:40px;line-height:1.18"><b style="color:var(--sun)">Di t/m do</b> 12:30 – 22:00<br><b style="color:var(--sun)">Vr en za</b> 12:30 – 23:00<br><b style="color:var(--sun)">Zo</b> 12:30 – 21:00</div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:26px"><div><div style="font-size:60px;font-weight:800;color:var(--sun);letter-spacing:-0.03em">Noordeinde 12</div>3238 BG Zwartewaal</div><div style="text-align:right"><div style="font-size:60px;font-weight:800;color:var(--sun);letter-spacing:-0.03em">0181 66 36 69</div>Pinnen of contant</div></div>
</div>`;
const infoIn = (a) => `{ const k = E(P(window.__t, ${a}, ${a + 0.6})); $('info').style.transform = 'translateY(' + ((1 - k) * 440) + 'px)'; }`;

export const scenes = {
  m1: {
    file: "M1-de-zon-gaat-op",
    dur: 9,
    html: `
<div id="sky" class="abs" style="inset:0"></div>
<div id="rays" class="burst" style="--b1:var(--sun);--b2:var(--amber);opacity:0"></div>
<div class="abs" style="left:0;right:0;top:1180px;bottom:0;background:var(--night)"></div>
<h1 id="h1" class="hx xl sh abs" style="left:70px;top:150px;z-index:6">De Zon<br>gaat op.</h1>
${tagH("tg", "Dinsdag t/m zondag vanaf 12:30", 70, 520, "ember", "transform:rotate(-3deg)")}
${rel("zon", { mood: "cool", pose: "cheer", size: 700 }, "sun", 190, 430, "z-index:2")}
<div class="abs" style="left:0;right:0;top:1160px;height:40px;background:var(--ink);z-index:5"></div>
${rel("frietje", { mood: "happy", pose: "wave", size: 500 }, "c1", -80, 690, "z-index:3")}
${rel("burg", { mood: "cool", pose: "hips", size: 540 }, "c2", 150, 650, "z-index:4")}
${rel("snack", { mood: "wink", pose: "cheer", size: 470 }, "c3", 480, 720, "z-index:3")}
${rel("ijsje", { mood: "happy", pose: "wave", size: 430 }, "c4", 690, 760, "z-index:4")}
${rel("slaatje", { mood: "happy", pose: "hips", size: 400 }, "c5", 850, 790, "z-index:3")}
${INFO.replace("bottom:0;height:460px", "top:1180px;height:740px;z-index:7;padding-top:60px")}`,
    render: `
const t = window.__t;
const k = E(P(t, 0.2, 1.6));
$('sky').style.background = 'color-mix(in oklch, var(--sun) ' + (k * 100) + '%, var(--night))';
$('rays').style.opacity = E(P(t, 1.0, 2.2));
$('rays').style.transform = 'rotate(' + (t * 6) + 'deg)';
$('info').style.transform = 'translateY(' + ((1 - E(P(t, 5.4, 6.1))) * 760) + 'px)';
const up = E(P(t, 0.4, 2.2));
$('sun').style.transform = 'translateY(' + ((1 - up) * 700) + 'px) rotate(' + (Math.sin(t * 3) * 3) + 'deg)';
show($('h1'), 1.8, 2.5, 60); pop($('tg'), 2.5, 3.0, -3);
['c1','c2','c3','c4','c5'].forEach((id, i) => { const a = 3.0 + i * 0.35; const kk = BACK(P(t, a, a + 0.5)); $(id).style.opacity = P(t, a, a + 0.1); $(id).style.transform = 'scale(' + kk + ') translateY(' + (Math.sin(t * 5 + i) * 6) + 'px)'; });
`,
  },
  m2: {
    file: "M2-zin-in-categorieen",
    dur: 9.5,
    html: (() => {
      const cats = [
        ["Frites", "frietje", "var(--sun)", "wow", "up"],
        ["Hamburgers", "burg", "var(--ember)", "cool", "hips"],
        ["Snacks", "snack", "var(--night)", "happy", "cheer"],
        ["Vegetarisch", "slaatje", "var(--paper-2)", "wink", "hips"],
        ["IJs", "ijsje", "var(--sun)", "wow", "cheer"],
      ];
      const fg = ["var(--ink)", "var(--paper)", "var(--sun)", "var(--ink)", "var(--ink)"];
      return (
        cats
          .map(
            ([w, n, bg, mood, pose], i) => `
<div id="L${i}" class="abs" style="inset:0;background:${bg};color:${fg[i]};clip-path:inset(0 100% 0 0);overflow:hidden">
  <div class="dots" style="--o:.12"></div>
  <div class="abs" style="left:70px;top:300px;font-size:64px;font-weight:800;letter-spacing:-0.03em">Zin in</div>
  <h1 class="hx abs" style="left:70px;top:380px;font-size:${w.length > 9 ? 150 : 210}px;${i === 2 ? "color:var(--sun);text-shadow:8px 8px 0 var(--ember)" : i === 1 ? "color:var(--paper);text-shadow:8px 8px 0 var(--ink)" : "color:var(--ink);text-shadow:8px 8px 0 var(--paper)"}">${w}</h1>
  ${rel(n, { mood, pose, size: 1000 }, "I" + i, 40, 640, "")}
</div>`
          )
          .join("") +
        `
<div id="end" class="abs" style="inset:0;background:var(--sun);clip-path:inset(0 100% 0 0);overflow:hidden"><div class="burst" style="--b1:var(--sun);--b2:var(--amber)"></div>
  <h1 id="e1" class="hx xl sh abs" style="left:70px;top:230px">Haal af<br>bij De Zon.</h1>
  ${rel("zon", { mood: "cool", pose: "cheer", size: 760 }, "endsun", 160, 560, "")}
  ${INFO.replace("bottom:0;height:460px", "bottom:0;height:460px;z-index:7")}
</div>`
      );
    })(),
    render: `
const t = window.__t, step = 1.2;
for (let i = 0; i < 5; i++) {
  const a = i * step;
  const k = E(P(t, a, a + 0.35));
  $('L' + i).style.clipPath = 'inset(0 ' + ((1 - k) * 100) + '% 0 0)';
  const ik = BACK(P(t, a + 0.15, a + 0.7));
  $('I' + i).style.transform = 'scale(' + ik + ') rotate(' + ((1 - ik) * -20 + (i % 2 ? 4 : -4) + Math.sin(t * 6 + i) * 2) + 'deg)';
}
const e = E(P(t, 6.0, 6.4));
$('end').style.clipPath = 'inset(0 ' + ((1 - e) * 100) + '% 0 0)';
show($('e1'), 6.4, 7.0, 60);
$('endsun').style.transform = 'scale(' + BACK(P(t, 6.6, 7.3)) + ') rotate(' + (Math.sin(t * 4) * 4) + 'deg)';
$('info').style.transform = 'translateY(' + ((1 - E(P(t, 7.4, 8.0))) * 440) + 'px)';
`,
  },
  m3: {
    file: "M3-afhalen-in-3-stappen",
    dur: 10,
    html: `
<div class="abs" style="inset:0;background:var(--paper)"></div><div class="burst" style="--b1:var(--paper);--b2:var(--paper-2)"></div><div class="dots" style="--o:.1"></div>
<h1 id="title" class="hx l shs abs" style="left:70px;top:150px">Afhalen<br>bij De Zon.</h1>
${[["1", "Kies", "frietje", "var(--sun)", "var(--ink)", "happy", "wave"], ["2", "Bel", "burg", "var(--ember)", "var(--paper)", "cool", "point"], ["3", "Haal af", "snack", "var(--night)", "var(--night-ink)", "wink", "cheer"]]
  .map(([n, w, c, bg, fg, mood, pose], i) => `
<div id="s${i}" class="hard abs" style="left:70px;right:70px;top:${520 + i * 270}px;height:240px;background:${bg};color:${fg};display:flex;align-items:center;gap:30px;padding:0 40px;overflow:visible">
  <div class="nr" style="width:130px;height:130px;font-size:80px;flex:none">${n}</div>
  <div style="flex:1;font-size:92px;font-weight:800;letter-spacing:-0.04em;line-height:.95">${w}${i === 1 ? `<div style="font-size:46px;letter-spacing:0;margin-top:4px">0181 66 36 69</div>` : i === 2 ? `<div style="font-size:42px;letter-spacing:0;margin-top:4px">Noordeinde 12</div>` : ""}</div>
  <div id="ic${i}" style="width:220px;height:240px;position:relative">${char(c, { mood, pose, size: 300, style: "position:absolute;left:-30px;top:-80px" })}</div>
</div>`).join("")}
<div id="st" class="star" style="left:690px;top:1330px;width:300px;height:300px;font-size:44px;transform:rotate(8deg)"><svg viewBox="0 0 100 100"><polygon points="${Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2, r = i % 2 ? 0.78 : 1; return (50 + 49 * r * Math.cos(a)).toFixed(1) + "," + (50 + 49 * r * Math.sin(a)).toFixed(1); }).join(" ")}" fill="var(--sun)" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></svg><span>Pinnen<br>of contant</span></div>
${tagH("ad", "Dinsdag t/m zondag vanaf 12:30", 70, 1400, "ember", "transform:rotate(-3deg)")}
${tagH("ad2", "Noordeinde 12, Zwartewaal", 110, 1510, "", "transform:rotate(2deg)")}`,
    render: `
const t = window.__t;
show($('title'), 0.2, 0.9, 60);
[1.2, 3.1, 5.0].forEach((a, i) => {
  const k = E(P(t, a, a + 0.6));
  const el = $('s' + i);
  el.style.opacity = P(t, a, a + 0.15);
  el.style.transform = 'translateX(' + ((1 - k) * -1000) + 'px)';
  $('ic' + i).style.transform = 'rotate(' + Math.sin(t * 6 + i) * 3 + 'deg)';
});
pop($('st'), 6.9, 7.5, 8); show($('ad'), 7.6, 8.2, 30); show($('ad2'), 8.0, 8.6, 30);
`,
  },
  m4: {
    file: "M4-frietje-tegen-burg",
    dur: 10,
    html: `
<div class="abs" style="inset:0;background:var(--paper-2)"></div><div class="burst" style="--b1:var(--paper-2);--b2:var(--paper)"></div><div class="dots" style="--o:.1"></div>
<h1 id="title" class="hx l shs abs" style="left:70px;top:150px">Frietje<br>tegen Burg.</h1>
${rel("frietje", { mood: "happy", pose: "up", size: 720 }, "fa", -80, 760, "z-index:3")}
${rel("frietje", { mood: "sad", pose: "hips", size: 720 }, "fb", -80, 760, "z-index:3;opacity:0")}
${rel("burg", { mood: "cool", pose: "hips", size: 760, flip: true }, "bu", 360, 720, "z-index:4")}
${rel("snack", { mood: "wink", pose: "cheer", size: 600 }, "sn", 600, 880, "z-index:5;opacity:0")}
<div id="b1" class="bub" style="left:70px;top:560px;--tl:150px;transform-origin:20% 100%">Ik ben de<br>beste.</div>
<div id="b2" class="bub tr sun" style="right:60px;top:480px;--tl:200px;transform-origin:80% 100%">Zegt de<br>bijgerecht.</div>
<div id="b3" class="bub" style="left:70px;top:560px;--tl:150px;transform-origin:20% 100%;font-size:70px">Au.</div>
<div id="b4" class="bub sun" style="left:300px;top:540px;--tl:150px;transform-origin:20% 100%;font-size:54px">Kom langs en<br>kies zelf.</div>
${INFO.replace("bottom:0;height:460px", "bottom:0;height:460px;z-index:8")}`,
    render: `
const t = window.__t;
show($('title'), 0.1, 0.7, 60);
const bp = (id, a, hide) => { const el = $(id); const k = BACK(P(t, a, a + 0.4)); el.style.opacity = hide != null && t > hide ? 0 : P(t, a, a + 0.1); el.style.transform = 'scale(' + (hide != null && t > hide ? 0 : k) + ')'; };
bp('b1', 0.8, 3.6); bp('b2', 2.2, 5.2); bp('b3', 3.6, 5.2); bp('b4', 5.4);
const sad = t > 3.6;
$('fa').style.opacity = sad ? 0 : 1; $('fb').style.opacity = sad ? 1 : 0;
const bob = Math.sin(t * 6) * 6;
$('fa').style.transform = 'translateY(' + bob + 'px)'; $('fb').style.transform = 'translateY(' + (sad ? Math.sin(t * 10) * 3 : 0) + 'px)';
$('bu').style.transform = 'translateY(' + (Math.sin(t * 5 + 1) * 5) + 'px)';
const sk = E(P(t, 5.0, 5.7)); $('sn').style.opacity = sk > 0 ? 1 : 0; $('sn').style.transform = 'translateX(' + ((1 - sk) * 700) + 'px) translateY(' + (Math.sin(t * 8) * 8) + 'px)';
$('info').style.transform = 'translateY(' + ((1 - E(P(t, 7.2, 7.8))) * 440) + 'px)';
`,
  },
};
