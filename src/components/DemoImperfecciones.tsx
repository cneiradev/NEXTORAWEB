"use client";

import { useRef, useState } from "react";
import MarcaZona, { type Zona } from "./MarcaZona";

/* ------------------------------------------------------------------
   Replica del formulario "Registrar imperfecciones" de CALIDAD PLYWOOD.
   Todo vive en estado local: no hay API, ni Supabase, ni persistencia.
   Al desmontar el componente (cerrar el modal) todo se pierde.
   ------------------------------------------------------------------ */

const CALIDADES = ["AC", "BC", "CPC", "FD"];
const ESPECIES = ["Pinus", "Ocoote", "Eucalyptus", "Teca", "Alerce", "Araucaria"];
const MAQUINAS = ["RANURADORA"];
const ESPESORES = ["5.2", "9", "12", "18", "21"];
const TURNOS = ["1", "2", "3"];
const SEVERIDADES = ["Leve", "Moderada", "Critica"];

const DEFECTOS = [
  "Desastillado",
  "Quebrado",
  "Deslaminado",
  "Nudos",
  "Manchas / variacion de color",
  "Alabeo / warping",
  "Perforaciones de insecto",
  "Espesor fuera de tolerancia",
  "Cortes / astillas en canto",
  "Superficie rayada",
];

const STEPS = ["Datos del lote", "Control de calidad", "Fotos y comentario"];

const today = () => new Date().toISOString().slice(0, 10);

/* ---------------- estilos heredados del proyecto original ---------------- */

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-900 " +
  "outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

function Card({
  title,
  subtitle,
  step,
  children,
}: {
  title: string;
  subtitle?: string;
  step?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex items-start gap-3">
        {step !== undefined && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
            {step}
          </span>
        )}
        <div>
          <h2 className="text-base font-semibold leading-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  plain,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  /** Usa un div en vez de label (para grupos de botones). */
  plain?: boolean;
  children: React.ReactNode;
}) {
  const cabecera = (
    <span className="mb-1 flex min-h-[18px] items-start text-[13px] font-medium leading-[18px] text-slate-700">
      <span>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
    </span>
  );
  if (plain) {
    return (
      <div className="block h-full">
        {cabecera}
        {children}
        {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
      </div>
    );
  }
  return (
    <label className="block h-full">
      {cabecera}
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-1 flex-col gap-1.5">
          <div
            className={`h-1.5 rounded-full transition ${i <= current ? "bg-amber-500" : "bg-slate-200"}`}
          />
          <span
            className={`text-[11px] font-medium leading-tight ${
              i <= current ? "text-amber-700" : "text-slate-400"
            }`}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- fotos en memoria ---------------- */

/** Zona marcada sobre la foto, en porcentajes respecto de la imagen. */

type Foto = {
  id: string;
  nombre: string;
  url: string;
  sizeKb: number;
  zona?: Zona;
};

const MAX_MB = 6;
const MAX_FOTOS = 10;

/**
 * Reduce la imagen en el navegador (canvas) para no saturar la memoria:
 * ~4MB -> ~150KB. El archivo original nunca sale del dispositivo.
 */
async function comprimir(file: File): Promise<{ url: string; sizeKb: number }> {
  const dataUrl = await leerComoDataUrl(file);
  const img = await cargarImagen(dataUrl);
  const maxLado = 1400;
  const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
  const w = Math.round(img.width * escala);
  const h = Math.round(img.height * escala);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { url: dataUrl, sizeKb: Math.round(file.size / 1024) };
  ctx.drawImage(img, 0, 0, w, h);
  const salida = canvas.toDataURL("image/jpeg", 0.75);
  const bytes = Math.round(((salida.length - salida.indexOf(",") - 1) * 3) / 4);
  return { url: salida, sizeKb: Math.max(1, Math.round(bytes / 1024)) };
}

function leerComoDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
}

function cargarImagen(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Formato de imagen no valido"));
    img.src = src;
  });
}

/* ---------------- estado del formulario ---------------- */

type Lote = {
  codigoLote: string;
  especie: string;
  calidad: string;
  fechaTurno: string;
  turno: string;
  equipoSupervisor: string;
  gestion: string;
  operador: string;
  maquina: string;
  producto: string;
  codigoBoleta: string;
  espesor: string;
  horaProduccion: string;
};

type Inspeccion = {
  inspectorNombre: string;
  inspectorEquipo: string;
  inspectorSupervisor: string;
  fechaRegistro: string;
  codigoBoleta: string;
  calidadVerificada: string;
  severidad: string;
  descripcion: string;
  comentarioGeneral: string;
};

const emptyLote = (): Lote => ({
  codigoLote: "",
  especie: ESPECIES[0],
  calidad: "BC",
  fechaTurno: today(),
  turno: "1",
  equipoSupervisor: "",
  gestion: "",
  operador: "",
  maquina: MAQUINAS[0],
  producto: "",
  codigoBoleta: "",
  espesor: "9",
  horaProduccion: "",
});

const emptyInspeccion = (): Inspeccion => ({
  inspectorNombre: "",
  inspectorEquipo: "",
  inspectorSupervisor: "",
  fechaRegistro: today(),
  codigoBoleta: "",
  calidadVerificada: "",
  severidad: SEVERIDADES[0],
  descripcion: "",
  comentarioGeneral: "",
});

export default function DemoImperfecciones({
  producto,
  onCerrar,
}: {
  producto: string;
  onCerrar: () => void;
}) {
  const [step, setStep] = useState(0);
  const [lote, setLote] = useState<Lote>(emptyLote);
  const [insp, setInsp] = useState<Inspeccion>(emptyInspeccion);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [defectos, setDefectos] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [registros, setRegistros] = useState<
    { lote: Lote; insp: Inspeccion; defectos: string[]; fotos: Foto[]; fecha: string }[]
  >([]);
  const [vista, setVista] = useState<"form" | "dashboard">("form");
  const [pdfIndex, setPdfIndex] = useState<number | null>(null);

  const camRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);

  const setL = <K extends keyof Lote>(k: K, v: Lote[K]) =>
    setLote((s) => ({ ...s, [k]: v }));
  const setI = <K extends keyof Inspeccion>(k: K, v: Inspeccion[K]) =>
    setInsp((s) => ({ ...s, [k]: v }));

  const toggleDefecto = (d: string) =>
    setDefectos((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d]));

  /* -------- carga de fotos (solo en memoria) -------- */

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const nuevas: Foto[] = [];
      for (const file of Array.from(files).slice(0, MAX_FOTOS - fotos.length)) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > MAX_MB * 1024 * 1024) {
          throw new Error(`"${file.name}" supera ${MAX_MB} MB`);
        }
        const { url, sizeKb } = await comprimir(file);
        nuevas.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          nombre: file.name,
          url,
          sizeKb,
        });
      }
      if (nuevas.length > 0) setFotos((s) => [...s, ...nuevas]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la imagen");
    } finally {
      setBusy(false);
      if (camRef.current) camRef.current.value = "";
      if (galRef.current) galRef.current.value = "";
    }
  }

  const quitarFoto = (id: string) => setFotos((s) => s.filter((f) => f.id !== id));

  /* -------- marcado visual de la zona sobre la foto -------- */

  function setZona(id: string, zona: Zona | undefined) {
    setFotos((s) => s.map((f) => (f.id === id ? { ...f, zona } : f)));
  }

  const comentarioFinal = [
    insp.comentarioGeneral.trim(),
    defectos.length ? `Fallas observadas: ${defectos.join(", ")}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const step1Valid = lote.codigoLote.trim().length > 0;
  const step2Valid = insp.inspectorNombre.trim().length > 0;

  if (vista === "dashboard") {
    return (
      <div className="flex h-full flex-col bg-slate-50">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <h2 className="text-base font-semibold text-slate-900">Dashboard de registros</h2>
          <button
            type="button"
            onClick={() => {
              setVista("form");
              setStep(0);
              setLote(emptyLote);
              setInsp(emptyInspeccion);
              setFotos([]);
              setDefectos([]);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Nuevo registro
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {registros.length === 0 ? (
            <p className="text-center text-sm text-slate-500">Sin registros guardados.</p>
          ) : (
            <div className="space-y-3">
              {registros.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {r.lote.codigoLote || `Registro ${i + 1}`}
                    </span>
                    <span className="text-xs text-slate-500">{r.fecha}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {r.lote.calidad} &middot; {r.lote.espesor} mm &middot; {r.insp.severidad}
                  </p>
                  {r.defectos.length > 0 && (
                    <p className="mt-1 text-xs text-slate-500">Fallas: {r.defectos.join(", ")}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-400">{r.fotos.length} foto(s)</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const r = registros[i];
                        const w = window.open("", "_blank");
                        if (!w) return;
                        w.document.write(`
                          <html><head><title>Registro ${r.lote.codigoLote}</title>
                          <style>
                            body{font-family:system-ui,sans-serif;padding:32px;color:#1e293b;max-width:720px;margin:0 auto;}
                            h1{font-size:22px;margin-bottom:4px;}
                            .sub{color:#64748b;font-size:12px;margin-bottom:20px;}
                            .card{border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:16px;}
                            .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:13px;}
                            .row:last-child{border-bottom:none;}
                            .label{font-weight:600;color:#334155;}
                            .badge{display:inline-block;padding:2px 8px;border-radius:999px;background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;}
                            ul{margin:6px 0;padding-left:18px;font-size:13px;}
                          </style>
                          </head><body>
                          <h1>Registro de imperfecciones</h1>
                          <p class="sub">CALIDAD PLYWOOD &mdash; Demo &middot; ${r.fecha}</p>
                          <div class="card">
                            <div class="row"><span class="label">Código de lote</span><span>${r.lote.codigoLote}</span></div>
                            <div class="row"><span class="label">Calidad</span><span>${r.lote.calidad}</span></div>
                            <div class="row"><span class="label">Espesor</span><span>${r.lote.espesor} mm</span></div>
                            <div class="row"><span class="label">Especie</span><span>${r.lote.especie}</span></div>
                            <div class="row"><span class="label">Máquina</span><span>${r.lote.maquina}</span></div>
                            <div class="row"><span class="label">Turno</span><span>${r.lote.turno}</span></div>
                          </div>
                          <div class="card">
                            <div class="row"><span class="label">Inspector</span><span>${r.insp.inspectorNombre}</span></div>
                            <div class="row"><span class="label">Severidad</span><span class="badge">${r.insp.severidad}</span></div>
                            <div class="row"><span class="label">Fotos</span><span>${r.fotos.length}</span></div>
                            ${r.defectos.length ? `<div class="row"><span class="label">Fallas</span><span>${r.defectos.join(", ")}</span></div>` : ""}
                            ${r.insp.descripcion ? `<div class="row"><span class="label">Descripción</span><span>${r.insp.descripcion}</span></div>` : ""}
                            ${r.insp.comentarioGeneral ? `<div class="row"><span class="label">Comentario</span><span>${r.insp.comentarioGeneral}</span></div>` : ""}
                          </div>
                          <script>window.print();</script>
                          </body></html>
                        `);
                        w.document.close();
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Ver PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const rec = registros[i];
                        setLote({ ...rec.lote });
                        setInsp({ ...rec.insp });
                        setDefectos([...rec.defectos]);
                        setFotos([...rec.fotos]);
                        setRegistros((s) => s.filter((_, idx) => idx !== i));
                        setVista("form");
                        setStep(0);
                      }}
                      className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegistros((s) => s.filter((_, idx) => idx !== i))}
                      className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {pdfIndex !== null && registros[pdfIndex] && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90%] w-full max-w-md overflow-auto rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="mb-3 text-base font-bold text-slate-900">Vista previa del registro</h3>
              <p className="text-sm text-slate-600">
                {registros[pdfIndex].lote.codigoLote} &middot; {registros[pdfIndex].lote.calidad} &middot;{" "}
                {registros[pdfIndex].lote.espesor} mm
              </p>
              <p className="mt-1 text-sm text-slate-600">Severidad: {registros[pdfIndex].insp.severidad}</p>
              {registros[pdfIndex].defectos.length > 0 && (
                <p className="mt-1 text-xs text-slate-500">Fallas: {registros[pdfIndex].defectos.join(", ")}</p>
              )}
              <p className="mt-1 text-xs text-slate-400">{registros[pdfIndex].fotos.length} foto(s)</p>
              <button
                type="button"
                onClick={() => setPdfIndex(null)}
                className="mt-4 w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-slate-50 text-slate-900">
      {/* CABECERA */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-slate-900">
            Registrar imperfecciones
          </h3>
          <p className="truncate text-[11px] text-slate-500">{producto}</p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
          aria-label="Cerrar demostracion"
        >
          &#215;
        </button>
      </div>

      {/* AVISO DE DEMO */}
      <div className="flex items-center gap-2 bg-amber-500 px-4 py-2 text-[11px] font-semibold text-white">
        <span>&#9888;</span>
        <span>DEMO &mdash; los datos no se guardaran</span>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <Stepper steps={STEPS} current={step} />

          {step === 0 && (
            <Card title="Datos del lote" subtitle="Identificacion de la produccion inspeccionada">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Codigo de lote" required>
                  <input
                    className={inputCls}
                    value={lote.codigoLote}
                    onChange={(e) => setL("codigoLote", e.target.value)}
                    placeholder="Ej. L-2024-0187"
                  />
                </Field>
                <Field label="Codigo de boleta">
                  <input
                    className={inputCls}
                    value={lote.codigoBoleta}
                    onChange={(e) => setL("codigoBoleta", e.target.value)}
                    placeholder="Ej. B-99231"
                  />
                </Field>
                <Field label="Especie">
                  <select
                    className={inputCls}
                    value={lote.especie}
                    onChange={(e) => setL("especie", e.target.value)}
                  >
                    {ESPECIES.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Calidad">
                  <select
                    className={inputCls}
                    value={lote.calidad}
                    onChange={(e) => setL("calidad", e.target.value)}
                  >
                    {CALIDADES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Espesor (mm)">
                  <select
                    className={inputCls}
                    value={lote.espesor}
                    onChange={(e) => setL("espesor", e.target.value)}
                  >
                    {ESPESORES.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Maquina">
                  <select
                    className={inputCls}
                    value={lote.maquina}
                    onChange={(e) => setL("maquina", e.target.value)}
                  >
                    {MAQUINAS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Fecha del turno">
                  <input
                    type="date"
                    className={inputCls}
                    value={lote.fechaTurno}
                    onChange={(e) => setL("fechaTurno", e.target.value)}
                  />
                </Field>
                <Field label="Turno">
                  <select
                    className={inputCls}
                    value={lote.turno}
                    onChange={(e) => setL("turno", e.target.value)}
                  >
                    {TURNOS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Hora de produccion">
                  <input
                    type="time"
                    className={inputCls}
                    value={lote.horaProduccion}
                    onChange={(e) => setL("horaProduccion", e.target.value)}
                  />
                </Field>
                <Field label="Supervisor de equipo">
                  <input
                    className={inputCls}
                    value={lote.equipoSupervisor}
                    onChange={(e) => setL("equipoSupervisor", e.target.value)}
                    placeholder="Nombre"
                  />
                </Field>
                <Field label="Gestion">
                  <input
                    className={inputCls}
                    value={lote.gestion}
                    onChange={(e) => setL("gestion", e.target.value)}
                    placeholder="Nombre"
                  />
                </Field>
                <Field label="Operador">
                  <input
                    className={inputCls}
                    value={lote.operador}
                    onChange={(e) => setL("operador", e.target.value)}
                    placeholder="Nombre"
                  />
                </Field>
              </div>
            </Card>
          )}

          {step === 1 && (
            <>
              <Card
                title="Control de calidad"
                subtitle="Inspector y verificacion de la calidad declarada"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Inspector" required>
                    <input
                      className={inputCls}
                      value={insp.inspectorNombre}
                      onChange={(e) => setI("inspectorNombre", e.target.value)}
                      placeholder="Nombre"
                    />
                  </Field>
                  <Field label="Equipo del inspector">
                    <input
                      className={inputCls}
                      value={insp.inspectorEquipo}
                      onChange={(e) => setI("inspectorEquipo", e.target.value)}
                      placeholder="Nombre"
                    />
                  </Field>
                  <Field label="Supervisor del inspector">
                    <input
                      className={inputCls}
                      value={insp.inspectorSupervisor}
                      onChange={(e) => setI("inspectorSupervisor", e.target.value)}
                      placeholder="Nombre"
                    />
                  </Field>
                  <Field label="Fecha de registro">
                    <input
                      type="date"
                      className={inputCls}
                      value={insp.fechaRegistro}
                      onChange={(e) => setI("fechaRegistro", e.target.value)}
                    />
                  </Field>
                  <Field label="Codigo de boleta">
                    <input
                      className={inputCls}
                      value={insp.codigoBoleta}
                      onChange={(e) => setI("codigoBoleta", e.target.value)}
                      placeholder="Ej. B-99231"
                    />
                  </Field>
                  <Field label="Calidad verificada">
                    <select
                      className={inputCls}
                      value={insp.calidadVerificada}
                      onChange={(e) => setI("calidadVerificada", e.target.value)}
                    >
                      <option value="">Sin verificar</option>
                      {CALIDADES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </Card>

              <Card
                title="Tipos de defecto"
                subtitle="Selecciona uno o varios defectos observados en el tablero"
              >
                <div className="flex flex-wrap gap-2">
                  {DEFECTOS.map((d) => {
                    const active = defectos.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDefecto(d)}
                        className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                          active
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-slate-300 bg-white text-slate-600"
                        }`}
                      >
                        {active ? "\u2713 " : ""}
                        {d}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  {defectos.length} defecto{defectos.length === 1 ? "" : "s"} seleccionado
                  {defectos.length === 1 ? "" : "s"}
                </p>
              </Card>

              <Card
                title="Severidad y descripcion"
                subtitle="Indica que tan grave es la no conformidad y el detalle"
              >
                <div className="space-y-3">
                  <Field label="Severidad" required plain>
                    <div className="grid grid-cols-3 gap-2">
                      {SEVERIDADES.map((s) => {
                        const active = insp.severidad === s;
                        const tono =
                          s === "Leve"
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : s === "Moderada"
                              ? "border-amber-500 bg-amber-500 text-white"
                              : "border-red-500 bg-red-500 text-white";
                        const inactivo =
                          s === "Leve"
                            ? "border-slate-300 bg-white text-slate-600"
                            : s === "Moderada"
                              ? "border-slate-300 bg-white text-slate-600"
                              : "border-slate-300 bg-white text-slate-600";
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setI("severidad", s)}
                            className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${active ? tono : inactivo}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Descripcion del defecto">
                    <textarea
                      className={`${inputCls} min-h-24 resize-y`}
                      value={insp.descripcion}
                      onChange={(e) => setI("descripcion", e.target.value)}
                      placeholder="Ej. Desastillado en esquina inferior derecha, aprox. 8 cm"
                    />
                  </Field>
                </div>
              </Card>
            </>
          )}

          {step === 2 && (
            <>
              <Card
                title="Fotos del lote"
                subtitle="Se toman en el momento. En esta demo solo viven en tu navegador"
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => camRef.current?.click()}
                      disabled={busy || fotos.length >= MAX_FOTOS}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-amber-500 py-5 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
                    >
                      <span className="text-2xl">&#128247;</span>
                      <span className="text-sm">Tomar foto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => galRef.current?.click()}
                      disabled={busy || fotos.length >= MAX_FOTOS}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white py-5 font-semibold text-slate-700 transition active:scale-[0.98] disabled:opacity-50"
                    >
                      <span className="text-2xl">&#128444;</span>
                      <span className="text-sm">Galeria</span>
                    </button>
                  </div>

                  <input
                    ref={camRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="hidden"
                    onChange={(e) => void handleFiles(e.target.files)}
                  />
                  <input
                    ref={galRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => void handleFiles(e.target.files)}
                  />

                  {busy && (
                    <p className="text-center text-sm text-slate-500">Procesando imagenes...</p>
                  )}
                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                  )}

                  {fotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {fotos.map((f, i) => (
                        <figure key={f.id} className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={f.url}
                            alt={`Foto ${i + 1}`}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-amber-300"
                          />
                          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => quitarFoto(f.id)}
                            className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow"
                            aria-label={`Quitar foto ${i + 1}`}
                          >
                            &#215;
                          </button>
                        </figure>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-400">
                    {fotos.length}/{MAX_FOTOS} fotos &middot; se comprimen automaticamente y no se
                    suben a ningun servidor
                  </p>
                </div>
              </Card>




              {fotos.length > 0 && (
                <Card
                  title="Marcar zona del defecto"
                  subtitle="Arrastra sobre la foto para senalar donde esta la falla"
                >
                  <div className="space-y-4">
                    {fotos.map((f, i) => (
                      <div key={f.id}>
                        <p className="mb-2 text-xs font-semibold text-slate-600">
                          Foto {i + 1} &middot; {f.nombre}
                        </p>
                        <MarcaZona
                          url={f.url}
                          zona={f.zona}
                          onChange={(z) => setZona(f.id, z)}
                        />
                        {f.zona && (
                          <button
                            type="button"
                            onClick={() => setZona(f.id, undefined)}
                            className="mt-2 text-xs font-semibold text-slate-500 underline transition hover:text-slate-700"
                          >
                            Quitar la marca
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card title="Comentario general del lote">
                <textarea
                  className={`${inputCls} min-h-28 resize-y`}
                  value={insp.comentarioGeneral}
                  onChange={(e) => setI("comentarioGeneral", e.target.value)}
                  placeholder="Ej. Se revisaron estas piezas del lote con las siguientes fallas..."
                />
                {comentarioFinal !== insp.comentarioGeneral.trim() && (
                  <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Se guardaria: <span className="font-medium">{comentarioFinal}</span>
                  </p>
                )}
              </Card>
            </>
          )}
        </div>
      </div>


      {/* RESUMEN EN VIVO */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Resumen de la inspeccion
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              Lote: {lote.codigoLote || "sin codigo"}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              {lote.calidad} &middot; {lote.espesor} mm
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-800">
              {insp.severidad}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              {defectos.length} defecto{defectos.length === 1 ? "" : "s"}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              {fotos.length} foto{fotos.length === 1 ? "" : "s"}
            </span>
            {fotos.some((f) => f.zona) && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-700">
                zona marcada
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BARRA DE ACCION */}
      <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-2xl gap-2">
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 0 ? !step1Valid : !step2Valid}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 active:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuar &rarr;
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegistros((s) => [
                    ...s,
                    { lote: { ...lote }, insp: { ...insp }, defectos: [...defectos], fotos: [...fotos], fecha: new Date().toLocaleString() },
                  ]);
                  setVista("dashboard");
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 active:bg-amber-700"
              >
                &#10003; Guardar demo
              </button>
            </>
          )}
        </div>
      </div>

      {/* TOAST */}
      {aviso === "ok" && (
        <div className="absolute inset-x-4 bottom-40 z-30 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white shadow-lg">
          Demostracion: no se guardo ningun registro. Todo se borro al cerrar.
        </div>
      )}
    </div>
  );
}
