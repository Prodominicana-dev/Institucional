import React from "react";

export default function Page() {
  return (
    <div>
      <div className="h-screen">
        <video
          playsInline
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={"/videos/export/home.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-10/12 h-4/6 flex flex-col gap-5 justify-end">
            <h1 className="text-4xl text-center lg:text-left lg:text-6xl font-bold text-white uppercase">
              Exportación
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
