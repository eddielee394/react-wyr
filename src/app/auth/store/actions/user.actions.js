import _ from "@lodash";
import { updateUsers } from "app/auth/store/actions";
import { CALL_API } from "app/middleware/api";
import { API, Schemas } from "app/utils";

export const SET_USER_DATA = "[USER] SET_USER_DATA";
export const SET_USER_DATA_SUCCESS = "[USER] SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILURE = "[USER] SET_USER_DATA_FAILURE";

export const REMOVE_USER_DATA = "[USER] REMOVE_USER_DATA";

/**
 * Set User Data
 */
export const setUserData = user => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [SET_USER_DATA, SET_USER_DATA_SUCCESS, SET_USER_DATA_FAILURE],
      endpoint: API.updateUser(),
      method: "POST",
      data: user,
      schema: Schemas.questionsList
    }
  });
};

export const updateUserAnswer = data => (dispatch, getState) => {
  const { questionId, answerId, author } = data;

  let user = {};
  if (author && author === getState().auth.user.id) {
    user = _.find(getState().auth.users, { id: author });
  } else {
    user = getState().auth.user;
  }

  console.log("updateUserAnswer user: ", user);

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

  return dispatch(updateUsers(newUser));
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

  return dispatch(updateUsers(newUser));
};
