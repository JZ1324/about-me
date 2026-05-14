import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function SoftOrb({
  position,
  scale,
  color,
  speed = 0.1,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * speed + position[0]) * 0.14;
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.08;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.68}
        metalness={0.08}
        transmission={0.38}
        transparent
        opacity={0.24}
      />
    </mesh>
  );
}

function BackgroundScene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.03) * 0.08;
    group.current.rotation.x = Math.sin(time * 0.02) * 0.04;
  });

  const specks = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => ({
        position: [
          (Math.random() - 0.5) * 26,
          (Math.random() - 0.5) * 16,
          -6 - Math.random() * 16,
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.08,
        color: index % 4 === 0 ? '#c8a26a' : '#f2ede4',
      })),
    [],
  );

  return (
    <group ref={group}>
      <fog attach="fog" args={['#09090a', 8, 24]} />
      <ambientLight intensity={0.32} color="#c8a26a" />
      <directionalLight position={[2, 4, 5]} intensity={1.15} color="#f2ede4" />
      <pointLight position={[-4, 2, 6]} intensity={1.4} color="#c8a26a" distance={18} />
      <pointLight position={[3, -2, 8]} intensity={0.75} color="#8d6d4d" distance={22} />
      <mesh position={[0, -4.5, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshBasicMaterial color="#060607" transparent opacity={0.42} />
      </mesh>
      <SoftOrb position={[-3.8, 0.5, -5]} scale={1.7} color="#c8a26a" speed={0.09} />
      <SoftOrb position={[4, -1, -8]} scale={2.3} color="#f2ede4" speed={0.07} />
      <SoftOrb position={[0.2, 2.3, -12]} scale={3.2} color="#8d6d4d" speed={0.05} />
      {specks.map((speck, index) => (
        <mesh key={index} position={speck.position} scale={speck.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={speck.color} transparent opacity={0.18} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-90">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={35} />
        <BackgroundScene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,10,0.18)_52%,rgba(9,9,10,0.62)_100%)]" />
    </div>
  );
}