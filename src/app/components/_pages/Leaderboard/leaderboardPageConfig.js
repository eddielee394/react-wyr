import { FuseLoadable } from "@fuse";

export const leaderboardPageConfig = {
  routes: [
    {
      path: "/leaderboard",
      component: FuseLoadable({
        loader: () => import("./LeaderboardPage")
      })
    }
  ]
};
