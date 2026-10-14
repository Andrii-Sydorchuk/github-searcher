import Image from "next/image";
import styles from "./RepoCard.module.css";
import { Repository } from "@/types/repository";
import { formatCompactNumber, getLanguageColor } from "@/lib/utils/formatters";
import githubStar from "@/assets/icons/github_star.svg";
import githubFork from "@/assets/icons/github_fork.svg";

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
            <Image
              src={githubStar}
              width={16}
              height={16}
              alt=""
              aria-hidden="true"
              className={styles.statIcon}
            />
            <span>{formatCompactNumber(repo.stargazers_count)}</span>
          </span>
        )}

        {typeof repo.forks_count === "number" && (
          <span
            className={styles.statItem}
            title={`${repo.forks_count.toLocaleString()} forks`}
          >
            <Image
              src={githubFork}
              width={14}
              height={14}
              alt=""
              aria-hidden="true"
              className={styles.statIcon}
            />
            <span>{formatCompactNumber(repo.forks_count)}</span>
          </span>
        )}
      </div>
    </article>
  );
}
