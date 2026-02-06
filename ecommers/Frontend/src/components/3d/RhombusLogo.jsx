import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, Edges, OrbitControls } from '@react-three/drei';

function RhombusGroup() {
    const group = useRef();

    useFrame((state, delta) => {
        // Rotate the entire group
        group.current.rotation.y -= delta * 0.5;
        group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <group ref={group}>
            {/* 1. Main Rhombus (Solid) */}
            <mesh>
                {/* OctahedronGeometry args: [radius, detail] */}
                <octahedronGeometry args={[1.2, 0]} />
                <meshPhysicalMaterial
                    color="#111827" // Dark gray/black
                    metalness={0.8}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
                {/* White edges for definition */}
                <Edges color="white" threshold={15} />
            </mesh>

            {/* 2. Background "Ghost" Rhombus (Wireframe/Vertices only) */}
            <mesh scale={1.6}>
                <octahedronGeometry args={[1.2, 0]} />
                {/* Transparent material so faces are invisible */}
                <meshBasicMaterial color="white" transparent opacity={0} />
                {/* Only edges are visible */}
                <Edges color="rgba(200,200,200,0.3)" threshold={1} />
            </mesh>
        </group>
    );
}

export default function RhombusLogo() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }} // Moved back slightly to avoid cutting off
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Center>
                    <RhombusGroup />
                </Center>
            </Float>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={false} /* We have manual rotation in useFrame */
            />

            <Environment preset="city" />
        </Canvas>
    );
}
