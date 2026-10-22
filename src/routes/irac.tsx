import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { modules } from "@/content/curriculum";
import { uid } from "@/lib/format";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/irac")({
  validateSearch: (search: Record<string, unknown>) => ({
    problem: typeof search.problem === "string" ? search.problem : "",
  }),
  component: IracPage,
});

function IracPage() {
  const problems = modules.map((module) => module.problem);
  const searchProblem = Route.useSearch().problem;
  const [problemId, setProblemId] = useState(searchProblem || problems[0].id);
  const isOwn = problemId === "own";
  const problem = problems.find((item) => item.id === problemId) ?? problems[0];
  const drafts = useStudy((s) => s.drafts);
  const saveDraft = useStudy((s) => s.saveDraft);
  const deleteDraft = useStudy((s) => s.deleteDraft);
  const [facts, setFacts] = useState("");
  const [issue, setIssue] = useState("");
  const [rule, setRule] = useState("");
  const [application, setApplication] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [ownFacts, setOwnFacts] = useState("");
  const hints = useMemo(
    () => buildHints(isOwn ? ownFacts : problem.facts, { facts, issue, rule, application, conclusion }),
    [isOwn, ownFacts, problem.facts, facts, issue, rule, application, conclusion],
  );

  function load(id: string) {
    const draft = drafts.find((item) => item.id === id);
    if (!draft) return;
    setProblemId(draft.problemId);
    setFacts(draft.facts);
    setIssue(draft.issue);
    setRule(draft.rule);
    setApplication(draft.application);
    setConclusion(draft.conclusion);
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <h1 className="font-serif text-3xl">IRAC / FIRAC lab</h1>
          <p className="mt-2 text-sm text-muted">FIRAC adds a facts paragraph. If your lecturer wants IRAC only, leave facts short and put the story inside application. The hints below are structural. They are not a grade.</p>
          <label className="mt-4 block text-sm">Scenario
            <select value={isOwn ? "own" : problem.id} onChange={(e) => { setProblemId(e.target.value); setShowModel(false); }} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
              {problems.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
              <option value="own">My own problem</option>
            </select>
          </label>
          {isOwn ? (
            <textarea value={ownFacts} onChange={(e) => setOwnFacts(e.target.value)} placeholder="Paste the problem question" className="mt-3 min-h-32 w-full rounded-xl border border-line bg-card p-3" />
          ) : (
            <p className="mt-3 rounded-2xl bg-tint p-4 text-sm leading-relaxed">{problem.facts}</p>
          )}
          <div className="mt-4 space-y-3">
            <Field label="Facts" value={facts} onChange={setFacts} />
            <Field label="Issue" value={issue} onChange={setIssue} />
            <Field label="Rule" value={rule} onChange={setRule} />
            <Field label="Application" value={application} onChange={setApplication} />
            <Field label="Conclusion" value={conclusion} onChange={setConclusion} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="h-11 rounded-xl bg-navy px-4 text-sm text-paper"
              onClick={() =>
                saveDraft({
                  id: uid(),
                  problemId: problem.id,
                  title: isOwn ? "Own problem" : problem.title,
                  facts, issue, rule, application, conclusion,
                  updatedAt: Date.now(),
                })
              }
            >
              Save answer
            </button>
            <button type="button" className="h-11 rounded-xl border border-line px-4 text-sm" onClick={() => setShowModel((v) => !v)}>
              {showModel ? "Hide model" : "Show model answer"}
            </button>
            <button type="button" className="h-11 rounded-xl border border-line px-4 text-sm" onClick={() => window.print()}>Export / print</button>
          </div>
          <ul className="mt-4 space-y-1 text-sm">
            {hints.map((hint) => <li key={hint}>{hint}</li>)}
          </ul>
          {showModel && !isOwn && (
            <div className="mt-4 space-y-2 rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed">
              <p><strong>Issues. </strong>{problem.issues.join(" ")}</p>
              <p><strong>Rule. </strong>{problem.rules.join(" ")}</p>
              <p><strong>Application. </strong>{problem.application.join(" ")}</p>
              <p><strong>Conclusion. </strong>{problem.conclusion}</p>
            </div>
          )}
        </div>
        <aside>
          <h2 className="font-semibold">Saved answers</h2>
          {drafts.length === 0 ? <p className="mt-2 text-sm text-muted">None yet.</p> : (
            <ul className="mt-2 space-y-2">
              {drafts.map((draft) => (
                <li key={draft.id} className="rounded-xl border border-line bg-card p-3 text-sm">
                  <p className="font-medium">{draft.title}</p>
                  <p className="text-xs text-muted">{new Date(draft.updatedAt).toLocaleString()}</p>
                  <button type="button" className="mt-2 text-emerald-ink" onClick={() => load(draft.id)}>Open</button>
                  <button type="button" className="ml-3 text-danger" onClick={() => deleteDraft(draft.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </Shell>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 min-h-24 w-full rounded-xl border border-line bg-card p-3 font-normal" />
    </label>
  );
}

function buildHints(sourceFacts: string, answer: { facts: string; issue: string; rule: string; application: string; conclusion: string }) {
  const hints = ["Structural hints, not a mark:"];
  hints.push(answer.issue.includes("?") ? "Issue is framed as a question." : "Turn the issue into a question.");
  hints.push(answer.rule.length > 40 ? "The rule paragraph has some substance." : "State the rule in more than a phrase, and name an authority if you know one.");
  const factWord = sourceFacts.split(/\s+/).find((word) => word.length > 5 && answer.application.toLowerCase().includes(word.toLowerCase().replace(/[^a-z]/gi, "")));
  hints.push(factWord ? "Application uses language from the facts." : "Apply the rule to a specific fact, not only to the topic.");
  hints.push(answer.conclusion.length > 20 ? "There is a conclusion." : "End with what the court should do.");
  return hints;
}
