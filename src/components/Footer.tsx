import Link from "next/link";

const productos = [
  { name: "Gestión de Operaciones", href: "/productos/gestion-operaciones" },
  { name: "Calidad Plywood", href: "/productos/calidad-plywood" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground mt-auto pt-16 pb-10">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-bold tracking-wider">
                N
              </span>
              <span className="tracking-tight">NEXORA TECH</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Empresa tecnológica dedicada a crear soluciones de software a
              medida y plataformas SaaS. Desarrollamos el software que hace
              crecer tu empresa.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Productos
            </h4>
            <ul className="space-y-3">
              {productos.map((p) => (
                <li key={p.name}>
                  <Link
                    href={p.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/productos"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Nosotros", href: "/nosotros" },
                { name: "Servicios", href: "/servicios" },
                { name: "Precios", href: "/precios" },
                { name: "Contacto", href: "/contacto" },
              ].map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} NEXORA TECH. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs">
            Soluciones tecnológicas a medida.
          </p>
        </div>
      </div>
    </footer>
  );
}