import type { Metadata } from "next";
import { ProductoTemplate, type ProductoData } from "@/components/ProductoTemplate";

export const metadata: Metadata = {
  title: "Calidad Plywood — NEXORA TECH",
  description:
    "Control de calidad y trazabilidad para tableros de madera y derivados.",
};

const producto: ProductoData = {
  slug: "calidad-plywood",
  nombre: "Calidad Plywood",
  descripcionCorta:
    "Control de calidad y trazabilidad para tableros de madera y derivados, desde la línea de producción hasta la despacho.",
  mockupUrl: "calidad.nexoratech.com",
  bloques: [
    {
      titulo: "Panel de control de calidad en tiempo real",
      texto:
        "Supervisa el estado de cada lote con indicadores visuales y accede al listado de registros guardados.",
      checks: [
        "Estado de cada lote al instante",
        "Listado de registros guardados",
        "Alertas de no conformidad",
        "Tendencias por línea",
      ],
      mockup: "dashboard",
      tamanoGrande: true,
    },
    {
      titulo: "Trazabilidad completa por lote",
      texto:
        "Rastrea cada tablero desde la materia prima hasta el despacho. Consulta el historial completo de un lote en segundos.",
      checks: [
        "Historial completo de cada lote",
        "Registro de producción y inspecciones",
        "Auditorías simplificadas",
        "Códigos QR por pallet y partida",
      ],
      mockup: "empresas",
      invertido: true,
    },
    {
      titulo: "Inspecciones desde la planta",
      texto:
        "Registra resultados de inspección desde el móvil, directamente en la línea de producción. Sin papel, sin demoras.",
      checks: [
        "Registro de lote y calidad",
        "Defectos y severidad",
        "Fotos con zona marcada",
        "Guardado y consulta de registros",
      ],
      mockup: "mobile",
      tamanoGrande: true,
    },
    {
      titulo: "Reportes de calidad para clientes y auditorías",
      texto:
        "Genera certificados y reportes de calidad listos para entregar a tus clientes o presentar en auditorías.",
      checks: [
        "Certificados de calidad automáticos",
        "Exportación PDF con tu marca",
        "Indicadores por turno",
        "Comparativas entre líneas",
      ],
      mockup: "reportes",
      invertido: true,
    },
  ],
  beneficios: [
    {
      titulo: "Menos defectos",
      texto:
        "La detección temprana de desviaciones reduce el retrabajo y los despachos con no conformidades.",
    },
    {
      titulo: "Cumplimiento garantizado",
      texto:
        "Trazabilidad verificable y documentación lista para auditorías de clientes y certificaciones.",
    },
    {
      titulo: "Implementación rápida",
      texto:
        "Se adapta a tu proceso productivo actual sin necesidad de cambiar la forma en que trabajas.",
    },
  ],
  planes: [
    {
      nombre: "Planta",
      precio: "Consultar precio",
      descripcion: "Para una planta de producción con una línea de tableros.",
      caracteristicas: [
        "Usuarios en línea de producción",
        "Trazabilidad por lote ilimitada",
        "Soporte por correo",
      ],
    },
    {
      nombre: "Corporativo",
      precio: "Consultar precio",
      descripcion: "Para múltiples plantas y reportes consolidados.",
      caracteristicas: [
        "Múltiples plantas y líneas",
        "Reportes consolidados y certificados",
        "Soporte prioritario por WhatsApp",
      ],
      destacado: true,
    },
  ],
};

export default function CalidadPlywood() {
  return <ProductoTemplate producto={producto} />;
}