"use client";

import { useRecentSearches } from "@/hooks/useRecentSearches";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatRelative } from "date-fns";
import { es } from "date-fns/locale";
// import { CircleX } from "lucide-react";

export function SearchRecents() {
  const { recentSearches, deleteAllRecentSearches } = useRecentSearches();

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
          <Link
            key={recentSearch.createdAt}
            href={
              recentSearch.uuid
                ? `/${recentSearch.uuid}`
                : `/${recentSearch.provider}?criteria=${recentSearch.criteria}&code=${recentSearch.code}`
            }
            className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-slate-100 transition-all cursor-pointer select-none relative min-w-44"
          >
            <div className="text-xs text-gray-400 leading-none mb-4">
              {formatRelative(recentSearch.createdAt, new Date(), {
                locale: es,
              })}
            </div>
            <div className="text-xs text-gray-500">
              {recentSearch.provider?.toUpperCase()}
            </div>
            <div className="whitespace-nowrap leading-none">
              {recentSearch.address}
            </div>
            {recentSearch.criteria && recentSearch.code && (
              <>
                <div className="text-xs text-gray-400">
                  {recentSearch.criteria}
                </div>
                <div className="text-xs text-gray-400">{recentSearch.code}</div>
              </>
            )}
            {recentSearch.uuid && (
              <div className="text-xs text-gray-400">Compartido</div>
            )}

            {/* <div
              className="absolute top-2 right-2 text-gray-400 rounded-full w-4 h-4"
              onClick={() => deleteRecentSearch(recentSearch.id)}
            >
              <CircleX className="w-4 h-4" />
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
