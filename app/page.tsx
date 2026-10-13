import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResults";
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
