"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  usePublicFeedbackStats,
  usePublicFeedbacks,
} from "@/services/feedback/service";

const TXT = {
  es: {
    title: "Valoraciones de nuestros servicios",
    intro:
      "Histórico público de las valoraciones que los usuarios hacen de los servicios de ProDominicana. Se actualiza automáticamente con cada valoración recibida.",
    cta: "Evalúe nuestro servicio",
    average: "Valoración promedio",
    total: "Valoraciones recibidas",
    satisfaction: "Usuarios satisfechos",
    satisfactionHint: "4 o 5 estrellas",
    since: "Desde",
    distribution: "Distribución por estrellas",
    history: "Histórico por mes",
    month: "Mes",
    count: "Valoraciones",
    avg: "Promedio",
    byService: "Por servicio",
    service: "Servicio",
    comments: "Comentarios de los usuarios",
    noComments:
      "Todavía no hay comentarios publicados. Los comentarios se publican después de pasar la moderación.",
    empty:
      "Todavía no hay valoraciones registradas. Sea el primero en evaluar nuestro servicio.",
    loading: "Cargando valoraciones...",
    error: "No se pudieron cargar las valoraciones. Intente de nuevo más tarde.",
    note:
      "Se cuentan todas las valoraciones recibidas, excepto las rechazadas por contener lenguaje ofensivo, spam o datos personales. Los comentarios se publican después de su revisión. No se muestran correos ni datos de contacto.",
    services: {
      export: "Servicios de exportación",
      investment: "Servicios de inversión",
      general: "Servicios generales",
    } as Record<string, string>,
    updated: "Actualizado",
  },
  en: {
    title: "Service ratings",
    intro:
      "Public history of the ratings users give to ProDominicana's services. It updates automatically with every rating received.",
    cta: "Rate our service",
    average: "Average rating",
    total: "Ratings received",
    satisfaction: "Satisfied users",
    satisfactionHint: "4 or 5 stars",
    since: "Since",
    distribution: "Ratings by stars",
    history: "Monthly history",
    month: "Month",
    count: "Ratings",
    avg: "Average",
    byService: "By service",
    service: "Service",
    comments: "User comments",
    noComments:
      "No comments have been published yet. Comments are published after moderation.",
    empty: "No ratings yet. Be the first to rate our service.",
    loading: "Loading ratings...",
    error: "Ratings could not be loaded. Please try again later.",
    note:
      "All ratings received are counted, except those rejected for offensive language, spam or personal data. Comments are published after review. No emails or contact details are shown.",
    services: {
      export: "Export services",
      investment: "Investment services",
      general: "General services",
    } as Record<string, string>,
    updated: "Updated",
  },
};

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(value)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </span>
  );
}

export default function RatingsPage({ params: { locale } }: any) {
  const t = locale === "en" ? TXT.en : TXT.es;
  const dateLocale = locale === "en" ? "en-US" : "es-DO";
  const { data: stats, isLoading, error } = usePublicFeedbackStats();
  const { data: comments } = usePublicFeedbacks();

  const monthLabel = (m: string) => {
    const [y, mo] = m.split("-").map(Number);
    return new Date(y, mo - 1, 1).toLocaleDateString(dateLocale, {
      month: "long",
      year: "numeric",
    });
  };
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const maxDist = Math.max(1, ...(stats?.distribution ?? []).map((d) => d.count));

  return (
    <div className="bg-white min-h-screen">
      <section className="w-full bg-gradient-to-r from-blue-dark to-[#062381] text-white">
        <div className="w-11/12 lg:w-10/12 mx-auto py-12 md:py-16 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat">
            {t.title}
          </h1>
          <p className="max-w-3xl text-blue-100 font-opensans">{t.intro}</p>
          <div>
            <Link
              href="/feedback"
              className="inline-block bg-white text-blue-950 font-bold rounded-xl px-6 py-3 hover:bg-blue-50 duration-300"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </section>

      <div className="w-11/12 lg:w-10/12 mx-auto py-10 flex flex-col gap-10 text-blue-950">
        {isLoading && <p className="text-gray-600">{t.loading}</p>}
        {error && <p className="text-red-600">{t.error}</p>}

        {stats && stats.total === 0 && (
          <p className="text-gray-700 bg-gray-50 rounded-xl p-6">{t.empty}</p>
        )}

        {stats && stats.total > 0 && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-600">{t.average}</span>
                <span className="text-4xl font-bold font-montserrat">
                  {stats.average.toFixed(1)}
                  <span className="text-xl text-gray-500"> / 5</span>
                </span>
                <Stars value={stats.average} />
              </div>
              <div className="rounded-xl border border-gray-200 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-600">{t.total}</span>
                <span className="text-4xl font-bold font-montserrat">
                  {stats.total}
                </span>
                {stats.since && (
                  <span className="text-sm text-gray-600">
                    {t.since} {fmtDate(stats.since)}
                  </span>
                )}
              </div>
              <div className="rounded-xl border border-gray-200 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-600">{t.satisfaction}</span>
                <span className="text-4xl font-bold font-montserrat">
                  {stats.satisfactionRate}%
                </span>
                <span className="text-sm text-gray-600">
                  {t.satisfactionHint}
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-montserrat">
                {t.distribution}
              </h2>
              <div className="flex flex-col gap-2 max-w-2xl">
                {[...stats.distribution].reverse().map((d) => (
                  <div key={d.stars} className="flex items-center gap-3">
                    <span className="w-24 shrink-0">
                      <Stars value={d.stars} size={14} />
                    </span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${(d.count / maxDist) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right tabular-nums">
                      {d.count}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 min-w-0">
                <h2 className="text-2xl font-bold font-montserrat">
                  {t.history}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-sm text-gray-600">
                      <tr>
                        <th className="px-4 py-3">{t.month}</th>
                        <th className="px-4 py-3 text-right">{t.count}</th>
                        <th className="px-4 py-3 text-right">{t.avg}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...stats.byMonth].reverse().map((m) => (
                        <tr key={m.month} className="border-t border-gray-100">
                          <td className="px-4 py-3 capitalize">
                            {monthLabel(m.month)}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {m.count}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {m.average.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col gap-4 min-w-0">
                <h2 className="text-2xl font-bold font-montserrat">
                  {t.byService}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-sm text-gray-600">
                      <tr>
                        <th className="px-4 py-3">{t.service}</th>
                        <th className="px-4 py-3 text-right">{t.count}</th>
                        <th className="px-4 py-3 text-right">{t.avg}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.byService.map((s) => (
                        <tr key={s.service} className="border-t border-gray-100">
                          <td className="px-4 py-3">
                            {t.services[s.service] ?? s.service}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {s.count}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {s.average.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold font-montserrat">{t.comments}</h2>
          {!comments || comments.length === 0 ? (
            <p className="text-gray-600">{t.noComments}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments.map((c) => (
                <article
                  key={c.id}
                  className="rounded-xl border border-gray-200 p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-bold">{c.name}</span>
                    <Stars value={c.rating} size={16} />
                  </div>
                  <p className="text-gray-700 font-opensans">{c.message}</p>
                  <span className="text-sm text-gray-500">
                    {fmtDate(c.createdAt)}
                    {c.serviceType ? ` · ${t.services[c.serviceType] ?? ""}` : ""}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="text-sm text-gray-600 max-w-3xl">
          {t.note}
          {stats?.updatedAt && (
            <>
              {" "}
              {t.updated}: {fmtDate(stats.updatedAt)}.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
