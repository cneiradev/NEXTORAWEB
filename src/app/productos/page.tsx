import Link from "next/link";

const productos = [
  {
    title: "Archivador Digital - Prevención de Riesgos",
    description:
      "Carpeta digital para la gestión documental de prevención de riesgos: empresas, trabajadores, contratistas, checklists y documentos.",
    icon: "📁",
    status: "Disponible",
    href: "/productos/archivador-digital-prevencion-riesgos",
  },
  {
    title: "Calidad Plywood",
    description:
      "Control de calidad y trazabilidad para tableros de madera y derivados.",
    icon: "🪵",
    status: "Disponible",
    href: "/productos/calidad-plywood",
  },
  {
    title: "Próximos productos",
    description:
      "Nuevas soluciones en desarrollo. Contáctanos para ser de los primeros en acceder.",
    icon: "🚀",
    status: "Próximamente",
    href: "/contacto",
  },
];

export default function Productos() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-20 right-0 text-[12rem] font-extrabold text-muted/10 select-none">
          03
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              Productos SaaS
            </span>
            <h1 className="text-title-lg md:text-[64px] font-extrabold text-foreground mb-6 tracking-tight leading-none text-balance">
              Nuestros productos
            </h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Soluciones SaaS propias, desarrolladas de cero por nuestro equipo
              para resolver problemas reales de negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productos.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className={`block p-10 rounded-2xl border transition-all group ${
                  p.status === "Próximamente"
                    ? "border-border bg-card opacity-70 hover:opacity-100"
                    : "bg-foreground text-white border-foreground hover:bg-primary hover:border-primary"
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-4xl">{p.icon}</span>
                  <span
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                      p.status === "Disponible"
                        ? "bg-ok/20 text-ok border border-ok/40"
                        : "bg-secondary/20 text-secondary border border-secondary/40"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:tracking-tight transition-all">
                  {p.title}
                </h3>
                <p className="mb-8 leading-relaxed opacity-80">{p.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Ver más{" "}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm">
              ¿Necesitas otra herramienta?{" "}
              <Link
                href="/contacto"
                className="text-primary hover:text-primary/90 transition-colors underline underline-offset-4"
              >
                Escríbenos
              </Link>{" "}
              y acordamos una solución a medida.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}