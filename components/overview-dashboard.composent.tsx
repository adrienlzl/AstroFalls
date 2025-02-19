import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils/capitalize-words";
import { getCountryNameInFrench } from '@/lib/utils/translate-country-in-french';
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
		if (massInKg >= 1000) {
			const massInTonnes = massInKg / 1000;
			return massInTonnes.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " t";
		}
		else {
			return massInKg.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kg";
		}
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
	let formattedWeight: string;
	if (biggestWeight >= 1000) {
		const weightInTonnes = biggestWeight / 1000;
		formattedWeight = weightInTonnes % 1 === 0
    ? weightInTonnes.toLocaleString("fr-FR") + " t"
    : weightInTonnes.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " t";
	}
	else {
		formattedWeight = biggestWeight.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kg";
	}

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
		const type = m.Type?.trim().toLowerCase();
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
		<div id="kpi">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Année record</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>{ yearMaxCount }</p>
						<p>{ maxCount.toLocaleString("fr-FR") } chutes</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Année record (t)</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
							<p>{ yearMaxMass }</p>
							<p>Masse cumulée: { formatMass(maxMass) }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Chutes enregistrées</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>Total cumulé: </p>
						<p>{ totalMeteorites.toLocaleString("fr-FR") }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>La plus massive</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						{ biggestMeteorite &&
							<>
							<p>{ biggestMeteorite["Name"] }</p>
							<p>{ formattedWeight }</p>
							<p>{getCountryNameInFrench(biggestMeteorite["Country"])} en {String(biggestMeteorite["Year"]).trim()}</p>
							</> }
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Pays le plus impacté</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>{ getCountryNameInFrench(countryMost) }</p>
						<p>{ countryMostCount.toLocaleString("fr-FR") } impacts</p>
						<p>Masse cumulée: { formatMass(countryMostMass) }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Type dominant</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>{ mostCommonType }</p>
						<p>{ typeMostCount.toLocaleString("fr-FR") } météorites</p>
						<p>Masse cumulée: { formatMass(typeMostMass) }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Découvertes</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>Oui: { findCount.toLocaleString("fr-FR") }</p>
						<p>Non: { notFindCount.toLocaleString("fr-FR") }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Masse totale</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						<p>Cumul: { formatMass(totalMassAll) }</p>
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Stats France</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						{franceStats &&
							<>
							<p>{ franceStats.count } chutes</p>
							<p>Masse cumulée: { formatMass(franceStats.totalMass) }</p>
							</> }
					</CardContent>
				</Card>

				<Card id="kpi-card">
					<CardHeader id="kpi-card-header">
						<h3>Types de météorites</h3>
					</CardHeader>
					<CardContent id="kpi-card-content">
						{Object.entries(typeStats).map(([type, stats]) => (
							<div key={ type } className="mb-2">
								<p><strong>{ capitalizeWords(type) }</strong></p>
								<p>Chutes: { stats.count }</p>
								<p>Masse cumulée: { formatMass(stats.totalMass) }</p>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
