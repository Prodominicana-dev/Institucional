"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface props {
  member: any;
  open: boolean;
  handleOpen: () => void;
}

export default function MemberDialog({ member, open, handleOpen }: props) {
  const t = useTranslations("organizationalChart");
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image
            width={1000}
            height={1000}
            alt="emp"
            src={`${process.env.NEXT_PUBLIC_API_URL}/files/member/${member.id}/img/${member.image}`}
            className="rounded-full object-cover w-48 aspect-square"
          />
          <div className="text-center">
            <h1 className="text-sm xl:text-3xl font-bold text-blue-dark">
              {member.name}
            </h1>
            <p className="text-xs xl:text-xl text-gray-400">{member.role}</p>
          </div>
        </div>
        <div className="w-10/12 flex flex-col gap-3">
          <h1 className="text-2xl border-b-2 font-bold text-blue-dark border-blue-dark">
            {t("regulation")}
          </h1>
          <p className="text-black">{member.regulation}</p>
        </div>
        <div className="w-10/12 flex flex-col gap-3">
          <h1 className="text-2xl border-b-2 font-bold text-blue-dark border-blue-dark">
            {t("functions")}
          </h1>
          <ol className="text-black list-inside list-disc space-y-2">
            {member.functions.map((func: string, index: number) => (
              <li key={index}>{func}</li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
