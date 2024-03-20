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
    "/news/[Id]": {
      en: "/news/[Id]",
      es: "/noticias/[Id]",
    },
    "/events": {
      en: "/events",
      es: "/eventos",
    },
    "/events/[eventId]": {
      en: "/events/[Id]",
      es: "/eventos/[Id]",
    },
    "/transparency": {
      en: "/transparency",
      es: "/transparencia",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
