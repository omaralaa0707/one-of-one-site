"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { SHOWROOM_FRAMES } from "@/content/media";

export function Visit() {
  const { content } = useLocale();
  const c = content.contact;

  return (
    <>
      {/* Services, set as a numbered ledger rather than cards. */}
      <section className="border-t border-white/8 bg-void-2 py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <h2 className="font-display mb-14 text-section font-extralight md:mb-20">
              {content.services.heading}
            </h2>
          </Reveal>

          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {content.services.items.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 0.05}>
                <div className="group h-full bg-void-2 p-8 transition-colors duration-200 hover:bg-void-3 md:p-12">
                  <bdi className="font-display text-[0.6rem] tracking-[0.22em] text-tan">
                    {String(i + 1).padStart(2, "0")}
                  </bdi>
                  <h3 className="font-display mt-6 text-[clamp(1.25rem,2.4vw,1.9rem)] font-light text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] leading-[1.75] text-bone-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="film-grain relative overflow-hidden bg-void">
        <div className="absolute inset-0">
          <Image
            src={SHOWROOM_FRAMES[1]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/62 to-void" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
          <h2 className="font-display max-w-[15ch] text-display leading-[1.02] font-extralight">
            {c.heading}
          </h2>

          {c.intro && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[48ch] text-lead leading-relaxed text-bone-dim">{c.intro}</p>
            </Reveal>
          )}

          <div className="mt-14 grid gap-10 border-t border-white/12 pt-12 pb-4 md:grid-cols-3 md:gap-8">
            <Reveal>
              <p className="font-display mb-4 text-[0.6rem] tracking-[0.22em] text-tan uppercase">
                {c.addressLabel}
              </p>
              <p className="max-w-[26ch] text-lead leading-[1.7] text-bone">{c.address}</p>
              <a
                href={c.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 font-display text-[0.7rem] tracking-[0.18em] text-bone-dim uppercase transition-colors hover:text-tan"
              >
                {c.cta}
                <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-display mb-4 text-[0.6rem] tracking-[0.22em] text-tan uppercase">
                {c.phoneLabel}
              </p>
              <ul className="space-y-2">
                {c.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p.replace(/[^\d+]/g, "")}`}
                      dir="ltr"
                      className="text-lead text-bone transition-colors hover:text-tan"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              {c.hoursLabel && (
                <>
                  <p className="font-display mb-4 text-[0.6rem] tracking-[0.22em] text-tan uppercase">
                    {c.hoursLabel}
                  </p>
                  <p className="text-lead text-bone">{c.hours}</p>
                </>
              )}
              <div className="mt-6 flex gap-3">
                {c.instagramUrl && (
                  <a
                    href={c.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/18 px-5 py-2.5 font-display text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-tan hover:text-tan"
                  >
                    Instagram
                  </a>
                )}
                {c.facebookUrl && (
                  <a
                    href={c.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/18 px-5 py-2.5 font-display text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-tan hover:text-tan"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
