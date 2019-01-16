import { combineReducers } from "redux";
import users from "./users.reducer";
import user from "./user.reducer";
import login from "./login.reducer";
import register from "./register.reducer";

const authReducers = combineReducers({
  users,
  user,
  login,
  register
});

export default authReducers;
