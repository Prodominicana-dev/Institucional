import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex w-10/12 items-center justify-center h-screen py-10 gap-5"></div>
      <div className="bg-blue-950 w-3/12 h-full rounded-xl"></div>
      {children}
    </div>
  );
}
