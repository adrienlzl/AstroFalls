import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

export default function GraphMeteoriteByType({
                                                 meteorites,
                                             }: {
    meteorites: Meteorite[];
}) {
    // Comptabiliser le nombre de météorites par type (on ignore les types vides)
    const typeCounts: Record<string, number> = {};

    meteorites.forEach((meteorite) => {
        const type = meteorite.Type?.trim();
        if (type) {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        }
    });

    // Transformer l'objet en tableau au format attendu par Recharts :
    // Chaque objet aura une clé 'name' (le type) et 'value' (le nombre)
    const data = Object.entries(typeCounts).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    // Générateur de couleur en HSL pour répartir uniformément une palette moderne
    const getColor = (index: number, total: number): string => {
        const hue = (index * 360) / total;
        return `hsl(${hue}, 70%, 50%)`;
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
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(index, data.length)}
                                />
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
