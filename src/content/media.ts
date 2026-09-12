/** Curated from the dealership's own Instagram, grouped by how each frame reads. */

export const HERO_FRAME = "/media/car-02.webp";

/** Front-on showroom shots under the hexagon ceiling — the strongest frames. */
export const SHOWROOM_FRAMES = [
  "/media/car-08.webp",
  "/media/car-11.webp",
  "/media/car-14.webp",
  "/media/car-23.webp",
  "/media/car-26.webp",
];

/** Wheels, calipers, badges — used for the tight-crop detail rail. */
export const DETAIL_FRAMES = [
  "/media/car-03.webp",
  "/media/car-09.webp",
  "/media/car-15.webp",
  "/media/car-24.webp",
  "/media/car-27.webp",
];

/** Cabins: tan leather, ambient light, quilted seats. */
export const INTERIOR_FRAMES = [
  "/media/car-01.webp",
  "/media/car-10.webp",
  "/media/car-12.webp",
  "/media/car-18.webp",
  "/media/car-25.webp",
  "/media/car-22.webp",
];

export type Marque = { name: string; frame: string };

/** Marques taken from their own highlight reels, paired with a real photo. */
export const MARQUES: Marque[] = [
  { name: "Mercedes-Benz", frame: "/media/car-11.webp" },
  { name: "Audi", frame: "/media/car-23.webp" },
  { name: "BMW", frame: "/media/car-13.webp" },
  { name: "Range Rover", frame: "/media/car-17.webp" },
  { name: "Porsche", frame: "/media/car-07.webp" },
  { name: "MINI", frame: "/media/car-21.webp" },
  { name: "Škoda", frame: "/media/car-26.webp" },
];

/** The collection rail: alternating wide/tall frames keeps the rhythm uneven. */
export const COLLECTION = [
  { src: "/media/car-02.webp", tall: false },
  { src: "/media/car-04.jpg", tall: true },
  { src: "/media/car-10.webp", tall: false },
  { src: "/media/car-16.webp", tall: true },
  { src: "/media/car-14.webp", tall: false },
  { src: "/media/car-18.webp", tall: false },
  { src: "/media/car-05.jpg", tall: true },
  { src: "/media/car-23.webp", tall: false },
  { src: "/media/car-25.webp", tall: false },
  { src: "/media/car-27.webp", tall: false },
];
