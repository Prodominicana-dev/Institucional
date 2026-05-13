"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import {
  RUTAS,
  recursos,
  TIPOS_RECURSO,
  NIVELES,
  PUBLICO_OBJETIVO,
  Recurso,
} from "@/data/mujeresExportadorasRecursos";

// Colores por ruta (sólidos, sin gradientes)
const RUTA_COLORS: Record<string, { primary: string; light: string; dark: string }> = {
  aprender: { primary: "#0891b2", light: "#cffafe", dark: "#164e63" },    // cyan
  impulsarte: { primary: "#ea580c", light: "#ffedd5", dark: "#9a3412" },  // orange
  exportar: { primary: "#059669", light: "#d1fae5", dark: "#064e3b" },    // emerald
  conectar: { primary: "#b91c1c", light: "#fee2e2", dark: "#7f1d1d" },    // red-700
};

// Componente de icono por ruta
function RutaIcon({ ruta, size = 32 }: { ruta: string; size?: number }) {
  const icons: Record<string, JSX.Element> = {
    aprender: <Icon icon="ph:book-open-bold" width={size} height={size} />,
    impulsarte: <Icon icon="ph:rocket-bold" width={size} height={size} />,
    exportar: <Icon icon="ph:globe-bold" width={size} height={size} />,
    conectar: <Icon icon="ph:users-three-bold" width={size} height={size} />,
  };
  return icons[ruta] || null;
}

export default function Page() {
  const [activeView, setActiveView] = useState<"home" | "recursos">("home");
  const [selectedRuta, setSelectedRuta] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const POR_PAGINA = 12;

  // Detectar scroll para mostrar botón de ir arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtrados = useMemo(() => {
    return recursos.filter((r) => {
      if (selectedRuta && r.ruta !== selectedRuta) return false;
      if (filtroTipo !== "Todos" && r.tipo !== filtroTipo) return false;
      if (filtroNivel !== "Todos" && r.nivel !== filtroNivel) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.titulo.toLowerCase().includes(q) ||
          r.descripcion.toLowerCase().includes(q) ||
          r.autor.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedRuta, filtroTipo, filtroNivel, search]);

  const paginados = filtrados.slice(0, pagina * POR_PAGINA);
  const hayMas = paginados.length < filtrados.length;

  const handleSelectRuta = (rutaId: string) => {
    setSelectedRuta(rutaId);
    setActiveView("recursos");
    setPagina(1);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedRuta(null);
    setFiltroTipo("Todos");
    setFiltroNivel("Todos");
    setPagina(1);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Header */}
      <Header activeView={activeView} setActiveView={setActiveView} />

      {activeView === "home" ? (
        <>
          {/* Hero Section */}
          <HeroSection onExplore={() => setActiveView("recursos")} />

          {/* Stats */}
          <StatsSection />

          {/* Rutas Section */}
          <RutasSection onSelectRuta={handleSelectRuta} />

          {/* Info Tabs */}
          <InfoSection />

          {/* CTA */}
          <CTASection onExplore={() => setActiveView("recursos")} />

          {/* Instituciones */}
          <InstitucionesSection />

          {/* Noticias */}
          <NoticiasSection />
        </>
      ) : (
        /* Recursos View */
        <RecursosView
          recursos={paginados}
          totalRecursos={filtrados.length}
          selectedRuta={selectedRuta}
          setSelectedRuta={setSelectedRuta}
          search={search}
          setSearch={setSearch}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
          filtroNivel={filtroNivel}
          setFiltroNivel={setFiltroNivel}
          hayMas={hayMas}
          onLoadMore={() => setPagina((p) => p + 1)}
          onReset={resetFilters}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Botón scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-red-700 hover:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          aria-label="Ir arriba"
        >
          <Icon icon="ph:arrow-up-bold" width={24} />
        </button>
      )}
    </div>
  );
}

function Header({
  activeView,
  setActiveView,
}: {
  activeView: "home" | "recursos";
  setActiveView: (v: "home" | "recursos") => void;
}) {
  return (
    <div className="w-full bg-blue-950">
      {/* Barra roja superior */}
      <div className="w-full h-1.5 bg-red-700" />

      <div className="w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center py-5 sm:py-6 gap-4 sm:gap-1">
        <Link href="/">
          <Image
            width={1980}
            height={1080}
            alt="Prodominicana"
            src="/prodominicanaFull.svg"
            className="w-36 sm:w-48 flex-shrink-0 brightness-0 invert"
          />
        </Link>

        <div className="sm:ml-auto flex flex-wrap justify-center gap-5 sm:gap-8 text-sm sm:text-base font-medium">
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("rutas")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-white hover:text-cyan-400 duration-200"
          >
            Las 4 Rutas
          </button>
          <button
            onClick={() => setActiveView("recursos")}
            className={`duration-200 ${activeView === "recursos" ? "text-cyan-400" : "text-white hover:text-cyan-400"}`}
          >
            Recursos
          </button>
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("instituciones")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-white hover:text-cyan-400 duration-200"
          >
            Instituciones
          </button>
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-white hover:text-cyan-400 duration-200"
          >
            Noticias
          </button>
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-white hover:text-cyan-400 duration-200"
          >
            Acerca del repositorio
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="w-full bg-blue-950 flex justify-center">
      <div className="w-11/12 max-w-7xl py-12 sm:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <Icon icon="ph:flag-banner-bold" className="text-red-500" width={16} />
          <span className="text-sm font-medium text-white/90">Repositorio Mujer Exportadora RD</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Tu camino hacia la{" "}
          <span className="text-cyan-400">exportación</span>{" "}
          comienza aquí
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mb-10">
          Descubre más de <span className="text-red-500 font-bold">300 recursos</span> organizados
          en 4 rutas diseñadas para impulsar a mujeres emprendedoras y exportadoras dominicanas.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={onExplore}
            placeholder=""
            className="bg-red-700 hover:bg-red-800 text-white font-bold text-base h-14 rounded-full normal-case px-8 shadow-lg"
          >
            Explorar recursos
          </Button>
          <Button
            onClick={() => document.getElementById("rutas")?.scrollIntoView({ behavior: "smooth" })}
            placeholder=""
            variant="outlined"
            className="border-2 border-white text-white font-bold text-base h-14 rounded-full normal-case px-8 hover:bg-white hover:text-blue-950 duration-300"
          >
            Ver las 4 rutas
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const stats = [
    { value: "300+", label: "Recursos disponibles", icon: "ph:files-bold" },
    { value: "80+", label: "Instituciones aliadas", icon: "ph:buildings-bold" },
    { value: "4", label: "Rutas de apoyo", icon: "ph:path-bold" },
    { value: "100%", label: "Gratuito", icon: "ph:gift-bold" },
  ];

  return (
    <div className="w-full bg-white border-y border-gray-200">
      <div className="w-11/12 max-w-7xl mx-auto py-8 flex flex-wrap justify-center gap-8 sm:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 px-4">
            <div className="w-12 h-12 rounded-xl bg-red-700 flex items-center justify-center shadow-md">
              <Icon icon={stat.icon} className="text-white" width={24} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-950">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RutasSection({ onSelectRuta }: { onSelectRuta: (id: string) => void }) {
  return (
    <section id="rutas" className="w-full bg-gray-50 py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4">Las 4 Rutas del Repositorio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada ruta agrupa recursos según la etapa en que se encuentra tu camino exportador.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RUTAS.map((ruta, index) => {
            const count = recursos.filter((r) => r.ruta === ruta.id).length;
            const colors = RUTA_COLORS[ruta.id];
            return (
              <button
                key={ruta.id}
                onClick={() => onSelectRuta(ruta.id)}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
              >
                {/* Barra superior con color de ruta */}
                <div className="h-1 w-full" style={{ backgroundColor: colors.primary }} />

                <div className="p-6">
                  {/* Icono */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <RutaIcon ruta={ruta.id} size={32} />
                  </div>

                  {/* Número de ruta */}
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: colors.primary }}
                  >
                    Ruta {index + 1}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    {ruta.nombre}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {ruta.descripcion}
                  </p>

                  {/* Footer de la tarjeta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span
                      className="text-sm font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: colors.light, color: colors.primary }}
                    >
                      {count} recursos
                    </span>
                    <div
                      className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                      style={{ color: colors.primary }}
                    >
                      <span>Explorar</span>
                      <Icon
                        icon="ph:arrow-right-bold"
                        className="group-hover:translate-x-1 transition-transform"
                        width={16}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  const [tab, setTab] = useState("about");
  return (
    <div className="w-full bg-white py-12">
      <div id="about" className="w-11/12 max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg">
        <Tabs value={tab} className="w-full">
          <TabsHeader
            placeholder=""
            className="bg-gray-100 h-14 sm:h-16 m-0 p-0 rounded-t-2xl"
            indicatorProps={{
              className: "bg-red-700 rounded-t-2xl !text-white",
            }}
          >
            <Tab
              key="about"
              value="about"
              placeholder=""
              className={`duration-500 text-sm sm:text-base ${tab === "about" ? "text-white" : "text-blue-950"}`}
              onClick={() => setTab("about")}
            >
              Sobre el Repositorio
            </Tab>
            <Tab
              key="how"
              value="how"
              placeholder=""
              className={`duration-500 text-sm sm:text-base ${tab === "how" ? "text-white" : "text-blue-950"}`}
              onClick={() => setTab("how")}
            >
              Cómo Funciona
            </Tab>
          </TabsHeader>

          <TabsBody className="w-full p-4 sm:p-8 rounded-b-2xl">
            <TabPanel key="about" value="about">
              <div className="space-y-4 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  Este repositorio centraliza <strong>servicios, herramientas e instrumentos de apoyo</strong> al
                  emprendimiento femenino y las exportaciones en la República Dominicana.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Basado en la investigación estratégica de <strong>Catalina Gutiérrez</strong> (ICR Facility / ProDominicana),
                  buscamos potenciar el talento local en los mercados internacionales.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-blue-950 text-white rounded-full text-sm font-medium">ProDominicana</span>
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">ICR Facility</span>
                  <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Ministerio de la Mujer</span>
                </div>
              </div>
            </TabPanel>
            <TabPanel key="how" value="how">
              <ul className="space-y-4">
                {[
                  "Explora las 4 rutas según tu etapa: Aprender, Impulsarte, Exportar o Conectar.",
                  "Filtra los recursos por tipo (cursos, documentos, herramientas), nivel y público objetivo.",
                  "Accede directamente a cada recurso: cursos, guías, servicios institucionales y más.",
                  "Todos los recursos son gratuitos y están verificados por ProDominicana.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 text-base sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

function CTASection({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="w-full bg-blue-950 py-16">
      <div className="flex flex-col xl:flex-row justify-center items-center font-bold gap-5 xl:gap-20 w-11/12 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl xl:text-4xl text-white xl:w-6/12 text-center leading-tight">
          Comienza tu camino hacia la exportación hoy
        </h2>
        <Button
          onClick={onExplore}
          placeholder=""
          className="bg-red-700 hover:bg-red-800 text-white font-bold text-base xl:text-lg h-14 sm:h-16 rounded-full normal-case px-8 shadow-lg"
        >
          Explorar todos los recursos
        </Button>
      </div>
    </div>
  );
}

function NoticiasSection() {
  const noticias = [
    {
      titulo: "ProDominicana impulsa exportaciones lideradas por mujeres",
      fecha: "15 Abril 2024",
      descripcion: "Nuevo programa de capacitación para emprendedoras dominicanas que buscan expandir sus negocios al mercado internacional.",
    },
    {
      titulo: "Alianza con el Ministerio de la Mujer para el emprendimiento femenino",
      fecha: "2 Marzo 2024",
      descripcion: "Se firma convenio para fortalecer el ecosistema de apoyo a mujeres empresarias en República Dominicana.",
    },
    {
      titulo: "Feria de Mujeres Exportadoras 2024",
      fecha: "20 Febrero 2024",
      descripcion: "Más de 100 emprendedoras participaron en el evento que conectó productos dominicanos con compradores internacionales.",
    },
  ];

  return (
    <section id="noticias" className="w-full bg-white py-12">
      <div className="w-11/12 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 text-center mb-8">Noticias</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-xs text-red-700 font-medium">{noticia.fecha}</span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 mb-3">{noticia.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{noticia.descripcion}</p>
              <button className="mt-4 text-cyan-600 text-sm font-medium hover:text-red-700 transition-colors">
                Leer más →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstitucionesSection() {
  const instituciones = [
    { nombre: "MICM", logo: "/logos-instituciones/MICM.jpeg" },
    { nombre: "INFOTEP", logo: "/logos-instituciones/INFOTEP.png" },
    { nombre: "BANDEX", logo: "/logos-instituciones/Bandex.jpeg" },
    { nombre: "Ministerio de la Mujer", logo: "/logos-instituciones/ministerio-mujer.jpeg" },
    { nombre: "DGCP", logo: "/logos-instituciones/DGCP.png" },
    { nombre: "Banco BHD", logo: "/logos-instituciones/BHD.jpeg" },
    { nombre: "Caribbean Export", logo: "/logos-instituciones/caribbean-export.jpeg" },
    { nombre: "SheTrades", logo: "/logos-instituciones/shetrades.png" },
  ];

  return (
    <section id="instituciones" className="w-full bg-gray-50 py-16 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 text-center mb-4">Instituciones Aliadas</h2>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto px-4">
        Más de 80 instituciones públicas y privadas comprometidas con el empoderamiento de mujeres exportadoras
      </p>

      {/* Carrusel infinito */}
      <div className="relative">
        {/* Gradientes de fade en los bordes */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Primera fila - movimiento hacia la izquierda */}
        <div className="flex animate-scroll-left mb-6">
          {[...instituciones, ...instituciones].map((inst, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-4"
            >
              <div className="group bg-white shadow-sm border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer hover:scale-105">
                <Image
                  src={inst.logo}
                  alt={inst.nombre}
                  width={192}
                  height={88}
                  className="object-contain w-[192px] h-[88px]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Segunda fila - movimiento hacia la derecha */}
        <div className="flex animate-scroll-right">
          {[...instituciones.slice().reverse(), ...instituciones.slice().reverse()].map((inst, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 mx-4"
            >
              <div className="group bg-white shadow-sm border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer hover:scale-105">
                <Image
                  src={inst.logo}
                  alt={inst.nombre}
                  width={192}
                  height={88}
                  className="object-contain w-[192px] h-[88px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contador */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center gap-3 bg-red-100 rounded-full px-6 py-3">
          <Icon icon="ph:buildings-bold" className="text-red-700" width={24} />
          <span className="text-red-700 font-semibold">80+ Instituciones comprometidas</span>
        </div>
      </div>
    </section>
  );
}

function RecursosView({
  recursos: recursosList,
  totalRecursos,
  selectedRuta,
  setSelectedRuta,
  search,
  setSearch,
  filtroTipo,
  setFiltroTipo,
  filtroNivel,
  setFiltroNivel,
  hayMas,
  onLoadMore,
  onReset,
}: {
  recursos: Recurso[];
  totalRecursos: number;
  selectedRuta: string | null;
  setSelectedRuta: (r: string | null) => void;
  search: string;
  setSearch: (s: string) => void;
  filtroTipo: string;
  setFiltroTipo: (t: string) => void;
  filtroNivel: string;
  setFiltroNivel: (n: string) => void;
  hayMas: boolean;
  onLoadMore: () => void;
  onReset: () => void;
}) {
  return (
    <section className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-14 px-4 bg-blue-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-cyan-200 font-medium mb-4 uppercase tracking-wider">
              {totalRecursos} recursos disponibles
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Explorar Recursos
            </h2>
            <p className="text-cyan-200 text-base max-w-xl mx-auto">
              Filtra por ruta, tipo o nivel para encontrar exactamente lo que necesitas.
            </p>
          </div>

          {/* Buscador */}
          <div className="relative max-w-xl mx-auto">
            <Icon icon="ph:magnifying-glass" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width={20} />
            <input
              type="text"
              placeholder="Buscar por título, autor o tema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Icon icon="ph:x-circle-fill" width={22} />
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
                {(selectedRuta || filtroTipo !== "Todos" || filtroNivel !== "Todos") && (
                  <button onClick={onReset} className="text-xs text-red-700 hover:underline">
                    Limpiar
                  </button>
                )}
              </div>

              {/* Ruta */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ruta</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedRuta(null)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      !selectedRuta ? "bg-blue-950 text-white font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Todas las rutas
                  </button>
                  {RUTAS.map((ruta) => {
                    const colors = RUTA_COLORS[ruta.id];
                    const isActive = selectedRuta === ruta.id;
                    return (
                      <button
                        key={ruta.id}
                        onClick={() => setSelectedRuta(ruta.id)}
                        className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                          isActive ? "font-semibold" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        style={isActive ? { background: colors.light, color: colors.primary } : {}}
                      >
                        {ruta.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nivel */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nivel</p>
                <div className="space-y-1">
                  {NIVELES.map((n) => (
                    <button
                      key={n}
                      onClick={() => setFiltroNivel(n)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        filtroNivel === n ? "bg-blue-950 text-white font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipo */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {TIPOS_RECURSO.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFiltroTipo(t)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        filtroTipo === t ? "bg-blue-950 text-white font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {t}
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
                <span className="font-semibold text-gray-800">{recursosList.length}</span> recursos encontrados
              </p>
              {selectedRuta && (
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: RUTA_COLORS[selectedRuta].light,
                    color: RUTA_COLORS[selectedRuta].primary,
                  }}
                >
                  Ruta: {RUTAS.find((r) => r.id === selectedRuta)?.nombre}
                </span>
              )}
            </div>

            {/* Grid */}
            {recursosList.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recursosList.map((recurso) => (
                    <RecursoCard key={recurso.id} recurso={recurso} />
                  ))}
                </div>

                {hayMas && (
                  <div className="text-center mt-8">
                    <button
                      onClick={onLoadMore}
                      className="px-8 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Cargar más ({totalRecursos - recursosList.length} restantes)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Icon icon="ph:magnifying-glass" className="mx-auto text-gray-300 mb-4" width={48} />
                <p className="text-gray-500 font-medium">No se encontraron recursos</p>
                <button onClick={onReset} className="mt-3 text-sm text-red-700 hover:underline">
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

// Badge de tipo con colores específicos
function TipoBadge({ tipo }: { tipo: string }) {
  const colors: Record<string, string> = {
    Documento: "bg-blue-50 text-blue-700",
    Página: "bg-green-50 text-green-700",
    Curso: "bg-purple-50 text-purple-700",
    Servicio: "bg-orange-50 text-orange-700",
    Dashboard: "bg-teal-50 text-teal-700",
    Herramienta: "bg-rose-50 text-rose-700",
    Video: "bg-red-50 text-red-700",
    Programa: "bg-indigo-50 text-indigo-700",
    Certificación: "bg-amber-50 text-amber-700",
    Premio: "bg-yellow-50 text-yellow-700",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[tipo] || "bg-gray-100 text-gray-600"}`}>
      {tipo}
    </span>
  );
}

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const colors = RUTA_COLORS[recurso.ruta];
  const rutaNombre = RUTAS.find((r) => r.id === recurso.ruta)?.nombre || "";

  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
    >
      {/* Ruta tag y Tipo */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: colors.light, color: colors.primary }}
        >
          {rutaNombre}
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
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: colors.light, color: colors.primary }}
          >
            {recurso.nivel}
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: colors.primary }}
          >
            <Icon icon="ph:arrow-square-out-bold" className="text-white" width={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-blue-950">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 xl:gap-28 py-10 border-t-2 border-red-700 text-white">
        <div className="flex flex-col gap-4">
          <Image
            width={1980}
            height={1080}
            alt="Prodominicana"
            src="/prodominicanaFull.svg"
            className="w-40 sm:w-56 brightness-0 invert"
          />
          <p className="text-white/70 text-sm max-w-xs">
            Repositorio de apoyo al ecosistema de emprendimiento de mujeres exportadoras.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-bold text-base">Contacto</h3>
          <p>
            Teléfono:{" "}
            <Link href="tel:+18095305505" className="hover:text-cyan-400 duration-200">
              +1 809-530-5505
            </Link>
          </p>
          <p>
            Correo:{" "}
            <Link href="mailto:servicios@prodominicana.gob.do" className="hover:text-cyan-400 duration-200">
              servicios@prodominicana.gob.do
            </Link>
          </p>
          <Link href="https://prodominicana.gob.do" target="_blank" className="font-bold hover:text-cyan-400 duration-200">
            www.prodominicana.gob.do
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-bold text-base">Síguenos</h3>
          <div className="flex gap-3">
            {[
              { icon: "mdi:instagram", href: "https://www.instagram.com/prodominicana" },
              { icon: "jam:facebook", href: "https://www.facebook.com/Prodominicana" },
              { icon: "bi:twitter-x", href: "https://x.com/prodominicana" },
              { icon: "mdi:youtube", href: "https://www.youtube.com/@ProDominicana" },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="_blank"
                className="rounded-full p-2 border-2 border-white/30 hover:border-red-700 hover:bg-red-700 group duration-200"
              >
                <Icon icon={social.icon} className="size-5 duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
