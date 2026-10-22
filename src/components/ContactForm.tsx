"use client";

import { useState } from "react";

export function ContactForm({
  mode = "contacto",
}: {
  mode?: string;
}) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // Simula envío (sin backend). Reemplazar por Formspree/EmailJS/webhook.
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1200);
  };

  if (enviado) {
    return (
      <div className="bg-ok/10 border border-ok/20 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-ok text-ok-foreground flex items-center justify-center text-xl mx-auto mb-4">
          ✓
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">¡Gracias!</h3>
        <p className="text-muted-foreground">
          Hemos recibido tu solicitud. Te contactaremos para acordar tu plan y fecha de activación.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground block">Nombre completo</label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Juan Pérez"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground block">Correo electrónico</label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="juan@empresa.cl"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Empresa / Organización
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Mi empresa SpA"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground block">Mensaje</label>
        <textarea
          required
          rows={4}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Cuéntanos cuántas empresas necesitas gestionar y qué plan te interesa."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={enviando}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold disabled:opacity-60 hover:bg-primary/90 transition-colors shadow-sm"
      >
        {enviando
          ? "Enviando..."
          : mode === "cotizar"
            ? "Solicitar cotización"
            : "Enviar mensaje"}
      </button>
      <p className="text-sm text-muted-foreground text-center">
        Los precios se acordan directamente contigo. Pago manual por transferencia.
      </p>
    </form>
  );
}