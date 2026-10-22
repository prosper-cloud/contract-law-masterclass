export type Level = "beginner" | "intermediate" | "advanced";

export type AuthorityStatus =
  | "binding-ng"
  | "persuasive-ng"
  | "english"
  | "comparative"
  | "confirm";

export type Jurisdiction = "Nigeria" | "England" | "Other";

export type Authority = {
  name: string;
  cite: string;
  court?: string;
  jurisdiction: Jurisdiction;
  status: AuthorityStatus;
  principle: string;
};

export type LessonSection = {
  id: string;
  title: string;
  paras: string[];
  simple?: string;
  deep?: string;
  authorities?: Authority[];
};

export type Problem = {
  id: string;
  title: string;
  moduleId: string;
  level: Level;
  facts: string;
  issues: string[];
  rules: string[];
  application: string[];
  conclusion: string;
  authorities: string[];
};

export type Module = {
  id: string;
  num: number;
  title: string;
  blurb: string;
  minutes: number;
  level: Level;
  objectives: string[];
  prerequisites: string[];
  sections: LessonSection[];
  terms: { term: string; plain: string }[];
  summary: string[];
  examTips: string[];
  myths: string[];
  problem: Problem;
};

export type CaseEntry = {
  id: string;
  name: string;
  cite: string;
  court: string;
  year: string;
  jurisdiction: "Nigeria" | "England";
  status: AuthorityStatus;
  topics: string[];
  difficulty: Level;
  facts: string;
  factsNote: string;
  issue: string;
  decision: string;
  reasoning: string;
  ratio: string;
  obiter?: string;
  principle: string;
  exam: string;
  source: string;
  related: string[];
};

export type GlossaryEntry = {
  id: string;
  term: string;
  plain: string;
  formal: string;
  example: string;
  related: string[];
  authority?: string;
};

export type Question =
  | {
      id: string;
      type: "mcq";
      difficulty: Level;
      prompt: string;
      choices: string[];
      answer: number;
      explanation: string;
      whyWrong: string[];
    }
  | {
      id: string;
      type: "tf";
      difficulty: Level;
      prompt: string;
      answer: boolean;
      explanation: string;
    }
  | {
      id: string;
      type: "fill";
      difficulty: Level;
      prompt: string;
      answers: string[];
      explanation: string;
    }
  | {
      id: string;
      type: "match";
      difficulty: Level;
      prompt: string;
      pairs: { left: string; right: string }[];
      explanation: string;
    }
  | {
      id: string;
      type: "short";
      difficulty: Level;
      prompt: string;
      rubric: string[];
      model: string;
    };

export type Quiz = {
  id: string;
  title: string;
  moduleId: string;
  minutes: number;
  difficulty: Level;
  blurb: string;
  questions: Question[];
};

export type SeedCard = {
  id: string;
  moduleId: string;
  difficulty: Level;
  front: string;
  back: string;
  simple: string;
  authority?: string;
};

export const STATUS_LABEL: Record<AuthorityStatus, string> = {
  "binding-ng": "Binding Nigerian authority",
  "persuasive-ng": "Persuasive Nigerian authority",
  english: "English authority",
  comparative: "Comparative authority",
  confirm: "Confirm in the law report",
};
