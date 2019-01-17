import _ from "@lodash";
import { updateUserData } from "auth/store/actions";
import history from "utils/history";
import jwtService from "utils/jwtService";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";

/**
 * Set User Data
 */
export function setUserData(user) {
  return dispatch => {
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
  };
}

export const updateUserAnswer = data => (dispatch, getState) => {
  const { questionId, answerId, author } = data;

  let user = {};
  if (author && author === getState().auth.user.id) {
    user = _.find(getState().auth.users, { id: author });
  } else {
    user = getState().auth.user;
  }

  const newUser = {
    ...user,
    data: {
      ...user.data,
      answers: {
        ...user.data.answers,
        [questionId]: answerId
      }
    }
  };

  return dispatch(updateUserData(newUser));
};

export const updateUserQuestion = data => (dispatch, getState) => {
  const { id, author } = data;
  let user = {};
  if (author && author === getState().auth.user.id) {
    user = _.find(getState().auth.users, { id: author });
  } else {
    user = getState().auth.user;
  }

  const newUser = {
    ...user,
    data: {
      ...user.data,
      questions: [...user.data.questions.concat(id)]
    }
  };

  return dispatch(updateUserData(newUser));
};

/**
 * Logout
 */
export function logoutUser() {
  return (dispatch, getState) => {
    const user = getState().auth.user;

    if (user.role === "guest") {
      return null;
    }

    history.push({
      pathname: "/"
    });

    switch (user.from) {
      case "jwtService": {
        jwtService.logout();
        break;
      }
      default: {
        jwtService.logout();
      }
    }

    dispatch({
      type: USER_LOGGED_OUT
    });
  };
}
