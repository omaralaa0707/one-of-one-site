"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { SplitText } from "@/components/motion/split-text";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_FRAME } from "@/content/media";

// WebGL stays out of the first paint; the mark fades in once it is ready.
const Monogram = dynamic(
  () => import("@/components/three/monogram").then((m) => m.Monogram),
  { ssr: false }
);

export function Hero() {
  const { content, locale } = useLocale();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The car sinks and dims as the page moves, so the monogram is left
      // holding the frame on its own before the collection arrives.
      gsap.to("[data-hero-media]", {
        yPercent: 16,
        scale: 1.08,
        filter: "brightness(0.35)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-copy]", {
        yPercent: -28,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: 0.6,
        },
      });
    },
    { scope: root, dependencies: [locale] }
  );

  return (
    <section
      ref={root}
      id="top"
      className="film-grain relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <Image
          src={HERO_FRAME}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Keep the car readable: darken only where type sits. */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_18%,color-mix(in_oklab,var(--color-void)_92%,transparent)_92%)]" />
      </div>

      {/* Upper trailing quadrant so the mark never fights the headline for the
          same space; `end-*` mirrors it automatically in Arabic. */}
      <Monogram className="pointer-events-auto absolute top-[9%] end-[4%] h-[30vh] w-[62vw] max-w-[340px] md:top-[7%] md:end-[7%] md:h-[42vh] md:w-[34vw] md:max-w-[460px]" />

      <div
        data-hero-copy
        className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-24"
      >
        <p className="mb-6 font-display text-[0.66rem] tracking-brand text-tan uppercase">
          {content.hero.eyebrow}
        </p>

        <SplitText
          as="h1"
          text={content.hero.headline}
          className="font-display max-w-[16ch] text-hero leading-[0.92] font-extralight text-bone"
          lineStagger={0.1}
          delay={0.15}
        />

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[46ch] text-lead leading-relaxed text-bone-dim">
            {content.hero.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#collection"
              className="group relative overflow-hidden rounded-full bg-bone px-7 py-3.5 font-display text-[0.72rem] tracking-[0.18em] text-void uppercase"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-bone">
                {content.hero.primaryCta}
              </span>
              <span className="absolute inset-0 translate-y-full bg-tan transition-transform duration-600 group-hover:translate-y-0" />
            </a>
            <a
              href="#visit"
              className="rounded-full border border-white/20 px-7 py-3.5 font-display text-[0.72rem] tracking-[0.18em] text-bone/85 uppercase transition-colors duration-400 hover:border-tan hover:text-tan"
            >
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
