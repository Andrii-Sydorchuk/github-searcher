import { Endpoints } from "@octokit/types";

export type User =
  Endpoints["GET /search/users"]["response"]["data"]["items"][number];
