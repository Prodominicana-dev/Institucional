import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Drawer } from "@material-tailwind/react";

export default function Navbar(options: any) {
  return (
    <div className="absolute w-full justify-center items-center top-0 z-10 hidden xl:flex h-[20vh]">
      <div className="w-11/12 flex justify-between items-center">
        <Link href={"/export"}>
          <Image
            width={1000}
            height={1000}
            alt="prodominicana"
            src={"/svg/prodominicanaFull-white.svg"}
            className="object-cover w-52"
          />
        </Link>
        <div className="backdrop-blur-lg p-3 h-min rounded-full grid grid-cols-4 gap-3 w-9/12">
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

export function NavbarExportMobile({ options }: { options: any }) {
  const [openMenu, setOpenMenu] = useState(false);
  const openDrawer = () => setOpenMenu(true);
  const closeDrawer = () => setOpenMenu(false);
  return (
    <div className="flex px-5 items-center absolute z-10 justify-between w-full py-2 lg:hidden">
      <Image
        src="/svg/prodominicanaFull-white.svg"
        width={240}
        height={240}
        alt="prointeligencia"
        className="size-32"
      />

      <div className="w-2/12">
        <button className="outline-none" onClick={openDrawer}>
          <Bars3Icon className="w-8 h-8 text-white" />
        </button>
        <Drawer
          open={openMenu}
          onClose={closeDrawer}
          className=""
          placement="right"
        >
          <div className="flex flex-col gap-8 ">
            <div className="min-h-[8rem] py-3 flex justify-center items-center w-full bg-blue-950">
              <Image
                src="/svg/prodominicanaFull-white.svg"
                width={240}
                height={240}
                alt="prointeligencia"
                className="w-56"
              />
            </div>
            <div className="flex flex-col gap-3 px-4">
              {options.map((tool: any, index: number) => (
                <Link
                  key={index}
                  className="flex flex-row items-center gap-1 px-5 py-3 text-black rounded-lg outline-none hover:bg-transparent hover:text-mint bg-gray-50"
                  href={tool.link}
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
