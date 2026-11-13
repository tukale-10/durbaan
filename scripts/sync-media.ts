/**
 * Copies portfolio images from /content into /public, optimised and with all
 * metadata (including GPS location) stripped, and writes a manifest with
 * dimensions and blur placeholders for next/image.
 *
 *   content/work/[slug]/media/*  ->  public/work/[slug]/*.jpg
 *   content/films/media/*        ->  public/films/*.jpg
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG = /\.(jpe?g|png|webp|tiff?)$/i;
const manifest: Record<string, { width: number; height: number; blurDataURL: string }> = {};

async function processDir(srcDir: string, outDir: string, publicBase: string) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir).filter((f) => IMG.test(f))) {
    const src = path.join(srcDir, f);
    const name = f.replace(IMG, ".jpg");
    const out = path.join(outDir, name);
    const stale = !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs;
    if (stale) {
      // sharp drops EXIF/GPS/XMP by default; rotate() bakes in orientation first.
      await sharp(src).rotate().resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    }
    const meta = await sharp(out).metadata();
    const blur = await sharp(out).resize(16).jpeg({ quality: 40 }).toBuffer();
    manifest[`${publicBase}/${name}`] = {
      width: meta.width!,
      height: meta.height!,
      blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
    };
  }
}

async function main() {
  const workDir = path.join(ROOT, "content/work");
  if (fs.existsSync(workDir)) {
    for (const slug of fs.readdirSync(workDir)) {
      await processDir(path.join(workDir, slug, "media"), path.join(ROOT, "public/work", slug), `/work/${slug}`);
    }
  }
  await processDir(path.join(ROOT, "content/films/media"), path.join(ROOT, "public/films"), "/films");
  fs.mkdirSync(path.join(ROOT, "lib/generated"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "lib/generated/media-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`media: ${Object.keys(manifest).length} images synced`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
