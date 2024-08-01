"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ProjectMetrics } from "@/lib/interfaces";

type Props = ProjectMetrics;

export default function DistributionChart({
  totalProjects,
  fullyCompliantCount,
  nonCompliantCount,
  onlyDeployedCount,
  onlyVercelSDKCount,
}: Props) {
  const chartConfig = {
    fullyCompliantCount: {
      label: "Proyectos deployados ",
      color: "hsl(var(--chart-1))",
    },
    onlyDeployedCount: {
      label: "Solo deployados ",
      color: "hsl(var(--chart-2))",
    },
    onlyVercelSDKCount: {
      label: "Solo usan Vercel ",
      color: "hsl(var(--chart-3))",
    },
    nonCompliantCount: {
      label: "No cumplen los requisitos ",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      type: "fullyCompliantCount",
      count: fullyCompliantCount,
      fill: chartConfig.fullyCompliantCount?.color,
    },
    {
      type: "onlyDeployedCount",
      count: onlyDeployedCount,
      fill: chartConfig.onlyDeployedCount?.color,
    },
    {
      type: "onlyVercelSDKCount",
      count: onlyVercelSDKCount,
      fill: chartConfig.onlyVercelSDKCount?.color,
    },
    {
      type: "nonCompliantCount",
      count: nonCompliantCount,
      fill: chartConfig.nonCompliantCount?.color,
    },
  ].filter((data) => data.count > 0);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <Pie
          label
          data={chartData}
          dataKey="count"
          nameKey="type"
          innerRadius={60}
          strokeWidth={2}
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
                      {totalProjects.toLocaleString()}
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
        <ChartLegend
          content={<ChartLegendContent />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
