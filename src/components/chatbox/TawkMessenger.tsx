
"use client";
import { useState } from "react";
import { TawkLiveChat } from "tawk-react";
 


export default function TawkMessenger() {
   const [open, setOpen] = useState(false);

  return (
    <TawkLiveChat propertyId="5b899dd9afc2c34e96e81b9f" widgetId="default" />

  );
}
