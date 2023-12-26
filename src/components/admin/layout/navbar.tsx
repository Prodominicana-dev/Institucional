"use client";
import React from "react";
import { useAtom } from "jotai";
import { sideBarAtom } from "@/states/states";
import Image from "next/image";

export default function NavBar() {
  const [isVisible, setIsVisible] = useAtom(sideBarAtom);
  return (
    <>
      <div className="w-10/12 h-24 flex flex-row justify-between items-center">
        <button
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <Image
            src={"svg/layout/navbar/menu.svg"}
            alt="menu"
            className="bg-white"
            width={30}
            height={30}
          />
        </button>
      </div>
    </>
  );
}
