const servicios = [
  {
    title: "Desarrollo SaaS",
    description: "Plataformas escalables basadas en la nube, listas para crecer con tu empresa.",
    icon: "☁️",
    span: 1,
  },
  {
    title: "Software a Medida",
    description: "Soluciones personalizadas diseñadas específicamente para tus procesos y flujos de trabajo.",
    icon: "🔧",
    span: 1,
  },
  {
    title: "Integración de Sistemas",
    description: "Conectamos tus herramientas actuales para que trabajen como un solo ecosistema.",
    icon: "🔗",
    span: 1,
  },
  {
    title: "Soporte y Escalabilidad",
    description: "Acompañamiento continuo y arquitectura que crece junto a tu negocio.",
    icon: "📈",
    span: 1,
  },
];

export function ServiciosBento() {
  return (
    <section className="py-24 px-6 bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-title-lg md:text-[56px] font-extrabold text-foreground mb-6 tracking-tight">
            Qué hacemos
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Servicios de desarrollo tecnológico diseñados para empresas que
            quieren evolucionar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div
              key={s.title}
              className={`p-8 rounded-2xl card border border-border bg-card hover:border-primary/50 transition-all group ${s.span > 1 ? "md:col-span-2" : ""}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}