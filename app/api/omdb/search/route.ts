import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ q: z.string().trim().min(1), page: z.coerce.number().int().min(1).max(100).default(1), type: z.enum(["movie","series"]).optional(), y: z.coerce.number().int().min(1900).max(2100).optional() });
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = schema.safeParse({ q: searchParams.get("q"), page: searchParams.get("page") || "1", type: searchParams.get("type") || undefined, y: searchParams.get("y") || undefined });
  if (!parsed.success) return NextResponse.json({ Error: "Invalid params" }, { status: 400 });
  const { q, page, type, y } = parsed.data;
  const qs = new URLSearchParams({ s: q, page: String(page), apikey: process.env.OMDB_API_KEY || "" });
  if (type) qs.set("type", type); if (y) qs.set("y", String(y));
  const url = `http://www.omdbapi.com/?${qs.toString()}`;
  const res = await fetch(url, { cache: "no-store" }); const data = await res.json();
  return NextResponse.json(data);
}
