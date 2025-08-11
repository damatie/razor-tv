import NavBar from "@/components/NavBar";
import BackBar from "@/components/BackBar";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";
export default function SearchPage() {
  return (
    <main className="flex-1">
      <Suspense>
        <NavBar />
      </Suspense>
      <BackBar label="Back" fallback="/" />
      <Suspense>
        <SearchResults />
      </Suspense>
    </main>
  );
}
