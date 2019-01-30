import store from "app/store";
import * as Actions from "app/store/actions";
import { API } from "app/utils";
import { setUserData } from "app/auth/store/actions";

export const GET_ALL_USERS = "[USERS] GET ALL";
export const STORE_USER_SUCCESS = "[USER] STORE USER SUCCESS";
export const UPDATE_USER_SUCCESS = "[USER] UPDATE USERS SUCCESS";

export function getAllUsers() {
  const request = API.fetchUsers();
  return dispatch => {
    request.then(response => {
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data
      });
    });
  };
}

export const storeUserData = user => dispatch => {
  dispatch({
    type: STORE_USER_SUCCESS,
    payload: user
  });

  return dispatch(updateUserData(user));
};

/**
 * Update User Data
 */
export const updateUserData = user => dispatch => {
  if (user.role === "guest") {
    return;
  }

  dispatch({
    type: UPDATE_USER_SUCCESS,
    payload: user
  });

  dispatch(setUserData(user));
  return store.dispatch(Actions.showMessage({ message: "User data updated" }));
};
