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
import { useRouter } from "next/navigation";
import { useGalleryByNameAndLang } from "@/services/gallery/service";
import { Spinner } from "@material-tailwind/react";
// const sizeOf = require("image-size");

interface Props {
  params: { title: string; locale: string };
}

export default function Carousel({ params }: Props) {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [photosSrc, setPhotosSrc] = useState<any[]>([]);
  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const galleryTitle = decodeURIComponent(params.title);
  const [galleryData, setGallery] = useState<any>();

  const { data: photoss, isLoading: photoLoading } = useGalleryByNameAndLang(
    params.title
  );

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

  // useEffect(() => {
  //   const dimensions = async () => {
  //     const srcs = photos?.map(async (item: any) => {
  //       const dimension = await sizeOf(
  //         `${process.env.NEXT_PUBLIC_API_URL}/gallery/${item?.galleryId}/img/${item?.name}`
  //       );
  //       return dimension;
  //     });
  //     console.log(srcs);
  //   };
  //   dimensions();
  // }, [photos]);

  if (photoLoading)
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center ">
        <Spinner className="size-7" />
      </div>
    );

  return (
    <div className=" bg-white p-7 flex flex-col items-center overflow-hidden ">
      <div>
        <h1 className=" flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-montserrat font-extrabold text-[#1E3059] mb-3 py-3 overflow-hidden">
          Galeria {params.locale === "es" ? titleEs : titleEn}
        </h1>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="w-full text-sm text-gray-800 ">
          Total: {photos?.length} imágenes
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* {photos?.length > 0 &&
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
                  className="w-full object-center object-cover rounded-lg z-10"
                />
              </div>
            ))} */}
          <PhotoAlbum
            key={index}
            photos={photos}
            layout="columns"
            spacing={7}
            columns={(containerWidth) => {
              if (containerWidth < 500) return 1;
              if (containerWidth < 800) return 2;
              if (containerWidth < 1200) return 2;
              return 3;
            }}
            targetRowHeight={50}
            onClick={({ index }) => setIndex(index)}
          />
        </div>
      </div>
      <div className="sm:6/12 w-8/12 overflow-hidden ">
        <Lightbox
          slides={photosSrc}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </div>
  );
}
