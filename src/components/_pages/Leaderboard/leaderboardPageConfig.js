import { FuseLoadable } from "@fuse";
import { authRoles } from "auth";

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
