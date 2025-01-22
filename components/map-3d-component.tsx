"use client";
import React from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei"; // Pour manipuler la caméra
import { meteorite } from "@/lib/interfaces/meteorite-interface";

const DynamicCanvas  = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });
const radius = 2


export default function Map3dComponent({ meteorites }: { meteorites: meteorite[] }) {

    const latLngToXYZ = (lat: number, lng: number) => {
        const phi = (lat * Math.PI) / 180; // Convertir latitude en radians
        const theta = (lng * Math.PI) / 180; // Convertir longitude en radians

        const x = radius * Math.cos(phi) * Math.sin(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.cos(theta);

        return { x, y, z };
    };


    return (
        <div className="w-full h-screen">
            <DynamicCanvas
                shadows
                camera={{
                    position: [0, 0, 5], // Position de la caméra
                }}
                className="bg-black"
            >
                {/* Lumières pour l'éclairage */}
                <ambientLight intensity={0.8}/>
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow/>

                {/* Globe terrestre */}
                <mesh>
                    <sphereGeometry args={[radius, 64, 64]}/>
                    <meshStandardMaterial
                        map={new THREE.TextureLoader().load("/textures/map.jpg")}
                    />
                </mesh>

                {meteorites.map((meteorite: meteorite, index: number) => {
                    if (!meteorite.latitude || !meteorite.longitude) return null;

                    const { x, y, z } = latLngToXYZ(meteorite.latitude, meteorite.longitude);
                    return (
                        <mesh key={meteorite.id} position={[x, y, z]}>
                            {/* Sphere pour représenter la donnée, invisible */}
                            <sphereGeometry args={[0.02, 16, 16]}/>
                            <meshBasicMaterial color="red" visible={true}/>
                        </mesh>
                    );
                })}

                {/* Contrôles de caméra */}
                <OrbitControls enableZoom={true}/>
            </DynamicCanvas>
        </div>
    );
}
