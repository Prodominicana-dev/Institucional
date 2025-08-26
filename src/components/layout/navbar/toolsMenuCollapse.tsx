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
    <div>
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center rounded-md 
               text-start font-semibold text-base text-blue-950/90
               py-2 px-2.5 focus:outline-none cursor-pointer 
               hover:text-blue-900"
        aria-expanded={open}
        aria-controls="tools-menu-content"
      >
        <span className="flex-grow text-start whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </span>
        <ChevronRightIcon
          className={`${
            open ? "rotate-90" : "rotate-0"
          } w-4 h-4 transition-transform duration-300 ease-in-out`}
        />
      </button>

      <div
        id="tools-menu-content"
        className={`mt-2 md:mt-5 w-full overflow-hidden ${
          open ? "max-h-screen" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-3 gap-2.5 px-0 py-2.5 justify-items-center">
          {content.map(({ title, link, icon }, index) => (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group flex flex-col items-center justify-start gap-2 w-[98px] h-[108px] py-2 mb-2 px-2 font-normal text-gray-700 rounded-md bg-transparent border-0 hover:text-blue-950 text-center text-[10px] transition-colors duration-200 hover:bg-[#f0f7ff] focus:outline-none focus:ring-0 focus:border-0"
              title={title}
            >
              <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#f7fafc] mb-[5px] shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={icon}
                    alt={`Logo de ${title}`}
                    width={56}
                    height={56}
                    className="max-w-[56px] max-h-[56px]"
                    style={{
                      width: "56px",
                      height: "56px",
                      objectFit: "contain",
                    }}
                    sizes="56px"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="w-full text-center text-[9px] leading-tight whitespace-normal break-words max-w-full line-clamp-2 overflow-hidden">
                {title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
