import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

// Ici on suppose que le champ "Recovered weight" est déjà en kilogrammes
function parseMassInKg(mass: string | number | null | undefined): number {
    if (mass == null) {
        return 0;
    }

    // Si c’est déjà un nombre, on le renvoie tel quel
    if (typeof mass === "number") {
        return mass;
    }

    // Sinon, on parse simplement la chaîne en nombre (en kg)
    const parsed = parseFloat(mass.trim());
    return isNaN(parsed) ? 0 : parsed;
}

export default function ChartMassByTypeBar({ meteorites }: { meteorites: Meteorite[] }) {
    // On stocke la masse totale (en kg) pour chacune des 4 catégories
    const typeMass = {
        Stone: 0,
        Iron: 0,
        "Stony-Iron": 0,
        null: 0,
    };

    // Parcours des météorites pour cumuler la masse par type
    meteorites.forEach((meteorite) => {
        const weight = parseMassInKg(meteorite["Recovered weight"]);
        const typeKey = meteorite.Type === null ? null : meteorite.Type.trim();

        // Répartition par type
        if (typeKey === "Stone") {
            typeMass.Stone += weight;
        } else if (typeKey === "Iron") {
            typeMass.Iron += weight;
        } else if (typeKey === "Stony-Iron") {
            typeMass["Stony-Iron"] += weight;
        } else {
            typeMass.null += weight;
        }
    });

    // Construire les données pour Recharts (conversion en tonnes et arrondi à 1 décimale, avec arrondi vers le haut)
    const data = [
        { name: "Stone", value: Math.ceil((typeMass.Stone / 1000) * 10) / 10 },
        { name: "Iron", value: Math.ceil((typeMass.Iron / 1000) * 10) / 10 },
        { name: "Stony-Iron", value: Math.ceil((typeMass["Stony-Iron"] / 1000) * 10) / 10 },
        { name: "Sans type", value: Math.ceil((typeMass.null / 1000) * 10) / 10 },
    ];

    // Couleurs fixes par catégorie
    const colorMap: Record<string, string> = {
        Stone: "#1f77b4",        // bleu
        Iron: "#ff7f0e",         // orange
        "Stony-Iron": "#2ca02c", // vert
        "Sans type": "#000000",  // noir
    };

    return (
        <Card>
            <CardHeader>
                <h3>Masse totale (en tonnes) par type de météorite</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Masse (t)">
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={colorMap[entry.name]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
