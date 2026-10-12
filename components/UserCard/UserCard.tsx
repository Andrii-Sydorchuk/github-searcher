import Image from "next/image";
import { GitHubUser } from "@/types/github";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: GitHubUser;
}


export default function UserCard({ user }: UserCardProps) {
  return (
    <article className={styles.card}>
      <div>
        {/* user avatar and name */}
        <div className={styles.userHeader}>
          <Image
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={48}
            height={48}
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.name}
            >
              {user.name || user.login}
            </a>
            <span className={styles.login}>@{user.login}</span>
          </div>
        </div>

        {/* bio */}
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
      </div>
    </article>
  );
}

