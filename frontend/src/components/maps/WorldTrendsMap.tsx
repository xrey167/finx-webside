"use client";

import React, { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  height?: number | string;
  center?: [number, number];
  zoom?: number;
};

export default function WorldTrendsMap({ height = 480, center = [10, 20], zoom = 1.4 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: "https://demotiles.maplibre.org/style.json",
      center,
      zoom,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      // Basic dark overlay to approach TradingView vibe
      map.setPaintProperty("land", "background-color", "#0F0F23");
    });

    return () => map.remove();
  }, [center[0], center[1], zoom]);

  return <div ref={ref} className="w-full rounded-md border border-primary/40" style={{ height }} />;
}
