"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import {
  createSection,
  editSection,
  useSectionAdmin,
} from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Montserrat } from "next/font/google";
import Editor from "../../tools/rich-editor/config";
import TextEditor from "../../tools/rich-editor/rich-editor";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

const monserratStyle = Montserrat({ subsets: ["latin"] });
export function OrderDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [description] = useState("");
  const [link, setLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [, setIsParent] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [type, setType] = useState("");
  const { data, isLoading, refetch } = useSectionAdmin();
  const [sections, setSections] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);

      setSections(data);
      setQuantityOptions(
        data.map((e: any, i: any) => ({ value: i + 1, label: i + 1 }))
      );
    }
  }, [data, isLoading]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    refetch().then((e) => {
      setSections(e.data);
    });
  }, [refresh]);

  const handleSubmit = async (id: string, order: number) => {
    setLoading(true);
    editSection(id, { priority: order }, update, user?.sub as string);
    handleRefresh();
    setLoading(false);
  };

  return (
    <>
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handler}
        className="p-2"
      >
        <DialogHeader
          placeholder={undefined}
          className="font-semibold "
          style={monserratStyle.style}
        >
          Ordenar las secciones
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar max-h-[75vh]"
          style={monserratStyle.style}
        >
          <label className="text-black text-sm font-light  text-center">
            <InformationCircleIcon className="w-4 h-4 inline-block" /> El orden
            que se establezca aquí será el que se muestre en la página de
            transparencia.
          </label>
          <div className="w-full grid grid-cols-2 text-center font-normal text-black bg-gray-100 rounded-lg divide-x-2 py-3 divide-gray-300">
            <div className="w-full">Nombre</div>
            <div className="w-full">Posición</div>
          </div>
          {loading ? (
            <></>
          ) : (
            <>
              {sections?.map((section: any, key: number) => (
                <div
                  key={key}
                  className="w-full grid grid-cols-2 text-center font-normal text-black"
                >
                  <div className="w-full">{section.name}</div>
                  <div className="w-full flex justify-center">
                    <Select
                      placeholder="Seleccione..."
                      id="order"
                      className="w-6/12"
                      maxMenuHeight={200}
                      options={quantityOptions}
                      onChange={(e: any) => {
                        handleSubmit(section.id, e.value);
                      }}
                      value={quantityOptions.find(
                        (e: any) => e.value === section.priority
                      )}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
