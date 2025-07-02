"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { fetchTasksData } from "@/services/monday/service";
import { ScaleLoader } from "react-spinners";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

export default function Page() {
  const institutions = [
    {
      name: "Ministerio de Industria, Comercio y Mipymes",
      logo: "/svg/logos/micm.svg",
      link: "https://www.micm.gob.do/",
    },
    {
      name: "Ministerio de Agricultura",
      logo: "/svg/logos/agricultura.svg",
      link: "https://agricultura.gob.do/",
    },
    {
      name: "Dirección General de Aduanas",
      logo: "/svg/logos/dga.svg",
      link: "https://www.aduanas.gob.do/",
    },
    {
      name: "Ministerio de Educación Superior, Ciencia y Tecnología",
      logo: "/svg/logos/mescyt.svg",
      link: "https://mescyt.gob.do/",
    },
    {
      name: "Banco de las Exportaciones",
      logo: "/svg/logos/bandex.svg",
      link: "https://bandex.com.do/",
    },
    {
      name: "Ministerio de Turismo",
      logo: "/svg/logos/mitur.svg",
      link: "https://mitur.gob.do/",
    },
    {
      name: "Ministerio de Relaciones Exteriores",
      logo: "/svg/logos/mirex.svg",
      link: "https://mirex.gob.do/",
    },
    {
      name: "Consejo Nacional de Competitividad",
      logo: "/svg/logos/cnc.svg",
      link: "https://cnc.gob.do/",
    },
    {
      name: "Ministerio de Salud Pública y Asistencia Social",
      logo: "/svg/logos/salud.svg",
      link: "https://msp.gob.do/",
    },
    {
      name: "Instituto Dominicano de las Telecomunicaciones",
      logo: "/svg/logos/indotel.svg",
      link: "https://indotel.gob.do/",
    },
    {
      name: "Centro de Desarrollo y Competitividad Industrial (Proindustria)",
      logo: "/svg/logos/proindustria.svg",
      link: "https://proindustria.gob.do/",
    },
    {
      name: "Instituto Dominicano de la Calidad",
      logo: "/svg/logos/indocal.svg",
      link: "https://indocal.gob.do/",
    },
    {
      name: "Ministerio de Hacienda",
      logo: "/svg/logos/hacienda.svg",
      link: "https://hacienda.gob.do/",
    },
    {
      name: "Superintendencia de Bancos",
      logo: "/svg/logos/sb.svg",
      link: "https://sb.gob.do/",
    },
    {
      name: "Oficina Nacional de Estadísticas",
      logo: "/svg/logos/one.svg",
      link: "https://one.gob.do/",
    },
    {
      name: "Instituto de Innovación en Biotecnología e Industria (IIBI)",
      logo: "/svg/logos/iibi.svg",
      link: "https://iibi.gob.do/",
    },
    {
      name: "Ministerio de Planificación y Desarrollo",
      logo: "/svg/logos/mepyd.svg",
      link: "https://mepyd.gob.do/",
    },
    {
      name: "Banco Central de la República Dominicana",
      logo: "/svg/logos/bancocentral.svg",
      link: "https://www.bancentral.gov.do/",
    },
    {
      name: "Oficina Nacional de la Propiedad Intelectual",
      logo: "/svg/logos/onapi.svg",
      link: "https://onapi.gob.do/",
    },
    {
      name: "Dirección General de Impuestos Internos",
      logo: "/svg/logos/dgii.svg",
      link: "https://dgii.gov.do/",
    },
    {
      name: "Oficina Gubernamental de las Tecnologías de la Información y Comunicación",
      logo: "/svg/logos/ogtic.svg",
      link: "https://ogtic.gob.do/",
    },
    {
      name: "Instituto Nacional de Tránsito y Transporte Terrestre",
      logo: "/svg/logos/intrant.svg",
      link: "https://intrant.gob.do/",
    },
    {
      name: "Ministerio de Educación",
      logo: "/svg/logos/minerd.svg",
      link: "https://minerd.gob.do/",
    },
    {
      name: "Ministerio de Energía y Minas",
      logo: "/svg/logos/energia.svg",
      link: "https://mem.gob.do/",
    },
    {
      name: "Pro-Competencia",
      logo: "/svg/logos/procompetencia.svg",
      link: "https://procompetencia.gob.do/",
    },
    {
      name: "Ministerio de Obras Públicas y Comunicaciones",
      logo: "/svg/logos/mopc.svg",
      link: "https://www.mopc.gob.do/",
    },
    {
      name: "Instituto Postal Dominicano",
      logo: "/svg/logos/inposdom.svg",
      link: "https://inposdom.gob.do/",
    },
    {
      name: "Ministerio Administrativo de la Presidencia",
      logo: "/svg/logos/mapre.svg",
      link: "https://mapre.gob.do/",
    },
    {
      name: "Dirección General de Cine",
      logo: "/svg/logos/dgcine.svg",
      link: "https://dgcine.gob.do/",
    },
    {
      name: "Ministerio de la Presidencia (MIPRE)",
      logo: "/svg/logos/minpre.svg",
      link: "https://minpre.gob.do/",
    },
    {
      name: "Superintendencia de Seguros",
      logo: "/svg/logos/sis.svg",
      link: "https://sis.gob.do/",
    },
    {
      name: "Cámara de Comercio de Santo Domingo",
      logo: "/svg/logos/camarasd.svg",
      link: "https://www.camarasantodomingo.do/",
    },
    {
      name: "Superintendencia de Valores",
      logo: "/svg/logos/simv.svg",
      link: "https://simv.gob.do/",
    },
    {
      name: "Banco Agrícola",
      logo: "/svg/logos/bancoagricola.svg",
      link: "https://bancoagricola.gob.do/",
    },
  ];
  const date = new Date();
  const year = date.getFullYear();
  const [tasks, setTasks] = useState<any[]>([]);
  const [generalProgress, setGeneralProgress] = useState(0);
  const [progressByPilar, setProgressByPilar] = useState<
    { pilar: string; percentage: number }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTasksData();
      setTasks(data);

      const progress = calculateProgressByPilar(data);
      const generalProgress = calculateGeneralProgress(data);

      setProgressByPilar(progress);
      setGeneralProgress(generalProgress);

      console.log("Progreso general:", generalProgress);
      console.log("Progreso por pilar:", progress);
    };
    loadData();
  }, []);

  function calculateGeneralProgress(data: any[]) {
    let total = 0;
    let completed = 0;

    data.forEach((item) => {
      item.subitems?.forEach((subitem: any) => {
        total++;
        const status = subitem.column_values?.find(
          (col: any) => col.id === "status"
        )?.text;
        if (status === "Listo") {
          completed++;
        }
      });
    });

    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }

  function calculateProgressByPilar(
    items: any[]
  ): { pilar: string; percentage: number }[] {
    const pilars: Record<string, { total: number; completed: number }> = {};

    items.forEach((item: any) => {
      const pilarName = item.column_values[0]?.text || "Sin Pilar";

      if (!pilars[pilarName]) {
        pilars[pilarName] = {
          total: 0,
          completed: 0,
        };
      }

      item.subitems.forEach((subitem: any) => {
        pilars[pilarName].total += 1;

        const status = subitem.column_values.find(
          (cv: any) => cv.id === "status"
        )?.text;
        if (status === "Listo") {
          pilars[pilarName].completed += 1;
        }
      });
    });

    return Object.entries(pilars).map(([pilar, { total, completed }]) => ({
      pilar,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }));
  }

  const gaugeData = {
    labels: ["Ejecución General", "En gestión"],
    datasets: [
      {
        data: [generalProgress, 100 - generalProgress],
        backgroundColor: ["#E0193A", "#ffffff"],
        borderWidth: 0,
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const gaugeOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed}%`,
        },
      },
      legend: {
        position: "bottom" as const,
        labels: { color: "#fff" },
      },
      datalabels: {
        display: true,
        color: (context: any) => {
          const bgColor = context.dataset.backgroundColor[context.dataIndex];
          return bgColor === "#ffffff" ? "#000000" : "#ffffff";
        },
        font: {
          weight: "bold" as const,
        },
        formatter: (value: number, context: any) => {
          return value > 0 ? `${value}%` : "";
        },
      },
    },
    cutout: "70%",
    rotation: -90,
    circumference: 180,
  };

  const pilarConfig: Record<string, { label: string; color: string }> = {
    "PILAR 1.": {
      label: "Oferta Exportable",
      color: "#3DA5D9",
    },
    "PILAR 2.": {
      label: "Promoción Internacional",
      color: "#F17021",
    },
    "PILAR 3.": {
      label: "Facilitación Exportadora",
      color: "#F2A900",
    },
    "PILAR 4.": {
      label: "Financiamiento Exportador",
      color: "#CA152B",
    },
    "PILAR 5.": {
      label: "Transversal Institucionalidad",
      color: "#8E44AD",
    },
  };

  const findPilarConfig = (name: string) => {
    const entry = Object.entries(pilarConfig).find(([key]) =>
      name.includes(key)
    );
    return entry?.[1] || { label: name, color: "#CCCCCC" };
  };

  const bars = progressByPilar.map(({ pilar, percentage }) => {
    const config = findPilarConfig(pilar);
    return {
      label: config.label,
      value: percentage,
      color: config.color,
    };
  });

  return (
    <div className="bg-white overflow-hidden">
      <div className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between h-8 bg-[#024C97] text-xs text-white px-2 xl:px-28">
        <div>Impulsando las exportaciones dominicanas</div>
        <div className="space-x-3">
          <Link
            target="_blank"
            href="tel:+18095555555"
            className="hover:text-sky-400 duration-300"
          >
            +1 (809) 555 5555
          </Link>
          <Link
            target="_blank"
            href="mailto:info@prodominicana.gob.do"
            className="hover:text-sky-400 duration-300"
          >
            info@prodominicana.gob.do
          </Link>
        </div>
      </div>
      <div className="w-full h-[50vh] xl:h-[120vh] flex items-center justify-center relative">
        <Image
          width={3840}
          height={2160}
          src="/images/puntacatalina.jpg"
          alt="PNFE Banner"
          className="w-full h-[120vh] object-cover absolute inset-0"
        />
        <div className="h-full absolute inset-0 bg-white/40">
          <div
            id="header"
            className="flex items-center justify-between py-10 px-5 xl:px-28"
          >
            <Image
              width={1920}
              height={1080}
              src="/prodominicana.svg"
              alt="Logo"
              className="w-48"
            />
            <div className="hidden xl:flex gap-16 font-semibold text-blue-950">
              <Link href="#home" className="hover:text-sky-700 duration-300">
                Inicio
              </Link>
              <Link href="#about" className="hover:text-sky-700 duration-300">
                Sobre el PNFE
              </Link>
              <Link
                href="#progress"
                className="hover:text-sky-700 duration-300"
              >
                Avances
              </Link>
              <Link
                href="#success-stories"
                className="hover:text-sky-700 duration-300"
              >
                Casos de Éxito
              </Link>
              <Link
                href="/documents/pnfe.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-700 duration-300"
              >
                Documentos
              </Link>
              <Link href="#contact" className="hover:text-sky-700 duration-300">
                Consultas
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center xl:items-start gap-10 px-5 xl:px-28 xl:mt-20">
            <Image
              width={1920}
              height={1080}
              src="/svg/logos/pnfe.svg"
              alt="Logo"
              className="w-full xl:w-5/6"
            />
            <Link
              href="#progress"
              className="max-w-min text-nowrap text-white xl:text-3xl font-bold bg-[#CA152B] px-4 xl:px-8 py-4 rounded-lg hover:bg-[#CA152B]/80 duration-300"
            >
              Últimos avances
            </Link>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="absolute bottom-0 left-0 w-full h-full bg-[#003B7A] [clip-path:polygon(0%_80%,73%_80%,65%_100%,0%_100%)] flex items-end">
            <div className="w-8/12 h-[20%] flex gap-20 flex-wrap justify-center items-center">
              <Image
                src="/svg/icons/pnfeIcon1.svg"
                alt="Icono 1"
                width={500}
                height={500}
                className="size-24"
              />
              <Image
                src="/svg/icons/pnfeIcon2.svg"
                alt="Icono 2"
                width={500}
                height={500}
                className="size-24"
              />
              <Image
                src="/svg/icons/pnfeIcon3.svg"
                alt="Icono 3"
                width={500}
                height={500}
                className="size-24"
              />
              <Image
                src="/svg/icons/pnfeIcon4.svg"
                alt="Icono 4"
                width={500}
                height={500}
                className="size-24"
              />
              <Image
                src="/svg/icons/pnfeIcon5.svg"
                alt="Icono 5"
                width={500}
                height={500}
                className="size-24"
              />
            </div>
          </div>
        </div>
      </div>
      <section id="about" className="bg-white xl:h-screen w-full relative">
        <div className="h-full flex flex-col xl:flex-row items-center justify-center gap-5 xl:gap-20 pt-10 xl:py-20 px-5 xl:px-28">
          <Image
            width={1920}
            height={1080}
            src="/images/pnfeAbout.jpg"
            alt="PNFE About"
            className="xl:w-3/6 xl:self-start"
          />
          <div className="text-blue-950 space-y-5 xl:self-center">
            <p>
              El Plan Nacional de Fomento a las Exportaciones de la República
              Dominicana 2020- 2030, ha sido un ejercicio que se ha nutrido de
              aportes de una diversidad de fuentes, con el fin de incorporar las
              ideas, reflexiones y propuestas formuladas desde las perspectivas
              de las instituciones gubernamentales, gremios empresariales y
              organizaciones vinculadas al desarrollo productivo y exportador,
              la academia y centros de pensamiento nacionales e internacionales,
              así como de los propios productores y exportadores que han asumido
              el reto de competir en los mercados globales. Este esfuerzo se
              inicia con levantamientos desde un proceso de trabajo desde 2016,
              se entrega un primer documento en el 2018 y no es hasta el pasado
            </p>
            <Link
              href="/documents/pnfe.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-600 hover:underline hover:text-red-700 hover:cursor-pointer duration-200"
            >
              Leer más...
            </Link>
            <div className="hidden xl:block">
              <div className="absolute top-0 right-0 w-full h-full bg-[#CA152B] [clip-path:polygon(65%_0%,100%_0%,100%_20%,58.2%_20%)]" />
              <div className="absolute bottom-0 left-0 w-full h-full bg-[#003B7A] [clip-path:polygon(0%_80%,33%_80%,25%_100%,0%_100%)]" />
            </div>
          </div>
        </div>
      </section>
      <section
        id="progress"
        className="bg-[#003B7A] xl:h-screen w-full py-5 xl:py-20 px-5 xl:px-40"
      >
        <h1 className="text-2xl xl:text-5xl font-bold text-white uppercase mb-5">
          Avances del Plan
        </h1>
        {bars.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <ScaleLoader width={10} height={25} color="white" />
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-20 h-5/6">
            <div className="h-full xl:w-6/12">
              <Doughnut data={gaugeData} options={gaugeOptions} />
            </div>
            <div className="h-full xl:w-6/12">
              {bars.map((bar, index) => (
                <BarChart key={index} data={bar} />
              ))}
            </div>
          </div>
        )}
      </section>
      <section
        id="milestones"
        className="xl:h-screen bg-white w-full py-5 xl:py-20 px-5 xl:px-28 relative"
      >
        <h1 className="text-2xl xl:text-3xl font-bold text-[#003B7A] uppercase mb-5">
          Hitos
        </h1>
        <div className="hidden xl:block">
          <div className="absolute top-0 right-0 w-full h-full bg-[#003B7A] [clip-path:polygon(65%_0%,100%_0%,100%_20%,58.2%_20%)]" />
        </div>
      </section>
      <section
        id="institutions"
        className="flex flex-col bg-white w-full gap-10 py-5 xl:py-20 px-5 xl:px-28"
      >
        <h1 className="text-2xl xl:text-3xl font-bold text-[#003B7A] uppercase">
          Instituciones Públicas y Privadas
        </h1>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {institutions.map((institution, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center items-center"
              >
                <Link href={institution.link} target="_blank">
                  <Image
                    src={institution.logo}
                    alt={institution.name}
                    width={1920}
                    height={1080}
                    className="w-72 h-32 object-contain"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </section>
      <section
        id="contact"
        className="bg-[#003B7A] w-full flex justify-center py-5 xl:py-20"
      >
        <div className="w-full h-full flex flex-col justify-center p-5 gap-10 xl:px-28 text-white">
          <div className=" space-y-3">
            <h1 className="w-min bg-[#CA152B] px-5 py-2 uppercase text-2xl xl:text-3xl font-bold">
              Contáctanos
            </h1>
            <p className="text-lg xl:text-2xl">
              <strong>¡Ponte en contacto con nosotros!</strong>
              <br />
              Escribenos tus dudas o comentarios y te contestaremos lo antes
              posible.
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 text-black">
            <Input type="text" placeholder="Nombre" className="bg-white h-14" />
            <Input
              type="text"
              placeholder="Correo Electronico"
              className="bg-white h-14"
            />
            <Input
              type="text"
              placeholder="Empresa"
              className="bg-white h-14"
            />
            <Input type="text" placeholder="Sector" className="bg-white h-14" />
          </div>
          <Textarea
            placeholder="Mensaje"
            className="bg-white h-32 text-black"
          />
          <Button className="bg-[#CA152B] hover:bg-red-700 duration-300 h-12 hover:cursor-pointer">
            Enviar
          </Button>
          <div className="w-full bg-white/50 h-[2px]" />
          <div className="flex flex-col-reverse xl:flex-row gap-5 justify-center items-center">
            <p className="text-xl text-center">
              ProDominicana © {year}. Todos los derechos reservados República
              Dominicana.
            </p>
            <Image
              src="/svg/logos/Prodominicana.svg"
              alt="Logo ProDominicana"
              width={1920}
              height={1080}
              className="w-36"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function BarChart({ data }: any) {
  const barData = {
    labels: [data.label],
    datasets: [
      {
        label: "Avance",
        data: [data.value],
        backgroundColor: [data.color],
      },
      {
        label: "En gestión",
        data: [100 - data.value],
        backgroundColor: "#ffffff",
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: { display: false },
      },
      y: {
        stacked: true,
        display: false,
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.parsed.x}%`,
        },
      },
      legend: {
        position: "bottom" as const,
        align: "center" as const,
        labels: { color: "#fff" },
      },
      datalabels: {
        display: true,
        color: (context: any) => {
          const datasetIndex = context.datasetIndex;
          const dataset = context.chart.data.datasets[datasetIndex];
          const bgColor = dataset.backgroundColor;
          if (typeof bgColor === "string") {
            return bgColor === "#ffffff" ? "#000000" : "#ffffff";
          }

          if (Array.isArray(bgColor)) {
            const value = bgColor[context.dataIndex];
            return value === "#ffffff" ? "#000000" : "#ffffff";
          }

          return "#000000";
        },
        font: {
          weight: "bold" as const,
        },
        formatter: (value: number) => `${value}%`,
      },
    },
  };
  return (
    <div>
      <h2 className="xl:text-xl font-bold uppercase text-white">
        {data.label}
      </h2>
      <div className="h-32">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
