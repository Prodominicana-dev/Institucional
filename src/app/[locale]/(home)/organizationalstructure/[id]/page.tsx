"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MembersGrid from "@/components/organizationalStructure/membersGrid";
import { useMembersByDepartment } from "@/services/structure-organizational/members/service";

export default function Page({ params: { locale, id } }: any) {
  const { data, isLoading } = useMembersByDepartment(locale, id);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    if (!isLoading && data) {
      setMembers(data);
    }
  }, [isLoading, data]);
  return (
    <div>
      <MembersGrid members={members} />
    </div>
  );
}
