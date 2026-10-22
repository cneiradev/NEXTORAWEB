export function Hero() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Elementos abstractos flotantes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse" />
      <div className="absolute top-1/3 right-[16%] w-80 h-80 bg-accent/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-20 left-1/5 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" />

      <div className="mx-auto max-w-7xl relative z-10 text-center">
        <span className="text-title-lg md:text-[80px] font-extrabold text-foreground tracking-tight leading-none text-balance">
          Desarrollamos el software que hace crecer tu empresa
        </span>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Creamos soluciones tecnológicas a medida para empresas que necesitan
          escalar, automatizar y digitalizar sus operaciones. Tu partner
          tecnológico de confianza.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/productos"
            className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Ver productos
          </a>
          <a
            href="/contacto"
            className="px-8 py-4 rounded-2xl border border-border bg-background text-foreground font-semibold text-lg hover:bg-accent transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}