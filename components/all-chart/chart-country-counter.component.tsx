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

    // Transformer l'objet en tableau, garder seulement les pays avec plus de 100 météorites
    // et trier par ordre décroissant
    const data = Object.entries(counts)
        .map(([country, count]) => ({ country, count }))
        .filter((entry) => entry.count > 100)
        .sort((a, b) => b.count - a.count);

    // Générateur de couleur HSL (changement de teinte progressif)
    const getColor = (index: number, total: number): string => {
        const hue = (index * 360) / total; // répartition sur le cercle HSL
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
                            // reversed={true}  // On enlève reversed pour que la plus grande valeur soit en haut
                            label={{
                                value: "Pays",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />
                        <Tooltip />

                        <Bar dataKey="count" name="Météorites">
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(index, data.length)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
