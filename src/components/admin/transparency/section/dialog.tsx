"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Montserrat } from "next/font/google";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const monserratStyle = Montserrat({ subsets: ["latin"] });
var CryptoJS = require("crypto-js");

const typeOptions = [
  { value: "document", label: "Documento" },
  { value: "url", label: "URL" },
];
export function SectionDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
    handler();
    const data = {
      name,
      description,
    };

    const userIdEncrypted = CryptoJS.AES.encrypt(
      user?.sub,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/section`, data, {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          notifications.show({
            id: "section",
            autoClose: 5000,
            withCloseButton: false,
            title: "Producto creado",
            message: "El producto ha sido creado correctamente.",
            color: "green",
            loading: false,
          });
          handler();
          update();
        }
        if (res.status === 500) {
          notifications.show({
            id: "section",
            autoClose: 5000,
            withCloseButton: false,
            title: "Error",
            message: "Hubo un error creando la nueva sección.",
            color: "red",
            loading: false,
          });
        }
        if (res.status === 401) {
          notifications.show({
            id: "section",
            autoClose: 5000,
            withCloseButton: false,
            title: "Usuario inautorizado",
            message: "No tienes permisos para crear una sección.",
            color: "red",
            loading: false,
          });
        }
      });
  };

  return (
    <>
      <Dialog
        placeholder={false}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
          placeholder={false}
          className="font-semibold "
          style={monserratStyle.style}
        >
          Agregar sección
        </DialogHeader>
        <DialogBody
          placeholder={false}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[40vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Nombre
            </label>
            <Input
              crossOrigin={""}
              id="name"
              className="w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la sección"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Descripción{" "}
              <span className="font-normal text-xs italic">(?)</span>
            </label>
            <Textarea
              size="md"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <label className="text-black text-xs font-light italic text-right">
            (?) = Opcional
          </label>
        </DialogBody>
        <DialogFooter
          placeholder={false}
          style={monserratStyle.style}
          className="space-x-4"
        >
          <button
            onClick={handler}
            className="w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl"
          >
            Confirmar
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
