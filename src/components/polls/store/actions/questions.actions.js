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

export const getQuestions = params => ({
  [CALL_API]: {
    types: [GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE],
    endpoint: API.fetchQuestions(),
    method: "GET",
    params: params,
    schema: Schemas.questionsList
  }
});

export const getQuestionsByCategory = categoryId => ({
  [CALL_API]: {
    types: [
      GET_QUESTIONS_BY_CATEGORY,
      GET_QUESTIONS_BY_CATEGORY_SUCCESS,
      GET_QUESTIONS_BY_CATEGORY_FAILURE
    ],
    endpoint: API.fetchQuestions(),
    method: "GET",
    params: categoryId,
    schema: Schemas.questionsList
  }
});
