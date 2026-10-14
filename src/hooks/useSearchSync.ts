import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import {
  clearSearch,
  fetchSearchResults,
} from "@/lib/features/search/searchSlice";
import debounce from "lodash.debounce";

export function useSearchSync() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const entityType = useAppSelector((state) => state.search.entityType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchTerm.length < 3) {
      if (searchTerm.length === 0) {
        dispatch(clearSearch());
      }

      return;
    }

    let inFlightPromise: { abort: () => void } | null = null;

    const debouncedSearch = debounce(() => {
      inFlightPromise = dispatch(
        fetchSearchResults({ entityType, query: searchTerm }),
      );
    }, 400);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();

      if (inFlightPromise) {
        inFlightPromise.abort();
      }
    };
  }, [searchTerm, entityType, dispatch]);
}
