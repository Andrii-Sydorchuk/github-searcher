"use client";

import styles from "./SearchResults.module.css";
import StatusMessage from "../StatusMessage/StatusMessage";
import ResultsGrid from "../ResultsGrid/ResultsGrid";
import { useSearchContext } from "@/context/SearchContext";

export default function SearchResults() {
  const {
    hasSearched,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    entityType,
    results,
  } = useSearchContext();

  const showResults = hasSearched || loading || !!error;

  return (
    <div>
      {showResults && (
        <section className={styles.resultsSection}>
          {error ? (
            <StatusMessage
              type="error"
              message={error}
              onRetry={() => setSearchTerm(searchTerm)}
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
