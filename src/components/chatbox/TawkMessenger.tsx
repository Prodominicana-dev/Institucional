import { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { optionSelect } from "../../app/[locale]/(home)/complaint/institutionsList";

export default function TawkMessenger() {
  const tawkMessengerRef = useRef(null);
  const onStatusChange = (status: any) => {
    console.log("Tawk.to se ha cambiando correctamente", status);
  };
  const onBeforeLoad = () => {
    console.log("Tawk.to se esta cargando");
  };

  const onChatMinimized = (minimized: any) => {
    console.log("El chat ha sido minimizado", minimized);
  }

  return (
    <div className="App">
      <TawkMessengerReact
        propertyId="5b899dd9afc2c34e96e81b9f"
        widgetId="default"
        onLoad={() => {
          console.log("Tawk.to se ha cargado correctamente");
        }}
        onStatusChange={onStatusChange}
        onBeforeLoad={onBeforeLoad}
        onChatMinimized={onChatMinimized}
        useRef={tawkMessengerRef}
      />
    </div>
  );
}
