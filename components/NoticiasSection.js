const NoticiasSection = () => {
  // Estos son tus datos: fáciles de editar, agregar o borrar
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
            {/* Barra de color dinámica basada en la categoría */}
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
                Leer más 
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicador de "Más contenido pronto" de forma sutil */}
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