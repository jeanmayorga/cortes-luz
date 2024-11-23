"use client";

import { useRecentSearches } from "@/hooks/useRecentSearches";
import Link from "next/link";

export function SearchRecents() {
  const { recentSearches } = useRecentSearches();

  if (recentSearches.length === 0) return null;

  return (
    <div className="p-4 last-of-type:border-b-0 border-b">
      <div className="text-sm mb-2">Recientes</div>
      <div className="flex gap-4 overflow-auto">
        {recentSearches.map((recentSearch) => (
          <Link
            href={`?criteria=${recentSearch.criteria}&code=${recentSearch.code}`}
            className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-slate-100 transition-all cursor-pointer select-none"
          >
            <div className="border-b border-gray-300 pb-2 mb-2">
              <div className="text-xs">{recentSearch.criteria}</div>
              <div className="text-sm">{recentSearch.code}</div>
            </div>
            <div className="whitespace-nowrap">{recentSearch.address}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
