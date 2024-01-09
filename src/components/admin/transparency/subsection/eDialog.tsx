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
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Chip,
  Spinner,
} from "@material-tailwind/react";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import {
  createSubsection,
  editSubsection,
  useSectionSubsAdmin,
} from "@/services/subsection/service";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Subsection } from "@/models/subsection";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export function SubsectionEditDialog({
  subsection,
  open,
  handler,
  update,
}: {
  subsection: Subsection;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, refetch, isLoading: dataLoaded } = useSectionSubsAdmin();
  const [refresh, setRefresh] = useState(false);
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);
  const [openPopover, setOpenPopover] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionLoading, setSectionLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (data && !dataLoaded) {
      setSection(data);
      setName(subsection.name || "");
      setDescription(subsection.description || "");
      setSectionId(subsection.sectionId || "");
    }
  }, [data, dataLoaded]);

  const handleSectionRefresh = () => {
    setRefresh(!refresh);
  };

  const handlePopOver = () => {
    setOpenPopover(!openPopover);
  };

  useEffect(() => {
    refetch().then((e: any) => {
      setSection(e.data);
    });
  }, [refresh]);

  const handleSectionSubmit = () => {
    setSectionLoading(true);
    if (user) {
      const data = {
        name: sectionName,
        description: sectionDescription,
      };
      createSection(data, handleSectionRefresh, user.sub as string).then(() => {
        setTimeout(() => {
          setSectionLoading(false);
          setSectionName("");
          setSectionDescription("");
          handlePopOver();
        }, 1000);
      });
    }
  };
  const handleSubmit = () => {
    setDataLoading(true);
    if (user && !isLoading) {
      handler();
      const data = {
        name,
        description,
        sectionId,
      };
      editSubsection(
        subsection.id as string,
        data,
        update,
        user.sub as string
      ).then(() => {
        setTimeout(() => {
          setDataLoading(false);
          setName("");
          setDescription("");
          handler();
        }, 1000);
      });
    }
  };
  const statusOption = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  const sectionTriggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
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
          Agregar Subsección
        </DialogHeader>
        <DialogBody
          placeholder={false}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[40vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-6/12">
              <label className="font-semibold text-black text-lg">Nombre</label>
              <Input
                crossOrigin={""}
                id="name"
                className="w-full"
                type="text"
                placeholder="Nombre de la subsección"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name}
              />
            </div>
            <div className="flex flex-row justify-end items-end space-x-4 w-6/12">
              <div className="flex flex-col w-10/12">
                <label
                  htmlFor="name"
                  className="font-semibold text-black text-lg"
                >
                  Sección{" "}
                  <span className="font-normal text-xs italic">(?)</span>
                </label>
                <Select
                  placeholder="Seleccione..."
                  id="subsection"
                  className="w-full"
                  maxMenuHeight={100}
                  options={section}
                  onChange={(e) => {
                    setSectionId(e?.value as string);
                  }}
                  defaultValue={section.find((e) => e.value === sectionId)}
                  value={section.find((e) => e.value === sectionId)}
                />
              </div>
              <Popover
                open={openPopover}
                handler={setOpenPopover}
                placement="bottom"
              >
                <PopoverHandler {...sectionTriggers}>
                  <div
                    style={monserratStyle.style}
                    className="w-2/12 h-10 bg-blue-dark rounded-lg text-white flex items-center justify-center hover:cursor-pointer"
                  >
                    <PlusIcon className="w-7 h-7" />{" "}
                  </div>
                </PopoverHandler>
                <PopoverContent
                  placeholder={""}
                  {...sectionTriggers}
                  className="z-[9999] w-96 flex flex-col space-y-4 p-4 bg-white rounded-xl shadow-xl"
                >
                  <div
                    style={monserratStyle.style}
                    className="flex flex-col w-full"
                  >
                    <label
                      htmlFor="name"
                      className="font-semibold text-black text-lg"
                    >
                      Nombre
                    </label>
                    <Input
                      crossOrigin={""}
                      id="name"
                      className="w-full"
                      onChange={(e) => setSectionName(e.target.value)}
                      placeholder="Nombre de la sección"
                    />
                  </div>
                  <div
                    style={monserratStyle.style}
                    className="flex flex-col w-full"
                  >
                    <label
                      htmlFor="name"
                      className="font-semibold text-black text-lg"
                    >
                      Descripción{" "}
                      <span className="font-normal text-xs italic">(?)</span>
                    </label>
                    <Textarea
                      size="md"
                      onChange={(e) => setSectionDescription(e.target.value)}
                    />
                  </div>
                  <label
                    style={monserratStyle.style}
                    className="text-black text-xs font-light italic text-right"
                  >
                    (?) = Opcional
                  </label>
                  <button
                    disabled={!sectionName}
                    onClick={handleSectionSubmit}
                    className="w-full h-12 hover:bg-white border-2 border-blue-dark hover:text-blue-dark duration-300 hover:shadow-md bg-blue-dark rounded-lg text-white justify-center items-center flex"
                  >
                    {sectionLoading ? (
                      <Spinner className="w-7 h-7" />
                    ) : (
                      "Agregar"
                    )}
                  </button>
                </PopoverContent>
              </Popover>
            </div>
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
            disabled={!name || !sectionId}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl justify-center flex items-center"
          >
            {dataLoading ? <Spinner className="w-7 h-7" /> : "Guardar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
