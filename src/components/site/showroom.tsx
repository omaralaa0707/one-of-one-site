"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { DETAIL_FRAMES, INTERIOR_FRAMES } from "@/content/media";

export function Showroom() {
  const { content, locale } = useLocale();

  return (
    <section id="showroom" className="relative overflow-hidden bg-void py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="mb-5 font-display text-[0.64rem] tracking-brand text-tan uppercase">
              <bdi>03</bdi> — {locale === "ar" ? "المعرض" : "The showroom"}
            </p>

            <h2 className="font-display max-w-[16ch] text-display leading-[1.02] font-extralight">
              {content.about.heading}
            </h2>

            <div className="my-9 h-px w-full bg-tan/70" />

            <div className="space-y-6">
              {content.about.body.map((p, i) => (
                <Reveal key={i} delay={Math.min(i, 2) * 0.08}>
                  <p className="max-w-[54ch] text-lead leading-[1.75] text-bone-dim">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Interior mosaic: two static columns, offset for rhythm. */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-4 md:space-y-5">
              {INTERIOR_FRAMES.slice(0, 2).map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden bg-void-2">
                  <Image src={src} alt="" fill sizes="(max-width:1024px) 45vw, 24vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-10 md:space-y-5 md:pt-16">
              {INTERIOR_FRAMES.slice(2, 4).map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden bg-void-2">
                  <Image src={src} alt="" fill sizes="(max-width:1024px) 45vw, 24vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail rail: wheels, badges and the two cabins the mosaic didn't take. */}
        <div className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-7 md:gap-4">
          {[...DETAIL_FRAMES, ...INTERIOR_FRAMES.slice(4, 6)].map((src, i) => (
            <Reveal key={src} delay={Math.min(i, 5) * 0.04}>
              <div className="group relative aspect-square overflow-hidden bg-void-2">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width:768px) 45vw, 14vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
