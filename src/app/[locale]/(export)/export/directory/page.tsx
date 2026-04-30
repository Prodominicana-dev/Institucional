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
import { Collapse, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import ComboBoxResponsive from "@/components/utility/comboBoxResponsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import InfoPopup from "@/components/export/InfoPopup ";

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
  const [selectedSector, setSelectedSector] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "Todos" });
  const [selectedProvince, setSelectedProvince] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "Todos" });
  const [selectedisWoman, setSelectedIsWoman] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "Todos" });
  const [productsOptions, setProductsOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [sectorsOptions, setSectorsOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [provincesOptions, setProvincesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isWomanOptions, setIsWomanOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useExportersPerPage({
      perPage,
      search,
      selectedProduct,
      selectedSector: selectedSector.value,
      selectedProvince: selectedProvince.value,
      selectedisWoman: selectedisWoman.value,
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
      setProductsOptions(
        productsData.map((product: any) => ({
          value: product.name,
          label: product.name,
        })),
      );
    }
  }, [productsData, productsDataLoading]);

  const { data: sectorsData, isLoading: sectorsDataLoading } =
    useExportersSectors(params.locale);

  useEffect(() => {
    if (!sectorsDataLoading && sectorsData) {
      setSectorsOptions([
        { value: "", label: "Todos" },
        ...sectorsData.map((sector: any) => ({
          value: sector.name,
          label: sector.name,
        })),
      ]);
    }
  }, [sectorsData, sectorsDataLoading]);

  const { data: provincesData, isLoading: provincesDataLoading } =
    useExportersProvinces();

  useEffect(() => {
    if (!provincesDataLoading && provincesData) {
      setProvincesOptions([
        { value: "", label: "Todos" },
        ...provincesData.map((province: any) => ({
          value: province.province,
          label: province.province,
        })),
      ]);
    }
  }, [provincesData, provincesDataLoading]);

  useEffect(() => {
    const isWomanOptions = [
      { value: "", label: "Todos" },
      ...optionSelectIsWoman.map((option) => ({
        value: "true",
        label: option,
      })),
    ];

    setIsWomanOptions(isWomanOptions);
  }, []);

  const isWoman =
    selectedisWoman.value === "true"
      ? true
      : selectedisWoman.value === "false"
        ? false
        : null;

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (debouncedSearch) queryParams.append("search", debouncedSearch);
    if (selectedProduct) queryParams.append("product", selectedProduct);
    if (selectedSector) queryParams.append("sector", selectedSector.value);
    if (selectedProvince)
      queryParams.append("province", selectedProvince.value);
    if (isWoman !== null) {
      queryParams.append("isWoman", isWoman ? "true" : "false");
    }
    const queryString = queryParams.toString();
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
    <div className="bg-white min-h-screen font-montserrat">
      <InfoPopup>
        <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 text-justify">
          Las informaciones que el Centro de Exportación e Inversión de la
          República Dominicana (ProDominicana) pone a disposición de sus
          usuarios en sus diferentes medios es de carácter informativo. Las
          empresas o marcas que se enuncian no constituyen recomendación,
          certificación ni garantía sobre su desempeño. ProDominicana no se hace
          responsable por las relaciones comerciales que puedan surgir entre los
          particulares. Se recomienda realizar las debidas verificaciones antes
          de establecer cualquier vínculo comercial. Se exhorta a todos los
          usuarios a actuar conforme a la legislación vigente, mantener
          prácticas éticas y transparentes, y abstenerse de cualquier práctica
          indebida o contraria a los principios de integridad. ProDominicana se
          reserva el derecho de actualizar, modificar o retirar información en
          cualquier momento, sin previo aviso.
        </p>
      </InfoPopup>

      <div className="relative h-[65vh] sm:h-[90vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/containers.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="w-11/12 sm:w-10/12 xl:w-6/12 text-center text-white flex flex-col items-center gap-4 sm:gap-8 pt-20 sm:pt-10">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="uppercase w-full font-bold text-xl sm:text-2xl xl:text-3xl leading-tight">
                Directorio de exportadores
              </div>
              <div className="w-full sm:w-10/12 xl:w-8/12 text-sm sm:text-base px-2">
                Descubre el Potencial Exportador Dominicano. ¡Conéctate con
                Oportunidades Globales Ahora!
              </div>
            </div>
            <div className="flex flex-row w-full sm:w-10/12 xl:w-8/12 p-3 sm:p-4 bg-white rounded-full">
              <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500 flex-shrink-0" />
              <input
                placeholder="Buscar por nombre, sector o producto."
                className="w-full text-sm sm:text-base text-blue-500 bg-white outline-none"
                name="search"
                value={searchText || ""}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <Link
              href={"/documents/Directorio _Exportadores_2025.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-32 text-center py-2 text-sm sm:text-lg border-2 rounded-full bg-white border-white hover:bg-neutral-200 text-blue-300 font-gotham hover:border-transparent transition-all duration-500 ease-in-out cursor-pointer"
            >
              Descargar
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col items-center py-6 sm:py-10 gap-6 sm:gap-10">
        <div className="w-11/12 sm:w-10/12">
          <div>
            <div className="flex justify-end">
              <button
                onClick={toggleFiltersOpen}
                className="text-gray-500 border-[1px] border-gray-300 py-2 px-4 sm:px-5 rounded-full flex items-center gap-2 text-sm sm:text-lg"
              >
                <AdjustmentsHorizontalIcon className="w-5 text-gray-500" />
                Filtrar
              </button>
            </div>
            <Collapse open={filtersOpen}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 gap-4 sm:gap-10">
                <div className="w-full flex flex-col gap-2">
                  <div className="text-black font-bold text-sm sm:text-base">
                    Sector
                  </div>
                  <ComboBoxResponsive
                    data={sectorsOptions}
                    selectedStatus={selectedSector}
                    setSelectedStatus={(option: any) =>
                      setSelectedSector(option || { value: "", label: "Todos" })
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="text-black font-bold text-sm sm:text-base">
                    Producto
                  </div>
                  <ComboBoxResponsive
                    data={productsOptions}
                    selectedStatus={selectedProduct}
                    setSelectedStatus={setSelectedProduct}
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="text-black font-bold text-sm sm:text-base">
                    Provincia
                  </div>
                  <ComboBoxResponsive
                    data={provincesOptions}
                    selectedStatus={selectedProvince}
                    setSelectedStatus={(option: any) =>
                      setSelectedProvince(
                        option || { value: "", label: "Todos" },
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="text-black font-bold text-sm sm:text-base">
                    Género
                  </div>
                  <ComboBoxResponsive
                    data={isWomanOptions}
                    selectedStatus={selectedisWoman}
                    setSelectedStatus={(option: any) =>
                      setSelectedIsWoman(
                        option || { value: "", label: "Todos" },
                      )
                    }
                  />
                </div>
              </div>
            </Collapse>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10 mt-6">
            {exporters.length > 0 &&
              exporters.map((exporter: any, index: number) => {
                if (index === exporters.length - 1)
                  return (
                    <div ref={ref} key={index}>
                      <ExporterCard exporter={exporter} />
                    </div>
                  );
                return <ExporterCard key={index} exporter={exporter} />;
              })}
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
        className={`absolute flex items-end justify-center left-6 sm:left-10 bg-[#F4AACB] h-16 sm:h-20 w-12 sm:w-14 rounded-b-full ${
          exporter.isWoman ? "block" : "hidden"
        }`}
      >
        <Image
          width={500}
          height={500}
          src="/svg/icons/womanIcon.svg"
          alt="woman"
          className="size-8 sm:size-10 object-contain mb-2 sm:mb-3"
        />
      </div>
      <div
        className={`flex flex-col text-gray-700 bg-white shadow-md rounded-xl h-full cursor-pointer group`}
        onClick={handleOpen}
      >
        <div className="mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60 sm:h-80 flex justify-center items-center">
          {exporter.image && (
            <Image
              width={2000}
              height={2000}
              src={`${process.env.NEXT_PUBLIC_API_URL}/export/img/${exporter.id}/${exporter.image}`}
              alt="logo"
              className="size-48 sm:size-64 object-contain"
            />
          )}
          {!exporter.image && (
            <div className="size-44 sm:size-60 object-cover aspect-square rounded-full text-black font-black bg-gray-200 flex justify-center items-center text-4xl sm:text-6xl">
              {exporter.name.substring(0, 2)}
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 text-center">
          <h4 className="block mb-2 text-lg sm:text-2xl font-semibold tracking-normal text-blue-gray-900 font-montserrat line-clamp-3">
            <Tooltip content={exporter.name}>{exporter.name}</Tooltip>
          </h4>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-full overflow-y-auto no-scrollbar max-w-[95vw] sm:max-w-lg">
          <DialogTitle className="sr-only">{exporter.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Información de contacto y productos del exportador {exporter.name}
          </DialogDescription>
          <div className="flex flex-col justify-center items-center gap-6 sm:gap-10 py-6 sm:py-10 font-montserrat">
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              {exporter.image && (
                <Image
                  width={2000}
                  height={2000}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/export/img/${exporter.id}/${exporter.image}`}
                  alt="logo"
                  className="size-40 sm:size-60 object-contain"
                />
              )}
              {!exporter.image && (
                <div className="size-40 sm:size-60 object-cover aspect-square rounded-full text-black font-black bg-gray-200 flex justify-center items-center text-4xl sm:text-6xl">
                  {exporter.name.substring(0, 2)}
                </div>
              )}
              <h4 className="block mb-2 font-montserrat text-xl sm:text-2xl font-semibold tracking-normal text-blue-gray-900 text-center px-2">
                {exporter.name}
              </h4>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 justify-center items-center w-full">
              {exporter?.phone && (
                <div className="w-full flex flex-col items-center gap-2 sm:gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/telephoneIcon.svg"
                    alt="telephone"
                    className="size-10 sm:size-12 object-cover"
                  />
                  <div className="text-center break-words line-clamp-3 text-sm sm:text-base px-2">
                    {exporter?.phone}
                  </div>
                </div>
              )}
              {exporter?.email && (
                <div className="w-full flex flex-col justify-center items-center gap-2 sm:gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/emailIcon.svg"
                    alt="email"
                    className="size-10 sm:size-12 object-cover"
                  />
                  <div className="text-center w-full break-words line-clamp-3 text-sm sm:text-base px-2">
                    {exporter?.email}
                  </div>
                </div>
              )}
              {exporter?.address && (
                <div className="w-full flex flex-col items-center gap-2 sm:gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/svg/export/addressIcon.svg"
                    alt="address"
                    className="size-10 sm:size-12 object-cover"
                  />
                  <div className="text-center break-words line-clamp-3 text-sm sm:text-base px-2">
                    {exporter?.address}
                  </div>
                </div>
              )}
            </div>
            {exporter.product.length > 0 && (
              <div className="flex justify-center w-full">
                <div className="w-full px-2 sm:w-11/12 flex flex-col gap-4 sm:gap-5">
                  <h1 className="text-lg sm:text-xl text-blue-dark font-bold">
                    Productos que exporta:
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                    {exporter.product
                      .slice(0, 11)
                      .map((product: any, index: number) => (
                        <Tooltip
                          className="z-[9999]"
                          content={product.product.name}
                          placement="top"
                          key={index}
                        >
                          <div className="bg-blue-dark text-white rounded-full px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm truncate w-full text-center">
                            {product.product.name}
                          </div>
                        </Tooltip>
                      ))}
                    {exporter.product.length - 11 > 11 && (
                      <div className="bg-blue-dark text-white rounded-full px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm truncate w-full flex justify-center">
                        {exporter.product.length - 11} productos más
                      </div>
                    )}
                  </div>
                  {exporter?.website && (
                    <Link
                      href={exporter?.website}
                      target="_blank"
                      className="text-base sm:text-xl text-blue-dark font-bold underline text-center"
                    >
                      Conoce más en su página web
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
