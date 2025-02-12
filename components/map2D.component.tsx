"use client";

import React, {useEffect, useMemo, useState} from "react";
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
import { Checkbox } from "@/components/ui/checkbox"; // Adaptation selon votre implémentation de ShadUI

import { Meteorite, MeteoriteType } from "@/lib/interfaces/meteorite-interface";

// Nous utilisons "null" pour représenter les météorites dont le champ Type est null.
type MeteoriteTypeKey = MeteoriteType | "null";

export default function Map2D({ meteorites }: { meteorites: Meteorite[] }) {
    // Définition des couleurs pour chaque type
    const meteoriteTypeColors: Record<MeteoriteTypeKey, string> = useMemo(() => ({
        Stone: "#1f77b4",       // bleu
        Iron: "#ff7f0e",        // orange
        "Stony-Iron": "#2ca02c", // vert
        "null": "#000000",      // noir pour les météorites sans type
    }), []);

    // Tableau des types à afficher dans les cases (checkbox)
    const meteoriteTypes: MeteoriteTypeKey[] = ["Stone", "Iron", "Stony-Iron", "null"];

    // État qui garde en mémoire les types actuellement sélectionnés (tous cochés par défaut)
    const [selectedTypes, setSelectedTypes] = useState<Set<MeteoriteTypeKey>>(
        new Set(meteoriteTypes)
    );

    // Fonction de basculement d'une case
    const toggleType = (type: MeteoriteTypeKey) => {
        setSelectedTypes((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    useEffect(() => {
        // Filtrer les météorites selon les types cochés
        const filteredMeteorites = meteorites.filter((meteorite) => {
            const typeKey: MeteoriteTypeKey = meteorite.Type ? meteorite.Type : "null";
            return selectedTypes.has(typeKey);
        });

        // Création d'une source vectorielle pour les features à afficher sur la carte
        const vectorSource = new VectorSource();

        filteredMeteorites.forEach((meteorite) => {
            if (meteorite.latitude && meteorite.longitude) {
                const typeKey: MeteoriteTypeKey = meteorite.Type ? meteorite.Type : "null";
                const feature = new Feature({
                    geometry: new Point(fromLonLat([meteorite.longitude, meteorite.latitude])),
                });

                // Application du style avec la couleur associée au type
                feature.setStyle(
                    new Style({
                        image: new CircleStyle({
                            radius: 5,
                            fill: new Fill({ color: meteoriteTypeColors[typeKey] }),
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

        // Création de la carte avec une couche de fond OSM et la couche vectorielle
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                projection: "EPSG:3857",
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
            controls: defaultControls(),
        });

        // Nettoyage lors du démontage ou du re-rendu
        return () => {
            map.setTarget(undefined);
        };
    }, [meteorites, selectedTypes, meteoriteTypeColors]);

    return (
        <div>
            {/* Zone des cases de sélection */}
            <div className="flex justify-center items-center gap-4 p-4">
                {meteoriteTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                        <Checkbox
                            id={`checkbox-${type}`}
                            // La case est cochée si le type est présent dans le Set
                            checked={selectedTypes.has(type)}
                            // Au clic, basculement de l'état
                            onCheckedChange={() => toggleType(type)}
                            className="w-4 h-4"
                            // La propriété accentColor permet de colorer la case (si supportée par votre composant)
                            style={{ accentColor: meteoriteTypeColors[type] }}
                        />
                        <label
                            htmlFor={`checkbox-${type}`}
                            style={{ color: meteoriteTypeColors[type] }}
                        >
                            {type === "null" ? "Sans type" : type}
                        </label>
                    </div>
                ))}
            </div>

            {/* Conteneur de la carte */}
            <div id="map" className="w-full h-screen"></div>
        </div>
    );
}
