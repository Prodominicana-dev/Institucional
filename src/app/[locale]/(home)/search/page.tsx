"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconButton } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [search, setSearch] = useState(query || "");
  const keywords = query.split(" ").filter(Boolean);
  const t = useTranslations("navbar");

  const generateOptions = () => [
    {
      Title: t("aboutUs.title"),
      Url: [
        { label: t("aboutUs.menuList.whoWeAre"), path: "/whoarewe" },
        { label: t("aboutUs.menuList.history"), path: "/history" },
        { label: t("aboutUs.menuList.CEODispach"), path: "/ceo" },
        {
          label: t("aboutUs.menuList.organizationalChart"),
          path: "/organizationalstructure",
        },
        { label: t("aboutUs.menuList.legal"), path: "/legalframework" },
      ],
    },
    {
      Title: t("news.title"),
      Url: [
        { label: t("news.menuList.news"), path: "/news" },
        { label: t("news.menuList.event"), path: "/events" },
        { label: t("news.menuList.prodomTV"), path: "/tv" },
        { label: t("news.menuList.gallery"), path: "/gallery" },
      ],
    },
    {
      Title: t("services.title"),
      Url: [
        { label: t("services.menuList.invest"), path: "/services/invest" },
        { label: t("services.menuList.export"), path: "/services/export" },
      ],
    },
    {
      Title: t("aboutUs.menuList.whoWeAre"),
      Url: [{ label: t("aboutUs.menuList.whoWeAre"), path: "/whoarewe" }],
    },
    {
      Title: t("aboutUs.menuList.history"),
      Url: [{ label: t("aboutUs.menuList.history"), path: "/history" }],
    },
    {
      Title: t("aboutUs.menuList.CEODispach"),
      Url: [{ label: t("aboutUs.menuList.CEODispach"), path: "/ceo" }],
    },
    {
      Title: t("aboutUs.menuList.organizationalChart"),
      Url: [
        {
          label: t("aboutUs.menuList.organizationalChart"),
          path: "/organizationalstructure",
        },
      ],
    },
    {
      Title: t("aboutUs.menuList.legal"),
      Url: [{ label: t("aboutUs.menuList.legal"), path: "/legalframework" }],
    },
    {
      Title: t("news.menuList.news"),
      Url: [{ label: t("news.menuList.news"), path: "/news" }],
    },
    {
      Title: t("news.menuList.event"),
      Url: [{ label: t("news.menuList.event"), path: "/events" }],
    },
    {
      Title: t("news.menuList.prodomTV"),
      Url: [{ label: t("news.menuList.prodomTV"), path: "/tv" }],
    },

    {
      Title: "galeria",
      Url: [{ label: t("news.menuList.gallery"), path: "/gallery" }],
    },
    {
      Title: t("services.menuList.invest"),
      Url: [{ label: t("services.menuList.invest"), path: "/services/invest" }],
    },
    {
      Title: t("services.menuList.export"),
      Url: [{ label: t("services.menuList.export"), path: "/services/export" }],
    },
    {
      Title: t("shetrades"),
      Url: [{ label: t("shetrades"), path: "/shetrades" }],
    },
    {
      Title: t("contact"),
      Url: [{ label: t("contact"), path: "/contact" }],
    },
    {
      Title: "Transparencia",
      Url: [
        {
          label: "Transparencia",
          path: "https://old.prodominicana.gob.do/transparencia",
        },
      ],
    },

    {
      Title: t("complaint"),
      Url: [{ label: t("complaint"), path: "/complaint" }],
    },
    {
      Title: t("investButton"),
      Url: [{ label: t("investButton"), path: "/invest" }],
    },
    {
      Title: t("exportButton"),
      Url: [{ label: t("exportButton"), path: "/export" }],
    },
  ];

  const selections = useMemo(generateOptions, [t]);
  const results = selections.filter(({ Title }) => {
    const titleLower = Title.toLowerCase();
    return keywords.some((word) => titleLower.includes(word));
  });

  const handleClick = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      clearSearch();
    }
  };

  const handleKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="w-full bg-white flex justify-center px-4 py-8 sm:px-8 lg:px-24">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Buscar</h1>
          <div className="h-16 w-full border-2 border-blue-950 rounded-xl p-2 flex items-center justify-between gap-2">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-full w-full text-blue-950 bg-white outline-none pl-2"
            />
            <IconButton
              className="bg-red-700 rounded-lg size-20 flex justify-center items-center cursor-pointer"
              onClick={handleClick}
            >
              <MagnifyingGlassIcon className="size-5" />
            </IconButton>
          </div>
          <h1 className="text-2xl text-gray-900 mb-6 pb-2">
            {"Resultados de la busqueda"}: “{query}”
          </h1>
        </div>

        {results.length === 0 ? (
          <p className="text-gray-500 italic text-lg">
            {"No se encontraron resultados."}
          </p>
        ) : (
          <div className="space-y-6">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition-shadow"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-3">
                  {item.Title}
                </h2>
                <ul className="list-disc list-inside space-y-1 text-blue-600 text-base">
                  {item.Url?.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.path}
                        className="hover:underline break-words"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
