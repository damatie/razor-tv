"use client";
const KEY = "recent:searches:v1";
const MAX_ITEMS = 8;

/**
 * Retrieves the list of recent search queries from localStorage.
 * @returns An array of recent search strings.
 */
export function getRecent(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/**
 * Adds a new search query to the list of recent searches.
 * The list is capped at a maximum number of items.
 * @param q The search query to add.
 */
export function putRecent(q: string) {
  const value = q.trim();
  if (!value) return;
  const list = getRecent();
  const filtered = [
    value,
    ...list.filter((x) => x.toLowerCase() !== value.toLowerCase()),
  ];
  localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
}
