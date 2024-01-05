import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prodominicana",
  description: "Centro de Exportación e Inversión de la República Dominicana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
