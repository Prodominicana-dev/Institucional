"use client";
import { useState } from 'react';
import { RUTAS, recursos } from '../data/recursos';

const ROUTE_ICONS = {
  aprender: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  impulsarte: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  exportar: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  conectar: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

function ResourceCard({ recurso, color }) {
  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-white"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: color + '15' }}
      >
        <svg className="w-4 h-4" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 leading-snug line-clamp-2">
          {recurso.titulo}
        </p>
        <p className="text-xs text-gray-500 mt-1">{recurso.autor} · {recurso.tipo}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: color + '15', color }}
          >
            {recurso.nivel}
          </span>
          {recurso.subtema && (
            <span className="text-xs text-gray-400 truncate">{recurso.subtema}</span>
          )}
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function RutasSection({ onVerRecursos }) {
  const [activeRuta, setActiveRuta] = useState(null);

  const rutaActiva = RUTAS.find(r => r.id === activeRuta);
  const recursosDeRuta = activeRuta
    ? recursos.filter(r => r.ruta === activeRuta).slice(0, 6)
    : [];

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header de sección */}
      <div
        className="py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #07112A 0%, #0f2a52 100%)' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-blue-200 font-medium mb-4 uppercase tracking-wider">
            Repositorio Mujer Exportadora
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Las 4 Rutas del Repositorio
          </h2>
          <p className="text-blue-200 text-base max-w-xl mx-auto">
            Cada ruta agrupa recursos según la etapa en que se encuentras tu camino exportador.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Grid de rutas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {RUTAS.map(ruta => {
            const count = recursos.filter(r => r.ruta === ruta.id).length;
            const isActive = activeRuta === ruta.id;
            return (
              <button
                key={ruta.id}
                onClick={() => setActiveRuta(isActive ? null : ruta.id)}
                className="group text-left p-6 rounded-2xl border-2 transition-all duration-200"
                style={{
                  borderColor: isActive ? ruta.color : '#e5e7eb',
                  background: isActive ? ruta.color : 'white',
                  boxShadow: isActive ? `0 8px 30px ${ruta.color}30` : '0 1px 4px rgba(0,0,0,0.06)',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : ruta.colorBg,
                    color: isActive ? 'white' : ruta.color,
                  }}
                >
                  {ROUTE_ICONS[ruta.id]}
                </div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: isActive ? 'white' : '#07112A' }}
                >
                  {ruta.nombre}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: isActive ? 'rgba(255,255,255,0.8)' : '#6b7280' }}
                >
                  {ruta.descripcion}
                </p>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : ruta.colorBg,
                    color: isActive ? 'white' : ruta.color,
                  }}
                >
                  {count} recursos
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel de recursos de la ruta seleccionada */}
        {rutaActiva && (
          <div
            className="rounded-2xl border p-6 mb-8"
            style={{ borderColor: rutaActiva.colorBorder, background: rutaActiva.colorBg }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: rutaActiva.color, color: 'white' }}
                >
                  {ROUTE_ICONS[rutaActiva.id]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{rutaActiva.nombre}</h3>
                  <p className="text-sm text-gray-500">Mostrando 6 de {recursos.filter(r => r.ruta === rutaActiva.id).length} recursos</p>
                </div>
              </div>
              <button
                onClick={() => onVerRecursos && onVerRecursos(rutaActiva.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: rutaActiva.color }}
              >
                Ver todos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {recursosDeRuta.map(r => (
                <ResourceCard key={r.id} recurso={r} color={rutaActiva.color} />
              ))}
            </div>
          </div>
        )}

        {/* CTA si no hay ruta seleccionada */}
        {!activeRuta && (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
            <p className="text-sm">Selecciona una ruta para explorar sus recursos</p>
          </div>
        )}
      </div>
    </section>
  );
}