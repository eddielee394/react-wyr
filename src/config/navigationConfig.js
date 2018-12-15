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
        id: "questions-answered",
        title: "Answered Questions",
        type: "item",
        icon: "whatshot",
        url: "/questions/answered"
      },
      {
        id: "questions-unanswered",
        title: "Unanswered Questions",
        type: "item",
        icon: "whatshot",
        url: "/questions/unanswered"
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
