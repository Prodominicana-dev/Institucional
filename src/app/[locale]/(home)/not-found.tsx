import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white">
      <h1 className="text-6xl sm:text-8xl font-bold text-red-600 mb-6 animate-bounce">
        404
      </h1>
      <div className="w-64 sm:w-80 md:w-96 mb-8 mx-auto">
        <Image
          src={"/svg/galaxy_404.svg"}
          alt="Página no encontrada"
          width={220}
          height={220}
          className="w-full h-auto"
          priority
        />
      </div>
      <Link
        href="/"
        className="
        inline-flex items-center justify-center px-6 py-3  text-white font-medium rounded-lg bg-blue-900 hover:bg-red-600
        transition-colors duration-300shadow-md hover:shadow-lg transform hover:-translate-y-0.5focus:outline-none focus:ring-2 focus:ring-opacity-50
         w-full sm:w-52 mb-4 border  mt-2 
  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Volver al inicio
      </Link>
    </div>
  );
}
