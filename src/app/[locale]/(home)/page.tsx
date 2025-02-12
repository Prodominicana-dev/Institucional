"use client";
import Banner from "../../../components/home/banner";
import DigitalToolsSection from "@/components/home/digitalToolsSection";
import InstituteSection from "@/components/home/instituteSection";
import NewsSection from "@/components/home/newsSection";
import UpcomingEvents from "@/components/home/upcomingEvents";
import { MantineProvider } from "@mantine/core";
import PhotoGallerySection from "@/components/home/photoGallerySection";
import ProdominicanaTvSection from "@/components/home/prodominicanaTvSection";
import SocialMediaSection from "@/components/home/socialMediaSection";
import BusinessFacilitation from "@/components/home/businessFacilitation";
import DataDashboard from "@/components/home/dataDashboard";
import DataDashboardMobile from "@/components/home/dataDashboardMobile";
import CEOSection from "@/components/home/CEOSection";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams<{ locale: string }>();
  return (
    <div className="w-full bg-white">
      <MantineProvider>
        <Banner />
        <BusinessFacilitation />
        <DigitalToolsSection />
        {/* <InstituteSection /> */}
        <NewsSection locale={params.locale} />
        <UpcomingEvents locale={params.locale} />
        <PhotoGallerySection />
        <ProdominicanaTvSection />
        <DataDashboard />
        <DataDashboardMobile />
        <SocialMediaSection />
        <CEOSection />
      </MantineProvider>
    </div>
  );
}
