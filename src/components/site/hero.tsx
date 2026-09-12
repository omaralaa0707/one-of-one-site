"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { HERO_FRAME } from "@/content/media";

// WebGL stays out of the first paint; the mark fades in once it is ready.
const Monogram = dynamic(
  () => import("@/components/three/monogram").then((m) => m.Monogram),
  { ssr: false }
);

export function Hero() {
  const { content } = useLocale();

  return (
    <section
      id="top"
      className="film-grain relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
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

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-24">
        <p className="mb-6 font-display text-[0.66rem] tracking-brand text-tan uppercase">
          {content.hero.eyebrow}
        </p>

        <h1 className="font-display max-w-[16ch] text-hero leading-[0.92] font-extralight text-bone">
          {content.hero.headline}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[46ch] text-lead leading-relaxed text-bone-dim">
            {content.hero.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#collection"
              className="group relative overflow-hidden rounded-full bg-bone px-7 py-3.5 font-display text-[0.72rem] tracking-[0.18em] text-void uppercase"
            >
              <span className="relative z-10 transition-colors duration-200 group-hover:text-bone">
                {content.hero.primaryCta}
              </span>
              <span className="absolute inset-0 translate-y-full bg-tan transition-transform duration-200 group-hover:translate-y-0" />
            </a>
            <a
              href="#visit"
              className="rounded-full border border-white/20 px-7 py-3.5 font-display text-[0.72rem] tracking-[0.18em] text-bone/85 uppercase transition-colors duration-200 hover:border-tan hover:text-tan"
            >
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
