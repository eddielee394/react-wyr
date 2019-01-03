import axios from "axios";
import { GET_QUESTION } from "components/polls/store/actions/question.actions";
import { API } from "utils";

export const GET_QUESTIONS = "[POLLS] GET QUESTIONS";
export const GET_CATEGORIES = "[POLLS] GET CATEGORIES";
export const GET_CATEGORY = "[POLLS] GET CATEGORY";
export const GET_QUESTIONS_BY_CATEGORY = "[POLLS] GET QUESTIONS BY CATEGORY";
export const SET_QUESTIONS_SEARCH_TEXT = "[POLLS] SET QUESTIONS SEARCH TEXT";
export const SET_QUESTIONS_CATEGORY_FILTER =
  "[POLLS] SET QUESTIONS CATEGORY FILTER";

export function getQuestions() {
  const request = API.getQuestions();
  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_QUESTIONS,
        payload: response.data
      });
    });
}

export function getCategories() {
  const request = API.getCategories();
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data
      })
    );
}

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
