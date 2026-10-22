import type { Metadata } from "next";
import { ProductoTemplate, type ProductoData } from "@/components/ProductoTemplate";

export const metadata: Metadata = {
  title: "Archivador Digital - Prevención de Riesgos — NEXORA TECH",
  description:
    "Carpeta digital de prevención: empresas, trabajadores, contratistas, checklists y documentos.",
};

const producto: ProductoData = {
  slug: "archivador-digital-prevencion-riesgos",
  nombre: "Archivador Digital - Prevención de Riesgos",
  descripcionCorta:
    "Carpeta digital para la gestión documental de prevención de riesgos: empresas, trabajadores, contratistas, checklists y documentos en un solo lugar. (Demo sujeta a modificaciones según requiera el cliente.)",
  mockupUrl: "prevencion.nexoratech.com",
  bloques: [
    {
      titulo: "Dashboard con indicadores en tiempo real",
      texto:
        "Visualiza el estado de toda tu prevención de un vistazo: documentos, checklists y empresas.",
      checks: [
        "Indicadores clave actualizados al instante",
        "Gráficos de tendencia y progreso",
        "Alertas y notificaciones personalizables",
        "Filtros por empresa y fecha",
      ],
      mockup: "dashboard",
      tamanoGrande: true,
    },
    {
      titulo: "Administra más de una empresa",
      texto:
        "Gestiona múltiples empresas o clientes desde una sola cuenta, con permisos y espacios independientes.",
      checks: [
        "Cambios rápidos entre empresas",
        "Permisos y roles por organización",
        "Espacios de trabajo independientes",
        "Reportes consolidados por cliente",
      ],
      mockup: "empresas",
      invertido: true,
    },
    {
      titulo: "Documentos y checklists en un solo lugar",
      texto:
        "Centraliza toda tu documentación de prevención. Sube, clasifica y encuentra cualquier documento en segundos.",
      checks: [
        "Búsqueda instantánea por etiquetas",
        "Historial de versiones automático",
        "Checklists EMP / TRAB / CON desde el móvil",
        "Acceso seguro desde cualquier dispositivo",
      ],
      mockup: "mobile",
      tamanoGrande: true,
    },
    {
      titulo: "Reportes ejecutivos listos para descargar",
      texto:
        "Genera reportes automáticos con la información que necesitas para auditorías y toma de decisiones.",
      checks: [
        "Reportes programados por correo",
        "Exportación a PDF",
        "KPIs personalizables por rol",
        "Comparativas entre períodos",
      ],
      mockup: "reportes",
      invertido: true,
    },
  ],
  beneficios: [
    {
      titulo: "100% a medida",
      texto:
        "Se configura según tus procesos reales de prevención, no al revés.",
    },
    {
      titulo: "Seguro y confiable",
      texto:
        "Cifrado de datos, respaldos automáticos y control de acceso por usuario.",
    },
    {
      titulo: "Escalable",
      texto:
        "Desde una pequeña operación hasta cientos de usuarios y empresas.",
    },
  ],
  planes: [
    {
      nombre: "Básico",
      precio: "Consultar precio",
      descripcion: "Para empresas que están empezando a digitalizar su prevención.",
      caracteristicas: [
        "Hasta 5 empresas",
        "Documentos y checklists ilimitados",
        "Soporte por correo",
      ],
    },
    {
      nombre: "Pro",
      precio: "Consultar precio",
      descripcion: "Para empresas con mayor carga operativa y múltiples faenas.",
      caracteristicas: [
        "Empresas ilimitadas",
        "Documentos y checklists ilimitados",
        "Soporte prioritario por WhatsApp",
      ],
      destacado: true,
    },
  ],
};

export default function ArchivadorDigitalPrevencionRiesgos() {
  return <ProductoTemplate producto={producto} />;
}