"use client";

import { useState } from "react";
import Map3dComponent from "@/components/map-3d-component";
import TimelapsComponent from "@/components/timelaps-component";
import {meteorite} from "@/lib/interfaces/meteorite-interface";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {DataTable} from "@/components/data-table-all-component/data-table-meteorie-component";
import {columns} from "@/components/data-table-all-component/colums-meteorite";



export default function MenuBarComponent({data} : {data : meteorite[]}) {
    const [selectedMenu, setSelectedMenu] = useState("tableau");



    const renderContent = () => {
        switch (selectedMenu) {
            case "tableau":
                return <DataTable<meteorite> columns={columns} data={data} />;
            case "carte":
                return <Map3dComponent meteorites={data}/>;
            case "timelapse":
                return <TimelapsComponent />;
            case "masse":
                return <Mass />;
            default:
                return <div>Sélectionne un menu pour voir le contenu.</div>;
        }
    };

    return (
        <div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("tableau")}>
                        Tableau de données
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("carte")}>
                        Carte 3D
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("timelapse")}>
                        Timelapse
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => setSelectedMenu("masse")}>
                        Masse
                    </MenubarTrigger>
                </MenubarMenu>
            </Menubar>

            <div className="mt-4">{renderContent()}</div>
        </div>
    );
}
