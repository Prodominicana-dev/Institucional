import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SocialMedia({
  url,
  image,
  alt,
}: {
  url: string;
  image: string;
  alt: string;
}) {
  return (
    <Link href={url} target="_blank">
      <Image alt={alt} src={image} width={25} height={25} className="filter brightness-0 invert"  />
    </Link>
  );
}
