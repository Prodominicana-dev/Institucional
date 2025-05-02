"use client";
import AuthUser from "@/components/admin/auth";
import Card from "@/components/admin/news/card";
import { NewsDialog } from "@/components/admin/news/dialog";
import Sketch from "@/components/admin/sketch";
import { useCategoriesNews, useNews } from "@/services/news/service";
import React, { useState, useEffect, useRef } from "react";
import { useHover } from "usehooks-ts";
import Select from "react-select";

export default function Page({ params: { locale } }: any) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [editHover, setEditHover] = useState(false);
  const [enableHover, setEnableHover] = useState(false);
  const [disabledHover, setDisabledHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data, isLoading, refetch } = useNews("es");
  const [news, setNews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  // useEffect(() => {
  //   if (categories && !categoriesLoading) {
  //     const options = categories.es.map((c: any) => {
  //       return { value: c.category, label: c.category };
  //     });
  //     setCategoriesOptions(options);
  //   }
  // }, [categories, categoriesLoading]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setNews(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((res: any) => {
      setNews(res.data);
    });
  }, [refresh]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const buttons = [
    {
      name: "Agregar",
      onClick: () => {
        handleOpen();
      },
    },
  ];

  useEffect(() => {
    let filteredData = [];
  }, [search, category]);

  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Noticias"
        handleFilterOpen={handleFilterOpen}
        buttons={buttons}
      >
        <div
          className={`${
            filterOpen ? "block" : "hidden"
          } w-full h-20  flex  justify-end `}
        >
          <div className={`w-6/12 h-full flex items-center gap-5`}>
            <input
              type="text"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              className="w-6/12 h-10 focus:outline-none focus:ring-2 duration-300 px-2 text-black focus:ring-blue-dark ring-1 ring-gray-300 rounded-md"
            />
            <Select
              onChange={(e: any) => {
                setCategory(e.value);
              }}
              className="w-6/12 z-50"
              options={categoriesOptions}
            />
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-4 gap-8">
          {news?.map((n, index) => (
            <Card key={index} news={n} update={handleRefresh} />
          ))}
        </div>
        {open && (
          <NewsDialog handler={handleOpen} open={open} update={handleRefresh} />
        )}
      </Sketch>
    </AuthUser>
  );
}
