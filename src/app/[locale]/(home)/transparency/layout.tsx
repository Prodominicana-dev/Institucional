"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransparencySidebar from "@/components/transparencia/sidebar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <div className='w-full h-[80vh] bg-white flex flex-row justify-center items-center'>
        <div className='w-6/12 h-full flex justify-center items-center'>
            <TransparencySidebar />
        </div>
        <div className='w-6/12 h-5/6 text-black overflow-auto'>{children}</div>
        </div>
      </QueryClientProvider>
      </div>
  );
}
