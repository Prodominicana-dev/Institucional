"use client";
import { useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  params: { name: string };
}

const photos = [
  {
    id: 1,
    src: "/event1.jpg",
    width: 4780,
    height: 3180,
    srcSet: [
      { src: "/images/event1.jpg", width: 1383, height: 922 },
      { src: "/images/event1.jpg", width: 692, height: 461 },
    ],
  },
  {
    id: 2,
    src: "/event1.jpg",
    width: 2766,
    height: 1844,
    srcSet: [
      { src: "/images/event1.jpg", width: 1383, height: 922 },
      { src: "/images/event1.jpg", width: 692, height: 461 },
    ],
  },
  {
    id: 3,
    src: "/event1.jpg",
    width: 2766,
    height: 1844,
    srcSet: [
      { src: "/images/event1.jpg", width: 1383, height: 922 },
      { src: "/images/event1.jpg", width: 692, height: 461 },
    ],
  },
  {
    id: 4,
    src: "/event1.jpg",
    width: 2766,
    height: 1844,
    srcSet: [
      { src: "/images/event1.jpg", width: 1383, height: 922 },
      { src: "/images/event1.jpg", width: 692, height: 461 },
    ],
  },
  {
    id: 5,
    src: "/event1.jpg",
    width: 2766,
    height: 1844,
    srcSet: [
      { src: "/images/event1.jpg", width: 1383, height: 922 },
      { src: "/images/event1.jpg", width: 692, height: 461 },
    ],
  },
  {
    id: 6,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 7,
    src: "/images/prodominicanabuilding.jpg",
    width: 2766,
    height: 1844,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 6,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 7,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 8,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 9,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 10,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 11,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 12,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 13,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 14,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 15,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 16,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 17,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 18,
    src: "/images/prodominicanabuilding.jpg",
    width: 3720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 19,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 20,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 21,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 22,
    src: "/images/prodominicanabuilding.jpg",
    width: 3720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 1860, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 23,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 24,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 25,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 26,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 27,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 28,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 29,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 30,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 31,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 32,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
  {
    id: 33,
    src: "/images/prodominicanabuilding.jpg",
    width: 6720,
    height: 4480,
    srcSet: [
      { src: "/images/prodominicanabuilding.jpg", width: 3360, height: 2240 },
      { src: "/images/prodominicanabuilding.jpg", width: 1680, height: 1120 },
    ],
  },
];

export default function Carousel({ params }: Props) {
  const [index, setIndex] = useState(-1);
  const galleryTitle = decodeURIComponent(params.name);
  return (
    <div className=" bg-white p-7 flex flex-col items-center overflow-hidden ">
      <div>
        <h1 className=" flex justify-center items-center text-base sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-montserrat font-extrabold text-[#1E3059] mb-3 py-3 overflow-hidden">
          Galeria de {galleryTitle}
        </h1>
      </div>
      <div className="sm:6/12 w-8/12 overflow-hidden ">
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

      <Lightbox
        slides={photos}
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
