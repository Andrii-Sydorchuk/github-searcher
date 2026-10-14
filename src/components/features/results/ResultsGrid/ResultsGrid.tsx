import { EntityType } from "@/types/github";
import RepoCard from "../RepoCard/RepoCard";
import UserCard from "../UserCard/UserCard";
import SkeletonCard from "@/components/common/SkeletonCard/SkeletonCard";
import styles from "./ResultsGrid.module.css";
import { Repository } from "@/types/repository";
import { GitHubUser } from "@/types/user";

interface ResultsGridProps {
  items: (Repository | GitHubUser)[];
  entityType: EntityType;
  loading: boolean;
  skeletonCount?: number;
}

function isRepository(item: Repository | GitHubUser): item is Repository {
  return "owner" in item;
}

export default function ResultsGrid({
  items,
  entityType,
  loading,
  skeletonCount = 6,
}: ResultsGridProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        if (entityType === "repositories" && isRepository(item)) {
          return <RepoCard key={item.id} repo={item} />;
        }

        if (entityType === "users" && !isRepository(item)) {
          return <UserCard key={item.id} user={item} />;
        }

        return null;
      })}
    </div>
  );
}
