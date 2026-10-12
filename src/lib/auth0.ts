import { Auth0Client } from "@auth0/nextjs-auth0/server";

// AUTH0_CALLBACK_PATH permite apuntar el callback a la ruta registrada en la
// aplicacion de Auth0 cuando no coincide con la de la v4 (/auth/callback).
export const auth0 = new Auth0Client(
  process.env.AUTH0_CALLBACK_PATH
    ? { routes: { callback: process.env.AUTH0_CALLBACK_PATH } }
    : {}
);
