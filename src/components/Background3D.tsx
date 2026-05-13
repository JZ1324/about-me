import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Sparkles, useTexture, MeshWobbleMaterial } from '@react-three/drei';
import { useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';

const ASSETS = [
  'https://images.unsplash.com/photo-1778017825902-5d212f5ce532?q=80&w=1000&auto=format&fit=crop',
];

// Luxurious Gold Material
const GOLD_COLOR = "#d9b18e";
const BLACK_COLOR = "#723e31";

function ChessPawn({ position, scale = 1, color = GOLD_COLOR }: { position: [number, number, number], scale?: number, color?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.5,
  }), [color]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Base */}
        <mesh position={[0, -0.4, 0]} material={material}>
          <cylinderGeometry args={[0.3, 0.35, 0.1, 32]} />
        </mesh>
        {/* Body */}
        <mesh position={[0, -0.1, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.25, 0.6, 32]} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.25, 0]} material={material}>
          <cylinderGeometry args={[0.15, 0.1, 0.05, 32]} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.45, 0]} material={material}>
          <sphereGeometry args={[0.18, 32, 32]} />
        </mesh>
      </group>
    </Float>
  );
}

function ChessKnight({ position, scale = 1, color = GOLD_COLOR }: { position: [number, number, number], scale?: number, color?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
  }), [color]);

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Base */}
        <mesh position={[0, -0.6, 0]} material={material}>
          <cylinderGeometry args={[0.4, 0.45, 0.15, 32]} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0, 0]} material={material}>
          <cylinderGeometry args={[0.2, 0.35, 1, 32]} />
        </mesh>
        {/* Head Shape */}
        <mesh position={[0.1, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]} material={material}>
          <boxGeometry args={[0.6, 0.4, 0.3]} />
        </mesh>
        {/* Nose */}
        <mesh position={[0.4, 0.45, 0]} material={material}>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
        </mesh>
      </group>
    </Float>
  );
}

function MusicalNote({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: GOLD_COLOR,
    metalness: 1,
    roughness: 0,
    transmission: 0.5,
    thickness: 1,
  }), []);

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <group position={position} scale={scale}>
        {/* Note Head */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 8, 0, 0]} material={material}>
          <sphereGeometry args={[0.2, 32, 16]} />
        </mesh>
        {/* Stem */}
        <mesh position={[0.15, 0.5, 0]} material={material}>
          <cylinderGeometry args={[0.02, 0.02, 1, 16]} />
        </mesh>
        {/* Flag */}
        <mesh position={[0.3, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]} material={material}>
          <boxGeometry args={[0.4, 0.05, 0.02]} />
        </mesh>
      </group>
    </Float>
  );
}

function ChessKing({ position, scale = 1, color = GOLD_COLOR }: { position: [number, number, number], scale?: number, color?: string }) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
  }), [color]);

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={position} scale={scale}>
        {/* Base */}
        <mesh position={[0, -0.8, 0]} material={material}>
          <cylinderGeometry args={[0.5, 0.55, 0.2, 32]} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0, 0]} material={material}>
          <cylinderGeometry args={[0.2, 0.45, 1.4, 32]} />
        </mesh>
        {/* Crown Base */}
        <mesh position={[0, 0.8, 0]} material={material}>
          <cylinderGeometry args={[0.3, 0.2, 0.1, 32]} />
        </mesh>
        {/* Cross on top */}
        <group position={[0, 1.0, 0]}>
          <mesh material={material}>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
          </mesh>
          <mesh position={[0, 0.1, 0]} material={material}>
            <boxGeometry args={[0.25, 0.08, 0.08]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function MusicalRibbon({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.5) * 2,
        i * 0.5,
        Math.cos(i * 0.5) * 2
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} rotation={rotation}>
        <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
        <MeshWobbleMaterial 
          color={GOLD_COLOR} 
          factor={0.4} 
          speed={1} 
          transparent 
          opacity={0.4} 
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingBoard({ position }: { position: [number, number, number] }) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.1,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
  }), []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh position={position} rotation={[-Math.PI / 4, 0, Math.PI / 8]} material={material}>
        <boxGeometry args={[4, 0.1, 4]} />
      </mesh>
    </Float>
  );
}

function MusicalString({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <Float speed={4} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh position={position} rotation={rotation}>
        <cylinderGeometry args={[0.005, 0.005, 10, 8]} />
        <meshBasicMaterial color={GOLD_COLOR} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function GalleryFrame({ position, scale, rotationSpeed, type, assetId }: {
  position: [number, number, number],
  scale: [number, number, number],
  rotationSpeed: number,
  type: 'frame' | 'polaroid',
  assetId: number
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(ASSETS[assetId % ASSETS.length], (tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001 * rotationSpeed;
      meshRef.current.rotation.x += 0.0005 * rotationSpeed;
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.3 + position[0]) * 0.01;
    }
  });

  const frameMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: type === 'frame' ? '#a67564' : '#f2f1ef',
    metalness: type === 'frame' ? 0.3 : 0,
    roughness: 0.2,
    envMapIntensity: 1,
  }), [type]);

  const innerMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
  }), [texture]);

  const mountMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#d9d2cc',
    roughness: 0.8,
  }), []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {type === 'frame' ? (
          <group scale={scale}>
            <mesh material={frameMat}>
              <boxGeometry args={[1.1, 1.4, 0.08]} />
            </mesh>
            <mesh material={mountMat} position={[0, 0, 0.02]}>
              <planeGeometry args={[1.0, 1.3]} />
            </mesh>
            <mesh material={innerMat} position={[0, 0, 0.025]}>
              <planeGeometry args={[0.7, 0.9]} />
            </mesh>
          </group>
        ) : (
          <group scale={scale}>
            <mesh material={frameMat} castShadow>
              <boxGeometry args={[1, 1.2, 0.02]} />
            </mesh>
            <mesh material={innerMat} position={[0, 0.1, 0.011]}>
              <planeGeometry args={[0.88, 0.88]} />
            </mesh>
            <mesh material={new THREE.MeshBasicMaterial({ color: '#d9d2cc' })} position={[0, -0.4, 0.011]}>
               <planeGeometry args={[0.6, 0.05]} />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}

function PulsatingLight({ position, color, intensity = 1 }: { position: [number, number, number], color: string, intensity?: number }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      lightRef.current.intensity = intensity * (1 + Math.sin(time * 0.5) * 0.4);
    }
  });

  return <pointLight ref={lightRef} position={position} color={color} distance={20} decay={2} />;
}

function VolumetricFog() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          // Luxurious pulsing effect
          const pulse = Math.sin(time * 0.4 + i * 0.7);
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = 0.02 + pulse * 0.015;
          child.scale.setScalar(1 + pulse * 0.1);
          child.rotation.x += 0.0002;
          child.rotation.y += 0.0003;
        }
      });
    }
  });

  const fogSpheres = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        -15 + Math.random() * 10
      ] as [number, number, number],
      size: 6 + Math.random() * 6
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {fogSpheres.map((s, i) => (
        <mesh key={i} position={s.position}>
          <sphereGeometry args={[s.size, 16, 16]} />
          <meshBasicMaterial 
            color="#f2f1ef" // Matching background
            transparent 
            opacity={0.03} 
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { scrollYProgress } = useScroll();
  const rotationYTransform = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.5]);
  const groupRef = useRef<THREE.Group>(null);
  const mouseGroupRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationYTransform.get();
    }
    if (mouseGroupRef.current) {
      // Gentle reaction to mouse
      mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, mouse.x * 0.1, 0.1);
      mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, mouse.y * 0.1, 0.1);
    }
    if (spotlightRef.current) {
      spotlightRef.current.position.x = mouse.x * 10;
      spotlightRef.current.position.y = mouse.y * 10;
    }
  });

  return (
    <>
      <color attach="background" args={["#f2f1ef"]} />
      <fogExp2 attach="fog" args={["#f2f1ef", 0.035]} />
      <VolumetricFog />
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <Environment preset="apartment" />
      <ambientLight intensity={0.4} />
      <spotLight ref={spotlightRef} position={[0, 0, 10]} angle={0.3} penumbra={1} intensity={200} color="#d9b18e" />
      <PulsatingLight position={[5, 5, 5]} color="#d9b18e" intensity={2} />
      <PulsatingLight position={[-8, -5, 2]} color="#a67564" intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#d9d2cc" />
      
      <group ref={mouseGroupRef}>
        <group ref={groupRef}>
          {/* Gallery Frames */}
          <GalleryFrame type="frame" position={[-8, 4, -4]} scale={[1.2, 1.2, 1.2]} rotationSpeed={0.5} assetId={0} />
          <GalleryFrame type="polaroid" position={[9, 3, -2]} scale={[1, 1, 1]} rotationSpeed={0.8} assetId={1} />
          <GalleryFrame type="frame" position={[-7, -4, 0]} scale={[1.1, 1.1, 1.1]} rotationSpeed={1.2} assetId={2} />
          <GalleryFrame type="polaroid" position={[6, 6, -5]} scale={[0.9, 0.9, 0.9]} rotationSpeed={0.6} assetId={3} />
          <GalleryFrame type="frame" position={[7, -5, 1]} scale={[1, 1, 1]} rotationSpeed={1} assetId={4} />
          
          {/* Chess Elements */}
          <ChessKing position={[0, 5, -8]} scale={1.5} color={GOLD_COLOR} />
          <ChessPawn position={[-4, 2, -1]} scale={0.8} color={GOLD_COLOR} />
          <ChessKnight position={[10, -2, -3]} scale={1.2} color={GOLD_COLOR} />
          <ChessPawn position={[3, -3, 2]} scale={1.2} color={BLACK_COLOR} />
          <ChessKnight position={[-9, -5, -4]} scale={0.9} color={BLACK_COLOR} />
          <ChessPawn position={[8, 1, -3]} scale={0.5} color={GOLD_COLOR} />
          <FloatingBoard position={[0, 0, -6]} />
          
          {/* Musical Elements */}
          <MusicalNote position={[6, -2, -1]} scale={1.5} />
          <MusicalNote position={[-6, 6, -5]} scale={1.2} />
          <MusicalNote position={[4, 5, -8]} scale={1.8} />
          <MusicalRibbon position={[-12, -8, -10]} rotation={[0, Math.PI / 4, 0]} />
          <MusicalRibbon position={[15, 5, -15]} rotation={[Math.PI / 2, 0, Math.PI / 6]} />
          <MusicalString position={[-5, 0, -2]} rotation={[0, 0, Math.PI / 6]} />
          <MusicalString position={[5, 2, -4]} rotation={[0, 0, -Math.PI / 4]} />
          <MusicalString position={[0, -5, -3]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      </group>
      
      <Sparkles count={40} scale={20} size={1} speed={0.3} color="#d9b18e" opacity={0.4} />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
