import { EntityType } from "@/types/github";
import styles from "./EntitySelect.module.css";

export interface EntitySelectProps {
  entityType: EntityType;
  onEntityTypeChange: (type: EntityType) => void;
}

export default function EntitySelect({
  entityType,
  onEntityTypeChange,
}: EntitySelectProps) {
  return (
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
  );
}
