"use client";

import { useState } from "react";
import DemoModal from "./DemoModal";

/**
 * Boton "Ver demo" que abre la demostracion interactiva en un modal.
 * Reemplaza al enlace "Solicitar demo".
 */
export default function DemoBoton({
  producto,
  className = "",
}: {
  producto: string;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={className}
      >
        Ver demo
      </button>
      {abierto && (
        <DemoModal producto={producto} onCerrar={() => setAbierto(false)} />
      )}
    </>
  );
}
