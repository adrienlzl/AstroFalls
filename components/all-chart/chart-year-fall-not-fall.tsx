import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";

export default function ChartYearFallNotFall({ meteorites }: { meteorites: Meteorite[] }) {
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
            <h3>Occurrences &quot;Fall&quot; et &quot;Find&quot; par année</h3>

            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            label={{ value: "Années", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                            scale="log"
                            domain={[1, 'auto']}
                            className="mx-6"
                            label={{
                                value: "Nombre d'occurrences",
                                angle: -90,
                                position: "insideLeft"
                            }}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                        <Legend />
                        <Bar dataKey="Fall" fill="#8884d8" name="Fall" />
                        <Bar dataKey="Find" fill="#82ca9d" name="Find" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
