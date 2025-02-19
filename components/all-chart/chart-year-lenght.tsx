import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import {
  Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";


export default function ChartYearByLength({ meteorites }: { meteorites: Meteorite[] }) {
	// Regroup meteorites by year
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
		.sort((a, b) => a.year - b.year);

	return (
		<Card className="charts-card">
			<CardHeader>
				<h3>Nombre de chutes de météorites par année</h3>
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
											fill="#6e02c7"
											fontWeight="bold"
											fontSize={13}
											textAnchor="middle">
									{ payload.value }
								</text> )} />
						<YAxis
							tick={({ x, y, payload }) => (
								<text x={x - 5}
											y={y}
											fill="#6e02c7"
											fontWeight="bold"
											fontSize={13}
											textAnchor="end"
											dominantBaseline="middle">
									{payload.value}
								</text> )} />
						<Tooltip />
						<Bar dataKey="count" fill="#b621fe" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
