"use client";
import { addReview } from "@/lib/reviews-store";
import type { Review } from "@/lib/types";
import { useRef, useState } from "react";
import { sanitizeName, sanitizeText, clampRating } from "@/lib/sanitize";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

/**
 * A form for submitting a new movie review.
 * @param imdbID The IMDb ID of the movie being reviewed.
 * @param onCreated A callback function that is called when a new review is successfully created.
 */
export default function ReviewForm({
  imdbID,
  onCreated,
}: {
  imdbID: string;
  onCreated: (r: Review) => void;
}) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const safeText = sanitizeText(text);
    if (!safeText) return;
    setBusy(true);
    const safeName = sanitizeName(author);
    const safeRating = clampRating(rating);
    const created = addReview({
      imdbID,
      author: safeName,
      rating: safeRating,
      text: safeText,
    });
    onCreated(created);
    setAuthor("");
    setText("");
    setRating(5);
    setBusy(false);
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="bg-brand-soft/60 p-4 rounded-xl space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={64}
        />
        <Select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </Select>
      </div>
      <Textarea
        placeholder="Share your thoughts..."
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={800}
      />
      <div className="flex justify-end">
        <button
          disabled={busy || !text.trim()}
          className="px-4 py-2 rounded-lg bg-brand-primary text-black font-medium disabled:opacity-50"
        >
          {busy ? "Posting..." : "Post review"}
        </button>
      </div>
    </form>
  );
}
