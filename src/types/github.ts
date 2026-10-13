import { Repository } from "./repository";
import { GitHubUser } from "./user";

export type EntityType = "users" | "repositories";

export interface SearchRequestBody {
  type: EntityType;
  text: string;
}

export interface SearchResponse<T = Repository | GitHubUser> {
  total_count: number;
  items: T[];
  cached?: boolean;
}
