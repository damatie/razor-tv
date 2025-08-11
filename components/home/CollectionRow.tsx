"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useCollection } from "@/hooks/useCollection";
import type { CollectionKey } from "@/lib/collections";
import { motion } from "framer-motion";
const titleMap: Record<CollectionKey, string> = {
  "latest-movies": "Latest Movies",
  "latest-series": "Latest Series",
  family: "Family Friendly",
  editors: "Editor’s Picks",
};
export default function CollectionRow({ keyName }: { keyName: CollectionKey }) {
  const { data, isLoading } = useCollection(keyName);
  const items = data || [];
  const has = items.length > 0;
  const scroller = useRef<HTMLDivElement>(null);
  const [canL, setL] = useState(false);
  const [canR, setR] = useState(false);
  const measure = () => {
    const el = scroller.current;
    if (!el) return;
    setL(el.scrollLeft > 0);
    setR(el.scrollWidth > el.clientWidth + 4);
  };
  useEffect(() => {
    const t = setTimeout(measure, 0);
    return () => clearTimeout(t);
  }, [has]);
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const onScroll = () => measure();
  const by = (dx: number) =>
    scroller.current?.scrollBy({ left: dx, behavior: "smooth" });
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        {isLoading ? (
          <div className="h-5 w-36 skeleton" />
        ) : (
          <h2 className="text-xl font-semibold">{titleMap[keyName]}</h2>
        )}
        {!isLoading && has && (
          <Link
            href={`/collection/${encodeURIComponent(keyName)}`}
            className="text-sm text-brand-sub hover:underline"
          >
            View all
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-bg to-transparent" />
        {!isLoading && canL && (
          <button
            aria-label="Scroll left"
            onClick={() =>
              by(-Math.round((scroller.current?.clientWidth || 800) * 0.9))
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 px-3 py-2"
          >
            ◀
          </button>
        )}
        {!isLoading && canR && (
          <button
            aria-label="Scroll right"
            onClick={() =>
              by(Math.round((scroller.current?.clientWidth || 800) * 0.9))
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 px-3 py-2"
          >
            ▶
          </button>
        )}
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {(isLoading ? Array.from({ length: 10 }) : items).map(
            (m: any, i: number) => (
              <motion.div
                key={isLoading ? i : m.imdbID}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="snap-start shrink-0 w-[160px]"
              >
                {isLoading ? (
                  <div className="aspect-[2/3] skeleton rounded-xl" />
                ) : (
                  <Link
                    href={`/movie/${m.imdbID}`}
                    className="group block focus-ring"
                  >
                    <figure className="aspect-[2/3] relative overflow-hidden rounded-xl shadow-soft">
                      {m.Poster && m.Poster !== "N/A" ? (
                        <Image
                          src={m.Poster}
                          alt={m.Title}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="skeleton w-full h-full" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-[13px] font-semibold truncate">
                          {m.Title}
                        </div>
                        <div className="text-[11px] text-brand-sub truncate">
                          {m.Year} • ⭐ {m.imdbRating}
                        </div>
                      </div>
                    </figure>
                  </Link>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
