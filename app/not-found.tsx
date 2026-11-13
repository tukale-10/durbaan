import { Seal } from "@/components/brand/marks";
import { Button, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-navy text-white">
      <div className="container grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <Eyebrow tone="amber">404</Eyebrow>
          <h1 className="t-1 mt-6">This page was not heard<span className="text-amber">.</span></h1>
          <p className="lead mt-6 max-w-lg text-white/75">The link may be old, or the page may have moved. Here are good places to start.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" arrow>Home</Button>
            <Button href="/work" variant="outline-light">Our work</Button>
            <Button href="/contact" variant="outline-light">Contact</Button>
          </div>
        </div>
        <Seal spin className="mx-auto w-full max-w-sm" title="" aria-hidden />
      </div>
    </section>
  );
}
