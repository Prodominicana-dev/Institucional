"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import Select from "react-select";
import { useProducts } from "@/services/export/product/service";
import {
  createExporter,
  editExporter,
} from "@/services/export/directory/service";
import { useSector } from "@/services/export/sector/service";

export function EditExporterDialog({
  exporter,
  open,
  handler,
  update,
}: {
  exporter: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [rnc, setRNC] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [_products, setProducts] = useState<any>([]);
  const [_sectors, setSectors] = useState([]);
  const [image, setImage] = useState("");
  const [productOptions, setProductOptions] = useState<any>([]);
  const [sectorOptions, setSectorOptions] = useState<any>([]);
  const [address, setAddress] = useState("");
  const [web, setWeb] = useState("");
  const [fob, setFob] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [isWoman, setIsWoman] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: sectors, isLoading: sectorsLoading } = useSector();

  useEffect(() => {
    if (exporter) {
      // console.log(exporter);
      setName(exporter.name);
      setRNC(exporter.rnc);
      setPhone(exporter.phone);
      setEmail(exporter.email);
      setAddress(exporter.address);
      setWeb(exporter.website);
      setFob(exporter.fob);
      setImage(exporter.image);
      setAuthorized(exporter.authorized);
      setIsWoman(exporter.isWoman);
      setProducts(exporter.product.map((product: any) => product.productId));
    }
  }, [exporter]);

  useEffect(() => {
    if (!productsLoading && products) {
      // console.log(products);
      setProductOptions(
        products.map(({ code, name }: { code: string; name: string }) => ({
          value: code,
          label: name,
        }))
      );
    }
  }, [products, productsLoading]);

  useEffect(() => {
    if (!sectorsLoading && sectors) {
      // console.log(sectors);
      setSectorOptions(
        sectors.map(({ code, name }: { code: string; name: string }) => ({
          value: code,
          label: name,
        }))
      );
    }
  }, [sectors, sectorsLoading]);

  const openRef = useRef<() => void>(null);

  const authorizedOptions = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const IsWomanOptions = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  /* Funcion para cuando droppeen un documento se agregue a la lista ya existente */
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const handleButton = async () => {
    if (name === "") {
      return setWarningAlert(true);
    }
    if (!submitLoading) {
      setSubmitLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("rnc", rnc);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("products", _products.toString());
      //formData.append("sectors", _sectors.toString());
      formData.append("address", address);
      formData.append("website", web);
      formData.append("fob", fob);
      formData.append("authorized", authorized.toString());
      formData.append("isWoman", isWoman.toString());
      formData.append("created_By", user?.email as string);
      files.length > 0 && files.map((file) => formData.append("images", file));
      // imagesRelated.length > 0 &&
      //   imagesRelated.map((file) => formData.append("files", file));
      await editExporter(exporter.id, formData, update, user?.sub as string);
      setSubmitLoading(false);
      handler();
    }
  };

  const steps = [
    {
      step: 1,
      section: (
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center ">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label className="font-semibold text-black text-lg">
                Nombre de la empresa <span className="text-red-600">*</span>
              </label>
              <div className="w-full">
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <label
                htmlFor="nameEs"
                className={`${
                  warningAlert && !name ? "block" : "hidden"
                } text-red-600 text-sm pt-3`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> El
                nombre de la empresa es obligatorio.
              </label>
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                RNC <span className="text-red-600">*</span>
              </label>
              <input
                id="rnc"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setRNC(e.target.value)}
                value={rnc}
                placeholder="RNC de la empresa"
              />
              <label
                htmlFor="nameEs"
                className={`${
                  warningAlert && !rnc ? "block" : "hidden"
                } text-red-600 text-sm pt-3`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> El RNC
                es obligatorio.
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label className="font-semibold text-black text-lg">
                Teléfono <span className="text-red-600">*</span>
              </label>
              <div className="w-full">
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Teléfono de la empresa"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Correo de contacto <span className="text-red-600">*</span>
              </label>
              <input
                id="rnc"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Correo de la empresa"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="nameEs"
              className="font-semibold text-black text-lg"
            >
              Logo de la empresa <span className="text-red-600">*</span>
            </label>
          </div>
          <div className="w-full h-[30vh] relative flex justify-center items-center group">
            {files.length > 0 && (
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full z-10 absolute flex justify-center items-center group"
              >
                <Image
                  src={URL.createObjectURL(files[0])} // Use the preview URL directly
                  alt=""
                  width="1920"
                  height="1080"
                  className="w-full h-full absolute rounded-lg object-cover group-hover:blur-[2px] group-hover:opacity-40 duration-300" // Add bg-white for visibility
                />
              </button>
            )}
            {image && files.length === 0 && (
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full z-10 absolute flex justify-center items-center group"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/export/img/${exporter.id}/${image}`} // Use the preview URL directly
                  alt=""
                  width="1920"
                  height="1080"
                  className="w-full h-full absolute rounded-lg object-cover object-center group-hover:blur-[2px] group-hover:opacity-40 duration-300" // Add bg-white for visibility
                />
              </button>
            )}

            <Dropzone
              multiple={false}
              openRef={openRef}
              onDrop={handleDrop}
              accept={IMAGE_MIME_TYPE} // Ensure only images are accepted
              activateOnClick={true}
              className="w-full h-full border-dashed hover:border-double bg-transparent hover:bg-gray-100 hover:text-blue-dark hover:border-gray-100 duration-300 border-2 rounded-lg border-gray-200 flex justify-center items-center"
            >
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full"
              >
                Seleccione una imagen
              </button>
            </Dropzone>
          </div>
          <label
            className={`${
              warningAlert && files.length === 0 ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-start gap-1 w-full`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La imagen
            es obligatoria.
          </label>

          <label className="text-black text-sm text-start w-full">
            <InformationCircleIcon className="size-5 inline-block" />{" "}
            {`Agregue la
            imagen de la noticia, no importa si se ve "cortada" o "agrandada",
            en este cuadro la imagen se centrara, pero no perderá su tamaño
            original.`}
          </label>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full ">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Productos que exporta la empresa{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                menuPosition="fixed"
                onChange={(e: any) => {
                  // Agregar el seleccionado al array de productos seleccionados
                  setProducts(e.map((product: any) => product.value));
                }}
                className="w-full z-50 max-h-[12vh] overflow-auto"
                options={productOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                value={productOptions.filter((product: any) =>
                  _products.includes(product.value)
                )}
              />
              <label
                htmlFor="nameEs"
                className={`${
                  warningAlert && _products.length === 0 ? "block" : "hidden"
                } text-red-600 text-sm pt-3`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Los
                productos son obligatorios.
              </label>
            </div>
          </div>
          {/* <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full ">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Sectores en el que exporta{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                menuPosition="fixed"
                onChange={(e: any) => {
                  // Agregar el seleccionado al array de productos seleccionados
                  setSectors(e.map((product: any) => product.value));
                }}
                className="w-full z-40"
                options={sectorOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
              <label
                htmlFor="nameEs"
                className={`${
                  warningAlert && _products.length === 0 ? "block" : "hidden"
                } text-red-600 text-sm pt-3`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Los
                productos son obligatorios.
              </label>
            </div>
          </div> */}

          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label className="font-semibold text-black text-lg">
                Dirección
              </label>
              <div className="w-full">
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="Dirección de la empresa"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Enlace a la página web (si tienen)
              </label>
              <input
                id="rnc"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setWeb(e.target.value)}
                value={web}
                placeholder="Enlace de la empresa"
              />
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label className="font-semibold text-black text-lg">
                FOB (USD)
              </label>
              <div className="w-full">
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setFob(e.target.value)}
                  value={fob}
                  placeholder="FOB de la empresa"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                ¿Está autorizado? <span className="text-red-600">*</span>
              </label>
              <Select
                menuPosition="fixed"
                onChange={(e: any) => {
                  setAuthorized(e.value);
                }}
                className="w-full"
                options={authorizedOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                value={authorizedOptions.find(
                  (auth) => auth.value === authorized
                )}
              />
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                ¿Es Mujer? <span className="text-red-600">*</span>
              </label>
              <Select
                menuPosition="fixed"
                onChange={(e: any) => {
                  setIsWoman(e.value);
                }}
                className="w-full"
                options={IsWomanOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                value={IsWomanOptions.find(
                  (options) => options.value === isWoman
                )}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handler}
        className="p-2 flex justify-center items-center"
        size="xxl"
      >
        <DialogHeader
          placeholder={undefined}
          className="font-black text-black font-montserrat flex flex-col gap-5 w-8/12"
        >
          <div className="w-full flex justify-between items-center">
            Editar exportador
            <button onClick={handler}>
              <XMarkIcon className="size-7 text-black" />
            </button>
          </div>
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col w-8/12 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh] font-montserrat"
        >
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
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat w-8/12"
        >
          <button
            onClick={handleButton}
            className={`${"w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl"}`}
          >
            {submitLoading ? (
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
