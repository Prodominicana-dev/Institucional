import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { auth0 } from "./lib/auth0";
import { routing } from "./i18n/routing";

// Crear middleware de i18n una sola vez
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Primero, verifica si la solicitud es para una ruta de autenticación
  if (request.nextUrl.pathname.startsWith("/auth")) {
    // Deja que Auth0 maneje las rutas de autenticación
    return await auth0.middleware(request);
  }

  // Si no es una ruta de autenticación, aplica el middleware de i18n
  const intlResponse = intlMiddleware(request);

  // Si next-intl hizo una redirección, devuélvela
  if (intlResponse && intlResponse instanceof NextResponse) {
    return intlResponse;
  }

  // Si no hubo redirección por parte de next-intl, pasa la solicitud al siguiente middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",                      // Home
    "/(es|en)/:path*",        // Idiomas permitidos
    "/((?!api|_next|.*\\..*).*)", // Evita aplicar a rutas de archivos y APIs
  ],
}