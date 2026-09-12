"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-browser";

/** True on touch-first devices or narrow screens: no continuous WebGL animation there. */
function useLiteGL(): boolean {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    const update = () => setLite(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return lite;
}

/**
 * The brand's slashed-Ø mark, rebuilt as real geometry: a torus for the O and a
 * beveled bar for the slash, in one group so they rotate as a single mark.
 * Transmission material picks up the environment, so the mark reads as polished
 * chrome rather than flat plastic.
 */
function Mark({
  pointer,
  still,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (still) return;
    const g = group.current;
    if (!g) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    // Ease toward the cursor instead of tracking it exactly — the lag is what
    // makes the mark feel weighted rather than glued to the mouse.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, p.x * 0.55, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.35, 3, delta);
    // No continuous z-spin: the slash sits at a fixed angle in the real logo,
    // and rotating it turns the Ø into an anonymous ring for most of the loop.
    void state;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1.32, 0.235, 64, 220]} />
        <meshPhysicalMaterial
          color="#dedcd7"
          metalness={1}
          roughness={0.17}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.1}
        />
      </mesh>

      {/* Polished metal, not glass: a transmissive slash goes near-black against
          a dark showroom and the mark starts reading as a "no entry" sign. */}
      <mesh rotation={[0, 0, Math.PI / 3.35]}>
        {/* Round section, like the torus: a flat-faced bar reflects one dim
            panel and reads as dull grey, while a cylinder sweeps the whole
            environment and picks up the same highlights as the ring. */}
        <cylinderGeometry args={[0.125, 0.125, 3.42, 48]} />
        <meshPhysicalMaterial
          color="#dedcd7"
          metalness={1}
          roughness={0.17}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.1}
        />
      </mesh>
    </group>
  );
}

export function Monogram({ className }: { className?: string }) {
  const pointer = useRef({ x: 0, y: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();
  const lite = useLiteGL();

  // The mark sits in the hero, so it mounts immediately — but once the
  // visitor scrolls it out of view there is no reason to keep rendering it.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced) {
    // Static, high-contrast fallback. No WebGL context, no motion.
    return (
      <div className={className} aria-hidden>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <ellipse cx="100" cy="100" rx="62" ry="74" fill="none" stroke="#edeae4" strokeWidth="9" />
          <line x1="58" y1="152" x2="146" y2="46" stroke="#edeae4" strokeWidth="9" />
        </svg>
      </div>
    );
  }

  // Touch/small-screen: a still frame. A drag can still nudge it (invalidate),
  // but nothing spins or floats on its own.
  const frameloop = lite ? "demand" : inView ? "always" : "never";

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        };
        invalidateRef.current?.();
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={frameloop}
        onCreated={(state) => {
          setReady(true);
          invalidateRef.current = state.invalidate;
        }}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.9s ease" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[6, 8, 6]} intensity={180} angle={0.4} penumbra={1} />
          <spotLight position={[-7, -4, 4]} intensity={90} color="#c08a4e" />
          <Float
            speed={lite ? 0 : 1.1}
            rotationIntensity={lite ? 0 : 0.22}
            floatIntensity={lite ? 0 : 0.55}
          >
            <Mark pointer={pointer} still={lite} />
          </Float>
          {/* A hand-built environment instead of a preset HDR: drei's presets
              fetch from a CDN at runtime, which left the mark unlit in
              production. These strip lights also mirror the hexagon ceiling
              array in the showroom's own photographs. */}
          <Environment resolution={256}>
            {/* A dim wrap first: with nothing but bright strips against a black
                void, polished metal reflects mostly black and the mark bands
                harshly. This gives every reflection a grey floor to sit on. */}
            <Lightformer
              form="rect"
              intensity={1.15}
              position={[0, 0, -6]}
              scale={[24, 24, 1]}
              color="#6d7076"
            />
            <Lightformer
              form="rect"
              intensity={0.95}
              position={[0, 0, 8]}
              scale={[24, 24, 1]}
              color="#5c6066"
            />
            {/* Key: a wide soft strip overhead, like the showroom ceiling. */}
            <Lightformer
              form="rect"
              intensity={4.2}
              position={[0, 5, 1]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[9, 5, 1]}
              color="#f6f5f2"
            />
            <Lightformer
              form="rect"
              intensity={2.6}
              position={[-5, 1, 3]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[7, 4, 1]}
              color="#eceae5"
            />
            {/* Warm bounce, sampled from the tan leather in their photographs. */}
            <Lightformer
              form="rect"
              intensity={2.0}
              position={[5, -1.5, 2]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[7, 4, 1]}
              color="#c08a4e"
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
