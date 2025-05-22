"use client";
import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

interface SocialMediaProps {
  className?: string;
  name: string;
  username: string;
  logo: string;
  url: string;
}
export default function SocialMediaCard({
  className,
  name,
  username,
  logo,
  url,
}: SocialMediaProps) {
  return (
    <Link
      className={`flex p-5 w-full items-center space-x-5 ${className}`}
      href={url}
      target="_blank"
    >
      <Image
        width={100}
        height={100}
        alt={name}
        src={logo}
        className="w-10 h-10"
      />
      <div>
        <Typography className="text-lg text-white uppercase font-bold">
          {name}
        </Typography>
        <Typography className="text-xs text-white/70 uppercase font-light">
          {username}
        </Typography>
      </div>
    </Link>
  );
}
