import { RefObject } from "react";
import styles from "./SearchInput.module.css";

export interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear?: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export default function SearchInput({
  searchTerm,
  onClear,
  onSearchChange,
  inputRef,
}: SearchInputProps) {
  return (
    <div className={styles.inputWrapper}>
      <span className={styles.searchIcon} aria-hidden="true">
        ⌕
      </span>
      <label className={styles.visuallyHidden} htmlFor="github-search">
        Search GitHub users or repositories
      </label>
      <input
        id="github-search"
        type="text"
        className={styles.input}
        placeholder="Search GitHub users or repositories"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
        ref={inputRef}
      />
      {searchTerm && onClear && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Clear search"
          title="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
}
