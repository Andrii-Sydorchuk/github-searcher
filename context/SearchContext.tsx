"use client";

import { useGithubSearch } from "@/hooks/useGithubSearch";
import { createContext, useContext } from "react";

type SearchContextType = ReturnType<typeof useGithubSearch>;
const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchState = useGithubSearch();

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext(): SearchContextType {
  const context = useContext(SearchContext);

  if (!context)
    throw new Error("useSearchContext must be used within a SearchProvider");

  return context;
}
