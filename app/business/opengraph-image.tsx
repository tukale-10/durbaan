import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Look like the business you already are.";
export default async function Image() {
  return ogImage("Look like the business you already are.", "DURBAAN BUSINESS");
}
