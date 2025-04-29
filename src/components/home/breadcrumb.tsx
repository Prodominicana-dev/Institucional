"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const path = usePathname();
  // console.log('pathName here:', path);

  const ruteName = path.split("/").filter((ruteN) => ruteN !== "");

  const RouteName = (ruteN: any) => {
    if (checkId(ruteN)) {
      return null;
    }

    return FRouteName(ruteN);
  };

  const checkId = (ruteN: any) => {
    return /^[0-9a-fA-F-]{36}$/.test(ruteN) || /^\d+$/.test(ruteN);
  };

  const FRouteName = (ruteN: any) => {
    return ruteN.replace(/-/g, " ");
  };

  return (
    <div className="flex items-center space-x-2 bg-white p-2">
      <Link
        href="/"
        className="opacity-60  hover:text-blue-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      <Link
        href="/"
        className="opacity-60  hover:text-blue-900 transition-colors"
      >
        <div className=" cursor-pointer"> Inicio</div>
      </Link>
      {ruteName.map((ruteN: any, index: any) => {
        const routesName = RouteName(ruteN);
        if (!routesName) return null;

        const href = `/${ruteName.slice(0, index + 1).join("/")}`;

        return (
          <span key={href} className="flex items-center">
            <span className=" opacity-60 -translate-x-2">/</span>
            <Link
              href={href}
              className=" opacity-60 hover:text-blue-900 transition-colors -translate-x-2 "
            >
              {`${routesName}`}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
