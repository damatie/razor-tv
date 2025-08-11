"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCollection } from "@/hooks/useCollection";
import { motion, AnimatePresence } from "framer-motion";
export default function HeroCarousel() {
  const { data } = useCollection("editors");
  const slides = (data || []).slice(0, 5);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % Math.max(1, slides.length)),
      4500
    );
    return () => clearInterval(t);
  }, [slides.length]);
  const current = slides[idx];
  if (!current) return null;
  return (
    <section className="relative h-[52vh] min-h-[360px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {current.Poster && current.Poster !== "N/A" && (
          <Image
            src={current.Poster}
            alt={current.Title}
            fill
            priority
            className="object-cover blur-sm opacity-25"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-brand-bg" />
      </div>
      <div className="mx-auto max-w-7xl px-4 h-full grid grid-rows-[1fr_auto]">
        <div className="flex items-end pb-6">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current.imdbID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {current.Title}
              </h1>
              <p className="mt-3 text-brand-sub line-clamp-3">{current.Plot}</p>
              <div className="mt-5 flex gap-3">
                <Link
                  href={`/movie/${current.imdbID}`}
                  className="px-4 py-2 rounded-lg bg-brand-primary text-black font-semibold"
                >
                  Watch details
                </Link>
                <span className="px-3 py-2 rounded-lg bg-white/10 text-sm">
                  {current.Genre}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pb-6 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.imdbID}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 flex-1 rounded ${
                i === idx ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
