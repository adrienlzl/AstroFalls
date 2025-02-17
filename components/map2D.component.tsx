"use client";
import 'ol/ol.css';
import React, {useEffect, useMemo, useState} from "react";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import View from "ol/View";

import { Checkbox } from "@/components/ui/checkbox";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { Style, Circle as CircleStyle, Fill } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

import { Meteorite, MeteoriteType } from "@/lib/interfaces/meteorite-interface";


type MeteoriteTypeKey = MeteoriteType | "null";


export default function Map2D({ meteorites }: { meteorites: Meteorite[] }) {
	const meteoriteTypeColors: Record<MeteoriteTypeKey, string> = useMemo(() => ({
		Stone: "#1f77b4",
		Iron: "#ff7f0e",
		"Stony-Iron": "#2ca02c",
		"null": "#000000"
	}), []);

	const meteoriteTypes: MeteoriteTypeKey[] = ["Stone", "Iron", "Stony-Iron", "null"];

	const [selectedTypes, setSelectedTypes] = useState<Set<MeteoriteTypeKey>>(
		new Set(meteoriteTypes)
	);

	const toggleType = (type: MeteoriteTypeKey) => {
		setSelectedTypes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(type)) {
				newSet.delete(type);
			}
			else {
				newSet.add(type);
			}
			return newSet;
		});
	};

	useEffect(() => {
		const mapElement = document.getElementById("map");
    if (!mapElement) return;

		const filteredMeteorites = meteorites.filter((meteorite) => {
			const typeKey: MeteoriteTypeKey = meteorite.Type ? meteorite.Type : "null";
			return selectedTypes.has(typeKey);
		});

		const vectorSource = new VectorSource();

		filteredMeteorites.forEach((meteorite) => {
			if (meteorite.latitude && meteorite.longitude) {
				const typeKey: MeteoriteTypeKey = meteorite.Type ? meteorite.Type : "null";
				const feature = new Feature({
					geometry: new Point(fromLonLat([meteorite.longitude, meteorite.latitude])),
					properties: {
            name: meteorite.Name,
            type: meteorite.Type,
            mass: meteorite.wg
          }
				});

				feature.setStyle(
					new Style({
						image: new CircleStyle({
							radius: 5,
							fill: new Fill({ color: meteoriteTypeColors[typeKey] })
						}),
					})
				);

				vectorSource.addFeature(feature);
			}
		});

		const vectorLayer = new VectorLayer({
			source: vectorSource,
		});

		const map = new Map({
			target: "map",
			layers: [
				new TileLayer({
					source: new OSM()
				}),
				vectorLayer
			],
			view: new View({
				projection: "EPSG:3857",
				center: fromLonLat([0, 0]),
				zoom: 2,
				maxZoom: 18,
        minZoom: 2,
				extent: undefined,
				constrainRotation: false,
				showFullExtent: true
			}),
			controls: defaultControls()
		});

		return () => {
			if (map) {
				map.setTarget(undefined);
			}
		};
	}, [meteorites, selectedTypes, meteoriteTypeColors]);

	return (
		<div id="map-wrapper">
			<div id="map"></div>
			<div id="checkbox-wrapper">
				<div id="checkbox-container">
					{meteoriteTypes.map((type) => (
						<div key={type} id="checkbox-div">
							<Checkbox
								id={`checkbox-${type}`}
								checked={selectedTypes.has(type)}
								onCheckedChange={() => toggleType(type)}
								style={{ accentColor: meteoriteTypeColors[type] }}/>
							<label
								htmlFor={`checkbox-${type}`}
								style={{ color: meteoriteTypeColors[type] }}>
								{type === "null" ? "Sans type" : type}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
