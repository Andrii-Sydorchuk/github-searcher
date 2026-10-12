export type EntityType = "users" | "repositories";

export interface RepoOwner {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  owner: RepoOwner;
  description: string | null;
}

export interface GitHubUser {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
  name: string | null;
  bio: string | null;
}

export interface SearchRequestBody {
  type: EntityType;
  text: string;
}

export interface SearchResponse<T = Repository | GitHubUser> {
  total_count: number;
  items: T[];
  cached?: boolean;
}

