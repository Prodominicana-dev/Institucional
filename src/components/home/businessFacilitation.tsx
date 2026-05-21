"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function BusinessFacilitation() {
  const t = useTranslations("BusinessFacilitation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timer for image slide (8 seconds), then switch back to video
  useEffect(() => {
    if (currentSlide === 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(0);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  // Restart video when switching back to slide 0
  useEffect(() => {
    if (currentSlide === 0 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentSlide]);

  // Check if video has 10 seconds remaining, then switch to image
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const remaining = videoRef.current.duration - videoRef.current.currentTime;
      if (remaining <= 10 && currentSlide === 0) {
        setCurrentSlide(1);
      }
    }
  };

  return (
    <div>
      {/* ============ CAROUSEL - Video AIF + Banner Cariforo ============ */}
      <div className="relative w-full overflow-hidden bg-black">
        {/* Slide 1: Video AIF */}
        <Link
          href="https://americasinvestmentforum.com/register"
          target="_blank"
          className={`block w-full transition-opacity duration-700 ${
            currentSlide === 0 ? "opacity-100 relative" : "opacity-0 absolute top-0 left-0 pointer-events-none"
          }`}
          onClick={(e) => {
            // Prevent link navigation if video is playing
            if (videoRef.current && !videoRef.current.paused) {
              e.preventDefault();
              window.open("https://americasinvestmentforum.com/register", "_blank");
            }
          }}
        >
          <video
            ref={videoRef}
            src="/videos/AIF_Banner_ProDC.mp4"
            autoPlay={true}
            muted={true}
            playsInline={true}
            preload="auto"
            aria-hidden="true"
            className="w-full h-auto object-contain"
            onTimeUpdate={handleTimeUpdate}
          />
        </Link>

        {/* Slide 2: Banner Cariforo UE */}
        <Link
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=ghXqEGP41EuvCTx0XnNcBcpbi5dghOxMi3kq3BwMtrlUQko1OTJQT01URjJQWFBRNVBUR1hUUFRMOS4u"
          target="_blank"
          className={`block w-full transition-opacity duration-700 ${
            currentSlide === 1 ? "opacity-100 relative" : "opacity-0 absolute top-0 left-0 pointer-events-none"
          }`}
        >
          <Image
            width={2048}
            height={1080}
            src="/images/prod-aae-cariforo-ue-banner.jpg"
            alt="ProD AAE Cariforo UE"
            className="w-full h-auto object-contain"
          />
        </Link>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 0 ? "bg-white w-8" : "bg-white/50 hover:bg-white/70 w-3"
            }`}
            aria-label="Ver slide 1"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 1 ? "bg-white w-8" : "bg-white/50 hover:bg-white/70 w-3"
            }`}
            aria-label="Ver slide 2"
          />
        </div>
      </div>
      {/* ============ FIN CAROUSEL ============ */}

      {/* Espaciado entre carousel y sección de texto */}
      <div className="h-8 lg:h-12"></div>

      {/* ============ CODIGO ANTERIOR (Banner único sin carousel) ============
      <Link href="https://americasinvestmentforum.com/register" target="_blank">
        <video
          src="/videos/AIF_Banner_ProDC.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full aspect-[24/5] lg:aspect-auto lg:h-[260px] xl:h-[307px] object-cover bg-black"
        />
      </Link>
      ============ FIN CODIGO ANTERIOR ============ */}

      <section
        className={`w-full h-full xl:h-[60vh] p-5 lg:p-20 flex justify-center items-center`}
      >
        <div className="xl:w-10/12 h-full flex flex-col-reverse xl:flex-row gap-5 justify-center items-center ">
          <div className="w-full xl:w-7/12 md:h-96 rounded-lg overflow-hidden hidden xl:flex">
            <iframe
              src="https://www.youtube.com/embed/gZwOf3c8bvE"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-full object-cover"
            ></iframe>
          </div>

          <div className="w-full xl:w-5/12 flex flex-col space-y-4 justify-center items-center text-center">
            <h1 className="w-full font-extrabold text-gray-600 text-2xl xl:text-4xl font-opensans">
              {t("title")}
            </h1>
            <div className="text-gray-500 text-sm xl:text-lg font-montserrat">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
            <Link
              href="https://americasinvestmentforum.com/"
              target="_blank"
              className="w-40 h-12 flex items-center justify-center rounded-lg bg-blue-dark hover:shadow-md duration-300 text-white hover:text-white/80"
            >
              {t("buttonText")}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ BANNERS ANTERIORES COMENTADOS ============ */}
      {/* <Link
        href="https://surveys.intracen.org/response/G2tIYnddTgoDYVFzX1R6S0d1enk"
        target="_blank"
        className="hidden xl:flex"
      >
        <Image
          width={2048}
          height={1080}
          src="/images/weideNewBanner.jpg"
          alt="WEIDE"
          className=" w-full"
        />
      </Link> */}

      {/* <Link href="/sumando-exportadoras" target="_blank">
        <Image
          width={2048}
          height={1080}
          src="/images/bannerSumandoExportadoras2025.jpg"
          alt="Sumando Exportadoras"
          className=" w-full "
        />
      </Link> */}

      {/* <Link href="/documents/16MemoriasdeGestiónPD-2020-24.pdf" target="_blank">
        <Image
          width={2048}
          height={108}
          src="/images/bannerWebPD.jpg"
          alt="Memori-Post"
          className=" w-full "
        />
      </Link> */}
    </div>
  );
}
