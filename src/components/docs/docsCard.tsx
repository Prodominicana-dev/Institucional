import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DocsCard({ id, title, pdf }: any) {
  const t = useTranslations("commonWords");
  return (
    <Card className="w-full h-[32rem]" placeholder={undefined}>
      <CardHeader floated={false} className="h-4/6" placeholder={undefined}>
        <Image
          width={1920}
          height={1080}
          src={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${id}`}
          alt="image"
          className="object-cover h-full"
        />
      </CardHeader>
      <CardBody
        className="text-center h-[20%] flex flex-col justify-center"
        placeholder={undefined}
      >
        <Typography
          color="blue-gray"
          className="mb-2 text-lg"
          placeholder={undefined}
        >
          {title}
        </Typography>
      </CardBody>
      <CardFooter
        className="flex justify-center pt-2 gap-7"
        placeholder={undefined}
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${id}/pdf/${pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
        >
          {t("download")}
        </Link>
      </CardFooter>
    </Card>
  );
}