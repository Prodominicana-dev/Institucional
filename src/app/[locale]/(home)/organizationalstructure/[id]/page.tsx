"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MembersGrid from "@/components/organizationalStructure/membersGrid";
import { useMembersByDepartment } from "@/services/structure-organizational/members/service";
import { useParams } from "next/navigation";

export default function Page() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
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
