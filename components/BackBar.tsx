"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";

/**
 * A navigation bar that provides a "back" button.
 * It uses the browser's history if possible, otherwise it links to a fallback URL.
 * @param fallback The fallback URL if the user can't go back in history.
 * @param label The text label for the back button/link.
 */
export default function BackBar({
  fallback = "/",
  label = "Back",
}: {
  fallback?: Route;
  label?: string;
}) {
  const router = useRouter();
  const [canGoBack, setCan] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setCan(window.history.length > 1);
  }, []);
  return (
    <div className="sticky top-[52px] z-30 bg-black/30 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-2">
        {canGoBack ? (
          <button
            onClick={() => router.back()}
            className="text-sm text-brand-sub hover:text-white focus-ring"
          >
            ← {label}
          </button>
        ) : (
          <Link
            href={fallback}
            className="text-sm text-brand-sub hover:text-white focus-ring"
          >
            ← {label}
          </Link>
        )}
      </div>
    </div>
  );
}
