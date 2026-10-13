"use client";

import styles from "./SearchResults.module.css";
import StatusMessage from "@/components/common/StatusMessage/StatusMessage";
import ResultsGrid from "../ResultsGrid/ResultsGrid";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSearchResults } from "@/lib/features/search/searchSlice";
import { useSearchSync } from "@/hooks/useSearchSync";

export default function SearchResults() {
  useSearchSync();

  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const entityType = useAppSelector((state) => state.search.entityType);
  const results = useAppSelector((state) => state.search.results);
  const loading = useAppSelector((state) => state.search.loading);
  const error = useAppSelector((state) => state.search.error);
  const dispatch = useAppDispatch();

  const hasSearched = searchTerm.trim().length >= 3;
  const showResults = hasSearched || loading || !!error;

  return (
    <div>
      {showResults && (
        <section className={styles.resultsSection}>
          {error ? (
            <StatusMessage
              type="error"
              message={error}
              onRetry={() =>
                dispatch(fetchSearchResults({ entityType, query: searchTerm }))
              }
            />
          ) : loading ? (
            <ResultsGrid items={[]} entityType={entityType} loading={true} />
          ) : results.length === 0 ? (
            <StatusMessage type="empty" query={searchTerm} />
          ) : (
            <ResultsGrid
              items={results}
              entityType={entityType}
              loading={false}
            />
          )}
        </section>
      )}
    </div>
  );
}
