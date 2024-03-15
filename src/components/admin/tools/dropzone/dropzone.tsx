import React, { useEffect, useState } from "react";
import { Input, Tooltip } from "@material-tailwind/react";
import { Group, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import Image from "next/image";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { notifications } from "@mantine/notifications";

export default function DragNDrop({
  data,
  setData,
  images = [],
  setImages,
  id,
}: {
  data: any;
  setData: any;
  images?: any;
  setImages?: any;
  id?: string;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [warningAlert, setWarningAlert] = useState(false);

  const handleDrop = (file: FileWithPath[]) => {
    if (files.length < 4 - images?.length) {
      setFiles([...files, ...file]);
      setData([...files, ...file]);
    } else {
      setWarningAlert(true);
    }
  };

  // Verifica files, si tiene mas de 4 elimina los que no sean los primeros 4
  useEffect(() => {
    if (files.length > 4 - images?.length) {
      setFiles(files.slice(0, 4));
    } else {
      setWarningAlert(false);
    }
  }, [files]);

  return (
    <div className="w-full h-min-[30vh] flex flex-col gap-5">
      <Dropzone
        onDrop={(file: FileWithPath[]) => {
          // Verifica que tenga menos de 4, si tiene menos de 4 agregalo y si tiene mas de 4 no agregues ese y activa el WarningAlert
          handleDrop(file);
        }}
        maxSize={2 * 1024 ** 2}
        accept={["image/*"]}
        multiple
        maxFiles={4 - images?.length}
        onError={(error) => {
          console.log(error);
          notifications.show({
            title: "Error",
            message: "La imagen no puede sobrepasar los 2MB.",
            color: "red",
            autoClose: 5000,
          });
        }}
      >
        <Group
          justify="center"
          gap="lg"
          mih={110}
          style={{ pointerEvents: "none" }}
        >
          <div>
            <Text size="lg" inline>
              Arrastre las imágenes aquí o haga clic para cargarlas
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              El tamaño máximo por imagen es de 20MB.
            </Text>
          </div>
        </Group>
      </Dropzone>
      <div
        className={`${
          warningAlert ? "block" : "hidden"
        } w-full flex gap-2 items-center`}
      >
        <InformationCircleIcon className="size-8 text-red-500" />
        <p className="text-red-500 font-montserrat font-light">
          No puedes agregar más de 4 imágenes.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full gap-5 ">
        {images?.map((file: any, index: number) => (
          <div
            key={index}
            className="relative w-full bg-gray-100 rounded-md flex items-center justify-center"
          >
            <Tooltip
              label={file.name}
              position="top"
              withArrow
              transition="fade"
              duration={100}
              className="w-full h-full"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${file}`}
                  alt={file.name}
                  className="w-full h-64 object-cover rounded-md"
                  width={1000}
                  height={1000}
                />
              </div>
            </Tooltip>
            <button
              onClick={() => {
                // Eliminar el archivo del arreglo, pero no los otros
                const newData = files.filter((f, i) => i !== index);
                setFiles(newData);
                setData(newData);
              }}
              className="absolute top-2 right-2 bg-red-500 rounded-full size-10 flex justify-center items-center"
            >
              <XMarkIcon className="size-8 text-white" />
            </button>
          </div>
        ))}
        {files.map((file: FileWithPath, index: number) => (
          <div
            key={index}
            className="relative w-full bg-gray-100 rounded-md flex items-center justify-center"
          >
            <Tooltip
              label={file.name}
              position="top"
              withArrow
              transition="fade"
              duration={100}
              className="w-full h-full"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-64 object-cover rounded-md"
                  width={1000}
                  height={1000}
                />
              </div>
            </Tooltip>
            <button
              onClick={() => {
                // Eliminar el archivo del arreglo, pero no los otros
                const newData = files.filter((f, i) => i !== index);
                setFiles(newData);
                setData(newData);
              }}
              className="absolute top-2 right-2 bg-red-500 rounded-full size-10 flex justify-center items-center"
            >
              <XMarkIcon className="size-8 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
