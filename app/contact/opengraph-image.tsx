import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Tell us who needs to see your work.";
export default async function Image() {
  return ogImage("Tell us who needs to see your work.", "START A PROJECT");
}
