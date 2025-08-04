"use client";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import React, { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const data = [
  { label: "Español", code: "do", langcode: "es" },
  { label: "English", code: "us", langcode: "en" },
];

const locales = ["es", "en"];

export default function LanguagePicker() {
  const pathname = usePathname() as string;
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("selectedLanguage");
      return data.find((item) => item.langcode === savedLang) || data[0];
    }
    return data[0];
  });

  const localeFromParams = params.locale;
  const currentLocale =
    localeFromParams && locales.includes(localeFromParams as any)
      ? localeFromParams
      : "es"; //

  const items = data.map((item) => (
    <MenuItem
      onClick={() => {
        setSelected(item);
        localStorage.setItem("selectedLanguage", item.langcode); // guardar idioma
        switchLocale(item.langcode);
      }}
      key={item.label}
    >
      <div className="flex gap-3">
        <Image
          src={`https://flagcdn.com/${item.code}.svg`}
          width={100}
          height={100}
          alt={item.label}
          className="w-8 h-5 sm:w-12 sm:h-8 object-cover"
        />
        {item.label}
      </div>
    </MenuItem>
  ));
  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Eliminar el prefijo de idioma actual (si existe)
    const cleanedPath = pathname.replace(
      new RegExp(`^/(${locales.join("|")})(?=/|$)`),
      ""
    );

    const normalizedPath = cleanedPath.startsWith("/")
      ? cleanedPath
      : `/${cleanedPath}`;

    const newPath =
      newLocale === "es" ? normalizedPath : `/${newLocale}${normalizedPath}`;

    // Guardar idioma seleccionado
    localStorage.setItem("selectedLanguage", newLocale);

    // ⚠️ Forzar recarga si vas a idioma por defecto (es) porque next-intl no actualiza bien sin prefijo
    if (newLocale === "es") {
      window.location.href = newPath;
    } else {
      startTransition(() => {
        router.replace(newPath as any);
      });
    }
  };

  //  newPath as unknown as any
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLang = localStorage.getItem("selectedLanguage");

    // Obtener el idioma en la ruta actual (prefijo)
    const pathLocale = pathname.split("/")[1];
    const localeInPath = locales.includes(pathLocale) ? pathLocale : "es";

    // Priorizar savedLang si es válido, sino idioma de la ruta
    const targetLang =
      savedLang && locales.includes(savedLang) ? savedLang : localeInPath;

    // Actualizar selected solo si cambia el idioma
    if (selected.langcode !== targetLang) {
      const newSelected =
        data.find((item) => item.langcode === targetLang) || data[0];
      setSelected(newSelected);
    }

    // Si el idioma guardado no coincide con la ruta actual, hacer switch
    if (savedLang && savedLang !== localeInPath) {
      switchLocale(savedLang);
    }
  }, [pathname]);
  return (
    <Menu>
      <MenuHandler>
        <div className="flex gap-2 items-center justify-center cursor-pointer">
          <Image
            src={`https://flagcdn.com/${selected.code}.svg`}
            width={100}
            height={100}
            alt={selected.label}
            style={{
              width: "42px",
              height: "16px",
              minWidth: "42px",
              minHeight: "16px",
            }}
          />
          <ChevronDownIcon className="size-4 xl:size-7 text-blue-950" />
        </div>
      </MenuHandler>
      <MenuList className="flex flex-col items-center justify-center bg-white text-black p-2 pl-2 border-0 z-[100]">
        {items}
      </MenuList>
    </Menu>
  );
}
