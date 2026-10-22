import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Shell } from "@/components/shell";
import { modules } from "@/content/curriculum";
import { formatMinutes } from "@/lib/format";
import { averageScore, completedCount, masteredCount, weakQuiz } from "@/lib/plan";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const [ready, setReady] = useState(false);
  const completed = useStudy((s) => s.completed);
  const dayMs = useStudy((s) => s.dayMs);
  const attempts = useStudy((s) => s.attempts);
  const studyMs = useStudy((s) => s.studyMs);
  const streak = useStudy((s) => s.streak);
  const cardProgress = useStudy((s) => s.cardProgress);
  const customCards = useStudy((s) => s.customCards);
  useEffect(() => setReady(true), []);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return { day: key.slice(5), minutes: Math.round((dayMs[key] ?? 0) / 60000) };
  });
  const topics = modules.map((module) => ({ name: `M${module.num}`, progress: completed[module.id] ?? 0 }));
  const scores = attempts.slice(0, 8).reverse().map((attempt, index) => ({
    name: `${index + 1}`,
    score: Math.round((attempt.score / Math.max(attempt.total, 1)) * 100),
  }));
  const weak = weakQuiz(attempts);

  return (
    <Shell>
      <div className="mx-auto max-w-5xl space-y-5">
        <h1 className="font-serif text-3xl">Progress</h1>
        <p className="text-sm text-muted">These figures come from chapters you opened, cards you graded, and quizzes you saved. Empty charts mean you have not studied yet.</p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile label="Streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
          <Tile label="Study time" value={formatMinutes(studyMs)} />
          <Tile label="Chapters" value={`${completedCount(completed)}/${modules.length}`} />
          <Tile label="Quiz average" value={averageScore(attempts) === null ? "—" : `${averageScore(attempts)}%`} />
        </div>
        <p className="text-sm">{masteredCount(cardProgress, customCards)} flashcards meet the mastery rule (three good reviews and a long interval).</p>
        {weak?.quiz && (
          <p className="text-sm">
            Weakest saved quiz: {weak.quiz.title} at {Math.round(weak.pct * 100)}%.{" "}
            <Link to="/quizzes/$quizId" params={{ quizId: weak.quiz.id }} className="text-emerald-ink">Retry it</Link>
          </p>
        )}
        <Chart title="Minutes studied, last 7 days" data={days} dataKey="minutes" ready={ready} empty={days.every((d) => d.minutes === 0)} />
        <Chart title="Chapter progress" data={topics} dataKey="progress" ready={ready} empty={topics.every((d) => d.progress === 0)} />
        <Chart title="Saved quiz scores" data={scores} dataKey="score" ready={ready} empty={scores.length === 0} />
      </div>
    </Shell>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-line bg-card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </article>
  );
}

function Chart({ title, data, dataKey, ready, empty }: { title: string; data: { name?: string; day?: string }[]; dataKey: string; ready: boolean; empty: boolean }) {
  return (
    <section className="rounded-2xl border border-line bg-card p-4">
      <h2 className="font-semibold">{title}</h2>
      {empty ? <p className="mt-3 text-sm text-muted">No data yet.</p> : ready ? (
        <div className="mt-3 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey={data[0] && "day" in data[0] ? "day" : "name"} tick={{ fill: "currentColor", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "currentColor", fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey={dataKey} fill="var(--emerald)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : <div className="mt-3 h-52 animate-pulse rounded-xl bg-tint" />}
    </section>
  );
}
