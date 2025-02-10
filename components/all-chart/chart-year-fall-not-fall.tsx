import {Meteorite} from "@/lib/interfaces/meteorite-interface";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from "recharts";

export  default function ChartYearFallNotFall({ meteorites }: { meteorites: Meteorite[] }) {
    // Regrouper les occurrences "Fall" et "Find" par année
    const data = meteorites.reduce((acc: Record<string, { Fall: number; Find: number }>, meteorite) => {
        if (meteorite.Year && meteorite.ff) {
            const year = meteorite.Year.toString();
            if (!acc[year]) {
                acc[year] = { Fall: 0, Find: 0 };
            }
            acc[year][meteorite.ff] = (acc[year][meteorite.ff] || 0) + 1;
        }
        return acc;
    }, {});

    console.log("Fall/Find data by year:", data);

    // Transformer les données pour les utiliser avec Recharts
    const chartData = Object.entries(data)
        .map(([year, counts]) => ({
            year: parseInt(year),
            Fall: counts.Fall,
            Find: counts.Find,
        }))
        .sort((a, b) => a.year - b.year); // Trier les années dans l'ordre chronologique

    return (
        <Card>
            <CardHeader>
                <h3>Occurrences "Fall" et "Find" par année</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
                        <YAxis
                            scale="log"
                            domain={[1, 'auto']}
                            className="mx-6"
                            label={{ value: "Nombre d'occurrences", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `${value}`} // Format des ticks sans modification
                        />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Fall" stroke="#8884d8" name="Fall" />
                        <Line type="monotone" dataKey="Find" stroke="#82ca9d" name="Find" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
