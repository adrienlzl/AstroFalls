import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Meteorite} from "@/lib/interfaces/meteorite-interface";


export default function GraphYearByMass({ meteorites }: { meteorites: Meteorite[] }) {
    // Fonction pour convertir les poids en kilogrammes
    const parseWeight = (weight: string | null): number => {
        if (!weight) return 0;
        const weightInKg = weight.toLowerCase().includes("kg")
            ? parseFloat(weight.replace(/[^0-9.]/g, ""))
            : parseFloat(weight.replace(/[^0-9.]/g, "")) / 1000;
        return isNaN(weightInKg) ? 0 : weightInKg;
    };

    // Regrouper la masse des météorites par année
    const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
        if (meteorite.Year && meteorite["Recovered weight"]) {
            const year = meteorite.Year.toString();
            const weightInKg = parseWeight(meteorite["Recovered weight"]);
            acc[year] = (acc[year] || 0) + weightInKg;
        }
        return acc;
    }, {});

    console.log("Data regrouped by year:", data);

    // Transformer les données pour les utiliser avec Recharts
    const chartData = Object.entries(data)
        .map(([year, totalMass]) => ({
            year: parseInt(year),
            totalMass: totalMass / 1000, // Convertir en tonnes pour l'affichage
        }))
        .sort((a, b) => a.year - b.year); // Trier les années dans l'ordre chronologique

    return (
        <Card>
            <CardHeader>
                <h3>Masse cumulée des météorites par année (en tonnes)</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
                        <YAxis
                            scale="log"
                            domain={[1, 'auto']}
                            className="mx-6"
                            label={{ value: "Masse cumulée (t)", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `${value.toLocaleString()} t`} // Format des ticks en tonnes
                        />
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} t`} />
                        <Bar dataKey="totalMass" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
