"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Stars } from "@react-three/drei";
import * as THREE from "three";

const MOVES = {
  R: { axis: "x", layer: 1, direction: 1 },
  "R'": { axis: "x", layer: 1, direction: -1 },
  L: { axis: "x", layer: -1, direction: 1 },
  "L'": { axis: "x", layer: -1, direction: -1 },
  U: { axis: "y", layer: 1, direction: 1 },
  "U'": { axis: "y", layer: 1, direction: -1 },
  D: { axis: "y", layer: -1, direction: 1 },
  "D'": { axis: "y", layer: -1, direction: -1 },
  F: { axis: "z", layer: 1, direction: 1 },
  "F'": { axis: "z", layer: 1, direction: -1 },
  B: { axis: "z", layer: -1, direction: 1 },
  "B'": { axis: "z", layer: -1, direction: -1 },
  // Middle-layer moves (M, E, S)
  M: { axis: "x", layer: 0, direction: 1 },
  "M'": { axis: "x", layer: 0, direction: -1 },
  E: { axis: "y", layer: 0, direction: 1 },
  "E'": { axis: "y", layer: 0, direction: -1 },
  S: { axis: "z", layer: 0, direction: 1 },
  "S'": { axis: "z", layer: 0, direction: -1 },
} as const;

const SCRAMBLE_SEQUENCE: (keyof typeof MOVES)[] = [
  "R", "U", "R'", "F", "L'", "B", "D", "M", "E'", "S",
];

export default function ScrollCubeIndicator({ progress }: { progress: number }) {
    return <div></div>;
}

function RubikCube({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    const layers = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
          );
          mesh.position.set(x, y, z);
          layers.push(mesh);
        }
      }
    }
    return layers;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Use scramble sequence to apply moves
    const moveProgress = Math.min(
      Math.floor(progress * SCRAMBLE_SEQUENCE.length),
      SCRAMBLE_SEQUENCE.length - 1
    );

    SCRAMBLE_SEQUENCE.forEach((move, idx) => {
      if (!MOVES[move]) return;
      if (idx === moveProgress) {
        const { axis, direction } = MOVES[move];
        cubes.forEach((cube) => {
          const axisVector = new THREE.Vector3(
            axis === 'x' ? 1 : 0,
            axis === 'y' ? 1 : 0,
            axis === 'z' ? 1 : 0
          );
          cube.setRotationFromAxisAngle(axisVector, direction * Math.PI / 2);
        });
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map(({ position }, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[1, 1, 1]} />
          <Edges />
        </mesh>
      ))}
    </group>
  );
}