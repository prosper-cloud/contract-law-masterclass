import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { cases } from "@/content/cases";
import { STATUS_LABEL } from "@/content/types";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/cases")({ component: CasesPage });

function CasesPage() {
  const bookmarks = useStudy((s) => s.bookmarks);
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("All");
  const [jurisdiction, setJurisdiction] = useState("All");
  const [court, setCourt] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [onlyMine, setOnlyMine] = useState(false);
  const topics = ["All", ...new Set(cases.flatMap((item) => item.topics))];
  const courts = ["All", ...new Set(cases.map((item) => item.court))];
  const filtered = useMemo(() => {
    return cases.filter((item) => {
      const blob = `${item.name} ${item.cite} ${item.principle} ${item.topics.join(" ")}`.toLowerCase();
      if (q && !blob.includes(q.toLowerCase())) return false;
      if (topic !== "All" && !item.topics.includes(topic)) return false;
      if (jurisdiction !== "All" && item.jurisdiction !== jurisdiction) return false;
      if (court !== "All" && item.court !== court) return false;
      if (difficulty !== "All" && item.difficulty !== difficulty) return false;
      if (onlyMine && !bookmarks.includes(item.id)) return false;
      return true;
    });
  }, [q, topic, jurisdiction, court, difficulty, onlyMine, bookmarks]);

  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl">Case law library</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">English authorities are marked English. Nigerian entries say when you still need to read the judgment for the facts.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cases" aria-label="Search cases" className="h-11 rounded-xl border border-line bg-card px-3 sm:col-span-2 lg:col-span-3" />
          <Select label="Topic" value={topic} options={topics} onChange={setTopic} />
          <Select label="Jurisdiction" value={jurisdiction} options={["All", "Nigeria", "England"]} onChange={setJurisdiction} />
          <Select label="Court" value={court} options={courts} onChange={setCourt} />
          <Select label="Difficulty" value={difficulty} options={["All", "beginner", "intermediate", "advanced"]} onChange={setDifficulty} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} /> My cases ({bookmarks.length})
          </label>
        </div>
        {filtered.length === 0 ? (
          <p className="mt-6 text-sm text-muted">No cases match those filters.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <Link to="/cases/$caseId" params={{ caseId: item.id }} className="block rounded-2xl border border-line bg-card p-4 hover:border-gold">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-muted">{item.cite} · {item.court} · {item.year}</p>
                    </div>
                    <p className="text-xs text-gold-ink">{STATUS_LABEL[item.status]}</p>
                  </div>
                  <p className="mt-2 text-sm">{item.principle}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="text-sm">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
