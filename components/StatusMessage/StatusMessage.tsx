import styles from "./StatusMessage.module.css";

interface StatusMessageProps {
  type: "empty" | "error";
  title?: string;
  message?: string;
  query?: string;
  onRetry?: () => void;
}

export default function StatusMessage({
  type,
  title,
  message,
  query,
  onRetry,
}: StatusMessageProps) {
  if (type === "error") {
    return (
      <div className={styles.container} role="alert">
        <h3 className={styles.title}>{title || "Something went wrong"}</h3>
        <p className={styles.description}>
          {message || "An error occurred while loading results. Please try again."}
        </p>
        {onRetry && (
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title || "No results found"}</h3>
      <p className={styles.description}>
        {query ? (
          <>
            No matching results found for <span className={styles.queryHighlight}>&ldquo;{query}&rdquo;</span>. Try a different keyword or toggle the entity dropdown.
          </>
        ) : (
          message || "We could not find any matching items for your search."
        )}
      </p>
    </div>
  );
}

