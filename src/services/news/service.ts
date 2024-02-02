import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getLocale } from "next-intl/server";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news`;
      const { data } = await axios.get(url);
      return data.sections;
    },
  });
}
