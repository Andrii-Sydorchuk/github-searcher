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
  full_name: string;
  owner: RepoOwner;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  company: string | null;
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

