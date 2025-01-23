import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { meteorite } from "@/lib/interfaces/meteorite-interface"; // Exemple ShadUI, à ajuster selon vos composants

export default function GraphYearByMass({ meteorites }: { meteorites: meteorite[] }) {
    // Regrouper la masse des météorites par année en kilogrammes
    const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
        if (meteorite.year && meteorite.weight) {
            const year = meteorite.year.toString();
            acc[year] = (acc[year] || 0) + meteorite.weight / 1000; // Conversion en kilogrammes
        }
        return acc;
    }, {});

    // Transformer les données pour les utiliser avec Recharts
    const chartData = Object.entries(data)
        .map(([year, totalMass]) => ({ year: parseInt(year), totalMass: Math.round(totalMass) })) // Arrondir à l'entier le plus proche
        .sort((a, b) => a.year - b.year); // Trier les années dans l'ordre chronologique

    return (
        <Card>
            <CardHeader>
                <h3>Masse cumulée des météorites par année (en kilogrammes)</h3>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
                        <YAxis
                            label={{ value: "Masse cumulée (kg)", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `${value.toLocaleString()} kg`} // Format des ticks
                        />
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} kg`} />
                        <Bar dataKey="totalMass" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
