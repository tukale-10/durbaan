import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

const components = {
  a: ({ href = "", ...p }: ComponentProps<"a">) =>
    href.startsWith("/") ? <Link href={href} {...p} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...p} />,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-durbaan">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
