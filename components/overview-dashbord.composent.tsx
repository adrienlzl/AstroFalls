import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";


export default function OverviewDashboard({
  meteorites,
}: {
  meteorites: Meteorite[];
}) {
	const parseWeight = (weight: string | null): number => {
		if (!weight) return 0;
		return parseFloat(weight);
	};

	const formatMass = (massInKg: number): string => {
		return massInKg.toFixed(2) + " kg";
	};

	/* ========= 1. Année avec le plus de météorites (en nombre) ========= */
	const yearCounts: Record<string, number> = {};
	meteorites.forEach((m) => {
		if (m.Year != null) {
			const year = String(m.Year).trim();
			yearCounts[year] = (yearCounts[year] || 0) + 1;
		}
	});
	let yearMaxCount = "";
	let maxCount = 0;
	Object.entries(yearCounts).forEach(([year, count]) => {
		if (count > maxCount) {
			maxCount = count;
			yearMaxCount = year;
		}
	});

	/* ========= 2. Année avec la plus grande masse totale ========= */
	const yearMass: Record<string, number> = {};
	meteorites.forEach((m) => {
		if (m.Year != null) {
			const year = String(m.Year).trim();
			const weight = parseWeight(m["Recovered weight"]);
			yearMass[year] = (yearMass[year] || 0) + weight;
		}
	});
	let yearMaxMass = "";
	let maxMass = 0;
	Object.entries(yearMass).forEach(([year, mass]) => {
		if (mass > maxMass) {
			maxMass = mass;
			yearMaxMass = year;
		}
	});

	/* ========= 3. La plus grosse météorite ========= */
	let biggestMeteorite: Meteorite | null = null;
	let biggestWeight = 0;
	meteorites.forEach((m) => {
		const weight = parseWeight(m["Recovered weight"]);
		if (weight > biggestWeight) {
			biggestWeight = weight;
			biggestMeteorite = m;
		}
	});

	/* ========= 4. Pays avec le plus de météorites + masse totale ========= */
	const countryStats: Record<string, { count: number; totalMass: number }> = {};
	meteorites.forEach((m) => {
		const country = m.Country?.trim();
		if (country) {
			if (!countryStats[country]) {
				countryStats[country] = { count: 0, totalMass: 0 };
			}
			countryStats[country].count += 1;
			countryStats[country].totalMass += parseWeight(m["Recovered weight"]);
		}
	});
	let countryMost = "";
	let countryMostCount = 0;
	let countryMostMass = 0;
	Object.entries(countryStats).forEach(([country, stats]) => {
		if (stats.count > countryMostCount) {
			countryMostCount = stats.count;
			countryMostMass = stats.totalMass;
			countryMost = country;
		}
	});

	/* ========= 5. Statistiques pour la France ========= */
	const franceStats = countryStats["France"] || null;

	/* ========= 6. Type de météorite le plus fréquent + masse totale ========= */
	const typeStats: Record<string, { count: number; totalMass: number }> = {};
	meteorites.forEach((m) => {
		const type = m.Type?.trim();
		if (type) {
			if (!typeStats[type]) {
				typeStats[type] = { count: 0, totalMass: 0 };
			}
			typeStats[type].count += 1;
			typeStats[type].totalMass += parseWeight(m["Recovered weight"]);
		}
	});
	let mostCommonType = "";
	let typeMostCount = 0;
	let typeMostMass = 0;
	Object.entries(typeStats).forEach(([type, stats]) => {
		if (stats.count > typeMostCount) {
			typeMostCount = stats.count;
			typeMostMass = stats.totalMass;
			mostCommonType = type;
		}
	});

	/* ========= 7. Détails par type de météorite ========= */
	// Pour chaque type, on affichera le nom, le nombre total et la masse totale en kg.
	/* ========= 8. Nombre de météorites "Find" vs celles qui ne le sont pas ========= */
	let findCount = 0;
	let notFindCount = 0;
	meteorites.forEach((m) => {
		if (m.ff === "Find") {
			findCount++;
		}
		else {
			notFindCount++;
		}
	});

	/* ========= 9. Nombre total de météorites ========= */
	const totalMeteorites = meteorites.length;

	/* ========= 10. Masse totale de toutes les météorites ========= */
	let totalMassAll = 0;
	meteorites.forEach((m) => {
		totalMassAll += parseWeight(m["Recovered weight"]);
	});

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold">Tableau de bord des météorites</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<h3>Année avec le plus de météorites</h3>
					</CardHeader>
					<CardContent>
						<p>{yearMaxCount} ({maxCount} météorites)</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Année avec la plus grande masse totale</h3>
					</CardHeader>
					<CardContent>
							<p>{yearMaxMass} (Masse totale : {formatMass(maxMass)})</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>La plus grosse météorite</h3>
					</CardHeader>
					<CardContent>
						{biggestMeteorite ? (
							<>
							<p>Nom : {biggestMeteorite["Name"]}</p>
							<p>Poids : {biggestMeteorite["Recovered weight"]}</p>
							<p>Pays : {biggestMeteorite["Country"]}</p>
							<p>Année : {String(biggestMeteorite["Year"]).trim()}</p>
							</>
						) : (
							<p>Aucune donnée disponible</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Pays avec le plus de météorites</h3>
					</CardHeader>
					<CardContent>
						<p>{countryMost}</p>
						<p>
							{countryMostCount} météorites, Masse totale :{" "}
							{formatMass(countryMostMass)}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Statistiques pour la France</h3>
					</CardHeader>
					<CardContent>
						{franceStats ? (
							<>
							<p>{franceStats.count} météorites</p>
							<p>Masse totale : {formatMass(franceStats.totalMass)}</p>
							</>
						) : (
							<p>Aucune donnée pour la France</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Type de météorite le plus fréquent</h3>
					</CardHeader>
					<CardContent>
						<p>{mostCommonType}</p>
						<p>
							{typeMostCount} météorites, Masse totale :{" "}
							{formatMass(typeMostMass)}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Types de météorites</h3>
					</CardHeader>
					<CardContent>
						{Object.entries(typeStats).map(([type, stats]) => (
							<div key={type} className="mb-2">
								<p>
									<strong>{type}</strong> - Nb : {stats.count}, Masse totale :{" "}
									{formatMass(stats.totalMass)}
								</p>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Météorites trouvées vs non trouvées</h3>
					</CardHeader>
					<CardContent>
						<p>Trouvées : {findCount}</p>
						<p>Non trouvées : {notFindCount}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Nombre total de météorites</h3>
					</CardHeader>
					<CardContent>
						<p>{totalMeteorites}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h3>Masse totale des météorites</h3>
					</CardHeader>
					<CardContent>
						<p>{formatMass(totalMassAll)}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
