import { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export default function TawkMessenger() {
  const tawkMessengerRef = useRef(null);

  return (
    <div className="App">
      <TawkMessengerReact
        propertyId="5b899dd9afc2c34e96e81b9f"
        widgetId="default"
        onLoad={() => {}}
        useRef={tawkMessengerRef}
      />
    </div>
  );
}
