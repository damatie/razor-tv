"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecent } from "@/lib/recent-searches";
export default function SearchEmpty() {
  const router = useRouter();
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    setRecent(getRecent());
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Start typing to search</h2>
        <p className="text-brand-sub mb-4 text-sm">
          Try: “inception”, “harry potter”, “john wick”, “dune”…
        </p>
        {recent.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Recent</h3>
            <div className="flex flex-wrap gap-2">
              {recent.map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(t)}&page=1`)
                  }
                  className="px-3 py-1.5 rounded-full bg-brand-soft text-sm hover:bg-white/10 focus-ring"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
