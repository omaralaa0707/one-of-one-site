"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useScrolledPast } from "@/lib/use-browser";
import { cn } from "@/lib/utils";

export function Nav() {
  const { content, locale, toggleLocale } = useLocale();
  const scrolled = useScrolledPast(64);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-white/8 bg-void/72 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-6"
      )}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/media/logo.jpg"
            alt={content.brand.name}
            width={44}
            height={44}
            className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
            priority
          />
          <span className="font-display text-[0.6rem] tracking-brand text-bone/85 md:text-[0.68rem]">
            {content.brand.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-display text-[0.7rem] tracking-[0.22em] text-bone-dim uppercase transition-colors hover:text-bone"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-tan transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            aria-label={content.a11y.toggleLanguage}
            className="group relative overflow-hidden rounded-full border border-white/15 px-4 py-2 font-display text-[0.68rem] tracking-[0.18em] text-bone/90 transition-colors hover:border-tan/60"
          >
            <span className="relative z-10">{locale === "ar" ? "EN" : "ع"}</span>
            <span className="absolute inset-0 -translate-y-full bg-tan transition-transform duration-500 group-hover:translate-y-0" />
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.a11y.closeMenu : content.a11y.openMenu}
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={cn(
                "h-px w-5 bg-bone transition-transform duration-400",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-bone transition-transform duration-400",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-600 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 pt-6 pb-8">
            {content.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/8 py-4 font-display text-xl text-bone/90"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
