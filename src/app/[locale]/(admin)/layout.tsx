"use client";
import NavBar from "@/components/admin/layout/navbar";
import { SideBar } from "@/components/admin/layout/sidebar";
import { Provider } from "jotai";
import React from "react";
import { Montserrat } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import "@mantine/tiptap/styles.css";
import { MantineProvider } from "@mantine/core";
// Sin este componente, notifications.show() no pinta nada: los avisos de
// exito y error del panel fallaban en silencio.
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
const queryClient = new QueryClient();
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <MantineProvider>
          <Notifications position="top-right" zIndex={2000} />
          <div
            className="w-full h-screen flex bg-white"
            style={monserratStyle.style}
          >
            <div className="items-end hidden h-full lg:flex">
              <SideBar />
            </div>
            <div className={`w-full h-full overflow-y-auto`}>
              <NavBar />
              {children}
            </div>
            <Toaster />
          </div>
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  );
}
