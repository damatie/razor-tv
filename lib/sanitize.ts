export function sanitizeText(input: string, max = 800): string {
  if (!input) return "";
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
  return cleaned.slice(0, max);
}

export function sanitizeName(input: string, max = 64): string {
  if (!input) return "Anon";
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
  return (cleaned || "Anon").slice(0, max);
}

export function clampRating(n: number): number {
  if (Number.isNaN(n)) return 5;
  return Math.max(1, Math.min(5, Math.round(n)));
}
