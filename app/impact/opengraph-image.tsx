import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Your impact, visible and credible to donors.";
export default async function Image() {
  return ogImage("Your impact, visible and credible to donors.", "DURBAAN IMPACT");
}
