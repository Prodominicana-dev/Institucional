"use client";

import React from "react";

export default function Sketch({
  title,
  subtitle,
  handleFilterOpen,
  children,
  buttons,
}: {
  title: string;
  subtitle?: string;
  handleFilterOpen: () => void;
  children: React.ReactNode;
  buttons: { name: string; onClick: () => void }[];
}) {
  return (
    <>
      <div className="w-full min-h-[85vh] space-y-8 flex flex-col items-center p-8">
        <div className="w-11/12 h-24 flex justify-between items-center text-black">
          <div className="flex flex-col">
            <div className="font-extrabold text-4xl">{title}</div>
            {subtitle && (
              <label className="text-base font-normal">{subtitle}</label>
            )}
          </div>
          <div className="space-x-4">
            {buttons?.map((button, key) => {
              return (
                <button
                  key={key}
                  onClick={button.onClick}
                  className="w-36 h-12 rounded-full bg-blue-dark text-white hover:text-white/80 hover:shadow-md"
                >
                  {button.name}
                </button>
              );
            })}
            <button
              onClick={handleFilterOpen}
              className="w-36 h-12 rounded-full border-[1px] border-gray-400 text-gray-400 hover:text-gray-400/80 hover:shadow-sm"
            >
              Filtrar
            </button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
