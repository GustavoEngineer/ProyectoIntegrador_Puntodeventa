import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, Edges } from '@react-three/drei';

function HexagonMesh() {
    const mesh = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.y += delta * 0.6; // Rotate on Y axis
        mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2; // Slight tilt
    });

    return (
        <mesh ref={mesh}>
            {/* Cylinder with 6 segments creates a hexagon prism */}
            {/* args: [radiusTop, radiusBottom, height, radialSegments] */}
            <cylinderGeometry args={[1.5, 1.5, 0.4, 6]} />
            <meshPhysicalMaterial
                color="#111827" // Dark gray/black
                metalness={0.6}
                roughness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
            />
            <Edges color="white" threshold={15} />
        </mesh>
    );
}

export default function HexagonLogo() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Center>
                    <HexagonMesh />
                </Center>
            </Float>

            <Environment preset="city" />
        </Canvas>
    );
}
