"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-browser";

/**
 * The brand's slashed-Ø mark, rebuilt as real geometry: a torus for the O and a
 * beveled bar for the slash, in one group so they rotate as a single mark.
 * Transmission material picks up the environment, so the mark reads as polished
 * chrome rather than flat plastic.
 */
function Mark({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    // Ease toward the cursor instead of tracking it exactly — the lag is what
    // makes the mark feel weighted rather than glued to the mouse.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, p.x * 0.55, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.35, 3, delta);
    g.rotation.z += delta * 0.055;
    void state;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1.32, 0.235, 64, 220]} />
        <MeshTransmissionMaterial
          thickness={0.9}
          roughness={0.06}
          transmission={1}
          ior={1.7}
          chromaticAberration={0.32}
          anisotropy={0.4}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          backside
          color="#f4f2ee"
        />
      </mesh>

      {/* Polished metal, not glass: a transmissive slash goes near-black against
          a dark showroom and the mark starts reading as a "no entry" sign. */}
      <mesh rotation={[0, 0, Math.PI / 3.35]}>
        <boxGeometry args={[0.235, 3.5, 0.235]} />
        <meshStandardMaterial
          color="#e8e6e1"
          metalness={1}
          roughness={0.14}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

export function Monogram({ className }: { className?: string }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  if (reduced) {
    // Static, high-contrast fallback. No WebGL context, no motion.
    return (
      <div className={className} aria-hidden>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <ellipse
            cx="100"
            cy="100"
            rx="62"
            ry="74"
            fill="none"
            stroke="#edeae4"
            strokeWidth="9"
          />
          <line
            x1="58"
            y1="152"
            x2="146"
            y2="46"
            stroke="#edeae4"
            strokeWidth="9"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={className}
      aria-hidden
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        };
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[6, 8, 6]} intensity={180} angle={0.4} penumbra={1} />
          <spotLight position={[-7, -4, 4]} intensity={90} color="#c08a4e" />
          <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.55}>
            <Mark pointer={pointer} />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
