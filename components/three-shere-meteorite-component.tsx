"use client";

import React from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { meteorite } from "@/lib/interfaces/meteorite-interface";

const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export default function ThreeShereMeteoriteComponent({ meteorites }: { meteorites: meteorite[] }) {
    // Calcul des valeurs max, min et moyenne des masses
    const masses = meteorites.map((m) => m.weight).filter((mass) => mass !== null && mass !== undefined) as number[];
    const maxMass = Math.max(...masses);
    const minMass = Math.min(...masses);
    const avgMass = masses.reduce((sum, mass) => sum + mass, 0) / masses.length;

    // Normaliser les tailles et définir un seuil minimum
    const scaleFactor = 10000; // Ajustez cette valeur pour réduire ou augmenter les tailles
    const minSize = 0.2; // Taille minimale pour rendre toutes les sphères visibles
    const maxSphereSize = Math.max(maxMass / scaleFactor, minSize);
    const minSphereSize = Math.max(minMass / scaleFactor, minSize);
    const avgSphereSize = Math.max(avgMass / scaleFactor, minSize);

    return (
        <div className="w-full h-screen">
            <DynamicCanvas
                shadows
                camera={{
                    position: [0, 0, 15],
                }}
                className="bg-black"
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />

                {/* Sphère représentant la masse maximale */}
                <mesh position={[-6, 0, 0]}>
                    <sphereGeometry args={[maxSphereSize, 32, 32]} />
                    <meshStandardMaterial color="red" />
                </mesh>

                {/* Sphère représentant la masse minimale */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[minSphereSize, 32, 32]} />
                    <meshStandardMaterial color="green" />
                </mesh>

                {/* Sphère représentant la masse moyenne */}
                <mesh position={[6, 0, 0]}>
                    <sphereGeometry args={[avgSphereSize, 32, 32]} />
                    <meshStandardMaterial color="blue" />
                </mesh>

                <OrbitControls enableZoom={true} />
            </DynamicCanvas>
        </div>
    );
}
