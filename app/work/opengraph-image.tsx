import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Proof, not promises.";
export default async function Image() {
  return ogImage("Proof, not promises.", "WORK");
}
