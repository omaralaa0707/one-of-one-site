import type { SiteContent } from "@/i18n/schema";

export const en: SiteContent = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "One of One Automotive",
    shortName: "ONE ØF ONE",
    tagline: "Cairo's finest selection of luxury & sports cars",
  },
  nav: [
    { label: "Collection", href: "#collection" },
    { label: "Marques", href: "#marques" },
    { label: "Showroom", href: "#showroom" },
    { label: "Visit", href: "#visit" },
  ],
  hero: {
    eyebrow: "Heliopolis, Cairo",
    headline: "Drive beyond expectations",
    sub: "Mercedes, Porsche, Range Rover, BMW, Audi — hand-picked for condition, specification and character. Every car on the floor is one of one.",
    primaryCta: "View the collection",
    secondaryCta: "Visit the showroom",
  },
  about: {
    heading: "One car. One standard. One of One.",
    body: [
      "We hand-pick every car that enters the showroom. Mercedes, Porsche, Range Rover, BMW, Audi — selected for condition, specification and character, not just for stock.",
      "Immediate delivery and flexible finance. From the first walk-around to the handover, the experience is built to feel as considered as the cars themselves.",
    ],
  },
  services: {
    heading: "How we work",
    intro: "Straightforward, the way buying a car this good should be.",
    items: [
      {
        title: "Immediate delivery",
        body: "What you see in the showroom is ready to drive home. No waiting lists, no allocation games.",
      },
      {
        title: "Flexible finance",
        body: "Installment plans arranged around you, with terms explained in full before anything is signed.",
      },
      {
        title: "Selected inventory",
        body: "Every car inspected and specified before it earns a place on the floor. Condition first, always.",
      },
      {
        title: "Trade-in welcome",
        body: "Bring your current car. We'll value it honestly and put it against your next one.",
      },
    ],
  },
  gallery: {
    heading: "The collection",
    intro: "A look inside the showroom floor.",
    items: [],
  },
  contact: {
    heading: "Come see them in person",
    intro: "Photographs only go so far. The showroom is open seven days.",
    addressLabel: "Showroom",
    address: "151 El Sayed El Merghany, Almazah, Heliopolis, Cairo",
    phoneLabel: "Call us",
    phones: ["010 0055 8557", "011 5822 0052", "011 5941 0137"],
    hoursLabel: "Hours",
    hours: "Daily, 11:00 — 23:00",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=One+of+One+Automotive+151+El+Sayed+El+Merghany+Heliopolis+Cairo",
    instagramUrl: "https://www.instagram.com/oneofone.automotive/",
    facebookUrl: "https://www.facebook.com/oneofonecars/",
    cta: "Get directions",
  },
  footer: {
    rights: "© One of One Automotive. All rights reserved.",
  },
  a11y: {
    toggleLanguage: "Switch to Arabic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
