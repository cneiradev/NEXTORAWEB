export function SocialProof() {
  const stats = [
    { label: "Empresas confían en nosotros", value: "+150" },
    { label: "Usuarios activos", value: "+20.000" },
    { label: "Desarrollo 100% a medida", value: "100%" },
  ];

  const clientLogos = ["Cliente A", "Cliente B", "Cliente C", "Cliente D"];

  return (
    <section className="py-12 px-6 bg-card border-b border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-foreground">{s.value}</span>
              <span className="text-muted-foreground font-medium">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {clientLogos.map((logo, i) => (
            <div key={logo} className="flex items-center justify-center h-10 w-24 border border-border rounded-lg bg-muted/40">
              <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}