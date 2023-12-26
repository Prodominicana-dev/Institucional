"use client";
import NavBar from "@/components/admin/layout/navbar";
import { SideBar } from "@/components/admin/layout/sidebar";
import { sideBarAtom } from "@/states/states";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider, useAtom } from "jotai";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Provider>
        <div className="w-full h-screen flex bg-white">
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
