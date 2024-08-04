"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CategoriesCount } from "./project-categories";

type Props = {
  categories: CategoriesCount[];
};
export default function CategoriesChart({ categories }: Props) {
  const chartConfig = categories.reduce(
    (config, category) => {
      config[category.category] = {
        label: category.category,
      };

      return config;
    },
    { count: { label: "Proyectos" } } as ChartConfig
  );

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={categories} layout="vertical">
        <CartesianGrid horizontal={false} />
        <YAxis dataKey="category" type="category" hide />
        <XAxis dataKey="count" type="number" tickLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="count"
          layout="vertical"
          radius={5}
          fill="hsl(var(--chart-5))"
        >
          <LabelList
            dataKey="category"
            position="insideLeft"
            offset={15}
            className="block w-full fill-white overflow-visible"
            fontSize={14}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
