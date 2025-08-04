"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { createServiceForm } from "@/services/servicesForm/service";
import Link from "next/link";

interface DialogProps {
  open: boolean;
  handleOpen: () => void;
  handler: () => void;
}

export function ServicesFormDiag({ open, handleOpen, handler }: DialogProps) {
  const t = useTranslations("navbar");
  const [searchOption, setSearchOption] = useState("");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [radomN, setRadomN] = useState("");

  const [errorRequired, setErrorRequired] = useState<{
    name?: string;

    lastName?: string;

    email?: string;
    message?: string;

    contact?: string;

    Phone?: string;

    id?: string;
  }>({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
    contact: "",
    Phone: "",
    id: "",
  });

  const optionSelect = [
    "Teléfono",
    "Correo electrónico",
    "Reunión Virtual",
    "Reunión Presencial",
  ];

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ValidateFunc = () => {
    const RequiredErr: {
      name?: string;

      lastName?: string;

      email?: string;

      message?: string;

      contact?: string;

      Phone?: string;

      id?: string;
    } = {};

    if (!formData.name) {
      RequiredErr.name = "El nombre es obligatorio.";
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

    if (!formData.message) {
      RequiredErr.message = "El mensaje es obligatorio.";
    }

    if (!formData.contact) {
      RequiredErr.contact = "El contacto es obligatoria.";
    }

    if (!formData.Phone) {
      RequiredErr.Phone = "La Preferencia de contacto es obligatoria.";
    }

    if (!formData.id) {
      RequiredErr.id = "Cedula o RNC obligatorio.";
    } else if (formData.id.length < 11) {
      RequiredErr.id = "La Cedula o RNC debe tener al menos 11 caracteres.";
    }

    setErrorRequired(RequiredErr);

    return Object.keys(RequiredErr).length === 0;
  };

  const cleardataForm = () => {
    setFormData({
      name: "",
      lastName: "",
      email: "",
      message: "",
      contact: "",
      Phone: "",
      id: "",
    });
  };

  function generar4Digitos() {
    const randomNumerbers = Math.floor(Math.random() * 9000) + 1000;
    return randomNumerbers.toString();
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (submitted) return;
    const validaForm = ValidateFunc();
    if (validaForm) {
      // console.log("formData", formData)
      setSubmitted(true);
      const contactCode = generar4Digitos();
      setRadomN(contactCode);
      await createServiceForm(formData, cleardataForm, contactCode);
      setStep(2);
    }
  };
  if (!open) return null;

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl mx-auto px-4`}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-700">
            {t("services.formTitle")}
          </h2>
          <button onClick={handleOpen}>
            <XMarkIcon className="text-red-700 size-6 hover:text-red-700/80 cursor-pointer" />
          </button>
        </div>

        {step === 1 && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-blue-950"
          >
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md border border-gray-300 shadow-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-semibold text-sm">
                {step}
              </div>
              <div className="text-sm text-gray-800">
                <span className="font-medium">Paso {step} de 2:</span> Completa
                el formulario para enviar tu solicitud.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full relative">
                <FormInput
                  label={
                    <>
                      {t("services.Name")}
                      <span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="John"
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                  maxLength={50}
                />
                <div
                  className={`absolute right-3.5   -translate-y-2/2 text-sm pointer-events-none ${
                    formData.name?.length > 45
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.name ? formData.name.length : 0}/50
                </div>

                {errorRequired.name && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.name}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <FormInput
                  label={
                    <>
                      {t("services.LastName")}
                      <span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  maxLength={50}
                />

                <div
                  className={`absolute right-3.5  -translate-y-2/2 text-sm pointer-events-none ${
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

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full relative">
                <FormInput
                  label={
                    <>
                      {t("services.Phone")}
                      <span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder={t("services.Phone")}
                  value={formData.Phone}
                  onChange={handleInputChange}
                  name="Phone"
                  maxLength={12}
                />

                <div
                  className={`absolute right-3.5  -translate-y-2/2 text-sm pointer-events-none ${
                    formData.Phone?.length > 10
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.Phone ? formData.Phone.length : 0}/12
                </div>

                {errorRequired.Phone && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errorRequired.Phone}
                  </span>
                )}
              </div>

              <div className="w-full relative">
                <FormInput
                  label={
                    <>
                      {t("services.Email")}
                      <span className="text-red-500 ml-1">*</span>
                    </>
                  }
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  maxLength={100}
                />
                <div
                  className={`absolute right-3.5  -translate-y-2/2 text-sm pointer-events-none ${
                    formData.email?.length > 95
                      ? "text-red-500"
                      : "text-gray-500"
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
            </div>
            {/* ID */}
            <div className="w-full relative">
              <FormInput
                label={
                  <>
                    {t("services.Id")}
                    <span className="text-red-500 ml-1">*</span>
                  </>
                }
                placeholder={t("services.Id")}
                value={formData.id}
                onChange={handleInputChange}
                name="id"
                maxLength={11}
              />

              {/* Contador dentro del input, pegado al borde derecho */}
              <div
                className={`absolute right-4  -translate-y-2/2 text-sm pointer-events-none ${
                  formData.id?.length > 10 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {formData.id ? formData.id.length : 0}/11
              </div>

              {/* Validación de error */}
              {errorRequired.id && (
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.id}
                </span>
              )}
            </div>

            {/* Select */}
            <div className="flex flex-col gap-2">
              <div className=" relative flex ">
                <label className="font-bold text-xl">
                  {t("services.Select")}
                </label>
                <span className="text-red-500 ml-1 text-xl font-bold">*</span>
              </div>

              <select
                name="contact"
                value={formData.contact}
                onChange={(e) => {
                  setSearchOption(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    contact: e.target.value,
                  }));
                }}
                className="border px-3 py-2 rounded bg-white"
              >
                {!formData.contact && (
                  <option value="" disabled>
                    Seleccionar...
                  </option>
                )}

                {optionSelect.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errorRequired.contact && (
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.contact}
                </span>
              )}
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2 relative">
              <div className=" relative flex ">
                <label className="font-bold text-xl">
                  {t("services.Message")}
                </label>
                <span className="text-red-500 ml-1 text-xl font-bold">*</span>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded h-40 resize-none"
                maxLength={1000}
              />
              <div
                className={` absolute   -bottom-5 right-1 text-sm -translate-y-2/2 ${
                  formData.message?.length > 950
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {formData.message ? formData.message.length : 0}/1000
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

            {/* Botón */}
            <button
              type="submit"
              className="bg-red-700 w-full py-4 text-xl text-white font-bold text-center rounded-lg hover:bg-red-800 transition cursor-pointer"
            >
              {t("services.Btn")}
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="text-center text-blue-900 space-y-4">
            <p className="text-green-600 text-xl font-bold">
              ✅ Paso 2 de 2 completado
            </p>
            <p>
              Su solicitud fue enviada correctamente. Pronto recibirá una
              confirmación por correo electrónico.
            </p>
            <p>
              Su código de solicitud es:{" "}
              <span className="text-blue-600 font-bold">{radomN}</span>.
            </p>
            <p>
              El tiempo estimado para la entrega del resultado es de{" "}
              <strong>3 a 7 días laborables</strong>.
            </p>
            <p>
              Nos comunicaremos con usted a través de{" "}
              <strong>[correo electrónico / teléfono / WhatsApp]</strong> para
              informarle sobre el estatus de su caso.
            </p>
            <p>
              Si desea contactarnos, puede hacerlo a través del correo{" "}
              <strong>servicios@prodominicana.gob.do</strong> o por WhatsApp al{" "}
              <strong>(809) 530-5505</strong>.
            </p>
            <p>
              Puede consultar nuestras políticas de privacidad y seguridad en el
              siguiente enlace:{" "}
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
            <p>
              Para completar su solicitud, asegúrese de haber enviado todos los
              documentos requeridos.
            </p>
            <strong className="pt-2">
              En ProDominicana estamos para servirle.
            </strong>

            <button
              onClick={() => {
                handler();
                handleOpen();
              }}
              className="mt-4 px-6 py-3 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition duration-200 cursor-pointer flex flex-row items-center justify-center mx-auto"
            >
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  maxLength,
}: {
  label: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maxLength?: number;
}) {
  return (
    <div className="w-full flex flex-col gap-2 ">
      <label className="font-bold text-xl">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded bg-white"
        maxLength={maxLength}
      />
    </div>
  );
}
