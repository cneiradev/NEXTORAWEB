const productosDestacados = [
  {
    name: "Gestión de Operaciones",
    description: "Plataforma para organizar documentos, procesos y control operativo.",
    icon: "📊",
    href: "/productos/gestion-operaciones",
  },
  {
    name: "Calidad Plywood",
    description: "Control de calidad y trazabilidad para tableros de madera y derivados.",
    icon: "🪵",
    href: "/productos/calidad-plywood",
  },
  {
    name: "Próximos productos",
    description: "Nuevas soluciones en desarrollo. Contáctanos para acceder primero.",
    icon: "🚀",
    href: "/contacto",
  },
];

export function ProductosTeaser() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute -top-20 right-0 text-[12rem] font-extrabold text-muted/10 select-none">
        02
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-title-lg md:text-[56px] font-extrabold text-foreground mb-6 tracking-tight">
            Nuestros productos
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluciones SaaS propias desarrolladas por NEXORA TECH.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {productosDestacados.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="block p-8 rounded-2xl bg-foreground text-white hover:bg-primary transition-all group relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors">
                <span className="text-xl">{p.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
              <p className="text-white/80 mb-6">{p.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Ver más →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}