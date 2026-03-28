"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared mouse position in normalized device coords (-1 to +1) ────────────
// Stored outside component so it's shared across the whole canvas without re-renders
const mouse = new THREE.Vector2(9999, 9999); // start far offscreen

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const pointsRef    = useRef<THREE.Points>(null);
  const colorsRef    = useRef<THREE.BufferAttribute | null>(null);
  const positionsRef = useRef<THREE.BufferAttribute | null>(null);

  const PARTICLE_COUNT = 4000;
  const REPULSE_RADIUS = 2.8;
  const REPULSE_FORCE  = 0.045;
  const RETURN_SPEED   = 0.018;
  const REACT_FRACTION = 0.22;

  // ── build arrays once ──────────────────────────────────────────────────────
  const { origins, positions, colors, reactive } = useMemo(() => {
    const origins   = new Float32Array(PARTICLE_COUNT * 3);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const reactive  = new Uint8Array(PARTICLE_COUNT);

    const baseColor  = new THREE.Color("#ffffff");
    const glowColor  = new THREE.Color("#06B6D4"); // cyan glow

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 22;

      origins[i * 3]     = x;
      origins[i * 3 + 1] = y;
      origins[i * 3 + 2] = z;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3]     = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;

      reactive[i] = Math.random() < REACT_FRACTION ? 1 : 0;
    }

    return { origins, positions, colors, reactive };
  }, []);

  // ── project cursor from NDC → 3D world-space plane ──────────────────────
  const { camera } = useThree();
  const cursorWorld = useRef(new THREE.Vector3(9999, 9999, 0));
  const raycaster   = useRef(new THREE.Raycaster());
  const plane       = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));

  // reusable vectors — allocated once, never inside loop
  const _diff   = new THREE.Vector3();
  const _target = new THREE.Vector3();
  const _color  = new THREE.Color();
  const _base   = new THREE.Color("#ffffff");
  const _glow   = new THREE.Color("#06B6D4");
  const _primary  = new THREE.Color("#3B82F6");

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = pts.geometry.attributes.color   as THREE.BufferAttribute;

    // ── project cursor into world space every frame ──────────────────────
    raycaster.current.setFromCamera(mouse, camera);
    raycaster.current.ray.intersectPlane(plane.current, cursorWorld.current);

    const cx = cursorWorld.current.x;
    const cy = cursorWorld.current.y;
    const t  = state.clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let px = posAttr.getX(i);
      let py = posAttr.getY(i);
      let pz = posAttr.getZ(i);

      const ox = origins[ix];
      const oy = origins[iy];
      const oz = origins[iz];

      // ── reactive particles: repulsion + colour ───────────────────────
      if (reactive[i] === 1) {
        const dx   = px - cx;
        const dy   = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS && dist > 0.001) {
          const force = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE * (REPULSE_RADIUS / dist);
          px += dx * force;
          py += dy * force;

          const t = 1 - dist / REPULSE_RADIUS;
          _color.lerpColors(_base, i % 3 === 0 ? _primary : _glow, t);
          colAttr.setXYZ(i, _color.r, _color.g, _color.b);
        } else {
          px += (ox - px) * RETURN_SPEED;
          py += (oy - py) * RETURN_SPEED;
          const cr = colAttr.getX(i);
          const cg = colAttr.getY(i);
          const cb = colAttr.getZ(i);
          colAttr.setXYZ(i,
            cr + (_base.r - cr) * 0.04,
            cg + (_base.g - cg) * 0.04,
            cb + (_base.b - cb) * 0.04,
          );
        }

        pz += (oz - pz) * RETURN_SPEED;

      } else {
        px = ox + Math.sin(t * 0.3 + i * 0.5) * 0.04;
        py = oy + Math.cos(t * 0.2 + i * 0.7) * 0.04;
        pz = oz + Math.sin(t * 0.15 + i * 0.9) * 0.04;
      }

      posAttr.setXYZ(i, px, py, pz);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    pts.rotation.x = t * 0.06;
    pts.rotation.y = t * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Floating Artifacts ───────────────────────────────────────────────────────
function FloatingArtifacts() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[2, 1, -2]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3B82F6" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-2, -1, -3]}>
          <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

// ─── Mouse listener — lives outside Canvas, updates shared ref ────────────────
function MouseTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onLeave = () => {
      mouse.set(9999, 9999);
    };
    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return null;
}

// ─── Scene root ───────────────────────────────────────────────────────────────
export default function Scene() {
  return (
    <>
      <MouseTracker />
      <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06B6D4" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#3B82F6" distance={10} />

          <Particles />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </>
  );
}
