"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { sideBarAtom } from "@/states/states";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import UserProfile from "./userProfile";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [isVisible, setIsVisible] = useAtom(sideBarAtom);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();

  useEffect(() => {
    const sidebarOpen = localStorage.getItem("sidebarOpen");
    if (sidebarOpen === null) {
      localStorage.setItem("sidebarOpen", "true");
      setIsVisible(true);
    } else {
      setIsVisible(sidebarOpen === "true");
    }
  }, []);

  const handleOpen = () => {
    // Cambiar el estado y almacenarlo en localStorage
    const newSidebarOpen = !isVisible;
    localStorage.setItem("sidebarOpen", newSidebarOpen.toString());
    setIsVisible(newSidebarOpen);
  };

  return (
    <>
      <div className="w-full h-[15vh] flex flex-row justify-between items-center p-8">
        <button onClick={handleOpen}>
          <Bars3Icon className="w-7 h-7 text-black" />
        </button>
        <UserProfile />
      </div>
    </>
  );
}
