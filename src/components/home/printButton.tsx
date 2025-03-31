import Image from "next/image";
import { useState } from "react";

export const PrintButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.log("Error al abrir el diálogo  de impresion", error);
    }
  };
  return (
    <button onClick={handlePrint} className=" cursor-pointer">
      <Image src="/svg/print_ic.svg" alt="Print Icon" width={24} height={24} />
    </button>
  );
};
