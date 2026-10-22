export function QuienesSomos() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Número de fondo */}
      <div className="absolute -top-20 left-0 text-[12rem] font-extrabold text-muted/10 select-none">
        01
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-title-lg md:text-[64px] font-extrabold text-foreground mb-6 tracking-tight leading-tight">
              Una empresa tecnológica, no solo una de software.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Somos una empresa dedicada a crear soluciones tecnológicas a
              medida. No vendemos software genérico: construimos productos
              digitales que resuelven problemas reales de tu negocio. Actuamos
              como tu partner tecnológico, acompañándote desde la idea hasta el
              despliegue y la escalabilidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                Desarrollo a medida
              </span>
              <span className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium">
                SaaS propio
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            {/* Ilustración abstracta tech */}
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30" />
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}