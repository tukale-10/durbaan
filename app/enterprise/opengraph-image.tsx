import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Your performance, clear to your board and your public.";
export default async function Image() {
  return ogImage("Your performance, clear to your board and your public.", "DURBAAN ENTERPRISE");
}
