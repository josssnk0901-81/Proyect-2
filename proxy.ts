// Next 16: lo que antes era `middleware.ts` ahora es `proxy.ts`.
// Compone el ruteo i18n de next-intl con una CSP estricta basada en nonce.
import createMiddleware from "next-intl/middleware";
import type {NextRequest} from "next/server";
import {routing} from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  // Script: nonce + strict-dynamic (sin 'unsafe-inline'). Estilos: 'unsafe-inline'
  // (Framer y next/font inyectan estilos inline; el riesgo real de XSS está en scripts).
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: http:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // El nonce y la CSP viajan en las cabeceras de la PETICIÓN: next-intl las reenvía en su
  // rewrite y Next las lee para estampar el nonce en sus propios scripts.
  request.headers.set("x-nonce", nonce);
  request.headers.set("content-security-policy", csp);

  const response = handleI18nRouting(request);
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: ["/", "/(es|ja|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
