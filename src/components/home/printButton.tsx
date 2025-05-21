import Image from "next/image";
import { useState } from "react";

export const PrintButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handlePrint = () => {
    window.print();
  };
  return (
    <button onClick={handlePrint} className=" cursor-pointer">
      <Image src="/svg/print_ic.svg" alt="Print Icon" width={24} height={24} />
    </button>
  );
};
