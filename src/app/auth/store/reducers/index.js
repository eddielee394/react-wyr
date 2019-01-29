import { combineReducers } from "redux";
import login from "./login.reducer";
import register from "./register.reducer";
import user from "./user.reducer";
import users from "./users.reducer";

const authReducers = combineReducers({
  users,
  user,
  login,
  register
});

export default authReducers;
