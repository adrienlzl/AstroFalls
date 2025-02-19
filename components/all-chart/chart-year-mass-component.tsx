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


export default function ChartYearByMass({ meteorites }: { meteorites: Meteorite[] }) {
	const parseWeight = (weight: string | number | null): number => {
		if (weight == null) {
			return 0;
		}

		if (typeof weight === "number") {
			return weight;
		}

		const parsed = parseFloat(weight.replace(/[^0-9.]/g, ""));
		return isNaN(parsed) ? 0 : parsed;
	};

	// Regroup meteorite weight by year
	const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
		if (meteorite.Year && meteorite["Recovered weight"] != null) {
			const year = meteorite.Year.toString();
			const weightInKg = parseWeight(meteorite["Recovered weight"]);
			acc[year] = (acc[year] || 0) + weightInKg;
		}
		return acc;
	}, {});

	// Construct data for Recharts
	const chartData = Object.entries(data)
		.map(([year, totalMass]) => ({
			year: parseInt(year, 10),
			totalMass: totalMass / 1000
		}))
		.sort((a, b) => a.year - b.year);

	return (
		<Card id="charts-card">
			<CardHeader>
				<h3>Masse cumulée des chutes de météorites par année (tonnes)</h3>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={ chartData }>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="year"
							tick={({ x, y, payload }) => (
								<text
									x={x}
									y={y + 15}
									fill="#6e02c7"
									fontWeight="bold"
									fontSize={13}
									textAnchor="middle">
									{ payload.value }
								</text> )} />
						<YAxis
							domain={[1, 60]}
							tick={({ x, y, payload }) => (
								<text
									x={x - 10}
									y={y}
									fill="#6e02c7"
									fontWeight="bold"
									fontSize={13}
									textAnchor="end"
									dominantBaseline="middle">
									{`${Math.floor(payload.value).toLocaleString()} t`}
								</text> )} />

						<YAxis
							tick={{ fill: "#6e02c7",
											fontWeight: "bold",
											fontSize: 13 }}
							domain={ [1, 60] }
							tickFormatter={ (value) => `${Math.floor(value).toLocaleString()} t`} />
						<Tooltip formatter={ (value: number) => `${value.toLocaleString() } t`} />
						<Bar dataKey="totalMass" fill="#b621fe" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
