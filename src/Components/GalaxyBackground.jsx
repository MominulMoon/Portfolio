import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const GALAXY_CONFIG = {
  radius: 220,
  depth: 80,
  count: 2200,
  factor: 4,
  speed: 0.55,
};

function GalaxyField({ accentColor }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00008) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={GALAXY_CONFIG.radius}
        depth={GALAXY_CONFIG.depth}
        count={GALAXY_CONFIG.count}
        factor={GALAXY_CONFIG.factor}
        saturation={0}
        fade
        speed={GALAXY_CONFIG.speed}
      />
      <mesh position={[0, 0, -30]}>
        <sphereGeometry args={[32, 48, 48]} />
        <meshBasicMaterial
          color={new THREE.Color(accentColor)}
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

function GalaxyBackground() {
  const [accentColor, setAccentColor] = useState(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary")
        .trim() || "#00d4ff",
  );

  useEffect(() => {
    const handleThemeChange = (event) => {
      const palette = event.detail?.palette;
      if (!palette) return;
      setAccentColor(palette.accentPrimary);
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  return (
    <div className="galaxy-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <GalaxyField accentColor={accentColor} />
      </Canvas>
    </div>
  );
}

export default GalaxyBackground;
