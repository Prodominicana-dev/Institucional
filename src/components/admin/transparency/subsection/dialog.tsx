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
import {
  createSubsection,
  useSectionSubsAdmin,
} from "@/services/subsection/service";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";
import SectionPopover from "../section/popover";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export function SubsectionDialog({
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
  const [sectionId, setSectionId] = useState("");
  const { data, refetch, isLoading: dataLoaded } = useSectionSubsAdmin();
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);
  const [refresh, setRefresh] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionLoading, setSectionLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (data && !dataLoaded) {
      setSection(data);
    }
  }, [data, dataLoaded]);

  const handleSectionRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    refetch().then((e) => {
      setSection(e.data);
    });
  }, [refresh]);

  const handlePopOver = () => {
    setOpenPopover(!openPopover);
  };

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
    if (user) {
      handler();
      const data = {
        name,
        description,
        sectionId,
      };
      createSubsection(data, update, user.sub as string).then(() => {
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
                  maxMenuHeight={200}
                  options={section}
                  onChange={(e) => {
                    setSectionId(e?.value as string);
                  }}
                />
              </div>
              <SectionPopover
                handleOpen={handlePopOver}
                openPopover={openPopover}
                handleSectionSubmit={handleSectionSubmit}
                sectionName={sectionName}
                setSectionName={setSectionName}
                sectionDescription={sectionDescription}
                setSectionDescription={setSectionDescription}
                sectionLoading={sectionLoading}
                sectionTriggers={sectionTriggers}
              />
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
