"use client";
import React, { useEffect, useState } from "react";
import {
  getProgram,
  hora12,
  speakerPhotoUrl,
  MexDay,
  MexProgram,
  MexSession,
  MexSpeaker,
} from "@/services/mujeres-exportacion/service";
import "./programa.css";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Orbitas() {
  return (
    <svg className="mex-hero__orbitas" viewBox="0 0 720 340" aria-hidden="true" preserveAspectRatio="xMaxYMax slice">
      <path d="M40 340 A 350 350 0 0 1 200 145" fill="none" stroke="#FF9D0A" strokeWidth="7" />
      <path d="M310 90 A 350 350 0 0 1 545 120" fill="none" stroke="#FF9D0A" strokeWidth="5" />
      <path d="M100 340 A 300 300 0 0 1 680 340" fill="none" stroke="#1495E8" strokeWidth="4" />
      <path d="M160 340 A 235 235 0 0 1 620 340" fill="none" stroke="#F45D87" strokeWidth="8" />
      <path d="M255 340 A 135 135 0 0 1 525 340 Z" fill="#1495E8" />
      <path d="M255 75 Q 255 110 220 110 Q 255 110 255 145 Q 255 110 290 110 Q 255 110 255 75 Z" fill="#FF9D0A" />
      <circle cx="580" cy="145" r="29" fill="#1495E8" />
    </svg>
  );
}

function Ponente({ p }: { p: MexSpeaker }) {
  const cargo = [p.position, p.organization].filter(Boolean).join(", ");
  return (
    <div className="mex-ponente">
      {p.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="mex-ponente__foto" src={speakerPhotoUrl(p)} alt="" loading="lazy" />
      ) : (
        <div className="mex-ponente__foto mex-ponente__inicial" aria-hidden="true">
          {p.name.trim().charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        {p.role && <div className="mex-ponente__rol">{p.role}</div>}
        <div className="mex-ponente__nombre">{p.name}</div>
        {cargo && <div className="mex-ponente__cargo">{cargo}</div>}
      </div>
    </div>
  );
}

function Sesion({ s }: { s: MexSession }) {
  const descripcion = s.description || "";
  // Con descripción larga o muchos ponentes el detalle va detrás de "Ver detalles".
  const plegar = descripcion.length > 220 || s.speakers.length > 4;
  const [abierto, setAbierto] = useState(!plegar);
  const tieneDetalle = descripcion || s.speakers.length > 0;
  const detalleId = `mex-detalle-${s.id}`;

  return (
    <article className="mex-sesion">
      <div className="mex-sesion__hora">
        {hora12(s.startTime)}
        {s.endTime && <span>a {hora12(s.endTime)}</span>}
      </div>
      <div>
        <h3 className="mex-sesion__titulo">{s.title}</h3>
        {(s.type || s.location || s.note) && (
          <div className="mex-sesion__meta">
            {s.type && <span className={`mex-etiqueta mex-etiqueta--${slug(s.type)}`}>{s.type}</span>}
            {s.location && <span>{s.location}</span>}
            {s.note && <span className="mex-nota">{s.note}</span>}
          </div>
        )}
        {tieneDetalle && (
          <div className="mex-sesion__detalle" id={detalleId} hidden={!abierto}>
            {descripcion && <p className="mex-sesion__desc">{descripcion}</p>}
            {s.speakers.length > 0 && (
              <div className="mex-ponentes">
                {s.speakers.map((p) => (
                  <Ponente key={p.id} p={p} />
                ))}
              </div>
            )}
          </div>
        )}
        {tieneDetalle && plegar && (
          <button
            type="button"
            className="mex-ver-mas"
            aria-expanded={abierto}
            aria-controls={detalleId}
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? "Ocultar detalles" : "Ver detalles"}
          </button>
        )}
      </div>
    </article>
  );
}

function Dia({ d, abiertoInicial }: { d: MexDay; abiertoInicial: boolean }) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const cuerpoId = `dia-${d.id}`;
  return (
    <section className="mex-dia" data-abierto={abierto}>
      <button
        type="button"
        className="mex-dia__cabeza"
        aria-expanded={abierto}
        aria-controls={cuerpoId}
        onClick={() => setAbierto(!abierto)}
      >
        <span className="mex-dia__nombre">
          {d.label}
          {d.subtitle && <span className="mex-dia__sub">{d.subtitle}</span>}
        </span>
        <span className="mex-dia__icono" aria-hidden="true" />
      </button>
      <div className="mex-dia__cuerpo" id={cuerpoId}>
        {d.sessions.length ? (
          d.sessions.map((s) => <Sesion key={s.id} s={s} />)
        ) : (
          <p className="mex-vacio">Programa por anunciar.</p>
        )}
      </div>
    </section>
  );
}

export default function Page() {
  const [programa, setPrograma] = useState<MexProgram | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProgram().then(setPrograma).catch(() => setError(true));
  }, []);

  const ajustes = programa?.settings || {};
  let contenido: React.ReactNode;
  if (error) contenido = <p className="mex-estado">No se pudo cargar el programa. Intenta de nuevo más tarde.</p>;
  else if (!programa) contenido = <p className="mex-estado">Cargando programa...</p>;
  else if (programa.unpublished) contenido = <p className="mex-estado">El programa estará disponible próximamente.</p>;
  else if (!programa.days.length) contenido = <p className="mex-estado">Programa por anunciar.</p>;
  else
    contenido = programa.days.map((d) => (
      // Todos cerrados como en el diseño, salvo si solo hay un día.
      <Dia key={d.id} d={d} abiertoInicial={programa.days.length === 1} />
    ));

  return (
    <div className="mex">
      <header className="mex-hero">
        <div className="mex-hero__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mex-hero__logo"
            src="/images/mujeres-en-exportacion/logo.png"
            alt="Mujeres en Exportación, Encuentro Nacional"
            width={320}
            height={124}
          />
          <h1 className="mex-hero__titulo">{ajustes.title || "Programa"}</h1>
          <p className="mex-hero__fechas">{ajustes.dates || "18-19 de noviembre 2026"}</p>
          {ajustes.location && <p className="mex-hero__lugar">{ajustes.location}</p>}
        </div>
        <Orbitas />
      </header>

      <main className="mex-contenido">
        {ajustes.intro && <p className="mex-intro">{ajustes.intro}</p>}
        {ajustes.downloadUrl && (
          <div className="mex-acciones">
            <a className="mex-boton" href={ajustes.downloadUrl} target="_blank" rel="noopener noreferrer">
              Descargar programa
            </a>
          </div>
        )}
        <div className="mex-dias" aria-live="polite">
          {contenido}
        </div>
      </main>
    </div>
  );
}
