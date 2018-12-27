import { FuseLoadable } from "@fuse";

export const pollsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/questions/:categoryId/:questionId?",
      component: FuseLoadable({
        loader: () => import("./Categories/Category")
      })
    },
    {
      path: "/questions/:categoryId",
      component: FuseLoadable({
        loader: () => import("./Categories/Category")
      })
    },
    {
      path: "/questions",
      component: FuseLoadable({
        loader: () => import("./Categories/CategoryList")
      })
    }
  ]
};
