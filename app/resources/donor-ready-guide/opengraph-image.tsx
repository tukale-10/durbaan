import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "The 10 things donors check before they fund you.";
export default async function Image() {
  return ogImage("The 10 things donors check before they fund you.", "FREE GUIDE");
}
