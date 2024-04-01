"use client";
import Link from "next/link";
import React from "react";
import { LinkIcon } from "@heroicons/react/24/solid";

export default function MenuLink({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className="w-11/12 py-2 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg px-0"
    >
      <h1 className="text-black font-montserrat text-sm font-normal">
        {title}
      </h1>
      {/* <LinkIcon className='size-6 text-black' /> */}
    </Link>
  );
}
