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

export default function FeedbackPage() {
  const t = useTranslations("feedback");
  const [isOpen, setIsOpen] = useState(false);
  const [randomCode, setRandomCode] = useState("");
  const [formData, setFormData] = useState({
    nameOrAlias: "",
    rating: "",
    testimony: "",
  });
  const [errorRequired, setErrorRequired] = useState<{
    nameOrAlias?: string;
    rating?: string;
    testimony?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      nameOrAlias?: string;
      rating?: string;
      testimony?: string;
    } = {};

    if (!formData.nameOrAlias || formData.nameOrAlias.trim() === "") {
      errors.nameOrAlias = "El nombre o alias es obligatorio.";
    }

    if (!formData.rating) {
      errors.rating = "La valoración es obligatoria.";
    }

    if (!formData.testimony || formData.testimony.trim() === "") {
      errors.testimony = "El testimonio es obligatorio.";
    } else if (formData.testimony.length > 500) {
      errors.testimony = "El testimonio no puede exceder los 500 caracteres.";
    }

    setErrorRequired(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      nameOrAlias: "",
      rating: "",
      testimony: "",
    });
    setErrorRequired({});
  };

  const generateCode = () => {
    const randomNumbers = Math.floor(Math.random() * 9000) + 1000;
    return randomNumbers.toString();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setIsOpen(true);
      const contactCode = generateCode();
      setRandomCode(contactCode);
      await createFeedback(formData, contactCode, clearDataForm);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ModalCard isOpen={isOpen} codeContact={randomCode} onClose={onClose} />
      <section className="flex justify-center py-10 md:py-20">
        <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 py-2 text-blue-950 bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 justify-center md:justify-start">
                <span className="text-4xl">👋</span>
                {t("title")}
              </h1>
              <p className="font-semibold text-gray-600 mt-2">
                {t("description")}
              </p>
            </div>

            {/* Campo Nombre/Alias */}
            <div className="w-full">
              <FormInput
                label={t("form.nameOrAlias")}
                placeholder="John Doe"
                value={formData.nameOrAlias}
                onChange={handleInputChange}
                name="nameOrAlias"
                maxLength={100}
              />
              {errorRequired.nameOrAlias && (
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.nameOrAlias}
                </span>
              )}
            </div>

            {/* Campo Valoración */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex font-bold text-xl gap-1">
                {t("form.rating")}
                <span className="text-red-500 text-sm block mt-1"> *</span>
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
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.rating}
                </span>
              )}
            </div>

            {/* Campo Testimonio */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex font-bold text-xl gap-1">
                {t("form.testimony")}
                <span className="text-red-500 text-sm block mt-1"> *</span>
              </div>
              <div className="relative">
                <Textarea
                  value={formData.testimony}
                  onChange={handleTextAreaChange}
                  name="testimony"
                  maxLength={500}
                  className="min-h-[150px]"
                  placeholder="Cuéntanos tu experiencia..."
                />
                <div
                  className={`absolute -bottom-1 right-2 text-sm ${
                    formData.testimony.length > 450
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {formData.testimony.length}/500 {t("form.characterCount")}
                </div>
              </div>
              {errorRequired.testimony && (
                <span className="text-red-500 text-sm block mt-1">
                  {errorRequired.testimony}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full py-5 text-xl text-white font-bold text-center rounded-xl cursor-pointer transition-colors duration-300 mt-4"
            >
              {t("form.button")}
            </button>
          </form>
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
      <div className="flex font-bold text-xl gap-1">
        {label}
        <span className="text-red-500 text-sm block mt-1"> *</span>
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
              <DialogDescription className="sr-only">
                Confirmación de feedback recibido
              </DialogDescription>
              <div className="space-y-2">
                <p>
                  Tu código de confirmación es:{" "}
                  <span className="text-blue-600 font-bold">{codeContact}</span>
                </p>
                <p>
                  Tu opinión es muy valiosa y nos ayuda a mejorar nuestros
                  servicios continuamente.
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
