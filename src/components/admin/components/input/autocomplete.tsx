"use client";
import React, { useEffect, useRef, useState } from "react";
import { Collapse, button } from "@material-tailwind/react";

export default function Autocomplete({
  options,
  onChange,
  label,
  value,
  className,
}: {
  options: any;
  onChange: any;
  label: string;
  value: any;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event: any) => {
    const inputElement = inputRef.current;
    const optionsElement = document.querySelector(
      ".w-full.flex.flex-col.gap-2.p-2.z-[9999].bg-white.max-h-[20vh].rounded-lg.ring-1.ring-gray-300.absolute.transform.translate-y-3"
    );

    if (
      open &&
      !(inputElement && inputElement.contains(event.target as Node)) &&
      !(optionsElement && optionsElement.contains(event.target as Node))
    ) {
      setOpen(false);
    }
  };

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleInputBlur = () => {
    setOpen(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const listUpdated = options?.filter((option: any) => {
    return option.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    // Add event listener for clicks outside the input
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative">
      <input
        ref={inputRef}
        className={`${className}`}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value ? value : ""}
        placeholder={label}
      />
      {open && listUpdated.length > 0 && (
        <div
          ref={inputRef}
          className="w-full flex flex-col gap-2 p-2 z-[9999] bg-white max-h-[20vh] rounded-lg ring-1 ring-gray-300 absolute transform translate-y-3"
        >
          {listUpdated?.map((option: any, key: number) => (
            <button
              key={key}
              onClick={() => onChange(option)}
              className="w-full px-4 h-8 rounded-lg text-black bg-white hover:bg-gray-200 text-base duration-75 text-start"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
