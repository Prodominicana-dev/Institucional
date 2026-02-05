import React, { useState } from "react";
import Image from "next/image";
import { ServiceDialog } from "./dialog";
import FeedbackForm from "@/components/chatbox/FeedbackForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  item: any;
  locale: string;
}

export default function ServiceCard({ item, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(!open);
  };
  
  const handleOpenFeedback = () => {
    setFeedbackOpen(true);
  };
  return (
    <div>
      <div
        onClick={handleOpen}
        className="w-full py-5 flex flex-col items-center group hover:bg-red-700 duration-300 hover:cursor-pointer rounded-lg gap-5"
      >
        <div className="bg-white border-8 border-red-700 p-5 rounded-full size-32 flex justify-center items-center overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/service/images/${item.id}/${item.image}`}
            alt={""}
            width="500"
            height="500"
            className=""
          />
        </div>
        <div className="flex flex-col justify-center w-10/12 text-center">
          <h1 className="font-montserrat font-bold w-full text-xl line-clamp-3 break-words text-balance text-black group-hover:text-white duration-300">
            {locale === "es" ? item.es.name : item.en.name}
            <p className="font-light font-montserrat text-black group-hover:text-white duration-300">
              {locale === "es" ? item.typeEs : item.typeEn}
            </p>
          </h1>
        </div>
      </div>

      <ServiceDialog
        investment={locale === "es" ? item.es : item.en}
        type={locale === "es" ? item.typeEs : item.typeEn}
        locale={locale}
        open={open}
        handler={handleOpen}
        onFeedbackAction={handleOpenFeedback}
      />
      
      {/* Modal de Feedback */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Tu opinión nos importa
            </DialogTitle>
          </DialogHeader>
          <FeedbackForm 
            serviceId={item.id}
            serviceName={locale === "es" ? item.es.name : item.en.name}
            serviceType={locale === "es" ? item.typeEs : item.typeEn}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
