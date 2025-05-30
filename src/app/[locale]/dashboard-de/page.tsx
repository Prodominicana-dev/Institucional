import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col w-full h-full xl:h-screen">
      <Image
        width={3840}
        height={2160}
        draggable={false}
        alt="exportdashboard"
        src="/images/export-dashboard.png"
        className="h-3/6 w-full object-contain"
      />
      <Image
        width={3840}
        height={2160}
        draggable={false}
        alt="investdashboard"
        src="/images/invest-dashboard.png"
        className="h-3/6 w-full object-contain"
      />
    </div>
  );
}
