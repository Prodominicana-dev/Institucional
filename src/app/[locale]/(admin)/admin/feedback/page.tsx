"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import FeedbackStats from "@/components/admin/feedback/FeedbackStats";
import FeedbackTable from "@/components/admin/feedback/FeedbackTable";
import React from "react";

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Gestión de Feedbacks"
        subtitle="Administra y modera las opiniones de los usuarios"
        handleFilterOpen={() => {}}
        buttons={[]}
        hasFilter={false}
      >
        <div className="w-11/12 space-y-6">
          {/* Estadísticas */}
          <FeedbackStats />

          {/* Tabla de feedbacks */}
          <FeedbackTable />
        </div>
      </Sketch>
    </AuthUser>
  );
}
