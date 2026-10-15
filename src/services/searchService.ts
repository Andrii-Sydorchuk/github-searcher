import { EntityType } from "@/types/github";
import { Repository } from "@/types/repository";
import { User } from "@/types/user";
import { githubApi } from "./apiClient";
import axios, { AxiosRequestConfig } from "axios";

export interface GitHubSearchApiResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

interface SearchParams {
  q: string;
}

export async function searchEntities(
  type: EntityType,
  text: string,
  signal?: AbortSignal,
): Promise<(Repository | User)[]> {
  const query = text.trim().toLowerCase();
  if (query.length < 3) return [];

  const endpoint =
    type === "repositories" ? "/search/repositories" : "/search/users";
  const config: AxiosRequestConfig<unknown, SearchParams> = {
    params: {
      q: query,
    },
    signal,
  };

  try {
    const response = await githubApi.get<
      GitHubSearchApiResponse<Repository | User>
    >(endpoint, config);

    return response.data.items;
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error(
          "GitHub API free unauthorized rate limit exceeded (10 requests / min). Please wait a moment and retry.",
        );
      }

      throw new Error(
        error.response?.data?.message || "Failed to fetch from GitHub API",
      );
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unexpected error has occurred");
  }
}
