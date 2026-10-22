import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { modules } from "@/content/curriculum";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/learn")({ component: LearnPage });

function LearnPage() {
  const completed = useStudy((s) => s.completed);
  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-gold-ink">Curriculum</p>
        <h1 className="font-serif text-3xl">Learn Contract Law</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Fourteen chapters, from formation to examination method. Nigerian authority is marked when it is used. English cases stay labelled as English.
        </p>
        <ol className="mt-6 space-y-3">
          {modules.map((module) => {
            const pct = completed[module.id] ?? 0;
            const locked = module.prerequisites.some((id) => completed[id] !== 100);
            return (
              <li key={module.id}>
                <Link to="/learn/$moduleId" params={{ moduleId: module.id }} className="block rounded-2xl border border-line bg-card p-4 hover:border-gold">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted">Module {module.num} · {module.level} · {module.minutes} min</p>
                      <h2 className="mt-1 text-lg font-semibold">{module.title}</h2>
                      <p className="mt-1 text-sm text-muted">{module.blurb}</p>
                      {locked && <p className="mt-2 text-xs text-gold-ink">Suggested after the earlier chapters. You can still open it.</p>}
                    </div>
                    <p className="text-sm tabular-nums text-emerald-ink">{pct === 100 ? "Complete" : `${pct}%`}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}
