const features = [
  {
    title: "Documentos organizados",
    description: "Sube y clasifica todos tus documentos de prevención en un solo lugar.",
  },
  {
    title: "Checklists digitales",
    description: "Ejecuta checklists de inspección desde cualquier dispositivo.",
  },
  {
    title: "Control de vencimientos",
    description: "Recibe alertas antes de que vencan certificados y capacitaciones.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
            Todo lo que necesitas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluciones web para equipos independientes y empresas que buscan ordenar su operación digitalmente.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-10 rounded-2xl card border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span aria-hidden="true">✦</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}