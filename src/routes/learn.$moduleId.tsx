import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Maximize2, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { STATUS_LABEL } from "@/content/types";
import { DISCLAIMER, getModule } from "@/content/curriculum";
import { getQuiz } from "@/content/assessments";
import { useStudy } from "@/lib/store";

export const Route = createFileRoute("/learn/$moduleId")({ component: LessonPage });

function LessonPage() {
  const { moduleId } = Route.useParams();
  const module = getModule(moduleId);
  const openSection = useStudy((s) => s.openSection);
  const completeLesson = useStudy((s) => s.completeLesson);
  const addStudyMs = useStudy((s) => s.addStudyMs);
  const touchLesson = useStudy((s) => s.touchLesson);
  const done = useStudy((s) => (module ? s.completed[module.id] === 100 : false));
  const [focus, setFocus] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [simple, setSimple] = useState<Record<string, boolean>>({});
  const [deep, setDeep] = useState<Record<string, boolean>>({});
  const [showModel, setShowModel] = useState(false);
  const text = useMemo(() => (module ? [module.title, ...module.sections.flatMap((s) => s.paras)].join(" ") : ""), [module]);

  useEffect(() => {
    if (!module) return;
    touchLesson(module.id);
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") addStudyMs(15000);
    }, 15000);
    return () => window.clearInterval(id);
  }, [module, addStudyMs, touchLesson]);

  if (!module) {
    return (
      <Shell>
        <p>That chapter is not in the course.</p>
        <Link to="/learn" className="text-emerald-ink">Back to the curriculum</Link>
      </Shell>
    );
  }

  const quiz = getQuiz(`q-${module.id}`);

  function toggleSpeech() {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000));
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <Shell bare={focus}>
      <article className="mx-auto max-w-3xl">
        <Link to="/learn" className="inline-flex items-center gap-1 text-sm text-muted"><ChevronLeft className="size-4" /> All chapters</Link>
        <p className="mt-4 text-sm text-gold-ink">Module {module.num} · {module.minutes} min read · {module.level}</p>
        <h1 className="mt-1 font-serif text-4xl">{module.title}</h1>
        <p className="mt-3 text-muted">{module.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={toggleSpeech} className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm">
            {speaking ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            {typeof window !== "undefined" && !("speechSynthesis" in window) ? "Read aloud unavailable" : speaking ? "Stop reading" : "Read aloud"}
          </button>
          <button type="button" onClick={() => setFocus((v) => !v)} className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm">
            <Maximize2 className="size-4" /> {focus ? "Exit focus" : "Focus mode"}
          </button>
          <Link to="/tutor" search={{ q: `Explain ${module.title} like I am a 100-level student`, mode: "simple" }} className="inline-flex h-11 items-center rounded-xl border border-line px-3 text-sm">
            Ask the tutor
          </Link>
        </div>
        <p className="mt-4 rounded-xl bg-tint px-3 py-3 text-sm text-muted">{DISCLAIMER}</p>

        <section className="mt-6 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Learning objectives</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            {module.objectives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <div className="mt-4 space-y-3">
          {module.sections.map((section) => (
            <details
              key={section.id}
              className="rounded-2xl border border-line bg-card p-4"
              onToggle={(event) => {
                if ((event.currentTarget as HTMLDetailsElement).open) openSection(module.id, section.id, module.sections.length);
              }}
            >
              <summary className="cursor-pointer text-lg font-semibold">{section.title}</summary>
              <div className="mt-3 space-y-3 font-serif text-base leading-relaxed">
                {section.paras.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
              </div>
              {section.authorities && (
                <ul className="mt-3 space-y-2">
                  {section.authorities.map((authority) => (
                    <li key={authority.name} className="rounded-xl bg-tint p-3 text-sm">
                      <p className="font-medium">{authority.name}</p>
                      <p className="text-muted">{authority.cite} · {authority.jurisdiction}</p>
                      <p className="mt-1 text-gold-ink">{STATUS_LABEL[authority.status]}</p>
                      <p className="mt-1">{authority.principle}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {section.simple && (
                  <button type="button" className="h-10 rounded-lg border border-line px-3 text-sm" onClick={() => setSimple((s) => ({ ...s, [section.id]: !s[section.id] }))}>
                    Explain this simply
                  </button>
                )}
                {section.deep && (
                  <button type="button" className="h-10 rounded-lg border border-line px-3 text-sm" onClick={() => setDeep((s) => ({ ...s, [section.id]: !s[section.id] }))}>
                    Go deeper
                  </button>
                )}
              </div>
              {simple[section.id] && section.simple && <p className="mt-3 rounded-xl bg-tint p-3 text-sm">{section.simple}</p>}
              {deep[section.id] && section.deep && <p className="mt-3 rounded-xl border border-gold/50 p-3 text-sm">{section.deep}</p>}
            </details>
          ))}
        </div>

        <section className="mt-4 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Common misconceptions</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{module.myths.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="mt-4 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Exam tips</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{module.examTips.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="mt-4 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Short revision summary</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{module.summary.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="mt-4 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Key terms</h2>
          <dl className="mt-2 space-y-2">
            {module.terms.map((term) => (
              <div key={term.term}>
                <dt className="font-medium">{term.term}</dt>
                <dd className="text-sm text-muted">{term.plain}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-4 rounded-2xl border border-line bg-card p-5">
          <h2 className="font-semibold">Problem question</h2>
          <p className="mt-2 text-sm leading-relaxed">{module.problem.facts}</p>
          <p className="mt-3 text-sm font-medium">Issues to look for</p>
          <ul className="mt-1 list-disc pl-5 text-sm">{module.problem.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
          <button type="button" className="mt-3 h-11 rounded-xl border border-line px-3 text-sm" onClick={() => setShowModel((v) => !v)}>
            {showModel ? "Hide model FIRAC" : "Show model FIRAC"}
          </button>
          {showModel && (
            <div className="mt-3 space-y-2 text-sm leading-relaxed">
              <p><strong>Rule. </strong>{module.problem.rules.join(" ")}</p>
              <p><strong>Application. </strong>{module.problem.application.join(" ")}</p>
              <p><strong>Conclusion. </strong>{module.problem.conclusion}</p>
              <p className="text-muted">Authorities: {module.problem.authorities.join("; ")}</p>
            </div>
          )}
          <Link to="/irac" search={{ problem: module.problem.id }} className="mt-3 inline-flex text-sm font-medium text-emerald-ink">
            Write your own answer in the lab
          </Link>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => completeLesson(module.id)} className="h-11 rounded-xl bg-emerald px-4 text-sm font-medium text-paper">
            {done ? "Chapter completed" : "Mark chapter complete"}
          </button>
          <Link to="/flashcards" search={{ module: module.id }} className="inline-flex h-11 items-center rounded-xl border border-line px-4 text-sm">
            Chapter flashcards
          </Link>
          {quiz && (
            <Link to="/quizzes/$quizId" params={{ quizId: quiz.id }} className="inline-flex h-11 items-center rounded-xl border border-line px-4 text-sm">
              Practice quiz
            </Link>
          )}
        </div>
      </article>
    </Shell>
  );
}
