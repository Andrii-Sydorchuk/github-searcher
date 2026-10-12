"use client";

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import ResultsGrid from "@/components/ResultsGrid/ResultsGrid";
import StatusMessage from "@/components/StatusMessage/StatusMessage";
import { useGithubSearch } from "@/hooks/useGithubSearch";

export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    entityType,
    setEntityType,
    results,
    loading,
    error,
    hasSearched,
    clearSearch,
  } = useGithubSearch();

  const showResultsSection = hasSearched || loading || !!error;

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          entityType={entityType}
          onEntityTypeChange={setEntityType}
          onClear={clearSearch}
        />

        {showResultsSection && (
          <section className={styles.resultsSection}>
            {error ? (
              <StatusMessage
                type="error"
                message={error}
                onRetry={() => setSearchTerm(searchTerm)}
              />
            ) : loading ? (
              <ResultsGrid
                items={[]}
                entityType={entityType}
                loading={true}
              />
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
      </main>
    </div>
  );
}
