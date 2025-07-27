"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { ShotGlass } from "@prisma/client";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Country",
    color: "var(--color-red)",
  },
} satisfies ChartConfig;

type ChartDataItem = {
  nameEng: string;
  nameUkr: string;
  count: number;
};

type CountryAccumulator = Record<string, ChartDataItem>;

export default function BarChartCustom({ items }: { items: ShotGlass[] }) {
  const locale = useLocale();

  const shotGlassesBarChart: ChartDataItem[] = useMemo(() => {
    const countsByCountry: CountryAccumulator = items.reduce(
      (acc: CountryAccumulator, curr: ShotGlass): CountryAccumulator => {
        if (!acc[curr.countryEng]) {
          acc[curr.countryEng] = {
            nameEng: curr.countryEng,
            nameUkr: curr.countryUkr,
            count: 1,
          };
        } else {
          acc[curr.countryEng] = {
            ...acc[curr.countryEng],
            count: acc[curr.countryEng].count + 1,
          };
        }
        return acc;
      },
      {} as CountryAccumulator
    );

    return Object.values(countsByCountry);
  }, [items]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle> Showing total shot glasses per country</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={shotGlassesBarChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={locale === "en" ? "nameEng" : "nameUkr"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value.length > 8 ? value.slice(0, 6) + "..." : value
              }
              fontSize={12}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                      <p className="font-medium">{`${label}: ${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" fill="var(--color-red)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
