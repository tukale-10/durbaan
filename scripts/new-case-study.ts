/**
 * Creates a new case study folder with an index.mdx template.
 *   npm run new-case-study
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const SECTORS = "humanitarian, health, education, livelihoods, wash, governance, business, corporate";
const SERVICES = "documentary, video, photo, dashboard, website, system, training, report";

const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const list = (s: string) => `[${s.split(",").map((x) => x.trim().toLowerCase()).filter(Boolean).join(", ")}]`;

async function main() {
  const rl = readline.createInterface({ input, output });
  const ask = async (q: string, def = "") => (await rl.question(def ? `${q} (${def}): ` : `${q}: `)).trim() || def;

  const client = await ask("Client name");
  const project = await ask("Short project name (for the folder)");
  const slug = slugify(await ask("Slug", slugify(`${client}-${project}`)));
  const dir = path.join(process.cwd(), "content/work", slug);
  if (fs.existsSync(dir)) {
    console.error(`content/work/${slug} already exists.`);
    process.exit(1);
  }
  const title = await ask("Title");
  const clientVisible = (await ask("Permission to show client name? y/n", "n")).startsWith("y");
  const descriptor = clientVisible ? "" : await ask('How to describe the client instead (e.g. "International NGO")', "International NGO");
  const offerLine = await ask("Offer line: impact | partner | business | enterprise", "impact");
  const sectors = await ask(`Sectors, comma separated (${SECTORS})`, "humanitarian");
  const services = await ask(`Services, comma separated (${SERVICES})`, "documentary");
  const location = await ask("Location (City, Country)");
  const year = await ask("Year", String(new Date().getFullYear()));
  const summary = await ask("One sentence summary for cards and SEO");
  rl.close();

  fs.mkdirSync(path.join(dir, "media"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.mdx"),
    `---
title: "${title}"
client: "${client}"
clientVisible: ${clientVisible}
${clientVisible ? "" : `clientDescriptor: "${descriptor}"\n`}offerLine: ${offerLine}
sectors: ${list(sectors)}
services: ${list(services)}
location: "${location}"
year: ${year}
duration: ""
featured: false
draft: true
summary: "${summary}"
heroImage: "./media/hero.jpg"
heroAlt: "Describe the hero image for screen readers"
# film: { provider: youtube, id: "VIDEO_ID", title: "Film title", duration: "6:40" }
# liveUrl: "https://..."
gallery: []
# beforeAfter: { before: "./media/before.jpg", after: "./media/after.jpg" }
results: []  # only confirmed numbers: - { value: "1,200", label: "households reached", source: "Program report, 2026" }
# testimonial: { quote: "...", name: "...", role: "...", organization: "..." }
containsPeople: true
consentConfirmed: false
---

## The challenge

Two to four sentences on the client's problem.

## What we did

A short narrative, then the deliverables:

- Deliverable one
- Deliverable two
`,
  );
  console.log(`\nCreated content/work/${slug}/index.mdx`);
  console.log(`Next: add media/hero.jpg (2400 px wide), fill in the text, confirm consent, then set draft: false.`);
}

main();
