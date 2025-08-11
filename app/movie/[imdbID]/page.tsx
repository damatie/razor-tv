"use client";
import { useParams } from "next/navigation";
import { useDetails } from "@/hooks/useMovies";
import NavBar from "@/components/NavBar";
import BackBar from "@/components/BackBar";
import MovieHeader from "@/components/movie/MovieHeader";
import Reviews from "@/components/movie/Reviews";
export default function MoviePage() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const { data, isLoading, isError } = useDetails(imdbID);
  if (isLoading) return <Sk />;
  if (isError || !data)
    return <p className="px-4 py-10">Could not load movie.</p>;
  return (
    <main className="flex-1">
      <NavBar />
      <BackBar label="Back" fallback="/" />
      <MovieHeader m={data} />
      <Reviews imdbID={imdbID} />
    </main>
  );
}
function Sk() {
  return (
    <main>
      <NavBar />
      <BackBar label="Back" fallback="/" />
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
        <div className="aspect-[2/3] skeleton" />
        <div className="space-y-3">
          <div className="h-8 w-64 skeleton" />
          <div className="h-4 w-40 skeleton" />
          <div className="h-4 w-80 skeleton" />
          <div className="h-24 w-full skeleton" />
        </div>
      </div>
    </main>
  );
}
