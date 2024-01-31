"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useTV } from "@/services/tv/service";

export default function Page() {
  const { data, isLoading, refetch } = useTV();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setVideos(data);
    }
  }, [isLoading]);
  return (
    <div className="w-full bg-white flex">
      <div className="p-10 sm:p-20 space-y-5 w-full">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          TV
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-10">
          {videos.map((video: any, key) => (
            <iframe
              key={key}
              src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-48 sm:h-72 rounded-lg"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
}
