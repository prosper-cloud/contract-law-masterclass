import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { modules } from "@/content/curriculum";
import { uid } from "@/lib/format";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/notes")({ component: NotesPage });

function NotesPage() {
  const notes = useStudy((s) => s.notes);
  const saveNote = useStudy((s) => s.saveNote);
  const deleteNote = useStudy((s) => s.deleteNote);
  const addCustomCard = useStudy((s) => s.addCustomCard);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(notes[0]?.id ?? null);
  const [length, setLength] = useState<"one" | "five" | "detail">("five");
  const note = notes.find((item) => item.id === active) ?? null;
  const visible = useMemo(
    () => notes.filter((item) => `${item.title} ${item.body} ${item.topic}`.toLowerCase().includes(query.toLowerCase())),
    [notes, query],
  );

  function create() {
    const id = uid();
    saveNote({ id, title: "Untitled note", body: "", topic: "General", pinned: false, updatedAt: Date.now() });
    setActive(id);
  }

  function summarise() {
    if (!note) return;
    const module = modules.find((item) => item.title === note.topic) ?? modules.find((item) => note.body.toLowerCase().includes(item.title.toLowerCase()));
    const base = module ? module.summary : note.body.split(/\n/).filter(Boolean);
    const text =
      length === "one"
        ? base.slice(0, 1).join(" ")
        : length === "five"
          ? base.slice(0, 4).join("\n")
          : (module ? [...module.summary, ...module.examTips] : base).join("\n");
    const suffix = "\n\n— Summary keeps the exceptions already in your note or the chapter. It is not a new source of law.";
    saveNote({ ...note, body: `${note.body}\n\n${text}${suffix}`.trim(), updatedAt: Date.now() });
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[260px_1fr]">
        <aside>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl">Notes</h1>
            <button type="button" onClick={create} className="h-10 rounded-xl bg-navy px-3 text-sm text-paper">New</button>
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes" aria-label="Search notes" className="mt-3 h-11 w-full rounded-xl border border-line bg-card px-3" />
          {visible.length === 0 ? <p className="mt-4 text-sm text-muted">No notes yet.</p> : (
            <ul className="mt-3 space-y-2">
              {visible
                .slice()
                .sort((a, b) => Number(b.pinned) - Number(a.pinned))
                .map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => setActive(item.id)} className="w-full rounded-xl border border-line bg-card px-3 py-3 text-left text-sm">
                      {item.pinned ? "Pinned · " : ""}{item.title}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </aside>
        {note ? (
          <section className="space-y-3">
            <input value={note.title} onChange={(e) => saveNote({ ...note, title: e.target.value, updatedAt: Date.now() })} aria-label="Note title" className="h-11 w-full rounded-xl border border-line bg-card px-3 text-lg font-semibold" />
            <label className="block text-sm">Topic
              <select value={note.topic} onChange={(e) => saveNote({ ...note, topic: e.target.value, updatedAt: Date.now() })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
                <option>General</option>
                {modules.map((module) => <option key={module.id}>{module.title}</option>)}
              </select>
            </label>
            <textarea value={note.body} onChange={(e) => saveNote({ ...note, body: e.target.value, updatedAt: Date.now() })} aria-label="Note body" className="min-h-80 w-full rounded-2xl border border-line bg-card p-4 font-serif leading-relaxed" />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="h-11 rounded-xl border border-line px-3 text-sm" onClick={() => saveNote({ ...note, pinned: !note.pinned, updatedAt: Date.now() })}>{note.pinned ? "Unpin" : "Pin"}</button>
              <select value={length} onChange={(e) => setLength(e.target.value as typeof length)} className="h-11 rounded-xl border border-line bg-card px-2 text-sm" aria-label="Summary length">
                <option value="one">One-minute summary</option>
                <option value="five">Five-minute revision</option>
                <option value="detail">Examination outline</option>
              </select>
              <button type="button" className="h-11 rounded-xl border border-line px-3 text-sm" onClick={summarise}>Add chapter summary</button>
              <button
                type="button"
                className="h-11 rounded-xl border border-line px-3 text-sm"
                onClick={() => addCustomCard({ id: uid(), moduleId: "introduction", difficulty: "beginner", front: note.title, back: note.body.slice(0, 280) || "Add the answer.", simple: "Made from your note." })}
              >
                Make a flashcard
              </button>
              <button type="button" className="h-11 rounded-xl border border-line px-3 text-sm" onClick={() => window.print()}>Export / print</button>
              <button type="button" className="h-11 rounded-xl px-3 text-sm text-danger" onClick={() => { deleteNote(note.id); setActive(null); }}>Delete</button>
            </div>
          </section>
        ) : (
          <p className="text-sm text-muted">Create a note, or open one from a lesson by copying a passage here.</p>
        )}
      </div>
    </Shell>
  );
}
