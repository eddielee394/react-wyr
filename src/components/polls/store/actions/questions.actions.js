import axios from "axios";
import { GET_QUESTION } from "components/polls/store/actions/question.actions";
import { API, Schemas } from "utils";
import { CALL_API } from "middleware/api";

export const GET_QUESTIONS = "[POLLS] GET QUESTIONS";
export const GET_QUESTIONS_SUCCESS = "[POLLS] GET QUESTIONS SUCCESS";
export const GET_QUESTIONS_FAILURE = "[POLLS] GET QUESTIONS FAILURE";

export const GET_CATEGORIES = "[POLLS] GET CATEGORIES";
export const GET_CATEGORIES_SUCCESS = "[POLLS] GET CATEGORIES SUCCESS";
export const GET_CATEGORIES_FAILURE = "[POLLS] GET CATEGORIES FAILURE";

export const GET_CATEGORY = "[POLLS] GET CATEGORY";
export const GET_QUESTIONS_BY_CATEGORY = "[POLLS] GET QUESTIONS BY CATEGORY";
export const SET_QUESTIONS_SEARCH_TEXT = "[POLLS] SET QUESTIONS SEARCH TEXT";
export const SET_QUESTIONS_CATEGORY_FILTER =
  "[POLLS] SET QUESTIONS CATEGORY FILTER";

export const getQuestions = () => ({
  [CALL_API]: {
    types: [GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE],
    endpoint: "/api/questions",
    method: "GET",
    schema: Schemas.questionsList
  }
});

export const getCategories = () => ({
  [CALL_API]: {
    types: [GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE],
    endpoint: "/api/questions/categories",
    method: "GET",
    schema: Schemas.categoriesList
  }
});
// export function getQuestions() {
//   const request = API.getQuestions();
//   return dispatch =>
//     request.then(response => {
//       dispatch({
//         type: GET_QUESTIONS,
//         payload: response.data
//       });
//     });
// }

// export function getCategories() {
//   const request = axios.get("/api/questions/categories");
//   return dispatch =>
//     request.then(response =>
//       dispatch({
//         type: GET_CATEGORIES,
//         payload: response.data
//       })
//     );
// }

export function getQuestion(params) {
  console.log("Actions.Question.getQuestion params: ", params);

  const request = API.getQuestion(params);
  console.log("Actions.Question.getQuestion request: ", request);

  return dispatch =>
    request.then(response => {
      console.log("Actions.Question.getQuestion response: ", response);
      dispatch({
        type: GET_QUESTION,
        payload: response.data
      });
    });
}

export function getCategory(params) {
  console.log("Actions.Questions.getCategory params", params);
  const request = API.getCategory(params);
  console.log("Actions.Questions.getCategory request", request);

  return dispatch =>
    request.then(response => {
      console.log("Actions.Questions.getCategory response", response);

      dispatch({
        type: GET_CATEGORY,
        category: response.data
      });
    });
}

export function setQuestionsSearchText(event) {
  return {
    type: SET_QUESTIONS_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function setCategoryFilter(event) {
  return {
    type: SET_QUESTIONS_CATEGORY_FILTER,
    category: event.target.value
  };
}

//todo change the action properties to fix issue with questions state not updating correctly
export function getQuestionsByCategory(params) {
  const request = API.getQuestionByCategory(params);
  console.log("Actions.questions.getQuestionsByCategory request", request);
  return dispatch => {
    request.then(response => {
      console.log(
        "Actions.questions.getQuestionsByCategory response",
        response
      );

      dispatch({
        type: GET_QUESTIONS_BY_CATEGORY,
        payload: response.data.questions,
        category: response.data.category
      });
    });
  };
}
