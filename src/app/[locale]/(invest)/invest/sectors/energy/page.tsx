import React from "react";
import SectorPage from "@/components/invest/sectorPage";

export default function Page() {
  const EnergySector = {
    name: "Energía Renovable",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image:
      "https://images.pexels.com/photos/6876534/pexels-photo-6876534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "/svg/invest/energyIcon.svg",
    subSectors: [
      {
        name: "Energía Solar",
        icon: "/svg/invest/energyIcon.svg",
      },
      {
        name: "Energía eólica",
        icon: "/svg/invest/energyIcon.svg",
      },
      {
        name: "Energía geotérmica",
        icon: "/svg/invest/energyIcon.svg",
      },
      {
        name: "Biomasa",
        icon: "/svg/invest/energyIcon.svg",
      },
    ],
    incentives: [
      {
        name: "Exención de impuestos del 100% sobre:",
        list: [
          "Impuesto sobre la renta",
          "Permisos de construcción",
          "Compra de terrenos",
          "Equipos, materiales y mobiliario necesarios para las primeras instalaciones y el inicio de operaciones",
        ],
      },
    ],
    contact: [
      {
        name: "Comisión Nacional de Energía (CNE)",
        link: "https://www.cne.gob.do",
        logo: "/svg/invest/contact/cne.svg",
      },
      {
        name: "Asociación Dominicana de la Industria Eléctrica (ADIE)",
        link: "https://www.adie.org.do",
        logo: "/svg/invest/contact/adie.svg",
      },
    ],
    procedures: [
      {
        name: "Nombre Comercial (ONAPI)",
        deliverable: "Registro de nombre comercial",
        link: "https://www.onapi.gov.do/index.php/servicios/signos-distintivos/nombres-comerciales/item/564-registro-de-nombre-comercial-2023",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Pago Impuesto Constitución (DGII)",
        deliverable: "Certificación pago de impuesto",
        link: "https://dgii.gov.do/herramientas/calculadoras/Paginas/Constitucion-de-Companias.aspx",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Registro de Compañía (Cámara de Comercio correspondiente)",
        deliverable: "Registro mercantil",
        link: "https://www.fedocamaras.do",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Registro Nacional de Contribuyente (RNC)",
        deliverable: "Certificado Acta RNC",
        link: "https://dgii.gov.do/cicloContribuyente/registroRNC/Paginas/default.aspx",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Registro de empleador en la Tesorería de la Seguridad Social",
        deliverable: "Certificación TSS",
        link: "https://tss.gob.do/registro-empleadores.html",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "No Objeción a Uso de Suelo (Ayuntamiento)",
        deliverable: "Carta de no objeción",
        link: "",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Análisis Previo (MITUR)",
        deliverable: "Evaluación de la formulación del proyecto",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/377",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Resolución de No Objeción Uso de Suelo (MITUR)",
        deliverable: "Resolución de no objeción",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/11",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "No Objeción anteproyecto (Ayuntamiento)",
        deliverable: "Certificación de anteproyecto",
        link: "",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Parametro de Diseño (MITUR) - Opcional",
        deliverable: "Documento con recomendaciones aplicables al proyecto",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/376",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Autorización Ambiental (Ministerio de Medioambiente)",
        deliverable: "Resolución de permiso ambiental",
        link: "https://ambiente.gob.do/servicios/autorizaciones-ambientales-en-linea/",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Licencia de Construcción (Ministerio de Vivienda, Hábitat, y Edificaciones)",
        deliverable: "Licencia de construcción",
        link: "https://www.vuc.gob.do/home",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Clasificación Provisional (CONFOTUR)",
        deliverable: "Resolución de clasificación provisional",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/369",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Análisis Costo-Beneficio (Ministerio de Hacienda)",
        deliverable: "Análisis costo beneficio",
        link: "",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Clasificación Definitiva (CONFOTUR)",
        deliverable: "Resolución de clasificación definitiva",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/35",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Solicitud de Exoneración de Importación de Bienes de Construcción (MITUR)",
        deliverable: "Carta aprobación de exoneración",
        link: "https://servicios.mitur.gob.do/app/serviceDescription/380",
        icon: "/svg/invest/reasonIcon1.svg",
      },
      {
        name: "Solicitud de exoneración de impuestos (Ministerio de Hacienda)",
        deliverable: "Carta de exoneración de impuesto",
        link: "",
        icon: "/svg/invest/reasonIcon1.svg",
      },
    ],
  };
  return SectorPage(EnergySector);
}
