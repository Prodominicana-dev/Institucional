import axios from "axios";
var CryptoJS = require("crypto-js");

/* Programa del Encuentro Nacional Mujeres en Exportación.
   La página pública lee /program; todo lo demás es del panel y exige el
   permiso create:news (el mismo de noticias y portadas). */

const API = `${process.env.NEXT_PUBLIC_API_URL}/mujeres-exportacion`;

export interface MexSpeaker {
  id: string;
  name: string;
  position?: string | null;
  organization?: string | null;
  bio?: string | null;
  photo?: string | null;
  role?: string;
}

export interface MexSession {
  id: string;
  dayId: string;
  startTime: string;
  endTime?: string | null;
  title: string;
  type?: string | null;
  location?: string | null;
  description?: string | null;
  note?: string | null;
  visible: boolean;
  speakers: MexSpeaker[];
}

export interface MexDay {
  id: string;
  date: string;
  label: string;
  subtitle?: string | null;
  order: number;
  sessions: MexSession[];
}

export interface MexProgram {
  settings: Record<string, string>;
  days: MexDay[];
  unpublished?: boolean;
}

export interface MexAdminData extends MexProgram {
  speakers: MexSpeaker[];
}

export function speakerPhotoUrl(s: MexSpeaker) {
  return s.photo ? `${API}/speakers/${s.id}/img/${encodeURIComponent(s.photo)}` : "";
}

export function hora12(hhmm?: string | null) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
}

export async function getProgram(): Promise<MexProgram> {
  const { data } = await axios.get(`${API}/program`);
  return data;
}

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

// Devuelve el mensaje de error de la API para mostrarlo en el panel.
function mensaje(error: any) {
  if (error?.response?.status === 401) return "No tienes permiso para gestionar el programa.";
  return error?.response?.data?.error || "Ocurrió un error. Intenta de nuevo.";
}

async function llamar<T = any>(userId: string, method: string, ruta: string, data?: any): Promise<T> {
  try {
    const res = await axios.request({ method, url: `${API}${ruta}`, data, headers: authHeader(userId) });
    return res.data;
  } catch (error) {
    throw new Error(mensaje(error));
  }
}

export const mexAdmin = {
  load: (u: string) => llamar<MexAdminData>(u, "get", "/admin"),
  saveSettings: (u: string, body: any) => llamar(u, "put", "/settings", body),
  createDay: (u: string, body: any) => llamar(u, "post", "/days", body),
  updateDay: (u: string, id: string, body: any) => llamar(u, "patch", `/days/${id}`, body),
  reorderDays: (u: string, ids: string[]) => llamar(u, "patch", "/days/order", { ids }),
  deleteDay: (u: string, id: string) => llamar(u, "delete", `/days/${id}`),
  createSession: (u: string, body: any) => llamar(u, "post", "/sessions", body),
  updateSession: (u: string, id: string, body: any) => llamar(u, "patch", `/sessions/${id}`, body),
  setVisible: (u: string, id: string, visible: boolean) => llamar(u, "patch", `/sessions/${id}/visible`, { visible }),
  deleteSession: (u: string, id: string) => llamar(u, "delete", `/sessions/${id}`),
  createSpeaker: (u: string, fd: FormData) => llamar<MexSpeaker>(u, "post", "/speakers", fd),
  updateSpeaker: (u: string, id: string, fd: FormData) => llamar<MexSpeaker>(u, "patch", `/speakers/${id}`, fd),
  deleteSpeaker: (u: string, id: string) => llamar(u, "delete", `/speakers/${id}`),
};
