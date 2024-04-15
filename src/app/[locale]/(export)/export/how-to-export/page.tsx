"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

export default function Page() {
  const stepsToExport = [
    {
      name: "Registro de nombre comercial",
      desc: "<p>Consiste en registrar el nombre comercial en la Oficina Nacional de Propiedad Industrial (ONAPI) con toda la documentación en español. Si el solicitante es extranjero no residente en el país, deberá presentar su solicitud a través de un representante o apoderado.</p>",
      logo: "/svg/logos/onapi.svg",
      icon: "/svg/export/steps/exportStepIcon.svg",
      icon2: "/svg/export/steps/stepIcon.svg",
      link: "https://www.onapi.gov.do/index.php/servicios/signos-distintivos/nombres-comerciales/item/564-registro-de-nombre-comercial-2023",
    },
    {
      name: "Registro Mercantil",
      desc: `<p>Brinda la oportunidad de que tu negocio pueda acceder a los beneficios y facilidades que se obtienen al estar formalizado.</p>
<ul>
    <li>Facilita la relación entre los comerciantes.</li>
    <li>Posibilita acceder a los servicios financieros.</li>
    <li>Permite obtener información de las compañías inscritas.</li>
</ul>`,
      logo: "",
      icon: "/svg/export/steps/exportStepIcon1.svg",
      icon2: "/svg/export/steps/stepIcon1.svg",
      link: "https://www.fedocamaras.do/RegistroMercantil/RegistroMercantil",
    },
    {
      name: "Registro Nacional del Contribuyente",
      desc: `<p>Registro expedido por la Dirección General de Impuestos Internos (DGII) y sirve como código de identificación de los contribuyentes en sus actividades fiscales y como control de la administración para dar seguimiento al cumplimiento de los deberes y derechos de estos. El RNC surge con el fin de establecer una numeración común para la liquidación y pago de los diferentes impuestos y tasas y contiene los datos que pertenecen a una persona física o jurídica en función de su identificación, localización y atributos.</p>`,
      logo: "/svg/logos/dgii.svg",
      icon: "/svg/export/steps/exportStepIcon2.svg",
      icon2: "/svg/export/steps/stepIcon2.svg",
      link: "https://dgii.gov.do/cicloContribuyente/registroRNC/Paginas/default.aspx",
    },
    {
      name: "Factura Comercial",
      desc: `<p>En el país de destino todo embarque se debe acompañar con una factura original, la misma debe incluir:</p>
<ul>
    <li>Nombres de la aduana de salida y puerto de entrada.</li>
    <li>Nombre y dirección del vendedor o embarcador.</li>
    <li>Nombre y dirección del comprador o del consignatario.</li>
    <li>Descripción detallada de la mercancía, cantidades y precios que especifiquen tipo de moneda y tipo de divisa utilizada.</li>
    <li>Condiciones de venta, lugar y fecha de expedición.</li>
</ul>
<p>Frecuentemente es utilizada por las autoridades aduaneras del país de destino como el documento básico para determinar el valor en aduana de las mercancías, para aplicar los derechos, gravámenes y aranceles de importación.</p>
`,
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon3.svg",
      icon2: "/svg/export/steps/stepIcon3.svg",
      link: "https://www.aduanas.gob.do",
    },
    {
      name: "Lista de Empaque",
      desc: `<p>La lista de empaque es un documento que permite conocer el contenido de cada bulto o caja, facilitando de esta forma la identificación de la mercancía del exportador. Este documento no tiene un formato específico, pero debe incluir los siguientes datos:</p>
<ul>
    <li>Información específica del exportador</li>
    <li>Información específica del importador</li>
    <li>Marcas</li>
    <li>Números de los bultos</li>
    <li>Lugar y fecha de emisión</li>
    <li>Modo de embarque</li>
    <li>Cantidad de bultos</li>
    <li>Descripción de la mercancía</li>
    <li>Totalidad de los pesos brutos y netos</li>
    <li>Tipo de embalaje</li>
    <li>Firma y sello del exportador</li>
</ul>
<p>Estas informaciones ayudan a que las mercancías enviadas sean fácilmente identificadas por el transitario, pero también por las aduanas y por el receptor de la mercancía. La lista de empaque además es necesaria para poder emitir el Bill of Lading (B/L) y para prevenir el envío de mercancías no permitidas.</p>
`,
      logo: "",
      icon: "/svg/export/steps/exportStepIcon4.svg",
      icon2: "/svg/export/steps/stepIcon4.svg",
      link: "",
    },
    {
      name: "Registro del Exportador",
      desc: `<p>Mediante el decreto No. 377-92 del 18 de octubre 1992, se derogó la licencia del exportador, como requerimiento a toda persona física o moral a los fines de realizar operaciones de exportación, aunque cualquier persona o entidad que desee exportar se debe registrar como exportador ante la Dirección General de Aduanas.</p>`,
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon5.svg",
      icon2: "/svg/export/steps/stepIcon5.svg",
      link: "https://www.aduanas.gob.do",
    },
    {
      name: "Formulario DUA",
      desc: `<p>Es un documento que facilita realizar las declaraciones de las exportaciones e importaciones ante la Dirección General de Aduanas y brindar la información necesaria del producto que se va a trasladar. Además, sirve de base para la declaración tributaria.</p><p>Para las exportaciones de mercancías, se deberá utilizar la Declaración Única Aduanera de Exportación (DUA), donde se consignan todos los datos de salida del producto. Este formulario es expedido por la Dirección General de Aduanas (DGA), a través del Sistema Integrado de Gestión Aduanera.</p>`,
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon6.svg",
      icon2: "/svg/export/steps/stepIcon6.svg",
      link: "https://www.aduanas.gob.do",
    },
    {
      name: "Certificación de Origen",
      desc: `<p>Es un documento que tiene por objetivo acreditar la procedencia de la mercancía. Para gozar de las preferencias arancelarias otorgadas por los Tratados de Libre Comercio, es obligatorio presentar el certificado de origen correspondiente. En este caso, la República Dominicana ha sido signataria de cinco (6) Tratados de Libre Comercio, los cuales contienen sus respectivos tipos de certificados de origen. Dependiendo del mercado al cual se dirigen las exportaciones, el exportador debe anexar a sus documentos de exportación un certificado de origen.</p>`,
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon7.svg",
      icon2: "/svg/export/steps/stepIcon7.svg",
      link: "https://www.aduanas.gob.do",
    },
    {
      name: "Cumplimiento de requisitos especiales agrícolas",
      desc: `<p>Según la naturaleza del producto que se pretende exportar, se hace necesaria el registro de establecimientos y áreas de producción (fincas de producción, empresas, plantas empacadoras) ante el Ministerio de Agricultura en el Departamento de Inocuidad Agroalimentaria (DIA) y Dirección Nacional de Vegetales Orientales y Frutas Frescos de Exportación (DINVOFEX), y obtener con anterioridad a la exportación los vistos buenos o requisitos especiales que de conformidad con las normas vigentes requiera su producto para ser exportado.</p>`,
      logo: "/svg/logos/agricultura.svg",
      icon: "/svg/export/steps/exportStepIcon8.svg",
      icon2: "/svg/export/steps/stepIcon8.svg",
      link: "",
    },
    {
      name: "Documento de Embarque",
      desc: `<p><strong>Conocimiento de Embarque (Bill of Lading):</strong> El documento que cubre el transporte de mercancías marítimas se llama Conocimiento de Embarque (B/L por sus siglas en inglés: Bill of Lading). El B/L es el recibo auténtico entregado por el transportista, lo que confirma que los productos especificados en ellas (marcas, tipos de productos, el número de paquetes, etc.) se han cargado en un buque designado para el transporte a un puerto especificado.</p><p><strong>Guía Aérea (Air Waybill):</strong> es el documento que recoge el contrato de transporte aéreo internacional y sirve como un justificante de entrega de la mercancía.</p><p><strong>Carta de Porte:</strong> La carta de porte es el documento en el que se ingresa la información del transporte de cualquier mercancía, cuando se hace un contrato de transporte terrestre.</p>`,
      logo: "",
      icon: "/svg/export/steps/exportStepIcon9.svg",
      icon2: "/svg/export/steps/stepIcon9.svg",
      link: "",
    },
    {
      name: "Inspección",
      desc: `<p>Protocolo de inspección conjunta para la importación y exportación de mercancías desde y hacia el territorio aduanero dominicano. (Fuente: Dirección General de Aduanas).</p><p><strong>Objetivo:</strong> establecer y estandarizar los procedimientos de inspección conjunta y simultánea de mercancías, garantizando transparencia, coordinación en la aplicación de las disposiciones legales, así como seguridad jurídica para los usuarios del comercio exterior.</p>`,
      logo: "",
      icon: "/svg/export/steps/exportStepIcon10.svg",
      icon2: "/svg/export/steps/stepIcon10.svg",
      link: "",
    },
  ];
  return (
    <div>
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/cargoship.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white text-center pt-10">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              Como exportar paso a paso
            </div>
            <div className="w-6/12 text-lg">
              Descubre cómo exportar desde República Dominicana, sigue nuestros
              pasos para llevar tus productos al mercado internacional y
              expandir tu negocio.
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-white flex justify-center py-10">
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {stepsToExport.map((step, index) => (
            <StepCard
              key={index}
              index={index}
              name={step.name}
              desc={step.desc}
              logo={step.logo}
              icon={step.icon}
              icon2={step.icon2}
              link={step.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ name, desc, logo, icon, icon2, link, index }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex h-80 rounded-2xl overflow-hidden bg-white relative cursor-pointer"
      >
        <div className="w-full h-full absolute flex items-end pl-3">
          <Image
            width={500}
            height={500}
            src={icon2}
            draggable="false"
            alt="steps"
            className="w-11/12 object-cover"
          />
        </div>
        <div
          className={`w-2/12 h-full ${
            index % 2 === 0 ? "bg-lightBlue-500" : "bg-gray-300"
          } `}
        ></div>
        <div className="w-10/12 h-full flex flex-col items-center justify-center gap-2 text-black text-center">
          <Image
            width={500}
            height={500}
            src={icon}
            alt="directory"
            className="size-20 object-cover"
          />
          <div className="w-8/12 flex flex-col gap-1">
            <div className="text-lg font-bold">{name}</div>
          </div>
          {logo && (
            <Image
              width={500}
              height={500}
              src={logo}
              alt="logo"
              className="w-20 object-cover"
            />
          )}
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        className="p-5"
      >
        <DialogHeader placeholder={undefined}>
          <h1 className="text-blue-dark font-bold text-3xl">{name}</h1>
        </DialogHeader>
        <DialogBody placeholder={undefined} className="flex flex-col gap-5">
          <div
            dangerouslySetInnerHTML={{ __html: desc }}
            className="flex flex-col gap-3 list-disc text-black"
          ></div>
          {link && (
            <Link
              href={link}
              className="bg-blue-dark w-48 py-3 text-center text-white rounded-full"
            >
              Más información
            </Link>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}
