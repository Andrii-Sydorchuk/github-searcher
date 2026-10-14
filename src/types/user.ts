export interface GitHubUser {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
  type?: "User" | "Organization" | string;
  site_admin?: boolean;
}
