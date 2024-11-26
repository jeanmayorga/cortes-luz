"use client";

import { RecentSearch, useRecentSearches } from "@/hooks/useRecentSearches";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatRelative } from "date-fns";
import { es } from "date-fns/locale";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchRecentsSkeleton } from "./SearchRecentsSkeleton";

interface Props {
  recentSearch: RecentSearch;
}
function SearchRecent({ recentSearch }: Props) {
  const { deleteRecentSearch } = useRecentSearches();

  function getCriteria() {
    const oldCriteria = recentSearch.criteria;

    if (oldCriteria === "IDENTIFICACION") return "ci";
    if (oldCriteria === "CUENTA_CONTRATO") return "cc";
    if (oldCriteria === "CUEN") return "cu";

    return oldCriteria;
  }
  const criteria = getCriteria();

  return (
    <div className="relative min-w-44 rounded-xl bg-gray-50 border border-gray-100 hover:bg-slate-100 transition-all cursor-pointer select-none">
      <Link
        href={`/${recentSearch.provider}/${criteria}/${recentSearch.code}`}
        className="p-3 block"
      >
        <div className="text-xs text-gray-500">
          {recentSearch.provider?.toUpperCase()}
        </div>
        <div className="whitespace-nowrap leading-none mb-1">
          {recentSearch.address}
        </div>
        <div className="text-xs text-gray-400 leading-none">
          {formatRelative(recentSearch.createdAt, new Date(), {
            locale: es,
          })}
        </div>
      </Link>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 text-gray-400 rounded-full w-4 h-4"
        onClick={(e) => {
          e.preventDefault();
          deleteRecentSearch(recentSearch.id);
        }}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function SearchRecents() {
  const [isLoading, setIsLoading] = useState(true);
  const { recentSearches, deleteAllRecentSearches } = useRecentSearches();

  useEffect(() => {
    setIsLoading(false);
  }, [recentSearches]);

  if (isLoading) return <SearchRecentsSkeleton />;

  if (recentSearches.length === 0) return null;

  return (
    <div className="p-4 last-of-type:border-b-0 border-b">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm">Búsquedas recientes</div>
        <Button
          variant="link"
          size="sm"
          onClick={deleteAllRecentSearches}
          className="py-0 h-auto"
        >
          Eliminar
        </Button>
      </div>
      <div className="flex gap-4 overflow-auto">
        {recentSearches.map((recentSearch) => (
          <SearchRecent key={recentSearch.id} recentSearch={recentSearch} />
        ))}
      </div>
    </div>
  );
}
