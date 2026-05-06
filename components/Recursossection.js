"use client";
import { useState, useMemo } from 'react';
import { RUTAS, recursos, TIPOS_RECURSO, NIVELES, PUBLICO_OBJETIVO } from '../data/recursos';

const RUTA_COLORS = Object.fromEntries(RUTAS.map(r => [r.id, r.color]));
const RUTA_BG = Object.fromEntries(RUTAS.map(r => [r.id, r.colorBg]));
const RUTA_NAMES = Object.fromEntries(RUTAS.map(r => [r.id, r.nombre]));

function TipoBadge({ tipo }) {
  const colors = {
    'Documento': 'bg-blue-50 text-blue-700',
    'Página': 'bg-green-50 text-green-700',
    'Curso': 'bg-purple-50 text-purple-700',
    'Servicio': 'bg-orange-50 text-orange-700',
    'Dashboard': 'bg-teal-50 text-teal-700',
    'Herramienta': 'bg-rose-50 text-rose-700',
    'Video': 'bg-red-50 text-red-700',
    'Programa': 'bg-indigo-50 text-indigo-700',
    'Certificación': 'bg-amber-50 text-amber-700',
    'Premio': 'bg-yellow-50 text-yellow-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[tipo] || 'bg-gray-100 text-gray-600'}`}>
      {tipo}
    </span>
  );
}

function RecursoCard({ recurso }) {
  const color = RUTA_COLORS[recurso.ruta] || '#07112A';
  const bg = RUTA_BG[recurso.ruta] || '#f9fafb';
  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
    >
      {/* Ruta tag */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: bg, color }}
        >
          {RUTA_NAMES[recurso.ruta]}
        </span>
        <TipoBadge tipo={recurso.tipo} />
      </div>

      {/* Título */}
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2">
        {recurso.titulo}
      </h3>

      {/* Descripción */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-3">
        {recurso.descripcion}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div>
          <p className="text-xs font-medium text-gray-700">{recurso.autor}</p>
          <p className="text-xs text-gray-400">{recurso.subtema}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: bg, color }}
          >
            {recurso.nivel}
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: color }}
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function RecursosSection({ initialRuta = null }) {
  const [search, setSearch] = useState('');
  const [filtroRuta, setFiltroRuta] = useState(initialRuta);
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [filtroPublico, setFiltroPublico] = useState('Todos');
  const [pagina, setPagina] = useState(1);
  const POR_PAGINA = 12;

  const filtrados = useMemo(() => {
    return recursos.filter(r => {
      if (filtroRuta && r.ruta !== filtroRuta) return false;
      if (filtroTipo !== 'Todos' && r.tipo !== filtroTipo) return false;
      if (filtroNivel !== 'Todos' && r.nivel !== filtroNivel) return false;
      if (filtroPublico !== 'Todos' && r.publicoObjetivo !== filtroPublico) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.titulo.toLowerCase().includes(q) ||
          r.descripcion.toLowerCase().includes(q) ||
          r.autor.toLowerCase().includes(q) ||
          (r.tags || []).some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [filtroRuta, filtroTipo, filtroNivel, filtroPublico, search]);

  const paginados = filtrados.slice(0, pagina * POR_PAGINA);
  const hayMas = paginados.length < filtrados.length;

  const resetFiltros = () => {
    setSearch('');
    setFiltroRuta(null);
    setFiltroTipo('Todos');
    setFiltroNivel('Todos');
    setFiltroPublico('Todos');
    setPagina(1);
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #07112A 0%, #0f2a52 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-blue-200 font-medium mb-4 uppercase tracking-wider">
              {recursos.length} recursos disponibles
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Explorar Recursos
            </h2>
            <p className="text-blue-200 text-base max-w-xl mx-auto">
              Filtra por ruta, tipo o nivel para encontrar exactamente lo que necesitas.
            </p>
          </div>

          {/* Buscador */}
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por título, autor o tema..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPagina(1); }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 text-sm">Filtros</h3>
                {(filtroRuta || filtroTipo !== 'Todos' || filtroNivel !== 'Todos' || filtroPublico !== 'Todos') && (
                  <button onClick={resetFiltros} className="text-xs text-blue-600 hover:underline">
                    Limpiar
                  </button>
                )}
              </div>

              {/* Ruta */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ruta</p>
                <div className="space-y-1">
                  <button
                    onClick={() => { setFiltroRuta(null); setPagina(1); }}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${!filtroRuta ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Todas las rutas
                  </button>
                  {RUTAS.map(ruta => (
                    <button
                      key={ruta.id}
                      onClick={() => { setFiltroRuta(ruta.id); setPagina(1); }}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${filtroRuta === ruta.id ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                      style={filtroRuta === ruta.id ? { background: ruta.colorBg, color: ruta.color } : {}}
                    >
                      {ruta.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nivel */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nivel</p>
                <div className="space-y-1">
                  {NIVELES.map(n => (
                    <button
                      key={n}
                      onClick={() => { setFiltroNivel(n); setPagina(1); }}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${filtroNivel === n ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipo */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {TIPOS_RECURSO.map(t => (
                    <button
                      key={t}
                      onClick={() => { setFiltroTipo(t); setPagina(1); }}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${filtroTipo === t ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Público */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Público</p>
                <div className="space-y-1">
                  {PUBLICO_OBJETIVO.map(p => (
                    <button
                      key={p}
                      onClick={() => { setFiltroPublico(p); setPagina(1); }}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${filtroPublico === p ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            {/* Resultados header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtrados.length}</span> recursos encontrados
              </p>
              {filtroRuta && (
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: RUTA_BG[filtroRuta], color: RUTA_COLORS[filtroRuta] }}
                >
                  Ruta: {RUTA_NAMES[filtroRuta]}
                </span>
              )}
            </div>

            {/* Grid */}
            {filtrados.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginados.map(r => <RecursoCard key={r.id} recurso={r} />)}
                </div>

                {hayMas && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setPagina(p => p + 1)}
                      className="px-8 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Cargar más ({filtrados.length - paginados.length} restantes)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 font-medium">No se encontraron recursos</p>
                <button onClick={resetFiltros} className="mt-3 text-sm text-blue-600 hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}