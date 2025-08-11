"use client";
import type { Review } from "./types";

const KEY = "reviews:v1";

/**
 * Reads all reviews from localStorage.
 * @returns A record of reviews, keyed by IMDb ID.
 */
const read = (): Record<string, Review[]> => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
};

/**
 * Writes a record of reviews to localStorage.
 * @param d The data to write.
 */
const write = (d: Record<string, Review[]>) =>
  localStorage.setItem(KEY, JSON.stringify(d));

/**
 * Gets all reviews for a specific movie.
 * @param imdbID The IMDb ID of the movie.
 * @returns An array of reviews.
 */
export const getReviews = (imdbID: string) => read()[imdbID] || [];

/**
 * Adds a new review for a movie.
 * @param input The review data.
 * @returns The newly created review.
 */
export const addReview = (input: Omit<Review, "id" | "createdAt">) => {
  const all = read();
  const list = all[input.imdbID] || [];
  const next: Review = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  all[input.imdbID] = [next, ...list];
  write(all);
  return next;
};

/**
 * Deletes a review.
 * @param imdbID The IMDb ID of the movie.
 * @param id The ID of the review to delete.
 */
export const deleteReview = (imdbID: string, id: string) => {
  const all = read();
  all[imdbID] = (all[imdbID] || []).filter((r) => r.id !== id);
  write(all);
};

/**
 * A simple hook-like utility to manage reviews for a movie.
 * @param imdbID The IMDb ID of the movie.
 * @returns An object with the reviews data and functions to add/delete reviews.
 */
export const useReviews = (imdbID: string) => ({
  data: getReviews(imdbID),
  addReview,
  deleteReview,
});
