"use client"

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import {meteorite} from "@/lib/interfaces/meteorite-interface";

export default function Map3dComponent({ meteorites }: { meteorites: meteorite[] }) {
    const globeRef = useRef<THREE.Mesh>(null);

    // Convert latitude and longitude to 3D sphere coordinates
    const convertLatLonToSphere = (lat: number, lon: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180); // Convert latitude to radians
        const theta = (lon + 180) * (Math.PI / 180); // Convert longitude to radians

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return { x, y, z };
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas>
                {/* Orbit Controls for 3D Navigation */}
                <OrbitControls />
                {/* Add a light */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} />
                {/* Add the globe */}
                <mesh ref={globeRef}>
                    <sphereGeometry args={[5, 64, 64]} />
                    <meshStandardMaterial
                        color="#1E90FF"
                        wireframe={false}
                        emissive="#00008B"
                        emissiveIntensity={0.1}
                    />
                </mesh>
                {/* Add meteorites */}
                {meteorites.map((meteor, index) => {
                    if (meteor.latitude && meteor.longitude) {
                        const { x, y, z } = convertLatLonToSphere(meteor.latitude, meteor.longitude, 5);
                        return (
                            <mesh key={index} position={[x, y, z]}>
                                <sphereGeometry args={[0.1, 16, 16]} />
                                <meshStandardMaterial color="red" />
                            </mesh>
                        );
                    }
                    return null;
                })}
            </Canvas>
        </div>
    );
}
