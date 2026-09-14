"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function MujerExportaLayout({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
