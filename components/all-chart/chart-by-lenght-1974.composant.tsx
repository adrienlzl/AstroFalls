import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import {
	BarChart,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";


export default function ChartYearByLength1974({ meteorites }: { meteorites: Meteorite[] }) {
	// Regroup meteorites/year
	const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
		if (meteorite.Year) {
			const year = meteorite.Year.toString();
			acc[year] = (acc[year] || 0) + 1;
		}
		return acc;
}, {});

	// Construct data for Recharts
	const chartData = Object.entries(data)
		.map(([year, count]) => ({ year: parseInt(year), count }))
		.filter((item) => item.year >= 1974)
		.sort((a, b) => a.year - b.year);

	// Get generic colors
	const { accentColor } = useGenericColorsHook();

	return (
		<Card className="charts-card">
			<CardHeader className="charts-card-header">
				<h3>Nombre de chutes de météorites par année (après 1973)</h3>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={ chartData }>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="year"
							tick={({ x, y, payload }) => (
								<text x={x}
											y={y + 15}
											fill={ accentColor }
											fontWeight="bold"
											fontSize={13}
											textAnchor="middle">
									{ payload.value }
								</text> )} />
						<YAxis
							tick={({ x, y, payload }) => (
								<text x={x - 5}
											y={y}
											fill={ accentColor }
											fontWeight="bold"
											fontSize={13}
											textAnchor="end"
											dominantBaseline="middle">
									{payload.value}
								</text> )} />
						<Tooltip />
						<Bar dataKey="count" fill="#02afac" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
