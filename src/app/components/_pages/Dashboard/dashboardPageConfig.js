import { FuseLoadable } from "@fuse";

export const dashboardPageConfig = {
  routes: [
    {
      path: "/dashboard",
      component: FuseLoadable({
        loader: () => import("./DashboardPage")
      })
    }
  ]
};
