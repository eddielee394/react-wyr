import { FuseUtils } from "@fuse";
import React from "react";
import { Redirect } from "react-router-dom";
import { pagesConfigs } from "components/_pages/pagesConfigs";

const routeConfigs = [...pagesConfigs];

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
