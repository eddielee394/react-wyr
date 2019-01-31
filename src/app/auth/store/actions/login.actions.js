import history from "app/utils/history";
import jwtService from "app/utils/jwtService";
import { setUserData } from "app/auth/store/actions";

export const LOGIN_ERROR = "[LOGIN] LOGIN_ERROR";
export const LOGIN_SUCCESS = "[LOGIN] LOGIN_SUCCESS";

export const LOGOUT_SUCCESS = "[LOGIN] LOGOUT_SUCCESS";

export function submitLogin({ email, password }) {
  return dispatch =>
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
}

/**
 * Logout
 */
export const submitLogout = () => (dispatch, getState) => {
  const user = getState().auth.user;

  if (user.role === "guest") {
    return null;
  }

  history.push({
    pathname: "/login"
  });

  jwtService.logout();
  dispatch({
    type: LOGOUT_SUCCESS
  });
};
