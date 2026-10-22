/* Mockups dibujados con UI (nunca capturas planas) */

export function MockDashboard() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-7 w-24 rounded-lg bg-primary" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["bg-primary/15", "bg-secondary/40", "bg-accent/20"].map((c, i) => (
          <div key={i} className={`rounded-xl p-3 space-y-2 ${c}`}>
            <div className="h-3 w-12 rounded bg-foreground/20" />
            <div className="h-6 w-16 rounded bg-foreground/40" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border p-4">
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t ${i % 2 ? "bg-primary" : "bg-primary/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
            <span className="w-4 h-4 rounded-full bg-ok/80" />
            <div className="h-3 flex-1 rounded bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockEmpresas() {
  return (
    <div className="p-5 space-y-3">
      <div className="h-4 w-28 rounded bg-muted" />
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border p-3 space-y-2 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
                {i}
              </span>
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
            <div className="h-2.5 w-full rounded bg-muted" />
            <div className="h-2.5 w-2/3 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockMobile() {
  return (
    <div className="flex justify-center p-6">
      <div className="w-40 rounded-[2rem] border-4 border-foreground/80 p-3 space-y-3 bg-card shadow-xl">
        <div className="mx-auto h-1.5 w-14 rounded-full bg-muted" />
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="rounded-xl bg-primary/15 p-3 space-y-2">
          <div className="h-3 w-12 rounded bg-primary/60" />
          <div className="h-5 w-16 rounded bg-foreground/30" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-ok/80" />
            <div className="h-2.5 flex-1 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockReportes() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="flex gap-2">
          <span className="h-6 w-16 rounded-md bg-muted" />
          <span className="h-6 w-16 rounded-md bg-primary" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-4 flex items-end gap-1.5 h-32">
          {[55, 80, 45, 90, 70].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-secondary/70" />
          ))}
        </div>
        <div className="rounded-xl border border-border p-4 grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg bg-muted p-2 space-y-1.5">
              <div className="h-2 w-8 rounded bg-foreground/25" />
              <div className="h-4 w-10 rounded bg-foreground/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const mockups = {
  dashboard: MockDashboard,
  empresas: MockEmpresas,
  mobile: MockMobile,
  reportes: MockReportes,
};
