import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Cloud } from '@react-three/drei';

// Componente de nubes memoizado para evitar re-renders y parpadeos
const StaticClouds = React.memo(() => (
  <Cloud
    position={[0, -5, -5]} // Restaurando posición visible
    seed={1}
    opacity={0.8} // Aumentando opacidad para volumen
    speed={0.1} // Movimiento sutil pero visible
    width={25}
    depth={2}
    segments={30}
    color="#c4c4c4" // Gris plateado para contrastar con el fondo claro
  />
));

/**
 * Componente de pieza médica 3D procedural
 * Con animación de flotación suave y rotación elegante
 */
const MedicalConnector = forwardRef(({ customPosition = { x: 0, y: 0, z: 0 }, customRotation = { x: 0, y: 0, z: 0 }, customScale = 1 }, ref) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useImperativeHandle(ref, () => groupRef.current);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      const floatAmplitude = 0.15;
      const floatSpeed = 0.8;
      const floatY = Math.sin(time * floatSpeed) * floatAmplitude;

      const rotateSpeed = 0.3;
      const continuousRotationY = time * rotateSpeed;

      const baseRotationX = Math.PI / 2 + customRotation.x;
      const rotationZ = customRotation.z;

      groupRef.current.rotation.x = baseRotationX;
      groupRef.current.rotation.y = continuousRotationY + customRotation.y;
      groupRef.current.rotation.z = rotationZ;

      groupRef.current.position.x = customPosition.x;
      groupRef.current.position.y = customPosition.y + floatY;
      groupRef.current.position.z = customPosition.z;

      const breathScale = 1 + Math.sin(time * 0.5) * 0.02;
      const scale = customScale * breathScale;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, -1.2 + i * 0.3, 0]} castShadow>
          <torusGeometry args={[0.82, 0.05, 16, 32]} />
          <meshStandardMaterial color="#808080" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}

      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.8, 0.6, 32]} />
        <meshStandardMaterial color="#808080" metalness={0.95} roughness={0.15} />
      </mesh>

      <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.4, 32]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.3} />
      </mesh>

      <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.6, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, -1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.9, 0.5, 32]} />
        <meshStandardMaterial color="#808080" metalness={0.95} roughness={0.15} />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.75, 0.08, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
});

MedicalConnector.displayName = 'MedicalConnector';

/**
 * Componente principal del modelo 3D
 */
export default function MedicalPartModel({ scrollProgress = 0 }) {
  const [error, setError] = useState(null);

  const customPosition = { x: -0.30, y: 0, z: 0 };
  const customRotation = { x: -1.45, y: 0, z: -0.49 };
  const customScale = 0.80;

  const handleCreated = ({ gl }) => {
    try {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (err) {
      console.error('Error initializing WebGL:', err);
      setError('No se pudo inicializar el modelo 3D');
    }
  };

  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '12px',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        {error}
      </div>
    );
  }

  return (
    <Canvas
      shadows
      onCreated={handleCreated}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

      {/* ☁️ EFECTO DE NUBES VOLUMÉTRICAS ESTÁTICAS */}
      <StaticClouds />

      {/* 🌫️ NEBLINA DE FONDO (Fog más cercano para ocultar cortes) */}
      <fog attach="fog" args={['#f5f5f5', 1, 25]} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-10, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} />

      <MedicalConnector
        customPosition={customPosition}
        customRotation={customRotation}
        customScale={customScale}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />

      <Environment preset="studio" />
    </Canvas>
  );
}
