import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';

const AnimatedShape = () => {
  const meshRef = useRef();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state) => {
    if (prefersReducedMotion || !meshRef.current) return;
    
    // Slow idle rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Subtle pointer interaction (mouse follow)
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    
    meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
    meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
  });

  return (
    <Icosahedron ref={meshRef} args={[2, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#8B5CF6" 
        wireframe={true} 
        transparent={true} 
        opacity={0.3}
        emissive="#6366F1"
        emissiveIntensity={0.8}
      />
    </Icosahedron>
  );
};

const Hero3D = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
};

export default Hero3D;
