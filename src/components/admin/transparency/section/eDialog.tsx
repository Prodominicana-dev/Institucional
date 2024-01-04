"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { Montserrat } from "next/font/google";
import { editSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Select from "react-select";
import { Section } from "@/models/section";

const monserratStyle = Montserrat({ subsets: ["latin"] });

export function EditSectionDialog({
  section,
  open,
  handler,
  update,
}: {
  section: Section;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(true);
  const [uploadData, setUploadData] = useState(false);

  const statusOption = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  useEffect(() => {
    if (section) {
      setName(section.name || "");
      setDescription(section.description || "");
      setPriority(section.priority || 1);
      setStatus(section.status || true);
    }
  }, [section]);

  const handleSubmit = () => {
    handleUpload();
    console.log(handleUpload());
    if (user && !isLoading) {
      const data = {
        name,
        description: description,
        priority: priority,
        status: status,
      };

      editSection(
        Number(section.id),
        data,
        handler,
        update,
        user.sub as string
      );
      setTimeout(() => {
        handleUpload();
      }, 5000);
    }
  };
  const handleUpload = () => {
    setUploadData(!uploadData);
    console.log(uploadData);
  };

  const handleStatus = (e: any) => {
    console.log(e);
    setStatus(e.value);
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
          Editar sección
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
              defaultValue={name}
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
              defaultValue={description}
            />
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-6/12">
              <label
                htmlFor="name"
                className="font-semibold text-black text-lg"
              >
                Prioridad{" "}
                <span className="font-normal text-xs italic">(?)</span>
              </label>
              <Input
                crossOrigin={""}
                id="name"
                className="w-full"
                type="number"
                onChange={(e) => setPriority(e.target.valueAsNumber)}
                placeholder="Prioridad de esta sección"
                defaultValue={priority}
              />
            </div>
            <div className="flex flex-col w-6/12">
              <label
                htmlFor="name"
                className="font-semibold text-black text-lg"
              >
                Estado <span className="font-normal text-xs italic">(?)</span>
              </label>
              <Select
                id="subsection"
                className="w-full"
                maxMenuHeight={100}
                menuPlacement="auto"
                options={statusOption}
                defaultValue={statusOption[0]}
                onChange={(e) => handleStatus(e)}
              />
            </div>
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
            disabled={uploadData}
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl justify-center flex items-center"
          >
            {uploadData ? <Spinner /> : "Confirmar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
