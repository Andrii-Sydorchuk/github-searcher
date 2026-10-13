import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useDebounce } from "./useDebounce";
import { useEffect } from "react";
import {
  clearSearch,
  fetchSearchResults,
} from "@/lib/features/search/searchSlice";

export function useSearchSync() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const entityType = useAppSelector((state) => state.search.entityType);
  const dispatch = useAppDispatch();

  const debouncedQuery = useDebounce(searchTerm.trim(), 350);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      dispatch(fetchSearchResults({ entityType, query: debouncedQuery }));
    } else if (searchTerm.length === 0) {
      dispatch(clearSearch());
    }
  }, [debouncedQuery, entityType, dispatch, searchTerm]);
}
