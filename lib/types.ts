export type OmdbSearchItem = { Title: string; Year: string; imdbID: string; Type: "movie" | "series"; Poster: string; };
export type OmdbSearchResponse = { Search?: OmdbSearchItem[]; totalResults?: string; Response: "True" | "False"; Error?: string; };
export type OmdbMovieDetails = {
  Title: string; Year: string; Rated: string; Released: string; Runtime: string;
  Genre: string; Director: string; Writer: string; Actors: string; Plot: string;
  Language: string; Poster: string; imdbRating: string; imdbID: string; Type?: "movie" | "series";
};
export type Review = { id: string; imdbID: string; author: string; rating: number; text: string; createdAt: string };
