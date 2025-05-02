"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "@/i18n/navigation";

interface props {
  title: string;
  link: string;
  className?: string;
}

const routermap: Record<string, string> = {
  "/contacto": "/contact",
  "/complaint": "/complaint",
};

export default function NavbarLink({ title, link, className }: props) {
  const path = usePathname();
  const normalizedPathname = path.replace(/\/$/, "");
  const translatedPath = routermap[normalizedPathname] || normalizedPathname;
  const verrifyPath = translatedPath === link;

  return (
    <Link
      href={link}
      className={`flex items-center h-20 px-5 text-center bg-transparent rounded-none hover:bg-transparent hover:text-white font-bold font-montserrat cursor-pointer  duration-300 ${className} ${
        verrifyPath ? "text-white" : "text-cyan-600"
      }`}
    >
      {title}
    </Link>
  );
}
