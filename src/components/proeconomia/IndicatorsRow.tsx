"use client";
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEconomicIndicators } from "@/services/proeconomia/service";

interface Props {
  locale: string;
}

const ICONS = [BanknotesIcon, BanknotesIcon, GlobeAltIcon, TruckIcon];

export default function IndicatorsRow({ locale }: Props) {
  const t = useTranslations("proeconomia");
  const { data: rawData, isLoading } = useEconomicIndicators();
  const indicators: any[] = Array.isArray(rawData) ? rawData : [];

  if (isLoading)
    return <div className="h-24 bg-gray-100 rounded-md animate-pulse" />;
  if (indicators.length === 0) return null;

  const sorted = [...indicators].sort(
    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <section>
      <h2 className="text-blue-900 uppercase font-extrabold text-xl lg:text-2xl font-opensans mb-5">
        {t("indicatorsTitle")}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sorted.map((ind: any, i: number) => {
          const Icon = ICONS[i % ICONS.length];
          const label =
            locale === "es" ? ind.label : (ind.labelEn ?? ind.label);
          const note =
            locale === "es" ? ind.note : (ind.noteEn ?? ind.note);
          // Vencido: no se publica la cifra. Es preferible un hueco con su
          // fecha a un dato viejo que aparente ser el de hoy.
          const vencido = ind.stale === true;
          const actualizado = ind.updated_At
            ? new Date(ind.updated_At).toLocaleDateString(
                locale === "es" ? "es-DO" : "en-US",
                { day: "numeric", month: "long", year: "numeric" }
              )
            : null;
          return (
            <div
              key={ind.key ?? i}
              className={`border rounded-md p-4 flex items-start gap-3 ${
                vencido ? "border-gray-200 bg-gray-50" : "border-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded-md flex-shrink-0 ${
                  vencido ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <Icon
                  className={`size-5 ${
                    vencido ? "text-gray-400" : "text-blue-dark"
                  }`}
                />
              </div>
              <div className="min-w-0">
                {vencido ? (
                  <p className="text-gray-400 font-semibold text-lg font-montserrat leading-tight">
                    {t("indicatorUnavailable")}
                  </p>
                ) : (
                  <p className="text-blue-950 font-extrabold text-lg font-montserrat leading-tight">
                    {ind.value}
                  </p>
                )}
                <p
                  className={`text-sm font-semibold font-montserrat mt-0.5 ${
                    vencido ? "text-gray-500" : "text-blue-900"
                  }`}
                >
                  {label}
                </p>
                {vencido ? (
                  actualizado && (
                    <p className="text-gray-400 text-xs font-montserrat mt-0.5">
                      {t("indicatorUpdatedOn", { date: actualizado })}
                    </p>
                  )
                ) : (
                  note && (
                    <p className="text-cyan-600 text-xs font-montserrat mt-0.5">
                      {note}
                    </p>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
