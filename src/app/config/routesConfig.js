import { FuseUtils } from "@fuse";
import _ from "@lodash";
import { authRoles } from "app/auth";
import { loginPageConfig } from "app/components/_pages/auth/Login/loginPageConfig";
import { logoutConfig } from "app/components/_pages/auth/Logout/logoutConfig";
import { registerPageConfig } from "app/components/_pages/auth/Register/registerPageConfig";
import React from "react";
import { Redirect } from "react-router-dom";
import { componentsConfig } from "../components/componentsConfig";

function setUserAuth(configs) {
  return configs.map(config => _.merge({}, config, { auth: authRoles.user }));
}

const routeConfigs = [
  ...setUserAuth([...componentsConfig, logoutConfig]),
  registerPageConfig,
  loginPageConfig
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
