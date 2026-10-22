export function ContactoFinal() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/90" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl" />
      <div className="absolute bottom-0 right-[16%] w-80 h-80 bg-white/10 rounded-full mix-blend-screen filter blur-3xl" />

      <div className="mx-auto max-w-3xl relative z-10 text-center">
        <h2 className="text-title-lg md:text-[48px] font-extrabold text-white mb-6 tracking-tight leading-tight">
          ¿Listo para llevar tu empresa al siguiente nivel?
        </h2>
        <p className="text-white/90 mb-10 max-w-lg mx-auto leading-relaxed">
          Hablemos de tu proyecto y construyamos el software que hace crecer tu
          negocio.
        </p>
        <a
          href="/contacto"
          className="inline-block px-8 py-4 rounded-2xl bg-white text-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}