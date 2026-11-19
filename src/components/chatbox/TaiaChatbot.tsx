"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Burbuja flotante de TAIA, la asistente virtual de ProDominicana.
 *
 * El chat vive en https://chatbot.prodominicana.gob.do (su propio servidor y despliegue) y aquí
 * se muestra dentro de un iframe. El iframe solo se carga la primera vez que se abre la burbuja,
 * para no sumar peso a la carga inicial del sitio. Permite el micrófono para el modo de voz.
 */
const URL_CHATBOT = "https://chatbot.prodominicana.gob.do/embed";

export default function TaiaChatbot() {
  const [abierto, setAbierto] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [visible, setVisible] = useState(false);
  const en = (usePathname() || "").startsWith("/en");
  const t = en
    ? { titulo: "TAIA · ProDominicana virtual assistant", cerrar: "Close the chat", abrir: "Open the chat with TAIA, virtual assistant", cerrarBurbuja: "Close the chat with TAIA", etiqueta: "Need help? Ask TAIA", iframe: "Chat with TAIA, ProDominicana virtual assistant" }
    : { titulo: "TAIA · Asistente virtual de ProDominicana", cerrar: "Cerrar el chat", abrir: "Abrir el chat con TAIA, asistente virtual", cerrarBurbuja: "Cerrar el chat con TAIA", etiqueta: "¿Te ayudo? Pregúntale a TAIA", iframe: "Chat con TAIA, asistente virtual de ProDominicana" };

  // La burbuja aparece cuando el navegador queda libre, sin competir con la carga inicial
  useEffect(() => {
    const win = window as typeof window & { requestIdleCallback?: (cb: () => void) => number };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setVisible(true));
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // Escape cierra el chat
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  if (!visible) return null;

  const abrir = () => { setCargado(true); setAbierto(true); };

  return (
    <>
      {/* Ventana del chat: se mantiene montada al cerrarla para no perder la conversación */}
      {cargado && (
        <div
          role="dialog"
          aria-label={t.titulo}
          aria-hidden={!abierto}
          className={`fixed z-[9999] overflow-hidden bg-white shadow-2xl transition-all duration-200
            inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[620px] sm:max-h-[calc(100vh-7rem)] sm:w-[400px] sm:rounded-2xl
            ${abierto ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center justify-between bg-[#0B2452] px-4 py-2 text-white">
            <span className="text-sm font-semibold">{t.titulo}</span>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label={t.cerrar}
              className="rounded-full p-1 leading-none hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <iframe
            src={URL_CHATBOT}
            title={t.iframe}
            className="h-[calc(100%-40px)] w-full border-none"
            allow="microphone; autoplay; clipboard-write"
          />
        </div>
      )}

      {/* Burbuja */}
      <button
        type="button"
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        aria-label={abierto ? t.cerrarBurbuja : t.abrir}
        aria-expanded={abierto}
        className={`group fixed bottom-5 right-5 z-[10000] h-16 w-16 rounded-full bg-white shadow-xl ring-2 ring-[#0B2452]/10
          transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400
          ${abierto ? "max-sm:hidden" : ""}`}
      >
        <img src="/icons/taia-chatbot.png" alt="" className="h-full w-full rounded-full object-cover" />
        {!abierto && (
          <span className="pointer-events-none absolute right-[4.5rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0B2452] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
            {t.etiqueta}
          </span>
        )}
      </button>
    </>
  );
}
