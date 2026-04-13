import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GalaxyField() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00008) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={220}
        depth={80}
        count={2200}
        factor={4}
        saturation={0}
        fade
        speed={0.55}
      />
      <mesh position={[0, 0, -30]}>
        <sphereGeometry args={[32, 48, 48]} />
        <meshBasicMaterial
          color={new THREE.Color("#00d4ff")}
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

function GalaxyBackground() {
  return (
    <div className="galaxy-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <GalaxyField />
      </Canvas>
    </div>
  );
}

export default GalaxyBackground;
