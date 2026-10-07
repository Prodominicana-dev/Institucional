import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFeaturedNews(lang: string) {
  return useQuery({
    queryKey: ["featuredNews", lang],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news/featured?lang=${lang}`
      );
      return data;
    },
  });
}

export function useNewspaperCovers(limit: number) {
  return useQuery({
    queryKey: ["newspaperCovers", limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover?limit=${limit}`
      );
      return data;
    },
  });
}

export function useEconomicIndicators() {
  return useQuery({
    queryKey: ["economicIndicators"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/economic-indicator`
      );
      return data;
    },
  });
}

export async function subscribeNewsletter(
  email: string,
  name?: string
): Promise<"ok" | "duplicate" | "error"> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscriber`,
      { email, name }
    );
    return res.status === 201 ? "ok" : "error";
  } catch (err: any) {
    if (err.response?.status === 409) return "duplicate";
    return "error";
  }
}
