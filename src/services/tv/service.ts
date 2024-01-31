import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTV() {
  return useQuery({
    queryKey: ["tv"],
    queryFn: async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      const { data } = await axios.get(url);
      return data.items;
    },
  });
}
