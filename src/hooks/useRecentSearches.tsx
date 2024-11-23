import { useEffect, useState } from "react";

export interface RecentSearch {
  id: string;
  criteria: string;
  code: string;
  account: string;
  registeredAt: string;
  address: string;
}
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  function addRecentSearch(newRecentSearch: RecentSearch) {
    const recentSearchesString = localStorage.getItem("recentSearches") || "[]";
    const recentSearches = JSON.parse(recentSearchesString) as RecentSearch[];

    const newRecentSearches = [...recentSearches, newRecentSearch];
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
  }

  function deleteAllRecentSearches() {
    localStorage.removeItem("recentSearches");
  }

  useEffect(() => {
    console.log("hello");
    const recentSearchesString = localStorage.getItem("recentSearches");
    if (recentSearchesString) {
      const searchesFormatted = JSON.parse(
        recentSearchesString
      ) as RecentSearch[];
      setRecentSearches(searchesFormatted);
    }

    function storageEventHandler(event: StorageEvent) {
      console.log("here", event);
      if (
        event.key === "recentSearches" &&
        event.newValue &&
        recentSearchesString
      ) {
        console.log("recentSearches", event.newValue);
        const searchesFormatted = JSON.parse(
          recentSearchesString
        ) as RecentSearch[];
        setRecentSearches(searchesFormatted);
      }
    }

    window.addEventListener("storage", storageEventHandler);
    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, []);

  return { recentSearches, addRecentSearch, deleteAllRecentSearches };
}
