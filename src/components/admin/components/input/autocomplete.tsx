import React, { useEffect, useRef, useState } from "react";

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
  const [optionClicked, setOptionClicked] = useState(false);

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleInputBlur = () => {
    setOpen(false);
  };

  useEffect(() => {}, [optionClicked]);

  const listUpdated = options?.filter((option: any) => {
    return option.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div className="w-full relative">
      <input
        className={`${className}`}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={() => setTimeout(handleInputBlur, 2000)}
        value={value ? value : ""}
        placeholder={label}
      />
      {open && listUpdated.length > 0 && (
        <div className="options-container w-full flex flex-col gap-2 p-2 z-[9999] bg-white max-h-[20vh] rounded-lg ring-1 ring-gray-300 absolute transform translate-y-3">
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
