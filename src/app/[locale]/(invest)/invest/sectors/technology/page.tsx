"use client";
import React, { use } from "react";
import SectorPage from "@/components/invest/sectorPage";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("invest.sectors.list.2");
  const p = useTranslations("invest.sectors");
  const TourismSector = {
    name: t("name"),
    desc: t("description"),
    image:
      "https://images.pexels.com/photos/6876534/pexels-photo-6876534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    video: "/videos/invest/technology.mp4",
    icon: "/svg/invest/sectors/technologyIcon.svg",
    subSectors: [
      {
        name: t("subsectors.0.name"),
        icon: "/svg/invest/subsectors/subsectorIcon12.svg",
      },
      {
        name: t("subsectors.1.name"),
        icon: "/svg/invest/subsectors/subsectorIcon13.svg",
      },
      {
        name: t("subsectors.2.name"),
        icon: "/svg/invest/subsectors/subsectorIcon14.svg",
      },
    ],
    incentives: {
      title: t("incentives.title"),
      subtitle: t("incentives.subtitle"),
      list: [
        t("incentives.list.0.name"),
        t("incentives.list.1.name"),
        t("incentives.list.2.name"),
        t("incentives.list.3.name"),
      ],
    },

    relatedEntities: [
      {
        name: "OGTIC",
        link: "https://ogtic.gob.do",
        logo: "/svg/logos/ogtic.svg",
      },
      {
        name: "Clustersoft",
        link: "https://www.clustersoft.org.do",
        logo: "/svg/logos/clustersoft.svg",
      },
      {
        name: "ADOFINTECH",
        link: "https://www.adofintech.org",
        logo: "/svg/logos/adofintech.svg",
      },
      {
        name: "Cámara TIC",
        link: "https://camaratic.org.do/",
        logo: "/svg/logos/camaratic.svg",
      },
    ],
    procedures: [
      {
        name: p("procedures.list.0.name"),
        deliverable: p("procedures.list.0.deliverable"),
        link: "https://www.onapi.gov.do/index.php/servicios/signos-distintivos/nombres-comerciales/item/564-registro-de-nombre-comercial-2023",
        icon: "/svg/invest/procedures/procedureIcon.svg",
      },
      {
        name: p("procedures.list.1.name"),
        deliverable: p("procedures.list.1.deliverable"),
        link: "https://dgii.gov.do/herramientas/calculadoras/Paginas/Constitucion-de-Companias.aspx",
        icon: "/svg/invest/procedures/procedureIcon1.svg",
      },
      {
        name: p("procedures.list.2.name"),
        deliverable: p("procedures.list.2.deliverable"),
        link: "https://www.fedocamaras.do",
        icon: "/svg/invest/procedures/procedureIcon2.svg",
      },
      {
        name: p("procedures.list.3.name"),
        deliverable: p("procedures.list.3.deliverable"),
        link: "https://dgii.gov.do/cicloContribuyente/registroRNC/Paginas/default.aspx",
        icon: "/svg/invest/procedures/procedureIcon3.svg",
      },
      {
        name: p("procedures.list.4.name"),
        deliverable: p("procedures.list.4.deliverable"),
        link: "https://tss.gob.do/registro-empleadores.html",
        icon: "/svg/invest/procedures/procedureIcon4.svg",
      },
      {
        name: p("procedures.list.5.name"),
        deliverable: p("procedures.list.5.deliverable"),
        link: "",
        icon: "/svg/invest/procedures/procedureIcon2.svg",
      },
      {
        name: p("procedures.list.6.name"),
        deliverable: p("procedures.list.6.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/377",
        icon: "/svg/invest/procedures/procedureIcon12.svg",
      },
      {
        name: p("procedures.list.7.name"),
        deliverable: p("procedures.list.7.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/11",
        icon: "/svg/invest/procedures/procedureIcon7.svg",
      },
      {
        name: p("procedures.list.8.name"),
        deliverable: p("procedures.list.8.deliverable"),
        link: "",
        icon: "/svg/invest/procedures/procedureIcon2.svg",
      },
      {
        name: p("procedures.list.9.name"),
        deliverable: p("procedures.list.9.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/376",
        icon: "/svg/invest/procedures/procedureIcon8.svg",
      },
      {
        name: p("procedures.list.10.name"),
        deliverable: p("procedures.list.10.deliverable"),
        link: "https://ambiente.gob.do/servicios/autorizaciones-ambientales-en-linea/",
        icon: "/svg/invest/procedures/procedureIcon6.svg",
      },
      {
        name: p("procedures.list.11.name"),
        deliverable: p("procedures.list.11.deliverable"),
        link: "https://www.vuc.gob.do/home",
        icon: "/svg/invest/procedures/procedureIcon9.svg",
      },
    ],
  };
  return SectorPage(TourismSector);
}
