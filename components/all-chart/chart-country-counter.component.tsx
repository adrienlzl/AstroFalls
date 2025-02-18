import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


export default function GraphCountryByNumber({
  meteorites,
}: {
  meteorites: Meteorite[];
}) {
	// Count meteorites by country (country wich are null are ignored)
	const counts: Record<string, number> = {};
	meteorites.forEach((meteorite) => {
		const country = meteorite.Country?.trim();
		if (country) {
			counts[country] = (counts[country] || 0) + 1;
		}
	});

	// Transform object in table (keep only country with more than 100 meteorites/ascend filtering)
	const data = Object.entries(counts)
		.map(([country, count]) => ({ country, count }))
		.filter((entry) => entry.count > 100)
		.sort((a, b) => b.count - a.count);

	// HSL color generator
	const getColor = (index: number, total: number): string => {
		const hue = (index * 360) / total;
		return `hsl(${hue}, 70%, 50%)`;
	};

	return (
		<Card id="charts-card">
			<CardHeader>
				<h3>Chutes de météorites par pays</h3>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={500}>
					<BarChart
						data={data}
						layout="vertical"
						margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							type="number"
							label={{
								value: "Nombre de météorites",
								position: "insideBottom",
								offset: -5}} />
						<YAxis
							dataKey="country"
							type="category"
							label={{
								value: "Pays",
								angle: -90,
								position: "insideLeft"}} />
						<Tooltip />
						<Bar dataKey="count" name="Météorites">
							{data.map((_entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={getColor(index, data.length)}/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
