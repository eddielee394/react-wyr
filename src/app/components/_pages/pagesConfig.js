import { dashboardPageConfig } from "./Dashboard/dashboardPageConfig";
import { error404PageConfig } from "./errors/404/error404PageConfig";
import { error500PageConfig } from "./errors/500/error500PageConfig";
import { leaderboardPageConfig } from "./Leaderboard/leaderboardPageConfig";

export const pagesConfig = [
  dashboardPageConfig,
  leaderboardPageConfig,
  error500PageConfig,
  error404PageConfig
];
