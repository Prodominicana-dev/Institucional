"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

const FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=ghXqEGP41EuvCTx0XnNcBQ31lOl-DKtCsTDiHFRWb-hUM0REOTFDUzRRT0lTQUsxRUpUTTlCWEdNMS4u";

const NAV = [
  { href: "#programa", label: "El programa" },
  { href: "#fechas", label: "Fechas" },
  { href: "#requisitos", label: "Requisitos" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#evaluacion", label: "Evaluación" },
  { href: "#contacto", label: "Contacto" },
];

export default function Page() {
  return (
    <div className="bg-white font-opensans text-[#003366]">
      <Header />
      <Hero />
      <About />
      <Dates />
      <Requirements />
      <RegisterBand />
      <Benefits />
      <Evaluation />
      <EventCard />
      <InfoBand />
      <Terms />
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function GradientBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] ${className}`}
    />
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-montserrat font-extrabold text-2xl sm:text-3xl xl:text-4xl text-[#003366] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Píldora con degradado, como los encabezados de sección del flyer. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] px-6 py-2 sm:px-8 sm:py-2.5">
      <span className="font-montserrat font-bold text-white text-sm sm:text-base xl:text-lg">
        {children}
      </span>
    </div>
  );
}

function ApplyButton({
  variant = "solid",
  className = "",
  children = "Formulario en línea",
}: {
  variant?: "solid" | "white" | "outline";
  className?: string;
  children?: React.ReactNode;
}) {
  const styles = {
    solid:
      "bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] text-white hover:brightness-110",
    white: "bg-white text-[#FF009C] hover:bg-[#FFF1F8]",
    outline:
      "border-2 border-[#FF009C] text-[#FF009C] hover:bg-[#FF009C] hover:text-white",
  }[variant];

  return (
    <Link
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-4 font-montserrat font-bold text-sm sm:text-base shadow-lg shadow-[#FF009C]/20 transition duration-200 ${styles} ${className}`}
    >
      {children}
      <Icon icon="mdi:arrow-right" className="size-5" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <GradientBar className="h-2 sm:h-2.5" />
      <div className="w-11/12 max-w-7xl mx-auto flex items-center gap-4 py-3">
        <Link href="/" className="flex-shrink-0">
          <Image
            width={1980}
            height={1080}
            alt="ProDominicana"
            src="/svg/ProdominicanaPink.svg"
            className="w-28 sm:w-36"
          />
        </Link>

        <nav className="ml-auto hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#003366] hover:text-[#FF009C] duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ApplyButton className="ml-auto lg:ml-0 !px-4 !py-2.5 sm:!px-6 sm:!py-3 !text-xs sm:!text-sm">
          Aplicar
        </ApplyButton>
      </div>

      {/* Navegación en móvil: fila deslizable */}
      <nav className="lg:hidden border-t border-[#003366]/10">
        <div className="w-11/12 max-w-7xl mx-auto flex gap-5 overflow-x-auto py-2.5 text-xs font-medium whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#003366]/80 hover:text-[#FF009C] duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FF009C]">
      <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[560px] xl:h-[640px]">
        <Image
          src="/images/sumando-exportadoras/hero-2026.jpg"
          alt="Mujer empresaria dominicana celebrando frente a un mapa del mundo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] sm:object-center"
        />

        {/* Lettering "¡Acelera tu Emprendimiento!" extraído del flyer */}
        <div className="absolute inset-x-0 top-8 sm:top-12 lg:top-16 flex justify-center lg:justify-end lg:pr-[6%] xl:pr-[8%]">
          <Image
            width={603}
            height={218}
            priority
            alt="¡Acelera tu Emprendimiento!"
            src="/images/sumando-exportadoras/acelera-emprendimiento.png"
            className="w-56 sm:w-80 lg:w-[26rem] xl:w-[32rem] drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
          />
        </div>

        <Wave />
      </div>
    </section>
  );
}

/** Onda degradada que separa el hero del contenido blanco, como en el flyer. */
function Wave() {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute bottom-0 left-0 w-full h-14 sm:h-20 lg:h-28"
    >
      <defs>
        <linearGradient id="se-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="50%" stopColor="#6C6FD0" />
          <stop offset="100%" stopColor="#A54FC4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#se-wave)"
        d="M0,52 C260,-8 520,104 780,58 C1020,16 1240,86 1440,36 L1440,98 C1240,148 1020,78 780,120 C520,166 260,54 0,114 Z"
      />
      <path
        fill="#ffffff"
        d="M0,96 C260,36 520,148 780,102 C1020,60 1240,130 1440,80 L1440,160 L0,160 Z"
      />
    </svg>
  );
}

function About() {
  return (
    <section id="programa" className="scroll-mt-32 lg:scroll-mt-28 w-11/12 max-w-7xl mx-auto pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
        <Image
          width={1471}
          height={650}
          priority
          alt="Sumando Exportadoras — Capacítate y conecta con mercados internacionales"
          src="/svg/sumando-exportadoras-logo.svg"
          className="w-72 sm:w-96 lg:w-[28rem] xl:w-[32rem] mx-auto lg:mx-0 flex-shrink-0"
        />

        <div className="flex flex-col gap-4">
          <SectionTitle className="text-center lg:text-left">
            ¿Qué es{" "}
            <span className="text-[#FF009C]">&ldquo;Sumando Exportadoras&rdquo;</span>?
          </SectionTitle>
          <p className="text-base sm:text-lg xl:text-xl leading-relaxed text-[#003366]/85 text-center lg:text-left">
            Es una iniciativa de ProDominicana, en el marco del{" "}
            <strong className="text-[#003366]">
              Encuentro Nacional Mujeres en Exportación
            </strong>
            , que busca identificar y apoyar a mujeres empresarias MIPYMES con
            potencial exportador. El programa proporciona una plataforma para
            presentar empresas, productos y planes de internacionalización, y
            ofrece acompañamiento especializado para ayudar a las seleccionadas a
            ingresar a mercados internacionales.
          </p>
          <div className="flex justify-center lg:justify-start pt-2">
            <ApplyButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function Dates() {
  const data = [
    { day: "01", month: "oct.", title: "Apertura convocatoria" },
    { day: "18", month: "oct.", title: "Cierre de inscripciones" },
    { day: "19", month: "nov.", title: "Anuncio beneficiarias del Programa" },
  ];

  return (
    <section id="fechas" className="scroll-mt-32 lg:scroll-mt-28 w-full bg-[#FFF1F8] py-10 sm:py-14">
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
        {data.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4"
          >
            <span className="font-montserrat font-extrabold text-[#FF009C] text-6xl sm:text-6xl xl:text-7xl leading-none">
              {item.day}
            </span>
            <span className="w-36 sm:w-auto">
              <span className="block font-montserrat font-extrabold text-[#FF009C] text-lg sm:text-xl xl:text-2xl leading-tight">
                {item.month}
              </span>
              <span className="block text-sm sm:text-base text-[#003366] font-semibold leading-snug">
                {item.title}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Requirements() {
  const eligibility = [
    "Empresas MIPYMES registradas en la República Dominicana, lideradas por mujeres y con al menos un 25 % de propiedad femenina.",
    "Empresas que no hayan exportado previamente o que tengan, si han exportado, un nuevo producto de exportación.",
    "Tener mínimo 1 año comercializando.",
    "Tener instalaciones productivas.",
  ];
  const process = [
    <>
      Las participantes deben completar este{" "}
      <Link
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[#FF009C] underline underline-offset-2 hover:text-[#8C5CCC] duration-200"
      >
        formulario en línea
      </Link>{" "}
      con la información requerida sobre su empresa y producto.
    </>,
    <>
      Posteriormente, las empresas preseleccionadas deberán realizar un video de
      1 a 3 minutos en el que presenten su empresa, su producto y sus metas de
      exportación. Les contactaremos para coordinar la recepción.
    </>,
  ];

  const Card = ({
    title,
    items,
  }: {
    title: string;
    items: React.ReactNode[];
  }) => (
    <div className="flex flex-col rounded-3xl border border-[#003366]/10 bg-white shadow-xl shadow-[#003366]/5 overflow-hidden">
      <div className="bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] px-6 sm:px-8 py-4">
        <h3 className="font-montserrat font-bold text-white text-lg sm:text-xl">
          {title}
        </h3>
      </div>
      <ul className="flex flex-col gap-4 px-6 sm:px-8 py-6 sm:py-8">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-base sm:text-lg leading-relaxed">
            <Icon
              icon="mdi:check-circle"
              className="size-6 flex-shrink-0 text-[#FF009C] mt-0.5"
            />
            <span className="text-[#003366]/85">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      id="requisitos"
      className="scroll-mt-32 lg:scroll-mt-28 w-11/12 max-w-7xl mx-auto py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10"
    >
      <Card title="Elegibilidad" items={eligibility} />
      <Card title="Proceso de Aplicación" items={process} />
    </section>
  );
}

function RegisterBand() {
  return (
    <section className="w-11/12 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-12 rounded-3xl bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] px-8 sm:px-12 py-10 sm:py-14">
        <h2 className="font-montserrat font-extrabold text-white text-2xl sm:text-3xl xl:text-4xl text-center xl:text-left xl:w-7/12 leading-tight">
          Regístrate, participa y transforma tu negocio
        </h2>
        <ApplyButton variant="white" className="flex-shrink-0" />
      </div>
    </section>
  );
}

function Benefits() {
  const technical = [
    "Test Exportador.",
    "Asesoría técnica en análisis de mercado, normativas internacionales y estrategias de entrada.",
    "Análisis e inteligencia de Mercado.",
    "Identificación de 5-10 potenciales compradores internacionales.",
    "Acompañamiento en las negociaciones.",
    "Asesoría técnica en exportación de servicios (en caso de ser del sector servicios).",
  ];

  const data = [
    {
      icon: "mdi:school-outline",
      title: "Acceso a programas de capacitación de ProDominicana",
      description: "Incluyendo un cupo en uno de nuestros diplomados.",
    },
    {
      icon: "mdi:trending-up",
      title: "Programa “Mujer Negocios Evoluciona”",
      description: "Participación en el programa del Banco BHD.",
    },
    {
      icon: "mdi:cash-multiple",
      title: "Consultoría valorada en USD 2,500",
      description: "Aplica para empresas de servicios.",
    },
    {
      icon: "mdi:camera-outline",
      title: "Fotografía y video profesional de sus productos",
      description: "Sesión de 2 horas.",
    },
    {
      icon: "mdi:bullhorn-outline",
      title: "Visibilidad en medios de comunicación",
      description: "Medios seleccionados por ProDominicana.",
    },
    {
      icon: "mdi:earth",
      title: "Ferias y misiones comerciales",
      description:
        "Asistencia y apoyo para la participación en ferias y misiones comerciales nacionales e internacionales.",
    },
  ];

  const Badge = ({ icon, number }: { icon: string; number: number }) => (
    <div className="flex items-center gap-4">
      <span className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C6FF] via-[#8C5CCC] to-[#FF009C]">
        <Icon icon={icon} className="size-7 text-white" />
      </span>
      <span className="font-montserrat font-extrabold text-2xl text-[#FF009C]/30 leading-none">
        {String(number).padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <section id="beneficios" className="scroll-mt-32 lg:scroll-mt-28 w-11/12 max-w-7xl mx-auto py-12 sm:py-20">
      <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
        <Pill>Beneficios que obtendrán</Pill>
        <p className="max-w-3xl text-base sm:text-lg xl:text-xl text-[#003366]/85 leading-relaxed">
          Acompañamiento personalizado y especializado en el proceso de
          preparación para exportar, que incluirá:
        </p>
      </div>

      {/* Beneficio destacado: asesoría y evaluación técnica */}
      <article className="flex flex-col gap-6 rounded-3xl border border-[#FF009C]/20 bg-[#FFF7FB] p-6 sm:p-10 shadow-xl shadow-[#FF009C]/5 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Badge icon="mdi:compass-outline" number={1} />
          <h3 className="font-montserrat font-bold text-xl sm:text-2xl xl:text-3xl text-[#003366] leading-snug">
            Asesoría y evaluación técnica especializada
          </h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3">
          {technical.map((item) => (
            <li key={item} className="flex gap-2.5 text-base text-[#003366]/80">
              <Icon
                icon="mdi:check-circle"
                className="size-5 flex-shrink-0 text-[#FF009C] mt-1"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {data.map((item, i) => (
          <article
            key={item.title}
            className="flex flex-col gap-4 rounded-3xl border border-[#003366]/10 bg-white p-6 sm:p-8 shadow-xl shadow-[#003366]/5 hover:border-[#FF009C]/40 hover:shadow-[#FF009C]/10 duration-200"
          >
            <Badge icon={item.icon} number={i + 2} />
            <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#003366] leading-snug">
              {item.title}
            </h3>
            <p className="text-base text-[#003366]/75 leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Evaluation() {
  const criteria = [
    {
      title: "Viabilidad",
      description: "Claridad y factibilidad en la estrategia.",
    },
    {
      title: "Preparación Operativa",
      description: "Capacidad para abastecer mercados internacionales.",
    },
    {
      title: "Atractivo",
      description: "Grado de diferenciación y novedad del producto.",
    },
    {
      title: "Impacto Social, Económico y/o Ambiental",
      description:
        "Inclusión de prácticas responsables y promoción de la participación femenina.",
    },
    {
      title: "Presentación",
      description:
        "Consistencia, coherencia y profesionalismo en la presentación, evaluando la efectividad para transmitir la propuesta y visión de la empresa.",
    },
  ];

  return (
    <section id="evaluacion" className="scroll-mt-32 lg:scroll-mt-28 w-full bg-[#F4F9FF] py-12 sm:py-20">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <Pill>Proceso de Evaluación</Pill>
          <p className="max-w-3xl text-base sm:text-lg xl:text-xl text-[#003366]/85 leading-relaxed">
            Las aplicaciones serán evaluadas en función de los siguientes
            criterios:
          </p>
        </div>

        <ol className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {criteria.map((item, i) => (
            <li
              key={item.title}
              className="relative flex flex-col gap-2 rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-[#003366]/5"
            >
              <span className="absolute right-6 top-5 font-montserrat font-extrabold text-4xl text-[#00C6FF]/20 leading-none">
                {i + 1}
              </span>
              <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#FF009C] pr-10 leading-snug">
                {item.title}
              </h3>
              <p className="text-base text-[#003366]/80 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="max-w-4xl flex flex-col gap-4 text-center text-base sm:text-lg text-[#003366]/85 leading-relaxed">
          <p>
            Luego de revisar todas las propuestas, el comité evaluador
            seleccionará{" "}
            <strong className="text-[#003366]">tres finalistas</strong>, las
            cuales recibirán el programa completo de beneficios.
          </p>
          <p>
            Este comité evaluador estará compuesto por entidades relacionadas al
            comercio exterior y a las mujeres empresarias.
          </p>
        </div>
      </div>
    </section>
  );
}

function EventCard() {
  const info = [
    { icon: "mdi:calendar-star", label: "Jueves 19 de noviembre" },
    { icon: "mdi:map-marker-outline", label: "Auditorio ProDominicana" },
    { icon: "mdi:clock-outline", label: "10:00 A.M." },
  ];

  return (
    <section className="w-11/12 max-w-7xl mx-auto py-12 sm:py-16">
      <div className="flex flex-col items-center gap-8 rounded-3xl bg-[#003366] px-8 sm:px-12 py-10 sm:py-14 text-center">
        <div className="flex flex-col gap-2">
          <span className="font-montserrat font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-[#00C6FF]">
            Anuncio de beneficiarias
          </span>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl xl:text-4xl text-white leading-tight">
            Conoce a las empresas seleccionadas del programa
          </h2>
        </div>

        <ul className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
          {info.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 text-white text-base sm:text-lg font-semibold"
            >
              <Icon icon={item.icon} className="size-6 text-[#FF009C]" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InfoBand() {
  const contact: { icon: string; label: React.ReactNode; href: string }[] = [
    {
      icon: "mdi:email-outline",
      // <wbr> deja que el correo baje de línea tras el usuario en vez de partirse a mitad de palabra
      label: (
        <>
          sumandoexportadoras
          <wbr />
          @prodominicana.gob.do
        </>
      ),
      href: "mailto:sumandoexportadoras@prodominicana.gob.do",
    },
    {
      icon: "mdi:phone-outline",
      label: "809-530-5505 Ext. 247",
      href: "tel:+18095305505,247",
    },
    {
      icon: "mdi:web",
      label: "www.prodominicana.gob.do",
      href: "https://www.prodominicana.gob.do",
    },
  ];

  return (
    <section
      id="contacto"
      className="scroll-mt-32 lg:scroll-mt-28 w-11/12 max-w-7xl mx-auto pb-12 sm:pb-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-[#FF009C] divide-y lg:divide-y-0 lg:divide-x divide-white/30">
        <div className="flex flex-col gap-4 px-6 sm:px-10 py-8 sm:py-10">
          <h2 className="font-montserrat font-extrabold italic text-xl sm:text-2xl text-white">
            INFORMACIÓN:
          </h2>
          <ul className="flex flex-col gap-3">
            {contact.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex items-start gap-3 text-white/95 hover:text-white text-sm sm:text-base duration-200"
                >
                  <Icon icon={item.icon} className="size-5 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 break-words">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-6 px-6 sm:px-10 py-8 sm:py-10">
          <Link
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-2xl bg-white p-2.5 shadow-lg hover:scale-105 duration-200"
          >
            <Image
              width={53}
              height={53}
              alt="Código QR al formulario de inscripción"
              src="/images/sumando-exportadoras/qr-formulario.svg"
              className="size-24 sm:size-28"
              unoptimized
            />
          </Link>
          <div className="font-montserrat italic text-white">
            <p className="font-extrabold text-xl sm:text-2xl leading-tight">
              Escanea
              <br />
              el código
            </p>
            <p className="font-bold text-sm sm:text-base leading-snug mt-1">
              participa y transforma
              <br />
              tu negocio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Terms() {
  const terms = [
    "Los participantes, al presentar sus propuestas, aceptan las reglas del programa y ceden los derechos de uso de su imagen para la difusión y resumen del evento.",
    "Los participantes se comprometen a participar activamente en las actividades derivadas de su selección en caso de ser finalistas.",
    "Las participantes son responsables de cumplir con los compromisos adquiridos durante el programa, incluidos los plazos y actividades.",
    "Toda la información proporcionada debe ser veraz y reflejar la situación actual de la empresa.",
    "Las decisiones del comité de selección son definitivas y no sujetas a apelación.",
    "La participación en este programa no implica una relación contractual de ningún tipo de garantía legal sobre el éxito de los planes de exportación.",
    "La duración del apoyo será definida por el área técnica de ProDominicana, y no implica una gestión legal ni evaluación normativa.",
    "Los beneficios del programa estarán sujetos a disponibilidad y programación institucional, pudiendo ser ajustados o reprogramados por ProDominicana.",
  ];

  return (
    <section id="terminos" className="scroll-mt-32 lg:scroll-mt-28 w-11/12 max-w-7xl mx-auto pb-12 sm:pb-20">
      <details className="group rounded-3xl border border-[#003366]/10 bg-white shadow-xl shadow-[#003366]/5 overflow-hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 [&::-webkit-details-marker]:hidden">
          <h2 className="font-montserrat font-bold text-lg sm:text-xl xl:text-2xl text-[#003366]">
            Términos y Condiciones
          </h2>
          <Icon
            icon="mdi:chevron-down"
            className="size-7 flex-shrink-0 text-[#FF009C] duration-200 group-open:rotate-180"
          />
        </summary>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 border-t border-[#003366]/10 px-6 sm:px-8 py-6 sm:py-8">
          {terms.map((item) => (
            <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
              <Icon
                icon="mdi:circle-medium"
                className="size-5 flex-shrink-0 text-[#FF009C] mt-0.5"
              />
              <span className="text-[#003366]/80">{item}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function Footer() {
  const social = [
    { icon: "mdi:instagram", href: "https://www.instagram.com/prodominicana" },
    { icon: "jam:facebook", href: "https://www.facebook.com/Prodominicana" },
    { icon: "bi:twitter-x", href: "https://x.com/prodominicana" },
    { icon: "mdi:youtube", href: "https://www.youtube.com/@ProDominicana" },
  ];

  return (
    <footer className="w-full bg-[#FFF1F8]">
      {/* Aliados */}
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col items-center gap-6 py-10 sm:py-14 border-b border-[#003366]/10">
        <span className="font-montserrat font-bold text-sm sm:text-base text-[#003366] text-center">
          HUB oficial de República Dominicana
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          <Image
            width={817}
            height={196}
            alt="Mujer BHD"
            src="/images/sumando-exportadoras/mujer-bhd.png"
            className="h-9 sm:h-11 w-auto object-contain"
          />
          <Image
            width={1050}
            height={600}
            alt="Nex Consulting"
            src="/images/sumando-exportadoras/nex-consulting.png"
            className="h-12 sm:h-16 w-auto object-contain"
          />
          <Link href="/shetrades" target="_blank">
            <Image
              width={518}
              height={124}
              alt="ITC SheTrades República Dominicana"
              src="/svg/shetrades/itcshetrades.svg"
              className="h-10 sm:h-14 w-auto object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Contacto */}
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-10 py-10 sm:py-14">
        <div className="flex flex-col gap-5 sm:max-w-sm">
          <Image
            width={1980}
            height={1080}
            alt="ProDominicana"
            src="/svg/ProdominicanaPink.svg"
            className="w-44 sm:w-56"
          />
          <p className="text-sm sm:text-base text-[#003366]/75 leading-relaxed">
            Centro de Exportación e Inversión de la República Dominicana.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-montserrat font-bold text-base sm:text-lg text-[#003366]">
            Síguenos
          </h3>
          <div className="flex gap-3 sm:gap-4">
            {social.map((item) => (
              <Link
                key={item.icon}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#003366]/20 p-2 text-[#003366] hover:border-[#FF009C] hover:text-[#FF009C] duration-200"
              >
                <Icon icon={item.icon} className="size-5 sm:size-6" />
              </Link>
            ))}
          </div>
          <a
            href="#terminos"
            className="text-sm text-[#003366]/70 hover:text-[#FF009C] duration-200 underline underline-offset-2"
          >
            Términos y condiciones
          </a>
        </div>
      </div>

      <GradientBar className="h-2 sm:h-3" />
    </footer>
  );
}
