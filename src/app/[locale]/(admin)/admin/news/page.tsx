"use client";
import AuthUser from "@/components/admin/auth";
import { NewsDialog } from "@/components/admin/news/dialog";
import Sketch from "@/components/admin/sketch";
import React, { useState, useEffect, useRef } from "react";
import { useHover } from "usehooks-ts";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [editHover, setEditHover] = useState(false);
  const [enableHover, setEnableHover] = useState(false);
  const [disabledHover, setDisabledHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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

  const handleMouseEnter = (event: any) => {
    const { clientX, clientY, target } = event;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    window.onmousemove = (e) => {
      const offsetX = e.clientX - clientX;
      const offsetY = e.clientY - clientY;
      document
        .elementFromPoint(x + offsetX, y + offsetY)
        ?.dispatchEvent(new MouseEvent("mouseenter"));
    };
  };

  const handleMouseLeave = () => {
    window.onmousemove = null;
  };
  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Noticias"
        handleFilterOpen={handleFilterOpen}
        buttons={buttons}
      >
        <div className="w-full grid lg:grid-cols-4 gap-8">
          <div className="w-full h-[50vh] bg-gray-200 flex flex-col justify-center items-center rounded-lg">
            <div className="w-full h-5/6 bg-black rounded-t-lg"></div>
            <div className="w-full h-1/6 flex gap-5 relative justify-center items-center group rounded-lg">
              <div
                onMouseEnter={() => setEditHover(true)}
                onMouseLeave={() => setEditHover(false)}
                className={`w-1/3 h-full relative duration-100 flex items-center justify-center ${
                  disabledHover || enableHover ? "hidden" : "group-hover:w-full"
                }`}
              >
                <button
                  className={`w-8/12 h-4/6 rounded-lg bg-pink-800  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-100`}
                ></button>
              </div>

              <div
                onMouseEnter={() => setDisabledHover(true)}
                onMouseLeave={() => setDisabledHover(false)}
                className={`w-1/3 h-full relative  duration-100 flex justify-center items-center ${
                  editHover || enableHover ? "hidden" : "group-hover:w-full"
                }`}
              >
                <button
                  className={` bg-orange-400 w-8/12 h-4/6 rounded-lg  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-100`}
                ></button>
              </div>

              <div
                onMouseEnter={() => setEnableHover(true)}
                onMouseLeave={() => setEnableHover(false)}
                className={`w-1/3 h-full relative duration-300 flex items-center justify-center ${
                  disabledHover || editHover ? "hidden" : "group-hover:w-full"
                }`}
              >
                <button
                  className={`cursor-se-resize bg-red-300 w-8/12 h-4/6 rounded-lg  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-300`}
                ></button>
              </div>
            </div>
          </div>

          <div className="w-full h-[50vh] bg-purple-50 flex flex-col justify-center items-center">
            <div className="w-full h-5/6 bg-black"></div>
            <div className="w-full h-1/6 flex gap-5 justify-center items-center">
              <button className="size-12 bg-pink-800 rounded-full group hover:w-full hover:h-full hover:rounded-none hover:animate-pulse duration-100"></button>
              <button className="size-12 bg-orange-500 rounded-full"></button>
            </div>
          </div>
          <div className="w-full h-[50vh] bg-purple-50 flex flex-col justify-center items-center">
            <div className="w-full h-5/6 bg-black"></div>
            <div className="w-full h-1/6 flex gap-5 justify-center items-center">
              <button className="size-12 bg-pink-800 rounded-full group hover:w-full hover:h-full hover:rounded-none hover:animate-pulse duration-100"></button>
              <button className="size-12 bg-orange-500 rounded-full"></button>
            </div>
          </div>
          <div className="w-full h-[50vh] bg-purple-50 flex flex-col justify-center items-center">
            <div className="w-full h-5/6 bg-black"></div>
            <div className="w-full h-1/6 flex gap-5 justify-center items-center">
              <button className="size-12 bg-pink-800 rounded-full group hover:w-full hover:h-full hover:rounded-none hover:animate-pulse duration-100"></button>
              <button className="size-12 bg-orange-500 rounded-full"></button>
            </div>
          </div>
          <div className="w-full h-[50vh] bg-purple-50 flex flex-col justify-center items-center">
            <div className="w-full h-5/6 bg-black"></div>
            <div className="w-full h-1/6 flex gap-5 justify-center items-center">
              <button className="size-12 bg-pink-800 rounded-full group hover:w-full hover:h-full hover:rounded-none hover:animate-pulse duration-100"></button>
              <button className="size-12 bg-orange-500 rounded-full"></button>
            </div>
          </div>
        </div>
        {open && (
          <NewsDialog handler={handleOpen} open={open} update={() => {}} />
        )}
      </Sketch>
    </AuthUser>
  );
}
