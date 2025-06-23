"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const data = [
  { label: "Español", code: "do", langcode: "es" },
  { label: "English", code: "gb", langcode: "en" },
];

export default function LanguagePicker() {
  const locale = useParams().locale;
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    data.find((item) => item.langcode === locale) || data[0]
  );
  const items = data.map((item) => (
    <MenuItem onClick={() => setSelected(item)} key={item.label}>
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

  const pathname = usePathname();
  const params = useParams();

  function switchLocale(locale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: locale }
    );
  }
  useEffect(() => {
    switchLocale(selected.langcode);
  }, [selected]);

  return (
    <Menu>
      <MenuHandler>
        <div className="flex gap-2 items-center justify-center cursor-pointer">
          <Image
            src={`https://flagcdn.com/${selected.code}.svg`}
            width={100}
            height={100}
            alt={selected.label}
            style={{ width: "42px", height: "16px" }}
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
