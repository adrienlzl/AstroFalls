import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {meteorite} from "@/lib/interfaces/meteorite-interface"; // Exemple ShadUI, à ajuster selon vos composants

export default function GraphYearByLength({ meteorites }: { meteorites: meteorite[] }) {
    // Regrouper les météorites par année
    const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
        if (meteorite.year) {
            const year = meteorite.year.toString();
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {});

    // Transformer les données pour les utiliser avec Recharts
    const chartData = Object.entries(data)
        .map(([year, count]) => ({ year: parseInt(year), count }))
        .sort((a, b) => a.year - b.year); // Trier les années dans l'ordre chronologique

    return (
        <Card>
            <CardHeader>
                <h3>Nombre de météorites par année</h3>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Nombre de météorites", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
