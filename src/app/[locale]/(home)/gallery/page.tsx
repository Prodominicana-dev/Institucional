"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useGallery } from "@/services/gallery/service";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

export default function Page() {
  const params = useParams<{ locale: string }>();
  const [galleries, setGalleries] = useState<any>([]);
  const [galleryFilter, setGalleryFilter] = useState<any>([]);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGallery();
  const t = useTranslations("imageGallery");

  useEffect(() => {
    if (!isLoading && data) {
      setGalleries(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      if (search === "") {
        setGalleries(data);
      } else {
        setGalleries(
          data.filter(
            (item: any) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.titleEn.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search]);

  if (isLoading)
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center">
        <HashLoader />
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center bg-white gap-10 py-10">
      <div>
        <h1 className="text-3xl xl:text-4xl font-montserrat font-extrabold text-[#1E3059]">
          {t("title")}
        </h1>
      </div>
      <div className="w-10/12 flex flex-col gap-10 items-center justify-center">
        <div className="w-full text-lg">
          <label
            htmlFor="search"
            className="w-full flex flex-row border-2 border-gray-400 rounded-lg px-1 py-4 hover:cursor-text"
          >
            <label
              htmlFor="search"
              className="flex justify-center items-center w-1/12 hover:cursor-text"
            >
              <MagnifyingGlassIcon className="size-8 text-gray-400" />
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xl line-clamp-3 w-full px-4 outline-none bg-white"
              placeholder={`${t("search")} ${t("imagesGalleries")}`}
            />
          </label>
        </div>
        {galleries.length > 0 ? (
          <>
            <div className="w-full flex flex-col gap-2">
              <p className="w-full text-sm text-gray-800 text-end">
                {`${t("total")}: ${galleries?.length} ${t("imagesGalleries")}`}
              </p>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleries?.map((item: any, index: number) => (
                  <Link
                    href={`/gallery/${item.id}`}
                    key={index}
                    className="w-full flex flex-col group"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/${item?.id}/img/${item?.cover}`}
                      alt="gallery"
                      width={1920}
                      height={1080}
                      className="w-full h-full object-cover rounded-t-lg z-10"
                    />
                    <div className="w-full py-5  bg-blue-dark bottom-0 z-20 backdrop-blur-[8px] rounded-b-lg px-4 flex flex-row">
                      <div className="w-full flex flex-col">
                        <h1 className="text-white font-bold font-montserrat">
                          {params.locale === "es" ? item.title : item.titleEn}
                        </h1>
                        <p className="text-xs font-semibold text-white font-montserrat">
                          {`${item.photo?.length} ${t("images")}`}
                        </p>
                      </div>
                      <div className="w-2/12 flex justify-center items-center">
                        <ArrowTopRightOnSquareIcon className="size-8 text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-[35vh]">No existen registros</div>
        )}
      </div>
    </div>
  );
}

// function GalleryCard({ title, subtitle }: any) {
//   return (
//     <Link href={`/gallery/carousel/${title}`}>
//       <Image
//         src="/images/prodominicanabuilding.jpg"
//         alt="gallery"
//         width={500}
//         height={500}
//         className="w-full h-full object-cover rounded-lg"
//       />
//       <div className="absolute inset-x-0  bg-blue-gray-900/40 h-full bottom-0  flex justify-center ">
//         <div className="w-11/12 flex flex-col items-center ">
//           <div className="w-11/12 h-full flex flex-col items-center  justify-end  pr-10  ">
//             <p className="text-xs sm:text-[0.46rem] md:text-[12px] lg:text-[15px] xl:text-[12px] 2xl:text-[17px] font-bold object-bottom ">
//               {title}
//             </p>
//             <div className="w-10/12  flex flex-col items-center  justify-end ">
//               <p className=" text-[0.51rem]  sm:text-[0.33rem] md:text-[0.53rem]   xl:text-[0.53rem] lg:text-[0.65rem] 2xl:text-xs font-normal ">
//                 {subtitle}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
