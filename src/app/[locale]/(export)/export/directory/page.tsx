"use client";
import {
  useExporters,
  useExportersPerPage,
  useExportersProducts,
  useExportersProvinces,
  useExportersSectors,
} from "@/services/export/directory/service";
import { useDebounceValue } from "usehooks-ts";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Collapse,
  Option,
  Dialog,
  DialogBody,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Select } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";

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

export default function Page() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setSearch] = useDebounceValue(searchText, 500);
  const [sector, setSector] = useState(exportDirectoryFilters[0].name);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [perPage, setPerPage] = useState(6);
  const [exporters, setExporters] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>("");
  const [selectedSector, SetSelectedSector] = useState<any>("");
  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [selectedisWoman, setSelectedIsWoman] = useState<any>("");
  const [productsOptions, setProductsOptions] = useState([]);
  const [sectorsOptions, setSectorsOptions] = useState([]);
  const [provincesOptions, setProvincesOptions] = useState([]);
  const [isWomanOptions, setIsWomanOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useExportersPerPage({
      perPage,
      search,
      selectedProduct,
      selectedSector,
      selectedProvince,
      selectedisWoman,
      isAuthorized: true,
    });

  const optionSelectIsWoman = ["Mujer"];

  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    refetch();
  }, [
    search,
    selectedSector,
    selectedProduct,
    selectedProvince,
    selectedisWoman,
  ]);

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);
  useEffect(() => {
    if (data && !isLoading) {
      setExporters(data?.pages.map((page) => page.data).flat());
    }
  }, [data, isLoading]);

  const { data: productsData, isLoading: productsDataLoading } =
    useExportersProducts(params.locale);

  useEffect(() => {
    if (!productsDataLoading && productsData) {
      // console.log(productsData);
      setProductsOptions(
        productsData.map((product: any) => ({
          value: product.name,
          label: product.name,
        }))
      );
    }
  }, [productsData, productsDataLoading]);

  const { data: sectorsData, isLoading: sectorsDataLoading } =
    useExportersSectors(params.locale);

  useEffect(() => {
    if (!sectorsDataLoading && sectorsData) {
      setSectorsOptions(
        sectorsData.map((sector: any) => ({
          value: sector.name,
          label: sector.name,
        }))
      );
    }
  }, [sectorsData, sectorsDataLoading]);

  const { data: provincesData, isLoading: provincesDataLoading } =
    useExportersProvinces();

  useEffect(() => {
    if (!provincesDataLoading && provincesData) {
      setProvincesOptions(
        provincesData.map((province: any) => ({
          value: province.province,
          label: province.province,
        }))
      );
    }
  }, [provincesData, provincesDataLoading]);

  useEffect(() => {
    const isWomanOptions = optionSelectIsWoman.map((option) => ({
      value: "true",
      label: option,
    }));

    setIsWomanOptions(isWomanOptions);
  }, []);

  const isWoman =
    selectedisWoman === "true"
      ? true
      : selectedisWoman === "false"
      ? false
      : null;
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (debouncedSearch) queryParams.append("search", debouncedSearch);
    if (selectedProduct) queryParams.append("product", selectedProduct);
    if (selectedSector) queryParams.append("sector", selectedSector);
    if (selectedProvince) queryParams.append("province", selectedProvince);
    if (isWoman !== null) {
      queryParams.append("isWoman", isWoman ? "true" : "false");
    }
    const queryString = queryParams.toString();
    // console.log("Generated Query String:", isWoman);
    router.push(`/export/directory?${queryString}`, { scroll: false });
  }, [
    debouncedSearch,
    selectedProduct,
    selectedSector,
    selectedProvince,
    selectedisWoman,
  ]);

  const toggleFiltersOpen = () => setFiltersOpen((cur) => !cur);
  return (
    <div className="bg-white h-full font-montserrat">
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
                value={searchText || ""}
                onChange={(e) => setSearchText(e.target.value)}
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
                      clearable
                      searchable
                      placeholder="Sector"
                      onChange={SetSelectedSector}
                      className="w-full z-50  overflow-auto text-black"
                      classNames={{ option: "text-black" }}
                      data={sectorsOptions}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Producto</div>
                    <Select
                      clearable
                      searchable
                      placeholder="Producto"
                      onChange={setSelectedProduct}
                      className="w-full z-50 overflow-auto text-black"
                      classNames={{ option: "text-black" }}
                      data={productsOptions}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Provincia</div>
                    <Select
                      clearable
                      searchable
                      placeholder="Provincia"
                      onChange={setSelectedProvince}
                      className="w-full z-50 overflow-auto text-black"
                      classNames={{ option: "text-black" }}
                      data={provincesOptions}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-black font-bold">Género</div>
                    <Select
                      clearable
                      searchable
                      placeholder="Género"
                      onChange={setSelectedIsWoman}
                      className="w-full z-80 overflow-auto text-black"
                      classNames={{ option: "text-black" }}
                      data={isWomanOptions}
                    />
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {exporters.length > 0 &&
                exporters.map((exporter: any, index: number) => {
                  if (index === exporters.length - 1)
                    return (
                      <div ref={ref}>
                        <ExporterCard key={index} exporter={exporter} />
                      </div>
                    );
                  return <ExporterCard key={index} exporter={exporter} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExporterCard({ exporter }: { exporter: any }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div className="font-montserrat relative">
      <div
        className={`absolute flex items-end justify-center left-10 bg-[#F4AACB] h-20 w-14 rounded-b-full ${
          exporter.isWoman ? "block" : "hidden"
        }`}
      >
        <Image
          width={500}
          height={500}
          src="/svg/icons/womanIcon.svg"
          alt="woman"
          className="size-10 object-contain mb-3"
        />
      </div>
      <div
        className={`flex flex-col text-gray-700 bg-white shadow-md rounded-xl h-full  cursor-pointer group`}
        onClick={handleOpen}
      >
        <div className="mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80 flex justify-center items-center">
          {exporter.image && (
            <Image
              width={2000}
              height={2000}
              src={`${process.env.NEXT_PUBLIC_API_URL}/export/img/${exporter.id}/${exporter.image}`}
              alt="logo"
              className="size-64 object-contain"
            />
          )}
          {!exporter.image && (
            <div className="size-60 object-cover aspect-square rounded-full text-black font-black bg-gray-200 flex justify-center items-center text-6xl">
              {exporter.name.substring(0, 2)}
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <h4 className="block mb-2 text-2xl font-semibold tracking-normal text-blue-gray-900 font-montserrat line-clamp-3">
            <Tooltip content={exporter.name}>{exporter.name}</Tooltip>
          </h4>
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        size="lg"
        className="h-[90vh]"
      >
        <DialogBody
          placeholder={undefined}
          className="h-full overflow-y-auto no-scrollbar"
        >
          <div className="flex flex-col justify-center items-center gap-10 py-10 font-montserrat">
            <div className="flex flex-col items-center gap-5">
              {exporter.image && (
                <Image
                  width={2000}
                  height={2000}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/export/img/${exporter.id}/${exporter.image}`}
                  alt="logo"
                  className="size-60 object-contain"
                />
              )}
              {!exporter.image && (
                <div className="size-60 object-cover aspect-square rounded-full text-black font-black bg-gray-200 flex justify-center items-center text-6xl">
                  {exporter.name.substring(0, 2)}
                </div>
              )}
              <h4 className="block mb-2 font-montserrat text-2xl font-semibold tracking-normal text-blue-gray-900">
                {exporter.name}
              </h4>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 justify-center items-center w-full ">
              {exporter?.phone && (
                <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/telephoneIcon.svg"
                    alt="telephone"
                    className="size-12 object-cover"
                  />
                  <div className="text-center break-words line-clamp-3">
                    {exporter?.phone}
                  </div>
                </div>
              )}
              {exporter?.email && (
                <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/emailIcon.svg"
                    alt="email"
                    className="size-12 object-cover"
                  />
                  <div className="text-center w-full break-words line-clamp-3">
                    {exporter?.email}
                  </div>
                </div>
              )}
              {exporter?.address && (
                <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/addressIcon.svg"
                    alt="address"
                    className="size-12 object-cover"
                  />
                  <div className="text-center break-words line-clamp-3">
                    {exporter?.address}
                  </div>
                </div>
              )}
            </div>
            {exporter.product.length > 0 && (
              <div className="flex justify-center">
                <div className="w-11/12 flex flex-col gap-5">
                  <h1 className="text-xl text-blue-dark font-bold">
                    Productos que exporta:
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                    {exporter.product
                      .slice(0, 11)
                      .map((product: any, index: number) => (
                        <Tooltip
                          className="z-[9999]"
                          content={product.product.name}
                          placement="top"
                          key={index}
                        >
                          <div className="bg-blue-dark text-white rounded-full px-5 py-3 text-sm truncate w-full text-center">
                            {product.product.name}
                          </div>
                        </Tooltip>
                      ))}
                    {exporter.product.length - 11 > 11 && (
                      <div className="bg-blue-dark text-white rounded-full px-5 py-3 text-sm truncate w-full flex justify-center">
                        {exporter.product.length - 11} productos más
                      </div>
                    )}
                  </div>
                  {exporter?.website && (
                    <Link
                      href={exporter?.website}
                      target="_blank"
                      className="text-xl text-blue-dark font-bold underline"
                    >
                      Conoce más en su página web
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
