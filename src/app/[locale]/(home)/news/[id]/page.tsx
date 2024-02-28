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
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white w-full h-full relative">
      <div className="bg-blue-950 h-[60vh] absolute inset-0 "></div>
      <div className="w-full h-full relative">
        <div className="flex flex-col justify-center items-center text-white font-opensans pt-10 gap-5">
          <div className="w-10/12 sm:w-8/12 lg:w-7/12 space-y-5">
            <div className="flex gap-5">
              <h1 className="text-3xl lg:text-5xl font-extrabold border-l-2 border-red-700 pl-5">
                ProDominicana y Consulado General de Barcelona organizan misión
                comercial en Barcelona
              </h1>
            </div>
            <p className="ml-6 text-sm lg:text-base font-semibold">
              La Sra. Riveiro, en su presentación, hizo énfasis en los diversos
              incentivos sectoriales con los que cuenta el país, brindó una
              visión general de la situación política, económica y social a los
              empresarios invitados, lo cual ayudó a definir estrategias y
              modelos de negocios a los interesados en entrar y competir en el
              mercado dominicano, puntualizó.
            </p>
          </div>
          <div className="w-10/12 lg:w-8/12">
            <Image
              width={3840}
              height={2160}
              alt="new"
              src={"/images/event1.jpg"}
              className="w-full object-cover object-center relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-10 gap-10 text-gray-900">
          <div className="w-10/12 lg:w-8/12">
            <p>
              Barcelona.- El Centro de Exportación y Exportación de la República
              Dominicana (Prodominicana) y el Consulado General de Barcelona
              organizaron una misión para promover el comercio y la inversión de
              empresarios de Cataluña en República Dominicana, con el objetivo
              de maximizar el intercambio comercial gracias al clima de negocios
              y la promoción de los productos dominicanos que lideran los
              mercados internacionales.
            </p>
            <br />
            <p>
              La Sra. Biviana Riveiro Disla, directora ejecutiva del Centro de
              Exportación e Inversión de la República Dominicana (ProDominicana)
              participó en un exitoso el Foro Empresarial titulado “¿Cómo hacer
              negocios en la República Dominicana?” organizado por el Consulado
              General de la República Dominicana y la Cámara de Comercio de
              Barcelona. El objetivo principal de este evento fue fomentar y
              fortalecer las relaciones comerciales entre España y la República
              Dominicana, con el fin de aumentar el comercio internacional entre
              ambos países.
            </p>
          </div>
          <div className="w-10/12 lg:w-8/12">
            <SpeedDial placement="right">
              <SpeedDialHandler>
                <IconButton
                  size="lg"
                  className="rounded-full bg-blue-950"
                  placeholder={undefined}
                >
                  <ShareIcon className="w-5 hover:w-4 duration-300" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent
                placeholder={undefined}
                className="flex flex-row flex-wrap w-9/12"
              >
                <SpeedDialAction
                  placeholder={undefined}
                  className="bg-blue-500"
                >
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}&src=sdkpreparse`}
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
                  className="bg-green-500"
                >
                  <Link
                    href={`https://api.whatsapp.com/send?text=${`ProDominicana y Consulado General de Barcelona organizan misión comercial en Barcelona`} ${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}`}
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
                  className="bg-lightBlue-600"
                >
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "linkedin-in"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction placeholder={undefined} className="bg-black">
                  <Link
                    href={`https://www.x.com/share?url=${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}&text=${`ProDominicana y Consulado General de Barcelona organizan misión comercial en Barcelona`}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "x-twitter"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction placeholder={undefined} className="bg-black">
                  <Link
                    href={`https://threads.net/intent/post?text=${`ProDominicana y Consulado General de Barcelona organizan misión comercial en Barcelona`} ${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "threads"]}
                      className="text-white"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction placeholder={undefined}>
                  <Link
                    href={`mailto:?subject=${`ProDominicana y Consulado General de Barcelona organizan misión comercial en Barcelona`}&body=${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["far", "envelope"]}
                      className="text-black"
                    />
                  </Link>
                </SpeedDialAction>
                <SpeedDialAction placeholder={undefined}>
                  <Link
                    href={`https://www.t.me/share?url=${`https://www.diariolibre.com/actualidad/politica/2024/02/18/elecciones-municipales-2024--presentacion-de-resultados/2617649`}&text=${`ProDominicana y Consulado General de Barcelona organizan misión comercial en Barcelona`}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "telegram"]}
                      className="text-lightBlue-500"
                    />
                  </Link>
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </div>
          <div className="w-10/12 lg:w-8/12 flex justify-between gap-10">
            <Link
              href={"/news/anterior"}
              className="w-6/12 cursor-pointer text-left space-y-3"
            >
              <div className="flex items-center gap-3 font-bold text-gray-500">
                <ArrowLeftIcon className="w-6" />
                Anterior
              </div>
              <p className="font-bold text-sm lg:text-2xl text-gray-700">
                ProDominicana reconoce la innovacion y liderazgo de las mujeres
                exportadoras dominicanas
              </p>
            </Link>
            <Link
              href={"/news/anterior"}
              className="w-6/12 flex flex-col items-end cursor-pointer text-right space-y-3"
            >
              <div className="flex items-center gap-3 font-bold text-gray-500">
                Proximo
                <ArrowRightIcon className="w-6" />
              </div>
              <p className="font-bold text-sm lg:text-2xl text-gray-700">
                MIREX y JCE firman acuerdo de colaboracion para celebracion de
                las elecciones en el exterior
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
