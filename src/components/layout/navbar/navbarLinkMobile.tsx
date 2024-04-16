import Link from "next/link";
import React from "react";

export default function NavbarLinkMobile({
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
        className="w-full flex justify-between outline-none items-center  text-blue-950 text-left font-semibold text-lg py-2 "
      >
        {title}
      </Link>
    </>
  );
}
