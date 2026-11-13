/** Fails if any site copy contains an em dash (owner's style rule). */
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "content"];
const bad: string[] = [];
const walk = (d: string) => {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|mdx|json)$/.test(f.name)) {
      fs.readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (line.includes("—") || line.includes("&mdash;")) bad.push(`${p}:${i + 1}`);
      });
    }
  }
};
roots.forEach(walk);
if (bad.length) {
  console.error("Em dashes found in copy:\n" + bad.join("\n"));
  process.exit(1);
}
console.log("copy check: no em dashes");
