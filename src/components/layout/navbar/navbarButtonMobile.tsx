import Link from "next/link";
import React from "react";

export default function NavbarButtonMobile({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <>
      <Link
        href={link ? link : "/"}
        className="w-full flex justify-center rounded-full shadow-md outline-none items-center bg-red-700  text-white text-left font-semibold text-lg py-2 mb-4"
      >
        {title}
      </Link>
    </>
  );
}
