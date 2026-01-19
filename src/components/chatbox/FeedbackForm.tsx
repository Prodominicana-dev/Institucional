"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { createFeedback } from "@/services/feedback/service";
import {
  Select,
  SelectContent,
  SelectItem,
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

export default function FeedbackForm({
  serviceId,
  serviceName,
  serviceType,
}: {
  serviceId?: string;
  serviceName?: string;
  serviceType?: string;
} = {}) {
  const t = useTranslations("feedback");
  const [isOpen, setIsOpen] = useState(false);
  const [randomCode, setRandomCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });
  const [errorRequired, setErrorRequired] = useState<{
    name?: string;
    email?: string;
    rating?: string;
    message?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      rating?: string;
      message?: string;
    } = {};

    if (!formData.name || formData.name.trim() === "") {
      errors.name = "El nombre es obligatorio.";
    }

    if (!formData.email || formData.email.trim() === "") {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido.";
    }

    if (!formData.rating) {
      errors.rating = "La valoración es obligatoria.";
    }

    if (!formData.message || formData.message.trim() === "") {
      errors.message = "El mensaje es obligatorio.";
    } else if (formData.message.length > 500) {
      errors.message = "El mensaje no puede exceder los 500 caracteres.";
    }

    setErrorRequired(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearDataForm = () => {
    setFormData({
      name: "",
      email: "",
      rating: "",
      message: "",
    });
    setErrorRequired({});
  };

  const generateCode = () => {
    const randomNumbers = Math.floor(Math.random() * 9000) + 1000;
    return randomNumbers.toString();
  };

  const onClose = () => {
    setIsOpen(false);
    clearDataForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const contactCode = generateCode();
      setRandomCode(contactCode);
      
      const feedbackData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        rating: parseInt(formData.rating),
        serviceId: serviceId || null,
        serviceName: serviceName || null,
        serviceType: serviceType || null,
      };
      
      await createFeedback(feedbackData, contactCode, clearDataForm);
      setIsOpen(true);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <ModalCard isOpen={isOpen} codeContact={randomCode} onClose={onClose} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
            <span className="text-3xl">👋</span>
            {t("title")}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{t("description")}</p>
        </div>

        {/* Campo Nombre */}
        <div className="w-full">
          <FormInput
            label={t("form.nameOrAlias")}
            placeholder="Juan Pérez"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            maxLength={100}
          />
          {errorRequired.name && (
            <span className="text-red-500 text-xs block mt-1">
              {errorRequired.name}
            </span>
          )}
        </div>

        {/* Campo Email */}
        <div className="w-full">
          <FormInput
            label="Correo electrónico"
            placeholder="juan@ejemplo.com"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            type="email"
            maxLength={100}
          />
          {errorRequired.email && (
            <span className="text-red-500 text-xs block mt-1">
              {errorRequired.email}
            </span>
          )}
        </div>

        {/* Campo Valoración */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex font-bold text-sm gap-1">
            {t("form.rating")}
            <span className="text-red-500 text-xs"> *</span>
          </div>
          <Select value={formData.rating} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("form.ratingPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">{t("form.ratingOptions.5")}</SelectItem>
              <SelectItem value="4">{t("form.ratingOptions.4")}</SelectItem>
              <SelectItem value="3">{t("form.ratingOptions.3")}</SelectItem>
              <SelectItem value="2">{t("form.ratingOptions.2")}</SelectItem>
              <SelectItem value="1">{t("form.ratingOptions.1")}</SelectItem>
            </SelectContent>
          </Select>
          {errorRequired.rating && (
            <span className="text-red-500 text-xs block mt-1">
              {errorRequired.rating}
            </span>
          )}
        </div>

        {/* Campo Mensaje */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex font-bold text-sm gap-1">
            {t("form.testimony")}
            <span className="text-red-500 text-xs"> *</span>
          </div>
          <div className="relative">
            <Textarea
              value={formData.message}
              onChange={handleTextAreaChange}
              name="message"
              maxLength={500}
              className="min-h-[120px]"
              placeholder="Cuéntanos tu experiencia..."
            />
            <div
              className={`absolute -bottom-1 right-2 text-xs ${
                formData.message.length > 450
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {formData.message.length}/500 {t("form.characterCount")}
            </div>
          </div>
          {errorRequired.message && (
            <span className="text-red-500 text-xs block mt-1">
              {errorRequired.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 w-full py-3 text-white font-bold text-center rounded-xl cursor-pointer transition-colors duration-300 mt-2"
        >
          {t("form.button")}
        </button>
      </form>
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
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maxLength?: number;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex font-bold text-sm gap-1">
        {label}
        <span className="text-red-500 text-xs"> *</span>
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
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
                ¡Gracias por compartir tu experiencia con nosotros!
              </DialogTitle>
              <DialogDescription>
                Tu opinión es muy valiosa y nos ayuda a mejorar nuestros
                servicios continuamente.
              </DialogDescription>
              <div className="space-y-2 text-sm">
                <p>
                  Tu código de confirmación es:{" "}
                  <span className="text-red-700 font-bold">{codeContact}</span>
                </p>
                <p>
                  Si tienes alguna pregunta adicional, no dudes en contactarnos
                  a través de{" "}
                  <strong>servicios@prodominicana.gob.do</strong> o por
                  WhatsApp al <strong>(809) 530-5505</strong>.
                </p>
                <strong className="pt-2 block">
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
