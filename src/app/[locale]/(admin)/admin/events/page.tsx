"use client";
import AuthUser from "@/components/admin/auth";
import { EventDialog } from "@/components/admin/events/dialog";
import Card from "@/components/admin/events/card";
import { NewsDialog } from "@/components/admin/news/dialog";
import Sketch from "@/components/admin/sketch";
import { useEvents } from "@/services/events/service";
import { useEsNews } from "@/services/news/service";
import { Autocomplete } from "@mantine/core";
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
  const { data, isLoading, refetch } = useEvents("es");
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setEvents(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((res) => {
      setEvents(res.data);
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

  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Eventos"
        handleFilterOpen={handleFilterOpen}
        buttons={buttons}
      >
        <div className="w-full grid lg:grid-cols-4 gap-8">
          {events.length === 0 ? (
            <>No tiene</>
          ) : (
            <>
              {events.map((n, index) => (
                <Card key={index} event={n} update={handleRefresh} />
              ))}
            </>
          )}
        </div>
        {open && (
          <EventDialog
            handler={handleOpen}
            open={open}
            update={handleRefresh}
          />
        )}
      </Sketch>
    </AuthUser>
  );
}
