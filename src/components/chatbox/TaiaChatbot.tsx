"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* TAIA es la asistente de IA de ProDominicana. Vive en su propio servicio
   (chatbot.prodominicana.gob.do) y aquí solo se muestra su avatar flotante:
   al pulsarlo se abre el chat dentro de un marco, sin salir de la página.
   La dirección es la versión del chat hecha para incrustarse en otros sitios.

   El marco no se crea hasta el primer clic, así que el avatar no le cuesta
   nada a la carga inicial. Una vez abierto se conserva al cerrar, para que
   la conversación siga donde estaba si la persona vuelve a abrirlo. */
const TAIA_URL =
  process.env.NEXT_PUBLIC_TAIA_URL ||
  "https://chatbot.prodominicana.gob.do/embed";

const AVATAR = "/images/taia-avatar.webp";

const TEXTOS = {
  es: {
    abrir: "Abrir el chat con TAIA, la asistente de IA de ProDominicana",
    ventana: "Chat con TAIA",
    cerrar: "Cerrar el chat",
  },
  en: {
    abrir: "Open the chat with TAIA, ProDominicana's AI assistant",
    ventana: "Chat with TAIA",
    cerrar: "Close the chat",
  },
};

/* El avatar se mueve igual que dentro del chat: flota despacio y parpadea.
   El parpadeo son dos párpados dibujados encima de la imagen, que aparecen un
   instante cada pocos segundos. Quien tiene desactivadas las animaciones en
   su sistema la ve quieta. */
const ANIMACION = `
@keyframes taia-entrar {
  from { opacity: 0; transform: translateY(24px) scale(0.6); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes taia-flotar {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-7px) rotate(-3deg); }
}
@keyframes taia-sombra {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(0.75); opacity: 0.5; }
}
@keyframes taia-parpadear {
  0%, 44%, 48%, 88%, 91%, 94%, 97%, 100% { opacity: 0; }
  45%, 47%, 89%, 90%, 95%, 96% { opacity: 1; }
}
.taia-avatar { animation: taia-entrar 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; transition: transform 0.2s ease; }
.taia-avatar:hover { transform: scale(1.08); }
.taia-flota { animation: taia-flotar 4s ease-in-out infinite; transform-origin: 50% 85%; }
.taia-sombra { animation: taia-sombra 4s ease-in-out infinite; }
.taia-parpados { opacity: 0; animation: taia-parpadear 6s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .taia-avatar, .taia-flota, .taia-sombra, .taia-parpados { animation: none; }
}
`;

/* Centro de cada ojo sobre la imagen, en una cuadrícula de 1254 x 1254
   (la misma que usa el avatar dentro del chat). */
const OJOS = [497.5, 821.5];

export default function TaiaChatbot() {
  const params = useParams<{ locale: string }>();
  const t = params?.locale === "en" ? TEXTOS.en : TEXTOS.es;

  const [abierto, setAbierto] = useState(false);
  const [marcoCreado, setMarcoCreado] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // El avatar aparece cuando el navegador queda libre, sin competir con la carga inicial
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setVisible(true));
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  const abrir = useCallback(() => {
    setMarcoCreado(true);
    setAbierto(true);
  }, []);

  const cerrar = useCallback(() => setAbierto(false), []);

  useEffect(() => {
    if (!marcoCreado) return;
    if (!abierto) {
      // Al cerrar, el foco vuelve al avatar: quien navega con teclado sigue donde estaba
      botonRef.current?.focus();
      return;
    }

    cerrarRef.current?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", alPulsar);

    /* En el móvil el chat ocupa toda la pantalla: se bloquea el desplazamiento
       de la página de fondo mientras está abierto. */
    const enMovil = window.matchMedia("(max-width: 639px)").matches;
    const desplazamientoPrevio = document.body.style.overflow;
    if (enMovil) document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", alPulsar);
      if (enMovil) document.body.style.overflow = desplazamientoPrevio;
    };
  }, [abierto, marcoCreado, cerrar]);

  return (
    <div className="print:hidden">
      {/* AVATAR FLOTANTE, sin fondo ni texto, en la esquina inferior derecha. */}
      {visible && !abierto && (
        <div className="fixed bottom-[14px] right-[8px] z-[9990]">
          <button
            ref={botonRef}
            type="button"
            onClick={abrir}
            aria-label={t.abrir}
            aria-haspopup="dialog"
            aria-expanded={abierto}
            title="TAIA"
            className="taia-avatar relative block h-[92px] w-[92px] cursor-pointer rounded-full bg-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1d9bf0]"
          >
            <span
              aria-hidden="true"
              className="taia-sombra absolute bottom-[-4px] left-[21px] h-[10px] w-[50px] rounded-[50%] bg-[#002f73]/30 blur-[3px]"
            />
            <span className="taia-flota relative block h-full w-full">
              <Image
                src={AVATAR}
                alt=""
                width={92}
                height={92}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_8px_rgba(0,47,115,0.35)]"
              />
              <svg
                viewBox="0 0 1254 1254"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                <g className="taia-parpados">
                  {OJOS.map((cx) => (
                    <g key={cx}>
                      <ellipse cx={cx} cy="630" rx="66" ry="70" fill="#FDFCFD" />
                      <path
                        d={`M${cx - 52} 628 Q${cx} 668 ${cx + 52} 628`}
                        stroke="#012B74"
                        strokeWidth="16"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </span>
          </button>
          <style>{ANIMACION}</style>
        </div>
      )}

      {/* VENTANA DEL CHAT. En el móvil ocupa toda la pantalla. */}
      {marcoCreado && (
        <div
          role="dialog"
          aria-label={t.ventana}
          aria-hidden={!abierto}
          className={`fixed inset-0 z-[2147483000] flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-black/10 sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(680px,calc(100dvh-40px))] sm:w-[410px] sm:rounded-2xl ${
            abierto ? "flex" : "hidden"
          }`}
        >
          {/* El chat trae su propia cabecera con el nombre y el avatar. Aquí solo
              va una franja del mismo azul con el botón de cerrar, para que las
              dos se vean como una sola. */}
          <div className="flex h-9 shrink-0 items-center justify-end bg-[#002f73] px-1.5 text-white">
            <button
              ref={cerrarRef}
              type="button"
              onClick={cerrar}
              aria-label={t.cerrar}
              title={t.cerrar}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xl leading-none hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ×
            </button>
          </div>

          <iframe
            src={TAIA_URL}
            title={t.ventana}
            allow="microphone; autoplay; clipboard-write"
            className="w-full flex-1 border-0 bg-white"
          />
        </div>
      )}
    </div>
  );
}
