"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import SocialMediaCard from "./socialMediaCard";
import { useTranslations } from "next-intl";

export default function SocialMediaSection() {
  const t = useTranslations("SocialMedia");
  return (
    <section className="bg-slate-300 w-full flex justify-center p-10 lg:p-20">
      <div className="w-full space-y-5">
        <div>
          <Typography className="text-lg text-blue-950 uppercase font-light font-opensans">
            {t("miniTitle")}
          </Typography>
          <Typography className="text-4xl text-blue-950 uppercase font-extrabold font-opensans">
            {t("title")}
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <SocialMediaCard
            className="bg-blue-600"
            name={"facebook"}
            username={"@prodominicana"}
            logo={"svg/social/facebook.svg"}
            url={"https://www.facebook.com/Prodominicana"}
          />
          <SocialMediaCard
            className="bg-black"
            name={"x"}
            username={"@prodominicana"}
            logo={"svg/social/x.svg"}
            url={"https://x.com/prodominicana"}
          />
          <SocialMediaCard
            className="bg-gradient-to-r from-[#FCB045] via-[20%] via-[#FD1D1D] to-[#833AB4]"
            name={"instagram"}
            username={"@prodominicana"}
            logo={"svg/social/instagram.svg"}
            url={"https://www.instagram.com/prodominicana"}
          />
          <SocialMediaCard
            className="bg-red-600"
            name={"youtube"}
            username={"@prodominicana"}
            logo={"svg/social/youtube.svg"}
            url={"https://www.youtube.com/@ProDominicana"}
          />
        </div>
      </div>
    </section>
  );
}
