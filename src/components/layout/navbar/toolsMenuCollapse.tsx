"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  title: string;
  link: string;
  icon: string;
}

interface Props {
  title: string;
  defaultOpen?: boolean;
  content: MenuItem[];
}

export default function ToolsMenuCollapse({
  title,
  defaultOpen = false,
  content,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <button
        onClick={toggleOpen}
        className="w-full h-full flex justify-between items-center bg-blue-950 text-white rounded-b-xl text-left font-bold text-lg py-2 px-3"
        aria-expanded={open}
        aria-controls="tools-menu-content"
      >
        <span>{title}</span>
        <ChevronRightIcon
          className={`${
            open ? "rotate-90 duration-300" : "rotate-0 duration-300"
          } w-5 h-5`}
        />
      </button>
      <div
        id="tools-menu-content"
        className={`${open ? "block" : "hidden"} mt-5`}
      >
        <div className="grid grid-cols-3 gap-6">
          {content.map(({ title, link, icon }, index) => (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group flex h-full w-full flex-col items-center justify-start gap-2 rounded-md px-2 py-3 text-center text-[10px] font-semibold text-[#003876] hover:text-blue-950 "
            >
              <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-gray-200 group-hover:border-blue-950 overflow-hidden">
                <Image
                  src={icon}
                  alt={`Logo de ${title}`}
                  loading="lazy"
                  className="object-contain p-[10px]"
                  width={60}
                  height={60}
                  sizes="60px"
                  priority={false}
                />
              </div>
              <p>{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
