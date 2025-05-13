"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";
import { createcontact } from "@/services/contact/service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Page() {
  const map = useMap();
  const t = useTranslations("contact");
  const [openMenu, setOpenMenu] = React.useState(false);
  const [name, setName] = React.useState("");
  const optionSelect = ["Exportador", "Inversionista", "Otro"];
  const [isOpen, setIsOpen] = useState(false);
  const [radomN, setRadomN] = useState("");
  const [formData, setFormData] = useState({
    nameF: "",
    lastName: "",
    email: "",
    identity: "",
    activity: "",
    message: "",
  });
  const [errorRequired, setErrorRequired] = useState<{
    nameF?: string;

    lastName?: string;

    email?: string;

    identity?: string;

    activity?: string;

    message?: string;
  }>({});

  const ValidateFunc = () => {
    const RequiredErr: {
      nameF?: string;

      lastName?: string;

      email?: string;

      identity?: string;

      activity?: string;

      message?: string;
    } = {};

    if (!formData.nameF) {
      RequiredErr.nameF = "El nombre es obligatorio.";
    }

    if (!formData.lastName) {
      RequiredErr.lastName = "El apellido es obligatorio.";
    }

    if (!formData.email) {
      RequiredErr.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // note ☝️: 'here make a validation if it is a correct email '
      RequiredErr.email = "El correo electrónico no es válido.";
    }

    if (!formData.identity) {
      RequiredErr.identity = "Cedula o RNC obligatorio.";
    } else if (formData.identity.length < 11) {
      RequiredErr.identity =
        "La Cedula o RNC debe tener al menos 11 caracteres.";
    }

    if (!formData.activity) {
      RequiredErr.activity = "La actividad es obligatoria.";
    }

    if (!formData.message) {
      RequiredErr.message = "El mensaje es obligatorio.";
    }

    setErrorRequired(RequiredErr);

    return Object.keys(RequiredErr).length === 0;
  };

  const handleclick = (eName: any) => {
    setName(eName);
    console.log("klk name", name);
  };
  const cards = [
    {
      title: t("contactInfo.phone.title"),
      description: t("contactInfo.phone.description"),
      info: "+1 (809) 530 5505",
      link: "tel:+18095305505",
      icon: PhoneIcon,
    },
    {
      title: t("contactInfo.email.title"),
      description: t("contactInfo.email.description"),
      info: "servicios@prodominicana.gob.do",
      link: "mailto:servicios@prodominicana.gob.do",
      icon: EnvelopeIcon,
    },
    {
      title: t("contactInfo.address.title"),
      description:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      info: t("contactInfo.address.info"),
      link: "https://maps.app.goo.gl/2ML9NU6YSL3MmkR18",
      icon: MapPinIcon,
    },
  ];

  const branches = [
    {
      province: "Santo Domingo",
      phone: "+1 809 530 5505",
      address:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      coords: { lat: 18.450663528127134, lng: -69.97308595432206 },
    },
    {
      province: "La Altagracia",
      phone: "+1 829 292 7490",
      address:
        "Calle Manuel Monteagudo esquina Hicayagua #1, Sector San Martin, Higuey.",
      coords: { lat: 18.611143380672146, lng: -68.71593638310102 },
    },
    {
      province: "La Vega",
      phone: "+1 829 891 0304",
      address:
        "Calle Gral. Juan Rodríguez 94, Plaza Jiminián, Apto. 1-01, La Vega.",
      coords: { lat: 19.2253606919866, lng: -70.5289678205116 },
    },
    {
      province: "Monseñor Nouel",
      phone: "+1 829 745 2902",
      address: "C. San Lorenzo de los Santos 132, Bonao.",
      coords: { lat: 18.94247868206842, lng: -70.4090543088343 },
    },
    {
      province: "Pedernales",
      phone: "+1 829 745 1870",
      address: "Calle Dubergé 2, esq. duarte, Pedernales.",
      coords: { lat: 18.036363807306678, lng: -71.7459708340409 },
    },
    {
      province: "Samaná",
      phone: "+1 829 745 1620",
      address: "Calle Restauración No. 02 esq. 27 de Febrero, Samaná.",
      coords: { lat: 19.20409571821329, lng: -69.33094288983054 },
    },
    {
      province: "San Cristóbal",
      phone: "+1 829 344 7799",
      address: "Av. Constitución 95, San Cristóbal.",
      coords: { lat: 18.436508406695598, lng: -70.11319768177877 },
    },
    {
      province: "La Romana",
      phone: "+1 829 796 5943",
      address: "Maria Teresa Toda 12, La Romana.",
      coords: { lat: 18.433208514955567, lng: -68.96683377820547 },
    },
    {
      province: "Puerto Plata",
      phone: "",
      address: "Calle Beller 17, San Felipe de Puerto Plata.",
      coords: { lat: 19.798600441642346, lng: -70.69454200859732 },
    },
    {
      province: "Peravia",
      phone: "+1 849 360 1003",
      address:
        "Calle Canela Mota Edificio para Oficinas Gubernamentales Esq, Av. Pdte. Billini, Bani.",
      coords: { lat: 18.278620345047152, lng: -70.32797283403397 },
    },
    {
      province: "Espaillat",
      phone: "+1 829 504 1266",
      address: "Calle Hostos 9, Moca.",
      coords: { lat: 19.396833399376472, lng: -70.52015004749518 },
    },
    {
      province: "Hato Mayor",
      phone: "+1 829 451 4350",
      address: "Av. Melchor Contin Alfau 7, A-R Plaza Centro, Hato Mayor.",
      coords: { lat: 18.7639977713771, lng: -69.25678658576709 },
    },
    {
      province: "Dajabón",
      phone: "+1 829 424 7400",
      address: "Calle 27 de Febrero 25, esquina Duarte, Dajabón.",
      coords: { lat: 19.548204838188294, lng: -71.70900997817222 },
    },
    {
      province: "Constanza",
      phone: "+1 829 603 5244",
      address:
        "Avenida General Jiménez Moya , frente a la fábrica de sazón al lado de Alfridonsa.",
      coords: { lat: 18.9112342694184, lng: -70.71746749354624 },
    },
    {
      province: "San Juan",
      phone: "+1 849 873 6316",
      address: "Calle Mella esquina Independencia, San Juan.",
      coords: { lat: 18.655595919037175, lng: -71.33506091866549 },
    },
    {
      province: "María Trinidad Sánchez",
      phone: "+1 829 875 7889",
      address: "Calle 27 de Febrero 92, Nagua.",
      coords: { lat: 19.373874744092845, lng: -69.85338459167191 },
    },
    {
      province: "Hermanas Mirabal",
      phone: "+1 849 276 1414",
      address: "Calle Duarte 1, Salcedo.",
      coords: { lat: 19.379228914686284, lng: -70.41736874191675 },
    },
  ];

  const [activeMarker, setActiveMarker] = useState(branches[0]);
  useEffect(() => {
    if (!map) return;
    map.setCenter(activeMarker.coords);
    map.setZoom(15);
  }, [map, activeMarker]);

  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleSelectChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      activity: value || "",
    }));
  };

  const handleTextAre = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cleardataForm = () => {
    setFormData({
      nameF: "",
      lastName: "",
      email: "",
      identity: "",
      activity: "",
      message: "",
    });
  };
  function generar4Digitos() {
    const randomNumerbers = Math.floor(Math.random() * 9000) + 1000;
    return randomNumerbers.toString();
  }

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validaForm = ValidateFunc();

    if (validaForm) {
      setIsOpen(true);
      const contactCode = generar4Digitos();
      setRadomN(contactCode);
      // console.log("codecontact", contactCode);
      // console.log("Datos del formulario:", formData);
      await createcontact(formData, contactCode, cleardataForm);
    } else {
      console.log("Error al  enviar form");
    }

    console.log("handleSubmit ejecutado");
  };
  return (
    <div className="bg-white">
      <ModalCard isOpen={isOpen} codeContact={radomN} onClose={onClose} />
      <section className="flex justify-center py-10">
        <div className="w-10/12 flex items-center gap-10">
          <Image
            width={2000}
            height={2000}
            src={"/images/prodominicanabuilding.jpg"}
            alt={"Building"}
            className="rounded-3xl object-cover h-full w-6/12 hidden xl:block"
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 py-2 text-blue-950 xl:w-6/12 w-full"
          >
            <div>
              <h1 className="text-4xl font-extrabold">{t("title")}</h1>
              <p className="font-semibold">{t("description")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <FormInput
                  label={t("form.name")}
                  placeholder="John"
                  value={formData.nameF}
                  onChange={handleInputChange}
                  name="nameF"
                  isRequired={true}
                />

                {errorRequired.nameF && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.nameF}
                  </span>
                )}
              </div>
              <div className="w-full">
                <FormInput
                  label={t("form.lastName")}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  isRequired={true}
                />
                {errorRequired.lastName && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <FormInput
                label={t("form.email")}
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                isRequired={true}
              />
              {errorRequired.email && (
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.email}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full relative">
                <FormInput
                  label={t("form.identity")}
                  placeholder="000-00000000-0"
                  value={formData.identity}
                  onChange={handleInputChange}
                  name="identity"
                  maxLeng={11}
                  isRequired={true}
                />
                <div
                  className={` absolute   bottom-3 right-6 text-sm ${
                    formData.identity?.length > 10
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.identity ? formData.identity.length : 0}/11
                </div>
                {errorRequired.identity && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.identity}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex font-bold text-xl gap-1">
                  {t("form.activity")}
                  <span className="text-red-500 text-sm block mt-1"> *</span>
                </div>
                <Select
                  value={formData.activity}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Seleccione una actividad"} />
                  </SelectTrigger>
                  <SelectContent>
                    {optionSelect.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errorRequired.activity && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.activity}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex font-bold text-xl gap-1">
                {t("form.message")}
                <span className="text-red-500 text-sm block mt-1"> *</span>
              </div>
              <div className="relative">
                <Textarea
                  value={formData.message}
                  onChange={handleTextAre}
                  name="message"
                  maxLength={1000}
                ></Textarea>

                <div
                  className={` absolute   bottom-3 right-6 text-sm ${
                    formData.message?.length > 950
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.message ? formData.message.length : 0}/1000
                </div>
              </div>
              {errorRequired.message && (
                <span className=" text-red-500 text-sm block min-h-3 mb-1">
                  {errorRequired.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className=" z-30 bg-blue-950 w-full py-5 text-xl text-white font-bold text-center rounded-xl cursor-pointer"
            >
              {t("form.button")}
            </button>
          </form>
        </div>
      </section>
      <section className="flex justify-center items-center py-10">
        <div className="w-10/12 sm:w-8/12 flex flex-col gap-10">
          <div className="text-center text-blue-950">
            <h1 className="font-bold text-4xl">{t("contactInfo.title")}</h1>
            <p className="text-lg text-gray-500">
              {t("contactInfo.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {cards.map((card: any, index: number) => (
              <ContactCard
                key={index}
                title={card.title}
                description={card.description}
                info={card.info}
                link={card.link}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex justify-center py-10">
        <div className="w-10/12 flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row justify-between">
            <div className="text-blue-950 sm:w-10/12">
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                {t("regionalOffices.title")}
              </h1>
              <p>{t("regionalOffices.description")}</p>
            </div>
            <Select value={activeMarker.province} onValueChange={handleclick}>
              <SelectTrigger
                value={activeMarker.province}
                className="h-16 flex justify-between items-center gap-3 text-base font-normal capitalize tracking-normal px-3 hover:text-gray-300 hover:bg-blue-dark bg-blue-dark text-white"
              >
                <SelectValue
                  className="text-white"
                  placeholder={activeMarker.province}
                />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch: any, index: number) => (
                  <SelectItem
                    key={index}
                    value={branch.province}
                    onClick={() => {
                      setActiveMarker(branches[index]);
                    }}
                    placeholder={undefined}
                  >
                    {branch.province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col xl:flex-row gap-10">
            <div className="w-full h-[80vh] relative">
              <GoogleMap activeMarker={activeMarker} />
              <div className="w-full sm:w-10/12 xl:w-3/12 h-min bg-white rounded-xl p-5 absolute inset-0 sm:m-3 xl:m-5 border-2 border-gray-200">
                <h1 className="text-xl text-red-700 font-bold">
                  {activeMarker.province}
                </h1>
                <p className="text-gray-400 text-sm">{activeMarker.address}</p>
                <p className="text-red-700 font-semibold">{`Tel: ${activeMarker.phone}`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  maxLeng,
  isRequired,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maxLeng?: number;
  isRequired?: boolean;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex font-bold text-xl gap-1">
        {label}
        {isRequired && (
          <span className="text-red-500 text-sm block mt-1"> *</span>
        )}
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

function ContactCard({ title, description, info, link, icon }: any) {
  return (
    <Link
      href={link}
      target="_blank"
      className="border-2 border-gray-200 hover:bg-blue-950 hover:border-blue-950 duration-300 h-72 p-4 flex flex-col justify-between rounded-2xl group"
    >
      <div className="flex border-2 border-gray-200 p-2 gap-2 items-center rounded-md size-12">
        {React.createElement(icon, {
          strokeWidth: 2,
          className: "text-black group-hover:text-white",
        })}
      </div>
      <div className="flex flex-col h-3/6 justify-between">
        <div>
          <div className="font-bold text-lg text-black group-hover:text-white">
            {title}
          </div>
          <div className="text-gray-500 text-sm group-hover:text-gray-200">
            {description}
          </div>
        </div>
        <div className="text-black font-bold group-hover:underline group-hover:text-white break-words">
          {info}
        </div>
      </div>
    </Link>
  );
}

function GoogleMap(activeMarker: any) {
  const coords = activeMarker.activeMarker.coords;
  return (
    <Map
      mapId={"fbaf3dc9f8865313"}
      defaultZoom={15}
      defaultCenter={coords}
      style={{ borderRadius: "1rem" }}
      zoomControl
      disableDefaultUI
    >
      <AdvancedMarker position={coords}>
        <Pin scale={2} />
      </AdvancedMarker>
    </Map>
  );
}

function ModalCard({
  isOpen,
  codeContact,
  onClose,
}: {
  isOpen: boolean;
  codeContact: string;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[80vw] md:max-w-3xl lg:max-w-4xl xl:max-w-2xl relative">
            {/* Botón de cerrar (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Icono central */}
            <div className="flex justify-center mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-950"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Contenido del mensaje */}
            <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-left">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-justify">
                Distinguido cliente, su solicitud ha sido recibida
                satisfactoriamente. La misma estará siendo asignada al personal
                correspondiente para atenderle. En caso de requerir información
                adicional, favor contactar al Centro de Atención al Cliente al
                correo electrónico{" "}
                <strong>servicios@prodominicana.gob.do</strong> o al teléfono de
                WhatsApp (809) 530-5505. En ProDominicana estamos para servirle.
              </p>

              <div className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold text-center">
                Su código de solicitud es:{" "}
                <span className="text-blue-600 font-bold">{codeContact}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
