// De cast van De Zon: Zon, Frietje, Burg, Snack, IJsje en Slaatje. Eén bron voor posts, stories en video's.
// Gebruik: char("frietje", { mood: "cool", pose: "wave", size: 600, style: "left:0;top:0" })
const S = 'stroke="var(--ink)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"';

function face(cx, cy, mood = "happy", k = 1) {
  const x = (d) => (cx + d * k).toFixed(1);
  const y = (d) => (cy + d * k).toFixed(1);
  const eye = (d) => `<ellipse cx="${x(d)}" cy="${y(0)}" rx="${7 * k}" ry="${10 * k}" fill="var(--ink)"/><circle cx="${x(d + 2)}" cy="${y(-4)}" r="${2.6 * k}" fill="var(--paper)"/>`;
  const cheeks = `<circle cx="${x(-33)}" cy="${y(13)}" r="${8 * k}" fill="var(--ember)" opacity=".5"/><circle cx="${x(33)}" cy="${y(13)}" r="${8 * k}" fill="var(--ember)" opacity=".5"/>`;
  const smile = `<path d="M${x(-15)} ${y(13)}Q${x(0)} ${y(40)} ${x(15)} ${y(13)}Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/><ellipse cx="${x(0)}" cy="${y(27)}" rx="${7 * k}" ry="${4 * k}" fill="var(--ember-bright)"/>`;
  if (mood === "cool")
    return `<g>${cheeks}<rect x="${x(-40)}" y="${y(-14)}" width="${34 * k}" height="${24 * k}" rx="${9 * k}" fill="var(--ink)"/><rect x="${x(6)}" y="${y(-14)}" width="${34 * k}" height="${24 * k}" rx="${9 * k}" fill="var(--ink)"/><path d="M${x(-7)} ${y(-6)}H${x(7)}" stroke="var(--ink)" stroke-width="${6 * k}"/><path d="M${x(-32)} ${y(-8)}l${8 * k} ${-0}M${x(14)} ${y(-8)}l${8 * k} 0" stroke="var(--paper)" stroke-width="${3 * k}" stroke-linecap="round" opacity=".7"/><path d="M${x(-12)} ${y(18)}Q${x(0)} ${y(30)} ${x(14)} ${y(16)}" fill="none" stroke="var(--ink)" stroke-width="${5 * k}" stroke-linecap="round"/></g>`;
  if (mood === "wow")
    return `<g>${cheeks}<circle cx="${x(-18)}" cy="${y(-2)}" r="${12 * k}" fill="var(--paper)" stroke="var(--ink)" stroke-width="4"/><circle cx="${x(18)}" cy="${y(-2)}" r="${12 * k}" fill="var(--paper)" stroke="var(--ink)" stroke-width="4"/><circle cx="${x(-16)}" cy="${y(-1)}" r="${5.5 * k}" fill="var(--ink)"/><circle cx="${x(20)}" cy="${y(-1)}" r="${5.5 * k}" fill="var(--ink)"/><ellipse cx="${x(0)}" cy="${y(26)}" rx="${9 * k}" ry="${12 * k}" fill="var(--ink)"/></g>`;
  if (mood === "sleep")
    return `<g>${cheeks}<path d="M${x(-28)} ${y(0)}Q${x(-18)} ${y(10)} ${x(-8)} ${y(0)}M${x(8)} ${y(0)}Q${x(18)} ${y(10)} ${x(28)} ${y(0)}" fill="none" stroke="var(--ink)" stroke-width="${5 * k}" stroke-linecap="round"/><ellipse cx="${x(0)}" cy="${y(24)}" rx="${6 * k}" ry="${5 * k}" fill="var(--ink)"/></g>`;
  if (mood === "wink")
    return `<g>${cheeks}${eye(-18)}<path d="M${x(8)} ${y(2)}Q${x(18)} ${y(-8)} ${x(28)} ${y(2)}" fill="none" stroke="var(--ink)" stroke-width="${5 * k}" stroke-linecap="round"/>${smile}</g>`;
  if (mood === "sad")
    return `<g>${cheeks}${eye(-18)}${eye(18)}<path d="M${x(-30)} ${y(-18)}L${x(-8)} ${y(-26)}M${x(30)} ${y(-18)}L${x(8)} ${y(-26)}" stroke="var(--ink)" stroke-width="${5 * k}" stroke-linecap="round"/><path d="M${x(-14)} ${y(30)}Q${x(0)} ${y(16)} ${x(14)} ${y(30)}" fill="none" stroke="var(--ink)" stroke-width="${5 * k}" stroke-linecap="round"/></g>`;
  return `<g>${cheeks}${eye(-18)}${eye(18)}${smile}</g>`;
}

// Armen en benen: pose bepaalt de hoek. (sx, sy) = schouder links, (ex, sy) = schouder rechts.
function limbs(sx, ex, sy, pose = "wave") {
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="var(--paper)" ${S}/>`;
  const arm = (x0, y0, cx, cy, x1, y1) => `<path d="M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}" fill="none" ${S}/>${hand(x1, y1)}`;
  const P = {
    wave: [[sx, sy, sx - 26, sy + 4, sx - 30, sy + 34], [ex, sy, ex + 30, sy - 6, ex + 34, sy - 44]],
    hips: [[sx, sy, sx - 34, sy + 6, sx - 8, sy + 34], [ex, sy, ex + 34, sy + 6, ex + 8, sy + 34]],
    up: [[sx, sy, sx - 30, sy - 4, sx - 36, sy - 46], [ex, sy, ex + 30, sy - 4, ex + 36, sy - 46]],
    point: [[sx, sy, sx - 20, sy + 12, sx - 24, sy + 40], [ex, sy, ex + 36, sy - 2, ex + 62, sy - 12]],
    cheer: [[sx, sy, sx - 36, sy - 10, sx - 30, sy - 52], [ex, sy, ex + 24, sy + 4, ex + 30, sy + 36]],
    hug: [[sx, sy + 6, sx + 2, sy + 52, sx + 30, sy + 56], [ex, sy + 6, ex - 2, sy + 52, ex - 30, sy + 56]],
  }[pose] || [];
  return P.map((a) => arm(...a)).join("");
}
const legs = (a, b, y0, y1) => `<path d="M${a} ${y0}V${y1}M${b} ${y0}V${y1}" fill="none" ${S}/><ellipse cx="${a - 8}" cy="${y1 + 4}" rx="17" ry="8" fill="var(--ink)"/><ellipse cx="${b + 8}" cy="${y1 + 4}" rx="17" ry="8" fill="var(--ink)"/>`;

const rays = (cx, cy, r1, r2, n, skip = []) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    if (skip.includes(i)) continue;
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    d += `M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)}L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}`;
  }
  return `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/>`;
};

const bodies = {
  zon: (mood, pose) =>
    `${rays(100, 124, 72, 98, 12)}<circle cx="100" cy="124" r="60" fill="var(--ember-bright)" ${S}/>${face(100, 128, mood, 1.05)}${pose === "none" ? "" : limbs(38, 162, 128, pose)}`,
  frietje: (mood, pose) => {
    const FRY = "oklch(0.9 0.14 92)";
    const spec = [[-38, 54, 92, 96], [-26, 70, 72, 112], [-13, 86, 52, 126], [0, 100, 26, 150], [13, 114, 52, 126], [26, 130, 72, 112], [38, 146, 92, 96]];
    const fries = spec
      .map(([r, x, y, h]) => `<g transform="rotate(${r} ${x} 128)"><rect x="${x - (r === 0 ? 15 : 10)}" y="${y}" width="${r === 0 ? 30 : 20}" height="${h}" rx="${r === 0 ? 12 : 7}" fill="${FRY}" ${S}/><path d="M${x - 4} ${y + 12}V${y + h * 0.55}" stroke="var(--paper)" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"/><path d="M${x - 8} ${y + 6}Q${x} ${y - 3} ${x + 8} ${y + 6}" stroke="var(--amber)" stroke-width="5" stroke-linecap="round" fill="none"/></g>`)
      .join("");
    const sparkle = (x, y, k = 1) => `<path d="M${x} ${y - 9 * k}L${x + 3 * k} ${y - 3 * k}L${x + 9 * k} ${y}L${x + 3 * k} ${y + 3 * k}L${x} ${y + 9 * k}L${x - 3 * k} ${y + 3 * k}L${x - 9 * k} ${y}L${x - 3 * k} ${y - 3 * k}Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>`;
    const mini = `<ellipse cx="91" cy="62" rx="4.5" ry="6" fill="var(--ink)"/><ellipse cx="109" cy="62" rx="4.5" ry="6" fill="var(--ink)"/><circle cx="92.4" cy="60" r="1.6" fill="var(--paper)"/><circle cx="110.4" cy="60" r="1.6" fill="var(--paper)"/><path d="M92 78Q100 88 108 78" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="83" cy="74" r="5" fill="var(--ember-bright)" opacity=".55"/><circle cx="117" cy="74" r="5" fill="var(--ember-bright)" opacity=".55"/>`;
    const stripes = [66, 84, 102, 120, 138].map((x) => `<path d="M${x - 6} 132L${x - 2 + (x - 100) * 0.1} 208" stroke="var(--paper)" stroke-width="7" stroke-linecap="round" opacity=".28"/>`).join("");
    return `${fries}${mini}${sparkle(34, 66, 1.1)}${sparkle(168, 52)}${sparkle(150, 22, 0.8)}<path d="M46 122H154L142 214H58Z" fill="var(--ember-bright)" ${S}/>${stripes}<rect x="38" y="110" width="124" height="22" rx="10" fill="var(--ember)" ${S}/><path d="M52 200Q100 214 148 200" fill="none" stroke="var(--sun)" stroke-width="8" stroke-linecap="round"/>${face(100, 164, mood, 1.1)}${limbs(48, 152, 160, pose)}${legs(80, 120, 214, 238)}`;
  },
  burg: (mood, pose) =>
    `<path d="M32 118C32 58 64 26 100 26C136 26 168 58 168 118Z" fill="var(--amber)" ${S}/>${[[70, 52], [112, 44], [92, 66], [136, 62], [58, 80]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" fill="var(--paper)" transform="rotate(-20 ${x} ${y})"/>`).join("")}<path d="M24 120Q36 108 48 120T72 120T96 120T120 120T144 120T176 120V134H24Z" fill="var(--leaf)" ${S}/><rect x="28" y="134" width="144" height="28" rx="14" fill="var(--ink-2)" ${S}/><path d="M32 168H168V178A24 24 0 0 1 144 200H56A24 24 0 0 1 32 178Z" fill="var(--amber)" ${S}/>${face(100, 82, mood, 0.95)}${limbs(28, 172, 146, pose)}${legs(78, 122, 200, 232)}`,
  snack: (mood, pose) =>
    `<rect x="50" y="46" width="100" height="164" rx="50" fill="var(--amber)" ${S}/>${[[72, 72], [128, 90], [78, 190], [124, 184], [100, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="var(--ember)"/>`).join("")}${face(100, 124, mood)}${limbs(50, 150, 136, pose)}${legs(82, 118, 210, 236)}`,
  ijsje: (mood, pose) =>
    `<path d="M62 150L138 150L100 232Z" fill="var(--amber)" ${S}/><path d="M76 170L112 206M124 170L88 206" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="118" r="46" fill="var(--paper)" ${S}/><circle cx="100" cy="68" r="34" fill="var(--ember-bright)" ${S}/><path d="M92 36Q100 22 108 36" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>${face(100, 128, mood, 0.95)}${limbs(56, 144, 122, pose)}`,
  slaatje: (mood, pose) => {
    const L1 = "oklch(0.66 0.14 130)", L2 = "oklch(0.78 0.15 128)";
    const ring = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return `<circle cx="${(100 + 54 * Math.cos(a)).toFixed(1)}" cy="${(124 + 54 * Math.sin(a)).toFixed(1)}" r="34" fill="${i % 2 ? L1 : L2}" ${S}/>`;
    }).join("");
    const inner = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      return `<circle cx="${(100 + 54 * Math.cos(a)).toFixed(1)}" cy="${(124 + 54 * Math.sin(a)).toFixed(1)}" r="30" fill="${i % 2 ? L1 : L2}"/>`;
    }).join("");
    return `${ring}${inner}<circle cx="100" cy="124" r="60" fill="${L2}"/><path d="M52 92Q70 82 84 94M118 84Q134 76 150 90M54 168Q72 178 88 166M116 170Q132 180 148 166" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" opacity=".35"/><g transform="translate(132 40) rotate(14)"><circle r="19" fill="var(--ember-bright)" ${S}/><path d="M-8 -17Q0 -26 8 -17M0 -19V-27" fill="none" stroke="var(--leaf)" stroke-width="6" stroke-linecap="round"/><path d="M-9 -4Q-6 -10 0 -10" fill="none" stroke="var(--paper)" stroke-width="4" stroke-linecap="round" opacity=".8"/></g>${face(100, 128, mood, 1.1)}${limbs(44, 156, 134, pose)}${legs(82, 118, 200, 234)}`;
  },
};

export function char(name, { mood = "happy", pose = "wave", size = 600, style = "", flip = false, rot = 0 } = {}) {
  const w = size, h = Math.round(size * 280 / 260);
  const t = [rot ? `rotate(${rot}deg)` : "", flip ? "scaleX(-1)" : ""].filter(Boolean).join(" ");
  return `<svg class="ch" viewBox="-30 -10 260 280" style="width:${w}px;height:${h}px;${t ? `transform:${t};` : ""}${style}" aria-hidden="true">${bodies[name](mood, pose)}</svg>`;
}
export const CAST = { zon: "Zon", frietje: "Frietje", burg: "Burg", snack: "Snack", ijsje: "IJsje", slaatje: "Slaatje" };
