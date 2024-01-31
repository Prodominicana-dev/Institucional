"use client";
import Link from "next/link";
import React from "react";

interface props {
  title: string;
  link: string;
  className?: string;
}

export default function NavbarLink({ title, link, className }: props) {
  return (
    <Link
      href={link}
      className={`flex items-center h-20 px-5 text-center bg-transparent rounded-none hover:bg-transparent hover:text-white text-cyan-600 font-bold font-montserrat cursor-pointer  duration-300 ${className}`}
    >
      {title}
    </Link>
  );
}
