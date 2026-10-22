import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { quizzes } from "@/content/assessments";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/quizzes")({ component: QuizList });

function QuizList() {
  const attempts = useStudy((s) => s.attempts);
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl">Practice quizzes</h1>
        <p className="mt-2 text-sm text-muted">Objective questions are marked from the answer key. Short answers use a visible rubric and are not failed for wording alone.</p>
        <ul className="mt-5 space-y-3">
          {quizzes.map((quiz) => {
            const mine = attempts.filter((attempt) => attempt.quizId === quiz.id);
            const best = mine.reduce((n, attempt) => Math.max(n, Math.round((attempt.score / Math.max(attempt.total, 1)) * 100)), 0);
            return (
              <li key={quiz.id}>
                <Link to="/quizzes/$quizId" params={{ quizId: quiz.id }} className="block rounded-2xl border border-line bg-card p-4 hover:border-gold">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="font-semibold">{quiz.title}</h2>
                      <p className="text-sm text-muted">{quiz.blurb} · {quiz.questions.length} questions · {quiz.minutes} min · {quiz.difficulty}</p>
                    </div>
                    <p className="text-sm tabular-nums">{mine.length ? `Best ${best}%` : "Not attempted"}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Shell>
  );
}
