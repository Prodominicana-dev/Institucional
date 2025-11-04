"use client";
import { useDirections } from "@/services/structure-organizational/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = useDirections();
  const [executiveDirection, setExecutiveDirection] = useState({ id: "" });
  useEffect(() => {
    if (!isLoading && data) {
      console.log(" data:", data);
      
      setExecutiveDirection(data[9]);
      
    }
  }, [data, isLoading]);
  return router.push(`/organizationalstructure/${executiveDirection.id}`);
}
