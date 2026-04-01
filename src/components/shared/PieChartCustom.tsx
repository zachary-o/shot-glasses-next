"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { PIE_CHART_COLORS } from "@/consts";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartDataItem, ContinentAccumulator } from "@/types";
import { ShotGlass } from "@prisma/client";
import { useLocale } from "next-intl";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Country",
    color: "var(--color-red)",
  },
} satisfies ChartConfig;

export default function PieChartCustom({ items }: { items: ShotGlass[] }) {
  const locale = useLocale();
  // DISPLAY TWO CHARTS IN A COLUMN!!!!!!!
  const { width } = useIsMobile();
  const outerRadius = Math.min(120, width * 0.12);
  const fontSize = width < 425 ? 8 : width < 768 ? 10 : 13;
  const labelOffset = width < 425 ? 14 : width < 768 ? 18 : 28;

  const shotGlassesPieChart: ChartDataItem[] = useMemo(() => {
    const countsByContinent: ContinentAccumulator = items.reduce(
      (acc: ContinentAccumulator, curr: ShotGlass) => {
        if (!acc[curr.continentEng]) {
          acc[curr.continentEng] = {
            nameEng: curr.continentEng,
            nameUkr: curr.continentUkr,
            count: 1,
          };
        } else {
          acc[curr.continentEng] = {
            ...acc[curr.continentEng],
            count: acc[curr.continentEng].count + 1,
          };
        }
        return acc;
      },
      {} as ContinentAccumulator
    );

    return Object.values(countsByContinent);
  }, [items]);

  return (
    <Card className="flex-1 flex flex-col max-h-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Showing total shot glasses per continent</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const continentName =
                    locale === "en" ? data.nameEng : data.nameUkr;
                  return (
                    <div
                      className="bg-white border border-gray-200 rounded-lg p-3"
                      style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
                    >
                      <p className="font-medium">{`${continentName}: ${data.count}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={shotGlassesPieChart}
              dataKey="count"
              nameKey={locale === "en" ? "nameEng" : "nameUkr"}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              label={({ cx, cy, midAngle, nameEng, nameUkr, count }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + labelOffset;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const name = locale === "en" ? nameEng : nameUkr;
                const display = width < 425
                  ? `${name.slice(0, 3)}: ${count}`
                  : `${name}: ${count}`;

                return (
                  <text
                    x={x}
                    y={y}
                    fill="currentColor"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={fontSize}
                  >
                    {display}
                  </text>
                );
              }}
            >
              {shotGlassesPieChart.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
