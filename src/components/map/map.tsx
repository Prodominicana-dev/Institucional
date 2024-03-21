"use client";
import React from "react";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";

interface Props {
  lat: number;
  lng: number;
}

export default function GoogleMap({ lat, lng }: Props) {
  console.log(lat, lng);
  const center = {
    lat: lat,
    lng: lng,
  };
  return (
    <div className="w-full h-[70vh]">
      <Map mapId={"fbaf3dc9f8865313"} defaultZoom={15} defaultCenter={center}>
        <AdvancedMarker position={center} className="cursor-pointer" />
      </Map>
    </div>
  );
}
