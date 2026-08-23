"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import type { Group } from "three";

function Emblem() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#101018"
          emissive="#7cfc00"
          emissiveIntensity={0.12}
          metalness={0.9}
          roughness={0.25}
          wireframe
        />
      </mesh>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#7cfc00"
            emissive="#39ff14"
            emissiveIntensity={1.6}
            metalness={0.6}
            roughness={0.15}
          />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[2.15, 0.02, 8, 96]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

const Hero3DScene = () => {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#7cfc00" />
      <pointLight position={[-4, -2, -4]} intensity={20} color="#a855f7" />
      <Emblem />
      <Sparkles
        count={90}
        scale={[9, 6, 4]}
        size={2.2}
        speed={0.35}
        color="#7cfc00"
        opacity={0.55}
      />
    </Canvas>
  );
};

export default Hero3DScene;
