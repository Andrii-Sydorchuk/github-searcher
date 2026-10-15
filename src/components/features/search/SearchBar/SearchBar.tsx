"use client";

import { useEffect, useRef } from "react";
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut = event.ctrlKey && event.key.toLowerCase() === "k";
      const isClearShortcut = event.key === "Escape";

      if (isSearchShortcut) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (
        isClearShortcut &&
        document.activeElement === searchInputRef.current
      ) {
        dispatch(clearSearch());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <SearchHeader />

      <div className={styles.inputGroup}>
        <SearchInput
          inputRef={searchInputRef}
          searchTerm={searchTerm}
          onSearchChange={(value) => dispatch(setSearchTerm(value))}
          onClear={() => dispatch(clearSearch())}
        />

        <EntitySelect
          entityType={entityType}
          onEntityTypeChange={(value) => dispatch(setEntityType(value))}
        />
      </div>
      {searchTerm.length > 0 && searchTerm.length < 3 && (
        <p className={styles.hint}>Type at least 3 characters to search.</p>
      )}
    </div>
  );
}
