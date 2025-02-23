"use client";
import 'ol/ol.css';
import React, {useEffect, useState} from "react";
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

import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";
import { Meteorite, MeteoriteType } from "@/lib/interfaces/meteorite-interface";


type MeteoriteTypeKey = MeteoriteType | "null";


export default function Map2D({ meteorites }: { meteorites: Meteorite[] }) {
	// Get generic colors
	const { colorMeteoriteType } = useGenericColorsHook();

	const meteoriteTypes: MeteoriteTypeKey[] = ["Stone", "Iron", "Stony-Iron", "null"];

	const [selectedTypes, setSelectedTypes] = useState<Set<MeteoriteTypeKey>>(
		new Set(meteoriteTypes)
	);

	const [activeLayer, setActiveLayer] = useState<string>('normal');

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
							fill: new Fill({ color: colorMeteoriteType[typeKey] })
						})
					})
				);

				vectorSource.addFeature(feature);
			}
		});

		const vectorLayer = new VectorLayer({
			source: vectorSource
		});

		// Normal view
		const normalLayer = new TileLayer({
      source: new OSM()
    });

		// Satellite view
		const satelliteLayer = new TileLayer({
			source: new OSM({
				url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
			})
		});

		// Relief view
		const reliefLayer = new TileLayer({
			source: new OSM({
				url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"
			})
		});

		const map = new Map({
			target: "map",
			layers: [
				normalLayer,
				satelliteLayer,
				reliefLayer,
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

		const toggleLayers = () => {
			if (activeLayer === 'normal') {
        normalLayer.setVisible(true);
        satelliteLayer.setVisible(false);
        reliefLayer.setVisible(false);
      }
			else if (activeLayer === 'satellite') {
        normalLayer.setVisible(false);
        satelliteLayer.setVisible(true);
        reliefLayer.setVisible(false);
      }
			else {
        normalLayer.setVisible(false);
        satelliteLayer.setVisible(false);
        reliefLayer.setVisible(true);
      }
		};

		toggleLayers();

		return () => {
			if (map) {
				map.setTarget(undefined);
			}
		};
	}, [meteorites, selectedTypes, colorMeteoriteType, activeLayer]);

	return (
		<div id="map-container">
			<div id="map"></div>
			<div id="checkbox-wrapper">
				<div id="checkbox-container">
					{ meteoriteTypes.map((type) => (
						<div key={ type } id="checkbox-div">
							<Checkbox
								id={ `checkbox-${type}` }
								checked={ selectedTypes.has(type) }
								onCheckedChange={() => toggleType(type) }
								style={{ accentColor: colorMeteoriteType[type] }} />
							<label
								htmlFor={ `checkbox-${type}` }
								style={{ color: colorMeteoriteType[type] }} >
								{ type === "null" ? "Sans Type" : type }
							</label>
						</div>
					))}
				</div>
			</div>
			<div id="layer-control-buttons">
				<button onClick={ () => setActiveLayer('normal') }
								className={ activeLayer === 'normal' ? 'active' : '' } >
          Normal
        </button>
				<button onClick={ () => setActiveLayer('relief') }
								className={ activeLayer === 'relief' ? 'active' : '' } >
					Relief
				</button>
				<button onClick={ () => setActiveLayer('satellite') }
								className={ activeLayer === 'satellite' ? 'active' : '' } >
					Satellite
				</button>
			</div>
		</div>
	);
}
