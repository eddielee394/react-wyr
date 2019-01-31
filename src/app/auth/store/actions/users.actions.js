import { CALL_API } from "app/middleware/api";
import store from "app/store";
import * as Actions from "app/store/actions";
import { API, Schemas } from "app/utils";
import { setUserData } from "app/auth/store/actions";

export const GET_ALL_USERS = "[USERS] GET ALL USERS";
export const GET_ALL_USERS_SUCCESS = "[USERS] GET ALL USERS SUCCESS";
export const GET_ALL_USERS_FAILURE = "[USERS] GET ALL USERS FAILURE";

export const STORE_USER = "[USER] STORE USER";
export const STORE_USER_SUCCESS = "[USER] STORE USER SUCCESS";
export const STORE_USER_FAILURE = "[USER] STORE USER FAILURE";

export const UPDATE_USERS = "[USER] UPDATE USERS";
export const UPDATE_USERS_SUCCESS = "[USER] UPDATE USERS SUCCESS";
export const UPDATE_USERS_FAILURE = "[USER] UPDATE USERS FAILURE";

export const getAllUsers = () => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [GET_ALL_USERS, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE],
      endpoint: API.fetchUsers(),
      method: "GET",
      schema: Schemas.questionsList
    }
  });
};

export const storeUserData = user => dispatch => {
  dispatch({
    [CALL_API]: {
      types: [STORE_USER, STORE_USER_SUCCESS, STORE_USER_FAILURE],
      endpoint: API.storeUser(),
      method: "POST",
      data: user,
      schema: Schemas.questionsList
    }
  });

  return dispatch(setUserData(user));
};

/**
 * Update User Data
 */
export const updateUsers = user => dispatch => {
  if (user.role === "guest") {
    return;
  }
  dispatch({
    [CALL_API]: {
      types: [UPDATE_USERS, UPDATE_USERS_SUCCESS, UPDATE_USERS_FAILURE],
      endpoint: API.storeUser(),
      method: "POST",
      data: user,
      schema: Schemas.questionsList
    }
  });

  dispatch(setUserData(user));
  return store.dispatch(Actions.showMessage({ message: "User data updated" }));
};
