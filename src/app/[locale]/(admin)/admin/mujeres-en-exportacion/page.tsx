"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { notifications } from "@mantine/notifications";
import { HashLoader } from "react-spinners";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import {
  hora12,
  mexAdmin,
  speakerPhotoUrl,
  MexAdminData,
  MexDay,
  MexSession,
  MexSpeaker,
} from "@/services/mujeres-exportacion/service";

/* Panel del programa del Encuentro Nacional Mujeres en Exportación.
   Página pública: /mujeres-en-exportacion */

const TIPOS = ["Registro", "Ceremonia", "Plenaria", "Conferencia magistral", "Panel", "Conversatorio", "Taller", "Networking", "Receso", "Almuerzo", "Ruedas de negocios"];
const ROLES = ["Moderadora", "Moderador", "Panelista", "Conferencista", "Presentadora", "Palabras de bienvenida", "Invitada especial"];

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#052C59] focus:border-[#1495E8] focus:outline-none focus:ring-2 focus:ring-[#1495E8]/30";
const etiqueta = "flex flex-1 min-w-[140px] flex-col gap-1 text-sm font-semibold text-[#052C59]";
const btn = "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-[#052C59] hover:border-[#1495E8] disabled:opacity-40 disabled:cursor-not-allowed";
const btnPrimario = "rounded-lg bg-[#052C59] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a3d78] disabled:opacity-50";
const btnPeligro = "rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 hover:border-red-500";

function avisar(texto: string, error = false) {
  notifications.show({
    autoClose: error ? 6000 : 3000,
    withCloseButton: false,
    title: error ? "Error" : "Listo",
    message: texto,
    color: error ? "red" : "green",
  });
}

function Modal({ open, onClose, ancho, children }: { open: boolean; onClose: () => void; ancho?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className={`rounded-2xl p-6 backdrop:bg-[#052C59]/50 ${ancho ? "w-[min(820px,calc(100vw-32px))]" : "w-[min(520px,calc(100vw-32px))]"}`}
    >
      {open && children}
    </dialog>
  );
}

function Confirmar({ mensaje, onSi, onNo }: { mensaje: string | null; onSi: () => void; onNo: () => void }) {
  return (
    <Modal open={!!mensaje} onClose={onNo}>
      <h3 className="mb-3 text-xl font-bold text-[#052C59]">Confirmar</h3>
      <p className="mb-6 text-sm text-gray-700">{mensaje}</p>
      <div className="flex justify-end gap-2">
        <button className={btn} onClick={onNo}>Cancelar</button>
        <button className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white" onClick={onSi}>Eliminar</button>
      </div>
    </Modal>
  );
}

function Avatar({ p, size = 56 }: { p: MexSpeaker; size?: number }) {
  const estilo = { width: size, height: size };
  return p.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={speakerPhotoUrl(p)} alt="" style={estilo} className="shrink-0 rounded-full border-2 border-[#F6A0B8] object-cover" />
  ) : (
    <div style={estilo} className="grid shrink-0 place-items-center rounded-full border-2 border-[#F6A0B8] bg-[#F9F3EA] text-lg font-bold text-[#052C59]">
      {p.name.trim().charAt(0).toUpperCase()}
    </div>
  );
}

// ---------- Formulario de día ----------
function DiaForm({ dia, onGuardar, onCancelar }: { dia: MexDay | null; onGuardar: (b: any) => Promise<void>; onCancelar: () => void }) {
  const [f, setF] = useState({ date: dia?.date || "", label: dia?.label || "", subtitle: dia?.subtitle || "" });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cambiarFecha = (date: string) => {
    let label = f.label;
    // Sugerir la etiqueta a partir de la fecha si aún está vacía.
    if (!label && date) {
      const [y, m, d] = date.split("-").map(Number);
      label = new Date(y, m - 1, d).toLocaleDateString("es-DO", { day: "numeric", month: "long" });
    }
    setF({ ...f, date, label });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setGuardando(true);
        try { await onGuardar(f); } catch (ex: any) { setError(ex.message); } finally { setGuardando(false); }
      }}
    >
      <h3 className="text-xl font-bold text-[#052C59]">{dia ? "Editar día" : "Nuevo día"}</h3>
      <label className={etiqueta}>Fecha<input type="date" required className={input} value={f.date} onChange={(e) => cambiarFecha(e.target.value)} /></label>
      <label className={etiqueta}>Etiqueta visible<input required maxLength={200} className={input} placeholder="18 de noviembre" value={f.label} onChange={(e) => setF({ ...f, label: e.target.value })} /></label>
      <label className={etiqueta}>Subtítulo<input maxLength={300} className={input} placeholder="Opcional, por ejemplo: Jornada de apertura" value={f.subtitle} onChange={(e) => setF({ ...f, subtitle: e.target.value })} /></label>
      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" className={btn} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={btnPrimario} disabled={guardando}>{guardando ? "Guardando..." : "Guardar"}</button>
      </div>
    </form>
  );
}

// ---------- Formulario de sesión ----------
type Asignado = { speakerId: string; role: string };

function SesionForm({
  sesion, dias, ponentes, onGuardar, onCancelar, onCrearPonente,
}: {
  sesion: Partial<MexSession> & { dayId: string };
  dias: MexDay[];
  ponentes: MexSpeaker[];
  onGuardar: (b: any) => Promise<void>;
  onCancelar: () => void;
  onCrearPonente: (fd: FormData) => Promise<MexSpeaker>;
}) {
  const [f, setF] = useState({
    dayId: sesion.dayId,
    startTime: sesion.startTime || "",
    endTime: sesion.endTime || "",
    title: sesion.title || "",
    type: sesion.type || "",
    location: sesion.location || "",
    note: sesion.note || "",
    description: sesion.description || "",
    visible: sesion.visible ?? true,
  });
  const [asignados, setAsignados] = useState<Asignado[]>((sesion.speakers || []).map((p) => ({ speakerId: p.id, role: p.role || "Panelista" })));
  const [elegido, setElegido] = useState("");
  const [rapido, setRapido] = useState({ name: "", position: "", organization: "" });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  const libres = ponentes.filter((p) => !asignados.some((a) => a.speakerId === p.id));
  const mover = (i: number, j: number) => {
    const copia = [...asignados];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setAsignados(copia);
  };

  const crearRapido = async () => {
    if (!rapido.name.trim()) return avisar("Escribe el nombre de la ponente.", true);
    const fd = new FormData();
    Object.entries(rapido).forEach(([k, v]) => fd.append(k, v));
    try {
      const nueva = await onCrearPonente(fd);
      setAsignados([...asignados, { speakerId: nueva.id, role: "Panelista" }]);
      setRapido({ name: "", position: "", organization: "" });
    } catch (ex: any) {
      avisar(ex.message, true);
    }
  };

  return (
    <form
      className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto pr-1"
      onSubmit={async (e) => {
        e.preventDefault();
        setGuardando(true);
        try { await onGuardar({ ...f, speakers: asignados }); } catch (ex: any) { setError(ex.message); } finally { setGuardando(false); }
      }}
    >
      <h3 className="text-xl font-bold text-[#052C59]">{sesion.id ? "Editar sesión" : "Nueva sesión"}</h3>
      <div className="flex flex-wrap gap-3">
        <label className={etiqueta}>Día
          <select className={input} value={f.dayId} onChange={(e) => set("dayId", e.target.value)}>
            {dias.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </label>
        <label className={etiqueta}>Inicio<input type="time" required className={input} value={f.startTime} onChange={(e) => set("startTime", e.target.value)} /></label>
        <label className={etiqueta}>Fin<input type="time" className={input} value={f.endTime} onChange={(e) => set("endTime", e.target.value)} /></label>
      </div>
      <label className={etiqueta}>Título<input required maxLength={300} className={input} value={f.title} onChange={(e) => set("title", e.target.value)} /></label>
      <div className="flex flex-wrap gap-3">
        <label className={etiqueta}>Tipo<input list="mex-tipos" maxLength={60} className={input} placeholder="Panel, Plenaria, Networking..." value={f.type} onChange={(e) => set("type", e.target.value)} /></label>
        <label className={etiqueta}>Lugar o salón<input maxLength={200} className={input} value={f.location} onChange={(e) => set("location", e.target.value)} /></label>
      </div>
      <label className={etiqueta}>Nota destacada<input maxLength={200} className={input} placeholder="Opcional, por ejemplo: Solo por invitación" value={f.note} onChange={(e) => set("note", e.target.value)} /></label>
      <label className={etiqueta}>Descripción<textarea rows={4} className={input} value={f.description} onChange={(e) => set("description", e.target.value)} /></label>

      <fieldset className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4">
        <legend className="px-1 text-sm font-bold text-[#052C59]">Ponentes de la sesión</legend>
        {asignados.length === 0 && <p className="text-sm text-gray-500">Sin ponentes asignadas.</p>}
        {asignados.map((a, i) => {
          const p = ponentes.find((x) => x.id === a.speakerId);
          return (
            <div key={a.speakerId} className="flex flex-wrap items-center gap-2 rounded-lg bg-[#F9F3EA] px-3 py-2">
              <span className="min-w-[140px] flex-1 text-sm font-bold text-[#052C59]">{p?.name || "Ponente"}</span>
              <input
                list="mex-roles"
                aria-label="Rol en la sesión"
                className={`${input} !w-44 !py-1`}
                value={a.role}
                onChange={(e) => setAsignados(asignados.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))}
              />
              <button type="button" className={btn} disabled={i === 0} onClick={() => mover(i, i - 1)}>Subir</button>
              <button type="button" className={btn} disabled={i === asignados.length - 1} onClick={() => mover(i, i + 1)}>Bajar</button>
              <button type="button" className={btnPeligro} onClick={() => setAsignados(asignados.filter((_, j) => j !== i))}>Quitar</button>
            </div>
          );
        })}
        <div className="flex flex-wrap items-end gap-2">
          <label className={etiqueta}>Agregar ponente existente
            <select className={input} value={elegido} onChange={(e) => setElegido(e.target.value)}>
              <option value="">{libres.length ? "Selecciona..." : "No hay más ponentes registradas"}</option>
              {libres.map((p) => <option key={p.id} value={p.id}>{p.name}{p.organization ? ` - ${p.organization}` : ""}</option>)}
            </select>
          </label>
          <button
            type="button"
            className={btn}
            disabled={!elegido}
            onClick={() => { setAsignados([...asignados, { speakerId: elegido, role: "Panelista" }]); setElegido(""); }}
          >
            Agregar
          </button>
        </div>
        <details>
          <summary className="cursor-pointer text-sm font-bold text-[#1495E8]">Crear una ponente nueva aquí</summary>
          <div className="mt-3 flex flex-wrap items-end gap-2">
            <label className={etiqueta}>Nombre<input maxLength={200} className={input} value={rapido.name} onChange={(e) => setRapido({ ...rapido, name: e.target.value })} /></label>
            <label className={etiqueta}>Cargo<input maxLength={200} className={input} value={rapido.position} onChange={(e) => setRapido({ ...rapido, position: e.target.value })} /></label>
            <label className={etiqueta}>Organización<input maxLength={200} className={input} value={rapido.organization} onChange={(e) => setRapido({ ...rapido, organization: e.target.value })} /></label>
            <button type="button" className={btn} onClick={crearRapido}>Crear y agregar</button>
          </div>
        </details>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-[#052C59]">
        <input type="checkbox" checked={f.visible} onChange={(e) => set("visible", e.target.checked)} /> Visible en la página pública
      </label>
      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" className={btn} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={btnPrimario} disabled={guardando}>{guardando ? "Guardando..." : "Guardar sesión"}</button>
      </div>
      <datalist id="mex-tipos">{TIPOS.map((t) => <option key={t} value={t} />)}</datalist>
      <datalist id="mex-roles">{ROLES.map((r) => <option key={r} value={r} />)}</datalist>
    </form>
  );
}

// ---------- Formulario de ponente ----------
function PonenteForm({ ponente, onGuardar, onCancelar }: { ponente: MexSpeaker | null; onGuardar: (fd: FormData) => Promise<void>; onCancelar: () => void }) {
  const [vista, setVista] = useState(ponente?.photo ? speakerPhotoUrl(ponente) : "");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const foto = fd.get("photo") as File | null;
        if (!foto || !foto.size) fd.delete("photo");
        setGuardando(true);
        try { await onGuardar(fd); } catch (ex: any) { setError(ex.message); } finally { setGuardando(false); }
      }}
    >
      <h3 className="text-xl font-bold text-[#052C59]">{ponente ? "Editar ponente" : "Nueva ponente"}</h3>
      <label className={etiqueta}>Nombre completo<input name="name" required maxLength={200} className={input} defaultValue={ponente?.name || ""} /></label>
      <label className={etiqueta}>Cargo<input name="position" maxLength={200} className={input} defaultValue={ponente?.position || ""} /></label>
      <label className={etiqueta}>Organización<input name="organization" maxLength={200} className={input} defaultValue={ponente?.organization || ""} /></label>
      <label className={etiqueta}>Biografía breve<textarea name="bio" rows={3} className={input} defaultValue={ponente?.bio || ""} /></label>
      <div className="flex flex-wrap items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {vista && <img src={vista} alt="" className="h-20 w-20 rounded-full border-2 border-[#F6A0B8] object-cover" />}
        <div className="flex flex-1 flex-col gap-2">
          <label className={etiqueta}>Foto (JPG, PNG o WEBP, máx. 5 MB)
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/png,image/webp"
              className="text-sm font-normal"
              onChange={(e) => { const a = e.target.files?.[0]; if (a) setVista(URL.createObjectURL(a)); }}
            />
          </label>
          {ponente?.photo && (
            <label className="flex items-center gap-2 text-sm text-[#052C59]"><input type="checkbox" name="removePhoto" value="1" /> Quitar foto actual</label>
          )}
        </div>
      </div>
      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" className={btn} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={btnPrimario} disabled={guardando}>{guardando ? "Guardando..." : "Guardar"}</button>
      </div>
    </form>
  );
}

// ---------- Ajustes ----------
function Ajustes({ ajustes, onGuardar }: { ajustes: Record<string, string>; onGuardar: (b: any) => Promise<void> }) {
  const [f, setF] = useState({
    title: ajustes.title || "",
    dates: ajustes.dates || "",
    location: ajustes.location || "",
    intro: ajustes.intro || "",
    downloadUrl: ajustes.downloadUrl || "",
    published: ajustes.published === "1",
  });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return (
    <form
      className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6"
      onSubmit={async (e) => { e.preventDefault(); await onGuardar(f); }}
    >
      <label className={etiqueta}>Título de la cabecera<input required maxLength={120} className={input} value={f.title} onChange={(e) => set("title", e.target.value)} /></label>
      <label className={etiqueta}>Fechas (texto bajo el título)<input maxLength={120} className={input} value={f.dates} onChange={(e) => set("dates", e.target.value)} /></label>
      <label className={etiqueta}>Lugar<input maxLength={200} className={input} placeholder="Opcional" value={f.location} onChange={(e) => set("location", e.target.value)} /></label>
      <label className={etiqueta}>Texto de introducción<textarea rows={4} className={input} placeholder="Opcional; aparece sobre los días" value={f.intro} onChange={(e) => set("intro", e.target.value)} /></label>
      <label className={etiqueta}>Enlace para descargar el programa (PDF)<input type="url" className={input} placeholder="https://..." value={f.downloadUrl} onChange={(e) => set("downloadUrl", e.target.value)} /></label>
      <label className="flex items-center gap-2 text-sm text-[#052C59]">
        <input type="checkbox" checked={f.published} onChange={(e) => set("published", e.target.checked)} />
        Programa publicado (si se desmarca, la página muestra &quot;disponible próximamente&quot;)
      </label>
      <div className="flex justify-end"><button type="submit" className={btnPrimario}>Guardar ajustes</button></div>
    </form>
  );
}

// ---------- Panel ----------
function Panel() {
  const { user } = useUser();
  const uid = user?.sub as string;
  const [datos, setDatos] = useState<MexAdminData | null>(null);
  const [pestana, setPestana] = useState<"programa" | "ponentes" | "ajustes">("programa");
  const [busqueda, setBusqueda] = useState("");
  const [modalDia, setModalDia] = useState<{ dia: MexDay | null } | null>(null);
  const [modalSesion, setModalSesion] = useState<(Partial<MexSession> & { dayId: string }) | null>(null);
  const [modalPonente, setModalPonente] = useState<{ ponente: MexSpeaker | null } | null>(null);
  const [confirmacion, setConfirmacion] = useState<{ mensaje: string; accion: () => Promise<void> } | null>(null);

  const cargar = useCallback(async () => {
    try { setDatos(await mexAdmin.load(uid)); } catch (ex: any) { avisar(ex.message, true); }
  }, [uid]);

  useEffect(() => { if (uid) cargar(); }, [uid, cargar]);

  // Ejecuta una acción del panel, avisa y recarga.
  const hacer = async (accion: () => Promise<any>, ok: string) => {
    try { await accion(); avisar(ok); await cargar(); } catch (ex: any) { avisar(ex.message, true); }
  };
  const confirmar = (mensaje: string, accion: () => Promise<void>) => setConfirmacion({ mensaje, accion });

  const botones =
    pestana === "programa" ? [{ name: "Agregar día", onClick: () => setModalDia({ dia: null }) }]
    : pestana === "ponentes" ? [{ name: "Agregar ponente", onClick: () => setModalPonente({ ponente: null }) }]
    : [];

  if (!datos) {
    return <div className="flex h-[60vh] w-full items-center justify-center"><HashLoader color="#052C59" size={60} /></div>;
  }

  const usos = new Map<string, number>();
  datos.days.forEach((d) => d.sessions.forEach((s) => s.speakers.forEach((p) => usos.set(p.id, (usos.get(p.id) || 0) + 1))));
  const q = busqueda.trim().toLowerCase();
  const ponentesFiltrados = datos.speakers.filter((p) => !q || `${p.name} ${p.organization || ""} ${p.position || ""}`.toLowerCase().includes(q));

  return (
    <Sketch
      title="Mujeres en Exportación"
      subtitle="Programa del Encuentro Nacional 2026"
      handleFilterOpen={() => {}}
      buttons={botones}
      hasFilter={false}
    >
      <div className="flex w-11/12 flex-col gap-6 text-[#052C59]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1" role="tablist">
            {(["programa", "ponentes", "ajustes"] as const).map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={pestana === p}
                onClick={() => setPestana(p)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${pestana === p ? "bg-white shadow text-[#052C59]" : "text-gray-500"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`rounded-full px-3 py-1 font-semibold ${datos.settings.published === "1" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
              {datos.settings.published === "1" ? "Publicado" : "No publicado"}
            </span>
            <a href="/mujeres-en-exportacion" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1495E8] hover:underline">Ver página pública</a>
          </div>
        </div>

        {pestana === "programa" && (
          <>
            <p className="text-sm text-gray-600">Las sesiones se ordenan solas por hora de inicio. Las ocultas no aparecen en la página pública.</p>
            {datos.days.length === 0 && <p className="rounded-xl border border-gray-200 p-6 text-gray-500">No hay días. Agrega el primero.</p>}
            {datos.days.map((d, i) => (
              <section key={d.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="flex flex-wrap items-center gap-3 bg-[#052C59] px-5 py-4 text-white">
                  <div>
                    <h3 className="text-lg font-bold">{d.label}</h3>
                    <div className="text-xs opacity-75">{d.date}{d.subtitle ? ` · ${d.subtitle}` : ""} · {d.sessions.length} sesiones</div>
                  </div>
                  <div className="ml-auto flex flex-wrap gap-2 [&>button]:border-white/40 [&>button]:bg-transparent [&>button]:text-white">
                    <button className={btn} disabled={i === 0} onClick={() => {
                      const ids = datos.days.map((x) => x.id);
                      [ids[i - 1], ids[i]] = [ids[i], ids[i - 1]];
                      hacer(() => mexAdmin.reorderDays(uid, ids), "Orden actualizado.");
                    }}>Subir</button>
                    <button className={btn} disabled={i === datos.days.length - 1} onClick={() => {
                      const ids = datos.days.map((x) => x.id);
                      [ids[i + 1], ids[i]] = [ids[i], ids[i + 1]];
                      hacer(() => mexAdmin.reorderDays(uid, ids), "Orden actualizado.");
                    }}>Bajar</button>
                    <button className={btn} onClick={() => setModalDia({ dia: d })}>Editar día</button>
                    <button className={btn} onClick={() => confirmar(
                      `Se eliminará "${d.label}" y sus ${d.sessions.length} sesiones. Esta acción no se puede deshacer.`,
                      () => hacer(() => mexAdmin.deleteDay(uid, d.id), "Día eliminado."),
                    )}>Eliminar día</button>
                    <button className="rounded-lg bg-[#FF9D0A] px-3 py-1.5 text-sm font-bold !text-[#052C59]" onClick={() => setModalSesion({ dayId: d.id })}>Agregar sesión</button>
                  </div>
                </div>
                {d.sessions.length === 0 && <p className="p-5 text-sm text-gray-500">Sin sesiones todavía.</p>}
                {d.sessions.map((s) => (
                  <div key={s.id} className={`flex flex-wrap items-start gap-4 border-t border-gray-100 px-5 py-3 first:border-t-0 ${s.visible ? "" : "bg-gray-50 text-gray-500"}`}>
                    <div className="w-28 shrink-0 font-bold text-[#1495E8]">
                      {hora12(s.startTime)}
                      {s.endTime && <div className="text-xs font-normal text-gray-500">a {hora12(s.endTime)}</div>}
                    </div>
                    <div className="min-w-[200px] flex-1">
                      <div className="font-bold">{s.title}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        {!s.visible && <span className="rounded-full bg-gray-200 px-2 py-0.5 font-semibold">Oculta</span>}
                        {s.type && <span className="rounded-full bg-[#F6A0B8] px-2 py-0.5 font-semibold text-[#052C59]">{s.type}</span>}
                        {[s.location, s.note].filter(Boolean).join(" · ")}
                      </div>
                      {s.speakers.length > 0 && (
                        <div className="mt-1 text-xs text-gray-600">{s.speakers.map((p) => (p.role ? `${p.name} (${p.role})` : p.name)).join(", ")}</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className={btn} onClick={() => setModalSesion(s)}>Editar</button>
                      <button className={btn} onClick={() => setModalSesion({ ...s, id: undefined, title: `${s.title} (copia)` })}>Duplicar</button>
                      <button className={btn} onClick={() => hacer(() => mexAdmin.setVisible(uid, s.id, !s.visible), s.visible ? "Sesión oculta." : "Sesión visible.")}>
                        {s.visible ? "Ocultar" : "Mostrar"}
                      </button>
                      <button className={btnPeligro} onClick={() => confirmar(
                        `Se eliminará la sesión "${s.title}".`,
                        () => hacer(() => mexAdmin.deleteSession(uid, s.id), "Sesión eliminada."),
                      )}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </>
        )}

        {pestana === "ponentes" && (
          <>
            <input className={`${input} max-w-md`} type="search" placeholder="Buscar por nombre u organización" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            {ponentesFiltrados.length === 0 && (
              <p className="rounded-xl border border-gray-200 p-6 text-gray-500">{q ? "Sin resultados." : "No hay ponentes registradas."}</p>
            )}
            <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
              {ponentesFiltrados.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                  <Avatar p={p} />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-gray-600">{[p.position, p.organization].filter(Boolean).join(", ")}</div>
                    <div className="text-xs text-gray-500">{usos.get(p.id) ? `${usos.get(p.id)} sesión(es)` : "Sin sesiones"}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className={btn} onClick={() => setModalPonente({ ponente: p })}>Editar</button>
                    <button className={btnPeligro} onClick={() => confirmar(
                      `Se eliminará a ${p.name} y se quitará de todas sus sesiones.`,
                      () => hacer(() => mexAdmin.deleteSpeaker(uid, p.id), "Ponente eliminada."),
                    )}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {pestana === "ajustes" && (
          <Ajustes
            key={JSON.stringify(datos.settings)}
            ajustes={datos.settings}
            onGuardar={(b) => hacer(() => mexAdmin.saveSettings(uid, b), "Ajustes guardados.")}
          />
        )}
      </div>

      <Modal open={!!modalDia} onClose={() => setModalDia(null)}>
        {modalDia && (
          <DiaForm
            dia={modalDia.dia}
            onCancelar={() => setModalDia(null)}
            onGuardar={async (b) => {
              if (modalDia.dia) await mexAdmin.updateDay(uid, modalDia.dia.id, b);
              else await mexAdmin.createDay(uid, b);
              setModalDia(null);
              avisar("Día guardado.");
              await cargar();
            }}
          />
        )}
      </Modal>

      <Modal ancho open={!!modalSesion} onClose={() => setModalSesion(null)}>
        {modalSesion && (
          <SesionForm
            sesion={modalSesion}
            dias={datos.days}
            ponentes={datos.speakers}
            onCancelar={() => setModalSesion(null)}
            onCrearPonente={async (fd) => {
              const nueva = await mexAdmin.createSpeaker(uid, fd);
              setDatos((prev) => (prev ? { ...prev, speakers: [...prev.speakers, nueva] } : prev));
              return nueva;
            }}
            onGuardar={async (b) => {
              if (modalSesion.id) await mexAdmin.updateSession(uid, modalSesion.id, b);
              else await mexAdmin.createSession(uid, b);
              setModalSesion(null);
              avisar("Sesión guardada.");
              await cargar();
            }}
          />
        )}
      </Modal>

      <Modal open={!!modalPonente} onClose={() => setModalPonente(null)}>
        {modalPonente && (
          <PonenteForm
            ponente={modalPonente.ponente}
            onCancelar={() => setModalPonente(null)}
            onGuardar={async (fd) => {
              if (modalPonente.ponente) await mexAdmin.updateSpeaker(uid, modalPonente.ponente.id, fd);
              else await mexAdmin.createSpeaker(uid, fd);
              setModalPonente(null);
              avisar("Ponente guardada.");
              await cargar();
            }}
          />
        )}
      </Modal>

      <Confirmar
        mensaje={confirmacion?.mensaje || null}
        onNo={() => setConfirmacion(null)}
        onSi={async () => {
          const accion = confirmacion?.accion;
          setConfirmacion(null);
          if (accion) await accion();
        }}
      />
    </Sketch>
  );
}

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <Panel />
    </AuthUser>
  );
}
