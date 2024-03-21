import Link from "next/link";
import React from "react";

export default function SidebarDocs({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <Link
      href={`/transparency/${id}`}
      className="w-11/12 h-14 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg group px-5"
    >
      <h1 className="text-white font-montserrat text-lg font-semibold">
        {title}
      </h1>
      {/* <DocumentDuplicateIcon className='size-6 text-white group-hover:hidden flex' />
        <DocDupSolidIcon className='size-6 text-white hidden group-hover:flex ' /> */}
    </Link>
  );
}
