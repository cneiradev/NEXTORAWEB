export default function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-20 left-0 text-[12rem] font-extrabold text-muted/10 select-none">
          01
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
                Nosotros
              </span>
              <h1 className="text-title-lg md:text-[64px] font-extrabold text-foreground mb-6 tracking-tight leading-none text-balance">
                Una empresa tecnológica, no solo una de software.
              </h1>
            </div>
            <div className="space-y-6 text-body-lg text-muted-foreground leading-relaxed">
              <p>
                En NEXORA TECH diseñamos y desarrollamos soluciones tecnológicas
                a medida para empresas que buscan escalar sus operaciones. No
                vendemos software genérico: construimos productos digitales que
                resuelven problemas reales de negocio.
              </p>
              <p>
                Actuamos como tu partner tecnológico desde la idea inicial hasta
                el despliegue y la evolución continua del producto. Nuestro
                equipo combina experiencia en desarrollo de plataformas SaaS,
                integración de sistemas y diseño de experiencias digitales
                premium.
              </p>
              <p>
                Confianza, modernidad y profesionalismo son los pilares con los
                que trabajamos: cada línea de código que escribimos está pensada
                para durar, crecer y generar valor.
              </p>
            </div>
          </div>

          <div className="mt-20 relative h-[400px] rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent" />
            <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30" />
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20" />
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { n: "+150", l: "Empresas confían en nosotros" },
              { n: "+20.000", l: "Usuarios activos" },
              { n: "100%", l: "Desarrollo a medida" },
            ].map((s) => (
              <div key={s.l} className="p-8 rounded-2xl card border border-border bg-card text-center">
                <div className="text-4xl font-extrabold text-foreground mb-2">{s.n}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}