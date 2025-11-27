/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Workaround for missing JSX types in this specific environment
// We define these as any-typed constants to bypass JSX.IntrinsicElements checks
const Group = 'group' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const ChromatinNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.5}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const DnaStrand = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.y = t * 0.05;
       ref.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Group ref={ref} rotation={[0, 0, Math.PI / 4]}>
        <Torus args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <MeshStandardMaterial color="#0d9488" transparent opacity={0.3} />
        </Torus>
         <Torus args={[4.2, 0.02, 16, 100]} rotation={[Math.PI / 2.1, 0, 0]}>
            <MeshStandardMaterial color="#2dd4bf" transparent opacity={0.2} />
        </Torus>
    </Group>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <AmbientLight intensity={0.8} />
        <PointLight position={[10, 10, 10]} intensity={1} color="#ccfbf1" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main Nodes representing Proteins/DNA clusters */}
          <ChromatinNode position={[0, 0, 0]} color="#0d9488" scale={1.2} />
          <DnaStrand />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <ChromatinNode position={[-3, 1, -2]} color="#3b82f6" scale={0.5} />
           <ChromatinNode position={[3, -1, -3]} color="#f43f5e" scale={0.6} />
           <ChromatinNode position={[-2, -2, -1]} color="#14b8a6" scale={0.4} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

// Placeholder for what was previously QuantumComputerScene
// Now representing a general "Lab / Microscopic" abstract view if needed
export const QuantumComputerScene: React.FC = () => {
  return (
     <div className="w-full h-full absolute inset-0 bg-stone-100 flex items-center justify-center">
         <div className="text-stone-300 font-serif italic">Cellular Environment</div>
     </div>
  );
}