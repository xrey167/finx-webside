"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
import type { EChartsOption } from "echarts";

export type DonutSlice = {
  name: string;
  value: number;
  color?: string;
};

export type DonutPortfolioChartProps = {
  title?: string;
  data: DonutSlice[];
  height?: number | string;
};

export default function DonutPortfolioChart({ title, data, height = 360 }: DonutPortfolioChartProps) {
  const option: EChartsOption = useMemo(() => {
    return {
      backgroundColor: "transparent",
      title: title ? { text: title, left: "center", textStyle: { color: "#EDEDED" } } : undefined,
      tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
      legend: { orient: "vertical", left: "left", textStyle: { color: "#9ca3af" } },
      series: [
        {
          name: "Portfolio",
          type: "pie",
          radius: ["50%", "75%"],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: "#0F0F23", borderWidth: 2 },
          label: { show: false, position: "center" },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
          labelLine: { show: false },
          data: data.map((d) => ({ value: d.value, name: d.name, itemStyle: { color: d.color } })),
        },
      ],
    } as EChartsOption;
  }, [title, data]);

  return (
    <div className="w-full" style={{ height }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
