import Image from "next/image";
import React from "react";
export default function page() {
  const historyYears = [
    {
      year: 2020,
      description: "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description: "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description: "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description: "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
  ]
  return (
    <div className="  mx-auto w-full h-full bg-white flex justify-center items-center">
      <div className=" bg-whiteh-[135vh] w-full">
        <h2 className=" text-[#1E3059] font-bold font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl   2xl:text-5xl underline flex justify-center items-center py-6">
          Nuestra Historia
        </h2>
        <div className="flex flex-col p-10 h-full w-full  ">
          {historyYears.map((history, index) =>  (
            <HistoryYear history={history} index={index} />
          ))}
          {/* <div className="  border-2-2 absolute border-opacity-20 border-gray-700 h-full border right-[61%] sm:left-[50%] md:left-[50%] lg:left-[49%] 2xl:left-[49%] "></div>

          <div className="flex justify-evenly  sm:justify-end md:justify-between  lg:justify-between  items-center w-full right-timeline  border-l-2  border-gray-700">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1   w-8 h-8  pr-20 sm:pr-4 md:pl-6  md xl:pl-7 lg:pl-10 2xl:pl-4">
              <h1 className="mx-auto font-semibold text-lg text-black">2002</h1>
            </div>

            <div className=" flex order-1 rounded-lg sm:w-5/12 px-0 sm:px-4 py-4 2xl:py-7">
              <div className="   w-full h-full 2xl:flex    ">
                <div className="w-full">
                  <Image
                    src={"/images/prodominicanabuilding.jpg"}
                    width={1500}
                    height={1500}
                    className="   items-start w-full h-full mt-[2px] "
                    alt=""
                  />
                </div>
                <div className=" text-xs  lg:text-sm 2xl:text-base ">
                  <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
                    El Centro de Exportación e Inversión de la República
                    Dominicana (ProDominicana) mantiene un elevado compromiso
                    con el desarrollo del país al fomentar el incremento de la
                    exportación y la inversión extranjera directa, a través de
                    un servicio integral que satisface las necesidades de
                    exportadores
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-start sm:justify-end 2xl:flex-row-reverse md:flex-row-reverse items-center w-full left-timeline  border-l-2  border-gray-700">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex  items-center order-1 w-8 h-8 pr-20 sm:pr-8 md:pr-40 lg:pr-56 xl:pl-14 2xl:pl-7 ">
              <h1 className="mx-auto  md:ml-6 font-semibold text-lg text-black">
                2012
              </h1>
            </div>

            <div className=" flex order-1 rounded-lg w-5/12 px-0 py-4 sm:px-4   md:px-2 xl:py-6 2xl:py-7 ">
              <div className="   w-full h-full 2xl:flex    ">
                <div className="w-full">
                  <Image
                    src={"/images/prodominicanabuilding.jpg"}
                    width={1500}
                    height={1500}
                    className="   items-start w-full h-full mt-[2px]  "
                    alt=""
                  />
                </div>
                <div className=" text-xs  lg:text-sm 2xl:text-base ">
                  <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
                    El Centro de Exportación e Inversión de la República
                    Dominicana (ProDominicana) mantiene un elevado compromiso
                    con el desarrollo del país al fomentar el incremento de la
                    exportación y la inversión extranjera directa, a través de
                    un servicio integral que satisface las necesidades de
                    exportadores
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-evenly  sm:justify-end md:justify-between  lg:justify-between  items-center w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1   w-8 h-8  pr-20 sm:pr-4 md:pl-6  md xl:pl-7 lg:pl-10 2xl:pl-4">
              <h1 className="mx-auto font-semibold text-lg text-black">2017</h1>
            </div>

            <div className=" flex order-1 rounded-lg w-5/12 px-0 sm:px-4 py-4 2xl:py-7 ">
              <div className="   w-full h-full 2xl:flex    ">
                <div className="w-full">
                  <Image
                    src={"/images/prodominicanabuilding.jpg"}
                    width={1500}
                    height={1500}
                    className="   items-start w-full h-full mt-[2px]  "
                    alt=""
                  />
                </div>
                <div className=" text-xs  lg:text-sm 2xl:text-base ">
                  <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
                    El Centro de Exportación e Inversión de la República
                    Dominicana (ProDominicana) mantiene un elevado compromiso
                    con el desarrollo del país al fomentar el incremento de la
                    exportación y la inversión extranjera directa, a través de
                    un servicio integral que satisface las necesidades de
                    exportadores
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-start sm:justify-end 2xl:flex-row-reverse md:flex-row-reverse items-center w-full left-timeline ">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex  items-center order-1 w-8 h-8 pr-20 sm:pr-8 md:pr-40 lg:pr-56 xl:pl-14 2xl:pl-7 ">
              <h1 className="mx-auto  md:ml-6 font-semibold text-lg text-black">
                2024
              </h1>
            </div>

            <div className=" flex order-1 rounded-lg w-5/12 px-0 py-4 sm:px-4   md:px-2 xl:py-6 2xl:py-7 ">
              <div className="   w-full h-full 2xl:flex    ">
                <div className="w-full">
                  <Image
                    src={"/images/prodominicanabuilding.jpg"}
                    width={1500}
                    height={1500}
                    className="   items-start w-full h-full mt-[2px]  "
                    alt=""
                  />
                </div>
                <div className=" text-xs  lg:text-sm 2xl:text-base ">
                  <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
                    El Centro de Exportación e Inversión de la República
                    Dominicana (ProDominicana) mantiene un elevado compromiso
                    con el desarrollo del país al fomentar el incremento de la
                    exportación y la inversión extranjera directa, a través de
                    un servicio integral que satisface las necesidades de
                    exportadores
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}


function HistoryYear({history,index}: any){
return (
  <div className={`flex items-center sm:w-6/12 gap-5 p-5  border-gray-700 ${index % 2 === 0 ? "border-l-2 self-end" : "border-l-2 sm:border-l-0 sm:border-r-2"}`}>
            
              <h1 className="mx-auto font-semibold text-lg text-black">2002</h1>

            <div className=" flex order-1 rounded-lg py-4 2xl:py-7">
              <div className="   w-full h-full 2xl:flex    ">
                <div className="w-full">
                  <Image
                    src={"/images/prodominicanabuilding.jpg"}
                    width={1500}
                    height={1500}
                    className="   items-start w-full h-full mt-[2px] "
                    alt=""
                  />
                </div>
                <div className=" text-xs  lg:text-sm 2xl:text-base ">
                  <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
                    {history.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
)
}
