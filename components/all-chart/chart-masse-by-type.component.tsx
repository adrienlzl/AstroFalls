import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


// Assume "Recovered weight" field is already in kg
function parseMassInKg(mass: string | number | null | undefined): number {
	if (mass == null) {
		return 0;
	}

	if (typeof mass === "number") {
		return mass;
	}

	// Otherwise simply parse string by number (kg)
	const parsed = parseFloat(mass.trim());
	return isNaN(parsed) ? 0 : parsed;
}

export default function ChartMassByTypeBar({ meteorites }: { meteorites: Meteorite[] }) {
	// Store total mass (kg) for each of categories
	const typeMass = {
		Stone: 0,
		Iron: 0,
		"Stony-Iron": 0,
		null: 0,
	};

	// Browse meteorites to accumulate mass by type
	meteorites.forEach((meteorite) => {
		const weight = parseMassInKg(meteorite["Recovered weight"]);
		const typeKey = meteorite.Type === null ? null : meteorite.Type.trim();

		// Répartition par type
		if (typeKey === "Stone") {
			typeMass.Stone += weight;
		}
		else if (typeKey === "Iron") {
			typeMass.Iron += weight;
		}
		else if (typeKey === "Stony-Iron") {
			typeMass["Stony-Iron"] += weight;
		}
		else {
			typeMass.null += weight;
		}
	});

	// Construct data for Recharts
	const data = [
		{ name: "Stone", value: Math.ceil((typeMass.Stone / 1000) * 10) / 10 },
		{ name: "Iron", value: Math.ceil((typeMass.Iron / 1000) * 10) / 10 },
		{ name: "Stony-Iron", value: Math.ceil((typeMass["Stony-Iron"] / 1000) * 10) / 10 },
		{ name: "Sans type", value: Math.ceil((typeMass.null / 1000) * 10) / 10 },
	];

	const colorMap: Record<string, string> = {
		Stone: "#1f77b4",
		Iron: "#ff7f0e",
		"Stony-Iron": "#2ca02c",
		"Sans type": "#000000",
	};

	return (
		<Card id="charts-card">
			<CardHeader>
				<h3>Masse totale par type de météorites</h3>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={ data }>
					<XAxis
						dataKey="name"
						tick={({ x, y, payload }) => {
							const color = colorMap[payload.value] || "#000";
							return (
								<text
									x={x}
									y={y + 15}
									fill={ color }
									fontWeight="bold"
									fontSize={13}
									textAnchor="middle">
									{ payload.value }
								</text>);
						}} />
						<YAxis
							tick={{ fill: "#6e02c7",
											fontWeight: "bold",
											fontSize: 13 }}/>
						<Tooltip />
						<Bar
							dataKey="value">
							{data.map((entry) => (
								<Cell key={ entry.name } fill={ colorMap[entry.name] } />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
