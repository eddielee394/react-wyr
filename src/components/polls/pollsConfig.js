import { FuseLoadable } from "@fuse";

export const pollsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/questions/:categoryId/:questionId?",
      component: FuseLoadable({
        // loader: () => import("./Question/QuestionTest")
        loader: () => import("./QuestionList/QuestionList")
      })
    },
    {
      path: "/questions/:categoryId",
      component: FuseLoadable({
        loader: () => import("./QuestionList/QuestionList")
      })
    },
    {
      path: "/questions",
      component: FuseLoadable({
        loader: () => import("./Categories/Categories")
      })
    }
  ]
};
