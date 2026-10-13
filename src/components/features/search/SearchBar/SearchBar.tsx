"use client";

import styles from "./SearchBar.module.css";
import SearchHeader from "../SearchHeader/SearchHeader";
import SearchInput from "../SearchInput/SearchInput";
import EntitySelect from "../EntitySelect/EntitySelect";
import { useSearchContext } from "@/context/SearchContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm, entityType, setEntityType, clearSearch } =
    useSearchContext();

  return (
    <div className={styles.container}>
      <SearchHeader />

      <div className={styles.inputGroup}>
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={clearSearch}
        />

        <EntitySelect
          entityType={entityType}
          onEntityTypeChange={setEntityType}
        />
      </div>
    </div>
  );
}
