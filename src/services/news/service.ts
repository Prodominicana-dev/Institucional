import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useEsNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/es/news`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useEnNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/en/news`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useCategoriesNews() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news/c/all`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createNews(news: FormData, update: () => void, userId: string) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/news`, news, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        update();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
