"use client";

import { useEffect } from "react";
import DemoImperfecciones from "./DemoImperfecciones";

/**
 * Modal de demostracion: replica el formulario "Registrar imperfecciones"
 * del CALIDAD PLYWOOD. No guarda nada, solo vive en memoria del navegador.
 */
export default function DemoModal({
  producto,
  onCerrar,
}: {
  producto: string;
  onCerrar: () => void;
}) {
  // Bloquea el scroll del fondo mientras el modal esta abierto.
  useEffect(() => {
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-0 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Demostracion de ${producto}`}
    >
      {/* Clic fuera del panel cierra */}
      <div className="absolute inset-0" onClick={onCerrar} aria-hidden="true" />

      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:h-[min(92vh,900px)] md:max-w-3xl md:rounded-3xl">
        <DemoImperfecciones producto={producto} onCerrar={onCerrar} />
      </div>
    </div>
  );
}
