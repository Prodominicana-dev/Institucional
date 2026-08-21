"use client";
import "./hero-effects.css";
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

// Colores oficiales de marca Mujer Exporta + (paleta 2026)
const RUTA_COLORS: Record<string, { primary: string; light: string; icon: string; corner: string }> = {
  aprender: { primary: "#3D63D8", light: "#d8e0f7", icon: "/mujer-exporta/icon-aprender.png", corner: "/mujer-exporta/corner-aprender.png" }, // Azul rutas
  impulsar: { primary: "#F2665E", light: "#fce0df", icon: "/mujer-exporta/icon-impulsar.png", corner: "/mujer-exporta/corner-impulsar.png" }, // Coral
  exportar: { primary: "#2FB7C8", light: "#d5f1f4", icon: "/mujer-exporta/icon-exportar.png", corner: "/mujer-exporta/corner-exportar.png" }, // Teal
  conectar: { primary: "#F39A3D", light: "#fdebd8", icon: "/mujer-exporta/icon-conectar.png", corner: "/mujer-exporta/corner-conectar.png" }, // Naranja
};

// Icono de marca por ruta
function RutaIcon({ ruta, size = 32 }: { ruta: string; size?: number }) {
  const colors = RUTA_COLORS[ruta];
  if (!colors) return null;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image src={colors.icon} alt="" fill className="object-contain" />
    </div>
  );
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

          {/* Rutas Section */}
          <RutasSection onSelectRuta={handleSelectRuta} />

          {/* Info Tabs */}
          <InfoSection />

          {/* CTA */}
          <CTASection onExplore={() => setActiveView("recursos")} />

          {/* Instituciones (oculta a pedido del cliente) */}
          {/* <InstitucionesSection /> */}

          {/* Noticias */}
          <NoticiasSection />

          {/* Con el apoyo de */}
          <ApoyoSection />
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
          className="me-hover-scale fixed bottom-8 right-8 w-14 h-14 bg-me-coral hover:opacity-90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
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
    <div className="w-full bg-white">
      {/* Barra coral superior */}
      <div className="w-full h-1.5 bg-me-coral" />

      <div className="w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center py-5 sm:py-6 gap-4 sm:gap-6 border-b border-gray-100">
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link href="/">
            <Image
              width={1600}
              height={900}
              alt="Mujer Exporta +"
              src="/mujer-exporta/logo.png"
              className="w-32 sm:w-36 h-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Una Iniciativa de</span>
            <Image
              width={2343}
              height={893}
              alt="ProDominicana"
              src="/prodominicanaFull.svg"
              className="w-24 h-auto"
            />
          </div>
        </div>

        <div className="sm:ml-auto flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm sm:text-base font-medium">
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("rutas")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="flex items-center gap-1 text-me-navy hover:text-me-coral duration-200"
          >
            Las 4 Rutas
            <Icon icon="ph:caret-down-bold" width={14} />
          </button>
          <button
            onClick={() => setActiveView("recursos")}
            className={`duration-200 ${activeView === "recursos" ? "text-me-coral" : "text-me-navy hover:text-me-coral"}`}
          >
            Recursos
          </button>
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-me-navy hover:text-me-coral duration-200"
          >
            Noticias
          </button>
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="text-me-navy hover:text-me-coral duration-200"
          >
            Acerca de Mujer Exporta +
          </button>
        </div>

      </div>
    </div>
  );
}

function HeroSection({ onExplore }: { onExplore: () => void }) {
  const stats = [
    { value: "+300", label: "Recursos disponibles", icon: "ph:files-bold" },
    { value: "+80", label: "Instituciones aliadas", icon: "ph:buildings-bold" },
    { value: "4", label: "Rutas de apoyo", icon: "ph:path-bold" },
    { value: "100%", label: "Gratuito", icon: "ph:gift-bold" },
  ];

  return (
    <div className="w-full bg-me-marfil flex flex-col items-center overflow-hidden">
      <div className="w-11/12 max-w-7xl pt-12 sm:pt-16 pb-20 sm:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
        {/* Texto */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge visible solo en mobile: reemplaza al logo de ProDominicana del header, oculto ahí por espacio */}
          <div className="flex md:hidden items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-8">
            <Icon icon="ph:flag-banner-bold" className="text-me-coral" width={16} />
            <span className="text-sm font-medium text-me-navy">Una iniciativa de ProDominicana</span>
          </div>

          <h1 className="font-aeonik font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            <span className="text-me-coral">Plataforma</span>
            <br />
            <span className="text-me-coral">Digital</span> <span className="text-me-navy">de Recursos</span>
            <br />
            <span className="text-me-navy">y Oportunidades</span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-me-navy max-w-xl mb-10">
            Información útil para fortalecer tu empresa, prepararte para exportar y conectar con nuevos mercados.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button
              onClick={onExplore}
              placeholder=""
              className="flex items-center gap-2 bg-me-coral hover:opacity-90 text-white font-bold text-base h-14 rounded-2xl normal-case px-8 shadow-lg"
            >
              Encuentra tu ruta
              <Icon icon="ph:arrow-right-bold" width={18} />
            </Button>
            <Link
              href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=ghXqEGP41EuvCTx0XnNcBeN_mvpX-a9Jm2GG2D5wc1ZUOUlSMk9TOEtTTjExOUk2QkJVT0JPMFBKRi4u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-me-coral text-me-coral font-bold text-base h-14 rounded-2xl normal-case px-8 bg-white hover:bg-me-coral-pale duration-300"
            >
              Sumar iniciativa
              <Icon icon="ph:arrow-right-bold" width={18} />
            </Link>
          </div>
        </div>

        {/* Foto + formas decorativas */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80 lg:w-96 aspect-[4/5]">
            {/* Trazo outline, desplazado a la izquierda */}
            <Image
              src="/mujer-exporta/shape-outline.png"
              alt=""
              fill
              className="me-shape-outline object-contain opacity-80 z-0"
            />
            {/* Forma sólida detrás de la fotografía */}
            <Image
              src="/mujer-exporta/shape-fill.png"
              alt=""
              fill
              className="me-shape-fill object-contain z-0"
            />
            <Image
              src="/mujer-exporta/hero-photo.png"
              alt="Mujer emprendedora dominicana"
              fill
              className="me-hero-photo object-contain object-bottom relative z-10"
              priority
            />
          </div>
        </div>
      </div>

      {/* Barra de estadísticas superpuesta */}
      <div className="w-11/12 max-w-7xl -mt-20 sm:-mt-24 mb-2 relative z-20">
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 sm:py-8 px-4 sm:px-8 flex flex-col sm:flex-row sm:flex-wrap justify-center sm:divide-x sm:divide-gray-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-4 sm:py-0 px-0 sm:px-6 md:px-10 border-b sm:border-b-0 border-gray-200 last:border-b-0 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="w-12 h-12 rounded-full bg-me-marfil flex items-center justify-center shrink-0">
                <Icon icon={stat.icon} className="text-me-coral" width={22} />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-aeonik font-bold text-me-coral">{stat.value}</div>
                <div className="text-sm text-me-navy">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RutasSection({ onSelectRuta }: { onSelectRuta: (id: string) => void }) {
  return (
    <section id="rutas" className="w-full bg-me-marfil py-16 sm:py-20">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-me-coral-pale text-me-navy text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Las 4 Rutas
          </span>
          <h2 className="font-aeonik font-bold text-3xl sm:text-4xl text-me-navy mb-4">
            Encuentra <span className="text-me-coral">tu ruta</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora recursos según la necesidad o etapa en la que se encuentra tu empresa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RUTAS.map((ruta) => {
            const colors = RUTA_COLORS[ruta.id];
            return (
              <button
                key={ruta.id}
                onClick={() => onSelectRuta(ruta.id)}
                className="group bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 text-left overflow-hidden flex flex-col"
                style={{ borderColor: colors.light }}
              >
                {/* Imagen de marca (esquina de color) con el ícono encima */}
                <div className="relative pt-6 pl-6">
                  <div className="relative w-32 sm:w-36 aspect-[700/530]">
                    <Image src={colors.corner} alt="" fill className="object-contain object-left-top" />
                    <div className="me-group-hover-scale absolute top-4 left-3 duration-300">
                      <RutaIcon ruta={ruta.id} size={36} />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Título */}
                  <h3 className="font-aeonik text-xl font-bold text-me-navy mb-3">
                    {ruta.nombre}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                    {ruta.descripcion}
                  </p>

                  {/* Footer de la tarjeta */}
                  <div className="flex items-center pt-4 border-t border-gray-200">
                    <div
                      className="flex items-center gap-1 text-sm font-medium whitespace-nowrap group-hover:gap-2 transition-all"
                      style={{ color: colors.primary }}
                    >
                      <span>Hay una ruta para ti</span>
                      <Icon
                        icon="ph:arrow-right-bold"
                        className="me-group-hover-arrow"
                        width={16}
                      />
                    </div>
                  </div>
                </div>

                {/* Barra inferior de color */}
                <div className="h-2.5 w-full" style={{ backgroundColor: colors.primary }} />
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
              className: "bg-me-coral rounded-t-2xl !text-white",
            }}
          >
            <Tab
              key="about"
              value="about"
              placeholder=""
              className={`duration-500 text-sm sm:text-base ${tab === "about" ? "text-white" : "text-me-navy"}`}
              onClick={() => setTab("about")}
            >
              Sobre Mujer Exporta +
            </Tab>
            <Tab
              key="how"
              value="how"
              placeholder=""
              className={`duration-500 text-sm sm:text-base ${tab === "how" ? "text-white" : "text-me-navy"}`}
              onClick={() => setTab("how")}
            >
              Cómo Funciona
            </Tab>
            <Tab
              key="origen"
              value="origen"
              placeholder=""
              className={`duration-500 text-sm sm:text-base ${tab === "origen" ? "text-white" : "text-me-navy"}`}
              onClick={() => setTab("origen")}
            >
              Origen
            </Tab>
          </TabsHeader>

          <TabsBody className="w-full p-4 sm:p-8 rounded-b-2xl">
            <TabPanel key="about" value="about">
              <div className="space-y-4 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  <strong>Mujer Exporta +</strong> es un directorio que centraliza <strong>servicios, herramientas e instrumentos de apoyo</strong> al
                  emprendimiento femenino y las exportaciones en la República Dominicana.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Basado en la investigación estratégica de <strong>ProDominicana</strong>,
                  buscamos potenciar el talento local en los mercados internacionales.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-me-coral text-white rounded-full text-sm font-medium">ProDominicana</span>
                </div>
              </div>
            </TabPanel>
            <TabPanel key="how" value="how">
              <ul className="space-y-4">
                {[
                  "Explora las 4 rutas según tu etapa: Aprender, Impulsar, Exportar o Conectar.",
                  "Filtra los recursos por tipo (cursos, documentos, herramientas), nivel y público objetivo.",
                  "Accede directamente a cada recurso: cursos, guías, servicios institucionales y más.",
                  "Todos los recursos son gratuitos y están verificados por ProDominicana.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-me-coral flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 text-base sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel key="origen" value="origen">
              <div className="space-y-5 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  Esta iniciativa es impulsada por <strong>ProDominicana</strong>.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Surge de la necesidad identificada de fortalecer el ecosistema de apoyo al
                  <strong> emprendimiento femenino</strong> y facilitar el acceso de mujeres empresarias
                  dominicanas a los mercados internacionales, reduciendo las brechas de información y
                  conectando a las emprendedoras con los recursos disponibles.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-me-coral text-white rounded-full text-sm font-medium">ProDominicana</span>
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

function CTASection({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="w-full bg-me-coral py-16">
      <div className="flex flex-col xl:flex-row justify-center items-center font-aeonik font-bold gap-5 xl:gap-20 w-11/12 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl xl:text-4xl text-white xl:w-6/12 text-center leading-tight">
          Comienza tu camino hacia la exportación hoy
        </h2>
        <Button
          onClick={onExplore}
          placeholder=""
          className="bg-white hover:bg-me-marfil text-me-coral font-bold text-base xl:text-lg h-14 sm:h-16 rounded-2xl normal-case px-8 shadow-lg duration-200"
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
    <section id="noticias" className="w-full bg-me-marfil py-12">
      <div className="w-11/12 max-w-7xl mx-auto">
        <h2 className="font-aeonik text-2xl sm:text-3xl font-bold text-me-navy text-center mb-8">Noticias</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-xs text-me-coral font-medium">{noticia.fecha}</span>
              <h3 className="text-lg font-bold text-me-navy mt-2 mb-3">{noticia.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{noticia.descripcion}</p>
              <button className="mt-4 text-me-teal text-sm font-medium hover:text-me-coral transition-colors">
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
    <section id="instituciones" className="w-full bg-me-marfil py-16 overflow-hidden">
      <h2 className="font-aeonik text-2xl sm:text-3xl font-bold text-me-navy text-center mb-4">Instituciones Aliadas</h2>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto px-4">
        Más de 80 instituciones públicas y privadas comprometidas con el empoderamiento de mujeres exportadoras
      </p>

      {/* Carrusel infinito */}
      <div className="relative">
        {/* Gradientes de fade en los bordes */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-me-marfil to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-me-marfil to-transparent z-10 pointer-events-none" />

        {/* Primera fila - movimiento hacia la izquierda */}
        <div className="flex animate-scroll-left mb-6">
          {[...instituciones, ...instituciones].map((inst, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 mx-4"
            >
              <div className="me-hover-scale group bg-white shadow-sm border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer">
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
              <div className="me-hover-scale group bg-white shadow-sm border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer">
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
        <div className="flex items-center gap-3 bg-me-coral-pale rounded-full px-6 py-3">
          <Icon icon="ph:buildings-bold" className="text-me-coral" width={24} />
          <span className="text-me-coral font-semibold">+80 Instituciones comprometidas</span>
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
    <section className="w-full min-h-screen bg-me-marfil">
      {/* Header */}
      <div className="py-14 px-4 bg-me-coral">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs text-me-coral font-semibold mb-4 uppercase tracking-wider">
              {totalRecursos} recursos disponibles
            </span>
            <h2 className="font-aeonik text-3xl lg:text-4xl font-bold text-white mb-3">
              Explorar Recursos
            </h2>
            <div className="w-14 h-1 bg-white rounded-full mx-auto mb-4" />
            <p className="text-white/70 text-base max-w-xl mx-auto">
              Filtra por ruta, tipo o nivel para encontrar exactamente lo que necesitas.
            </p>
          </div>

          {/* Buscador */}
          <div className="relative max-w-xl mx-auto">
            <Icon icon="ph:magnifying-glass" className="me-center-y absolute left-4 text-gray-400" width={20} />
            <input
              type="text"
              placeholder="Buscar por título, autor o tema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-me-navy shadow-xl"
            />
            {search && (
              <button onClick={() => setSearch("")} className="me-center-y absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
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
                  <button onClick={onReset} className="text-xs text-me-coral hover:underline">
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
                      !selectedRuta ? "bg-me-coral text-white font-medium" : "text-gray-600 hover:bg-gray-50"
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
                        className={`w-full flex items-center gap-2 text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                          isActive ? "font-semibold" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        style={isActive ? { background: colors.light, color: colors.primary } : {}}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: colors.primary }}
                        />
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
                        filtroNivel === n ? "bg-me-coral text-white font-medium" : "text-gray-600 hover:bg-gray-50"
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
                        filtroTipo === t ? "bg-me-coral text-white font-medium" : "text-gray-600 hover:bg-gray-50"
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
                <button onClick={onReset} className="mt-3 text-sm text-me-coral hover:underline">
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
    Estudio: "bg-sky-50 text-sky-700",
    Guía: "bg-emerald-50 text-emerald-700",
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
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-me-coral transition-colors line-clamp-2">
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
            className="me-group-hover-scale w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: colors.primary }}
          >
            <Icon icon="ph:arrow-square-out-bold" className="text-white" width={14} />
          </div>
        </div>
      </div>
    </a>
  );
}

function ApoyoSection() {
  return (
    <section className="w-full bg-white border-t border-gray-200 py-14">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center">
        <h2 className="text-lg sm:text-2xl text-me-navy">
          Con el apoyo de
        </h2>
        <Image
          src="/images/instituciones/union-europea.svg"
          alt="Unión Europea"
          width={56}
          height={37}
        />
        <span
          className="font-semibold text-lg sm:text-2xl"
          style={{ color: "#003399" }}
        >
          Unión Europea
        </span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-me-coral">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 xl:gap-28 py-10 text-white">
        <div className="flex flex-col gap-4">
          <Image
            width={2343}
            height={893}
            alt="Prodominicana"
            src="/prodominicanaFull.svg"
            className="w-40 sm:w-56 h-auto brightness-0 invert"
          />
          <p className="text-white/70 text-sm max-w-xs">
            Directorio de recursos y oportunidades para mujeres emprendedoras y exportadoras.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-bold text-base">Contacto</h3>
          <p>
            Teléfono:{" "}
            <Link href="tel:+18095305505" className="hover:text-me-teal duration-200">
              +1 809-530-5505
            </Link>
          </p>
          <p>
            Correo:{" "}
            <Link href="mailto:servicios@prodominicana.gob.do" className="hover:text-me-teal duration-200">
              servicios@prodominicana.gob.do
            </Link>
          </p>
          <Link href="https://prodominicana.gob.do" target="_blank" className="font-bold hover:text-me-teal duration-200">
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
                className="rounded-full p-2 border-2 border-white/30 hover:border-me-navy hover:bg-me-navy group duration-200"
              >
                <Icon icon={social.icon} className="size-5 duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="w-11/12 max-w-7xl mx-auto py-4 border-t border-white/20">
        <p className="text-xs text-white/60 text-center leading-relaxed">
          Los enlaces y recursos compartidos en esta sección tienen fines informativos y de apoyo al ecosistema exportador.
          ProDominicana no se hace responsable del contenido, disponibilidad o políticas de plataformas y sitios web de terceros.
        </p>
      </div>
    </footer>
  );
}
