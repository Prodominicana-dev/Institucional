"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Textarea,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { createServiceForm } from "@/services/servicesForm/service";

interface DialogProps {
  open: boolean;
  handleOpen: () => void;
  handler: () => void;
}
export function ServicesFormDiag({ open, handleOpen, handler }: DialogProps) {
  const t = useTranslations("navbar");
  const [searchOption, setSearchOption] = useState("");
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
    " Reunión Virtual",
    " Reunión Presencial",
  ];

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
      contact: value || "",
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
      name: "",
      lastName: "",
      email: "",
      message: "",
      contact: "",
      Phone: "",
      id: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createServiceForm(formData, cleardataForm);
    // await createServiceUser(formData.email);
    handler();
    handleOpen();
  };

  const filteredOptions = optionSelect.filter((option) =>
    option.toLowerCase().includes(searchOption.toLowerCase())
  );

  const handleSearchChange = (e: any) => {
    setSearchOption(e.target.value);
  };

  const handleClose = () => {
    // setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-6 bg-white rounded-lg"
      >
        <DialogBody
          className="p-5 lg:p-10 max-h-[80vh] h-auto overflow-y-auto scrollbar-none text-pretty"
          style={{ scrollbarWidth: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between items-center">
              <div className="flex flex-col w-11/12 lg:w-full">
                <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-red-700 break-words">
                  {t("services.formTitle")}
                </h1>
              </div>
              <div className="w-1/12 flex justify-end">
                <button onClick={handleOpen}>
                  <XMarkIcon className="text-red-700 size-8 hover:text-red-700/80 duration-300" />
                </button>
              </div>
            </div>

            <section className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-center py-7 gap-10 items-stretch">
              {/* <Image
                width={1000}
                height={1000}
                src={"/images/prodominicanabuilding.jpg"}
                alt=""
                className="rounded-lg object-cover w-full lg:w-5/12"
              /> */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 py-2 text-blue-950 w-full lg:w-7/12"
              >
                {/* 
                <div>
                  <h1 className="text-3xl font-extrabold">
                    {t("services.formTitle")}
                  </h1>
                </div> */}

                <div className="flex flex-col sm:flex-row gap-5">
                  <FormInput
                    label={t("services.Name")}
                    placeholder="John"
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                  <FormInput
                    label={t("services.LastName")}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <FormInput
                    label={t("services.Phone")}
                    placeholder={t("services.Phone")}
                    value={formData.Phone}
                    onChange={handleInputChange}
                    name="Phone"
                  />
                  <FormInput
                    label={t("services.Email")}
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                </div>

                <FormInput
                  label={t("services.Id")}
                  placeholder={t("services.Id")}
                  value={formData.id}
                  onChange={handleInputChange}
                  name="id"
                />

                <div className="flex flex-col gap-2">
                  <div className="font-bold text-xl">
                    {t("services.Select")}
                  </div>
                  <Select
                    className="!border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                    value={formData.contact}
                    onChange={handleSelectChange}
                    onInput={handleSearchChange}
                  >
                    {filteredOptions.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="font-bold text-xl">
                    {t("services.Message")}
                  </div>
                  <Textarea
                    className="w-full h-40 border-t-blue-gray-200 focus:border-t-blue-950 bg-white scrollbar-none"
                    value={formData.message}
                    onChange={handleTextAre}
                    name="message"
                    style={{ scrollbarWidth: "none" }}
                  ></Textarea>
                </div>

                <button
                  type="submit"
                  className="bg-red-700 w-full py-4 text-xl text-white font-bold text-center rounded-lg"
                >
                  {t("services.Btn")}
                </button>
              </form>
            </section>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

function FormInput({ label, placeholder, value, onChange, name }: any) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="font-bold text-xl">{label}</div>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
        containerProps={{ className: "h-12" }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        crossOrigin={undefined}
      />
    </div>
  );
}
