"use client";
import Image from "next/image";
import Link from "next/link";
import { useDetails } from "@/hooks/useMovies";
import type { OmdbSearchItem } from "@/lib/types";

export default function SearchResultCard({ item }: { item: OmdbSearchItem }) {
  const { data: details, isLoading } = useDetails(item.imdbID);
  const director = details?.Director && details.Director !== "N/A" ? details.Director : "";
  const actors = details?.Actors && details.Actors !== "N/A" ? details.Actors.split(",").map(s => s.trim()).slice(0, 2).join(", ") : "";
  return (
    <Link href={`/movie/${item.imdbID}`} className="group block focus-ring" aria-label={`${item.Title} (${item.Year})`}>
      <figure className="aspect-[2/3] relative overflow-hidden rounded-xl shadow-soft">
        {item.Poster && item.Poster !== "N/A" ? (
          <Image src={item.Poster} alt={item.Title} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (<div className="skeleton w-full h-full" />)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <figcaption className="absolute bottom-2 left-2 right-2">
          <div className="text-sm font-semibold truncate">{item.Title}</div>
          <div className="text-[11px] text-brand-sub truncate">
            {isLoading ? (<span className="inline-block h-3 w-44 skeleton align-middle" />) : (<span title={`${director}${actors ? " • " + actors : ""}`}>{director ? `Dir. ${director}` : ""}{director && actors ? " • " : ""}{actors}</span>)}
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}
