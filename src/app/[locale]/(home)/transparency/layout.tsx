"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransparencySidebar from "@/components/transparencia/sidebar";
import TransparencyMenuMobile from "@/components/transparencia/mobile/menu-mobile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="w-full py-10 bg-white flex flex-row justify-center">
          <div className="w-10/12 flex flex-col lg:flex-row justify-center gap-10">
            <div className="w-full lg:w-3/12  flex justify-center">
              <TransparencySidebar />
              <TransparencyMenuMobile />
            </div>
            <div className="w-full lg:w-9/12 text-black overflow-auto lg:border-2 border-gray-300 lg:p-5 rounded-lg flex justify-center">
              {children}
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
