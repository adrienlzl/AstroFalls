import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function GraphCountryByNumber({
                                                 meteorites,
                                             }: {
    meteorites: Meteorite[];
}) {
    // Compter le nombre de météorites par pays (en ignorant les pays vides)
    const counts: Record<string, number> = {};
    meteorites.forEach((meteorite) => {
        const country = meteorite.Country?.trim();
        if (country) {
            counts[country] = (counts[country] || 0) + 1;
        }
    });

    // Transformer l'objet en tableau, filtrer pour ne garder que les pays avec plus de 100 météorites
    // et trier par ordre décroissant (le pays avec le plus de météorites en premier)
    const data = Object.entries(counts)
        .map(([country, count]) => ({ country, count }))
        .filter((entry) => entry.count > 100)
        .sort((a, b) => b.count - a.count);

    // Générateur de couleur en HSL pour obtenir une palette moderne et professionnelle
    const getColor = (index: number, total: number): string => {
        const hue = (index * 360) / total;
        return `hsl(${hue}, 70%, 50%)`;
    };

    return (
        <Card>
            <CardHeader>
                <h3>Nombre de météorites par pays (plus de 100)</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            label={{
                                value: "Nombre de météorites",
                                position: "insideBottom",
                                offset: -5,
                            }}
                        />
                        <YAxis
                            dataKey="country"
                            type="category"
                            reversed={true}
                            label={{
                                value: "Pays",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Météorites">
                            <>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(index, data.length)} />
                            ))}
                            </>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
