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
    "/services/investment": {
      en: "/services/investment",
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
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
