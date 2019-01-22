import { setUserData } from "auth/store/actions";
import { store } from "store";
import * as Actions from "store/actions";
import { API } from "utils";

export const GET_ALL_USERS = "[USERS] GET ALL";
export const STORE_USER_SUCCESS = "[USER] STORE USER SUCCESS";
export const UPDATE_USER_SUCCESS = "[USER] UPDATE USERS SUCCESS";

export function getAllUsers() {
  const request = API.fetchUsers();
  return (dispatch, getState) => {
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
  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
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
  return store.dispatch(Actions.showMessage({ message: "User data updated" }));
};
