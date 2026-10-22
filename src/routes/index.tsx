import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  FolderOpen,
  Layers,
  ListChecks,
  MessagesSquare,
  PenLine,
  Scale,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AppLink } from "@/components/app-link";
import { Shell } from "@/components/shell";
import { DISCLAIMER, modules } from "@/content/curriculum";
import type { Level } from "@/content/types";
import { formatMinutes, greeting } from "@/lib/format";
import {
  averageScore,
  completedCount,
  continueModule,
  dueCardList,
  masteredCount,
  recommendModule,
  weakQuiz,
} from "@/lib/plan";
import { useStudy, type Objective } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/")({ component: Home });

const LEVELS: { id: Level; title: string; copy: string }[] = [
  { id: "beginner", title: "Beginner / 100 level", copy: "Plain English first, then the formal rule." },
  { id: "intermediate", title: "Intermediate", copy: "More cases, exceptions, and problem practice." },
  { id: "advanced", title: "Advanced / exams", copy: "IRAC, remedies, and timed questions." },
];

const GOALS: { id: Objective; label: string }[] = [
  { id: "scratch", label: "Understand Contract Law from scratch" },
  { id: "exams", label: "Prepare for university examinations" },
  { id: "notes", label: "Revise lecture notes" },
  { id: "cases", label: "Master case law" },
  { id: "problems", label: "Practise problem questions" },
  { id: "essays", label: "Improve essay writing" },
  { id: "assessment", label: "Prepare for continuous assessment" },
];

function Home() {
  const hydrated = useHydrated();
  return <Shell>{!hydrated ? <DashboardSkeleton /> : <HomeBody />}</Shell>;
}

function HomeBody() {
  const onboarded = useStudy((s) => s.onboarded);
  if (!onboarded) return <Welcome />;
  return <Dashboard />;
}

function Welcome() {
  const complete = useStudy((s) => s.completeOnboarding);
  const [name, setName] = useState("Browne");
  const [level, setLevel] = useState<Level>("beginner");
  const [objectives, setObjectives] = useState<Objective[]>(["scratch"]);

  function toggle(id: Objective) {
    setObjectives((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl bg-navy p-8 text-paper">
        <p className="text-sm font-medium text-gold">Created for Browne</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">Contract Law Masterclass</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/80">
          A study desk for Nigerian contract law. Read a chapter, brief the cases, test yourself, and practise IRAC without losing your place.
        </p>
        <p className="mt-8 text-sm text-paper/70">{DISCLAIMER}</p>
      </section>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          complete({ displayName: name.trim() || "Browne", level, objectives });
        }}
      >
        <div>
          <h2 className="text-2xl font-semibold">Set up your desk</h2>
          <p className="mt-1 text-sm text-muted">You can change this later. Progress stays on this device until you sign in.</p>
        </div>
        <label className="block text-sm font-medium">
          What should we call you?
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-line bg-card px-3" />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Study level</legend>
          <div className="mt-2 grid gap-2">
            {LEVELS.map((item) => (
              <label key={item.id} className="flex cursor-pointer gap-3 rounded-xl border border-line bg-card p-3">
                <input type="radio" name="level" checked={level === item.id} onChange={() => setLevel(item.id)} />
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="text-sm text-muted">{item.copy}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">What do you want from the course?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOALS.map((goal) => {
              const on = objectives.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(goal.id)}
                  className={`min-h-11 rounded-full border px-3 text-sm ${on ? "border-emerald bg-emerald text-paper" : "border-line bg-card"}`}
                >
                  {goal.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button type="submit" className="h-11 rounded-xl bg-gold px-5 font-semibold text-navy">
          Open my dashboard
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  const name = useStudy((s) => s.displayName);
  const level = useStudy((s) => s.level);
  const objectives = useStudy((s) => s.objectives);
  const completed = useStudy((s) => s.completed);
  const lastLessonId = useStudy((s) => s.lastLessonId);
  const studyMs = useStudy((s) => s.studyMs);
  const attempts = useStudy((s) => s.attempts);
  const cardProgress = useStudy((s) => s.cardProgress);
  const customCards = useStudy((s) => s.customCards);
  const syncLabel = useStudy((s) => s.syncLabel);
  const streak = useStudy((s) => s.streak);
  const dailyGoalMin = useStudy((s) => s.dailyGoalMin);
  const current = continueModule(lastLessonId, completed);
  const next = recommendModule(completed, level, objectives);
  const due = dueCardList(cardProgress, customCards);
  const weak = weakQuiz(attempts);
  const done = completedCount(completed);
  const avg = averageScore(attempts);
  const mastered = masteredCount(cardProgress, customCards);
  const pct = completed[current.id] ?? 0;
  const plan = [
    due.length ? { href: "/flashcards", title: `Review ${Math.min(due.length, 12)} due flashcards`, note: "About 10 minutes" } : null,
    { href: `/learn/${current.id}`, title: `Continue ${current.title}`, note: `${current.minutes} min chapter` },
    weak?.quiz
      ? { href: `/quizzes/${weak.quiz.id}`, title: `Retry ${weak.quiz.title}`, note: `${Math.round(weak.pct * 100)}% so far` }
      : { href: "/irac", title: "Practise one IRAC problem", note: "About 15 minutes" },
  ].filter((item): item is { href: string; title: string; note: string } => Boolean(item));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-gold-ink">{greeting()}</p>
          <h1 className="font-serif text-3xl">{name}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            {streak > 1 ? `${streak}-day streak. ` : "Start a short session. "}
            One chapter and a handful of cards is enough for today. {syncLabel}.
          </p>
        </div>
        <p className="rounded-full border border-line bg-card px-3 py-2 text-sm capitalize">{level}</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-2xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Continue learning</p>
          <h2 className="mt-2 text-xl font-semibold">{current.title}</h2>
          <p className="mt-1 text-sm text-muted">{current.blurb}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-tint" aria-hidden>
            <div className="h-full bg-emerald" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm tabular-nums text-muted">{pct}% of sections opened</p>
          <Link to="/learn/$moduleId" params={{ moduleId: current.id }} className="mt-4 inline-flex h-11 items-center rounded-xl bg-navy px-4 text-sm font-medium text-paper">
            Continue learning
          </Link>
        </article>
        <article className="rounded-2xl border border-line bg-navy p-5 text-paper">
          <p className="text-xs uppercase tracking-wide text-gold">Today, about {Math.min(20, Math.max(10, dailyGoalMin))} minutes</p>
          <ul className="mt-3 space-y-3">
            {plan.map((item) => (
              <li key={item.title}>
                <AppLink to={item.href} className="block rounded-xl bg-white/5 px-3 py-3 hover:bg-white/10">
                  <span className="block text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-paper/70">{item.note}</span>
                </AppLink>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Modules completed" value={`${done}/${modules.length}`} />
        <Stat label="Study time" value={formatMinutes(studyMs)} />
        <Stat label="Cards mastered" value={String(mastered)} />
        <Stat label="Average quiz score" value={avg === null ? "—" : `${avg}%`} />
      </section>
      <section className="rounded-2xl border border-line bg-card p-5">
        <p className="text-xs uppercase tracking-wide text-muted">Recommended next</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{next.title}</h2>
            <p className="text-sm text-muted">{next.blurb}</p>
          </div>
          <Link to="/learn/$moduleId" params={{ moduleId: next.id }} className="inline-flex h-11 items-center rounded-xl border border-line px-4 text-sm font-medium">
            Open lesson
          </Link>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Quick to="/learn" icon={BookOpen} title="Learn Contract Law" />
        <Quick to="/tutor" icon={MessagesSquare} title="Ask the AI Tutor" />
        <Quick to="/flashcards" icon={Layers} title="Revise with Flashcards" />
        <Quick to="/quizzes" icon={ListChecks} title="Take a Practice Quiz" />
        <Quick to="/cases" icon={Scale} title="Study Cases" />
        <Quick to="/irac" icon={PenLine} title="Practise IRAC / FIRAC" />
        <Quick to="/glossary" icon={Sparkles} title="Browse Legal Glossary" />
        <Quick to="/documents" icon={FolderOpen} title="Open Study Library" />
      </section>
      <section className="rounded-2xl border border-line bg-card p-5">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-emerald-ink" />
          <h2 className="font-semibold">Upcoming revision</h2>
        </div>
        {due.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No cards are due. New cards are waiting in the deck when you want them.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {due.slice(0, 4).map((card) => (
              <li key={card.id} className="text-sm">{card.front}</li>
            ))}
          </ul>
        )}
        <Link to="/flashcards" className="mt-3 inline-flex text-sm font-medium text-emerald-ink">Open the deck</Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-line bg-card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </article>
  );
}

function Quick({ to, icon: Icon, title }: { to: "/learn" | "/tutor" | "/flashcards" | "/quizzes" | "/cases" | "/irac" | "/glossary" | "/documents"; icon: typeof BookOpen; title: string }) {
  return (
    <Link to={to} className="flex min-h-24 items-center gap-3 rounded-2xl border border-line bg-card p-4 hover:border-gold">
      <Icon className="size-5 text-gold-ink" />
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}

function DashboardSkeleton() {
  return <div className="mx-auto h-80 max-w-6xl animate-pulse rounded-2xl bg-tint" aria-hidden />;
}
