import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function TechnicalArtifact({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = rotation[1] + time * 0.15;
    meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#c8a26a"
          wireframe
          transparent
          opacity={0.15}
          emissive="#c8a26a"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function PointCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(1500 * 3);
    const cols = new Float32Array(1500 * 3);
    const colorGold = new THREE.Color('#c8a26a');
    const colorWhite = new THREE.Color('#f2ede4');

    for (let i = 0; i < 1500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;

      const mixedColor = Math.random() > 0.8 ? colorGold : colorWhite;
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function BackgroundScene() {
  return (
    <>
      <color attach="background" args={['#0a0a0b']} />
      <fog attach="fog" args={['#0a0a0b', 5, 25]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#c8a26a" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#f2ede4" />
      
      <TechnicalArtifact position={[-6, 2, -5]} scale={1.2} />
      <TechnicalArtifact position={[8, -4, -8]} scale={2.5} rotation={[0.5, 0.5, 0]} />
      <TechnicalArtifact position={[2, 6, -12]} scale={4} rotation={[0, 1, 0.5]} />
      
      <PointCloud />
      
      <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <BackgroundScene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}