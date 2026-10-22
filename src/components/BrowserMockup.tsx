export function BrowserMockup({
  url = "app.nexoratech.com",
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-foreground/10 ${className}`}
    >
      {/* Barra de navegador */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <div className="ml-3 flex-1 px-3 py-1 rounded-md bg-background text-xs text-muted-foreground truncate">
          {url}
        </div>
      </div>
      {/* Contenido del mockup */}
      <div className="bg-background">{children}</div>
    </div>
  );
}