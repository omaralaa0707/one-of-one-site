import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Collection } from "@/components/site/collection";
import { Marques } from "@/components/site/marques";
import { Showroom } from "@/components/site/showroom";
import { Visit } from "@/components/site/visit";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Collection />
        <Marques />
        <Showroom />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
