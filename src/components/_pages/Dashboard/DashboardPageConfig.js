import { authRoles } from "auth";
import DashboardPage from "components/_pages/Dashboard/DashboardPage";

export const DashboardPageConfig = {
  routes: [
    {
      auth: authRoles.user,
      path: "/dashboard",
      component: DashboardPage
    }
  ]
};
