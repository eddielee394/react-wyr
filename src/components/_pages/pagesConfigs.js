import { ResetPasswordPageConfig } from "components/_pages/auth/ResetPassword/ResetPasswordPageConfig";
import { RegisterPageConfig } from "components/_pages/auth/Register/RegisterPageConfig";
import { LoginPageConfig } from "components/_pages/auth/Login/LoginPageConfig";
import { ForgotPasswordPageConfig } from "components/_pages/auth/ForgotPassword/ForgotPasswordPageConfig";
import { DashboardPageConfig } from "components/_pages/Dashboard/DashboardPageConfig";
import { Error404PageConfig } from "components/_pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "components/_pages/errors/500/Error500PageConfig";
import { LandingPageConfig } from "components/_pages/Landing/LandingPageConfig";
import { PollsConfig } from "components/polls/PollsConfig";

export const pagesConfigs = [
  ResetPasswordPageConfig,
  RegisterPageConfig,
  LoginPageConfig,
  ForgotPasswordPageConfig,
  DashboardPageConfig,
  LandingPageConfig,
  Error500PageConfig,
  Error404PageConfig,
  PollsConfig
];
