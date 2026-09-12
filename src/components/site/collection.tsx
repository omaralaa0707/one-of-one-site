"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { COLLECTION } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * A manual, user-driven horizontal rail (swipe or trackpad-shift, never
 * scroll-hijacked). The flex row inherits the page's writing direction, so it
 * naturally reads right-to-left in Arabic without any extra logic.
 */
export function Collection() {
  const { content, locale } = useLocale();

  return (
    <section id="collection" className="relative bg-void py-16 md:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 md:mb-10 md:px-10">
        <div>
          <p className="mb-3 font-display text-[0.64rem] tracking-brand text-tan uppercase">
            <bdi>01</bdi> — {content.gallery.heading}
          </p>
          <h2 className="font-display max-w-[20ch] text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.04] font-extralight">
            {content.gallery.intro}
          </h2>
        </div>
        <p className="hidden shrink-0 items-center gap-3 font-display text-[0.62rem] tracking-[0.2em] text-bone-dim uppercase md:flex">
          {locale === "ar" ? "مرّر للتصفح" : "Swipe to browse"}
          <span className="h-px w-10 bg-tan/60" />
        </p>
      </div>

      <div className="hide-scrollbar flex w-full snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-2 md:gap-6 md:px-10">
        {COLLECTION.map((item, i) => (
          <figure
            key={item.src}
            className={cn(
              "group relative shrink-0 snap-start overflow-hidden bg-void-2",
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
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-30" />
            <figcaption className="absolute bottom-4 left-4 font-display text-[0.6rem] tracking-[0.24em] text-bone/70 uppercase">
              <bdi>{String(i + 1).padStart(2, "0")}</bdi>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
