"use client";
import { useState } from "react";
import { TawkLiveChat } from "tawk-react";

export default function TawkMessenger() {
  const [open, setOpen] = useState(false);

  return (
    <TawkLiveChat propertyId="5b899dd9afc2c34e96e81b9f" widgetId="default" />

    // <>
    //   {/* BOTÓN */}
    //   <div className="fixed bottom-6 right-6 z-[9999] cursor-pointer">
    //     <img
    //       src="icons/IconoChatbot.png"
    //       alt="Chatbot"
    //       onClick={() => setOpen(true)}
    //       className="h-24 w-24 cursor-pointer rounded-full object-contain
    //              animate-[pulse_3s_ease-in-out_infinite]
    //              hover:scale-105 transition-transform"
    //     />
    //   </div>

    //   {/* CHAT FRAME */}
    //   {open && (
    //     <div
    //       className="fixed bottom-24 right-6 z-[9999]
    //              w-[360px] h-[520px]
    //              rounded-2xl overflow-hidden
    //              shadow-2xl bg-white
    //              flex flex-col"
    //     >
    //       {/* HEADER */}
    //       <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
    //         <span className="text-sm font-medium">Asistente virtual</span>
    //         <button
    //           onClick={() => setOpen(false)}
    //           className="text-lg leading-none hover:opacity-80"
    //         >
    //           ✕
    //         </button>
    //       </div>

    //       {/* IFRAME */}
    //       <iframe
    //         src="https://chatbot.prodominicana.gob.do/embed"
    //         title="Chatbot ProDominicana"
    //         className="w-full flex-1 border-none"
    //         allow="microphone; camera"
    //       />
    //     </div>
    //   )}
    // </>
  );
}
