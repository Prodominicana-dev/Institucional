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
    "/news": {
      en: "/news",
      es: "/noticias",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
