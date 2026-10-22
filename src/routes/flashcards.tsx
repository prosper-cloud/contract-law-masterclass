import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { cards as seedCards } from "@/content/assessments";
import { modules } from "@/content/curriculum";
import { uid } from "@/lib/format";
import { isDue, isMastered } from "@/lib/srs";
import { useStudy, type CustomCard } from "@/lib/store";
import type { Grade } from "@/lib/srs";

export const Route = createFileRoute("/flashcards")({
  validateSearch: (search: Record<string, unknown>) => ({
    module: typeof search.module === "string" ? search.module : "all",
  }),
  component: FlashPage,
});

function FlashPage() {
  const initial = Route.useSearch().module;
  const customCards = useStudy((s) => s.customCards);
  const progress = useStudy((s) => s.cardProgress);
  const gradeCard = useStudy((s) => s.gradeCard);
  const addCustomCard = useStudy((s) => s.addCustomCard);
  const deleteCustomCard = useStudy((s) => s.deleteCustomCard);
  const [moduleId, setModuleId] = useState(initial);
  const [difficulty, setDifficulty] = useState("all");
  const [weakFirst, setWeakFirst] = useState(true);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const deck = useMemo(() => {
    const all = [...seedCards, ...customCards];
    const filtered = all.filter((card) => {
      if (moduleId !== "all" && card.moduleId !== moduleId) return false;
      if (difficulty !== "all" && card.difficulty !== difficulty) return false;
      return true;
    });
    if (!weakFirst) return filtered;
    return [...filtered].sort((a, b) => {
      const ad = isDue(progress[a.id]) ? 0 : 1;
      const bd = isDue(progress[b.id]) ? 0 : 1;
      return ad - bd;
    });
  }, [customCards, moduleId, difficulty, weakFirst, progress]);

  const card = deck[index] ?? null;
  const mastered = [...seedCards, ...customCards].filter((item) => isMastered(progress[item.id])).length;

  function grade(value: Grade) {
    if (!card) return;
    gradeCard(card.id, value);
    setRevealed(false);
    setIndex((current) => (deck.length <= 1 ? 0 : (current + 1) % deck.length));
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl">Flashcards</h1>
        <p className="mt-2 text-sm text-muted">{mastered} mastered · spaced repetition schedules the next review from Again, Hard, Good, or Easy.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <label className="text-sm">Topic
            <select value={moduleId} onChange={(e) => { setModuleId(e.target.value); setIndex(0); }} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
              <option value="all">All topics</option>
              {modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
            </select>
          </label>
          <label className="text-sm">Difficulty
            <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value); setIndex(0); }} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label className="flex items-end gap-2 pb-2 text-sm">
            <input type="checkbox" checked={weakFirst} onChange={(e) => setWeakFirst(e.target.checked)} /> Due and new cards first
          </label>
        </div>
        {!card ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line p-6 text-sm">No cards match. Clear a filter or add your own.</p>
        ) : (
          <div className="mt-6">
            <button type="button" onClick={() => setRevealed((v) => !v)} className="min-h-48 w-full rounded-2xl border border-line bg-card p-6 text-left">
              <p className="text-xs uppercase tracking-wide text-muted">{revealed ? "Answer" : "Tap to reveal"} · {index + 1}/{deck.length}</p>
              <p className="mt-3 font-serif text-2xl">{revealed ? card.back : card.front}</p>
              {revealed && <p className="mt-3 text-sm text-muted">{card.simple}</p>}
              {revealed && card.authority && <p className="mt-2 text-sm text-gold-ink">{card.authority}</p>}
            </button>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="h-11 rounded-xl border border-line px-3" onClick={() => setIndex((i) => (i - 1 + deck.length) % deck.length)}>Previous</button>
              <button type="button" className="h-11 rounded-xl border border-line px-3" onClick={() => { setRevealed(false); setIndex((i) => (i + 1) % deck.length); }}>Next</button>
            </div>
            {revealed && (
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(["again", "hard", "good", "easy"] as Grade[]).map((value) => (
                  <button key={value} type="button" onClick={() => grade(value)} className="h-11 rounded-xl bg-navy text-sm capitalize text-paper">{value}</button>
                ))}
              </div>
            )}
            {"id" in card && customCards.some((item) => item.id === card.id) && (
              <button type="button" className="mt-3 text-sm text-danger" onClick={() => deleteCustomCard(card.id)}>Delete this custom card</button>
            )}
          </div>
        )}
        <form
          className="mt-8 space-y-2 rounded-2xl border border-line bg-card p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!front.trim() || !back.trim()) return;
            const card: CustomCard = { id: uid(), moduleId: moduleId === "all" ? "introduction" : moduleId, difficulty: "beginner", front: front.trim(), back: back.trim(), simple: "Your card." };
            addCustomCard(card);
            setFront("");
            setBack("");
          }}
        >
          <h2 className="font-semibold">Make a card</h2>
          <input value={front} onChange={(e) => setFront(e.target.value)} placeholder="Front" aria-label="Card front" className="h-11 w-full rounded-xl border border-line px-3" />
          <textarea value={back} onChange={(e) => setBack(e.target.value)} placeholder="Back" aria-label="Card back" className="min-h-20 w-full rounded-xl border border-line p-3" />
          <button className="h-11 rounded-xl bg-gold px-4 text-sm font-semibold text-navy" type="submit">Add card</button>
        </form>
      </div>
    </Shell>
  );
}
