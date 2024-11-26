import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RecentSearchDTO {
  criteria?: string;
  code?: string;
  provider: string;
  address: string;
}

export interface RecentSearch {
  id: string;
  criteria?: string;
  code?: string;
  provider: string;
  address: string;
  createdAt: string;
}

interface State {
  recentSearches: RecentSearch[];
  addRecentSearch: (recentSearch: RecentSearchDTO) => void;
  deleteRecentSearch: (id: string) => void;
  deleteAllRecentSearches: () => void;
}

export const useRecentSearches = create<State>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      addRecentSearch: (recentSearch) => {
        const lastRecentSearches = get().recentSearches;
        const createdAt = new Date().toISOString();
        const newRecentSearch = {
          id: createdAt,
          ...recentSearch,
          createdAt,
        };
        const recentSearchExists = lastRecentSearches.find((rs) => {
          if (rs.code && rs.criteria && rs.provider) {
            if (
              rs.code === newRecentSearch.code &&
              rs.criteria === newRecentSearch.criteria &&
              rs.provider === newRecentSearch.provider
            ) {
              return rs;
            }
          }

          return undefined;
        });

        if (!recentSearchExists) {
          const newRecentSearches = [newRecentSearch, ...lastRecentSearches];
          return set({ recentSearches: newRecentSearches });
        }
      },
      deleteRecentSearch: (id: string) => {
        const lastRecentSearches = get().recentSearches;
        const newRecentSearches = lastRecentSearches.filter(
          (rs) => rs.id !== id
        );
        return set({ recentSearches: newRecentSearches });
      },
      deleteAllRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "recent-searches",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
