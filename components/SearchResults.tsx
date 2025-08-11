"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchMovies } from "@/hooks/useMovies";
import Pagination from "./pagination/Pagination";
import SearchEmpty from "./SearchEmpty";
import { putRecent } from "@/lib/recent-searches";
import SearchResultCard from "./search/SearchResultCard";

/**
 * Renders the search results grid, including pagination and empty/loading states.
 */
export default function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const page = parseInt(params.get("page") || "1", 10);

  const canSearch = q.trim().length >= 2;
  const { data, isLoading, isError } = useSearchMovies(
    canSearch ? q : null,
    page
  );

  useEffect(() => {
    if (canSearch && data?.Search && data.Search.length > 0) {
      putRecent(q);
    }
  }, [canSearch, q, data?.Search?.length]);

  if (!canSearch) return <SearchEmpty />;
  if (isLoading) return <GridSkeleton />;
  if (isError || data?.Response === "False")
    return (
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <p className="text-brand-sub">No results found. Try another title.</p>
      </section>
    );

  return (
    <section className="mx-auto max-w-7xl px-4 mt-8 pb-16">
      <h2 className="sr-only">Search results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {(data?.Search || []).map((m) => (
          <SearchResultCard key={m.imdbID} item={m} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination totalResults={parseInt(data?.totalResults || "0", 10)} />
      </div>
    </section>
  );
}

/**
 * A skeleton loader component to show while search results are loading.
 */
function GridSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-16"
      role="status"
      aria-label="loading"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] skeleton rounded-xl" />
        ))}
      </div>
    </section>
  );
}
