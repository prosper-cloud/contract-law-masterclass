import { cards as seedCards, quizzes } from "@/content/assessments";
import { getModule, modules } from "@/content/curriculum";
import type { Level } from "@/content/types";
import { isDue, isMastered, type CardProgress } from "@/lib/srs";
import type { CustomCard, Objective, QuizAttempt } from "@/lib/store";

export function allCards(custom: CustomCard[]) {
  return [...seedCards, ...custom];
}

export function masteredCount(progress: Record<string, CardProgress>, custom: CustomCard[]) {
  return allCards(custom).filter((card) => isMastered(progress[card.id])).length;
}

export function dueCardList(progress: Record<string, CardProgress>, custom: CustomCard[]) {
  return allCards(custom).filter((card) => isDue(progress[card.id]));
}

export function averageScore(attempts: QuizAttempt[]): number | null {
  if (!attempts.length) return null;
  const pct = attempts.reduce((sum, attempt) => sum + attempt.score / Math.max(attempt.total, 1), 0) / attempts.length;
  return Math.round(pct * 100);
}

export function completedCount(completed: Record<string, number>): number {
  return modules.filter((module) => completed[module.id] === 100).length;
}

export function continueModule(lastId: string | null, completed: Record<string, number>) {
  if (lastId) {
    const current = getModule(lastId);
    if (current && completed[current.id] !== 100) return current;
  }
  return modules.find((module) => completed[module.id] !== 100) ?? modules[0];
}

export function recommendModule(completed: Record<string, number>, level: Level, objectives: Objective[]) {
  const ready = modules.filter(
    (module) => completed[module.id] !== 100 && module.prerequisites.every((id) => completed[id] === 100),
  );
  const pool = ready.length ? ready : modules.filter((module) => completed[module.id] !== 100);
  if (!pool.length) return modules[modules.length - 1];
  if (objectives.includes("cases")) {
    const hit = pool.find((module) => module.id === "offer" || module.id === "privity" || module.id === "vitiating");
    if (hit) return hit;
  }
  if ((objectives.includes("problems") || objectives.includes("exams")) && level !== "beginner") {
    const hit = pool.find((module) => module.id === "exams" || module.id === "breach");
    if (hit) return hit;
  }
  return pool.find((module) => module.level === level) ?? pool[0];
}

export function weakQuiz(attempts: QuizAttempt[]) {
  const totals = new Map<string, { score: number; total: number }>();
  for (const attempt of attempts) {
    const row = totals.get(attempt.quizId) ?? { score: 0, total: 0 };
    row.score += attempt.score;
    row.total += attempt.total;
    totals.set(attempt.quizId, row);
  }
  let worst: { quizId: string; pct: number } | null = null;
  for (const [quizId, row] of totals) {
    const pct = row.score / Math.max(row.total, 1);
    if (!worst || pct < worst.pct) worst = { quizId, pct };
  }
  if (!worst) return null;
  return { ...worst, quiz: quizzes.find((quiz) => quiz.id === worst.quizId) };
}
