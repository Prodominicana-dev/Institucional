"use client";
import { useEffect, useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { usePhotoGalleryByNameAndLang } from "@/services/gallery/photo/service";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useGalleryById } from "@/services/gallery/service";
import { Spinner } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
// const sizeOf = require("image-size");

export default function Carousel() {
  const params = useParams<{ id: string; locale: string }>();
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [photosSrc, setPhotosSrc] = useState<any[]>([]);
  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const t = useTranslations("imageGallery");

  const { data: photoss, isLoading: photoLoading } = useGalleryById(params.id);

  useEffect(() => {
    if (photoss && !photoLoading) {
      setTitleEn(photoss.titleEn);
      setTitleEs(photoss.title);
      setPhotos(photoss.photo);
      //   setPhotos(photoss);
      const srcs = photoss.photo?.map((item: any) => {
        return {
          src: `${process.env.NEXT_PUBLIC_API_URL}/gallery/${item?.galleryId}/img/${item?.name}`,
        };
      });
      setPhotosSrc(srcs);
    }
  }, [photoss, photoLoading]);

  if (photoLoading)
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center ">
        <Spinner
          className="size-7"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );

  return (
    <div className=" bg-white p-7 flex flex-col items-center overflow-hidden ">
      <div>
        <h1 className=" flex justify-center items-center text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-montserrat font-extrabold text-[#1E3059] mb-3 py-3 overflow-hidden">
          {params.locale === "es" ? titleEs : titleEn}
        </h1>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="w-full text-gray-800 text-end">
          {`${t("total")}: ${photos?.length} ${t("images")}`}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {photos?.length > 0 &&
            photos?.map((item: any, index: number) => (
              <div
                onClick={() => {
                  setIndex(index);
                }}
                key={index}
                className="w-full flex flex-col group"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/${item?.galleryId}/img/${item?.name}`}
                  alt="gallery"
                  width={1920}
                  height={1080}
                  className="w-full object-cover rounded-lg z-10 cursor-pointer xl:h-96"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="sm:6/12 w-8/12 overflow-hidden ">
        <Lightbox
          slides={photosSrc}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </div>
  );
}
