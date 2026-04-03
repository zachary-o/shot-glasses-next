"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { BAR_CHART_COLORS } from "@/consts";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartDataItem, CountryAccumulator } from "@/types";
import { ShotGlass } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Country",
    color: "var(--color-red)",
  },
} satisfies ChartConfig;

export default function BarChartCustom({ items }: { items: ShotGlass[] }) {
  const locale = useLocale();
  const t = useTranslations("Dashboard");
  const { width } = useIsMobile();
  let fontSize
  if (width > 1024) {
    fontSize = 13
  } else if (width <= 1024) {
    fontSize = 8
  }

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

    const topTenCountriesByCount = Object.values(countsByCountry)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((item, index) => ({
        ...item,
        fill: BAR_CHART_COLORS[index % BAR_CHART_COLORS.length],
      }));

    return topTenCountriesByCount;
  }, [items]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{t("totalPerCountry")}</CardTitle>
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
              angle={width <= 1024 ? -45 : 0}
              fontSize={fontSize}
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
            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
