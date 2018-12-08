import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { componentsConfig } from "components/componentsConfig";

const routeConfigs = [...componentsConfig];

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    component: () => <Redirect to="/error-404" />
  }
];
