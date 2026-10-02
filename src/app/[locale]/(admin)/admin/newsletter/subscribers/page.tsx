"use client";
import { useState } from "react";
import AuthUser from "@/components/admin/auth";
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
      name: exporting ? "Exportando..." : "Exportar CSV",
      onClick: handleExport,
    },
  ];

  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Suscriptores del boletín"
        subtitle="Personas suscritas al boletín electrónico"
        handleFilterOpen={() => {}}
        buttons={buttons}
        hasFilter={false}
      >
        <SubscribersTable onExport={handleExport} exporting={exporting} />
      </Sketch>
    </AuthUser>
  );
}
