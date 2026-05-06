const InstitucionesSection = () => {
  const instituciones = [
    { nombre: "ProDominicana", rol: "Exportación e Inversión", link: "https://prodominicana.gob.do" },
    { nombre: "Ministerio de la Mujer", rol: "Políticas de Género", link: "https://mujer.gob.do" },
    { nombre: "MICM", rol: "Industria, Comercio y MiPyMES", link: "https://micm.gob.do" },
    { nombre: "ADOEXPO", rol: "Sector Exportador", link: "https://adoexpo.org" },
    { nombre: "BHD", rol: "Banca con Enfoque de Mujer", link: "https://www.bhd.com.do" },
    { nombre: "DGCP", rol: "Compras Públicas", link: "https://www.dgcp.gob.do" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">Instituciones Aliadas</h2>
        <p className="text-gray-500 mt-2 text-lg">Entidades que impulsan el desarrollo de la mujer exportadora en RD.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instituciones.map((inst, idx) => (
          <a key={idx} href={inst.link} target="_blank" rel="noopener noreferrer" 
             className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-blue-400 transition-all flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {inst.nombre.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{inst.nombre}</h3>
              <p className="text-sm text-gray-500">{inst.rol}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default InstitucionesSection;