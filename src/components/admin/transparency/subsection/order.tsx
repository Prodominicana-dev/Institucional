"use client";
import React, { useEffect, useState } from "react";
import { useSectionAdmin } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0";
import { Montserrat } from "next/font/google";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { editSubsection } from "@/services/subsection/service";
import { HashLoader } from "react-spinners";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
  const [subsections, setSubsections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionsOption, setSectionsOption] = useState([]);

  useEffect(() => {
    if (data && !isLoading) {
      const sectionsWithSubsections = data.filter(
        (e: any) => e.subsection.length > 0
      );
      setSections(sectionsWithSubsections);

      setSectionsOption(
        data
          .filter((e: any) => e.subsection.length > 0)
          .map((e: any) => ({ value: e, label: e.name }))
      );
    }
  }, [data, isLoading]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    refetch().then((e) => {
      const sectionsWithSubsections = e.data.filter(
        (e: any) => e.subsection.length > 0
      );
      setSections(sectionsWithSubsections);
    });
  }, [refresh]);

  const handleSubmit = async (id: string, order: number) => {
    setLoading(true);
    editSubsection(id, { priority: order }, update, user?.sub as string);
    handleRefresh();
    setLoading(false);
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <HashLoader />;
      </div>
    );
  return (
    <>
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent
          className="flex flex-col overflow-y-auto no-scrollbar min-h-[35vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <DialogTitle
            className="text-2xl font-bold"
            style={monserratStyle.style}
          >
            Ordenar las secciones
          </DialogTitle>
          <label className="text-black text-sm font-light">
            <InformationCircleIcon className="w-4 h-4 inline-block" /> El orden
            que se establezca aquí será el que se muestre en la página de
            transparencia.
          </label>
          <label htmlFor="" className="text-xl text-black font-semibold">
            Sección a ordenar
          </label>
          <div className="w-full flex justify-center">
            <Select
              placeholder="Seleccione la sección a ordenar..."
              menuPosition="fixed"
              id="order"
              className="w-full"
              maxMenuHeight={200}
              options={sectionsOption}
              onChange={(e: any) => {
                setSubsections(e.value.subsection);
                setQuantityOptions(
                  e.value.subsection.map((e: any, i: any) => ({
                    value: i + 1,
                    label: i + 1,
                  }))
                );
              }}
            />
          </div>
          {subsections?.length > 0 && (
            <div className="w-full grid grid-cols-2 text-center font-normal text-black bg-gray-100 rounded-lg divide-x-2 py-3 divide-gray-300">
              <div className="w-full">Nombre</div>
              <div className="w-full">Posición</div>
            </div>
          )}
          {subsections?.map((section: any, key: number) => (
            <div
              key={key}
              className="w-full grid grid-cols-2 text-center font-normal text-black"
            >
              <div className="w-full">{section.name}</div>
              <div className="w-full flex justify-center">
                <Select
                  placeholder="Seleccione..."
                  menuPosition="fixed"
                  id="order"
                  className="w-full"
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
        </DialogContent>
      </Dialog>
    </>
  );
}
