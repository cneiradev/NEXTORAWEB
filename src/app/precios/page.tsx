import { PreciosSection } from "@/components/PreciosSection";
import { ContactoFinal } from "@/components/ContactoFinal";

export default function Precios() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            Precios
          </span>
          <h1 className="text-title-lg md:text-[64px] font-extrabold text-foreground mb-6 tracking-tight leading-none text-balance">
            Planes y precios
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Los precios se acuerdan directamente contigo. Todos los planes
            incluyen IVA (19%).
          </p>
        </div>
      </section>
      <PreciosSection />
      <ContactoFinal />
    </div>
  );
}