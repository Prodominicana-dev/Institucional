import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function BusinessFacilitation() {
  const t = useTranslations("BusinessFacilitation");
  return (
    <div>
      <section
        className={`w-full h-full xl:h-[60vh] p-5 lg:p-20 flex justify-center items-center`}
      >
        <div className="xl:w-10/12 h-full flex flex-col-reverse xl:flex-row gap-5 justify-center items-center ">
          <div className="w-full xl:w-7/12 md:h-96 rounded-lg overflow-hidden hidden xl:flex">
            <iframe
              src="https://www.youtube.com/embed/r04kf_t65-w?si=ogXLBp4gbERF0AE1"
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
              href={"/invest"}
              className="w-40 h-12 flex items-center justify-center rounded-lg bg-blue-dark hover:shadow-md duration-300 text-white hover:text-white/80"
            >
              {t("buttonText")}
            </Link>
          </div>
        </div>
      </section>
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
          src="/images/bannerSumandoExportadoras.jpg"
          alt="Sumando Exportadoras"
          className=" w-full "
        />
      </Link>
      <Link href="/documents/16MemoriasdeGestiónPD-2020-24.pdf" target="_blank">
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
