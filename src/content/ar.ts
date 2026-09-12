import type { SiteContent } from "@/i18n/schema";

export const ar: SiteContent = {
  locale: "ar",
  dir: "rtl",
  brand: {
    name: "ون أوف ون أوتوموتيف",
    shortName: "ONE ØF ONE",
    tagline: "أفخم تشكيلة سيارات فاخرة ورياضية في القاهرة",
  },
  nav: [
    { label: "التشكيلة", href: "#collection" },
    { label: "الماركات", href: "#marques" },
    { label: "المعرض", href: "#showroom" },
    { label: "زورنا", href: "#visit" },
  ],
  hero: {
    eyebrow: "مصر الجديدة، القاهرة",
    headline: "قودها أبعد من التوقعات",
    sub: "مرسيدس، بورش، رينج روفر، بي إم دبليو، أودي — بنختارهم بعناية على الحالة والفئة والطابع. كل عربية في المعرض واحدة من نوعها.",
    primaryCta: "شوف التشكيلة",
    secondaryCta: "زور المعرض",
  },
  about: {
    heading: "سيارة واحدة. مستوى واحد. ون أوف ون.",
    body: [
      "بنختار كل سيارة بإيدينا قبل ما تدخل المعرض. مرسيدس، بورش، رينج روفر، بي إم دبليو، أودي — مختارة بالحالة والفئة والطابع، مش مجرد أرقام في المخزن.",
      "استلام فوري وتقسيط مرن. من أول ما تشوف العربية لحد ما تستلمها، هتحس إن كل حاجة اتحسبت بنفس مستوى العربيات اللي بنبيعها.",
    ],
  },
  services: {
    heading: "بنشتغل إزاي",
    intro: "بساطة ووضوح، زي ما تستاهل عربية بالمستوى ده.",
    items: [
      {
        title: "استلام فوري",
        body: "اللي بتشوفه في المعرض جاهز تمشي بيه. من غير قوائم انتظار ولا تأجيل.",
      },
      {
        title: "تقسيط مرن",
        body: "خطط تقسيط على مقاسك، وهنشرحلك كل الشروط قبل ما توقّع أي حاجة.",
      },
      {
        title: "تشكيلة مختارة",
        body: "بنفحص كل عربية ونحدد فئتها قبل ما تاخد مكانها في المعرض. الحالة الأول، دايمًا.",
      },
      {
        title: "بنستبدل عربيتك",
        body: "هات عربيتك الحالية، هنقيّمها بأمانة ونحسبها من سعر الجديدة.",
      },
    ],
  },
  gallery: {
    heading: "التشكيلة",
    intro: "لمحة من عربيات المعرض.",
    items: [],
  },
  contact: {
    heading: "تعالى شوفهم بنفسك",
    intro: "الصور مهما كانت مش هتوصّل الإحساس. المعرض مفتوح طول أيام الأسبوع.",
    addressLabel: "المعرض",
    address: "١٥١ شارع السيد المرغني، الماظة، مصر الجديدة، القاهرة",
    phoneLabel: "كلمنا",
    phones: ["٠١٠ ٠٠٥٥ ٨٥٥٧", "٠١١ ٥٨٢٢ ٠٠٥٢", "٠١١ ٥٩٤١ ٠١٣٧"],
    hoursLabel: "المواعيد",
    hours: "يومياً، ١١ صباحاً — ١١ مساءً",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=One+of+One+Automotive+151+El+Sayed+El+Merghany+Heliopolis+Cairo",
    instagramUrl: "https://www.instagram.com/oneofone.automotive/",
    facebookUrl: "https://www.facebook.com/oneofonecars/",
    cta: "الاتجاهات على الخريطة",
  },
  footer: {
    rights: "© ون أوف ون أوتوموتيف. كل الحقوق محفوظة.",
  },
  a11y: {
    toggleLanguage: "التبديل إلى الإنجليزية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
};
