"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { MARQUES } from "@/content/media";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Deliberately typographic. The dealership's photography is almost entirely
 * Mercedes and Audi, so putting a photo beside "Porsche" or "MINI" would imply
 * stock that isn't pictured. The marque names come from their own highlight
 * reels; the list states what they carry without faking a photo for each.
 */
export function Marques() {
  const { content, locale } = useLocale();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="marques"
      className="hex-field relative overflow-hidden border-y border-white/8 bg-void-2 py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="mb-4 font-display text-[0.64rem] tracking-brand text-tan uppercase">
              02 — {locale === "ar" ? "الماركات" : "Marques"}
            </p>
            <Reveal>
              <h2 className="font-display max-w-[18ch] text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.06] font-extralight">
                {locale === "ar"
                  ? "الماركات اللي بتلاقيها عندنا في المعرض."
                  : "The marques you'll find on the floor."}
              </h2>
            </Reveal>
          </div>
          <p className="max-w-[34ch] text-sm leading-relaxed text-bone-dim">
            {content.services.intro}
          </p>
        </div>

        <ul className="border-t border-white/12">
          {MARQUES.map((m, i) => (
            <li key={m.name} className="border-b border-white/12">
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex items-center justify-between gap-6 py-5 md:py-7"
              >
                {/* Tan wash sweeps in behind the name on hover. */}
                <span
                  className={cn(
                    "absolute inset-y-0 start-0 -z-0 bg-gradient-to-r from-tan/12 to-transparent transition-all duration-[900ms] rtl:bg-gradient-to-l",
                    active === i ? "w-full opacity-100" : "w-0 opacity-0"
                  )}
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                  aria-hidden
                />

                <span className="relative flex items-baseline gap-5 md:gap-9">
                  <span className="font-display text-[0.58rem] tracking-[0.2em] text-bone-dim tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[clamp(1.6rem,5vw,3.9rem)] leading-none font-extralight transition-all duration-700",
                      active === i
                        ? "translate-x-3 text-bone rtl:-translate-x-3"
                        : "translate-x-0 text-bone/72"
                    )}
                    style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                  >
                    {m.name}
                  </span>
                </span>

                <span
                  className={cn(
                    "relative hidden font-display text-[0.6rem] tracking-[0.22em] text-tan uppercase transition-all duration-600 md:block",
                    active === i ? "opacity-100 translate-x-0" : "translate-x-3 opacity-0 rtl:-translate-x-3"
                  )}
                >
                  {/* An invitation, not an availability claim we can't verify. */}
                  {locale === "ar" ? "اسأل عنها" : "Enquire"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
