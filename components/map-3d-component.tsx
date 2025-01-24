"use client";

import React from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import {Meteorite} from "@/lib/interfaces/meteorite-interface";

const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });
const radius = 2;

export default function Map3dComponent({ meteorites }: { meteorites: Meteorite[] }) {

    const latLngToXYZ = (lat: number, lng: number) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = (lng * Math.PI) / 180;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return { x, y, z };
    };

    const franceCoords = latLngToXYZ(45.7640, 4.8357);

    return (
        <div className="w-full h-screen">
            <DynamicCanvas
                shadows
                camera={{
                    position: [0, 0, 5],
                }}
                className="bg-black"
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />

                <mesh>
                    <sphereGeometry args={[radius, 64, 64]} />
                    <meshStandardMaterial
                        map={new THREE.TextureLoader().load("/textures/wolrd_map.tif")}
                    />
                </mesh>

                {/* Point représentant la latitude de la France */}
                <mesh position={[franceCoords.x, franceCoords.y, franceCoords.z]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="blue" />
                </mesh>

                {/* Points des météorites */}
                {meteorites.map((meteorite: Meteorite, index: number) => {
                    if (!meteorite.latitude || !meteorite.longitude) return null;

                    const { x, y, z } = latLngToXYZ(meteorite.latitude, meteorite.longitude);

                    return (
                        <mesh key={meteorite.id} position={[x, y, z]}>
                            {/* Représentation des météorites */}
                            <sphereGeometry args={[0.02, 16, 16]} />
                            <meshBasicMaterial color="red" />
                        </mesh>
                    );
                })}

                <OrbitControls enableZoom={true} />
            </DynamicCanvas>
        </div>
    );
}
