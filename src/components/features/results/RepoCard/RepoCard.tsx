import Image from "next/image";
import styles from "./RepoCard.module.css";
import { Repository } from "@/types/repository";
import { formatCompactNumber, getLanguageColor } from "@/lib/utils/formatters";

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.topSection}>
        {/* owner */}
        <div className={styles.ownerRow}>
          <Image
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
            width={24}
            height={24}
            className={styles.ownerAvatar}
          />
          <span className={styles.ownerName}>{repo.owner.login}</span>
        </div>

        {/* title */}
        <h2 className={styles.repoTitle}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            {repo.name}
          </a>
        </h2>

        {/* description */}
        <p className={styles.description}>{repo.description}</p>
      </div>

      {/* stats footer */}
      <div className={styles.statsRow}>
        {repo.language && (
          <span className={styles.statItem}>
            <span
              className={styles.languageDot}
              style={{ backgroundColor: getLanguageColor(repo.language) }}
              aria-hidden="true"
            />
            <span>{repo.language}</span>
          </span>
        )}

        {typeof repo.stargazers_count === "number" && (
          <span
            className={styles.statItem}
            title={`${repo.stargazers_count.toLocaleString()} stars`}
          >
            <svg
              className={styles.statIcon}
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            <span>{formatCompactNumber(repo.stargazers_count)}</span>
          </span>
        )}

        {typeof repo.forks_count === "number" && (
          <span
            className={styles.statItem}
            title={`${repo.forks_count.toLocaleString()} forks`}
          >
            <svg
              className={styles.statIcon}
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span>{formatCompactNumber(repo.forks_count)}</span>
          </span>
        )}
      </div>
    </article>
  );
}
