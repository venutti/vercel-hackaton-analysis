"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type Props = {
  dates: { date: string; count: number }[];
};

export default function TimelineChart({ dates }: Props) {
  const chartConfig = {
    count: {
      label: "Proyectos",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer className="mx-auto max-h-[300px]" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={dates}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid
          vertical={false}
          horizontal={true}
          strokeDasharray="5 5"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="count"
          type="linear"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
