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
    "/legalframework": {
      en: "/legalframework",
      es: "/marcolegal",
    },
    "/news": {
      en: "/news",
      es: "/noticias",
    },

    "/events": {
      en: "/events",
      es: "/eventos",
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
