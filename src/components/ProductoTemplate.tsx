import Link from "next/link";
import { BrowserMockup } from "./BrowserMockup";
import { mockups } from "./ProductoMocks";
import DemoBoton from "./DemoBoton";

export type ProductoData = {
  slug: string;
  nombre: string;
  descripcionCorta: string;
  mockupUrl?: string;
  bloques: {
    titulo: string;
    texto: string;
    checks: string[];
    mockup: "dashboard" | "empresas" | "mobile" | "reportes";
    invertido?: boolean;
    tamanoGrande?: boolean;
  }[];
  beneficios: { titulo: string; texto: string }[];
  planes: {
    nombre: string;
    precio: string;
    descripcion: string;
    caracteristicas: string[];
    destacado?: boolean;
  }[];
};

export function ProductoTemplate({ producto }: { producto: ProductoData }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full filter blur-3xl" />

        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold uppercase tracking-widest mb-8">
            Producto by <span className="text-secondary">NEXORA TECH</span>
          </span>
          <h1 className="text-title-lg md:text-[72px] font-extrabold text-foreground tracking-tight leading-none text-balance mb-6">
            {producto.nombre}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {producto.descripcionCorta}
          </p>
        </div>
      </section>

      {/* BLOQUES IMAGEN + TEXTO (asimétricos) */}
      <section className="pb-24 px-6">
        <div className="mx-auto max-w-7xl space-y-24">
          {producto.bloques.map((bloque, i) => {
            const Mockup = mockups[bloque.mockup];
            const imagen = (
              <div className={bloque.tamanoGrande ? "lg:col-span-7" : "lg:col-span-5"}>
                <BrowserMockup url={producto.mockupUrl}>
                  <Mockup />
                </BrowserMockup>
              </div>
            );
            const texto = (
              <div
                className={`flex flex-col justify-center ${
                  bloque.tamanoGrande ? "lg:col-span-5 lg:pr-8" : "lg:col-span-7 lg:pl-8"
                }`}
              >
                <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 tracking-tight leading-tight">
                  {bloque.titulo}
                </h2>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {bloque.texto}
                </p>
                <ul className="space-y-3">
                  {bloque.checks.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-foreground">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-ok/15 text-ok flex items-center justify-center text-xs font-bold border border-ok/30 shrink-0">
                        ✓
                      </span>
                      <span className="text-sm leading-snug">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <div key={bloque.titulo} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {bloque.invertido ? (
                  <>
                    {texto}
                    {imagen}
                  </>
                ) : (
                  <>
                    {imagen}
                    {texto}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ¿POR QUÉ ES EL MEJOR SISTEMA? */}
      <section className="py-24 px-6 bg-foreground relative overflow-hidden">
        <div className="absolute -top-24 -right-16 text-[14rem] font-extrabold text-white/5 select-none leading-none">
          01
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <h2 className="text-title-lg md:text-[56px] font-extrabold text-white mb-16 tracking-tight max-w-2xl">
            ¿Por qué es el mejor sistema?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {producto.beneficios.map((b, i) => (
              <div key={b.titulo} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-5xl font-extrabold text-secondary mb-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{b.titulo}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOBLE CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
          <div className="p-10 md:p-12 rounded-2xl bg-foreground text-white relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-3xl font-extrabold mb-4">Contrata ahora</h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Activa {producto.nombre} hoy y comienza a transformar tus
              operaciones. Precio acordado directamente contigo, sin sorpresas.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-3.5 rounded-xl bg-white text-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Contratar ahora
            </Link>
          </div>
          <div className="p-10 md:p-12 rounded-2xl bg-primary text-white relative overflow-hidden">
            <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
            <h3 className="text-3xl font-extrabold mb-4">Ver demo</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              Conoce {producto.nombre} en acción. Prueba el registro de
              inspecciones directamente en esta página, sin instalar nada.
            </p>
            <DemoBoton
              producto={producto.nombre}
              className="inline-block px-8 py-3.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
            />
          </div>
        </div>
      </section>


      {/* PLANES DEL PRODUCTO */}
      <section className="pb-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-title-lg md:text-[48px] font-extrabold text-foreground tracking-tight">
              Planes
            </h2>
            <p className="text-muted-foreground mt-4">
              Precios acordados directamente contigo. IVA incluido.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {producto.planes.map((plan) => (
              <div
                key={plan.nombre}
                className={`p-10 rounded-2xl border relative ${
                  plan.destacado
                    ? "border-primary bg-card ring-2 ring-primary/20 shadow-xl shadow-primary/10"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                {plan.destacado && (
                  <span className="absolute -top-3.5 left-10 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.nombre}</h3>
                <div className="text-3xl font-extrabold mb-6">{plan.precio}</div>
                <p className="text-sm text-muted-foreground mb-6">{plan.descripcion}</p>
                <ul className="space-y-3 mb-8">
                  {plan.caracteristicas.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-ok/10 text-ok flex items-center justify-center text-xs font-bold border border-ok/20">
                        ✓
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contacto"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-colors ${
                    plan.destacado
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-background border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  Elegir plan {plan.nombre}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

