"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CaseStudyCard, type CaseStudyCardData } from "@/components/ui/CaseStudyCard";
import { cx } from "@/components/ui/primitives";

type Item = CaseStudyCardData & { offerLine: string; year: number };
type Group = { key: "sector" | "service" | "offer" | "year"; label: string; options: { value: string; label: string }[] };

export function WorkFilters({ items, groups }: { items: Item[]; groups: Group[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const active = Object.fromEntries(groups.map((g) => [g.key, params.get(g.key) ?? ""])) as Record<Group["key"], string>;

  const filtered = useMemo(
    () =>
      items.filter(
        (c) =>
          (!active.sector || c.sectors.includes(active.sector as never)) &&
          (!active.service || c.services.includes(active.service as never)) &&
          (!active.offer || c.offerLine === active.offer) &&
          (!active.year || String(c.year) === active.year),
      ),
    [items, active.sector, active.service, active.offer, active.year],
  );

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/work${next.size ? `?${next}` : ""}`, { scroll: false });
  };
  const any = Object.values(active).some(Boolean);

  return (
    <>
      <div className="grid gap-4 rounded-card bg-mist p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[repeat(4,1fr)_auto]">
        {groups.map((g) => (
          <label key={g.key} className="block">
            <span className="eyebrow mb-2 block !text-[10px] text-slate">{g.label}</span>
            <select
              value={active[g.key]}
              onChange={(e) => set(g.key, e.target.value)}
              className={cx("h-12 w-full rounded-full border bg-white px-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber", active[g.key] ? "border-navy" : "border-line")}
            >
              <option value="">All</option>
              {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        ))}
        <div className="flex items-end">
          <button type="button" disabled={!any} onClick={() => router.replace("/work", { scroll: false })} className="h-12 rounded-full px-5 text-sm font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4 disabled:opacity-40 disabled:no-underline">
            Clear filters
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
      {filtered.length ? (
        <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => <li key={c.slug}><CaseStudyCard c={c} priority={i < 3} /></li>)}
        </ul>
      ) : (
        <p className="mt-10 rounded-card border border-dashed border-line p-10 text-center text-slate">No projects match these filters yet. Try clearing one.</p>
      )}
    </>
  );
}
