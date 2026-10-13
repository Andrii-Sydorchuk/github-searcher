"use client";

import styles from "./SearchBar.module.css";
import SearchHeader from "../SearchHeader/SearchHeader";
import SearchInput from "../SearchInput/SearchInput";
import EntitySelect from "../EntitySelect/EntitySelect";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  clearSearch,
  setEntityType,
  setSearchTerm,
} from "@/lib/features/search/searchSlice";

export default function SearchBar() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const entityType = useAppSelector((state) => state.search.entityType);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <SearchHeader />

      <div className={styles.inputGroup}>
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={(value) => dispatch(setSearchTerm(value))}
          onClear={() => dispatch(clearSearch())}
        />

        <EntitySelect
          entityType={entityType}
          onEntityTypeChange={(value) => dispatch(setEntityType(value))}
        />
      </div>
    </div>
  );
}
