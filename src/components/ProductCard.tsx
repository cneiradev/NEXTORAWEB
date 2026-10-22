export function ProductCard({
  title,
  description,
  status,
  href,
}: {
  title: string;
  description: string;
  status: string;
  href: string;
}) {
  const disponible = status === "disponible";
  return (
    <div className="p-10 rounded-2xl card border border-border flex flex-col hover:border-primary/50 transition-colors group">
      <div className="flex items-center gap-2 mb-8">
        <span
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
            disponible
              ? "bg-ok/10 text-ok border border-ok/20"
              : "bg-progreso/10 text-progreso border border-progreso/20"
          }`}
        >
          {disponible ? "Disponible" : "Próximamente"}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm group-hover:shadow-primary/25"
      >
        Ir al sistema <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}