"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  OmdbSearchResponse,
  OmdbSearchItem,
  OmdbMovieDetails,
} from "@/lib/types";
import {
  COLLECTIONS,
  type CollectionKey,
  type CollectionConfig,
} from "@/lib/collections";

/**
 * A simple utility to remove duplicates from an array of objects based on a key.
 */
const uniqBy = <T, K extends string | number>(arr: T[], key: (t: T) => K) => {
  const seen = new Set<K>();
  const out: T[] = [];
  for (const it of arr) {
    const k = key(it);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(it);
    }
  }
  return out;
};

/**
 * Parses a vote count string (e.g., "1,234") into a number.
 */
const parseVotes = (v?: string) => parseInt((v || "0").replace(/,/g, ""), 10);

/**
 * Fetches and builds a collection of movies based on a configuration.
 * It uses seeded searches, enriches the results with details, and then filters and sorts them.
 * @param cfg The collection configuration.
 * @returns A promise that resolves to an array of movie details.
 */
async function buildCollection(
  cfg: CollectionConfig
): Promise<OmdbMovieDetails[]> {
  const res: OmdbSearchItem[] = [];
  for (const term of cfg.seeds) {
    if (cfg.years?.length) {
      for (const y of cfg.years) {
        const { data } = await api.get<OmdbSearchResponse>("/omdb/search", {
          params: { q: term, page: 1, type: cfg.type, y },
        });
        if (data?.Search) res.push(...data.Search);
      }
    } else {
      const { data } = await api.get<OmdbSearchResponse>("/omdb/search", {
        params: { q: term, page: 1, type: cfg.type },
      });
      if (data?.Search) res.push(...data.Search);
    }
  }
  const unique = uniqBy(res, (r) => r.imdbID).slice(0, 60);
  const details: OmdbMovieDetails[] = [];
  for (const it of unique) {
    const { data } = await api.get<OmdbMovieDetails>("/omdb/details", {
      params: { id: it.imdbID },
    });
    if (!data) continue;
    if (cfg.minVotes && parseVotes((data as any).imdbVotes) < cfg.minVotes)
      continue;
    if (cfg.filter && !cfg.filter(data)) continue;
    details.push(data);
  }
  return details.sort(cfg.sort).slice(0, cfg.limit || 12);
}

/**
 * A React Query hook for fetching a movie collection by its key.
 * @param key The key of the collection to fetch (e.g., "latest-movies").
 */
export function useCollection(key: CollectionKey) {
  const cfg = COLLECTIONS[key];
  return useQuery({
    queryKey: ["collection", key],
    staleTime: 5 * 60_000, // Cache for 5 minutes
    queryFn: () => buildCollection(cfg),
  });
}
