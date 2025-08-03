"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { PIE_CHART_COLORS } from "@/consts";
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
              outerRadius={150}
              label={({ nameEng, nameUkr, count }) => {
                const name = locale === "en" ? nameEng : nameUkr;
                return `${name}: ${count}`;
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
