import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Your delivery team for stories, data and design.";
export default async function Image() {
  return ogImage("Your delivery team for stories, data and design.", "DURBAAN PARTNER");
}
