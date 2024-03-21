"use client";
import DocsCard from "@/components/transparencia/documents/card";
import {
  useSectionById,
  useSectionTranspFilter,
} from "@/services/section/service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page({ params }: { params: { sectionId: string } }) {
  const { data, isLoading } = useSectionById(params.sectionId);
  const { data: filters, isLoading: filtersLoading } = useSectionTranspFilter(
    params.sectionId
  );
  const [section, setSection] = useState<any>();
  const [years, setYears] = useState<any>();
  const [months, setMonths] = useState<any>();
  const [yearSelected, setYearSelected] = useState<any>();
  const [monthSelected, setMonthSelected] = useState<any>();
  const [docsFiltered, setDocsFiltered] = useState<any>();

  // Pagination con 5 elementos por pagina
  const [page, setPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(5);
  const indexOfLastDoc = page * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = docsFiltered?.slice(indexOfFirstDoc, indexOfLastDoc);
  const paginate = (pageNumber: number) => setPage(pageNumber);

  useEffect(() => {
    if (!isLoading) {
      setSection(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!filtersLoading) {
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
    if (section && section.documents) {
      console.log(monthSelected);
      docs = section.documents.filter((doc: any) => {
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
          {section?.name}
        </h1>
        {/* Presentar la description como innerHTML */}
        <div
          className="text-black"
          dangerouslySetInnerHTML={{ __html: section?.description }}
        ></div>
        {section?.documents && (
          <>
            <h1 className="font-montserrat text-black font-bold text-lg">
              Filtrar
            </h1>
            <div className="w-full flex flex-col lg:flex-row gap-4 h-14">
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
            <h1 className="font-montserrat text-black font-bold text-lg">
              Documentos
            </h1>
            <div className="w-full flex flex-col gap-3">
              {docsFiltered?.map((doc: any, index: number) => (
                <DocsCard doc={doc} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
