import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { SocialProof } from "@/components/SocialProof"
import { QuienesSomos } from "@/components/QuienesSomos"
import { ServiciosBento } from "@/components/ServiciosBento"
import { ProductosTeaser } from "@/components/ProductosTeaser"
import { PreciosSection } from "@/components/PreciosSection"
import { ContactoFinal } from "@/components/ContactoFinal"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Marquee />
      <SocialProof />
      <QuienesSomos />
      <ServiciosBento />
      <ProductosTeaser />
      <PreciosSection />
      <ContactoFinal />
    </div>
  )
}
