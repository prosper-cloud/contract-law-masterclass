import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { glossary } from "@/content/glossary";

export const Route = createFileRoute("/glossary")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : "" }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState(Route.useSearch().q);
  const [open, setOpen] = useState<string | null>(null);
  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return glossary
      .filter((entry) => !query || `${entry.term} ${entry.plain} ${entry.formal}`.toLowerCase().includes(query))
      .slice()
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [q]);
  const letters = [...new Set(items.map((item) => item.term[0]))];

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl">Legal glossary</h1>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search as you type" aria-label="Search glossary" className="mt-4 h-11 w-full rounded-xl border border-line bg-card px-3" />
        <div className="mt-3 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a key={letter} href={`#letter-${letter}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-sm">{letter}</a>
          ))}
        </div>
        {items.length === 0 ? <p className="mt-6 text-sm text-muted">No terms match.</p> : (
          <div className="mt-4 space-y-2">
            {items.map((entry, index) => {
              const showLetter = index === 0 || items[index - 1].term[0] !== entry.term[0];
              return (
                <div key={entry.id} id={showLetter ? `letter-${entry.term[0]}` : undefined}>
                  {showLetter && <h2 className="mb-2 mt-4 text-sm text-gold-ink">{entry.term[0]}</h2>}
                  <button type="button" onClick={() => setOpen(open === entry.id ? null : entry.id)} className="w-full rounded-2xl border border-line bg-card p-4 text-left">
                    <span className="font-semibold">{entry.term}</span>
                    <span className="mt-1 block text-sm text-muted">{entry.plain}</span>
                    {open === entry.id && (
                      <span className="mt-3 block space-y-2 text-sm">
                        <span className="block">{entry.formal}</span>
                        <span className="block">Example: {entry.example}</span>
                        {entry.authority && <span className="block text-gold-ink">{entry.authority}</span>}
                        <span className="block text-muted">Related: {entry.related.join(", ")}</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Shell>
  );
}
