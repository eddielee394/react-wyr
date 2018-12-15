import { authRoles } from "auth";
import DashboardPage from "components/_pages/Dashboard/DashboardPage";

export const DashboardPageConfig = {
  auth: authRoles.user,
  routes: [
    {
      path: "/dashboard",
      exact: true,
      component: DashboardPage
    }
  ]
};
