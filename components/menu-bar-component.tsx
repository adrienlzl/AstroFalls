"use client";

import { useState } from "react";
import TimelapsComponent from "@/components/timelaps-component";
import {Meteorite} from "@/lib/interfaces/meteorite-interface";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {DataTable} from "@/components/data-table-all-component/data-table-meteorie-component";
import {columns} from "@/components/data-table-all-component/colums-meteorite";
import Map2D from "@/components/map2D.component";




export default function MenuBarComponent({data} : {data : Meteorite[]}) {
    const [selectedMenu, setSelectedMenu] = useState("tableau");



    const renderContent = () => {
        switch (selectedMenu) {
            case "tableau":
                return <DataTable<Meteorite> columns={columns} data={data} />;
            case "carte":
                return <Map2D meteorites={data}/>;
            case "graphique":
                return <TimelapsComponent meteorites={data}/>;
            case "data":
                return ;
            default:
                return <div>Sélectionne un menu pour voir le contenu.</div>;
        }
    };

    return (
        <div>
            <Menubar className="py-8 flex justify-center items-center">
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("tableau")}>
                        Tableau de données
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("carte")}>
                        Carte
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("graphique")}>
                        Graphique
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("data")}>
                        Données en vrac
                    </MenubarTrigger>
                </MenubarMenu>
            </Menubar>

            <div className="mt-12 mx-16">{renderContent()}</div>
        </div>
    );
}
