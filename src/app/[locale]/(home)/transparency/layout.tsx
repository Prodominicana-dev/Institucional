"use client";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransparencySidebar from "@/components/transparencia/sidebar";
import TransparencyMenuMobile from "@/components/transparencia/mobile/menu-mobile";
import { atom } from "jotai";
import { useSection } from "@/services/section/service";
import { Spinner } from "@material-tailwind/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const { data, isLoading } = useSection();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setSections(data);
    }
  }, [data, isLoading]);
  if (isLoading)
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center">
        <Spinner className="size-6" />
      </div>
    );
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="w-full py-10 bg-white flex flex-row justify-center">
          <div className="w-10/12 flex flex-col lg:flex-row justify-center gap-10">
            <div className="w-full lg:w-3/12 flex justify-center">
              <TransparencySidebar sections={sections} />
              <TransparencyMenuMobile sections={sections} />
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
