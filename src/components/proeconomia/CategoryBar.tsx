"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SECCIONES } from "./secciones";

interface Props {
  activeCategory: string;
  search: string;
  onCategoryChange: (c: string) => void;
  onSearchChange: (s: string) => void;
}

const CATEGORIES = [{ key: "all", labelKey: "categories.todos" }, ...SECCIONES];

export default function CategoryBar({
  activeCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: Props) {
  const t = useTranslations("proeconomia");

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:h-24 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-0 lg:px-8">
        {/* Marca */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-[#C8102E]" />
          <span className="font-montserrat text-2xl font-extrabold uppercase tracking-tight text-blue-dark lg:text-3xl">
            {t("brandName")}
          </span>
        </div>

        {/* Secciones */}
        <nav className="flex items-center gap-1 overflow-x-auto lg:gap-2">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              className={cn(
                "whitespace-nowrap border-b-2 px-3 py-2 font-montserrat text-xs font-bold uppercase tracking-wide transition-colors lg:text-sm",
                activeCategory === key
                  ? "border-[#C8102E] text-blue-dark"
                  : "border-transparent text-gray-500 hover:text-blue-dark"
              )}
            >
              {t(labelKey)}
            </button>
          ))}
        </nav>

        {/* Buscador */}
        <label className="flex min-w-[180px] cursor-text items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5">
          <MagnifyingGlassIcon className="size-4 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-white font-montserrat text-sm text-gray-800 outline-none"
          />
        </label>
      </div>
    </div>
  );
}
