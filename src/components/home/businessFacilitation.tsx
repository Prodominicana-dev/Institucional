import React from "react";
import { useTranslations } from "next-intl";

export default function BusinessFacilitation() {
  const t = useTranslations("BusinessFacilitation");
  return (
    <section
      className={`w-full h-full sm:h-[60vh] p-5 lg:p-20 flex justify-center items-center`}
    >
      <div className="w-10/12 h-full flex flex-col-reverse sm:flex-row  sm:space-x-8 justify-center items-center ">
        <div className="pt-8 sm:pt-0 w-full sm:w-7/12 h-full rounded-lg">
          <iframe
            src="https://www.youtube.com/embed/NS30pnAaj3w?si=0e2lQ6iDd-QBSMPv"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-full "
          ></iframe>
        </div>

        <div className="w-full sm:w-5/12 flex flex-col space-y-4 justify-center items-center text-center ">
          <h1 className="w-full font-extrabold text-gray-600 text-4xl font-opensans">
            {t("title")}
          </h1>
          <div className="text-gray-500 text-base sm:text-lg font-montserrat">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
          <button className="w-40 h-12 flex items-center justify-center rounded-lg bg-blue-dark hover:shadow-md duration-300 text-white hover:text-white/80">
            {t("buttonText")}
          </button>
        </div>
      </div>
    </section>
  );
}
