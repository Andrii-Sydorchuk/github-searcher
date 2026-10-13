import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo } from "react";
import {
  clearSearch,
  fetchSearchResults,
} from "@/lib/features/search/searchSlice";
import debounce from "lodash.debounce";
import { EntityType } from "@/types/github";

export function useSearchSync() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const entityType = useAppSelector((state) => state.search.entityType);

  const dispatch = useAppDispatch();

  const debouncedSearch = useMemo(() => {
    return debounce((type: EntityType, query: string) => {
      dispatch(fetchSearchResults({ entityType: type, query }));
    }, 350);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (searchTerm.trim().length >= 3) {
      debouncedSearch(entityType, searchTerm);
    } else {
      debouncedSearch.cancel();

      if (searchTerm.trim().length === 0) {
        dispatch(clearSearch());
      }
    }
  }, [searchTerm, entityType, dispatch, debouncedSearch]);
}
