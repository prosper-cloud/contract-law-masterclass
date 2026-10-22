import { modulesA } from "./curriculum-a";
import { modulesB } from "./curriculum-b";
import type { Module } from "./types";

export const modules: Module[] = [...modulesA, ...modulesB];

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export const DISCLAIMER =
  "Study material for Nigerian contract law, with English cases labelled as English. It is not legal advice. Confirm citations and section numbers in the law report or statute before you rely on them in an examination or a real dispute.";
