const planes = [
  {
    nombre: "Básico",
    precio: "Consultar precio",
    descripcion:
      "Para equipos que están empezando a digitalizar sus procesos.",
    caracteristicas: [
      "Hasta 5 empresas/clientes",
      "Documentos y checklists ilimitados",
      "Soporte por correo",
    ],
  },
  {
    nombre: "Pro",
    precio: "Consultar precio",
    descripcion:
      "Para empresas en crecimiento con mayor carga operativa.",
    caracteristicas: [
      "Empresas/clientes ilimitados",
      "Documentos y checklists ilimitados",
      "Soporte prioritario por WhatsApp",
    ],
    destacado: true,
  },
];

export function PreciosSection() {
  return (
    <section className="py-24 px-6 bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-title-lg md:text-[56px] font-extrabold text-foreground mb-6 tracking-tight">
            Planes
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Los precios se acuerdan directamente contigo. Todos los planes
            incluyen IVA (19%).
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`p-10 rounded-2xl card border relative ${
                plan.destacado
                  ? "border-primary ring-2 ring-primary/20 bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-3.5 left-10 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                  Más popular
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {plan.nombre}
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-foreground">
                  {plan.precio}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {plan.descripcion}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.caracteristicas.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-ok/10 text-ok flex items-center justify-center text-xs font-bold border border-ok/20">
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <a
                href="/contacto"
                className={`block w-full py-3.5 rounded-xl font-semibold transition-colors text-center ${
                  plan.destacado
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-background border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {plan.destacado ? "Elegir plan Pro" : "Elegir plan Básico"}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            ¿Tienes dudas? Escríbenos por el{" "}
            <a
              href="/contacto"
              className="text-primary hover:text-primary/90 transition-colors underline underline-offset-4"
            >
              formulario de contacto
            </a>{" "}
            y acordamos tu plan y fecha de activación.
          </p>
        </div>
      </div>
    </section>
  );
}