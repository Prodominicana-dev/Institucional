"use client";
import {
  Button,
  Collapse,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface props {
  title: string;
  defaultOpen?: boolean;
  content: {
    title: string;
    link: string;
    icon: string;
  }[];
}

export default function ToolsMenuCollapse({
  title,
  defaultOpen = false,
  content,
}: props) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <button
        onClick={toggleOpen}
        className="w-full h-full flex justify-between outline-none items-center bg-blue-950 text-white rounded-b-xl text-left font-bold text-lg py-2"
      >
        <div className=" relative ml-3">{title}</div>
        <div>
          <ChevronRightIcon
            className={`${
              open ? "rotate-90 duration-300" : "rotate-0 duration-300"
            } rotate-0 w-5 h-5`}
          />
        </div>
      </button>
      <Collapse open={open} className="mt-5">
        <div className="grid grid-cols-3 gap-3">
          {content.map(({ title, link, icon }, index) => (
            <Link
              href={link}
              target="_blank"
              className="flex flex-col items-center space-y-2"
              key={index}
            >
              <div className=" bg-gray-200 rounded-full">
                <Image
                  width={950}
                  height={950}
                  src={icon}
                  alt={""}
                  className="w-20 h-20 p-3"
                />
              </div>
              <div className="w-10/12 text-xs text-center">{title}</div>
            </Link>
          ))}
        </div>
      </Collapse>
    </>
  );
}
