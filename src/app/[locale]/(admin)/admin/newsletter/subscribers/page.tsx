"use client";
import { useState } from "react";
import AuthUser from "@/components/admin/auth";
import { BackLink } from "@/components/admin/proeconomia/BackLink";
import Sketch from "@/components/admin/sketch";
import { SubscribersTable } from "@/components/admin/newsletter/SubscribersTable";
import { exportNewsletterSubscribers } from "@/services/newsletter/subscribers";
import { useUser } from "@auth0/nextjs-auth0";

export default function Page() {
  const { user } = useUser();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!user) return;
    setExporting(true);
    await exportNewsletterSubscribers(user.sub as string);
    setExporting(false);
  };

  const buttons = [
    {
      name: exporting ? "Descargando..." : "Descargar lista en Excel",
      onClick: handleExport,
    },
  ];

  return (
    <AuthUser permission="create:news">
      <BackLink />
      <Sketch
        title="Suscriptores"
        subtitle="Personas suscritas a Noticias Pro"
        handleFilterOpen={() => {}}
        buttons={buttons}
        hasFilter={false}
      >
        <SubscribersTable onExport={handleExport} exporting={exporting} />
      </Sketch>
    </AuthUser>
  );
}
