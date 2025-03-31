"use client";
import Image from "next/image";
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { SendPageEmail } from "@/services/sendPageEmail/service";

export const EmailButton = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorRequired, setErrorRequired] = React.useState<{
    email?: string;
  }>({});

  const handleOpen = () => {
    setOpen(!open);
  };

  const ValidateFunc = () => {
    const requiredErr: {
      email?: string;
    } = {};
    if (!email) {
      requiredErr.email = "Este campo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      requiredErr.email = "Por favor ingrese un correo válido";
    }
    setErrorRequired(requiredErr);
    return Object.keys(requiredErr).length === 0;
  };

  const handleSubmit = async () => {
    const validaForm = ValidateFunc();
    if (validaForm) {
    //   console.log("klk email:", email);

      await SendPageEmail({ email });
      setOpen(false);
      setEmail("");
    }
  };
  return (
    <>
      <button onClick={handleOpen} className=" cursor-pointer">
        <Image alt="Email" src="/svg/email_ic1.svg" width={25} height={25} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96  sm:w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Enviar Pagina vía Mail
              </h3>
              <button
                onClick={handleOpen}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className=" flex-col flex justify-center sm:flex-row p-4 text-gray-600 gap-3">
              <div>
                <div className=" w-auto sm:w-72">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="  !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 "
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: " min-w-[100px]" }}
                  />
                  {errorRequired.email && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errorRequired.email}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Button
                  onClick={handleSubmit}
                  size="sm"
                  color="blue"
                  className=" cursor-pointer w-full sm:w-auto"
                >
                  Enviar
                </Button>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t gap-2">
              <button
                onClick={handleOpen}
                className="w-full sm:w-auto   px-4 py-2 border border-gray-300 rounded text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              {/* <button
                onClick={handleOpen}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirmar
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
