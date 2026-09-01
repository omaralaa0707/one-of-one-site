# One of One Automotive — concept site

A concept marketing site for **One of One Automotive**, a luxury and sports car
dealership in Heliopolis, Cairo. Bilingual (Arabic / English) with a language
toggle and full RTL support.

Photography and copy tone are drawn from the dealership's own Instagram
([@oneofone.automotive](https://www.instagram.com/oneofone.automotive/)) and
Facebook. This is an unofficial concept, not affiliated with the dealership.

## Design notes

- **3D signature** — the brand's slashed-Ø mark rebuilt as real geometry
  (react-three-fiber): a glass torus with a polished-metal slash, damped toward
  the cursor so it feels weighted rather than glued to the pointer.
- **Palette** sampled from the showroom itself: near-black walls, tan leather,
  chrome trim.
- **Motion** — Lenis and GSAP ScrollTrigger share one clock; the collection rail
  is pinned and panned by vertical scroll, and reverses direction in Arabic.
- **Type** — Jost (geometric, matching the logo's construction) with Tajawal for
  Arabic, which gets its own type scale since Arabic sets visually larger.
- Everything respects `prefers-reduced-motion`, including a static SVG fallback
  for the WebGL mark.

## Local development

```bash
pnpm install
pnpm dev
```

Built with Next.js 16, React 19, Tailwind v4, GSAP, Lenis and react-three-fiber.
Designed and built by Claude.
