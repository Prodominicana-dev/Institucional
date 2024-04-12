import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  defaultLocale: "es",
  locales: locales,
  localePrefix: localePrefix,

  pathnames: {
    "/whoarewe": {
      en: "/whoarewe",
      es: "/quienessomos",
    },
    "/history": {
      en: "/history",
      es: "/historia",
    },
    "/legalframework": {
      en: "/legalframework",
      es: "/marcolegal",
    },
    "/organizationalstructure": {
      en: "/organizationalstructure",
      es: "/organigrama",
    },
    "/organizationalstructure/[id]": {
      en: "/organizationalstructure/[id]",
      es: "/organigrama/[id]",
    },
    "/services/export": {
      en: "/services/export",
      es: "/servicios/exportacion",
    },
    "/services/invest": {
      en: "/services/invest",
      es: "/servicios/inversion",
    },
    "/news": {
      en: "/news",
      es: "/noticias",
    },
    "/news/[id]": {
      en: "/news/[id]",
      es: "/noticias/[id]",
    },
    "/events": {
      en: "/events",
      es: "/eventos",
    },
    "/events/[id]": {
      en: "/events/[id]",
      es: "/eventos/[id]",
    },
    "/transparency": {
      en: "/transparency",
      es: "/transparencia",
    },
    "/transparency/[sectionId]": {
      en: "/transparency/[sectionId]",
      es: "/transparencia/[sectionId]",
    },
    "/transparency/[sectionId]/[subsectionId]": {
      en: "/transparency/[sectionId]/[subsectionId]",
      es: "/transparencia/[sectionId]/[subsectionId]",
    },
    "/gallery": {
      en: "/gallery",
      es: "/galeria",
    },
    "/gallery/[id]": {
      en: "/gallery/[id]",
      es: "/galeria/[id]",
    },
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
    "/invest": {
      en: "/invest",
      es: "/inversion",
    },
    "/invest/why-dominican-republic": {
      en: "/invest/why-dominican-republic",
      es: "/inversion/por-que-republica-dominicana",
    },
    "/invest/map": {
      en: "/invest/map",
      es: "/inversion/mapa-de-desarrollo-estrategico",
    },
    "/invest/sectors": {
      en: "/invest/sectors",
      es: "/inversion/sectores",
    },
    "/invest/sectors/tourism": {
      en: "/invest/sectors/tourism",
      es: "/inversion/sectores/turismo",
    },
    "/invest/sectors/energy": {
      en: "/invest/sectors/energy",
      es: "/inversion/sectores/energia",
    },
    "/invest/sectors/technology": {
      en: "/invest/sectors/technology",
      es: "/inversion/sectores/tecnologia",
    },
    "/invest/sectors/manufacturing": {
      en: "/invest/sectors/manufacturing",
      es: "/inversion/sectores/manufactura",
    },
    "/invest/sectors/semiconductors": {
      en: "/invest/sectors/semiconductors",
      es: "/inversion/sectores/semiconductores",
    },
    "/invest/sectors/agriculture-and-livestock-farming": {
      en: "/invest/sectors/agriculture-and-livestock-farming",
      es: "/inversion/sectores/agropecuario",
    },
    "/invest/sectors/biomedicine": {
      en: "/invest/sectors/biomedicine",
      es: "/inversion/sectores/biomedicina",
    },
    "/invest/sectors/film": {
      en: "/invest/sectors/film",
      es: "/inversion/sectores/cine",
    },
    "/invest/sectors/real-estate": {
      en: "/invest/sectors/real-estate",
      es: "/inversion/sectores/inmobiliario",
    },
    "/export": {
      en: "/export",
      es: "/exportacion",
    },
    "/export/services": {
      en: "/export/services",
      es: "/exportacion/servicios",
    },
    "/export/how-to-export": {
      en: "/export/how-to-export",
      es: "/exportacion/como-exportar",
    },
    "/export/directory": {
      en: "/export/directory",
      es: "/exportacion/directorio-de-exportadores",
    },
    "/export/documents": {
      en: "/export/documents",
      es: "/exportacion/documentos",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
