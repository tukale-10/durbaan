"use client";
import { useMemo, useState } from "react";
import { cx } from "@/components/ui/primitives";
import type { ProjectCategory } from "@/lib/schemas";
import { CATEGORY_ICON, ProjectCard, type ProjectCardData } from "./project-ui";

/* Category groups shown as filter chips, in the order a visitor scans them. */
const GROUPS: { id: string; label: string; categories: ProjectCategory[] }[] = [
  { id: "films", label: "Films and stories", categories: ["Documentary", "Photo and stories"] },
  { id: "digital", label: "Websites and systems", categories: ["Website", "Software and systems", "Brand and design"] },
  { id: "data", label: "Data and reports", categories: ["Dashboard and data", "Report and design"] },
  { id: "training", label: "Training", categories: ["Training"] },
];

export function WorkIndex({ items }: { items: ProjectCardData[] }) {
  const [active, setActive] = useState<string>("all");
  const groups = GROUPS.map((g) => ({ ...g, count: items.filter((p) => g.categories.includes(p.category)).length })).filter((g) => g.count > 0);
  const filtered = useMemo(() => {
    const g = GROUPS.find((x) => x.id === active);
    return g ? items.filter((p) => g.categories.includes(p.category)) : items;
  }, [active, items]);

  const chip = (id: string, label: string, count: number, Icon?: (typeof CATEGORY_ICON)[ProjectCategory]) => {
    const on = active === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={on}
        onClick={() => setActive(id)}
        className={cx(
          "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
          on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-inset ring-line hover:ring-navy",
        )}
      >
        {Icon && <Icon width={16} height={16} className={on ? "text-amber" : "text-slate"} />}
        {label}
        <span className={cx("rounded-full px-1.5 text-xs tabular-nums", on ? "bg-white/15 text-white" : "bg-mist text-slate")}>{count}</span>
      </button>
    );
  };

  return (
    <>
      <div role="group" aria-label="Filter by type of work" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {chip("all", "All work", items.length)}
        {groups.map((g) => chip(g.id, g.label, g.count, CATEGORY_ICON[g.categories[0]]))}
      </div>
      <p className="sr-only" aria-live="polite">{filtered.length} projects shown</p>
      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <li key={p.slug} className="menu-fade">
            <ProjectCard p={p} priority={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
