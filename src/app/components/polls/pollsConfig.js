import { FuseLoadable } from "@fuse";

export const pollsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/questions/:categoryId/:questionId?",
      component: FuseLoadable({
        loader: () => import("./Questions/QuestionListContainer")
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
