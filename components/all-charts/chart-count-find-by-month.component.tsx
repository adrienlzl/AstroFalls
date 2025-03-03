import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { CustomTooltip } from "@/components/ui/custom-tooltip";
import { getMonthNameInFrench } from "@/lib/utils/translate-month-in-french";
import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";


export default function ChartCountFindByMonth({ meteorites }: { meteorites: Meteorite[] }) {
  const monthCounts: Record<string, number> = {};

  meteorites.forEach((meteorite) => {
    if (meteorite.ff === "Find" && meteorite.Month) {
      const month = meteorite.Month.trim();
      const normalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
      monthCounts[normalizedMonth] = (monthCounts[normalizedMonth] || 0) + 1;
    }
  });

  const monthsOrder = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const chartData = monthsOrder.map((month) => {
    const count = monthCounts[month] || 0;
    return { month, find: count };
  });

  const sortedChartData = chartData.sort((a, b) => {
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
  });

  // Get generic colors
  const { accentColor, primaryColor, secondaryColor } = useGenericColorsHook();

  return (
    <Card className="charts-card">
      <CardHeader className="charts-card-header">
        <h3>Nombre de découvertes de météorites par mois</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={ sortedChartData } margin={{ right: 30 }}>
            <CartesianGrid vertical={ false } strokeDasharray="1 1" />
            <XAxis
              dataKey="month"
              tick={({ x, y, payload }) => (
                <text x={ x }
                      y={ y + 15 }
                      fill={ accentColor }
                      fontWeight="bold"
                      fontSize={11}
                      textAnchor="middle">
                  { getMonthNameInFrench(payload.value) }
                </text> )}
              interval={0} />
            <YAxis
              dataKey="find"
              tick={({ x, y, payload }) => (
                <text x={ x - 5 }
                      y={ y }
                      fill={ accentColor }
                      fontWeight="bold"
                      fontSize={13}
                      textAnchor="end"
                      dominantBaseline="middle">
                  { payload.value }
                </text> )} />
            <Tooltip
							content={( { label, payload, active }  ) => {
								const monthName = getMonthNameInFrench(label);
								return (
									<CustomTooltip
										label={ monthName }
										payload={ payload }
										active={ active }
										labelText="Découvertes : " /> );
							}} />
            <Line
              type="monotone"
              dataKey="find"
              stroke={ primaryColor }
              strokeWidth={2}
              dot={{ r: 4, fill: accentColor, stroke: accentColor }}
              activeDot={{ r: 7, fill: secondaryColor }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
