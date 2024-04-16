import Link from "next/link";
import React from "react";

export default function NavbarButtonMobile({
  title,
  link,
  closeCollapse,
}: {
  title: string;
  link: string;
  closeCollapse: () => void;
}) {
  return (
    <>
      <Link
        onClick={closeCollapse}
        href={link ? link : "/"}
        className="w-full flex justify-center rounded-full shadow-md outline-none items-center bg-red-700  text-white text-left font-semibold text-lg py-2 mb-4"
      >
        {title}
      </Link>
    </>
  );
}
