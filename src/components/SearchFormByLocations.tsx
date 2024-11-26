"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, MapPin, SearchIcon, X } from "lucide-react";
import { Location } from "@/actions/get-locations";
import { Input } from "./ui/input";
import { getLocations } from "@/actions/get-locations";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchFormByLocations() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState<Location[]>([]);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const searchLocations = useDebouncedCallback(async (query: string) => {
    setSearchInput(query);
    setIsLoading(true);
    const locations = await getLocations({ query });
    setOptions(locations);
    if (!open) setOpen(true);
    setIsLoading(false);
  }, 400);

  const onSelectOption = (option: Location) => {
    router.push(`/${option.provider}/${option.criteria}/${option.code}`);
    cleanUp();
  };

  const onSelectOptionHover = (optionIdx: number) => {
    setSelectedOptionIdx(optionIdx);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const cleanUp = () => {
    setSelectedOptionIdx(0);
    setOptions([]);
    setSearchInput("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedOptionIdx((prev) =>
        prev < options.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedOptionIdx((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[selectedOptionIdx]) {
        onSelectOption(options[selectedOptionIdx]);
      }
    } else if (e.key === "Escape") {
      cleanUp();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        name="locations"
        autoFocus
        className="w-full rounded-xl"
        placeholder="En donde donde vives..."
        onChange={(e) => {
          searchLocations(e.target.value);
        }}
        onClick={() => {
          if (options.length > 0) {
            setOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      {isLoading ? (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 shrink-0 opacity-50 animate-spin" />
        </div>
      ) : searchInput.length > 0 ? (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setOpen(false);
              setOptions([]);
              setSearchInput("");
            }}
            className="shrink-0 rounded-full"
            aria-label="Cerrar"
          >
            <X />
          </Button>
        </div>
      ) : (
        <SearchIcon className="h-4 w-4 shrink-0 opacity-50 right-4 absolute top-1/2 -translate-y-1/2" />
      )}

      {open && (
        <div className="absolute w-full bg-white border rounded-xl mt-1 z-10 overflow-hidden">
          <div className="p-4">
            <div className="w-full text-sm text-gray-500 font-semibold">
              Resultados:
            </div>
            <div className="w-full text-xs text-gray-400">
              No todos los lugares estan disponibles,{" "}
              <span className="text-gray-900 font-bold">
                si no tiene resultado busque por cuenta o cédula.
              </span>
            </div>
          </div>
          {searchInput.length > 2 && options.length === 0 && (
            <div className="px-4 pb-4 text-gray-600 leading-none text-sm">
              No encontramos lugares.
            </div>
          )}
          <div role="listbox">
            {options.map((option, idx) => (
              <div
                key={option.id}
                className={cn(
                  "text-sm text-gray-600 px-4 py-3 flex items-start transition-all cursor-pointer",
                  selectedOptionIdx == idx && "bg-gray-100 text-gray-90"
                )}
                role="option"
                aria-selected={selectedOptionIdx == idx}
                onClick={() => onSelectOption(option)}
                onMouseEnter={() => onSelectOptionHover(idx)}
              >
                <MapPin className="w-4 h-4 shrink-0 mr-2" />
                <div className="">
                  <div className="leading-none mb-1">{option.name}</div>
                  <span className="leading-none text-xs text-gray-500">
                    {option.locations}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
