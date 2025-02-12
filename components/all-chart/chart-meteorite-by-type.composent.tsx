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

export default function ChartMeteoriteByType({
                                                 meteorites,
                                             }: {
    meteorites: Meteorite[];
}) {
    // Initialiser les compteurs pour chaque type connu + le null
    const typeCounts = {
        Stone: 0,
        Iron: 0,
        "Stony-Iron": 0,
        null: 0,
    };

    // Remplir les compteurs
    meteorites.forEach((meteorite) => {
        if (meteorite.Type === null) {
            typeCounts.null++;
        } else {
            // meteorite.Type est forcément "Stone" | "Iron" | "Stony-Iron" | null
            typeCounts[meteorite.Type]++;
        }
    });

    // Construire le tableau de données pour Recharts
    const data = [
        { name: "Stone", value: typeCounts.Stone },
        { name: "Iron", value: typeCounts.Iron },
        { name: "Stony-Iron", value: typeCounts["Stony-Iron"] },
        { name: "Sans type", value: typeCounts.null }, // On renomme 'null' en "Sans type" pour l'affichage
    ];

    // Associer chaque catégorie à sa couleur
    const colorMap: Record<string, string> = {
        Stone: "#1f77b4",       // bleu
        Iron: "#ff7f0e",        // orange
        "Stony-Iron": "#2ca02c", // vert
        "Sans type": "#000000",  // noir
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
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={colorMap[entry.name]}
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
