import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { modules } from "@/content/curriculum";
import { dueCardList } from "@/lib/plan";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/planner")({ component: PlannerPage });

function PlannerPage() {
  const examDate = useStudy((s) => s.examDate);
  const dailyGoalMin = useStudy((s) => s.dailyGoalMin);
  const reminder = useStudy((s) => s.reminder);
  const setProfile = useStudy((s) => s.setProfile);
  const completed = useStudy((s) => s.completed);
  const cardProgress = useStudy((s) => s.cardProgress);
  const customCards = useStudy((s) => s.customCards);
  const due = dueCardList(cardProgress, customCards).length;
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!reminder) return;
    const [hour, minute] = reminder.split(":").map(Number);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return;
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);
    if (target.getTime() <= now.getTime()) return;
    if (Notification.permission !== "granted") return;
    const id = window.setTimeout(() => {
      new Notification("Contract Law Masterclass", { body: "Your revision block is ready." });
    }, target.getTime() - now.getTime());
    return () => window.clearTimeout(id);
  }, [reminder]);

  async function enableReminder() {
    if (!("Notification" in window)) {
      setStatus("This browser cannot show notifications.");
      return;
    }
    const result = await Notification.requestPermission();
    setStatus(result === "granted" ? "Reminders can appear while this tab stays open." : "Notifications stay off.");
  }

  const days = examDate ? Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000) : null;

  return (
    <Shell>
      <div className="mx-auto max-w-3xl space-y-5">
        <h1 className="font-serif text-3xl">Study planner</h1>
        <p className="text-sm text-muted">Goals and dates live on this device. Nothing is sent unless you turn reminders on.</p>
        <label className="block text-sm">Examination date
          <input type="date" value={examDate} onChange={(e) => setProfile({ examDate: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
        </label>
        {days !== null && <p className="text-sm">{days >= 0 ? `${days} days until that date.` : "That date has passed. Set a new one if you have another paper."}</p>}
        <label className="block text-sm">Daily goal (minutes)
          <input type="number" min={10} max={120} value={dailyGoalMin} onChange={(e) => setProfile({ dailyGoalMin: Number(e.target.value) || 20 })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
        </label>
        <label className="block text-sm">Reminder time while this tab is open
          <input type="time" value={reminder} onChange={(e) => setProfile({ reminder: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
        </label>
        <button type="button" onClick={() => void enableReminder()} className="h-11 rounded-xl border border-line px-4 text-sm">Allow notifications</button>
        {status && <p className="text-sm text-muted">{status}</p>}
        <section className="rounded-2xl border border-line bg-card p-4">
          <h2 className="font-semibold">Suggested this week</h2>
          <p className="mt-1 text-sm text-muted">{due} flashcards are due.</p>
          <ul className="mt-3 space-y-2">
            {modules.filter((module) => completed[module.id] !== 100).slice(0, 5).map((module) => (
              <li key={module.id} className="flex items-center justify-between gap-3 text-sm">
                <span>{module.title}</span>
                <Link to="/learn/$moduleId" params={{ moduleId: module.id }} className="text-emerald-ink">Study</Link>
              </li>
            ))}
          </ul>
          <Link to="/quizzes/$quizId" params={{ quizId: "q-mock" }} className="mt-4 inline-flex h-11 items-center rounded-xl bg-navy px-4 text-sm text-paper">Schedule the mixed mock</Link>
        </section>
      </div>
    </Shell>
  );
}
