import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export interface EconomicIndicator {
  key: "usd" | "eur" | "oil" | "freight";
  label: string;
  labelEn: string;
  value: string;
  note?: string;
  noteEn?: string;
  order: number;
  // Vigencia: la API resuelve si el valor sigue valido para publicarse.
  maxAgeHours?: number;
  updated_At?: string | null;
  expiresAt?: string | null;
  stale?: boolean;
}

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

export function useEconomicIndicators() {
  return useQuery({
    queryKey: ["economic-indicators"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/economic-indicator`
      );
      return data as EconomicIndicator[];
    },
  });
}

export async function updateEconomicIndicator(
  key: string,
  body: Partial<EconomicIndicator>,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/economic-indicator/${key}`,
      body,
      { headers: authHeader(userId) }
    );
    return res.status === 200;
  } catch {
    return false;
  }
}
