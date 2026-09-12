import type { Metadata } from "next";
import { Jost, Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "One of One Automotive — Heliopolis, Cairo",
  description:
    "Cairo's finest selection of luxury and sports cars. Mercedes, Porsche, Range Rover, BMW, Audi — curated, immediate delivery, flexible finance.",
  icons: { icon: "/media/logo.jpg", apple: "/media/logo.jpg" },
  openGraph: {
    title: "One of One Automotive",
    description: "Cairo's finest selection of luxury & sports cars.",
    images: ["/media/car-02.webp"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#08080a" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the site ships its own AR/EN copy, so browser
    // auto-translation would only garble hand-written bilingual text.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${jost.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body className="bg-void text-bone antialiased">
        {/* No-JS escape for the section-reveal effect (globals.css `.reveal`):
            without JavaScript nothing ever adds `.is-visible`, so force the
            resting state visible instead of leaving content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
