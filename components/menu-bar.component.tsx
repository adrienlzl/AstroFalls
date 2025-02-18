"use client";
import { useState } from "react";
import AllChartMainComponent from "@/components/all-chart-main.component";
import HomeComponent from "@/components/home.component";
import Map2D from "@/components/map2D.component";
import OverviewDashboard from "@/components/overview-dashboard.composent";

import { columns } from "@/components/data-table-all-component/colums-meteorite";
import { DataTable } from "@/components/data-table-all-component/data-table-meteorite-component";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";


export default function MenuBarComponent({ data }: { data: Meteorite[] }) {
	const [selectedMenu, setSelectedMenu] = useState("home");
	const menuItems = [
		{ key: "home", label: "Accueil" },
		{ key: "tableau", label: "Tableau" },
		{ key: "carte", label: "Carte" },
		{ key: "graphique", label: "Graphique" },
		{ key: "data", label: "KPI" },
	];

	const renderContent = () => {
		switch (selectedMenu) {
			case "home" :
				return <HomeComponent  />;
			case "tableau":
				return <DataTable<Meteorite, unknown> columns={columns} data={data} />;
			case "carte":
				return <Map2D meteorites={data} />;
			case "graphique":
				return <AllChartMainComponent meteorites={data} />;
			case "data":
				return <OverviewDashboard meteorites={data}/>
			default:
				return <div>Sélectionnez un menu pour voir le contenu.</div>;
		}
	};

	return (
		<>
			<header>
				<nav>
					{menuItems.map((item) => (
						<button
							key={item.key}
							onClick={() => setSelectedMenu(item.key)}
							className={`nav-button ${
								selectedMenu === item.key ? "active" : ""
							}`}>
							{item.label}
						</button>
					))}
				</nav>
			</header>
			<main>{renderContent()}</main>
		</>
	);
}
