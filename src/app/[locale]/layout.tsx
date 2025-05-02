import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "ProDominicana",
  description: "Centro de Exportación e Inversión de la República Dominicana",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = useMessages();

  return (
    <html className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
          <GoogleAnalytics gaId="G-2026ZFW8SM" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
