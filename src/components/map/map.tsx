"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Props {
  lat: number;
  lng: number;
  locale: string;
}

export default function Map({ lat, lng, locale }: Props) {
  const center = {
    lat: lat,
    lng: lng,
  };
  return (
    <LoadScript
      language={locale}
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
      loadingElement={<div />}
    >
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-[70vh] border-0"
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
