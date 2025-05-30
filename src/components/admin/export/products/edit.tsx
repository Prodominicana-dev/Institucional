"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { editProduct } from "@/services/export/product/service";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EditProductDialog({
  product,
  open,
  handler,
  update,
}: {
  product: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [aliasEn, setAliasEn] = useState("");
  const [code, setCode] = useState("");
  const [productId, setProductId] = useState("");
  const [warning, setWarning] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeWarning, setCodeWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setAlias(product.alias);
      setNameEn(product.nameEn);
      setAliasEn(product.aliasEn);
      setCode(product.code);
      setProductId(product.code);
    }
  }, [product]);

  useEffect(() => {
    if (productId === code) return;
    if (code.length > 3) {
      (async () => {
        setCodeLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${code}`;
        const { data } = await axios.get(url);
        data && setCodeWarning(true);
        data === "" && setCodeWarning(false);
        setCodeLoading(false);
      })();
    } else {
      setCodeWarning(false);
    }
  }, [code]);

  const openRef = useRef<() => void>(null);

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarning(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarning(false);
  };

  const handleSubmit = async () => {
    if (!isLoading) {
      if (activeStep === 0 && (name === "" || code === "" || codeWarning)) {
        return setWarning(true);
      }
      if (activeStep === 1 && nameEn === "") {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        const data = {
          code,
          name,
          alias,
          nameEn,
          aliasEn,
        };

        await editProduct(product.id, data, update, user?.sub as string);
        setIsLoading(false);
        handler();
      }
    }
  };

  const steps = [
    {
      step: 1,
      section: (
        <div className="flex flex-col w-full space-y-4">
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Código arancelario del producto{" "}
            <span className="text-red-600">*</span>
          </label>
          <Input
            // disabled={codeLoading}
            crossOrigin={""}
            id="nameEs"
            className={`w-full ${
              codeWarning ? "text-red-600" : "text-black"
            } duration-150`}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            placeholder="Código arancelario del producto"
          />
          <label
            htmlFor="nameEs"
            className={`${
              codeWarning ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El código{" "}
            {'"'}
            {code}
            {'"'} ya existe.
          </label>
          <label
            htmlFor="nameEs"
            className={`${
              warning && !code ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El código
            es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Nombre <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nombre del producto"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !name ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El nombre
            es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Alias
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setAlias(e.target.value)}
            value={alias}
            placeholder="Alias del producto"
          />
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Nombre en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setNameEn(e.target.value)}
            value={nameEn}
            placeholder="Nombre del producto en inglés"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !name ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El nombre
            en inglés es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Alias en inglés
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setAliasEn(e.target.value)}
            value={aliasEn}
            placeholder="Alias del producto en inglés"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar">
          <DialogHeader className="font-semibold flex flex-col items-start gap-1 font-montserrat">
            <DialogTitle className="text-black text-2xl">
              Editar producto
            </DialogTitle>
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              {steps.map((step, index) => (
                <Step
                  key={index}
                  className="font-montserrat text-white font-black text-lg bg-black cursor-pointer"
                  activeClassName="bg-blue-dark"
                  completedClassName="bg-black"
                >
                  {step.step}
                </Step>
              ))}
            </Stepper>
          </DialogHeader>
          <form action={handleSubmit}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${
                  activeStep === index ? "block" : "hidden"
                } flex flex-col gap-3 w-full h-full`}
              >
                {step.section}
              </div>
            ))}
          </form>
          <DialogFooter className="space-x-4 font-montserrat">
            <button
              onClick={handlePrev}
              className={`${
                isFirstStep ? "hidden" : "block"
              } w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl`}
            >
              Anterior
            </button>
            <button
              onClick={handleSubmit}
              className={`${
                isLastStep
                  ? "w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
                  : "w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl"
              }`}
            >
              {isLastStep ? (
                isLoading ? (
                  <HashLoader />
                ) : (
                  "Guardar"
                )
              ) : (
                "Siguiente"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
