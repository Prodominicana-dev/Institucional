import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTV() {
  return useQuery({
    queryKey: ["tv"],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const { data } = await axios.get(url);
      const videoIds: string[] = data.items.map(
        (item: any) => item.contentDetails.videoId
      );
      const videoIdsString: string = videoIds.join(",");
      const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIdsString}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const { data: videosData } = await axios.get(videosUrl);
      const videosWithoutRegionRestriction = videosData.items
        .filter((video: any) => !video.contentDetails.regionRestriction)
        .map((video: any) => ({ id: video.id }));
      return videosWithoutRegionRestriction;
    },
  });
}

export function useLastVideo() {
  return useQuery({
    queryKey: ["lastVideo"],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=1&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const { data } = await axios.get(url);
      const videoId = data.items[0].contentDetails.videoId;
      return videoId;
    },
  });
}
