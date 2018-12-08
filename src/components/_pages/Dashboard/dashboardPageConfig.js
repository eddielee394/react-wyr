import { FuseLoadable } from "@fuse";
import { authRoles } from "auth";

export const dashboardPageConfig = {
  auth: authRoles.user,
  routes: [
    {
      path: "/dashboard",
      component: FuseLoadable({
        loader: () => import("./DashboardPage")
      })
    }
  ]
};
