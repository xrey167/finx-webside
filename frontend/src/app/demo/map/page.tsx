"use client";

import dynamic from "next/dynamic";
const WorldTrendsMap = dynamic(() => import("@/components/maps/WorldTrendsMap"), { ssr: false });

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent">World Trends Map</h1>
      <WorldTrendsMap />
    </main>
  );
}
