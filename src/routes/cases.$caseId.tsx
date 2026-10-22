import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { getCase } from "@/content/cases";
import { STATUS_LABEL } from "@/content/types";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/cases/$caseId")({ component: CasePage });

function CasePage() {
  const { caseId } = Route.useParams();
  const item = getCase(caseId);
  const saved = useStudy((s) => s.bookmarks.includes(caseId));
  const toggle = useStudy((s) => s.toggleBookmark);
  if (!item) {
    return <Shell><p>That case is not in the library.</p><Link to="/cases">Back to cases</Link></Shell>;
  }
  const rows = [
    ["Material facts", item.facts],
    ["Issue", item.issue],
    ["Decision", item.decision],
    ["Reasoning", item.reasoning],
    ["Ratio", item.ratio],
    ["Principle", item.principle],
    ["Examination use", item.exam],
    ["Source", item.source],
  ];
  return (
    <Shell>
      <article className="mx-auto max-w-3xl">
        <Link to="/cases" className="text-sm text-muted">All cases</Link>
        <p className="mt-3 text-sm text-gold-ink">{STATUS_LABEL[item.status]} · {item.jurisdiction}</p>
        <h1 className="font-serif text-3xl">{item.name}</h1>
        <p className="text-muted">{item.cite} · {item.court} · {item.year}</p>
        <p className="mt-3 text-sm">{item.factsNote}</p>
        <button type="button" onClick={() => toggle(item.id)} className="mt-4 h-11 rounded-xl border border-line px-4 text-sm">
          {saved ? "Remove from My Cases" : "Save to My Cases"}
        </button>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.topics.map((topic) => <span key={topic} className="rounded-full bg-tint px-3 py-1 text-xs">{topic}</span>)}
        </div>
        <dl className="mt-6 space-y-4">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm font-semibold">{label}</dt>
              <dd className="mt-1 font-serif leading-relaxed">{value}</dd>
            </div>
          ))}
          {item.obiter && (
            <div>
              <dt className="text-sm font-semibold">Obiter</dt>
              <dd className="mt-1 font-serif leading-relaxed">{item.obiter}</dd>
            </div>
          )}
        </dl>
        {item.related.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold">Related cases</h2>
            <ul className="mt-2 space-y-1">
              {item.related.map((id) => {
                const related = getCase(id);
                return related ? (
                  <li key={id}><Link to="/cases/$caseId" params={{ caseId: id }} className="text-emerald-ink">{related.name}</Link></li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </article>
    </Shell>
  );
}
