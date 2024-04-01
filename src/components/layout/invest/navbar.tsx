import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavBar from "../../admin/layout/navbar";

export default function Navbar(options: any) {
  return (
    <div className="absolute w-full justify-center items-center gap-5 top-0 p-10 z-10 hidden xl:flex">
      <Link href={"/invest"}>
        <Image
          width={1000}
          height={1000}
          alt="investindr"
          src={"/svg/investindr.svg"}
          className="object-cover w-64"
        />
      </Link>
      <div className="bg-white/60 backdrop-blur-lg w-8/12 p-7 h-min rounded-full flex justify-between">
        {options.options.map((option: any, index: number) => (
          <NavBarLink
            title={option.title}
            icon={option.icon}
            link={option.link}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function NavBarLink({ title, icon, link }: any) {
  return (
    <div>
      <Link
        href={link}
        className="flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-500 ease-in-out"
      >
        <Image
          width={100}
          height={100}
          alt="drmap"
          src={icon}
          className="object-cover w-10"
        />
        <div className="text-blue-dark text-center text-sm w-40">{title}</div>
      </Link>
    </div>
  );
}
