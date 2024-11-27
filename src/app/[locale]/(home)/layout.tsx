"use client";
import FooterMobile from "@/components/layout/footer/footerMobile";
import NavBarMobile from "@/components/layout/navbar/navBarMobile";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import TawkMessenger from "@/components/chatbox/TawkMessenger";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebookF,
  faXTwitter,
  faThreads,
  faWhatsapp,
  faTelegram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Notifications } from "@mantine/notifications";

library.add(
  faFacebookF,
  faXTwitter,
  faThreads,
  faWhatsapp,
  faTelegram,
  faEnvelope,
  faLinkedinIn
);

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const queryClient = new QueryClient();
  return (
    <html className="scroll-smooth">
      <body>
        <QueryClientProvider client={queryClient}>
          <APIProvider
            apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
            language={params.locale}
          >
            <Navbar />
            <NavBarMobile />
            {children}
            <Footer />
            <FooterMobile />
            <Notifications zIndex={9999} />
            <TawkMessenger />
          </APIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
