"use client";
import { DocumentDialog } from "@/components/admin/transparency/document/dialog";

import React, { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return <></>;
}
