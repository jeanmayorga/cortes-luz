"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, MapPin, SearchIcon, X } from "lucide-react";
import { Location } from "@/actions/get-locations";
import { Input } from "./ui/input";
import { getLocations } from "@/actions/get-locations";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SearchFormByLocations() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState<Location[]>([]);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const searchLocations = debounce(async (query) => {
    setIsLoading(true);
    const locations = await getLocations({ query });
    setOptions(locations);
    if (!open) setOpen(true);
    setIsLoading(false);
  }, 400);

  const onSelectOption = (option: Location) => {
    router.push(`/${option.provider}/${option.criteria}/${option.code}`);
    setOptions([]);
    setSearchInput("");
    setOpen(false);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        className="w-full rounded-xl"
        placeholder="En donde donde vives..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          searchLocations(e.target.value);
        }}
        onClick={() => {
          if (options.length > 0) {
            setOpen(true);
          }
        }}
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
          >
            <X />
          </Button>
        </div>
      ) : (
        <SearchIcon className="h-4 w-4 shrink-0 opacity-50 right-4 absolute top-1/2 -translate-y-1/2" />
      )}

      {open && (
        <div className="absolute w-full bg-white border rounded-xl mt-1 z-10 overflow-hidden max-h-[500px] overflow-y-auto">
          <div className="p-4">
            <div className="w-full text-sm text-gray-500 font-semibold">
              Resultados:
            </div>
            <div className="w-full text-xs text-gray-400">
              No todos los lugares estan disponibles, si no tiene resultado
              busque por cuenta o cédula.
            </div>
          </div>
          <div role="group">
            {options.map((option, idx) => (
              <div
                key={option.id}
                className={cn(
                  "text-sm text-gray-600 px-4 py-3 flex items-start transition-all cursor-pointer",
                  selectedOptionIdx == idx && "bg-gray-100 text-gray-90"
                )}
                role="option"
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
