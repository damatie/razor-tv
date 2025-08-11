"use client";
import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { OmdbMovieDetails, OmdbSearchResponse } from "@/lib/types";

/**
 * A React Query hook for searching movies.
 * @param q The search query.
 * @param page The page number for pagination.
 * @param type The type of media to search for (movie or series).
 * @param y The year of release.
 * @returns The result of the search query.
 */
export const useSearchMovies = (
  q: string | null,
  page: number,
  type?: "movie" | "series",
  y?: number
): UseQueryResult<OmdbSearchResponse> =>
  useQuery<OmdbSearchResponse>({
    queryKey: ["search", q, page, type, y],
    enabled: Boolean(q),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await api.get("/omdb/search", {
        params: { q, page, type, y },
      });
      return data;
    },
  });

/**
 * A React Query hook for fetching the details of a specific movie by its IMDb ID.
 * @param imdbID The IMDb ID of the movie.
 * @returns The result of the details query.
 */
export const useDetails = (imdbID: string): UseQueryResult<OmdbMovieDetails> =>
  useQuery<OmdbMovieDetails>({
    queryKey: ["details", imdbID],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data } = await api.get("/omdb/details", {
        params: { id: imdbID },
      });
      return data;
    },
  });
