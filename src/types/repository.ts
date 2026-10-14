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
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
}
