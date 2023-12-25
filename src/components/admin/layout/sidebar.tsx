"use client";
import { sideBarAtom } from "@/states/states";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SideBar() {
  const [isVisible] = useAtom(sideBarAtom);
  return (
    <>
      <div
        className={`${
          isVisible ? "w-28" : "w-0"
        }  h-full group hover:w-60 duration-500 bg-blue-dark flex flex-col items-center px-2  py-10 space-y-6`}
      >
        <Link href={"admin/"}>
          <Image
            src={"/png/layout/sidebar/prodominicana.png"}
            alt="logo"
            width={400}
            height={600}
            className="w-full h-6 group-hover:h-12 duration-300"
          />
        </Link>
        <div className="flex flex-col space-y-4 w-full">
          <Link
            href={"admin/"}
            className="flex flex-row w-full space-x-5 justify-center items-center"
          >
            <Image
              src={"/svg/layout/sidebar/home.svg"}
              alt="home"
              width={40}
              height={40}
              className="w-8 h-8"
            />
            <p className="hidden group-hover:flex duration-500 text-white font-normal">
              Inicio
            </p>
          </Link>
          <div className="divide-y w-10/12 bg-gray-200"></div>
          <Link
            href={"admin/"}
            className="flex flex-row w-full space-x-5 justify-center items-center"
          >
            <Image
              src={"/svg/layout/sidebar/home.svg"}
              alt="home"
              width={40}
              height={40}
              className="w-8 h-8"
            />
            <p className="hidden group-hover:flex duration-300 text-white font-normal">
              Inicio
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
