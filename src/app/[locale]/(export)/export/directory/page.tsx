"use client";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Collapse,
  Select,
  Option,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
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
  const exportDirectoryData = [
    {
      name: "Cormidom",
      sector: "Industrial",
      logo: "https://cormidom.com.do/wp-content/uploads/2022/09/Cormidom-Logo__001-Completo-color.png",
      telephone: "8096854684",
      email: "sperez@cormidom.com",
      address:
        "Jose A. Brea Peña #14, District Tower, 3er nivel, Evaristo Morales",
      web: "https://cormidom.com.do/",
      products: [
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
      ],
    },
    {
      name: "Cormidom",
      sector: "Industrial",
      logo: "https://cormidom.com.do/wp-content/uploads/2022/09/Cormidom-Logo__001-Completo-color.png",
      telephone: "8096854684",
      email: "sperez@cormidom.com",
      address:
        "Jose A. Brea Peña #14, District Tower, 3er nivel, Evaristo Morales",
      web: "https://cormidom.com.do/",
      products: [
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
      ],
    },
    {
      name: "Cormidom",
      sector: "Industrial",
      logo: "https://cormidom.com.do/wp-content/uploads/2022/09/Cormidom-Logo__001-Completo-color.png",
      telephone: "8096854684",
      email: "sperez@cormidom.com",
      address:
        "Jose A. Brea Peña #14, District Tower, 3er nivel, Evaristo Morales",
      web: "https://cormidom.com.do/",
      products: [
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
        "Mineral concentrado",
      ],
    },
  ];
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
      <div className="relative h-[40vh] sm:h-[90vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/containers.jpg"}
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
              <div className="uppercase w-full font-bold text-xl xl:text-3xl">
                Directorio de exportadores
              </div>
              <div className="w-8/12">
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
              {exportDirectoryData.map((exporter, index) => (
                <ExporterCard
                  key={index}
                  name={exporter.name}
                  sector={exporter.sector}
                  logo={exporter.logo}
                  telephone={exporter.telephone}
                  email={exporter.email}
                  address={exporter.address}
                  web={exporter.web}
                  products={exporter.products}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExporterCard({
  name,
  sector,
  logo,
  telephone,
  email,
  address,
  web,
  products,
}: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div
        className="flex flex-col text-gray-700 bg-white shadow-md rounded-xl h-full cursor-pointer group"
        onClick={handleOpen}
      >
        <div className="mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
          <Image
            width={2000}
            height={2000}
            src={logo}
            alt="logo"
            className="object-contain object-center w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </div>
        <div className="p-6 text-center">
          <h4 className="block mb-2 font-sans text-2xl font-semibold tracking-normal text-blue-gray-900">
            {name}
          </h4>
          <p>{sector}</p>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} placeholder={undefined}>
        <DialogBody placeholder={undefined}>
          <div className="flex flex-col justify-center items-center gap-10 py-10">
            <div className="flex flex-col items-center">
              <Image
                width={2000}
                height={2000}
                src={logo}
                alt="logo"
                className="size-60 object-cover aspect-square rounded-full"
              />
              <h4 className="block mb-2 font-sans text-2xl font-semibold tracking-normal text-blue-gray-900">
                {name}
              </h4>
              <p>{sector}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4">
                <Image
                  width={500}
                  height={500}
                  src="/svg/export/telephoneIcon.svg"
                  alt="telephone"
                  className="size-12 object-cover"
                />
                <div className="text-center">{telephone}</div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Image
                  width={500}
                  height={500}
                  src="/svg/export/emailIcon.svg"
                  alt="email"
                  className="size-12 object-cover"
                />
                <div className="text-center">{email}</div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Image
                  width={500}
                  height={500}
                  src="/svg/export/addressIcon.svg"
                  alt="address"
                  className="size-12 object-cover"
                />
                <div className="text-center">{address}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12 flex flex-col gap-5">
                <h1 className="text-xl text-blue-dark font-bold">
                  Productos que exporta:
                </h1>
                <div className="flex flex-wrap gap-5">
                  {products.map((product: string, index: number) => (
                    <div
                      key={index}
                      className="bg-blue-dark text-white rounded-full px-5 py-3"
                    >
                      {product}
                    </div>
                  ))}
                </div>
                <Link
                  href={web}
                  target="_blank"
                  className="text-xl text-blue-dark font-bold underline"
                >
                  Conoce más en su página web
                </Link>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
