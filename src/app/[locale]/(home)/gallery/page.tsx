import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const gallery = [
    {
      title: "FIRMA PNUD",
      subtitle: `${"30 DE ENERO DE 2024"}   12 FOTOS`,
    },
    {
      title: "MUJERE EN EXPORTACION",
      subtitle: `${"30 DE ENERO DE 2024"} 12 FOTOS`,
    },
    {
      title: "PREMIO INVERSIONISTA",
      subtitle: `${"30 DE ENERO DE 2024"}   12 FOTOS`,
    },
    {
      title: "FIRMA PNUD",
      subtitle: `${"30 DE ENERO DE 2024"}   12 FOTOS`,
    },
    {
      title: "FIRMA INPOSDOM",
      subtitle: `${"30 DE ENERO DE 2024"}   12 FOTOS`,
    },
    {
      title: "SHETRADES",
      subtitle: `${"30 DE ENERO DE 2024"}   12 FOTOS`,
    },
  ];
  return (
    <div className="  w-full h-full flex flex-col justify-center items-center bg-white py-16  gap-10">
      <div>
        <h1 className=" text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-montserrat font-extrabold text-[#1E3059]">
          Galeria de Imagenes
        </h1>
      </div>
      <div className="  w-5/6 flex justify-center">
        <div className="w-full sm:w-10/12  text-lg">
          <label htmlFor="Search" className=" flex flex-col sm:flex-row gap-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute pointer-events-none translate-x-14 "
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 30 30"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
            <input
              type="text"
              name="Search"
              id="Search"
              placeholder="Buscar Imagen"
              className="w-full h-16 px-28 py-2 text-xl text-gray-700  border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500  bg-[#FFFFFF] shadow-md shadow-gray-300 "
            />
            <button className=" bg-[#A21E2E] flex justify-center items-center text-white font-extrabold rounded-lg w-full min-h-12 sm:w-3/12">
              Buscar
              <div className=" pl-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </div>
            </button>
          </label>

          <div className=" text-sm text-[#616063] font-bold  mt-16">
            <p className=" mb-2">TOTAL ÁLBUMES: 2136</p>
            <div className="flex justify-start  ">
              <div className="w-12/12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {gallery.map((gallery, index) => (
                  <GalleryCard
                    key={index}
                    title={gallery.title}
                    subtitle={gallery.subtitle}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ title, subtitle }: any) {
  return (
    <div className="w-full h-full relative text-white cursor-pointer">
      <Link href={`/gallery/carousel/${title}`}>
        <Image
          src="/images/prodominicanabuilding.jpg"
          alt="gallery"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0  bg-blue-gray-900/40 h-full bottom-0  flex justify-center ">
          <div className="w-11/12 flex flex-col items-center ">
            <div className="w-11/12 h-full flex flex-col items-center  justify-end  pr-10  ">
              <p className="text-xs sm:text-[0.46rem] md:text-[12px] lg:text-[15px] xl:text-[12px] 2xl:text-[17px] font-bold object-bottom ">
                {title}
              </p>
              <div className="w-10/12  flex flex-col items-center  justify-end ">
                <p className=" text-[0.51rem]  sm:text-[0.33rem] md:text-[0.53rem]   xl:text-[0.53rem] lg:text-[0.65rem] 2xl:text-xs font-normal ">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
