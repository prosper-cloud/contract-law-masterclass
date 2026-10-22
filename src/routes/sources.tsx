import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { cases } from "@/content/cases";
import { STATUS_LABEL } from "@/content/types";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/sources")({ component: SourcesPage });

function SourcesPage() {
  const notes = useStudy((s) => s.reviewNotes);
  const add = useStudy((s) => s.addReviewNote);
  const [target, setTarget] = useState(cases[0]?.name ?? "");
  const [text, setText] = useState("");

  return (
    <Shell>
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="font-serif text-3xl">Source register</h1>
        <p className="text-sm text-muted">
          Official lessons are read-only. This desk does not publish changes to other students. Use it to record a correction you want to check against the law report. Cohort analytics are not collected.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-tint">
              <tr>
                <th className="p-3 font-medium">Authority</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Source note</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={item.id} className="border-t border-line">
                  <td className="p-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted">{item.cite}</p>
                  </td>
                  <td className="p-3">{STATUS_LABEL[item.status]}</td>
                  <td className="p-3">{item.factsNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          className="space-y-2 rounded-2xl border border-line bg-card p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!text.trim()) return;
            add(target, text.trim());
            setText("");
          }}
        >
          <h2 className="font-semibold">Personal correction note</h2>
          <select value={target} onChange={(e) => setTarget(e.target.value)} className="h-11 w-full rounded-xl border border-line bg-bg px-2" aria-label="Authority">
            {cases.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
          </select>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-line p-3" placeholder="What should be checked?" aria-label="Correction note" />
          <button className="h-11 rounded-xl bg-navy px-4 text-sm text-paper" type="submit">Save note on this device</button>
        </form>
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="rounded-xl border border-line p-3 text-sm">
              <p className="font-medium">{note.target}</p>
              <p>{note.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
