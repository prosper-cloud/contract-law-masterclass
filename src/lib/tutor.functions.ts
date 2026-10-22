import { createServerFn } from "@tanstack/react-start";
import { retrieve } from "@/content/search";

const MODES = ["simple", "lecturer", "case", "exam", "socratic", "revision", "problem", "compare"] as const;
export type TutorMode = (typeof MODES)[number];

const hits = new Map<string, number[]>();

function allow(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  if (recent.length >= 40) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export const askTutor = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const data = input as { question?: unknown; mode?: unknown; history?: unknown };
    const question = typeof data.question === "string" ? data.question.trim() : "";
    if (question.length < 3 || question.length > 2000) throw new Error("Ask a question between 3 and 2000 characters.");
    const mode = MODES.includes(data.mode as TutorMode) ? (data.mode as TutorMode) : "simple";
    const history = Array.isArray(data.history)
      ? data.history
          .slice(-6)
          .filter(
            (m): m is { role: "user" | "assistant"; content: string } =>
              !!m &&
              typeof m === "object" &&
              ((m as { role?: string }).role === "user" || (m as { role?: string }).role === "assistant") &&
              typeof (m as { content?: unknown }).content === "string",
          )
          .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
      : [];
    return { question, mode, history };
  })
  .handler(async ({ data }) => {
    const snippets = retrieve(data.question);
    const library = snippets
      .map((s, i) => `(${i + 1}) ${s.title}\n${s.text}`)
      .join("\n\n");
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: true as const,
        source: "library" as const,
        text: library
          ? `I can only use the course library in this session, because the live tutor is not configured.\n\nClosest material:\n\n${library}\n\nCheck the linked lesson or case before treating a citation as exam-ready. This is study help, not legal advice.`
          : "The live tutor is not configured, and nothing in the course library closely matches that question. Try a topic name such as consideration, privity, or frustration.",
        snippets,
      };
    }
    if (!allow("global")) {
      return {
        ok: false as const,
        error: "The tutor is pausing after too many questions in a short time. Try again later.",
        snippets,
      };
    }
    const modeGuide: Record<TutorMode, string> = {
      simple: "Explain as if the student is in 100-level. Short sentences. One everyday Nigerian illustration, clearly marked hypothetical.",
      lecturer: "Give a structured university explanation: definition, rule, authority, exception, and a short application.",
      case: "Explain any case using facts, issue, decision, reasoning, and principle. If the course entry says to confirm the facts, say so and do not invent them.",
      exam: "Coach the student to identify issues and apply rules. Do not write their entire answer unless they ask for a model.",
      socratic: "Ask two or three guiding questions before giving the rule. Do not dump the full answer first.",
      revision: "Give a compact revision note and up to four flashcard pairs.",
      problem: "If they want a problem, set a short hypothetical and invite IRAC. If they paste an answer, mark it against a visible rubric.",
      compare: "Compare the doctrines they name. Keep Nigerian law and English law in separate sentences.",
    };
    const system = `You are the Contract Law tutor inside a study app for undergraduate students, focused on Nigerian contract law. ${modeGuide[data.mode]}
Rules:
- Prefer the course excerpts below. They are the primary source.
- Label English cases as English. Do not treat them as Nigerian decisions.
- Never invent case names, quotations, statutes, or section numbers. If you are unsure, say the point must be confirmed in the law report.
- The UK Contracts (Rights of Third Parties) Act 1999, Misrepresentation Act 1967, Unfair Contract Terms Act 1977, Minors' Contracts Act 1987, and Law Reform (Frustrated Contracts) Act 1943 are not to be stated as Nigerian law.
- Distinguish privity from consideration.
- This is education, not advice on a real dispute. Say so if the user describes a live dispute.
Course excerpts:
${library || "(no close excerpt)"}`;
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          temperature: 0.3,
          messages: [
            { role: "system", content: system },
            ...data.history,
            { role: "user", content: data.question },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: `The tutor could not answer just now (error ${res.status}).`, snippets };
      }
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() || "The tutor returned an empty answer.";
      return { ok: true as const, source: "grok" as const, text, snippets };
    } catch {
      return { ok: false as const, error: "The tutor could not be reached. Check your connection and try once more.", snippets };
    }
  });
