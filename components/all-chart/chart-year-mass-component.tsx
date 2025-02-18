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
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="year"
							label={{ value: "Années", position: "insideBottom", offset: -5 }} />
						<YAxis
							scale="log"
							domain={[1, "auto"]}
							className="mx-6"
							label={{ value: "Masse cumulée (t)", angle: -90, position: "insideLeft" }}
							tickFormatter={(value) => `${value.toLocaleString()} t`} />
						<Tooltip formatter={(value: number) => `${value.toLocaleString()} t`} />
						<Bar dataKey="totalMass" fill="#b621fe" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
