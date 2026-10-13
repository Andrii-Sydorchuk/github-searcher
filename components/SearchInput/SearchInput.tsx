import styles from "./SearchInput.module.css";

export interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear?: () => void;
}

export default function SearchInput({
  searchTerm,
  onClear,
  onSearchChange,
}: SearchInputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Start typing to search .."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
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
