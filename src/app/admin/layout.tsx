"use client";
import NavBar from "@/components/admin/layout/navbar";
import { SideBar } from "@/components/admin/layout/sidebar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "jotai";
import React from "react";
import { Montserrat } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex bg-white" style={monserratStyle.style}>
      <div className="h-screen hidden lg:flex">
        <SideBar />
      </div>
      <div className={`w-full h-full`}>
        <NavBar />
        {children}
      </div>
      <Notifications zIndex={9999} />
    </div>
  );
}
