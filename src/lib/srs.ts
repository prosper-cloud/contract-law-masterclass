export type Grade = "again" | "hard" | "good" | "easy";

export type CardProgress = {
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
  due: number;
  last: number;
  lastGrade: Grade | null;
};

const DAY = 86_400_000;

export function reviewCard(prev: CardProgress | undefined, grade: Grade, now = Date.now()): CardProgress {
  const ease0 = prev?.ease ?? 2.5;
  const reps0 = prev?.reps ?? 0;
  const interval0 = prev?.interval ?? 0;
  const lapses0 = prev?.lapses ?? 0;
  let ease = ease0;
  let reps = reps0;
  let interval = interval0;
  let lapses = lapses0;

  if (grade === "again") {
    ease = Math.max(1.3, ease - 0.2);
    reps = 0;
    interval = 0;
    lapses += 1;
    return { ease, interval, reps, lapses, due: now + 10 * 60 * 1000, last: now, lastGrade: grade };
  }

  reps += 1;
  if (grade === "hard") {
    ease = Math.max(1.3, ease - 0.15);
    interval = reps === 1 ? 1 : Math.max(1, Math.round(interval0 * 1.2));
  } else if (grade === "good") {
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.max(1, Math.round((interval0 || 6) * ease));
  } else {
    ease = ease + 0.15;
    if (reps === 1) interval = 4;
    else interval = Math.max(1, Math.round((interval0 || 4) * ease * 1.3));
  }
  return { ease, interval, reps, lapses, due: now + interval * DAY, last: now, lastGrade: grade };
}

export function isMastered(card: CardProgress | undefined): boolean {
  if (!card) return false;
  return card.reps >= 3 && card.interval >= 21 && (card.lastGrade === "good" || card.lastGrade === "easy");
}

export function isDue(card: CardProgress | undefined, now = Date.now()): boolean {
  if (!card) return true;
  return card.due <= now;
}
