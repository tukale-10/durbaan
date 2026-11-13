// Generates clearly labelled brand illustrations for draft sample content.
// These never appear in production because every sample item is draft: true.
import sharp from "sharp";
import fs from "node:fs";

const W = 2400, H = 1500;
const label = "";
const dots = (x0, y0, cols, rows, gap, r, op) => {
  let s = ""; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += `<circle cx="${x0 + i * gap}" cy="${y0 + j * gap}" r="${r}" fill="#FFB020" opacity="${op}"/>`; return s;
};
const zig = (y, h, n, x0, x1, c, w) => { let p = []; const step = (x1 - x0) / n; for (let i = 0; i <= n; i++) p.push(`${x0 + i * step},${i % 2 ? y + h : y}`); return `<polyline points="${p.join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`; };

const scenes = {
  documentary: `<rect width="${W}" height="${H}" fill="#0E1F3D"/>
    <circle cx="1720" cy="520" r="210" fill="#FFB020"/>
    <path d="M0 980 C 400 860 700 900 1000 960 S 1700 1060 2400 900 V1500 H0Z" fill="#16294B"/>
    <path d="M0 1120 C 500 1040 900 1100 1300 1140 S 2000 1180 2400 1080 V1500 H0Z" fill="#081428"/>
    ${zig(1150, 60, 30, 0, 2400, "#FFB020", 6)}
    <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="#F5E6C8" stroke-width="4" opacity=".35"/>
    ${label}`,
  dashboard: `<rect width="${W}" height="${H}" fill="#F6F7F9"/>
    <rect x="160" y="160" width="2080" height="1180" rx="24" fill="#FFFFFF" stroke="#E3E6EC" stroke-width="4"/>
    <rect x="160" y="160" width="2080" height="110" rx="24" fill="#0E1F3D"/><rect x="160" y="230" width="2080" height="40" fill="#0E1F3D"/>
    ${[0, 1, 2].map((i) => `<rect x="${240 + i * 520}" y="340" width="460" height="200" rx="16" fill="#F6F7F9"/><rect x="${280 + i * 520}" y="390" width="${180 + i * 30}" height="40" rx="8" fill="#0E1F3D"/><rect x="${280 + i * 520}" y="460" width="240" height="22" rx="8" fill="#A7AFBF"/>`).join("")}
    <rect x="1800" y="340" width="360" height="900" rx="16" fill="#F6F7F9"/>
    ${[380, 520, 460, 640, 600, 760, 700, 880].map((h, i) => `<rect x="${260 + i * 190}" y="${1240 - h * 0.75}" width="120" height="${h * 0.75}" rx="10" fill="${i === 5 ? "#FFB020" : "#0E1F3D"}"/>`).join("")}
    ${label}`,
  website: `<rect width="${W}" height="${H}" fill="#F5E6C8"/>
    <rect x="300" y="170" width="1800" height="1160" rx="28" fill="#FFFFFF" stroke="#0E1F3D" stroke-width="6"/>
    <rect x="300" y="170" width="1800" height="90" rx="28" fill="#0E1F3D"/><rect x="300" y="220" width="1800" height="40" fill="#0E1F3D"/>
    ${[0, 1, 2].map((i) => `<circle cx="${370 + i * 50}" cy="215" r="14" fill="#FFB020"/>`).join("")}
    <rect x="400" y="360" width="900" height="80" rx="12" fill="#0E1F3D"/><rect x="400" y="470" width="760" height="80" rx="12" fill="#0E1F3D"/>
    <rect x="400" y="610" width="620" height="28" rx="10" fill="#A7AFBF"/><rect x="400" y="660" width="560" height="28" rx="10" fill="#A7AFBF"/>
    <rect x="400" y="760" width="300" height="90" rx="45" fill="#FFB020"/>
    <rect x="1420" y="360" width="580" height="580" rx="24" fill="#0E1F3D"/>${dots(1480, 420, 9, 9, 60, 7, 0.8)}
    ${[0, 1, 2].map((i) => `<rect x="${400 + i * 540}" y="1010" width="500" height="240" rx="18" fill="#F6F7F9"/>`).join("")}
    ${label}`,
  film2: `<rect width="${W}" height="${H}" fill="#081428"/>
    ${dots(120, 120, 38, 22, 60, 4, 0.25)}
    <circle cx="1200" cy="750" r="330" fill="none" stroke="#FFB020" stroke-width="10"/>
    <path d="M1110 610 L1350 750 L1110 890Z" fill="#FFB020"/>
    ${label}`,
};

const out = [
  ["content/work/sample-documentary/media/hero.jpg", "documentary"],
  ["content/work/sample-documentary/media/01.jpg", "film2"],
  ["content/work/sample-dashboard/media/hero.jpg", "dashboard"],
  ["content/work/sample-website/media/hero.jpg", "website"],
  ["content/work/sample-website/media/before.jpg", "documentary"],
  ["content/work/sample-website/media/after.jpg", "website"],
  ["content/films/media/sample-film-one.jpg", "documentary"],
  ["content/films/media/sample-film-two.jpg", "film2"],
];
for (const [file, scene] of out) {
  fs.mkdirSync(file.split("/").slice(0, -1).join("/"), { recursive: true });
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${scenes[scene]}</svg>`))
    .resize(1600).jpeg({ quality: 78, mozjpeg: true }).toFile(file);
}
console.log("samples done");
