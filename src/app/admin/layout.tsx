"use client";
import NavBar from "@/components/admin/layout/navbar";
import { SideBar } from "@/components/admin/layout/sidebar";
import { sideBarAtom } from "@/states/states";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "jotai";
import React from "react";
import { Montserrat } from "@next/font/google";

const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Provider>
        <div
          className="w-full h-screen flex bg-white"
          style={monserratStyle.style}
        >
          <div className="h-screen hidden lg:flex">
            <SideBar />
          </div>
          <div className={`w-full h-full`}>
            <NavBar />
            {children}
          </div>
        </div>
      </Provider>
    </UserProvider>
  );
}
