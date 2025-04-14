"use client";
import FooterMobile from "@/components/layout/footer/footerMobile";
import NavBarMobile from "@/components/layout/navbar/navBarMobile";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import TawkMessenger from "@/components/chatbox/TawkMessenger";
import Accesibility from "@/components/accessibility/accesScrip";
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
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/home/breadcrumb";
import { PrintButton } from "@/components/home/printButton";
import { EmailButton } from "@/components/home/emailButton";
// import RouteValidator from "../validatorRoute/validatorRoutes";
// import { APP_ROUTES } from "../validatorRoute/Routes";

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
}

export default function RootLayout({ children }: RootLayoutProps) {
  const queryClient = new QueryClient();
  const params = useParams<{ locale: string }>();
  return (
    <div className="scroll-smooth">
      
        <QueryClientProvider client={queryClient}>
          <APIProvider
            apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
            language={params.locale}
          >
            <Navbar />
            <NavBarMobile />
            <div className=" flex justify-center  bg-white  ">
              <div className="flex justify-between items-center w-[1200px] ">
                <div className="flex">
                  <Breadcrumb />
                </div>

                <div className="flex gap-2 ">
                  <EmailButton />
                  <PrintButton />
                </div>
              </div>
            </div>
            {children}
             <Accesibility />
            <Footer />
            <FooterMobile />
            <Notifications zIndex={9999} />
            <TawkMessenger />
          </APIProvider>
        </QueryClientProvider>
    </div>
  );
}
