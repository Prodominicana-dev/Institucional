"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/services/proeconomia/service";

type Status = "idle" | "loading" | "ok" | "duplicate" | "error";

export default function NewsletterForm() {
  const t = useTranslations("proeconomia");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const result = await subscribeNewsletter(email.trim(), name.trim() || undefined);
    setStatus(result);
  }

  return (
    <section className="bg-gray-50 rounded-md p-6 sm:p-10">
      <div className="max-w-lg mx-auto text-center space-y-3">
        <h2 className="text-blue-900 uppercase font-extrabold text-xl lg:text-2xl font-opensans">
          {t("newsletterTitle")}
        </h2>
        <p className="text-gray-500 text-sm font-montserrat">
          {t("newsletterSubtitle")}
        </p>

        {status === "ok" && (
          <p className="text-green-600 font-semibold text-sm font-montserrat">
            {t("newsletterOk")}
          </p>
        )}
        {status === "duplicate" && (
          <p className="text-cyan-600 font-semibold text-sm font-montserrat">
            {t("newsletterDuplicate")}
          </p>
        )}
        {status === "error" && (
          <p className="text-red-700 font-semibold text-sm font-montserrat">
            {t("newsletterError")}
          </p>
        )}

        {status !== "ok" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 text-left">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("newsletterNamePlaceholder")}
              className="border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-blue-950 font-montserrat w-full"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletterEmailPlaceholder")}
              className="border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-blue-950 font-montserrat w-full"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-blue-dark text-white rounded-md py-2.5 text-sm font-bold font-montserrat hover:bg-blue-950 transition-colors disabled:opacity-60 w-full"
            >
              {status === "loading"
                ? t("newsletterLoading")
                : t("newsletterButton")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
