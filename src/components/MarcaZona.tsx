"use client";

import { useRef, useState } from "react";

export type Zona = { x: number; y: number; w: number; h: number };

/**
 * Permite marcar visualmente una zona sobre la foto arrastrando el dedo o el
 * mouse. Las coordenadas se guardan en porcentajes (0-100) para que el
 * marcado se vea igual sea cual sea el tamano real de la imagen.
 */
export default function MarcaZona({
  url,
  zona,
  onChange,
}: {
  url: string;
  zona?: Zona;
  onChange: (z: Zona | undefined) => void;
}) {
  const contRef = useRef<HTMLDivElement>(null);
  const [arrastre, setArrastre] = useState<{
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  } | null>(null);

  function aPorcentaje(e: React.PointerEvent) {
    const rect = contRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)),
    };
  }

  function iniciar(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const p = aPorcentaje(e);
    setArrastre({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
  }

  function mover(e: React.PointerEvent) {
    if (!arrastre) return;
    const p = aPorcentaje(e);
    setArrastre((s) => (s ? { ...s, x1: p.x, y1: p.y } : s));
  }

  function soltar(e: React.PointerEvent) {
    if (!arrastre) return;
    const p = aPorcentaje(e);
    const x = Math.min(arrastre.x0, p.x);
    const y = Math.min(arrastre.y0, p.y);
    const w = Math.abs(p.x - arrastre.x0);
    const h = Math.abs(p.y - arrastre.y0);
    setArrastre(null);
    // Un arrastre muy pequeno se interpreta como un clic: se limpia la zona.
    if (w < 2 || h < 2) {
      onChange(undefined);
      return;
    }
    onChange({ x, y, w, h });
  }

  const activa = zona
    ? { left: `${zona.x}%`, top: `${zona.y}%`, width: `${zona.w}%`, height: `${zona.h}%` }
    : null;

  const vista = (arrastre
    ? {
        left: `${Math.min(arrastre.x0, arrastre.x1)}%`,
        top: `${Math.min(arrastre.y0, arrastre.y1)}%`,
        width: `${Math.abs(arrastre.x1 - arrastre.x0)}%`,
        height: `${Math.abs(arrastre.y1 - arrastre.y0)}%`,
      }
    : null) ?? activa;

  return (
    <div
      ref={contRef}
      onPointerDown={iniciar}
      onPointerMove={mover}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      className="relative w-full cursor-crosshair touch-none select-none overflow-hidden rounded-xl bg-slate-900"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Tablero inspeccionado" className="block w-full" draggable={false} />
      {vista && (
        <div
          className="pointer-events-none absolute rounded-md border-2 border-amber-400 bg-amber-400/25"
          style={vista}
        >
          <span className="absolute -top-6 left-0 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            Zona marcada
          </span>
        </div>
      )}
      {!vista && (
        <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white">
          Arrastra para marcar la zona del defecto
        </span>
      )}
    </div>
  );
}
