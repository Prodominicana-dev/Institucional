import Banner from "../../../components/home/banner";
import DigitalToolsSection from "@/components/home/digitalToolsSection";
import InstituteSection from "@/components/home/instituteSection";
import NewsSection from "@/components/home/newsSection";
import UpcomingEvents from "@/components/home/upcomingEvents";
import PhotoGallerySection from "@/components/home/photoGallerySection";
import ProdominicanaTvSection from "@/components/home/prodominicanaTvSection";
import SocialMediaSection from "@/components/home/socialMediaSection";
import BusinessFacilitation from "@/components/home/businessFacilitation";
import DataDashboard from "@/components/home/dataDashboard";
import DataDashboardMobile from "@/components/home/dataDashboardMobile";
import CEOSection from "@/components/home/CEOSection";
import EventModal from "@/components/home/eventModal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="w-full bg-white">
      {/* <EventModal /> */}
      <Banner />
      <BusinessFacilitation />
      <DigitalToolsSection />
      {/* <InstituteSection /> */}
      <NewsSection locale={locale} />
      <UpcomingEvents locale={locale} />
      <PhotoGallerySection />
      <ProdominicanaTvSection />
      <DataDashboard />
      <DataDashboardMobile />
      {/* <SocialMediaSection /> */}
      <CEOSection />
    </div>
  );
}
