"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { NodeNextRequest } from "next/dist/server/base-http/node";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type Props = {
  issuesCount: number;
  isFullDeployedCount: number;
  isOnlyDeployedCount: number;
  onlyUsesVercelCount: number;
};

export default function IssuesChart({
  issuesCount,
  isFullDeployedCount,
  isOnlyDeployedCount,
  onlyUsesVercelCount,
}: Props) {
  const chartConfig = {
    projects: {
      label: "Proyectos",
    },
    isFullDeployedCount: {
      label: "Proyectos completos ",
      color: "hsl(var(--chart-1))",
    },
    isOnlyDeployedCount: {
      label: "Solo deployados ",
      color: "hsl(var(--chart-2))",
    },
    onlyUsesVercelCount: {
      label: "Solo usan Vercel ",
      color: "hsl(var(--chart-3))",
    },
    other: {
      label: "No cumplen los requisitos ",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const otherCount =
    issuesCount -
    isFullDeployedCount -
    isOnlyDeployedCount -
    onlyUsesVercelCount;

  const chartData = [
    {
      type: "isFullDeployedCount",
      count: isFullDeployedCount,
      fill: chartConfig.isFullDeployedCount?.color,
    },
    {
      type: "isOnlyDeployedCount",
      count: isOnlyDeployedCount,
      fill: chartConfig.isOnlyDeployedCount?.color,
    },
    {
      type: "onlyUsesVercelCount",
      count: onlyUsesVercelCount,
      fill: chartConfig.onlyUsesVercelCount?.color,
    },
    { type: "other", count: otherCount, fill: chartConfig.other?.color },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {issuesCount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Proyectos
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
