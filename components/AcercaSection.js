const AcercaSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400 rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Impacto Visual */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest mb-6">
                Sobre nosotros
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                Impulsando el <span className="text-blue-600">talento femenino</span> hacia el mundo.
              </h2>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Este repositorio es la brújula estratégica para la mujer empresaria dominicana, conectando el potencial local con las oportunidades globales.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                <span className="text-2xl">🇩🇴</span>
                <span className="font-bold text-gray-700">ProDominicana</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                <span className="text-2xl">🌍</span>
                <span className="font-bold text-gray-700">ICR Facility</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Misión */}
          <div className="relative">
            {/* Tarjeta Flotante Superior */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 relative z-20">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Empoderar a la mujer empresaria dominicana mediante el conocimiento técnico, la conexión con instituciones clave y una ruta clara hacia la internacionalización.
              </p>
              
              <hr className="my-8 border-gray-100" />
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Datos estratégicos recopilados por Catalina Gutiérrez.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Cierre de brechas de información institucional.</p>
                </div>
              </div>
            </div>
            
            {/* Decoración detrás de la tarjeta */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-50 rounded-[2.5rem] -z-10 border border-blue-100/50"></div>
          </div>

        </div>
      </div>
    </section>
  );
};