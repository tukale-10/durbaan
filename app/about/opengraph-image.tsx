import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "The drum that calls people to hear what matters.";
export default async function Image() {
  return ogImage("The drum that calls people to hear what matters.", "ABOUT");
}
