export function formatMinutes(ms: number): string {
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "0 min";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  return `${h}h ${mins % 60}m`;
}

export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function uid(): string {
  return crypto.randomUUID();
}
