"use client";
import { useState } from "react";
import { Check, ChevronsUpDown, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface CategoryOption {
  value: string;
  label: string;
}

export function CategorySelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Selecciona una categoría...",
  disabled,
  invalid,
}: {
  id?: string;
  options: CategoryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-11 w-full justify-between rounded-xl border-input bg-background px-3.5 font-normal shadow-sm transition-colors hover:bg-accent/40",
            !selected && "text-muted-foreground",
            invalid && "border-destructive/50"
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <FolderOpen className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {selected ? selected.label : placeholder}
            </span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] rounded-xl p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar categoría..." />
          <CommandList>
            <CommandEmpty>No se encontró ninguna categoría.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="rounded-lg"
                >
                  <Check
                    className={cn(
                      "size-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
