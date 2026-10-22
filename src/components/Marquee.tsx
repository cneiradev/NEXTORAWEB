export function Marquee() {
  const phrases = ["AUTOMATIZAMOS.", "ESCALAMOS.", "DIGITALIZAMOS.", "OPTIMIZAMOS."];

  return (
    <section className="overflow-hidden py-6 border-y border-border bg-background">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {phrases.map((p) => (
          <span key={p} className="px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-primary opacity-60">
            {p}
          </span>
        ))}
        {phrases.map((p) => (
          <span key={p + "-2"} className="px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-primary opacity-60">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}