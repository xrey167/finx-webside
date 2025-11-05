"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
import type { EChartsOption } from "echarts";

export type EquityPoint = [number, number]; // [ts, equity]

export default function EquityCurveChart({
  data,
  title = "Equity",
  height = 320,
}: {
  data: EquityPoint[];
  title?: string;
  height?: number | string;
}) {
  const option: EChartsOption = useMemo(() => {
    return {
      backgroundColor: "transparent",
      title: { text: title, textStyle: { color: "#EDEDED" } },
      tooltip: { trigger: "axis" },
      grid: { left: 40, right: 16, top: 32, bottom: 40 },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#6b7280" } },
        axisLabel: { color: "#9ca3af" },
      },
      yAxis: {
        type: "value",
        scale: true,
        axisLine: { lineStyle: { color: "#6b7280" } },
        axisLabel: { color: "#9ca3af" },
        splitLine: { lineStyle: { color: "#1f2937" } },
      },
      series: [
        {
          type: "line",
          name: "Equity",
          showSymbol: false,
          smooth: true,
          lineStyle: { width: 2, color: "#C084FC" },
          areaStyle: { color: "rgba(192,132,252,0.12)" },
          data,
        },
      ],
    } as EChartsOption;
  }, [data, title]);

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
