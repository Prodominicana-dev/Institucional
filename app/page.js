"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import RecursosSection from "../components/Recursossection";
import RutasSection from "../components/Rutassection";
import InstitucionesSection from "../components/InstitucionesSection"; 

// --- COMPONENTES AUXILIARES ---

const NoticiasSection = () => {
  const noticias = [
    {
      titulo: "Lanzamiento de la 6ta Edición: Mujeres en Exportación",
      fecha: "Septiembre 2025",
      categoria: "Evento",
      resumen: "ProDominicana presenta los resultados del último estudio sobre la participación femenina en los mercados internacionales.",
      color: "from-blue-600 to-indigo-500"
    },
    {
      titulo: "Nuevas facilidades para MiPyMES Mujer",
      fecha: "Agosto 2025",
      categoria: "Normativa",
      resumen: "La DGCP anuncia simplificación de procesos para la certificación que otorga el 20% de compras públicas.",
      color: "from-emerald-500 to-teal-400"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-[0.2em]">
            Actualidad
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Noticias y <span className="text-blue-600">Eventos clave</span>
          </h2>
        </div>
        <p className="text-gray-500 font-medium md:max-w-xs">
          Mantente al tanto de ferias, capacitaciones y nuevas normativas del ecosistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {noticias.map((noticia, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`h-2 bg-gradient-to-r ${noticia.color}`}></div>
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black px-3 py-1 bg-gray-900 text-white rounded-lg uppercase tracking-widest">
                  {noticia.categoria}
                </span>
                <span className="text-sm font-bold text-gray-400">{noticia.fecha}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {noticia.titulo}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {noticia.resumen}
              </p>
              <button className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-wider group/btn">
                Leer más <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 border-dashed">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">
            Próximamente más novedades
          </p>
        </div>
      </div>
    </section>
  );
};

const AcercaSection = () => (
  <section className="relative overflow-hidden bg-white py-16 md:py-24">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px] opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400 rounded-full blur-[120px] opacity-10"></div>
    </div>

    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8 text-left">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              Sobre el Repositorio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Impulsando el <span className="text-blue-600">talento femenino</span> dominicano.
            </h2>
          </div>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              Este repositorio centraliza servicios, herramientas e instrumentos de apoyo al emprendimiento femenino y las exportaciones en la República Dominicana.
            </p>
            <p className="text-base italic">
              Basado en la investigación estratégica de <strong>Catalina Gutiérrez</strong> (ICR Facility / ProDominicana), buscamos potenciar el talento local en los mercados internacionales.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
              <span className="text-2xl text-gray-700 font-bold">🇩🇴 ProDominicana</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
              <span className="text-2xl text-gray-700 font-bold">🌍 ICR Facility</span>
            </div>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 relative z-20">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Empoderar a la mujer empresaria mediante el conocimiento técnico, la conexión institucional y una ruta clara hacia la internacionalización.
            </p>
            <div className="space-y-4 border-t border-gray-100 pt-8">
              {[
                "Datos estratégicos por Catalina Gutiérrez.",
                "Cierre de brechas de información.",
                "Acceso directo a instrumentos de apoyo."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-green-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-50 rounded-[2.5rem] -z-10 border border-blue-100/50"></div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">R</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Repositorio RD</span>
        </div>
        <p className="text-gray-400 text-sm">© 2024 ProDominicana. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const [activeRuta, setActiveRuta] = useState(null);
  const [activePage, setActivePage] = useState("inicio");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setActiveRuta(null); 
  };

  const handleRutaSelection = (rutaId) => {
    setActiveRuta(rutaId);
    setActivePage("recursos");
  };

  return (
    <>
      <Header activePage={activePage} onNavClick={handleNavClick} />
      <main className="min-h-screen bg-white">
        {activePage === "inicio" && (
          <HeroSection onRutaChange={handleRutaSelection} />
        )}
        {activePage === "recursos" && (
          <RecursosSection initialRuta={activeRuta} />
        )}
        {activePage === "rutas" && (
          <RutasSection onRutaChange={(page, rutaId) => {
            setActivePage(page);
            setActiveRuta(rutaId);
          }} />
        )}
        {activePage === "instituciones" && <InstitucionesSection />}
        {activePage === "noticias" && <NoticiasSection />}
        {activePage === "acerca" && <AcercaSection />}
      </main>
      <Footer />
    </>
  );
}