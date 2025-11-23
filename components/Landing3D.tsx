'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Environment, ContactShadows, Grid, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CarModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      // Gentle floating animation
      group.current.position.y = Math.sin(t / 1.5) / 10;
      // Slight tilt based on "movement"
      group.current.rotation.z = Math.sin(t / 2) / 20;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Abstract Body - Cyberpunk Style */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.2, 0.6, 4.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Glowing Edges */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.25, 0.65, 4.25]} />
        <meshStandardMaterial color="#ef4444" wireframe />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.8, -0.5]}>
        <boxGeometry args={[1.8, 0.5, 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Windshield Glow */}
      <mesh position={[0, 0.8, -0.5]}>
        <boxGeometry args={[1.85, 0.55, 2.05]} />
        <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Wheels - Abstract Cylinders */}
      <mesh position={[-1.2, 0, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.2, 0, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.2, 0, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.2, 0, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Rear Lights */}
      <mesh position={[0, 0.3, 2.15]}>
        <boxGeometry args={[2, 0.1, 0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-0.8, 0.3, -2.15]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.8, 0.3, -2.15]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function MovingGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Move grid backward to simulate forward motion
      gridRef.current.position.z = (state.clock.getElapsedTime() * 2) % 2;
    }
  });

  return (
    <group ref={gridRef} position={[0, -0.5, 0]}>
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        sectionSize={5}
        sectionColor={new THREE.Color('#ef4444')}
        cellColor={new THREE.Color('#1e293b')}
        fadeDistance={30}
        fadeStrength={1.5}
      />
    </group>
  );
}

export default function Landing3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[4, 3, 8]} fov={50} near={0.1} far={1000} />
        <color attach="background" args={['#020617']} />
        
        {/* Simplified Lighting - More Robust */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#ef4444" />
        
        <CarModel rotation={[0, -Math.PI / 4, 0]} />

        <MovingGrid />
        
        {/* Optimized Stars */}
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        
        {/* Removed expensive ContactShadows and Environment to prevent WebGL context loss */}
        
        {/* Interactive Controls - No Auto Rotate to prevent disorientation/clipping */}
        <OrbitControls 
          makeDefault
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
