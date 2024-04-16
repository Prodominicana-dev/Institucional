import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Collapse } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";

export default function NavbarCollapseMobile({
  title,
  content,
  closeCollapse,
}: {
  title: string;
  closeCollapse: () => void;
  content: { title: string; link: string }[];
}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between outline-none items-center text-blue-950 text-left font-semibold text-lg py-2"
      >
        {title}
        <div>
          <ChevronRightIcon
            className={`${
              open ? "rotate-90 duration-300" : "rotate-0 duration-300"
            } rotate-0 w-5 h-5`}
          />
        </div>
      </button>
      <Collapse open={open}>
        {content?.map(({ title, link }, index) => (
          <div key={index} className="px-5">
            <Link
              onClick={() => {
                closeCollapse();
                toggleOpen();
              }}
              href={link ? link : "/"}
              className="w-full flex justify-between outline-none items-center text-blue-950 text-left font-normal text-base py-2"
            >
              {title}
            </Link>
          </div>
        ))}
      </Collapse>
    </>
  );
}
