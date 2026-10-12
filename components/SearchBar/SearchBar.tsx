"use client";

import Image from "next/image";
import githubLogo from "@/assets/icons/github_logo.svg";
import { EntityType } from "@/types/github";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  entityType: EntityType;
  onEntityTypeChange: (type: EntityType) => void;
  onClear?: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  entityType,
  onEntityTypeChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <Image
          src={githubLogo}
          alt="GitHub Logo"
          width={44}
          height={44}
          className={styles.logo}
        />
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>GitHub Searcher</h1>
          <p className={styles.subtitle}>Search users or repositories below</p>
        </div>
      </div>

      {/* inputs */}
      <div className={styles.inputGroup}>
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

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={entityType}
            onChange={(e) => onEntityTypeChange(e.target.value as EntityType)}
            aria-label="Select entity type"
          >
            <option value="users">Users</option>
            <option value="repositories">Repositories</option>
          </select>
          <span className={styles.selectArrow} aria-hidden="true">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}