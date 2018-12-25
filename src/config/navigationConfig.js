import { authRoles } from "auth";

export const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "group",
    icon: "apps",
    url: "/dashboard",
    children: [
      {
        id: "dashboard-home",
        title: "Home",
        type: "item",
        icon: "whatshot",
        url: "/dashboard"
      },
      {
        id: "questions-answered",
        title: "Answered Questions",
        type: "item",
        icon: "whatshot",
        url: "/questions/answered"
      },
      {
        id: "questions-unanswered",
        title: "Todo Test",
        type: "item",
        icon: "whatshot",
        url: "/apps/mail"
      },
      {
        id: "questions-all",
        title: "All Questions",
        type: "item",
        icon: "whatshot",
        url: "/questions"
      }
    ]
  },
  {
    id: "leaderboard-page",
    title: "Leaderboard",
    type: "group",
    icon: "apps"
  }
];
