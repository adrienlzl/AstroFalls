import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Cell,
	Legend,
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip
} from "recharts";


export default function ChartMeteoriteByType({
  meteorites,
}: {
	meteorites: Meteorite[];
}) {
	const typeCounts = {
		Stone: 0,
		Iron: 0,
		"Stony-Iron": 0,
		null: 0,
	};

	// Fill meters
	meteorites.forEach((meteorite) => {
		if (meteorite.Type === null) {
			typeCounts.null++;
		}
		else {
			typeCounts[meteorite.Type]++;
		}
	});

	// Construct data for Recharts
	const data = [
		{ name: "Stone", value: typeCounts.Stone },
		{ name: "Iron", value: typeCounts.Iron },
		{ name: "Stony-Iron", value: typeCounts["Stony-Iron"] },
		{ name: "Sans type", value: typeCounts.null }
	];

	const colorMap: Record<string, string> = {
		Stone: "#1f77b4",
		Iron: "#ff7f0e",
		"Stony-Iron": "#2ca02c",
		"Sans type": "#000000"
	};

	return (
		<Card>
			<CardHeader>
				<h3>Nombre total de météorites par type</h3>
			</CardHeader>
			<CardContent className="px-6">
				<ResponsiveContainer width="100%" height={400}>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={150}
							label>
							{data.map((entry) => (
								<Cell
									key={entry.name}
									fill={colorMap[entry.name]} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
