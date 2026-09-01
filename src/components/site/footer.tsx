"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";

export function Footer() {
  const { content, locale } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-void py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/media/logo.jpg"
              alt={content.brand.name}
              width={56}
              height={56}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-[0.68rem] tracking-brand text-bone">
                {content.brand.shortName}
              </p>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-bone-dim">
                {content.brand.tagline}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-[0.66rem] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:text-tan"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-8 text-xs text-bone-dim md:flex-row md:items-center md:justify-between">
          <p>{content.footer.disclaimer}</p>
          <p>
            {content.footer.rights}
            <span className="mx-2 opacity-40">/</span>
            {locale === "ar" ? "صُمم بواسطة Claude" : "Designed by Claude"}
          </p>
        </div>
      </div>
    </footer>
  );
}
