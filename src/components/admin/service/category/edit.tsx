"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import { createDirection } from "@/services/structure-organizational/service";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { createNewsCategory } from "@/services/news/categories/service";
import { createEventCategory } from "@/services/events/categories/service";
import {
  createServiceCategory,
  editServiceCategory,
} from "@/services/service/categories/service";
export function EditServiceCategoriesDialog({
  category,
  open,
  handler,
  update,
}: {
  category: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!isLoading && category) {
      if (name === "") {
        return setWarning(true);
      }

      setIsLoading(true);
      const data = {
        name,
        updated_By: user?.email,
      };
      await editServiceCategory(category.id, data, update, user?.sub as string);
      setIsLoading(false);
      handler();
    }
  };

  return (
    <>
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
          placeholder={undefined}
          className="font-semibold flex flex-col font-montserrat items-start gap-2"
        >
          Editar Categoría
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form action={handleSubmit}>
            <div className="flex flex-col w-full space-y-4">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Nombre <span className="text-red-600">*</span>
              </label>
              <Input
                crossOrigin={""}
                id="nameEs"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Nombre de la categoría"
              />
              <label
                htmlFor="nameEs"
                className={`${
                  warning ? "block" : "hidden"
                } text-red-600 text-sm flex items-center gap-2`}
              >
                <ExclamationCircleIcon className="size-5" />
                El nombre es obligatorio.
              </label>
            </div>
          </form>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            onClick={handler}
            className={`${
              isFirstStep ? "hidden" : "block"
            } w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl`}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center`}
          >
            {isLoading ? (
              <Spinner
                className="w-7 h-7"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ) : (
              "Guardar"
            )}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
