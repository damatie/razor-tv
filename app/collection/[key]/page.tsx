"use client";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import BackBar from "@/components/BackBar";
import { useCollection } from "@/hooks/useCollection";
import type { CollectionKey } from "@/lib/collections";
import Image from "next/image";
import Link from "next/link";
const titles: Record<CollectionKey, string> = {
  "latest-movies": "Latest Movies",
  "latest-series": "Latest Series",
  family: "Family Friendly",
  editors: "Editor’s Picks",
};
export default function Page() {
  const { key } = useParams<{ key: string }>();
  const k = decodeURIComponent(key || "") as CollectionKey;
  if (!titles[k])
    return (
      <main className="flex-1">
        <NavBar />
        <BackBar />
        <div className="mx-auto max-w-7xl px-4 py-10 mt-8">
          Unknown collection.
        </div>
      </main>
    );
  const { data, isLoading, isError } = useCollection(k);
  const items = data || [];
  return (
    <main className="flex-1">
      <NavBar />
      <BackBar label="Back" fallback="/" />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{titles[k]}</h1>
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] skeleton rounded-xl" />
            ))}
          </div>
        )}
        {isError && <p className="text-brand-sub">Failed to load.</p>}
        {!isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((m) => (
              <Link
                key={m.imdbID}
                href={`/movie/${m.imdbID}`}
                className="group block focus-ring"
              >
                <figure className="aspect-[2/3] relative overflow-hidden rounded-xl shadow-soft">
                  {m.Poster && m.Poster !== "N/A" ? (
                    <Image
                      src={m.Poster}
                      alt={m.Title}
                      fill
                      sizes="(max-width:768px) 50vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="skeleton w-full h-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-sm font-semibold truncate">
                      {m.Title}
                    </div>
                    <div className="text-xs text-brand-sub truncate">
                      {m.Year} • ⭐ {m.imdbRating}
                    </div>
                  </div>
                </figure>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
