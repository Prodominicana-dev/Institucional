"use client";
import React, { use } from "react";
import SectorPage from "@/components/invest/sectorPage";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("invest.sectors.list.0");
  const p = useTranslations("invest.sectors");
  const TourismSector = {
    name: t("name"),
    desc: t("description"),
    image:
      "https://images.pexels.com/photos/6876534/pexels-photo-6876534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    video: "/videos/invest/tourism.mp4",
    icon: "/svg/invest/sectors/tourismIcon.svg",
    subSectors: [
      {
        name: t("subsectors.0.name"),
        icon: "/svg/invest/subsectors/subsectorIcon.svg",
      },
      {
        name: t("subsectors.1.name"),
        icon: "/svg/invest/subsectors/subsectorIcon1.svg",
      },
      {
        name: t("subsectors.2.name"),
        icon: "/svg/invest/subsectors/subsectorIcon2.svg",
      },
      {
        name: t("subsectors.3.name"),
        icon: "/svg/invest/subsectors/subsectorIcon3.svg",
      },
      {
        name: t("subsectors.4.name"),
        icon: "/svg/invest/subsectors/subsectorIcon4.svg",
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
        name: "Ministerio de Turismo de la República Dominicana",
        link: "https://mitur.gob.do",
        logo: "/svg/logos/mitur.svg",
      },
      {
        name: "Asociación Nacional de Hoteles y Restaurantes",
        link: "https://www.asonahores.com",
        logo: "/svg/logos/asonahores.svg",
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
      {
        name: p("procedures.list.12.name"),
        deliverable: p("procedures.list.12.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/369",
        icon: "/svg/invest/procedures/procedureIcon10.svg",
      },
      {
        name: p("procedures.list.13.name"),
        deliverable: p("procedures.list.13.deliverable"),
        link: "",
        icon: "/svg/invest/procedures/procedureIcon5.svg",
      },
      {
        name: p("procedures.list.14.name"),
        deliverable: p("procedures.list.14.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/35",
        icon: "/svg/invest/procedures/procedureIcon11.svg",
      },
      {
        name: p("procedures.list.15.name"),
        deliverable: p("procedures.list.15.deliverable"),
        link: "https://servicios.mitur.gob.do/app/serviceDescription/380",
        icon: "/svg/invest/procedures/procedureIcon13.svg",
      },
      {
        name: p("procedures.list.16.name"),
        deliverable: p("procedures.list.16.deliverable"),
        link: "",
        icon: "/svg/invest/procedures/procedureIcon10.svg",
      },
    ],
  };
  return SectorPage(TourismSector);
}
