"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import MemberDialog from "./memberDialog";

interface memberCardProps {
  member: any;
  className?: string;
}

export default function MemberCard({ member, className }: memberCardProps) {
  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(
    `${process.env.NEXT_PUBLIC_API_URL}/files/member/${member.id}/img/${member.image}`
  );
  useEffect(() => {
    setImageUrl(
      `${process.env.NEXT_PUBLIC_API_URL}/files/member/${member.id}/img/${member.image}`
    );
  }, [member]);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div
        onClick={handleOpen}
        className={`group w-full border-2 border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 hover:bg-blue-dark hover:text-white duration-300 cursor-pointer ${className} h-full min-h-80`}
      >
        <Image
          width={1000}
          height={1000}
          alt="emp"
          src={imageUrl}
          className={`rounded-full object-cover w-6/12 aspect-square bg-blue-dark ring-2 ring-white ${
            imageUrl !== "/svg/avatar.svg" && "bg-white"
          }`}
          onError={(e: any) => {
            setImageUrl("/svg/avatar.svg");
          }}
        />
        <div className="w-11/12 text-center">
          <h1 className="text-sm xl:text-xl font-bold">{member.name}</h1>
          <p className="text-xs xl:text-lg text-gray-400">{member.role}</p>
        </div>
      </div>
      <MemberDialog member={member} open={open} handleOpen={handleOpen} />
    </div>
  );
}
