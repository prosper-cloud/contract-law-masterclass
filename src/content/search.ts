import { cards } from "./assessments";
import { cases } from "./cases";
import { getModule, modules } from "./curriculum";
import { glossary } from "./glossary";

export type Hit = {
  href: string;
  kind: string;
  title: string;
  snippet: string;
};

function score(hay: string, terms: string[]): number {
  const text = hay.toLowerCase();
  return terms.reduce((n, t) => (t.length > 1 && text.includes(t) ? n + t.length : n), 0);
}

export function searchAll(query: string): Hit[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
  if (!terms.length) return [];
  const hits: { hit: Hit; s: number }[] = [];
  for (const m of modules) {
    const blob = `${m.title} ${m.blurb} ${m.summary.join(" ")}`;
    const s = score(blob, terms);
    if (s) hits.push({ s, hit: { href: `/learn/${m.id}`, kind: "Lesson", title: m.title, snippet: m.blurb } });
  }
  for (const c of cases) {
    const blob = `${c.name} ${c.cite} ${c.principle} ${c.topics.join(" ")}`;
    const s = score(blob, terms);
    if (s) hits.push({ s, hit: { href: `/cases/${c.id}`, kind: "Case", title: c.name, snippet: c.principle } });
  }
  for (const g of glossary) {
    const blob = `${g.term} ${g.plain} ${g.formal}`;
    const s = score(blob, terms);
    if (s) hits.push({ s, hit: { href: `/glossary?q=${encodeURIComponent(g.term)}`, kind: "Glossary", title: g.term, snippet: g.plain } });
  }
  hits.sort((a, b) => b.s - a.s);
  return hits.slice(0, 8).map((h) => h.hit);
}

export type Snippet = { title: string; text: string; href: string };

export function retrieve(query: string): Snippet[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
  const pool: { s: number; snip: Snippet }[] = [];
  for (const m of modules) {
    for (const section of m.sections) {
      const text = section.paras.join(" ");
      const s = score(`${section.title} ${text}`, terms);
      if (s)
        pool.push({
          s,
          snip: { title: `${m.title}: ${section.title}`, text: text.slice(0, 900), href: `/learn/${m.id}` },
        });
    }
    const s2 = score(m.problem.facts, terms);
    if (s2)
      pool.push({
        s: s2,
        snip: { title: m.problem.title, text: m.problem.facts.slice(0, 700), href: `/irac?problem=${m.problem.id}` },
      });
  }
  for (const c of cases) {
    const s = score(`${c.name} ${c.ratio} ${c.principle} ${c.facts}`, terms);
    if (s)
      pool.push({
        s,
        snip: { title: `${c.name} ${c.cite}`, text: `${c.principle} ${c.ratio}`.slice(0, 800), href: `/cases/${c.id}` },
      });
  }
  pool.sort((a, b) => b.s - a.s);
  return pool.slice(0, 4).map((p) => p.snip);
}

export function lessonPlainText(moduleId: string): string {
  const m = getModule(moduleId);
  if (!m) return "";
  return [m.title, ...m.sections.flatMap((s) => [s.title, ...s.paras])].join(". ");
}

export { cards };
