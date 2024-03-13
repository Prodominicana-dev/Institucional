import React from "react";
import Image from "next/image";

interface memberCardProps {
  name: string;
  role: string;
  image: string;
  className?: string;
}

export default function MemberCard({
  name,
  role,
  image,
  className,
}: memberCardProps) {
  return (
    <div
      className={`w-full border-2 border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 hover:bg-blue-dark hover:text-white duration-300 cursor-pointer ${className} min-h-40`}
    >
      <Image
        width={1000}
        height={1000}
        alt="emp"
        src={"/images/EdgarEspinal.jpg"}
        className="rounded-full object-cover w-6/12 aspect-square"
      />
      <div className="w-11/12 text-center">
        <h1 className="text-sm xl:text-xl font-bold">{name}</h1>
        <p className="text-xs xl:text-lg text-gray-400">{role}</p>
      </div>
    </div>
  );
}
