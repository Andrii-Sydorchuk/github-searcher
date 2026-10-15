import Image from "next/image";
import styles from "./UserCard.module.css";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
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
            <div className={styles.nameRow}>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.name}
              >
                {user.name || user.login}
              </a>
              {user.type && (
                <span
                  className={`${styles.badge} ${
                    user.type === "Organization"
                      ? styles.orgBadge
                      : styles.userBadge
                  }`}
                >
                  {user.type}
                </span>
              )}
              {user.site_admin && (
                <span className={`${styles.badge} ${styles.adminBadge}`}>
                  Staff
                </span>
              )}
            </div>
            <span className={styles.login}>@{user.login}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
