import { API, Schemas } from "utils";
import { CALL_API } from "middleware/api";

export const GET_QUESTIONS = "[POLLS] GET QUESTIONS";
export const GET_QUESTIONS_SUCCESS = "[POLLS] GET QUESTIONS SUCCESS";
export const GET_QUESTIONS_FAILURE = "[POLLS] GET QUESTIONS FAILURE";

export const GET_QUESTIONS_BY_CATEGORY = "[POLLS] GET QUESTIONS BY CATEGORY";
export const GET_QUESTIONS_BY_CATEGORY_SUCCESS =
  "[POLLS] GET QUESTIONS BY CATEGORY SUCCESS";
export const GET_QUESTIONS_BY_CATEGORY_FAILURE =
  "[POLLS] GET QUESTIONS BY CATEGORY FAILURE";

export const getQuestions = routeParams => ({
  [CALL_API]: {
    types: [GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE],
    endpoint: API.fetchQuestions(),
    method: "GET",
    routeParams: routeParams,
    schema: Schemas.questionsList
  }
});

export const getQuestionsByCategory = categoryId => {
  return {
    type: GET_QUESTIONS_BY_CATEGORY,
    payload: categoryId
  };
};

// export const getQuestionsByCategory = categoryId => (dispatch, getState) => {
//   const response = {
//     data: categoryId
//   };
//
//   return {
//     type: GET_QUESTIONS_BY_CATEGORY,
//     payload: response.data
//   };
// };
// export const getQuestionsByCategory = params => ({
//   [CALL_API]: {
//     types: [
//       GET_QUESTIONS_BY_CATEGORY,
//       GET_QUESTIONS_BY_CATEGORY_SUCCESS,
//       GET_QUESTIONS_BY_CATEGORY_FAILURE
//     ],
//     endpoint: API.fetchQuestionsByCategory(params),
//     method: "GET",
//     schema: Schemas.questionsList
//   }
// });
