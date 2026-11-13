import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Durbaan",
    short_name: "Durbaan",
    description: "Impact communications and data studio. Your impact, heard.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1F3D",
    theme_color: "#0E1F3D",
    icons: [
      { src: "/brand/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
