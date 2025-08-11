export type CollectionKey =
  | "latest-movies"
  | "latest-series"
  | "family"
  | "editors";
type Sorter = (
  a: import("./types").OmdbMovieDetails,
  b: import("./types").OmdbMovieDetails
) => number;
export type CollectionConfig = {
  key: CollectionKey;
  title: string;
  seeds: readonly string[];
  type?: "movie" | "series";
  years?: readonly number[];
  minVotes?: number;
  filter?: (d: import("./types").OmdbMovieDetails) => boolean;
  sort: Sorter;
  limit?: number;
};
const common = [
  "the",
  "love",
  "night",
  "world",
  "man",
  "girl",
  "star",
  "war",
  "day",
  "last",
];
const byReleased: Sorter = (a, b) =>
  Date.parse(b.Released || b.Year || "1970-01-01") -
  Date.parse(a.Released || a.Year || "1970-01-01");
const byRatingThenYear: Sorter = (a, b) => {
  const ra = parseFloat(a.imdbRating || "0"),
    rb = parseFloat(b.imdbRating || "0");
  if (rb !== ra) return rb - ra;
  const ya = parseInt((a.Year || "0").slice(0, 4)),
    yb = parseInt((b.Year || "0").slice(0, 4));
  return yb - ya;
};
export const COLLECTIONS = {
  "latest-movies": {
    key: "latest-movies",
    title: "Latest Movies",
    seeds: common,
    type: "movie",
    years: [2025, 2024],
    minVotes: 5000,
    sort: byReleased,
    limit: 12,
  },
  "latest-series": {
    key: "latest-series",
    title: "Latest Series",
    seeds: common,
    type: "series",
    years: [2025, 2024],
    minVotes: 2000,
    sort: byReleased,
    limit: 12,
  },
  family: {
    key: "family",
    title: "Family Friendly",
    seeds: ["toy", "home", "adventure", "magic", "story", "kids", "family"],
    filter: (d: import("./types").OmdbMovieDetails) =>
      (d.Genre || "").includes("Family") ||
      (d.Genre || "").includes("Animation"),
    sort: byRatingThenYear,
    limit: 12,
  },
  editors: {
    key: "editors",
    title: "Editor’s Picks",
    seeds: [
      "Impossible–The Final Reckoning",
      "Captain America: Brave New World",
      "Jurassic World Rebirth",
      "How to Train Your Dragon (live-action)",
      "The Fantastic Four: First Steps",
    ],
    sort: byRatingThenYear,
    limit: 12,
  },
} as const;
