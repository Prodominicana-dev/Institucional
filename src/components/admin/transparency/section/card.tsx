import { Section } from "@/models/section";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Card({
  section,
  update,
}: {
  section: Section;
  update: () => void;
}) {
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{section.name}</div>
        <div>{section.status === true ? "Activo" : "Desactivado"}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={() => {}}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            onClick={() => {}}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
    </>
  );
}
