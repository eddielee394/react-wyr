import { authRoles } from "auth";
import LandingPage from "components/_pages/Landing/LandingPage";

export const LandingPageConfig = {
  routes: [
    {
      settings: {
        layout: {
          config: {
            navbar: {
              display: false
            },
            toolbar: {
              display: false
            },
            footer: {
              display: false
            },
            leftSidePanel: {
              display: false
            },
            rightSidePanel: {
              display: false
            }
          }
        }
      },
      path: "/",
      exact: true,
      component: LandingPage
    }
  ]
};
