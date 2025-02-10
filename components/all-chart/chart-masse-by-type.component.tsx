import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function GraphMassByType({
                                            meteorites,
                                        }: {
    meteorites: Meteorite[];
}) {
    // Fonction utilitaire pour parser le poids et le convertir en grammes.
    // On s'attend à un format du type "1234 g" ou "1.2 kg"
    const parseWeight = (weight: string | null): number => {
        if (!weight) return 0;
        const trimmed = weight.trim().toLowerCase();
        const match = trimmed.match(/([\d\.]+)\s*(kg|g)/);
        if (!match) return 0;
        const value = parseFloat(match[1]);
        const unit = match[2];
        return unit === "kg" ? value * 1000 : value;
    };

    // Filtrer uniquement les météorites de type "StoneIron" et "Iron"
    const filteredMeteorites = meteorites.filter((m) => {
        const type = m.Type?.trim();
        return type === "StoneIron" || type === "Iron";
    });

    // Calculer la masse totale par type
    const massByType: Record<string, number> = {};
    filteredMeteorites.forEach((m) => {
        const type = m.Type?.trim();
        if (type) {
            massByType[type] = (massByType[type] || 0) + parseWeight(m["Recovered weight"]);
        }
    });

    // Transformer l'objet en tableau pour le graphique
    const data = Object.entries(massByType).map(([type, mass]) => ({
        type,
        mass,
    }));

    return (
        <Card>
            <CardHeader>
                <h3>Total Mass by Type (StoneIron & Iron)</h3>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis label={{ value: "Mass (grams)", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mass" name="Total Mass (g)" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
