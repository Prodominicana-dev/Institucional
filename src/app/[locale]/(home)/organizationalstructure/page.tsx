"use client";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white flex justify-center p-10">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center">
          <EmployeeCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
        </div>
      </div>
    </div>
  );
}

function EmployeeCard() {
  return (
    <div className="size-64 border-2 border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3">
      <Image
        width={1000}
        height={1000}
        alt="emp"
        src={"/images/EdgarEspinal.jpg"}
        className="rounded-full object-cover size-32"
      />
      <div className="w-10/12 text-center">
        <h1 className="text-lg font-bold">Edgar Espinal Quezada</h1>
        <p className="text-sm text-gray-400">
          Director de Innovacion Estrategica
        </p>
      </div>
    </div>
  );
}
