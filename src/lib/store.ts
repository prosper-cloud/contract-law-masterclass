import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Level } from "@/content/types";
import { reviewCard, type CardProgress, type Grade } from "@/lib/srs";

export type Objective =
  | "scratch"
  | "exams"
  | "notes"
  | "cases"
  | "problems"
  | "essays"
  | "assessment";

export type QuizAttempt = {
  id: string;
  quizId: string;
  score: number;
  total: number;
  at: number;
  topicScores: Record<string, { correct: number; total: number }>;
  missed: string[];
};

export type Note = {
  id: string;
  title: string;
  body: string;
  topic: string;
  pinned: boolean;
  updatedAt: number;
};

export type IracDraft = {
  id: string;
  problemId: string;
  title: string;
  facts: string;
  issue: string;
  rule: string;
  application: string;
  conclusion: string;
  updatedAt: number;
};

export type CustomCard = {
  id: string;
  moduleId: string;
  difficulty: Level;
  front: string;
  back: string;
  simple: string;
  authority?: string;
};

export type ReviewNote = {
  id: string;
  target: string;
  text: string;
  at: number;
};

export type StudyState = {
  updatedAt: number;
  onboarded: boolean;
  displayName: string;
  level: Level;
  objectives: Objective[];
  theme: "light" | "dark";
  fontScale: "md" | "lg" | "xl";
  reduceMotion: boolean;
  examDate: string;
  dailyGoalMin: number;
  reminder: string;
  lastLessonId: string | null;
  opened: Record<string, string[]>;
  completed: Record<string, number>;
  studyMs: number;
  dayMs: Record<string, number>;
  streakDate: string;
  streak: number;
  attempts: QuizAttempt[];
  cardProgress: Record<string, CardProgress>;
  customCards: CustomCard[];
  bookmarks: string[];
  notes: Note[];
  drafts: IracDraft[];
  reviewNotes: ReviewNote[];
  syncLabel: string;
  completeOnboarding: (input: { displayName: string; level: Level; objectives: Objective[] }) => void;
  setProfile: (patch: Partial<Pick<StudyState, "displayName" | "level" | "objectives" | "theme" | "fontScale" | "reduceMotion" | "examDate" | "dailyGoalMin" | "reminder">>) => void;
  openSection: (moduleId: string, sectionId: string, total: number) => void;
  completeLesson: (moduleId: string) => void;
  touchLesson: (moduleId: string) => void;
  addStudyMs: (ms: number) => void;
  recordAttempt: (attempt: QuizAttempt) => void;
  gradeCard: (cardId: string, grade: Grade) => void;
  addCustomCard: (card: CustomCard) => void;
  deleteCustomCard: (id: string) => void;
  toggleBookmark: (caseId: string) => void;
  saveNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  saveDraft: (draft: IracDraft) => void;
  deleteDraft: (id: string) => void;
  addReviewNote: (target: string, text: string) => void;
  replaceFromRemote: (partial: Partial<StudyState>) => void;
  setSyncLabel: (label: string) => void;
};

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayOf(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() - 1);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function touchStreak(state: StudyState): Pick<StudyState, "streak" | "streakDate"> {
  const t = today();
  if (state.streakDate === t) return { streak: state.streak, streakDate: t };
  if (state.streakDate === yesterdayOf(t)) return { streak: state.streak + 1, streakDate: t };
  return { streak: 1, streakDate: t };
}

const persistKeys: (keyof StudyState)[] = [
  "updatedAt",
  "onboarded",
  "displayName",
  "level",
  "objectives",
  "theme",
  "fontScale",
  "reduceMotion",
  "examDate",
  "dailyGoalMin",
  "reminder",
  "lastLessonId",
  "opened",
  "completed",
  "studyMs",
  "dayMs",
  "streakDate",
  "streak",
  "attempts",
  "cardProgress",
  "customCards",
  "bookmarks",
  "notes",
  "drafts",
  "reviewNotes",
];

export const useStudy = create<StudyState>()(
  persist(
    (set) => ({
      updatedAt: 0,
      onboarded: false,
      displayName: "Browne",
      level: "beginner",
      objectives: [],
      theme: "light",
      fontScale: "md",
      reduceMotion: false,
      examDate: "",
      dailyGoalMin: 20,
      reminder: "",
      lastLessonId: null,
      opened: {},
      completed: {},
      studyMs: 0,
      dayMs: {},
      streakDate: "",
      streak: 0,
      attempts: [],
      cardProgress: {},
      customCards: [],
      bookmarks: [],
      notes: [],
      drafts: [],
      reviewNotes: [],
      syncLabel: "Saved on this device",
      completeOnboarding: (input) =>
        set((s) => ({
          ...s,
          ...input,
          onboarded: true,
          updatedAt: Date.now(),
          ...touchStreak(s),
        })),
      setProfile: (patch) => set((s) => ({ ...patch, updatedAt: Date.now() })),
      openSection: (moduleId, sectionId, total) =>
        set((s) => {
          const current = s.opened[moduleId] ?? [];
          const opened = current.includes(sectionId) ? current : [...current, sectionId];
          const pct = s.completed[moduleId] === 100 ? 100 : Math.min(99, Math.round((opened.length / Math.max(total, 1)) * 100));
          return {
            opened: { ...s.opened, [moduleId]: opened },
            completed: { ...s.completed, [moduleId]: s.completed[moduleId] === 100 ? 100 : pct },
            lastLessonId: moduleId,
            updatedAt: Date.now(),
          };
        }),
      completeLesson: (moduleId) =>
        set((s) => ({
          completed: { ...s.completed, [moduleId]: 100 },
          lastLessonId: moduleId,
          updatedAt: Date.now(),
          ...touchStreak(s),
        })),
      touchLesson: (moduleId) => set({ lastLessonId: moduleId, updatedAt: Date.now() }),
      addStudyMs: (ms) =>
        set((s) => {
          const t = today();
          return {
            studyMs: s.studyMs + ms,
            dayMs: { ...s.dayMs, [t]: (s.dayMs[t] ?? 0) + ms },
            updatedAt: Date.now(),
            ...touchStreak(s),
          };
        }),
      recordAttempt: (attempt) =>
        set((s) => ({
          attempts: [attempt, ...s.attempts].slice(0, 40),
          updatedAt: Date.now(),
          ...touchStreak(s),
        })),
      gradeCard: (cardId, grade) =>
        set((s) => ({
          cardProgress: { ...s.cardProgress, [cardId]: reviewCard(s.cardProgress[cardId], grade) },
          updatedAt: Date.now(),
          ...touchStreak(s),
        })),
      addCustomCard: (card) => set((s) => ({ customCards: [card, ...s.customCards], updatedAt: Date.now() })),
      deleteCustomCard: (id) =>
        set((s) => {
          const cardProgress = { ...s.cardProgress };
          delete cardProgress[id];
          return { customCards: s.customCards.filter((c) => c.id !== id), cardProgress, updatedAt: Date.now() };
        }),
      toggleBookmark: (caseId) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(caseId) ? s.bookmarks.filter((id) => id !== caseId) : [...s.bookmarks, caseId],
          updatedAt: Date.now(),
        })),
      saveNote: (note) =>
        set((s) => {
          const exists = s.notes.some((n) => n.id === note.id);
          return {
            notes: exists ? s.notes.map((n) => (n.id === note.id ? note : n)) : [note, ...s.notes],
            updatedAt: Date.now(),
          };
        }),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id), updatedAt: Date.now() })),
      saveDraft: (draft) =>
        set((s) => {
          const exists = s.drafts.some((d) => d.id === draft.id);
          return {
            drafts: exists ? s.drafts.map((d) => (d.id === draft.id ? draft : d)) : [draft, ...s.drafts],
            updatedAt: Date.now(),
          };
        }),
      deleteDraft: (id) => set((s) => ({ drafts: s.drafts.filter((d) => d.id !== id), updatedAt: Date.now() })),
      addReviewNote: (target, text) =>
        set((s) => ({
          reviewNotes: [{ id: crypto.randomUUID(), target, text, at: Date.now() }, ...s.reviewNotes].slice(0, 80),
          updatedAt: Date.now(),
        })),
      replaceFromRemote: (partial) => set({ ...partial, syncLabel: "Synced to your account" }),
      setSyncLabel: (label) => set({ syncLabel: label }),
    }),
    {
      name: "clm-study",
      partialize: (state) => {
        const out: Record<string, unknown> = {};
        for (const key of persistKeys) out[key] = state[key];
        return out as StudyState;
      },
    },
  ),
);

export function snapshot(): string {
  const state = useStudy.getState();
  const data: Record<string, unknown> = {};
  for (const key of persistKeys) data[key] = state[key];
  return JSON.stringify(data);
}

export function applySnapshot(payload: string) {
  const data = JSON.parse(payload) as Partial<StudyState>;
  useStudy.getState().replaceFromRemote(data);
}
