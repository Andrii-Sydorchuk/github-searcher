import { Repository } from "./repository";
import { User } from "./user";

export type EntityType = "users" | "repositories";

export interface SearchRequestBody {
  type: EntityType;
  text: string;
}

export interface SearchResponse<T = Repository | User> {
  total_count: number;
  items: T[];
  cached?: boolean;
}
