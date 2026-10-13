import styles from "./page.module.css";
import SearchResults from "@/components/features/results/SearchResults/SearchResults";
import SearchBar from "@/components/features/search/SearchBar/SearchBar";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <Suspense fallback={null}>
          <StoreProvider>
            <SearchBar />
            <SearchResults />
          </StoreProvider>
        </Suspense>
      </main>
    </div>
  );
}
