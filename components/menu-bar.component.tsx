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
		{ key: "tableau", label: "Tableau de données" },
		{ key: "carte", label: "Carte" },
		{ key: "graphique", label: "Graphique" },
		{ key: "data", label: "Données clés" },
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
		<div>
			<nav className="py-8 flex justify-center items-center space-x-4">
				{menuItems.map((item) => (
					<button
						key={item.key}
						onClick={() => setSelectedMenu(item.key)}
						className={`px-4 py-2 rounded-md transition-colors ${
							selectedMenu === item.key
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}>
						{item.label}
					</button>
				))}
			</nav>
			<div className="mt-12 mx-16">{renderContent()}</div>
		</div>
	);
}
