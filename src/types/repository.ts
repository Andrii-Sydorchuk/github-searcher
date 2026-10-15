import { Endpoints } from "@octokit/types";

export type Repository =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][number];
