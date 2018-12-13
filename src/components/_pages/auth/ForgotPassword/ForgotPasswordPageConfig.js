import { authRoles } from "auth";
import ForgotPasswordPage from "components/_pages/auth/ForgotPassword/ForgotPasswordPage";

export const ForgotPasswordPageConfig = {
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
      auth: authRoles.onlyGuest,
      path: "/forgot-password",
      component: ForgotPasswordPage
    }
  ]
};
