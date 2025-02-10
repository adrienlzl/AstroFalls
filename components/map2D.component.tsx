"use client";

import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle as CircleStyle, Fill } from "ol/style";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

type MeteoriteClass = {
    recclass: string;
    count: number;
};

export default function Map2D({ meteorites }) {
    const [selectedClass, setSelectedClass] = useState("all"); // État pour la classe sélectionnée
    const [filteredMeteorites, setFilteredMeteorites] = useState(meteorites); // Météorites filtrées

    useEffect(() => {
        // Filtrer les météorites en fonction de la classe sélectionnée
        if (selectedClass === "all") {
            setFilteredMeteorites(meteorites);
        } else {
            setFilteredMeteorites(
                meteorites.filter((meteorite) => meteorite.recclass === selectedClass)
            );
        }
    }, [selectedClass, meteorites]);

    useEffect(() => {
        // Création d'une source vectorielle pour les points rouges (météorites)
        const vectorSource = new VectorSource();

        // Ajouter chaque météorite comme une feature sur la carte
        filteredMeteorites.forEach((meteorite) => {
            if (meteorite.latitude && meteorite.longitude) {
                const feature = new Feature({
                    geometry: new Point(
                        fromLonLat([meteorite.longitude, meteorite.latitude])
                    ), // Conversion des coordonnées
                });

                // Style des points rouges
                feature.setStyle(
                    new Style({
                        image: new CircleStyle({
                            radius: 5,
                            fill: new Fill({ color: "red" }),
                        }),
                    })
                );

                vectorSource.addFeature(feature);
            }
        });

        // Couche vectorielle pour afficher les points
        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        // Création de la carte
        const map = new Map({
            target: "map",
            layers: [
                // Couche de base (OpenStreetMap)
                new TileLayer({
                    source: new OSM(),
                }),
                // Couche des météorites
                vectorLayer,
            ],
            view: new View({
                projection: "EPSG:3857", // Projection standard pour le globe
                center: fromLonLat([0, 0]), // Centre sur la longitude 0 et latitude 0
                zoom: 2,
            }),
            controls: defaultControls(),
        });

        return () => {
            if (map) {
                map.setTarget(undefined); // Utilise `undefined` au lieu de `null`
            }
        }; // Nettoyage lors du démontage
    }, [filteredMeteorites]);

    // Regrouper les classes de météorites et compter leur longueur
    const classesWithCounts = meteorites.reduce((acc, meteorite) => {
        const { recclass } = meteorite;
        if (recclass) {
            acc[recclass] = (acc[recclass] || 0) + 1;
        }
        return acc;
    }, {});

    // Trier les classes par ordre alphabétique
    const sortedClasses: MeteoriteClass[] = Object.entries(classesWithCounts)
        .map(([recclass, count]) => ({ recclass, count: count as number })) // Type explicite pour `count`
        .sort((a, b) => a.recclass.localeCompare(b.recclass));

    return (
        <div>
            <div className={"flex justify-center items-center"}>
                <Select onValueChange={setSelectedClass} value={selectedClass}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Toutes les classes ({meteorites.length})</SelectItem>
                        {sortedClasses.map(({ recclass, count }) => (
                            <SelectItem key={recclass} value={recclass}>
                                {recclass} ({count})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div id="map" className="w-full h-screen"></div>
        </div>
    );
}