"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function BusinessFacilitation() {
  const t = useTranslations("BusinessFacilitation");

  return (
    <div>
      {/* ============ Banner Cariforo UE ============ */}
      <div className="w-full bg-black">
        <Link
          href="https://www.hubcamarasantodomingo.do/"
          target="_blank"
          className="block w-full"
        >
          <Image
            width={2048}
            height={1080}
            src="/images/banner_rondas.jpg"
            alt="Hub Camara"
            className="w-full h-auto object-contain"
          />
        </Link>
      </div>
      {/* ============ FIN Banner ============ */}

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
        className={`w-full h-full xl:min-h-[60vh] p-5 lg:p-20 flex justify-center items-center`}
      >
        <div className="xl:w-11/12 h-full flex flex-col-reverse xl:flex-row gap-5 justify-center items-center xl:items-start">
          <div className="w-full xl:w-7/12 aspect-video rounded-lg overflow-hidden hidden xl:flex xl:sticky xl:top-8">
            <iframe
              src="https://www.youtube.com/embed/YEpRND-2qzU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-full object-cover"
            ></iframe>
          </div>

          <div className="w-full xl:w-5/12 flex flex-col space-y-4 justify-center items-center text-center">
            <h1 className="w-full font-extrabold text-gray-600 text-2xl xl:text-4xl font-opensans">
              {t("title")}
            </h1>
            <div className="text-gray-500 text-sm xl:text-lg font-montserrat space-y-3">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
              <p>{t("paragraph4")}</p>
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
