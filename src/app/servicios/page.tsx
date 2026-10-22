import Link from "next/link";
import { ServiciosBento } from "@/components/ServiciosBento";
import { ContactoFinal } from "@/components/ContactoFinal";

export default function Servicios() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-20 right-0 text-[12rem] font-extrabold text-muted/10 select-none">
          02
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              Servicios
            </span>
            <h1 className="text-title-lg md:text-[64px] font-extrabold text-foreground mb-6 tracking-tight leading-none text-balance">
              Desarrollo de software para empresas que quieren crecer.
            </h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Desde plataformas SaaS hasta integraciones críticas: construimos
              el software que tu empresa necesita, con estándares de calidad
              internacionales.
            </p>
            <div className="mt-8">
              <Link
                href="/contacto"
                className="inline-block px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiciosBento />
      <ContactoFinal />
    </div>
  );
}