import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { getQuiz } from "@/content/assessments";
import type { Question } from "@/content/types";
import { uid } from "@/lib/format";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/quizzes/$quizId")({ component: QuizPage });

type Answers = Record<string, string>;

function QuizPage() {
  const { quizId } = Route.useParams();
  const quiz = getQuiz(quizId);
  const record = useStudy((s) => s.recordAttempt);
  const attempts = useStudy((s) => s.attempts.filter((item) => item.quizId === quizId));
  const [order, setOrder] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [checks, setChecks] = useState<Record<string, boolean[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timed, setTimed] = useState(false);
  const [left, setLeft] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!quiz) return;
    setOrder([...quiz.questions].sort(() => Math.random() - 0.5));
    setLeft(quiz.minutes * 60);
  }, [quiz]);

  useEffect(() => {
    if (!started || !timed || submitted) return;
    const id = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setSubmitted(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, timed, submitted]);

  const score = useMemo(() => (quiz ? mark(order, answers, checks) : { correct: 0, total: 0 }), [quiz, order, answers, checks]);

  if (!quiz) return <Shell><p>That quiz is not available.</p></Shell>;

  function save() {
    record({
      id: uid(),
      quizId: quiz!.id,
      score: score.correct,
      total: score.total,
      at: Date.now(),
      topicScores: { [quiz!.moduleId]: { correct: score.correct, total: score.total } },
      missed: order.filter((q) => !questionCorrect(q, answers[q.id] ?? "", checks[q.id])).map((q) => q.id),
    });
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <Link to="/quizzes" className="text-sm text-muted">All quizzes</Link>
        <h1 className="mt-2 font-serif text-3xl">{quiz.title}</h1>
        <p className="mt-2 text-sm text-muted">{quiz.blurb}</p>
        {!started ? (
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} /> Timed mode ({quiz.minutes} minutes)
            </label>
            <button type="button" className="h-11 rounded-xl bg-navy px-4 text-sm text-paper" onClick={() => setStarted(true)}>Start</button>
          </div>
        ) : (
          <>
            {timed && <p className="mt-3 text-sm tabular-nums">Time left {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</p>}
            <ol className="mt-4 space-y-4">
              {order.map((question, index) => (
                <li key={question.id} className="rounded-2xl border border-line bg-card p-4">
                  <p className="text-sm font-medium">{index + 1}. {question.prompt}</p>
                  <QuestionInput question={question} value={answers[question.id] ?? ""} disabled={submitted} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} />
                  {submitted && <Feedback question={question} answer={answers[question.id] ?? ""} checks={checks[question.id] ?? []} onCheck={(next) => setChecks((current) => ({ ...current, [question.id]: next }))} />}
                </li>
              ))}
            </ol>
            {!submitted ? (
              <button type="button" className="mt-4 h-11 rounded-xl bg-gold px-4 text-sm font-semibold text-navy" onClick={() => setSubmitted(true)}>Submit</button>
            ) : (
              <div className="mt-4 rounded-2xl bg-tint p-4">
                <p className="text-lg font-semibold tabular-nums">{score.correct} / {score.total}</p>
                <p className="text-sm text-muted">Short-answer points are the rubric boxes you confirm after reading the model. They are not keyword marks.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="h-11 rounded-xl bg-navy px-4 text-sm text-paper" onClick={save}>Save this attempt</button>
                  <button type="button" className="h-11 rounded-xl border border-line px-4 text-sm" onClick={() => { setSubmitted(false); setAnswers({}); setChecks({}); setStarted(false); }}>Retry</button>
                </div>
              </div>
            )}
            {attempts.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold">Previous attempts</h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {attempts.slice(0, 5).map((attempt) => (
                    <li key={attempt.id}>{new Date(attempt.at).toLocaleString()} · {attempt.score}/{attempt.total}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}

function QuestionInput({ question, value, onChange, disabled }: { question: Question; value: string; onChange: (value: string) => void; disabled: boolean }) {
  if (question.type === "mcq") {
    return (
      <div className="mt-3 space-y-2">
        {question.choices.map((choice, index) => (
          <label key={choice} className="flex gap-2 text-sm">
            <input type="radio" name={question.id} disabled={disabled} checked={value === String(index)} onChange={() => onChange(String(index))} />
            {choice}
          </label>
        ))}
      </div>
    );
  }
  if (question.type === "tf") {
    return (
      <div className="mt-3 flex gap-3 text-sm">
        {["true", "false"].map((option) => (
          <label key={option} className="flex items-center gap-2 capitalize">
            <input type="radio" name={question.id} disabled={disabled} checked={value === option} onChange={() => onChange(option)} /> {option}
          </label>
        ))}
      </div>
    );
  }
  if (question.type === "fill") {
    return <input disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="mt-3 h-11 w-full rounded-xl border border-line px-3" aria-label="Your answer" />;
  }
  if (question.type === "match") {
    const selected = value ? (JSON.parse(value) as Record<string, string>) : {};
    const rights = question.pairs.map((pair) => pair.right);
    return (
      <div className="mt-3 space-y-2">
        {question.pairs.map((pair) => (
          <label key={pair.left} className="grid gap-1 text-sm sm:grid-cols-2 sm:items-center">
            {pair.left}
            <select
              disabled={disabled}
              value={selected[pair.left] ?? ""}
              onChange={(e) => onChange(JSON.stringify({ ...selected, [pair.left]: e.target.value }))}
              className="h-11 rounded-xl border border-line bg-card px-2"
            >
              <option value="">Choose</option>
              {rights.map((right) => <option key={right}>{right}</option>)}
            </select>
          </label>
        ))}
      </div>
    );
  }
  return <textarea disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-line p-3" aria-label="Your answer" />;
}

function Feedback({ question, answer, checks, onCheck }: { question: Question; answer: string; checks: boolean[]; onCheck: (next: boolean[]) => void }) {
  const ok = questionCorrect(question, answer, checks);
  return (
    <div className="mt-3 rounded-xl bg-tint p-3 text-sm">
      <p className={ok ? "text-emerald-ink" : "text-danger"}>{ok ? "Meets the key" : "Needs another look"}</p>
      {question.type === "mcq" && (
        <>
          <p className="mt-1">{question.explanation}</p>
          <ul className="mt-2 space-y-1">
            {question.choices.map((choice, index) => index !== question.answer && question.whyWrong[index] ? <li key={choice}>Not “{choice}”: {question.whyWrong[index]}</li> : null)}
          </ul>
        </>
      )}
      {question.type === "tf" && <p className="mt-1">{question.explanation} The statement is {question.answer ? "true" : "false"}.</p>}
      {question.type === "fill" && <p className="mt-1">{question.explanation} Accepted: {question.answers.join(", ")}.</p>}
      {question.type === "match" && <p className="mt-1">{question.explanation}</p>}
      {question.type === "short" && (
        <div className="mt-2 space-y-2">
          <p>{question.model}</p>
          <p className="font-medium">Rubric — tick what your answer actually did</p>
          {question.rubric.map((item, index) => (
            <label key={item} className="flex gap-2">
              <input
                type="checkbox"
                checked={Boolean(checks[index])}
                onChange={(e) => {
                  const next = [...checks];
                  next[index] = e.target.checked;
                  onCheck(next);
                }}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function questionCorrect(question: Question, answer: string, checks?: boolean[]): boolean {
  if (question.type === "mcq") return Number(answer) === question.answer;
  if (question.type === "tf") return answer === String(question.answer);
  if (question.type === "fill") return question.answers.some((item) => normalise(item) === normalise(answer));
  if (question.type === "match") {
    if (!answer) return false;
    try {
      const selected = JSON.parse(answer) as Record<string, string>;
      return question.pairs.every((pair) => selected[pair.left] === pair.right);
    } catch {
      return false;
    }
  }
  const ticks = checks ?? [];
  return question.rubric.length > 0 && question.rubric.every((_, index) => ticks[index]);
}

function mark(order: Question[], answers: Answers, checks: Record<string, boolean[]>) {
  let correct = 0;
  for (const question of order) {
    const points = question.type === "short" ? question.rubric.length : 1;
    if (question.type === "short") correct += (checks[question.id] ?? []).filter(Boolean).length;
    else if (questionCorrect(question, answers[question.id] ?? "")) correct += points;
  }
  const total = order.reduce((sum, question) => sum + (question.type === "short" ? question.rubric.length : 1), 0);
  return { correct, total };
}
