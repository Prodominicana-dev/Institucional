"use client";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Collapse, Select, Option } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";

const exportDirectoryFilters = [
  {
    name: "Todos",
  },
  {
    name: "Agropecuario",
  },
  {
    name: "Industrial",
  },
  {
    name: "Artesanía",
  },
];
export default function page() {
  const [search, setSearch] = React.useState("");
  const [sector, setSector] = useState(exportDirectoryFilters[0].name);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const toggleFiltersOpen = () => setFiltersOpen((cur) => !cur);
  const handleSearchChange = () => {};
  const handleFilter = (selectedSector: string) => {
    setSector(selectedSector);
  };
  return (
    <div className="bg-white h-full">
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={
            "https://images.unsplash.com/photo-1590497008432-598f04441de8?q=80&w=3491&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="w-8/12 xl:w-6/12 text-center text-white flex flex-col items-center gap-8 pt-10">
            <div className="gap-3 sm:gap-5 lg:gap-10 text-[14px] sm:text-lg flex flex-row justify-center items-center flex-wrap lg:flex-nowrap sm:w-8/12">
              {exportDirectoryFilters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => handleFilter(filter.name)}
                  className={`${
                    sector === filter.name
                      ? "bg-white text-black font-bold"
                      : "bg-black/50 text-white hover:bg-white hover:text-black"
                  } rounded-full p-3 sm:p-4 cursor-pointer text-center duration-200`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="uppercase w-full font-bold text-xl sm:text-5xl">
                Directorio de exportadores
              </div>
              <div className="w-8/12 text-lg">
                Descubre el Potencial Exportador Dominicano. ¡Conéctate con
                Oportunidades Globales Ahora!
              </div>
            </div>
            <div className="flex flex-row w-10/12 p-4 bg-white rounded-full sm:p-5 sm:w-8/12">
              <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
              <input
                placeholder="Buscar por nombre, sector, producto o país."
                className="w-10/12 text-blue-500 bg-white outline-none"
                name="search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center py-10 gap-10">
          <div className="w-10/12">
            <div>
              <div className="flex justify-end">
                <button
                  onClick={toggleFiltersOpen}
                  className="text-gray-500 border-[1px] border-gray-300 py-2 px-5 rounded-full flex items-center gap-2 text-lg"
                >
                  <AdjustmentsHorizontalIcon className="w-5 text-gray-500" />
                  Filtrar
                </button>
              </div>
              <Collapse open={filtersOpen}>
                <div className="grid grid-cols-1 sm:grid-cols-3 my-4 gap-10">
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Sector</div>
                    <Select
                      className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                      containerProps={{ className: "h-12" }}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      placeholder={undefined}
                    >
                      <Option>Exportador</Option>
                      <Option>Inversionista</Option>
                      <Option>Otro</Option>
                    </Select>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Producto</div>
                    <Select
                      className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                      containerProps={{ className: "h-12" }}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      placeholder={undefined}
                    >
                      <Option>Exportador</Option>
                      <Option>Inversionista</Option>
                      <Option>Otro</Option>
                    </Select>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Pais</div>
                    <Select
                      className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                      containerProps={{ className: "h-12" }}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      placeholder={undefined}
                    >
                      <Option>Exportador</Option>
                      <Option>Inversionista</Option>
                      <Option>Otro</Option>
                    </Select>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
              <ExporterCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExporterCard() {
  return (
    <div className="flex flex-col text-gray-700 bg-white shadow-md rounded-xl h-full cursor-pointer group">
      <div className="mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
        <Image
          width={2000}
          height={2000}
          src="https://cormidom.com.do/wp-content/uploads/2022/09/Cormidom-Logo__001-Completo-color.png"
          alt="logo"
          className="object-contain object-center w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="block mb-2 font-sans text-2xl font-semibold tracking-normal text-blue-gray-900">
          Cormidom
        </h4>
        <p>Industrial</p>
      </div>
    </div>
  );
}
