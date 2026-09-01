"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { DETAIL_FRAMES, INTERIOR_FRAMES } from "@/content/media";

export function Showroom() {
  const root = useRef<HTMLElement>(null);
  const { content, locale } = useLocale();

  useGSAP(
    () => {
      // Detail frames drift at different rates so the block breathes instead of
      // scrolling as one flat slab.
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 6 + i * 2 },
          {
            yPercent: -6 - i * 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });

      // The tan rule draws itself across the section as it enters.
      gsap.fromTo(
        "[data-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: locale === "ar" ? "right center" : "left center",
          ease: "expo.out",
          duration: 1.6,
          scrollTrigger: { trigger: "[data-rule]", start: "top 85%" },
        }
      );
    },
    { scope: root, dependencies: [locale] }
  );

  return (
    <section ref={root} id="showroom" className="relative overflow-hidden bg-void py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="mb-5 font-display text-[0.64rem] tracking-brand text-tan uppercase">
              03 — {locale === "ar" ? "المعرض" : "The showroom"}
            </p>

            <SplitText
              as="h2"
              trigger="inView"
              text={content.about.heading}
              className="font-display max-w-[16ch] text-display leading-[1.02] font-extralight"
            />

            <div data-rule className="my-9 h-px w-full origin-left bg-tan/70" />

            <div className="space-y-6">
              {content.about.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="max-w-[54ch] text-lead leading-[1.75] text-bone-dim">{p}</p>
                </Reveal>
              ))}
            </div>

            {content.about.stats && (
              <div className="mt-14 grid grid-cols-3 gap-5 border-t border-white/10 pt-8">
                {content.about.stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.06 * i}>
                    <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none font-extralight text-bone">
                      {s.value}
                    </p>
                    <p className="mt-3 font-display text-[0.6rem] tracking-[0.2em] text-bone-dim uppercase">
                      {s.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Their own line, lifted verbatim from the feed. */}
            <Reveal delay={0.12}>
              <blockquote className="mt-14 border-s-2 border-tan/70 ps-6 md:mt-20">
                <p className="font-display text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.3] font-extralight text-bone">
                  {locale === "ar"
                    ? "«حيث تلتقي الأناقة بالابتكار.»"
                    : "“Where elegance meets innovation.”"}
                </p>
                <cite className="mt-4 block font-display text-[0.6rem] tracking-[0.2em] text-bone-dim uppercase not-italic">
                  {locale === "ar"
                    ? "من حساب المعرض على إنستجرام"
                    : "From the showroom's own feed"}
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Interior mosaic: two columns drifting against each other. */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-4 md:space-y-5">
              {INTERIOR_FRAMES.slice(0, 2).map((src) => (
                <div
                  key={src}
                  data-drift
                  className="relative aspect-[4/5] overflow-hidden bg-void-2"
                >
                  <Image src={src} alt="" fill sizes="(max-width:1024px) 45vw, 24vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-10 md:space-y-5 md:pt-16">
              {INTERIOR_FRAMES.slice(2, 4).map((src) => (
                <div
                  key={src}
                  data-drift
                  className="relative aspect-[4/5] overflow-hidden bg-void-2"
                >
                  <Image src={src} alt="" fill sizes="(max-width:1024px) 45vw, 24vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail rail — wheels and calipers, cropped tight. */}
        {/* Wheels, badges and the two cabins the mosaic didn't take. */}
        <div className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-7 md:gap-4">
          {[...DETAIL_FRAMES, ...INTERIOR_FRAMES.slice(4, 6)].map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden bg-void-2">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width:768px) 45vw, 14vw"
                  className="object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
