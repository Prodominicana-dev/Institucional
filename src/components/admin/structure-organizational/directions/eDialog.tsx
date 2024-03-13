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
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  createDirection,
  editDirection,
} from "@/services/structure-organizational/service";
export function DirectionsEditDialog({
  direction,
  open,
  handler,
  update,
}: {
  direction: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (direction) {
      setName(direction.name);
    }
  }, [direction]);

  const handleSubmit = async () => {
    if (!isLoading) {
      setIsLoading(true);
      if (name === "") {
        setWarning(true);
        setIsLoading(false);
        return;
      }
      setWarning(false);
      const data = {
        name,
      };
      await editDirection(direction.id, data, update, user?.sub as string);
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
          className="font-semibold font-montserrat"
        >
          Editar dirección: {direction.name}
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form action={handleSubmit}>
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="font-semibold text-black text-lg"
              >
                Nombre <span className="text-red-600">*</span>
              </label>
              <Input
                crossOrigin={""}
                id="name"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Nombre de la dirección"
              />
              <label
                htmlFor="name"
                className={`${
                  warning ? "block" : "hidden"
                } text-red-600 text-sm`}
              >
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
            className="w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
          >
            {isLoading ? <Spinner className="size-6" /> : "Agregar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
