"use client";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";

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
    <Menu.Item
      leftSection={
        <Image
          src={`https://flagcdn.com/${item.code}.svg`}
          width={100}
          height={100}
          alt={item.label}
          className="w-8 h-5 sm:w-12 sm:h-8 object-cover"
        />
      }
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const pathname = usePathname();

  function switchLocale(locale: string) {
    if (locale === "es" || locale === "en") {
      router.replace(pathname, { locale });
    }
  }
  useEffect(() => {
    switchLocale(selected.langcode);
  }, [selected]);

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
    >
      <Menu.Target>
        <UnstyledButton data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image
              src={`https://flagcdn.com/${selected.code}.svg`}
              width={100}
              height={100}
              alt={selected.label}
              className="w-10 h-7 sm:w-10 xl:w-12 sm:h-6 object-cover"
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className="flex flex-col items-center justify-center bg-white">
        {items}
      </Menu.Dropdown>
    </Menu>
  );
}
