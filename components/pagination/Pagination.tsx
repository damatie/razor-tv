"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { clamp } from "@/lib/utils";

/**
 * Renders a pagination control for navigating through search results.
 * @param totalResults The total number of search results.
 */
export default function Pagination({ totalResults }: { totalResults: number }) {
  const params = useSearchParams();
  const router = useRouter();

  const q = params.get("q") || "";
  const page = parseInt(params.get("page") || "1", 10);
  const totalPages = Math.max(1, Math.ceil((totalResults || 0) / 10));

  const goToPage = (p: number) => {
    const nextPage = clamp(p, 1, totalPages);
    const s = new URLSearchParams({ q, page: String(nextPage) });
    router.push(`/search?${s.toString()}`);
  };

  if (totalPages <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-2 justify-center"
    >
      <button
        onClick={() => goToPage(page - 1)}
        disabled={isFirst}
        className="px-3 py-2 rounded-lg bg-brand-soft hover:bg-white/10 focus-ring disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        Prev
      </button>
      <span className="text-sm text-brand-sub">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => goToPage(page + 1)}
        disabled={isLast}
        className="px-3 py-2 rounded-lg bg-brand-soft hover:bg-white/10 focus-ring disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
