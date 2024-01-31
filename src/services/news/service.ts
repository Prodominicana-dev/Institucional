import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getLocale } from "next-intl/server";

export function useSection() {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/section`;
      const { data } = await axios.get(url);
      return data.sections;
    },
  });
}
