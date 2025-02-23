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
import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";


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
		{ name: "Sans Type", value: typeCounts.null }
	];

	// Get generic colors
	const { colorMeteoriteType } = useGenericColorsHook();

	return (
		<Card id="chart-meteorite-by-type" className="charts-card">
			<CardHeader className="charts-card-header">
				<h3>Total de météorites par type</h3>
			</CardHeader>
			<CardContent id="chart-content-meteorite-by-type">
				<ResponsiveContainer height={400}>
					<PieChart>
						<Pie data={ data }
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={150}
								label
								paddingAngle={7}>
							{ data.map((entry) => (
								<Cell
									key={ entry.name }
									fill={ colorMeteoriteType[entry.name] } />
							))}
						</Pie>
						<Tooltip />
						<Legend iconSize={18} />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
