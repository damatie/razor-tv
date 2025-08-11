import NavBar from "@/components/NavBar";
import HeroCarousel from "@/components/home/HeroCarousel";
import CollectionRow from "@/components/home/CollectionRow";
import { Suspense } from "react";
export default function Home() {
  return (
    <main className="flex-1">
      <Suspense>
        <NavBar />
      </Suspense>
      <HeroCarousel />
      <CollectionRow keyName="latest-movies" />
      <CollectionRow keyName="latest-series" />
      <CollectionRow keyName="family" />
    </main>
  );
}
