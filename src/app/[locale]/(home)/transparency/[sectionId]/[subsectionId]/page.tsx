"use client";
import DocsCard from "@/components/transparencia/documents/card";
import {
  useSubsectionById,
  useSubsectionTranspFilter,
} from "@/services/subsection/service";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page() {
  const params = useParams<{ subsectionId: string }>();
  const { data, isLoading } = useSubsectionById(params.subsectionId);
  const { data: filters, isLoading: filtersLoading } =
    useSubsectionTranspFilter(params.subsectionId);
  const [subsection, setSubsection] = useState<any>();
  const [years, setYears] = useState<any>();
  const [months, setMonths] = useState<any>();
  const [yearSelected, setYearSelected] = useState<any>();
  const [monthSelected, setMonthSelected] = useState<any>();
  const [docsFiltered, setDocsFiltered] = useState<any>();

  useEffect(() => {
    if (!isLoading) {
      setSubsection(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!filtersLoading && filters && filters.length > 0) {
      // Asignar la posicion 0 del arreglo de años a la variable years y asignar el arreglo de meses a la variable months pero como un arreglo de objetos con la propiedad value y label
      const year = { value: filters[0].year, label: filters[0].year };
      setYearSelected(year);
      const month = filters[0].months.map(({ month, name }: any) => ({
        value: month,
        label: name,
      }));
      setMonthSelected(month[month.length - 1]);
      setMonths(month);
      const years = filters.map(({ year }: any) => ({
        value: year,
        label: year,
      }));
      setYears(years);
    }
  }, [filters, filtersLoading]);

  useEffect(() => {
    let docs = [];
    // Filtrar los documentos por año y mes seleccionados
    if (subsection && subsection.documents) {
      docs = subsection.documents.filter((doc: any) => {
        const date = new Date(doc.date);
        return (
          date.getFullYear() === yearSelected?.value &&
          date.getMonth() === monthSelected?.value
        );
      });
      setDocsFiltered(docs);
    }
  }, [yearSelected, monthSelected]);

  useEffect(() => {
    if (!filtersLoading && filters && filters.length > 0) {
      const monthsOfYearSelected = filters.find(
        (year: any) => year.year === yearSelected?.value
      )?.months;
      if (monthsOfYearSelected && monthsOfYearSelected.length > 0) {
        const months = monthsOfYearSelected.map(({ month, name }: any) => ({
          value: month,
          label: name,
        }));
        setMonths(months);
        setMonthSelected(months[months.length - 1]);
      }
    }
  }, [filters, filtersLoading, yearSelected]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-11/12 bg-white">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-3xl font-bold font-montserrat text-black line-clamp-3">
          {subsection?.name}
        </h1>
        {/* Presentar la description como innerHTML */}
        <div
          className="text-black"
          dangerouslySetInnerHTML={{ __html: subsection?.description }}
        ></div>

        <>
          <div className="w-full flex flex-col lg:flex-row gap-4 pb-5">
            <Select
              placeholder="Seleccione un año"
              id="section"
              className="w-full"
              maxMenuHeight={200}
              options={years}
              onChange={(e) => {
                setYearSelected(e);
              }}
              value={
                years?.find(
                  (option: any) => option.value === yearSelected?.value
                ) || null
              }
            />
            <Select
              isDisabled={years === ""}
              placeholder="Seleccione un mes"
              id="subsection"
              className="w-full"
              maxMenuHeight={200}
              options={months}
              onChange={(e) => {
                setMonthSelected(e);
              }}
              value={
                months?.find(
                  (option: any) => option.value === monthSelected?.value
                ) || null
              }
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            {docsFiltered ? (
              docsFiltered?.map((doc: any, index: number) => (
                <DocsCard doc={doc} key={index} />
              ))
            ) : (
              <div>No hay documentos</div>
            )}
          </div>
        </>
      </div>
    </div>
  );
}
