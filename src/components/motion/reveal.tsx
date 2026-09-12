"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The site's one section-reveal effect: opacity 0→1 with a small rise, once,
 * fired early via a generous rootMargin so content is settled well before it
 * reaches the fold. `prefers-reduced-motion` and no-JS both fall back to
 * fully visible content (see the `.reveal` rules and `<noscript>` escape in
 * globals.css / layout.tsx).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds; kept small so a group of these never cascades past ~300ms total. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 15% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
