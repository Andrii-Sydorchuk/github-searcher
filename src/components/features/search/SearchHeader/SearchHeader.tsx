import styles from "./SearchHeader.module.css";
import Image from "next/image";
import githubLogo from "@/assets/icons/github_logo.svg";

export default function SearchHeader() {
  return (
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
  );
}
