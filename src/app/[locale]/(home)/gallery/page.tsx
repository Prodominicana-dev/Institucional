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
      <Link
      href={`/gallery/carousel/${title}`}
      >
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
              <p className=" text-[0.51rem]  sm:text-[0.33rem] md:text-[0.53rem]   xl:text-[0.53rem] lg:text-[0.65rem] 2xl:text-xs font-normal ">{subtitle}</p>

              <div className=" absolute pl-[240px] sm:pl-[185px]  md:pl-[250px]  xl:pl-[190px] lg:pl-[260px] 2xl:pl-80">
                <svg
                  width="49"
                  height="50"
                  viewBox="0 0 91 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" flex justify-between  sm:w-8  md:w-12  xl:w-9  w-12/12 "
                >
                  <path
                    d="M45.4996 70.1527L18.4992 46.7127C16.3686 44.86 15.1719 42.349 15.1719 39.7311C15.1719 37.1131 16.3686 34.6021 18.4992 32.7494C22.6473 29.1484 29.7908 29.0035 34.1246 32.3709V16.459C34.1246 11.0146 39.2282 6.58398 45.4996 6.58398C51.7711 6.58398 56.8746 11.0146 56.8746 16.459V32.3709C61.2085 29.0035 68.352 29.1484 72.5001 32.7494C74.6307 34.6021 75.8274 37.1131 75.8274 39.7311C75.8274 42.349 74.6307 44.86 72.5001 46.7127L45.4996 70.1527ZM26.5413 36.4394C25.7907 36.438 25.0565 36.6302 24.4319 36.9916C23.8074 37.353 23.3206 37.8674 23.0334 38.4695C22.7461 39.0715 22.6714 39.734 22.8187 40.373C22.966 41.012 23.3286 41.5986 23.8606 42.0583L45.4996 60.8438L67.1387 42.0583C67.4911 41.7529 67.7707 41.3901 67.9615 40.9908C68.1522 40.5914 68.2504 40.1634 68.2504 39.7311C68.2504 39.2988 68.1522 38.8707 67.9615 38.4714C67.7707 38.072 67.4911 37.7093 67.1387 37.4039C66.4178 36.8032 65.4572 36.4677 64.458 36.4677C63.4587 36.4677 62.4982 36.8032 61.7773 37.4039L49.2913 48.2433V16.459C49.2476 15.6114 48.8291 14.8112 48.1228 14.2249C47.4165 13.6385 46.4769 13.3113 45.4996 13.3113C44.5224 13.3113 43.5828 13.6385 42.8765 14.2249C42.1702 14.8112 41.7516 15.6114 41.708 16.459V48.2433L29.222 37.4039C28.8711 37.0969 28.4534 36.8535 27.9932 36.6879C27.533 36.5223 27.0395 36.4379 26.5413 36.4394Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
