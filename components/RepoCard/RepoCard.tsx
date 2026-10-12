import Image from "next/image";
import { Repository } from "@/types/github";
import styles from "./RepoCard.module.css";

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
    </article>
  );
}

