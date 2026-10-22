import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { deleteDoc, getDoc, listDocs, saveDoc, type DocRecord } from "@/lib/docs";
import { uid } from "@/lib/format";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/documents")({ component: DocumentsPage });

function DocumentsPage() {
  const [docs, setDocs] = useState<DocRecord[]>([]);
  const [error, setError] = useState("");
  const [active, setActive] = useState<DocRecord | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const saveNote = useStudy((s) => s.saveNote);
  const addCustomCard = useStudy((s) => s.addCustomCard);

  async function refresh() {
    setDocs(await listDocs());
  }

  useEffect(() => {
    refresh().catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not open your library."));
  }, []);

  useEffect(() => {
    if (!active) return;
    const next = URL.createObjectURL(active.blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [active]);

  async function onUpload(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      const text = file.type.startsWith("text") || file.name.endsWith(".md") ? await file.text() : "";
      const doc: DocRecord = {
        id: uid(),
        name: file.name,
        mime: file.type || "application/octet-stream",
        size: file.size,
        topic: "My upload",
        addedAt: Date.now(),
        text,
        notes: "",
        blob: file,
      };
      await saveDoc(doc);
      await refresh();
      setActive(doc);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The file could not be saved.");
    }
  }

  const shown = docs.filter((doc) => `${doc.name} ${doc.text} ${doc.notes}`.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl">Study library</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          These files are yours. They stay on this device and are not treated as verified law. Text files can be searched. PDFs open in the viewer below. Account sync does not upload the files themselves.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <label className="inline-flex h-11 cursor-pointer items-center rounded-xl bg-navy px-4 text-sm text-paper">
            Upload a file
            <input type="file" accept=".pdf,.txt,.md,text/plain,application/pdf" className="sr-only" onChange={(e) => void onUpload(e.target.files?.[0])} />
          </label>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search your files" aria-label="Search documents" className="h-11 min-w-48 flex-1 rounded-xl border border-line bg-card px-3" />
        </div>
        {error && (
          <p className="mt-3 text-sm text-danger" role="alert">
            {error} <button type="button" className="underline" onClick={() => refresh().catch(() => setError("Still unable to read the library."))}>Retry</button>
          </p>
        )}
        {shown.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line p-6 text-sm text-muted">No documents yet. Upload lecture notes or a PDF.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {shown.map((doc) => (
              <li key={doc.id}>
                <button type="button" onClick={() => setActive(doc)} className="w-full rounded-xl border border-line bg-card px-3 py-3 text-left text-sm">
                  {doc.name} · {Math.ceil(doc.size / 1024)} KB · {doc.topic}
                </button>
              </li>
            ))}
          </ul>
        )}
        {active && (
          <section className="mt-6 rounded-2xl border border-line bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">{active.name}</h2>
              <button type="button" className="text-sm text-danger" onClick={() => { void deleteDoc(active.id).then(refresh); setActive(null); }}>Remove</button>
            </div>
            <p className="mt-1 text-xs text-gold-ink">Your upload — not a verified legal source</p>
            {!url ? (
              <p className="mt-4 text-sm text-danger">The file did not load. <button type="button" className="underline" onClick={() => getDoc(active.id).then((doc) => doc && setActive(doc))}>Retry</button></p>
            ) : active.mime.includes("pdf") || active.name.endsWith(".pdf") ? (
              <iframe title={active.name} src={url} className="mt-3 h-[70vh] w-full rounded-xl border border-line bg-paper" />
            ) : (
              <pre className="mt-3 max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-xl bg-tint p-4 text-sm">{active.text || "No text could be read from this file. Open it with the download instead."}</pre>
            )}
            {url && <a href={url} download={active.name} className="mt-3 inline-flex text-sm text-emerald-ink">Download original</a>}
            <label className="mt-4 block text-sm">Annotation
              <textarea
                value={active.notes}
                onChange={(e) => setActive({ ...active, notes: e.target.value })}
                onBlur={() => void saveDoc(active)}
                className="mt-1 min-h-24 w-full rounded-xl border border-line p-3"
              />
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className="h-11 rounded-xl border border-line px-3 text-sm" onClick={() => saveNote({ id: uid(), title: active.name, body: active.notes || active.text.slice(0, 1500), topic: "My upload", pinned: false, updatedAt: Date.now() })}>Save as note</button>
              <button type="button" className="h-11 rounded-xl border border-line px-3 text-sm" onClick={() => addCustomCard({ id: uid(), moduleId: "introduction", difficulty: "beginner", front: `From ${active.name}`, back: (active.notes || active.text).slice(0, 240) || "Add the answer from your file.", simple: "Generated from your upload." })}>Make a flashcard</button>
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
