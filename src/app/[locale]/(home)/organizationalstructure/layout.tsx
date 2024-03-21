"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ directionName: string }>();
  const organazionalStructure = [
    {
      name: "Dirección Ejecutiva",
      members: [
        {
          name: "Angelina Biviana Riveiro Disla",
          role: "Director Ejecutivo",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD); Decreto núm. 329-20, Art. 10.",
          functions: [
            "Elaborar y someter a la consideracion reglamentos internos y generales de la institución, presentar las memorias y balance anuales.",
            "Representar legalmente al Centro de Exportación e Inversión de la República Dominicana (CEI-RD), ante terceros y en justicia, pudiendo en tal calidad, firmar validamente toda clase de contratos y documentos, salvo cuando estos representen comprornisos para el Gobierno Dominicano.",
            "Gestionar las asignaciones presupuestarias y otros recursos financieros necesarios para el funcionamiento de la institución.",
            "Crear y desarrollar mecanismos de coordinación, con instituciones y organismos tanto del sector público como privado, a nivel nacional e internacional, a los fines de mejorar y optimizar las actividades de promoción de exportaciones e inversiones.",
            "Supervisar la ejecución presupuestaria.",
            "Identificar y gestionar fondos que puedan ser utilizados para cubrir programas de interés para el desarrollo de las actividades de promoción de las exportaciones y la captación de inversión extranjera directa.",
            "Participar en actividades que propicien el desarrollo de nuevas oportunidades de financiamiento a los sectores productivos, actuales y de nuevo interés en el sector, de acuerdo a las oportunidades para la inversión extranjera.",
            "Elaborar y gestionar proyectos de alianzas estratégicas y cooperación internacional.",
            "Coordinar la elaboración de los informes técnicos sobre los avances, resultados y recomendaciones de la gestión de la Subdirección General sobre los proyectos de las actividades planificadas y ejecutadas.",
          ],
          image: "/images/AngelinaBivianaRiveiroDisla.jpg",
        },
        {
          name: "Vladimir Pimentel Florenzán",
          role: "Subdirector General",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD); Decreto núm. 356-20, Art. 1.",
          functions: [
            "Crear y desarrollar mecanismos de coordinación, con instituciones y organismos tanto del sector público como privado, a nivel nacional e internacional, a los fines de mejorar y optimizar las actividades de promoción de exportaciones e inversiones.",
            "Supervisar la ejecución presupuestaria.",
            "Identificar y gestionar fondos que puedan ser utilizados para cubrir programas de interés para el desarrollo de las actividades de promoción de las exportaciones y la captación de inversión extranjera directa.",
            "Participar en actividades que propicien el desarrollo de nuevas oportunidades de financiamiento a los sectores productivos, actuales y de nuevo interés en el sector, de acuerdo a las oportunidades para la inversión extranjera.",
            "Elaborar y gestionar proyectos de alianzas estratégicas y cooperación internacional.",
            "Coordinar la elaboración de los informes técnicos sobre los avances, resultados y recomendaciones de la gestión de la Subdirección General sobre los proyectos de las actividades planificadas y ejecutadas.",
          ],
          image: "/images/VladimirPimentelFlorenzan.jpg",
        },
        {
          name: "Mildred Walquidia Santos Santos",
          role: "Subdirectora Técnica",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD)",
          functions: [
            "Elaborar y aprobar los planes operativos anuales del área.",
            "Gestionar la mejora continua en materia de políticas, procesos y procedimientos institucionales.",
            "Coordinar la elaboración del Plan Estratégico de la Institución, velando por el cumplimiento del mismo.",
            "Velar por el cumplimiento del sistema de gestión de calidad.",
            "Elaborar propuestas de revisión de las estructuras organizativas y de reingeniería de procesos, incluyendo los componentes tecnológicos que correspondan.",
            "Validar y dar seguimiento a los proyectos de Cooperación Internacional que impactan a la Institución en conjunto con la Gerencia de Planificación y Gestión.",
            "Validar y evaluar los expedientes de las solicitudes de clasificación para los incentivos de la Ley 84-99 y el Decreto No. 334-07 que establece el reglamento para el comercio y la exportación de desperdicios de metales, chatarras y otros desechos.",
            "Aprobar las certificaciones del exportador y de Inversión Extranjera Directa (IED).",
            "Validar y aprobar las normativas internas relativas al funcionamiento de las actividades vinculadas a la Dirección de Negocios y la Dirección de Estudios Económicos y Estadística.",
            "Coordinar y evaluar la elaboración de los informes técnicos sobre los avances, resultados y recomendaciones de la gestión de la Subdirección Técnica sobre los proyectos de las actividades planificadas y ejecutadas.",
            "Aprobar la participación de la Institución en los espacios interinstitucionales referidos a actividades de la Dirección Estudios Económicos y Estadística.",
            "Representar al Director Ejecutivo por sustitución en caso de ausencia o por delegación en los eventos, reuniones y actividades requeridas para cumplir con los compromisos institucionales.",
          ],
          image: "/images/MildredWalquidiaSantosSantos.jpg",
        },
        {
          name: "Lina Pichardo",
          role: "Gerente del Despacho Ejecutivo",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD); Decreto núm. 356-20, Art. 1.",
          functions: [
            "Coordinar, gestionar y dar seguimiento a las actividades establecidas por la Dirección Ejecutiva.",
            "Supervisar las actividades y eventos en los cuales participe del (la) Director(a) Ejecutivo(a).",
            "Dar seguimiento a la coordinación de la logística de las reuniones del Consejo Directivo.",
            "Coordinar la participación del(la) Director(a) Ejecutivo(a) en los eventos nacionales e internacionales.",
            "Gestionar la agenda de las actividades y compromisos del (la) Director (a) Ejecutivo(a).",
            "Realizar el seguimiento a la documentación direccionada desde y hacia el Despacho.",
            "Solicitar la adquisición y administrar los presentes ofrecidos por el (la) Director(a) en sus visitas oficiales y a los visitantes que recibe en su Despacho.",
            "Dirigir, supervisar y evaluar la gestión del Despacho, dando seguimiento a las labores del equipo bajo su cargo.",
            "Acompañar eventualmente del (la) Director (a) en las visitas oficiales y reuniones de alto nivel que realice tanto en el país como en el extranjero.",
            "Supervisar las labores del equipo de Seguridad (Militares) y de la Oficina de Acceso de la Información (OAI).",
            "Realizar cualquier otra función afín o complementaria que le sea asignada por su superior inmediato.",
          ],
          image: "/images/LinaPichardo.jpg",
        },
      ],
    },
    {
      name: "Dirección de Innovación Estratégica",
      members: [
        {
          name: "Edgar Espinal Quezada",
          role: "Director de Innovación Estratégica",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD)",
          functions: [
            "Liderar el proceso de formulación de las estrategias, metas, productos e indicadores de gestión institucionales, cumpliendo con las normativas y regulaciones dictadas por los organismos estatales vinculados.",
            "Promover una cultura de innovación y orientación al logro de los objetivos institucionales.",
            "Presentar propuestas de proyectos de mejora para contribuir con el fortalecimiento institucional y la provisión de servicios a clientes externos e internos.",
            "Identificar y definir los procesos de la Institución, estableciendo mejoras continuas y controlando la matriz de riesgo y generando mayor eficiencia de la gestión.",
            "Monitorear el cumplimiento/desempeño de los planes, procesos e indicadores del sistema de gestión.",
            "Supervisar, analizar y comunicar a la Dirección Ejecutiva y a los incumbentes departamentales las métricas de ejecución para buscar oportunidades que mejoren el desempeño de la institución.",
            "Validar y aprobar las modificaciones presupuestarias que afecten la estructura programática de presupuesto y/o los productos definidos en el Plan Operativo.",
            "Participar y colaborar con las mesas e iniciativas interinstitucionales con otras dependencias del estado, según sea requerido y pertinente a la función.",
            "Realizar cualquier otra función afín o complementaria que le sea asignada por su superior inmediato.",
          ],
          image: "/images/EdgarEspinal.jpg",
        },
        {
          name: "Sorangel Díaz",
          role: "Gerente de Proyectos de Innovación",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Diseñar e implementar la metodología de Gestión de Proyectos, acorde a la naturaleza de la Institución y las buenas prácticas reconocidas.",
            "Identificar y/o plantear alternativas de innovación para el desarrollo institucional y para la mejora de procesos, productos y servicios.",
            "Velar por la inserción de los proyectos en los planes operativos de la Institución.",
            "Gestionar instrumentos y herramientas que faciliten el trabajo y simplifiquen los procesos.",
            "Elaborar planes de gestión, según lo amerite cada proyecto.",
            "Crear el portafolio de proyectos priorizados, alineados al Plan Estratégico Institucional.",
            "Gestionar los proyectos desde su planificación hasta el cierre en función de los planteamientos estratégicos.",
            "Manejar las herramientas, métodos, métricas y los cronogramas maestros del proyecto.",
            "Velar por la efectiva gestión del cronograma definido para cada proyecto, con el fin de que sean alcanzados los resultados establecidos en la programación de cada uno, de manera oportuna.",
            "Colaborar en la evaluación de potenciales proyectos, analizar su viabilidad y su conveniencia, según el enfoque estratégico de la Institución.",
            "Gestionar instrumentos y herramientas innovadoras que faciliten el trabajo y simplifiquen los procesos.",
            "Velar porque los procedimientos desarrollados dentro de los proyectos estén alineados con los objetivos estratégicos de la Institución.",
            "Asegurar la implementación de los proyectos en tiempo, alcance y presupuesto planificado, gestionando las desviaciones que puedan darse en estas o en las demás restricciones de la gestión de proyectos.",
            "Preparar informes sobre el impacto logrado en el cumplimiento de los proyectos establecidos.",
            "Comunicar a la alta gerencia los riesgos identificados en los diversos proyectos previo análisis de matriz de riesgo.",
            "Informar a todos los actores involucrados sobre los avances o retrasos.",
            "Analizar y comunicar a la alta gerencia las métricas de ejecución del portafolio de proyectos.",
            "Coordinar la elaboración y revisión de los manuales, políticas y procedimientos de la institución.",
            "Realizar cualquier otra función afín o complementaria que le sea asignada por su superior inmediato.",
          ],
          image: "/images/SorangelDiaz.jpg",
        },
      ],
    },
    {
      name: "Dirección de Relaciones Internacionales",
      members: [
        {
          name: "Maritza Isabel Bello Martínez",
          role: "Directora de Relaciones Internacionales",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Supervisar de forma directa las actividades y operaciones de los ejecutivos de la red internacional.",
            "Supervisar la red de representantes directos adscritos al MIREX y a ProDominicana; Servir de enlace entre la red y los demás equipos de la institución y gestionar las herramientas promocionales a utilizar por la red internacional.",
            "Supervisar la implementación del plan de promoción comercial de la red internacional alineado al plan estratégico institucional.",
            "Crear mecanismo de medición para la red internacional y supervisar la correcta actualización de los datos.",
            "Apoyar en la captación de potenciales compradores y potenciales inversionistas; Velar por el cumplimiento de la política de calidad y los procedimientos establecidos por ProDominicana.",
            "Presentar informes periódicos de resultados de desempeño del área.",
            "Trabajar de la mano con el Viceministerio de Asuntos Económicos y Cooperación Internacional del Ministerio de Relaciones Exteriores en los temas relacionados a los miembros de la Red Internacional pertenecientes al MIREX.",
            "Brindar apoyo logístico a las misiones diplomáticas y consulares para el adecuado cumplimiento de sus funciones de promoción de la oferta exportable y atracción de inversión.",
          ],
          image: "/images/MaritzaBelloMartinez.jpg",
        },
        {
          name: "Roselin Oneil Pimentel",
          role: "Gerente de Red Internacional",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Establecer relaciones interinstitucionales para contribuir con el desarrollo de los proyectos que inciden en el crecimiento y desarrollo del país.",
            "Recibir y canalizar informes elaborados por la dirección de inteligencia de mercados sobre las actividades económicas y comerciales en los países en que opera la red internacional, a fin de que estudien las oportunidades de negocios y la competitividad de la oferta exportable dominicana.",
            "Identificar oportunidades de mejora del sector exportador dominicano.",
            "Organizar conferencias de avanzado nivel a favor de la promoción del país.",
            "Asumir la representación técnica de la institución en los eventos privados y oficiales, relacionados directamente con el sector exportador.",
            "Brindar apoyo a las áreas de la dirección de exportación e inversión en la coordinación de misiones, ferias y eventos; Participar en los procesos de negociaciones comerciales y proyectos de avanzado interés para la institución.",
            "Coordinar con la elaboración y actualización del Plan de Promoción Comercial y dar seguimiento, el cual esté alineado al plan de trabajo de la institución de la mano con el Viceministerio de Asuntos Económicos y Cooperación Internacional del Ministerio de Relaciones Exteriores.",
          ],
          image: "/images/RoselinOneilPimentel.jpg",
        },
        {
          name: "Nelsy Patricia Peña",
          role: "Gerente de Cooperación Internacional",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Ejecutar el plan operativo anual de la gerencia, cumpliendo con los compromisos programados. Coordinar con las diferentes direcciones de la institución el proceso de identificación de proyectos con necesidades de cooperación financiera no reembolsable y técnico-científica a presentar ante los organismos cooperantes.",
            "Gestionar y participar en captación de asistencia técnica, proveniente de la cooperación nacional y multinacional, en las áreas de interés de la institución, así como realizar las actividades necesarias para la suscripción y ejecución de los convenios de cooperación.",
            "Asesorar en el proceso de formulación de documentos de asistencia técnica e infraestructura, conforme a lineamientos emitidos por los diferentes organismos cooperantes.",
            "Identificar fuentes de cooperación de organismos multilaterales.",
            "Servir de enlace entre el Viceministerio de Cooperación Internacional y ProDominicana para realizar gestiones de aprobación y seguimiento de proyectos de cooperación.",
            "Presentar a la Dirección Ejecutiva las solicitudes de cooperación técnico-financiera no reembolsable, para aprobación.",
            "Establecer contactos con cooperantes potenciales de la institución.",
            "Asistir a reuniones representando a la institución ante organismos nacionales e internacionales para la gestión de cooperación.",
          ],
          image: "/images/NelsyPatriciaPena.jpg",
        },
      ],
    },
    {
      name: "Dirección de Talento Humano y Servicios",
      members: [
        {
          name: "Astrid Díaz",
          role: "Directora del Talento Humano y Servicios",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Liderar el proceso de Planificación de Gestión del Talento Humano.",
            "Diseñar programas, estrategias, políticas y procedimientos que busquen desarrollar la calidad y eficiencia de los recursos humanos de la institución.",
            "Velar por la actualización de los manuales que administra la gerencia.",
            "Revisar la estructura salarial y diseñar propuestas del programa de incentivos y beneficios para el personal y velar por su cumplimiento.",
            "Supervisar, validar e implementar el proceso de rediseño de la estructura organizacional.",
            "Participar y supervisar en la selección y contratación del personal.",
            "Asesorar y ayudar a los directores y gerentes con la contratación y formación del personal.",
            "Revisar y validar la evaluación anual del desempeño a todo el personal, a los fines de fomentar la mejora de los colaboradores en el logro de los objetivos institucionales.",
            "Revisar y validar el plan semestral o anual de formación y desarrollo de la organización.",
          ],
          image: "/images/AstridDiaz.jpg",
        },
        {
          name: "Susana Emperatriz Antón Espinal",
          role: "Gerente de Formación y Desarrollo",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Dirigir el proceso de detección de necesidades de capacitación.",
            "Diseñar programas de formación que contribuyan con el desarrollo de las competencias de las empresas vinculadas a las actividades de exportación.",
            "Diseñar programas de formación que contribuyan con el desarrollo de las competencias de los colaboradores de ProDominicana.",
            "Planificar y evaluar las capacitaciones de los exportadores, los potenciales exportadores, las pymes y los relacionados al comercio internacional.",
            "Elaborar el plan anual de capacitación interna y externa.",
            "Elaborar el presupuesto anual de capacitación interna y externa.",
            "Revisar los acuerdos interinstitucionales donde interviene el tema de capacitación.",
            "Coordinar el trabajo de las actividades de capacitación en conjunto con otras instituciones.",
            "Dirigir y promover el programa institucional de desarrollo de la Cultura Exportadora.",
            "Coordinar y ejecutar el programa de Coaching Exportador.",
            "Gestionar el mejoramiento de la plataforma virtual de formación, de cara a las mejores prácticas.",
          ],
          image: "/images/SusanaEmperatrizAntonEspinal.jpg",
        },
      ],
    },
    {
      name: "Dirección Administrativa y Financiera",
      members: [
        {
          name: "Karina Marcelle Ortíz Cabral",
          role: "Directora Administrativa y Financiera",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Dirigir y supervisar la implementación de la estrategia institucional y de los planes operativos en las gerencias de apoyo garantizando la existencia de los controles adecuados para el manejo de los recursos.",
            "Revisar las propuestas de planes anuales de presupuesto, compras y contrataciones.",
            "Revisar la programación propuesta en los planes operativos de cada gerencia del área.",
            "Asegurar la implementación de procedimientos eficaces administrativos y financieros que permitan ejercer los controles necesarios y faciliten la ejecución de los procesos de la institución.",
            "Planificar y coordinar las actividades de sistematización y comunicación de la institución asegurando la adquisición, programación y mantenimiento adecuado de los equipos y/o aplicaciones que satisfagan los requerimientos de tecnología de la institución.",
            "Coordinar la relación operativa entre las gerencias a su cargo, entre sí y con el resto de la institución; Validar las emisiones de pagos y nóminas presentadas por la Gerencia de Administración y Finanzas.",
          ],
          image: "/images/KarinaMarcelleOrtizCabral.jpg",
        },
        {
          name: "Lina Ricart",
          role: "Gerente Administrativo",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Establecer controles eficientes sobre el proceso administrativo.",
            "Mantener informado al personal de la dependencia acerca de las políticas, normas y procedimientos y decisiones de carácter administrativo.",
            "Apoyo directo al departamento de compras en los procesos.",
            "Participar en la elaboración del presupuesto y distribución anual.",
            "Manejo del combustible a distribuir a los colaboradores de la institución.",
            "Colaboración con la elaboración del PACC de la institución.",
            "Apoyo en la ejecución de los fondos manejados por el PNUD mediante acuerdo entre instituciones.",
            "Garantizar los servicios, tanto de mensajería interna, como externa, asegurando y dando seguimiento a los procesos de recepción, control, distribución y archivo de la correspondencia y paquetería.",
            "Asegurar el correcto uso y custodia del archivo institucional de la correspondencia recibida.",
            "Planificar y dar seguimiento a los procesos de recepción y distribución del material gastable.",
          ],
          image: "/images/LinaRicart.jpg",
        },
        {
          name: "Dahiana Cordero",
          role: "Gerente Financiero",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Coordinar y elaborar los Planes anuales de Presupuesto de Compras y Contrataciones.",
            "Proponer y elaborar el Plan Operativo Anual del área, garantizando el control adecuado del manejo de los recursos financieros.",
            "Velar por el cumplimiento de las normativas impositivas y de registro contable exigidos por las leyes tributarias del país y por la Contraloría General de la República.",
            "Coordinar con la Dirección Ejecutiva y las Direcciones el establecimiento de prioridades en la distribución de los recursos financieros, materiales y de logística requeridos para cumplir cabalmente con los objetivos, metas y estrategias a desarrollar para el cumplimiento del plan estratégico del CeiRD.",
            "Velar que los registros y resultados de las operaciones contables realizadas, y la confección de los estados financieros, sean realizados correctamente a fin de recomendar medidas tendientes a optimizar resultados.",
            "Supervisar el proceso de emisión de pagos y de nóminas, garantizando el depósito oportuno de los mismos.",
            "Garantizar el debido control bancario de los recursos financieros de la institución mediante la correcta administración de las cuentas bancarias.",
          ],
          image: "/images/DahianaCordero.jpg",
        },
        {
          name: "Edwin Rafael Grullón Monzon",
          role: "Gerente de Servicios Generales",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Definir, conjuntamente con la Dirección Administrativa y Financiera, las prioridades en la distribución de los materiales, recursos logísticos y servicios requeridos para cumplir con los objetivos de la organización.",
            "Proponer y formular las políticas, normas y procedimientos de servicios generales y de apoyo logístico de las actividades de la institución.",
            "Velar y asegurar el buen estado y limpieza de las instalaciones, equipo y mobiliario de la institución.",
            "Velar y asegurar la ejecución del plan de limpieza preventivo y correctivo al mobiliario, equipo de oficina y vehículos de transporte.",
            "Asegurar el cumplimiento y respuesta oportuna a los requerimientos de servicios de transportación requeridos por las unidades organizativas de la institución.",
            "Velar por el correcto uso de los espacios de la institución para la realización de las actividades programadas.",
            "Asegurar y monitorear el apoyo a la logística de los diferentes programas, eventos y actividades de la institución.",
          ],
          image: "/images/EdwinRafaelGrullonMonzon.jpg",
        },
      ],
    },
    {
      name: "Dirección de Exportación",
      members: [
        {
          name: "Jaime Licairac",
          role: "Director de Exportación",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Planificar e implementar el plan de promoción institucional de exportación orientado a los clientes en los sectores económicos que presentan potencial de negocios en el país.",
            "Proveer la información necesaria para la elaboración del Plan Anual de Promoción.",
            "Potenciar el uso de herramientas que faciliten el servicio al cliente ofrecido en el área.",
            "Implementar las políticas internas de seguimiento y medición de resultados de los negocios captados a través de la Dirección de Exportación.",
          ],
          image: "/images/JaimeLicairac.jpg",
        },
        {
          name: "Segismundo Morey",
          role: "Gerente de Exportación",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Elaborar el plan anual de promoción de las exportaciones y calendario de eventos para presentación a la Dirección de Exportación.",
            "Supervisar y monitorear el cumplimiento del plan anual para la promoción de exportaciones.",
            "Velar por la satisfacción de los clientes a su cargo.",
            "Desarrollar estrategias para el incremento y diversificación de las exportaciones, identificando escenarios a nivel local e internacional en los cuales proyectar el potencial de negocios de la oferta exportable del país.",
            "Supervisar agendas de negocios y servir de ente facilitador entre el exportador y el sector público, sector privado y los compradores internacionales.",
            "Supervisar la ejecución de los eventos de promoción de las exportaciones.",
            "Asistir a los compradores internacionales para la realización de negocios con los exportadores locales.",
          ],
          image: "/images/SegismundoMorey.jpg",
        },
        {
          name: "Victor Encarnacion",
          role: "Gerente de Internacionalización de Pymes",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD); Decreto núm. 356-20, Art. 1.",
          functions: [
            "Elaborar los programas a desarrollar conjuntamente con los ejecutivos de la gerencia y otras unidades de la institución, que fomenten e impacten el desarrollo de las MiPymes potenciales exportadoras.",
            "Elaborar con la Dirección de Exportación y el personal de la gerencia el Plan de Trabajo Anual.",
            "Coordinar acciones para lograr el crecimiento, la competitividad y la productividad de las MiPymes.",
            "Propiciar la firma de acuerdos entre diversas instituciones y ProDominicana para aunar esfuerzos con miras a desarrollar programas para beneficio e incentivo de la internacionalización de las MiPymes.",
          ],
          image: "/images/VictorEncarnacion.jpg",
        },
        {
          name: "Francisco Peña",
          role: "Gerente Red Nacional",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Elaborar el plan anual de promoción de las exportaciones y calendario de eventos para presentación.",
            "Supervisar y monitorear el cumplimiento del plan anual de captación de prospectos.",
            "Coordinar los esfuerzos para la realización de una base de datos de prospectos de exportación a nivel nacional.",
            "Gestionar la realización de un censo nacional, por provincia y de acuerdo con los sectores productivos prioritarios.",
            "Desarrollar estrategias para el incremento y diversificación de las exportaciones, identificando escenarios a nivel local, en donde los prospectos puedan empezar a interactuar con el comercio internacional.",
            "Supervisar agendas de negocios y servir de ente facilitador entre el exportador y las demás instancias del ProDominicana.",
          ],
          image: "/images/FranciscoPena.jpg",
        },
      ],
    },
    {
      name: "Dirección de Inversión",
      members: [
        {
          name: "Marcial Smester",
          role: "Director de Inversión",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Planificar e implementar el plan de promoción de inversión institucional orientado a los clientes en los sectores económicos que presentan potencial de negocios en el país.",
            "Proveer la información necesaria para la elaboración del Plan Anual de Promoción.",
            "Potenciar los servicios ofrecidos para facilitar la atención a los clientes.",
            "Implementar las políticas internas de seguimiento y medición de resultados de los negocios captados a través de la Dirección de Inversión.",
            "Desarrollar, supervisar y evaluar al equipo técnico de la Dirección de Inversión, acorde al Plan de Promoción establecido.",
            "Crear sinergia con las instituciones del sector público y privado vinculadas al desarrollo de proyectos de inversión por tipo de cliente, tamaño, sector, producto y mercado.",
          ],
          image: "/images/MarcialSmester.jpg",
        },
        {
          name: "Filgia Domínguez",
          role: "Gerente de Servicios de Inversión",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Desarrollar estrategias para la atracción y captación de nuevos inversionistas, identificando escenarios a nivel local e internacional en los cuales proyectar el potencial del País en los sectores estratégicos.",
            "Preparar, coordinar y ejecutar agendas de negocios, y servir de ente facilitador entre el inversionista y el sector público y/o privado.",
            "Organizar y liderar eventos de promoción de potenciales inversionistas para el incremento de la IED.",
            "Gestionar la recepción de solicitudes correspondientes a su área y coordinar el procesamiento de estas, incluyendo las solicitudes de la Ventanilla Única de Inversión de acuerdo con el Decreto No. 626-12.",
          ],
          image: "/images/FilgiaDominguez.jpg",
        },
        {
          name: "Zanony Severino Normativa",
          role: "Gerente de Negocios de Inversión",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Elaborar el plan anual de atracción de inversión y el calendario de eventos para presentarlo a la Dirección Ejecutiva.",
            "Implementar y monitorear el cumplimiento del plan anual de atracción de inversión.",
            "Desarrollar estrategias para la atracción y captación de nuevos inversionistas, identificando escenarios a nivel local e internacional en los cuales proyectar el potencial de nuestro país en los sectores estratégicos.",
            "Preparar, coordinar y ejecutar agendas de negocios, servir como ente facilitador entre el inversionista y el sector público y/o privado.",
            "Organizar y liderar eventos de promoción de potenciales inversionistas para el incremento de la IED.",
            "Elaborar y mantener actualizada la carpeta de proyectos de inversión para presentarlo a la Dirección Ejecutiva.",
            "Llevar a cabo la labor de depuración de los clientes de la gerencia, conforme a los procedimientos aprobados para estos fines.",
          ],
          image: "/images/ZanonySeverinoNormativa.jpg",
        },
      ],
    },
    {
      name: "Dirección de Inteligencia de Mercados",
      members: [
        {
          name: "Carolina Pérez",
          role: "Directora de Inteligencia de Mercados",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Mantener actualizadas las informaciones sobre los procesos y documentos requeridos para exportar e invertir.",
            "Poner a disposición los productos y servicios de información relevante para acceso a mercados.",
            "Identificar oportunidades de negocios a partir del análisis comparado de regulaciones de los mercados.",
            "Participar en los comités, comisiones y otros órganos relacionados al desarrollo del sector exportador, políticas y normas de exportación e inversión y encadenamientos.",
            "Representar a la institución en los procesos de negociaciones sobre comercio e inversión en los que participa el país.",
            "Asesorar y asistir en el aprovechamiento de los acuerdos comerciales vigentes, suscritos por el país.",
            "Recomendar mejoras a políticas públicas para fortalecer el clima de negocios.",
            "Monitorear y proponer acciones derivadas de las actividades de los organismos internacionales y órganos a los que pertenece el país.",
            "Brindar seguimiento a temas y casos de solución de controversias Inversionista - Estado.",
          ],
          image: "/images/CarolinaPerez.jpg",
        },
        {
          name: "Emilio Conde",
          role: "Gerente de Políticas Económicas Comerciales",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Mantener actualizadas las informaciones sobre los procesos y documentos requeridos para exportar e invertir.",
            "Poner a disposición los productos y servicios de información relevante para acceso a mercados.",
            "Identificar oportunidades de negocios a partir del análisis comparado de regulaciones de los mercados.",
            "Participar en los comités, comisiones y otros órganos relacionados al desarrollo del sector exportador, políticas y normas de exportación e inversión y encadenamientos.",
            "Representar a la institución en los procesos de negociaciones sobre comercio e inversión en los que participa el país.",
            "Asesorar y asistir en el aprovechamiento de los acuerdos comerciales vigentes, suscritos por el país.",
            "Recomendar mejoras a políticas públicas para fortalecer el clima de negocios.",
            "Monitorear y proponer acciones derivadas de las actividades de los organismos internacionales y órganos a los que pertenece el país.",
            "Brindar seguimiento a temas y casos de solución de controversias Inversionista - Estado y Estado - Estado.",
          ],
          image: "/images/EmilioConde.jpg",
        },
      ],
    },
    {
      name: "Dirección de Marketing y Comunicación",
      members: [
        {
          name: "Katy Capriles",
          role: "Directora de Marketing y Comunicación",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD)",
          functions: [
            "Diseñar, planificar y aprobar la identidad corporativa, línea gráfica, campañas publicitarias y comunicacionales que contribuyan a elevar la imagen de la institución.",
            "Supervisar la elaboración del Plan de Marketing y Comunicación.",
            "Definir y establecer las estrategias de posicionamiento e imagen de la institución en los diferentes medios de comunicación.",
            "Aprobar las campañas (medios digitales/impresos, audiovisuales) institucionales a nivel interno y externo.",
            "Coordinar acciones de marketing para apoyar el desarrollo de la Marca País de la República Dominicana.",
            "Supervisar la producción audiovisual.",
            "Supervisión de la estrategia de marketing en redes sociales y marketing de contenidos.",
            "Supervisar el desarrollo de las ferias y eventos institucionales.",
          ],
          image: "/images/KatyCapriles.jpg",
        },
        {
          name: "Carmen Ortega",
          role: "Gerente de Eventos y Ferias",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD); Decreto núm. 356-20, Art. 1.",
          functions: [
            "Planificar, organizar, dirigir y supervisar los planes y programas de los eventos y ferias de la institución.",
            "Desarrollar un calendario de actividades, tanto para eventos internos como externos.",
            "Diseñar un presupuesto anual para ser presentado y validado por la Dirección Ejecutiva.",
            "Comunicar a todas las direcciones y/o departamentos implicados en las actividades, los requerimientos para que se puedan cumplir con las expectativas esperadas.",
            "Reportar necesidades de mantenimiento y reparación de los equipos y mobiliarios necesarios para la ejecución de actividades.",
            "Tener control de los activos de la Institución, utilizados para las labores de promoción y eventos, en conjunto con el departamento correspondiente.",
          ],
          image: "/images/CarmenOrtega.jpg",
        },
      ],
    },
    {
      name: "Consultoría Jurídica",
      members: [
        {
          name: "Anel Lluberes",
          role: "Consultora Jurídica",
          regulation:
            "Ley núm. ley 16-92, Código de trabajo; Ley núm. 98-03 que crea el Centro de Exportación e Inversión de la República Dominicana (CEI-RD).",
          functions: [
            "Realizar investigaciones y análisis en el orden jurídico, para resolver asuntos legales propios de la institución.",
            "Preparar, redactar, analizar y evaluar la documentación requerida por las diferentes instancias internas y externas.",
            "Elaborar contratos a ser suscritos por el representante de la institución con personas físicas o morales, redacción de leyes, decretos, reglamentos y llevar registro y control de los mismos.",
            "Intervenir en las reclamaciones y litigios que puedan afectar los intereses de la institución.",
          ],
          image: "/images/AnelLluberes.jpg",
        },
      ],
    },
  ];
  return (
    <div className="w-full bg-white flex flex-col items-center py-10">
      <div className="w-10/12 flex flex-col sm:flex-row justify-between gap-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-dark">
          Estructura Organizacional
        </h1>
        <Link
          href={
            "https://www.prodominicana.gob.do/Documentos/Estructura_Organica_de_la_Institucion_2023.pdf"
          }
          target="_blank"
          rel="noopener noreferrer"
          download
          className="p-3 rounded-lg border-2 text-center border-blue-dark bg-transparent hover:bg-blue-dark text-blue-dark hover:text-white duration-300 font-bold"
        >
          Descargar PDF
        </Link>
      </div>
      <div className="w-full py-10 flex flex-row justify-center">
        <div className="w-10/12 flex flex-col lg:flex-row justify-center sm:gap-10">
          <div className="w-full lg:w-3/12  flex justify-center">
            <div className="hidden lg:flex w-full h-full bg-white border-2 border-gray-300 flex-col justify-between gap-3 rounded-lg p-5">
              {organazionalStructure.map((item, index) => (
                <Link
                  href={`/organizationalstructure/${formatName(item.name)}`}
                  className={`${
                    params.directionName === formatName(item.name)
                      ? "text-blue-dark font-bold"
                      : "text-black font-medium"
                  }  text-lg hover:text-blue-dark`}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-9/12 text-black overflow-auto rounded-lg flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const formatName = (str: string) => {
  const removedAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return removedAccents.split(" ").join("_").toLowerCase();
};
