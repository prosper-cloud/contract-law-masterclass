import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLink } from "@/components/app-link";
import { Shell } from "@/components/shell";
import { askTutor, type TutorMode } from "@/lib/tutor.functions";

export const Route = createFileRoute("/tutor")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    mode: typeof search.mode === "string" ? search.mode : "simple",
  }),
  component: TutorPage,
});

const MODES: { id: TutorMode; label: string }[] = [
  { id: "simple", label: "Simple" },
  { id: "lecturer", label: "Lecturer" },
  { id: "case", label: "Case law" },
  { id: "exam", label: "Exam coach" },
  { id: "socratic", label: "Socratic" },
  { id: "revision", label: "Revision" },
  { id: "problem", label: "Problem" },
  { id: "compare", label: "Compare" },
];

const PROMPTS = [
  "Explain consideration like I am a 100-level student.",
  "What is the difference between an offer and an invitation to treat?",
  "Explain Carlill using FIRAC, and label the jurisdiction.",
  "Give me a Nigerian hypothetical of anticipatory breach.",
  "Test me on the doctrine of privity.",
];

type Msg = { role: "user" | "assistant"; content: string; source?: "library" | "grok" };

function TutorPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<TutorMode>(MODES.some((item) => item.id === search.mode) ? (search.mode as TutorMode) : "simple");
  const [question, setQuestion] = useState(search.q);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [links, setLinks] = useState<{ title: string; href: string }[]>([]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setError("");
    setPending(true);
    const history = messages.slice(-6);
    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setQuestion("");
    try {
      const result = await askTutor({ data: { question: trimmed, mode, history } });
      if (!result.ok) {
        setError(result.error);
        setLinks(result.snippets.map((s) => ({ title: s.title, href: s.href })));
      } else {
        setMessages((current) => [...current, { role: "assistant", content: result.text, source: result.source }]);
        setLinks(result.snippets.map((s) => ({ title: s.title, href: s.href })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "The tutor could not answer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted">Tutor mode</p>
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`block h-10 w-full rounded-xl px-3 text-left text-sm ${mode === item.id ? "bg-navy text-paper" : "border border-line bg-card"}`}
            >
              {item.label}
            </button>
          ))}
        </aside>
        <section>
          <h1 className="font-serif text-3xl">AI tutor</h1>
          <p className="mt-2 text-sm text-muted">
            Nigerian contract law first. If the live model is unavailable, answers are taken from the course library and labelled as such. This is study help, not legal advice.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PROMPTS.map((prompt) => (
              <button key={prompt} type="button" onClick={() => ask(prompt)} className="rounded-full border border-line px-3 py-2 text-left text-sm">
                {prompt}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {messages.length === 0 && <p className="rounded-2xl border border-dashed border-line p-6 text-sm text-muted">Ask a question, or use a prompt. Nothing is sent until you do.</p>}
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`rounded-2xl p-4 text-sm leading-relaxed ${message.role === "user" ? "bg-navy text-paper" : "border border-line bg-card"}`}>
                {message.source && (
                  <p className="mb-2 text-xs uppercase tracking-wide text-gold-ink">
                    {message.source === "grok" ? "Live tutor" : "Course library — not a live model"}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </article>
            ))}
            {pending && <p className="text-sm text-muted">Thinking…</p>}
            {error && <p className="text-sm text-danger" role="alert">{error}</p>}
          </div>
          {links.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <AppLink to={link.href} className="text-sm text-emerald-ink">{link.title}</AppLink>
                </li>
              ))}
            </ul>
          )}
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void ask(question);
            }}
          >
            <label className="sr-only" htmlFor="tutor-q">Question</label>
            <textarea id="tutor-q" value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} className="min-h-11 flex-1 rounded-xl border border-line bg-card p-3 text-sm" placeholder="Ask about a rule, a case, or your own paragraph" />
            <button className="h-11 rounded-xl bg-gold px-4 text-sm font-semibold text-navy" type="submit" disabled={pending}>Ask</button>
          </form>
        </section>
      </div>
    </Shell>
  );
}
