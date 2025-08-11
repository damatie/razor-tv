import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; const schema = z.object({ id: z.string().trim().min(2) });
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = schema.safeParse({ id: searchParams.get("id") });
  if (!parsed.success) return NextResponse.json({ Error: "Invalid params" }, { status: 400 });
  const id = parsed.data.id; const url = `http://www.omdbapi.com/?i=${encodeURIComponent(id)}&plot=full&apikey=${process.env.OMDB_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" }); const data = await res.json();
  return NextResponse.json(data);
}
