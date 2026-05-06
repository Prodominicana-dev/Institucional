"use client";
import { RUTAS } from '../data/recursos'

const ROUTE_ICONS = {
  aprender: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  impulsarte: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  exportar: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  conectar: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

export default function HeroSection({ activeRuta, onRutaChange }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #07112A 0%, #0f2a52 50%, #0a1f40 100%)' }}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: '#d8e7d8' }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5" style={{ background: '#4ECDC4' }} />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-5" style={{ background: '#ffffff' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Hero Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gold font-medium mb-5">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Repositorio Mujer Exportadora
            </div>
            <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4">
              Rutas de apoyo para mujeres que emprenden y exportan
            </h1>
            <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-6 max-w-lg">
              Encuentra servicios, instrumentos y políticas que te acompañan en cada etapa de tu camino hacia la exportación.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onRutaChange(null)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: '#eff0f3', color: '#07112A' }}
              >
                ¿Cómo funciona?
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <span className="text-blue-200 text-sm">Más de 300 recursos disponibles</span>
            </div>
          </div>

          {/* Right: Route Cards */}
          <div>
            <p className="text-center text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider">
              Explora las 4 rutas del repositorio
            </p>
            <div className="grid grid-cols-2 gap-3">
              {RUTAS.map(ruta => {
                const isActive = activeRuta === ruta.id
                return (
                  <button
                    key={ruta.id}
                    onClick={() => onRutaChange(isActive ? null : ruta.id)}
                    className={`group p-5 rounded-xl border-2 text-left flex flex-col gap-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-white shadow-lg scale-[1.02]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                    }`}
                    style={isActive ? { borderColor: ruta.color } : {}}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: isActive ? ruta.color : ruta.colorBg + '33', color: isActive ? 'white' : ruta.color }}
                    >
                      {ROUTE_ICONS[ruta.id]}
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: isActive ? ruta.color : 'white' }}
                      >
                        {ruta.nombre}
                      </p>
                      <p className={`text-xs mt-0.5 leading-snug ${isActive ? 'text-gray-600' : 'text-blue-200'}`}>
                        {ruta.descripcion}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold mt-1 flex items-center gap-1 ${isActive ? '' : 'text-blue-300 group-hover:text-gold'}`}
                      style={isActive ? { color: ruta.color } : {}}
                    >
                      Ver ruta
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}