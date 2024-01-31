"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

interface props {
  title: string;
  link: string;
  icon: string;
  className?: string;
}

export default function NavbarButton({ title, link, icon, className }: props) {
  return (
    <Link
      href={link}
      className={`flex justify-center items-center  w-28 bg-red-700 py-2  rounded-full gap-1 ${className}}`}
    >
      <Image
        alt=""
        width={50}
        height={50}
        src={icon}
        className="w-6 x:lw-8 cursor-pointer"
      />
      <Typography
        placeholder={undefined}
        className="text-white text-sm p-1 font-bold font-montserrat "
      >
        {title}
      </Typography>
    </Link>
  );
}
