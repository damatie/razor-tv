"use client";
import { useState } from "react";
import { useReviews, deleteReview } from "@/lib/reviews-store";
import type { Review } from "@/lib/types";
import ReviewForm from "./ReviewForm";
export default function Reviews({ imdbID }: { imdbID: string }) {
  const initial = useReviews(imdbID).data;
  const [items, setItems] = useState<Review[]>(initial);
  return (
    <section className="mx-auto max-w-7xl px-4 mt-8 pb-16">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <ReviewForm imdbID={imdbID} onCreated={(r) => setItems([r, ...items])} />
      <ul className="mt-6 space-y-3">
        {items.length === 0 && (
          <li className="text-brand-sub">No reviews yet. Be the first.</li>
        )}
        {items.map((r) => (
          <li key={r.id} className="bg-brand-soft/60 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-brand-sub">
                {r.author} • {new Date(r.createdAt).toLocaleString()}
              </div>
              <div className="text-sm">⭐ {r.rating}</div>
            </div>
            <p className="mt-2 leading-relaxed text-sm">{r.text}</p>
            <div className="text-right mt-2">
              <button
                className="text-xs text-red-300 hover:underline"
                onClick={() => {
                  deleteReview(imdbID, r.id);
                  setItems(items.filter((i) => i.id !== r.id));
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
