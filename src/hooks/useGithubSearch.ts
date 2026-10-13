import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchEntities } from "@/services/searchService";
import { EntityType } from "@/types/github";
import { Repository } from "@/types/repository";
import { GitHubUser } from "@/types/user";

export function useGithubSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entityType, setEntityType] = useState<EntityType>("users");
  const [searchResults, setSearchResults] = useState<
    (Repository | GitHubUser)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchTerm.trim(), 350);

  const isInputValid = searchTerm.trim().length >= 3;
  const hasSearched = isInputValid && debouncedQuery.length >= 3;

  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    let isCurrent = true;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchEntities(entityType, debouncedQuery);
        if (isCurrent) {
          setSearchResults(data);
        }
      } catch (err: unknown) {
        if (isCurrent) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCurrent = false;
    };
  }, [debouncedQuery, entityType, hasSearched]);

  const results = hasSearched ? searchResults : [];

  const handleEntityTypeChange = (type: EntityType) => {
    setEntityType(type);
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setLoading(false);
    setError(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    entityType,
    setEntityType: handleEntityTypeChange,
    results,
    loading: isInputValid && loading,
    error: isInputValid ? error : null,
    hasSearched,
    clearSearch,
  };
}
