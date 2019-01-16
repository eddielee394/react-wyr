import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { componentsConfig } from "components/componentsConfig";
import { authRoles } from "auth";
import { resetPasswordPageConfig } from "components/_pages/auth/ResetPassword/resetPasswordPageConfig";
import { registerPageConfig } from "components/_pages/auth/Register/registerPageConfig";
import { loginPageConfig } from "components/_pages/auth/Login/loginPageConfig";
import { forgotPasswordPageConfig } from "components/_pages/auth/ForgotPassword/forgotPasswordPageConfig";
import _ from "@lodash";

function setUserAuth(configs) {
  return configs.map(config => _.merge({}, config, { auth: authRoles.user }));
}

const routeConfigs = [
  ...setUserAuth([...componentsConfig]),
  resetPasswordPageConfig,
  registerPageConfig,
  loginPageConfig,
  forgotPasswordPageConfig
];

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />
  },
  {
    component: () => <Redirect to="/error-404" />
  }
];
