import { MOCK_REPOSITORIES, MOCK_USERS } from "@/data/mockData";
import { EntityType, GitHubUser, Repository } from "@/types/github";

const cache: Record<string, (Repository | GitHubUser)[]> = {};

export async function searchEntities(type: EntityType, text: string) {
  const query = text.trim().toLowerCase();
  if (query.length < 3) return [];

  const key = `${type}:${query}`;
  if (cache[key]) return cache[key];

  await new Promise((resolve) => setTimeout(resolve, 300));

  const results = type === "repositories"
    ? MOCK_REPOSITORIES.filter(r => r.name.toLowerCase().includes(query) || r.description?.toLowerCase().includes(query))
    : MOCK_USERS.filter(u => u.login.toLowerCase().includes(query) || u.name?.toLowerCase().includes(query));

  cache[key] = results;
  return results;
}