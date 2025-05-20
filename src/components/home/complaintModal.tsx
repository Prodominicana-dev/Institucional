"use client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ComplaintModal({
  isOpen,
  onClose,
  codeContact,
}: {
  isOpen: boolean;
  onClose: () => void;
  codeContact: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Distinguido cliente, su solicitud ha sido recibida
            satisfactoriamente.
          </DialogTitle>
          <div className="space-y-2">
            <p>
              Su código de solicitud es:{" "}
              <span className="text-blue-600 font-bold">{codeContact}</span>.
            </p>
            <p>
              El tiempo estimado para la entrega del resultado es de{" "}
              <strong>3 a 7 días laborables</strong>.
            </p>
            <p>
              Nos comunicaremos con usted a través de{" "}
              <strong>[correo electrónico / teléfono / WhatsApp]</strong> para
              informarle sobre el estatus de su caso.
            </p>
            <p>
              Si desea contactarnos, puede hacerlo a través del correo{" "}
              <strong>servicios@prodominicana.gob.do</strong> o por WhatsApp al{" "}
              <strong>(809) 530-5505</strong>.
            </p>
            <p>
              Puede consultar nuestras políticas de privacidad y seguridad en el
              siguiente enlace:{" "}
              <Link
                href="/politicas-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Políticas de privacidad
              </Link>
              .
            </p>
            <p>
              Para completar su solicitud, asegúrese de haber enviado todos los
              documentos requeridos.
            </p>
            <strong className="pt-2">
              En ProDominicana estamos para servirle.
            </strong>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
