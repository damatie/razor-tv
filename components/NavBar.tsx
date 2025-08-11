"use client";
import Brand from "./Brand";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "@/lib/utils";

/**
 * The main navigation bar for the application.
 * Includes the brand logo and the search input.
 */
export default function NavBar() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [q, setQ] = useState<string>(params.get("q") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced function to push search query to router
  const push = useCallback(
    debounce((value: string) => {
      const val = value.trim();
      if (val.length >= 1) {
        const s = new URLSearchParams({ q: val, page: "1" });
        router.push(`/search?${s.toString()}`);
      } else {
        if (pathname !== "/search") router.push(`/search`);
        else router.push(`/search`);
      }
    }, 350),
    [pathname]
  );
  useEffect(() => {
    setQ(params.get("q") || "");
  }, [params]);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Brand />
        <div className="flex-1" />
        <div className="relative w-full max-w-md">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              push(e.target.value);
            }}
            placeholder="Search movies..."
            className="w-full rounded-xl bg-brand-soft/80 px-4 py-2 text-sm focus-ring placeholder:text-brand-sub/70"
            aria-label="Search movies"
          />
        </div>
      </div>
    </header>
  );
}
