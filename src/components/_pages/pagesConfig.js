import { resetPasswordPageConfig } from "components/_pages/auth/ResetPassword/resetPasswordPageConfig";
import { registerPageConfig } from "components/_pages/auth/Register/registerPageConfig";
import { loginPageConfig } from "components/_pages/auth/Login/loginPageConfig";
import { forgotPasswordPageConfig } from "components/_pages/auth/ForgotPassword/forgotPasswordPageConfig";
import { dashboardPageConfig } from "components/_pages/Dashboard/dashboardPageConfig";
import { error404PageConfig } from "components/_pages/errors/404/error404PageConfig";
import { error500PageConfig } from "components/_pages/errors/500/error500PageConfig";
import { landingPageConfig } from "components/_pages/Landing/landingPageConfig";
import { leaderboardPageConfig } from "components/_pages/Leaderboard/leaderboardPageConfig";

export const pagesConfig = [
  resetPasswordPageConfig,
  registerPageConfig,
  loginPageConfig,
  forgotPasswordPageConfig,
  dashboardPageConfig,
  leaderboardPageConfig,
  landingPageConfig,
  error500PageConfig,
  error404PageConfig
];
