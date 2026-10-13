import styles from "./page.module.css";
import SearchResults from "@/components/features/results/SearchResults/SearchResults";
import SearchBar from "@/components/features/search/SearchBar/SearchBar";
import { SearchProvider } from "@/context/SearchContext";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <SearchProvider>
          <SearchBar />
          <SearchResults />
        </SearchProvider>
      </main>
    </div>
  );
}
