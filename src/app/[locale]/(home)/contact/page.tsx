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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      coords: { lat: 18.61098807140629, lng: -68.71606843741897 },
    },
    {
      province: "La Vega",
      phone: "+1 829 891 0304",
      address:
        "Calle Gral. Juan Rodríguez 94, Plaza Jiminián, Apto. 1-01, La Vega.",
      coords: { lat: 19.22522539119475, lng: -70.52889583295625 },
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
      coords: { lat: 19.203903397906313, lng: -69.3310103498061 },
    },
    {
      province: "San Cristóbal",
      phone: "+1 829 344 7799",
      address: "Av. Constitución 95, San Cristóbal.",
      coords: { lat: 18.41688617465356, lng: -70.1110930245643 },
    },
    {
      province: "La Romana",
      phone: "+1 829 796 5943",
      address: "Maria Teresa Toda 12, La Romana.",
      coords: { lat: 18.433012666375834, lng: -68.96684614600241 },
    },
    {
      province: "Puerto Plata",
      phone: "+1 849 286 5003",
      address: "Calle Beller 17, San Felipe de Puerto Plata.",
      coords: { lat: 19.798600441642346, lng: -70.69454200859732 },
    },
    {
      province: "Peravia",
      phone: "+1 849 360 1003",
      address:
        "Calle Canela Mota Edificio para Oficinas Gubernamentales Esq, Av. Pdte. Billini, Bani.",
      coords: { lat: 18.278500359380065, lng: -70.32791466195678 },
    },
    {
      province: "Espaillat",
      phone: "+1 829 504 1266",
      address: "Calle Hostos 9, Moca.",
      coords: { lat: 19.396416947175727, lng: -70.52008970748811 },
    },
    {
      province: "Hato Mayor",
      phone: "+1 829 451 4350",
      address: "Av. Melchor Contin Alfau 7, A-R Plaza Centro, Hato Mayor.",
      coords: { lat: 18.763600381020073, lng: -69.25707465860688 },
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
      coords: { lat: 19.37367974178023, lng: -69.85338053315013 },
    },
    {
      province: "Hermanas Mirabal",
      phone: "+1 849 276 1414",
      address: "Calle Duarte 1, Salcedo.",
      coords: { lat: 19.37904453473489, lng: -70.41742578683291 },
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
      await createcontact(formData, contactCode, cleardataForm);
    }
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
            className="flex flex-col gap-5 py-2 text-blue-950 xl:w-6/12 w-full  pt-10 md:pt-10 xl:pt-0"
          >
            <div>
              <h1 className="text-4xl font-extrabold">{t("title")}</h1>
              <p className="font-semibold">{t("description")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full relative ">
                <FormInput
                  label={t("form.name")}
                  placeholder="John"
                  value={formData.nameF}
                  onChange={handleInputChange}
                  name="nameF"
                  maxLeng={50}
                  isRequired={true}
                />
                <div
                  className={` absolute -bottom-1 right-2 text-sm ${
                    formData.nameF?.length > 45
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.nameF ? formData.nameF.length : 0}/50
                </div>

                {errorRequired.nameF && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.nameF}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <FormInput
                  label={t("form.lastName")}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  maxLeng={50}
                  isRequired={true}
                />
                <div
                  className={` absolute -bottom-1 right-2 text-sm ${
                    formData.lastName?.length > 45
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.lastName ? formData.lastName.length : 0}/50
                </div>
                {errorRequired.lastName && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full relative ">
              <FormInput
                label={t("form.email")}
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                maxLeng={100}
                isRequired={true}
              />
              <div
                className={` absolute -bottom-1 right-2 text-sm ${
                  formData.email?.length > 95 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {formData.email ? formData.email.length : 0}/100
              </div>
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
                  className={`  absolute -bottom-1 right-2 text-sm ${
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
                  className={`  absolute -bottom-1 right-2 text-sm ${
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
            <p className="text-sm text-gray-500 mt-2">
              Los campos marcados con <span className="text-red-500">*</span>{" "}
              son obligatorios.
            </p>
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
            <Select
              value={activeMarker.province}
              onValueChange={(province) => {
                const selectedBranch = branches.find(
                  (b) => b.province === province
                );
                if (selectedBranch) {
                  setActiveMarker(selectedBranch);
                }
              }}
            >
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
                {branches
                  .slice() // Para no mutar el array original
                  .sort((a, b) => a.province.localeCompare(b.province))
                  .map((branch: any, index: number) => (
                    <SelectItem key={index} value={branch.province}>
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
        maxLength={maxLeng}
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
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="[&>button]:cursor-pointer">
            <DialogHeader>
              <DialogTitle>
                Distinguido Usuario, su solicitud ha sido recibida
                satisfactoriamente.
              </DialogTitle>
              <DialogDescription className="sr-only">
                Confirmación de solicitud de contacto recibida
              </DialogDescription>
              <div className="space-y-2">
                <p>
                  Su código de solicitud es:{" "}
                  <span className="text-blue-600 font-bold">{codeContact}</span>
                  .
                </p>
                <p>
                  El tiempo estimado para la entrega del resultado es de{" "}
                  <strong>3 a 7 días laborables</strong>.
                </p>
                <p>
                  Nos comunicaremos con usted a través de{" "}
                  <strong>[correo electrónico / teléfono / WhatsApp]</strong>{" "}
                  para informarle sobre el estatus de su caso.
                </p>
                <p>
                  Si desea contactarnos, puede hacerlo a través del correo{" "}
                  <strong>servicios@prodominicana.gob.do</strong> o por WhatsApp
                  al <strong>(809) 530-5505</strong>.
                </p>
                <p>
                  Puede consultar nuestras políticas de privacidad y seguridad
                  en el siguiente enlace:{" "}
                  <Link
                    href="/politicas-de-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Políticas de privacidad
                  </Link>
                  .
                </p>
                <strong className="pt-2">
                  En ProDominicana estamos para servirle.
                </strong>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
