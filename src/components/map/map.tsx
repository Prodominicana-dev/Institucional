"use client";
import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

interface Props {
  lat: number;
  lng: number;
  locale: string;
}

export default function GoogleMap({ lat, lng, locale }: Props) {
  const center = {
    lat: lat,
    lng: lng,
  };
  return (
    <div className="w-full h-[70vh]">
      <APIProvider
        apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        language={locale}
      >
        <Map mapId={"fbaf3dc9f8865313"} defaultZoom={15} defaultCenter={center}>
          <AdvancedMarker position={center} className="cursor-pointer" />
        </Map>
      </APIProvider>
    </div>
    // <LoadScript
    //   language={locale}
    //   googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
    //   loadingElement={<div />}
    // >
    //   <GoogleMap
    //     zoom={15}
    //     center={center}
    //     mapContainerClassName="w-full h-[70vh] border-0"
    //   >
    //     <Marker position={center} />
    //   </GoogleMap>
    // </LoadScript>
  );
}
