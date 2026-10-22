import type { Metadata } from "next";
import { ProductoTemplate, type ProductoData } from "@/components/ProductoTemplate";

export const metadata: Metadata = {
  title: "Gestión de Operaciones — NEXORA TECH",
  description:
    "Plataforma web para organizar documentos, procesos y control operativo desde cualquier dispositivo.",
};

const producto: ProductoData = {
  slug: "gestion-operaciones",
  nombre: "Gestión de Operaciones",
  descripcionCorta:
    "Plataforma web para organizar documentos, procesos y control operativo de tu empresa desde cualquier dispositivo.",
  mockupUrl: "app.nexoratech.com",
  bloques: [
    {
      titulo: "Dashboard con indicadores en tiempo real",
      texto:
        "Visualiza el estado de toda tu operación de un vistazo. El dashboard se actualiza automáticamente con los datos más recientes de tu empresa.",
      checks: [
        "Indicadores clave actualizados al instante",
        "Gráficos de tendencia y progreso",
        "Alertas y notificaciones personalizables",
        "Filtros por empresa, área y fecha",
      ],
      mockup: "dashboard",
      tamanoGrande: true,
    },
    {
      titulo: "Administra más de una empresa",
      texto:
        "Gestiona múltiples empresas o clientes desde una sola cuenta, con permisos y espacios de trabajo independientes para cada uno.",
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
      titulo: "Documentos y procesos en un solo lugar",
      texto:
        "Centraliza toda tu documentación operativa. Sube, clasifica y encuentra cualquier documento en segundos, sin importar dónde estés.",
      checks: [
        "Búsqueda instantánea por etiquetas",
        "Historial de versiones automático",
        "Checklists digitales desde el móvil",
        "Acceso seguro desde cualquier dispositivo",
      ],
      mockup: "mobile",
      tamanoGrande: true,
    },
    {
      titulo: "Reportes ejecutivos listos para descargar",
      texto:
        "Genera reportes automáticos con la información que necesitas para tomar decisiones. Exportables en PDF y Excel.",
      checks: [
        "Reportes programados por correo",
        "Exportación a PDF y Excel",
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
        "Se configura según tus procesos reales, no al revés. Tu empresa define cómo se usa la plataforma.",
    },
    {
      titulo: "Seguro y confiable",
      texto:
        "Cifrado de datos, respaldos automáticos y control de acceso por usuario para proteger tu información.",
    },
    {
      titulo: "Escalable",
      texto:
        "Desde una pequeña operación hasta cientos de usuarios. La plataforma crece junto a tu empresa.",
    },
  ],
  planes: [
    {
      nombre: "Básico",
      precio: "Consultar precio",
      descripcion: "Para equipos que están empezando a digitalizar sus procesos.",
      caracteristicas: [
        "Hasta 5 empresas/clientes",
        "Documentos y checklists ilimitados",
        "Soporte por correo",
      ],
    },
    {
      nombre: "Pro",
      precio: "Consultar precio",
      descripcion: "Para empresas en crecimiento con mayor carga operativa.",
      caracteristicas: [
        "Empresas/clientes ilimitados",
        "Documentos y checklists ilimitados",
        "Soporte prioritario por WhatsApp",
      ],
      destacado: true,
    },
  ],
};

export default function GestionOperaciones() {
  return <ProductoTemplate producto={producto} />;
}