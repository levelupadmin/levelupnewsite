import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useIsAboveMd } from "@/lib/motion-utils";

const PARTICLE_COUNT = 900;
const AMBER = new THREE.Color("hsl(28, 95%, 60%)");

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = 0.005 + Math.random() * 0.012;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions, velocities };
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((_state, delta) => {
    const points = ref.current;
    if (!points) return;
    const positions = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = positions.array as Float32Array;
    const dt = Math.min(delta, 0.05) * 60;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 0] += velocities[i * 3 + 0] * dt;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * dt;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * dt;
      if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
      if (arr[i * 3 + 0] > 9) arr[i * 3 + 0] = -9;
      if (arr[i * 3 + 0] < -9) arr[i * 3 + 0] = 9;
    }
    positions.needsUpdate = true;
    cursor.current.x += (target.current.x - cursor.current.x) * 0.04;
    cursor.current.y += (target.current.y - cursor.current.y) * 0.04;
    points.position.x = cursor.current.x * 0.6;
    points.position.y = cursor.current.y * 0.4;
    points.rotation.z += delta * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={AMBER}
        size={0.07}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroWebGLBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const isAboveMd = useIsAboveMd();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted || prefersReducedMotion || !isAboveMd) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
