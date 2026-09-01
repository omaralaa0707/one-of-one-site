"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-browser";
import { COLLECTION } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * The collection is pinned and dragged sideways by vertical scroll. Direction
 * follows the locale: Arabic reads right-to-left, so the rail travels the other
 * way and the whole section still feels native rather than translated.
 */
export function Collection() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const { content, locale } = useLocale();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !rail.current) return;
      const rtl = locale === "ar";

      const distance = () =>
        rail.current!.scrollWidth - window.innerWidth + (window.innerWidth < 768 ? 40 : 120);

      const tween = gsap.to(rail.current, {
        x: () => (rtl ? distance() : -distance()),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [locale, reduced] }
  );

  return (
    <section id="collection" className="relative bg-void">
      {/* Pinned viewport: a compact header, then the rail takes the rest of the
          height so frames are never clipped by the fold. */}
      <div
        ref={root}
        className="relative flex h-[100svh] flex-col justify-center overflow-hidden py-16 md:py-20"
      >
        <div className="mx-auto mb-8 flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 md:mb-10 md:px-10">
          <div>
            <p className="mb-3 font-display text-[0.64rem] tracking-brand text-tan uppercase">
              01 — {content.gallery.heading}
            </p>
            <h2 className="font-display max-w-[20ch] text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.04] font-extralight">
              {content.gallery.intro}
            </h2>
          </div>
          <p className="hidden shrink-0 items-center gap-3 font-display text-[0.62rem] tracking-[0.2em] text-bone-dim uppercase md:flex">
            {locale === "ar" ? "مرّر للتصفح" : "Scroll to pan"}
            <span className="h-px w-10 bg-tan/60" />
          </p>
        </div>

        <div
          ref={rail}
          className={cn(
            "flex w-max gap-4 px-5 will-change-transform md:gap-6 md:px-10",
            reduced && "flex-wrap w-full"
          )}
          style={{ direction: "ltr" }}
        >
          {COLLECTION.map((item, i) => (
            <figure
              key={item.src}
              className={cn(
                "group relative shrink-0 overflow-hidden bg-void-2",
                item.tall
                  ? "h-[50svh] w-[62vw] md:h-[58svh] md:w-[24vw]"
                  : "h-[40svh] w-[78vw] md:h-[46svh] md:w-[34vw]",
                i % 3 === 1 && "self-end",
                i % 4 === 2 && "self-center"
              )}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-30" />
              <figcaption className="absolute bottom-4 left-4 font-display text-[0.6rem] tracking-[0.24em] text-bone/70 uppercase">
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
