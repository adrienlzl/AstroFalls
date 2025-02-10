"use client";

import { useState } from "react";
import TimelapsComponent from "@/components/timelaps-component";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { DataTable } from "@/components/data-table-all-component/data-table-meteorie-component";
import { columns } from "@/components/data-table-all-component/colums-meteorite";
import Map2D from "@/components/map2D.component";

export default function MenuBarComponent({ data }: { data: Meteorite[] }) {
    const [selectedMenu, setSelectedMenu] = useState("tableau");

    const menuItems = [
        { key: "tableau", label: "Tableau de données" },
        { key: "carte", label: "Carte" },
        { key: "graphique", label: "Graphique" },
        { key: "data", label: "Données en vrac" },
    ];

    const renderContent = () => {
        switch (selectedMenu) {
            case "tableau":
                return <DataTable<Meteorite> columns={columns} data={data} />;
            case "carte":
                return <Map2D meteorites={data} />;
            case "graphique":
                return <TimelapsComponent meteorites={data} />;
            case "data":
                return <div>Données en vrac</div>;
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
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-12 mx-16">{renderContent()}</div>
        </div>
    );
}
