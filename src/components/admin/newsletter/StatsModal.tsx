"use client";
import { HashLoader } from "react-spinners";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Newsletter, useNewsletterStats } from "@/services/newsletter/service";

interface Props {
  open: boolean;
  newsletter: Newsletter;
  onClose: () => void;
}

const STATS = [
  { key: "totalSent" as const, label: "Enviados" },
  { key: "totalOpened" as const, label: "Abiertos" },
  { key: "totalClicks" as const, label: "Clicks" },
];

export function StatsModal({ open, newsletter, onClose }: Props) {
  const { data, isLoading } = useNewsletterStats(newsletter.id, open);

  const values: Record<string, number> = {
    totalSent: data?.totalSent ?? newsletter.totalSent,
    totalOpened: data?.totalOpened ?? newsletter.totalOpened,
    totalClicks: data?.totalClicks ?? newsletter.totalClicks,
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md font-montserrat text-black">
        <DialogTitle className="text-xl font-bold">{newsletter.title}</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Métricas del boletín
        </DialogDescription>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <HashLoader />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 pt-2">
            {STATS.map(({ key, label }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-xl bg-gray-50 p-4"
              >
                <p className="text-3xl font-extrabold text-blue-dark">
                  {values[key]}
                </p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
