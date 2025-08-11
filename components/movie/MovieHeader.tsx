import Image from "next/image";
import type { OmdbMovieDetails } from "@/lib/types";

export default function MovieHeader({ m }: { m: OmdbMovieDetails }) {
  return (
    <section className="relative">
      {m.Poster && m.Poster !== "N/A" && (
        <div className="absolute inset-0 -z-10">
          <Image src={m.Poster} alt="backdrop" fill className="object-cover blur-3xl opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-brand-bg" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
        <figure className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-soft">
          {m.Poster && m.Poster !== "N/A" ? (
            <Image src={m.Poster} alt={m.Title} fill className="object-cover" />
          ) : (
            <div className="skeleton w-full h-full" />
          )}
        </figure>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{m.Title}</h1>
          <p className="text-brand-sub">
            <span>Released: {m.Released || m.Year}</span>
            <span className="mx-2">•</span>
            <span>{m.Runtime}</span>
            <span className="mx-2">•</span>
            <span>{m.Genre}</span>
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <p><span className="text-brand-sub">Director:</span> {m.Director}</p>
            <p><span className="text-brand-sub">Actors:</span> {m.Actors}</p>
            <p className="text-brand-sub">IMDb {m.imdbRating}</p>
          </div>

          <p className="mt-4 max-w-2xl leading-relaxed">{m.Plot}</p>
        </div>
      </div>
    </section>
  );
}
