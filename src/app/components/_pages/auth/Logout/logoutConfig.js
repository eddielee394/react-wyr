import { authRoles } from "app/auth";
import { submitLogout } from "app/auth/store/actions";
import store from "app/store";

export const logoutConfig = {
  auth: authRoles.user,
  routes: [
    {
      path: "/logout",
      component: () => {
        store.dispatch(submitLogout());
        return "Logging out..";
      }
    }
  ]
};
