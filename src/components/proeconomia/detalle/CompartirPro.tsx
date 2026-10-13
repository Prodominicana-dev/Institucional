"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebookF,
  faWhatsapp,
  faLinkedinIn,
  faXTwitter,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

/* Botones de compartir del detalle de Noticias Pro.

   Los iconos se importan aqui y se pasan como objeto: library.add() solo se
   ejecuta en (home)/layout.tsx, asi que las referencias por texto
   (["fab","facebook-f"]) saldrian vacias en este grupo de rutas. */
export default function CompartirPro({
  titulo,
  url,
}: {
  titulo: string;
  url: string;
}) {
  const t = useTranslations("proeconomia");
  const texto = encodeURIComponent(titulo);
  const enlace = encodeURIComponent(url);

  const redes = [
    {
      nombre: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enlace}`,
      color: "bg-[#1877F2]",
      icono: faFacebookF,
    },
    {
      nombre: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${texto}%20${enlace}`,
      color: "bg-[#25D366]",
      icono: faWhatsapp,
    },
    {
      nombre: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enlace}`,
      color: "bg-[#0077B5]",
      icono: faLinkedinIn,
    },
    {
      nombre: "X",
      href: `https://www.x.com/share?url=${enlace}&text=${texto}`,
      color: "bg-black",
      icono: faXTwitter,
    },
    {
      nombre: "Telegram",
      href: `https://www.t.me/share?url=${enlace}&text=${texto}`,
      color: "bg-[#24A1DE]",
      icono: faTelegram,
    },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
      <span className="font-montserrat text-xs font-bold uppercase tracking-wide text-gray-500">
        {t("share")}
      </span>
      {redes.map(({ nombre, href, color, icono }) => (
        <a
          key={nombre}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={nombre}
          className={`flex size-9 items-center justify-center rounded-full text-white duration-150 hover:opacity-80 ${color}`}
        >
          <FontAwesomeIcon icon={icono} className="size-4" />
        </a>
      ))}
      <a
        href={`mailto:?subject=${texto}&body=${enlace}`}
        aria-label={t("share")}
        className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 duration-150 hover:bg-gray-100"
      >
        <EnvelopeIcon className="size-4" />
      </a>
    </div>
  );
}
