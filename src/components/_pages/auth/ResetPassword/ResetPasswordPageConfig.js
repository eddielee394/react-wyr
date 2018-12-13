import { authRoles } from "auth";
import ResetPasswordPage from "components/_pages/auth/ResetPassword/ResetPasswordPage";

export const ResetPasswordPageConfig = {
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
      path: "/reset-password",
      component: ResetPasswordPage
    }
  ]
};
