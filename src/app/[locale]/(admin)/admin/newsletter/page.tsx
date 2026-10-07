"use client";
import { useState, useEffect } from "react";
import AuthUser from "@/components/admin/auth";
import { BackLink } from "@/components/admin/proeconomia/BackLink";
import Sketch from "@/components/admin/sketch";
import { NewsletterTable } from "@/components/admin/newsletter/NewsletterTable";
import { NewsletterModal } from "@/components/admin/newsletter/NewsletterModal";
import { useNewsletters } from "@/services/newsletter/service";

export default function Page() {
  const [addOpen, setAddOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { data, isLoading, refetch } = useNewsletters();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (data && !isLoading) setItems(data);
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((r: any) => { if (r.data) setItems(r.data); });
  }, [refresh]);

  const handleRefresh = () => setRefresh((r) => !r);
  const buttons = [{ name: "Crear noticia", onClick: () => setAddOpen(true) }];

  return (
    <AuthUser permission="create:news">
      <BackLink />
      <Sketch
        title="Noticias"
        subtitle="Gestión de noticias electrónicos"
        handleFilterOpen={() => {}}
        buttons={buttons}
        hasFilter={false}
      >
        <NewsletterTable items={items} isLoading={isLoading} update={handleRefresh} />
        {addOpen && (
          <NewsletterModal
            open
            onClose={() => setAddOpen(false)}
            update={handleRefresh}
          />
        )}
      </Sketch>
    </AuthUser>
  );
}
