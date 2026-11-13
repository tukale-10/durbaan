import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Unbounded:wght@600&text=" + encodeURIComponent("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;!?&'()-/·"))).text();
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogImage(title: string, eyebrow = "IMPACT · STORIES · DATA") {
  const seal = fs.readFileSync(path.join(process.cwd(), "public/brand/durbaan-seal-on-navy.svg"));
  const font = await loadFont();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0E1F3D", color: "#fff", padding: "72px 80px", fontFamily: "Unbounded" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#FFB020", fontSize: 20, letterSpacing: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#FFB020" }} />
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 60 ? 50 : 64, lineHeight: 1.08, letterSpacing: -1.5, display: "flex" }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 64, height: 3, background: "#FFB020" }} />
            <div style={{ fontSize: 26 }}>durbaan.com</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${seal.toString("base64")}`} width={360} height={360} alt="" />
        </div>
      </div>
    ),
    { ...ogSize, fonts: font ? [{ name: "Unbounded", data: font, weight: 600, style: "normal" }] : undefined },
  );
}
