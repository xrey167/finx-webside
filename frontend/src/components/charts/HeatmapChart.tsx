"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
import type { EChartsOption } from "echarts";

export type HeatmapCell = {
  x: string; // e.g., symbol or base
  y: string; // e.g., symbol or quote
  value: number; // correlation or change
};

export default function HeatmapChart({
  title,
  xLabels,
  yLabels,
  cells,
  height = 420,
  valueFormatter,
}: {
  title?: string;
  xLabels: string[];
  yLabels: string[];
  cells: HeatmapCell[];
  height?: number | string;
  valueFormatter?: (v: number) => string;
}) {
  const option: EChartsOption = useMemo(() => {
    const data = cells.map((c) => [xLabels.indexOf(c.x), yLabels.indexOf(c.y), c.value]);

    return {
      backgroundColor: "transparent",
      title: title ? { text: title, textStyle: { color: "#EDEDED" } } : undefined,
      tooltip: {
        position: "top",
        formatter: (p: { data: [number, number, number] }) => {
          const v = p.data?.[2] ?? 0;
          return `${yLabels[p.data[1]]} / ${xLabels[p.data[0]]}: ${valueFormatter ? valueFormatter(v) : v}`;
        },
      },
      grid: { left: 80, right: 16, bottom: 40, top: 40 },
      xAxis: {
        type: "category",
        data: xLabels,
        splitArea: { show: true },
        axisLabel: { color: "#9ca3af" },
      },
      yAxis: {
        type: "category",
        data: yLabels,
        splitArea: { show: true },
        axisLabel: { color: "#9ca3af" },
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: "vertical",
        left: "right",
        top: "middle",
        inRange: {
          color: ["#ef4444", "#0F0F23", "#22c55e"],
        },
        textStyle: { color: "#9ca3af" },
      },
      series: [
        {
          name: "Heatmap",
          type: "heatmap",
          data,
          label: { show: false },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.3)" } },
        },
      ],
    } as unknown as EChartsOption;
  }, [title, xLabels, yLabels, cells, valueFormatter]);

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
