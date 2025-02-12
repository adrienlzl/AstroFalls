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

function parseMassInGrams(massStr: string): number {
    // On enlève d'éventuels espaces et on passe en minuscule
    const cleaned = massStr.trim().toLowerCase();

    // Au cas où il y aurait un "g" à la fin (ex: "123g" ou "123 g")
    if (cleaned.endsWith("g")) {
        return parseFloat(cleaned.replace("g", ""));
    }

    // Sinon on interprète directement comme un nombre en grammes
    return parseFloat(cleaned);
}

export default function ChartMassByTypeBar({
                                               meteorites,
                                           }: {
    meteorites: Meteorite[];
}) {
    // On stocke la masse totale (en grammes) pour chacune des 4 catégories
    const typeMass = {
        Stone: 0,
        Iron: 0,
        "Stony-Iron": 0,
        null: 0,
    };

    // Parcours des météorites pour cumuler la masse par type
    meteorites.forEach((meteorite) => {
        // Vérifier si on a un poids récupéré (en grammes)
        const weightStr = meteorite["Recovered weight"];

        if (weightStr) {
            // Convertir la chaîne de caractères en nombre (grammes)
            const massInGrams = parseMassInGrams(weightStr);

            // Déterminer la clé de type (Stone, Iron, Stony-Iron ou null)
            const typeKey = meteorite.Type === null ? null : meteorite.Type.trim();

            // Incrémenter la masse pour ce type
            if (typeKey === "Stone") {
                typeMass.Stone += massInGrams;
            } else if (typeKey === "Iron") {
                typeMass.Iron += massInGrams;
            } else if (typeKey === "Stony-Iron") {
                typeMass["Stony-Iron"] += massInGrams;
            } else {
                // Tout ce qui ne correspond pas aux 3 valeurs précédentes
                // (ou si meteorite.Type est réellement null)
                typeMass.null += massInGrams;
            }
        }
    });

    // Construire les données pour Recharts
    // On convertit en kg puis on arrondit à l’entier
    const data = [
        {
            name: "Stone",
            value: Math.round(typeMass.Stone / 1000),
        },
        {
            name: "Iron",
            value: Math.round(typeMass.Iron / 1000),
        },
        {
            name: "Stony-Iron",
            value: Math.round(typeMass["Stony-Iron"] / 1000),
        },
        {
            name: "Sans type", // pour ceux qui ont Type = null ou un type non reconnu
            value: Math.round(typeMass.null / 1000),
        },
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
                <h3>Masse totale (en kg) par type de météorite</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Bar pour la valeur "value", avec coloriage par type */}
                        <Bar dataKey="value" name="Masse (kg)">
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
