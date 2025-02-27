import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils/capitalize-words";
import { getCountryNameInFrench } from '@/lib/utils/translate-country-in-french';
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";


export default function Kpi({
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

	// Get generic colors
	const { colorMeteoriteType } = useGenericColorsHook();

	/* ========= 1. Année record en nombre ========= */
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

	/* ========= 2. Année record en masse ========= */
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

	/* ========= 3. Chutes enregistrées ========= */
	const totalMeteorites = meteorites.length;

	/* ========= 4. La plus massive ========= */
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

	/* ========= 4. Pays le plus impacté ========= */
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

	/* ========= 5. Type dominant ========= */
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

	/* ========= 9. Détails par type de météorite ========= */
	// Pour chaque type, on affichera le nom, le nombre total et la masse totale en kg.
	/* ========= 6. Découvertes ========= */
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

	/* ========= 7. Masse totale ========= */
	let totalMassAll = 0;
	meteorites.forEach((m) => {
		totalMassAll += parseWeight(m["Recovered weight"]);
	});

	/* ========= 8. Statistiques pour la France ========= */
	const franceStats = countryStats["France"] || null;


	return (
		<div id="kpi">
			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Année record</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p>{ yearMaxCount }</p>
					<p>{ maxCount.toLocaleString("fr-FR") } chutes</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Année record (t)</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p>{ yearMaxMass }</p>
					<p className="card-content-text-strong">Masse cumulée :
						<span> { formatMass(maxMass) }</span>
					</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Chutes enregistrées</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p className="card-content-text-strong">Total cumulé : </p>
					<p>{ totalMeteorites.toLocaleString("fr-FR") }</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>La plus massive</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					{ biggestMeteorite &&
						<>
							<p id="more">{ biggestMeteorite["Name"] }</p>
							<p>{ formattedWeight }</p>
							<p>{ getCountryNameInFrench(biggestMeteorite["Country"]) } en { String(biggestMeteorite["Year"]).trim() }</p>
						</>
					}
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Pays le plus impacté</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p id="more">{ getCountryNameInFrench(countryMost) }</p>
					<p>{ countryMostCount.toLocaleString("fr-FR") } impacts</p>
					<p className="card-content-text-strong">Masse cumulée :
						<span> { formatMass(countryMostMass) }</span>
					</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Type dominant</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p>
						<strong style={{ color: colorMeteoriteType[capitalizeWords(mostCommonType)] }}>{ capitalizeWords(mostCommonType) }</strong>
					</p>
					<p>{ typeMostCount.toLocaleString("fr-FR") } météorites</p>
					<p className="card-content-text-strong">Masse cumulée : <span>{ formatMass(typeMostMass) }</span></p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Découvertes</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p className="card-content-text-strong">Oui :
						<span> { findCount.toLocaleString("fr-FR") }</span>
					</p>
					<p className="card-content-text-strong">Non :
						<span> { notFindCount.toLocaleString("fr-FR") }</span>
					</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Masse totale</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					<p className="card-content-text-strong">Cumul :
						<span> { formatMass(totalMassAll) }</span>
					</p>
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Stats France</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					{franceStats &&
						<>
							<p>{ franceStats.count } chutes</p>
							<p className="card-content-text-strong">Masse cumulée :
								<span> { formatMass(franceStats.totalMass) }</span>
							</p>
						</> }
				</CardContent>
			</Card>

			<Card className="kpi-card">
				<CardHeader className="kpi-card-header">
					<h3>Types de météorites</h3>
				</CardHeader>
				<CardContent className="kpi-card-content">
					{Object.entries(typeStats).map(([type, stats]) => (
						<div className="type-meteorite" key={ type }>
							<p>
								<strong style={{ color: colorMeteoriteType[type] }}>{ capitalizeWords(type) }</strong>
							</p>
							<p className="card-content-text-strong">Chutes :
								<span> { stats.count }</span>
							</p>
							<p className="card-content-text-strong">Masse cumulée :
								<span> { formatMass(stats.totalMass) }</span>
							</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
