"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CogIcon,
  HomeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Spinner,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useNewsById, usePrevNextById } from "@/services/news/service";
import NewsContent from "@/components/news/content";
import TextContent from "@/components/news/text";
import { useParams } from "next/navigation";

export default function Page() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const { data, isLoading } = useNewsById(locale, id);
  const { data: nextPrev, isLoading: nextPrevLoading } = usePrevNextById(
    locale,
    id
  );
  const [article, setArticle] = useState<any>();
  const route = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/news/${id}`;

  useEffect(() => {
    if (!isLoading && data) {
      setArticle(data);
    }
    if (!nextPrevLoading && nextPrev) {
    }
  }, [data, isLoading, nextPrev, nextPrevLoading]);
  if (isLoading && nextPrevLoading) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center bg-white">
        <Spinner className="size-8 text-white" />
      </div>
    );
  }
  return (
    <div className="bg-white w-full relative">
      <div className="bg-blue-950 h-[60vh] absolute inset-0 "></div>
      <div className="w-full h-full relative">
        <div className="flex flex-col justify-center items-center text-white font-opensans pt-10 gap-5">
          <div className="w-10/12 sm:w-8/12 lg:w-7/12 space-y-5">
            <div className="flex gap-5">
              <h1 className="text-3xl lg:text-5xl font-extrabold border-l-2 border-red-700 pl-5 py-2 break-words">
                {article?.title}
              </h1>
            </div>
            {/* <div dangerouslySetInnerHTML={  } className="ml-6 text-sm lg:text-base font-semibold">
              {article?.description}
            </div> */}
            {/* insertar el article.description como innerHTML */}
            <div
              className="ml-6 text-sm lg:text-base"
              dangerouslySetInnerHTML={{ __html: article?.description }}
            ></div>
          </div>
          <div className="w-10/12 lg:w-8/12">
            <Image
              width={3840}
              height={2160}
              alt="new"
              src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${article?.id}/${article?.cover}`}
              className="w-full object-cover object-center relative min-h-[50vh] max-h-[80vh]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-10 gap-10 text-gray-900">
          <div className="w-10/12 lg:w-8/12 ">
            <TextContent text={article?.content} />
            {/* <NewsContent id={article?.id} content={article?.content} /> */}
          </div>
          <div className="w-10/12 lg:w-8/12">
            <SpeedDial placement="right">
              <SpeedDialHandler>
                <IconButton
                  size="lg"
                  className="rounded-full bg-blue-950 flex justify-center items-center cursor-pointer"
                  placeholder={undefined}
                >
                  <ShareIcon className="size-4 duration-300" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent
                placeholder={undefined}
                className="flex flex-row flex-wrap w-9/12"
              >
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-blue-500 size-8 border-0"
                >
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${route}&src=sdkpreparse`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook-f"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>

                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-green-500 size-8 border-0"
                >
                  <Link
                    href={`https://api.whatsapp.com/send?text=${article?.title} ${route}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "whatsapp"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-[#0077b5] size-8 border-0"
                >
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${route}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "linkedin-in"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-black size-8 border-0"
                >
                  <Link
                    href={`https://www.x.com/share?url=${route}&text=${article?.title}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "x-twitter"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-black size-8 border-0"
                >
                  <Link
                    href={`https://threads.net/intent/post?text=${article?.title} ${route}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "threads"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction
                  placeholder={undefined}
                  className="border-0 p-0 m-0"
                >
                  <Link
                    href={`https://www.t.me/share?url=${route}&text=${article?.title}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "telegram"]}
                      className="text-[#24A1DE] text-4xl"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-white size-8 border-0 p-0 m-0"
                >
                  <Link
                    href={`mailto:?subject=${article?.title}&body=${route}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["far", "envelope"]}
                      className="text-black text-2xl"
                    />
                  </Link>
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </div>
          <div
            className={`${
              nextPrev?.prev && nextPrev?.prev.id !== null
                ? "justify-between"
                : "justify-end"
            } w-10/12 lg:w-8/12 flex gap-10`}
          >
            {nextPrev?.prev && nextPrev?.prev.id !== null && (
              <Link
                href={`${nextPrev?.prev.id}`}
                className="w-6/12 cursor-pointer text-left space-y-3"
              >
                <div className="flex items-center gap-3 font-bold text-gray-500">
                  <ArrowLeftIcon className="w-6" />
                  {locale === "en" ? "Previous" : "Anterior"}
                </div>
                <p className="font-bold text-sm lg:text-2xl text-gray-700 line-clamp-3">
                  {nextPrev?.prev.title}
                </p>
              </Link>
            )}
            {nextPrev?.next && nextPrev?.next.id !== null && (
              <Link
                href={`${nextPrev?.next.id}`}
                className="w-6/12 cursor-pointer flex flex-col items-end text-right space-y-3"
              >
                <div className="flex items-center gap-3 font-bold text-gray-500">
                  {locale === "en" ? "Next" : "Siguiente"}
                  <ArrowRightIcon className="w-6" />
                </div>
                <p className="font-bold text-sm lg:text-2xl text-gray-700 line-clamp-3">
                  {nextPrev?.next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
