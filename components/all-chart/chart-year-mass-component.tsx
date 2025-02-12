import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";

export default function ChartYearByMass({ meteorites }: { meteorites: Meteorite[] }) {
    // On gère ici le fait que le weight peut être un string ou un number
    const parseWeight = (weight: string | number | null): number => {
        if (weight == null) {
            return 0;
        }

        // Si c’est déjà un nombre, on le retourne tel quel
        if (typeof weight === "number") {
            return weight;
        }

        // Sinon, on parse la chaîne de caractère
        const parsed = parseFloat(weight.replace(/[^0-9.]/g, ""));
        return isNaN(parsed) ? 0 : parsed;
    };

    // Regrouper la masse des météorites par année
    const data = meteorites.reduce((acc: Record<string, number>, meteorite) => {
        if (meteorite.Year && meteorite["Recovered weight"] != null) {
            const year = meteorite.Year.toString();
            const weightInKg = parseWeight(meteorite["Recovered weight"]);
            acc[year] = (acc[year] || 0) + weightInKg;
        }
        return acc;
    }, {});

    // Transformer les données pour Recharts
    // Diviser par 1000 si vous voulez l’affichage en tonnes
    const chartData = Object.entries(data)
        .map(([year, totalMass]) => ({
            year: parseInt(year, 10),
            totalMass: totalMass / 1000, // en tonnes
        }))
        .sort((a, b) => a.year - b.year);

    return (
        <Card>
            <CardHeader>
                <h3>Masse cumulée des météorites par année (en tonnes)</h3>
            </CardHeader>
            <CardContent className="px-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            label={{ value: "Années", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                            scale="log"
                            domain={[1, "auto"]}
                            className="mx-6"
                            label={{ value: "Masse cumulée (t)", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `${value.toLocaleString()} t`}
                        />
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} t`} />
                        <Bar dataKey="totalMass" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
