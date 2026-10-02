"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
  activeCategory: string;
  search: string;
  onCategoryChange: (c: string) => void;
  onSearchChange: (s: string) => void;
}

const CATEGORIES = [
  { key: "all", labelKey: "categories.todos" },
  { key: "exportación", labelKey: "categories.exportacion" },
  { key: "inversión", labelKey: "categories.inversion" },
  { key: "turismo", labelKey: "categories.turismo" },
  { key: "finanzas", labelKey: "categories.finanzas" },
];

export default function CategoryBar({
  activeCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: Props) {
  const t = useTranslations("proeconomia");

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap font-montserrat transition-colors",
                activeCategory === key
                  ? "bg-blue-dark text-white"
                  : "text-gray-600 hover:text-blue-dark"
              )}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
        <label className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 gap-2 min-w-[180px] cursor-text">
          <MagnifyingGlassIcon className="size-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="outline-none text-sm w-full bg-white text-gray-800 font-montserrat"
          />
        </label>
      </div>
    </div>
  );
}
