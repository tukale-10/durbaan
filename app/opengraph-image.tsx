import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Your impact, heard.";
export default async function Image() {
  return ogImage("Your impact, heard.", "IMPACT · STORIES · DATA");
}
