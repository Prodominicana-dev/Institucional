import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Navbar(options: any) {
  return (
    <div className="absolute w-full justify-center items-center top-0 p-10 z-10 hidden xl:flex">
      <div className="w-11/12 flex justify-between items-center">
        <Link href={"/export"}>
          <Image
            width={1000}
            height={1000}
            alt="prodominicana"
            src={"/svg/prodominicanaFull-white.svg"}
            className="object-cover w-64"
          />
        </Link>
        <div className="backdrop-blur-lg p-7 h-min rounded-full grid grid-cols-5 gap-3 w-9/12">
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
        <div className="text-white text-center text-sm">{title}</div>
      </Link>
    </div>
  );
}
