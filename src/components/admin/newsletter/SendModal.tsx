"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Newsletter, sendNewsletter } from "@/services/newsletter/service";

interface Props {
  open: boolean;
  newsletter: Newsletter;
  onClose: () => void;
  update: () => void;
}

export function SendModal({ open, newsletter, onClose, update }: Props) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!user) return;
    setLoading(true);
    await sendNewsletter(newsletter.id, onClose, update, user.sub as string);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !loading && onClose()}>
      <DialogContent className="max-w-md font-montserrat text-black">
        <DialogTitle className="sr-only">Enviar noticia</DialogTitle>
        <DialogDescription className="sr-only">
          Confirmar envío del noticia a todos los suscriptores activos.
        </DialogDescription>
        <div className="flex flex-col items-center gap-6 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-dark/10">
            <PaperAirplaneIcon className="h-8 w-8 text-blue-dark" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-bold">Enviar noticia</p>
            <p className="text-sm text-gray-600">
              El noticia{" "}
              <strong className="text-gray-900">&ldquo;{newsletter.title}&rdquo;</strong>{" "}
              será enviado a todos los suscriptores activos. Esta acción no se
              puede deshacer.
            </p>
          </div>
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              className="w-full bg-blue-dark text-white hover:bg-blue-dark/90"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? <HashLoader size={16} /> : "Enviar ahora"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
